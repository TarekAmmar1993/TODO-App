import {useState, useEffect} from 'react'
import firebase from '../firebase'
import moment from "moment";

export function useTodos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('todos')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setTodos(data)
            })

        return () => unsubscribe()
    }, [])

    return todos
}

export function useProjects() {
    const [projects, setProjects] = useState([])


    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('projects')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        name: doc.data().name,

                    }
                })
                setProjects(data)
            })

        return () => unsubscribe()
    }, [])

    return projects
}

export function useFilterTodos(todos, selectedProject) {
    const [filteredTodos, setFilteredTodos] = useState([]);
    useEffect(() => {
        let data;
        const todayDateFormatted = moment().format("MM/DD/YYYY");
        if (selectedProject === 'today') {
            data = todos.filter(todo => todo.date === todayDateFormatted)

        } else if (selectedProject === 'next 7 days') {
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, "MM/DD/YYYY");
                const todayDate = moment(todayDateFormatted, "MM/DD/YYYY");
                const diffDays = todoDate.diff(todayDate, 'day')
                return diffDays >= 0 && diffDays < 7
            })


        } else if (selectedProject === 'all days') {
            data = todos;
        } else {
            data = todos.filter(todo => todo.projectName === selectedProject)

        }
        setFilteredTodos(data);

    }, [todos, selectedProject])


    return filteredTodos;
}

export function useProjectsWithStats(todos, projects) {
    const [projectsWithStats, setProjectsWithStats] = useState([]);

    useEffect(() => {
        const data = projects.map(project => {
            return {
                numOfTodos: todos.filter(todo => todo.projectName === project.name && !todo.checked).length,
                ...project
            }
        })
        setProjectsWithStats(data);
    }, [todos, projects])
    return projectsWithStats
}

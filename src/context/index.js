import React, {createContext, useState} from "react";
import {useFilterTodos, useProjects, useProjectsWithStats, useTodos} from "../hooks";

const TodoContext = createContext();

function TodoContextProvider({children}) {
    const defaultProject = "today";
    const [selectedProject, setSelectedProject] = useState(defaultProject);
    const [selectedTodo, setSelectedTodo] = useState(undefined);


    const todos = useTodos();
    const projects = useProjects();
    const projectsWithStats = useProjectsWithStats(todos, projects)
    const filteredTodos = useFilterTodos(todos, selectedProject)


    return (
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject: selectedProject,
                    setSelectedProject: setSelectedProject,
                    todos: filteredTodos,
                    projects: projectsWithStats,
                    selectedTodo,
                    setSelectedTodo
                }
            }
        >
            {children}

        </TodoContext.Provider>
    )

}

export {TodoContextProvider, TodoContext}

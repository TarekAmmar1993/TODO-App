import React, {useContext, useState} from 'react'
import ProjectForm from "./ProjectForm";
import firebase from "firebase/app";
import {TodoContext} from "../context";

function RenameProject({project, setShowModal}) {
    //state
    const [newProjectName, setNewProjectName] = useState(project.name);
    //context
    const {selectedProject, setSelectedProject} = useContext(TodoContext);

    function renameProject(project, newProjectName) {
        const projectRef = firebase.firestore().collection('projects');
        const todosRef = firebase.firestore().collection('todos');

        const {name: oldProjectName} = project;

        projectRef
            .where('name', '==', newProjectName)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    alert('project with the same name already exists')
                } else {
                    projectRef
                        .doc(project.id)
                        .update({
                            name: newProjectName
                        })
                        .then(() => {
                            todosRef
                                .where('projectName', '==', oldProjectName)
                                .get()
                                .then(querySnapshot => {
                                    querySnapshot.forEach(doc => {
                                        doc.ref.update({
                                            projectName: newProjectName
                                        })
                                    })
                                })
                                .then(() => {
                                    if (selectedProject === oldProjectName) {
                                        setSelectedProject(newProjectName);
                                    }
                                })
                        })
                }


            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        renameProject(project, newProjectName)
        setShowModal(false)

    }

    return (
        <div className='RenameProject'>
            <ProjectForm
                handleSubmit={handleSubmit}
                heading="Rename Project"
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText="Confirm"
            />
        </div>
    )
}

export default RenameProject
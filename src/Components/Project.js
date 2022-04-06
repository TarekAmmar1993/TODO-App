import React, {useContext, useState} from 'react'
import RenameProject from './RenameProject'
import {Pencil, XCircle} from "react-bootstrap-icons";
import Modal from "./Modal";
import {TodoContext} from "../context";
import firebase from "firebase";

function Project({project, edit}) {
    //context
    const {selectedProject, setSelectedProject, defaultProject} = useContext(TodoContext);
    //State
    const [showModal, setShowModal] = useState(false);

    function deleteProject(project) {
        firebase
            .firestore()
            .collection('projects')
            .doc(project.id)
            .delete()
            .then(() => {
                firebase
                    .firestore()
                    .collection('todos')
                    .where('projectName', "==", project.name)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            doc.ref.delete();
                        })
                    })
                    .then(() => {
                        if (selectedProject === project.name) {
                            setSelectedProject(defaultProject);
                        }
                    })


            })
    }

    return (
        <div className='Project'>
            <div className="name" onClick={() => setSelectedProject(project.name)

            }>
                {project.name}
            </div>
            <div className="btns">
                {
                    edit ?
                        <div className="edit-delete">
                            <span className="edit" onClick={() => setShowModal(true)}>
                                <Pencil size="13"/>
                            </span>
                            <span className="delete" onClick={() => deleteProject(project)}>
                                <XCircle size="13"/>
                            </span>
                        </div>
                        :
                        project.numOfTodos === 0 ? ""
                            :
                            <div className="total-todos">
                                {project.numOfTodos}
                            </div>
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project} setShowModal={setShowModal}/>
            </Modal>
        </div>
    )
}

export default Project
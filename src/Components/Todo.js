import React, {useContext, useState} from 'react'
import {ArrowClockwise, CheckCircleFill, Circle, Trash} from "react-bootstrap-icons";
import firebase from "firebase/app";
import moment from "moment";
import {TodoContext} from "../context";

function Todo({todo}) {
    //state
    const [hover, setHover] = useState(false);

    //context
    const {selectedTodo, setSelectedTodo} = useContext(TodoContext);

    function deleteTodo(todo) {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .delete()
    }

    function checkTodo(todo) {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .update({
                checked: !todo.checked
            })
    }

    function repeatNextDay(todo) {
        const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days');

        const repeatedTodo = {
            ...todo,
            checked: false,
            date: nextDayDate.format('MM/DD/YYYY'),
            day: nextDayDate.format('d'),
        }
        delete repeatedTodo.id;
        firebase
            .firestore()
            .collection('todos')
            .add(repeatedTodo)

    }

    function handleDelete(todo) {
        deleteTodo(todo);
        if (selectedTodo === todo) {
            setSelectedTodo(undefined)
        }

    }

    return (
        <div className='Todo'>
            <div className="todo-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className="check-todo" onClick={() => checkTodo(todo)}>
                    {
                        todo.checked ?
                            <span className="checked">
                                <CheckCircleFill color="bebebe"/>

                            </span>
                            :
                            <span className="unchecked">
                                <Circle color={todo.color}/>

                            </span>

                    }
                </div>
                <div className="text" onClick={() => setSelectedTodo(todo)}>
                    <p style={{color: todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise/>
                        </span>
                    }

                </div>
                <div className="delete-todo" onClick={() => handleDelete(todo)}>
                    {
                        (todo.checked || hover) &&
                        <span>
                            <Trash/>
                        </span>
                    }

                </div>

            </div>
        </div>
    )
}

export default Todo
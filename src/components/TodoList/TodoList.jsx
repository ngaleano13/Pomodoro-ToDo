import { useEffect, useState } from "react";
import './todolist.css'

export const TodoList = () => {

    const getStorageToDo = () =>{
        let res = localStorage.getItem("todos")
        let data = JSON.parse(res)
        if(data){
            return data
        }
        return[]
    }

    const [todos, setTodo] = useState(getStorageToDo());

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const handleSumbit = (e) => {
        e.preventDefault()
        let task = e.target.task.value;
        if (!task) {
            alert("Ingrese una tarea valida")
            return
        }
        setTodo([...todos, { task: task, completed: false }])
        e.target.reset();
    }

    const checkTask = (i) => {
        let newTodo = [...todos];
        newTodo[i].completed = !newTodo[i].completed;
        setTodo(newTodo);
    }

    const deleteTask = (i) => {
        let newTodo = [...todos];
        newTodo.splice(i, 1)
        setTodo(newTodo);
    }

    return (
            <div className="form-container">
                <h2 className="title-todo">Tareas</h2>

                <form className="form" onSubmit={handleSumbit}>
                    <input className="input-form" placeholder="Nueva tarea (50 caracteres)" name="task" maxLength="50"/>
                    <button className="btn-form fa-solid fa-plus" type="sumbit"></button>
                </form>

                {
                    todos.map((todos, i) => {
                        return (
                            <div key={i} className="task-todo">
                                <div className="task-text">
                                    <p>{todos.task}</p>
                                </div>
                                <div className="task-icons">
                                    <i className={"check-task " + (todos.completed ? "fa-regular fa-square-check" : "fa-regular fa-square")} onClick={() => checkTask(i)}></i>
                                    <i className="delete-task fa-solid fa-trash" onClick={() => deleteTask(i)}></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    )
}
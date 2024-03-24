import { Pomodoro } from "./Pomodoro/Pomodoro"
import { TodoList } from "./TodoList/TodoList"
import './layout.css'

export const Layout = () => {
    return(
        <div className="layout">
            <Pomodoro></Pomodoro>
            <TodoList></TodoList>
        </div>
    )
}
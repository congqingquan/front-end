import { useState } from 'react';

const Todo = ({ title, taskList, changeTaskChecked }) => {
    return (
        <div>
            {title}
            <ul>
                {taskList.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={(event) => changeTaskChecked(event, task)}
                        />
                        {task.desc}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    let [taskDesc, setTaskDesc] = useState('');
    let [taskList, setTaskList] = useState([]);
    let todoTaskList = taskList.filter((task) => !task.checked);
    let doneTaskList = taskList.filter((task) => task.checked);
    let handleInputTaskDesc = (event) => setTaskDesc(event.target.value);

    let addNewTodoTask = (taskDesc) => {
        setTaskList((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                desc: taskDesc,
                checked: false,
            },
        ]);
        setTaskDesc('');
    };

    const changeTaskChecked = (event, task) => {
        setTaskList((prevState) => {
            let newTaskList = [...prevState];
            newTaskList.forEach((t) => {
                if (t.id === task.id) t.checked = event.target.checked;
            });
            return newTaskList;
        });
    };

    return (
        <>
            <input type="text" value={taskDesc} onChange={handleInputTaskDesc} />
            <button onClick={() => addNewTodoTask(taskDesc)}>Add task</button>
            <Todo
                title={<h1>Todo：{todoTaskList.length}</h1>}
                taskList={todoTaskList}
                changeTaskChecked={changeTaskChecked}
            />
            <Todo
                title={<h1>Done：{doneTaskList.length}</h1>}
                taskList={doneTaskList}
                changeTaskChecked={changeTaskChecked}
            />
        </>
    );
};

export default App;

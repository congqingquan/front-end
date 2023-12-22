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
                // 错误: 依赖内部数据。由于严格模式会执行两次，导致命中元素的 checked 又会被修改回来
                // if (t.id === task.id) {
                //     t.checked = !t.checked;
                // }
                // 正确: 不依赖内部数据。无论修改状态函数会执行多少次，event 中的数据都是不变的，不会出现依赖内部数据而导致程序错误。
                if (t.id === task.id) t.checked = event.target.checked;
            });
            console.log(JSON.stringify(newTaskList));
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

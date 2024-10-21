import { useState } from 'react';

// 初版烂代码...

const Todo = () => {
    let [todoList, setTodoList] = useState([]);
    let [doneList, setDoneList] = useState([]);

    let addNewTodoTask = (desc) => {
        todoList = [
            ...todoList,
            {
                id: todoList.length + 1,
                desc,
            },
        ];
        setTodoList(todoList);
    };

    let joinTodoListCallback = (task) => {
        todoList = [
            ...todoList,
            {
                id: todoList.length + 1,
                desc: task.desc,
            },
        ];
        setTodoList(todoList);

        setDoneList([...doneList.filter((t) => t.id !== task.id)]);
    };

    let joinDoneListCallback = (task) => {
        doneList = [
            ...doneList,
            {
                id: doneList[doneList.length - 1] ? doneList[doneList.length - 1].id + 1 : 1,
                desc: task.desc,
            },
        ];
        setDoneList(doneList);

        setTodoList([...todoList.filter((t) => t.id !== task.id)]);
    };

    return (
        <div>
            <TodoList todoList={todoList} addNewTodoTask={addNewTodoTask} joinDoneListCallback={joinDoneListCallback} />
            <DoneList doneList={doneList} joinTodoListCallback={joinTodoListCallback} />
        </div>
    );
};

const TodoList = ({ todoList, addNewTodoTask, joinDoneListCallback }) => {
    let [taskDesc, setTaskDesc] = useState('');
    let handleInputTaskDesc = (event) => setTaskDesc(event.target.value);
    return (
        <div>
            <input type="text" value={taskDesc} onChange={handleInputTaskDesc} />
            <button onClick={() => addNewTodoTask(taskDesc)}>Add task</button>
            <h1>Todo：{todoList.length}</h1>
            <ul>
                {todoList.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" onChange={() => joinDoneListCallback(task)} />
                        {task.desc}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DoneList = ({ doneList, joinTodoListCallback }) => {
    return (
        <div>
            <h1>Done：{doneList.length}</h1>
            <ul>
                {doneList.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked="checked" onChange={() => joinTodoListCallback(task)} />
                        <span style={{ textDecoration: 'line-through' }}>{task.desc}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    return (
        <>
            <Todo />
        </>
    );
};

export default App;

import { createContext, useContext, useState, useReducer } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
};

// 多页面的共享状态，推荐使用三方库，如：Redux。单页面可以使用 useContext。

// ================================================== Context Manager ==================================================

let dataListReducer = (state, action) => {
    let handleAdd = (state, value) => {
        return [
            ...state,
            {
                id: state[state.length - 1].id + 1,
                name: value,
            },
        ];
    };

    let handleRemove = (state, id) => {
        return state.filter((data) => data.id !== id);
    };

    let handleEdit = (state, id) => {
        return state.map((data) => {
            if (data.id === id) {
                data = { ...data, name: `Modified ${data.name}` };
            }
            return data;
        });
    };

    switch (action.type) {
        case 'add':
            return handleAdd(state, action.value);
        case 'remove':
            return handleRemove(state, action.id);
        case 'edit':
            return handleEdit(state, action.id);
        default:
            throw new Error('Unsupported operation');
    }
};

const ListContentContext = createContext([]);
const ListDispatchContext = createContext(null);
const ContextManager = ({ children }) => {
    let [dataList, dispatch] = useReducer(
        dataListReducer,
        [
            {
                id: 1,
                name: 'HALO',
            },
            {
                id: 2,
                name: 'cortana',
            },
            {
                id: 3,
                name: 'john',
            },
        ],
        (initializerArg) => {
            console.log(initializerArg);
            return initializerArg;
        },
    );
    return (
        <ListContentContext.Provider value={dataList}>
            <ListDispatchContext.Provider value={dispatch}>
                {/* 注入使用上下文的组件 */}
                {children}
            </ListDispatchContext.Provider>
        </ListContentContext.Provider>
    );
};

// ================================================== Component ==================================================

const ListHead = () => {
    let [addValue, setAddValue] = useState('');
    let listDispatch = useContext(ListDispatchContext);
    let handleAddChange = (e) => {
        setAddValue(e.target.value);
    };
    return (
        <div>
            <input type="text" value={addValue} onChange={handleAddChange} />
            <button onClick={() => listDispatch({ type: 'add', value: addValue })}>Add</button>
        </div>
    );
};

const ListContent = () => {
    let listContent = useContext(ListContentContext);
    let listDispatch = useContext(ListDispatchContext);
    return (
        <div>
            <ul>
                {listContent.map((data) => (
                    <li key={data.id}>
                        {data.name}
                        <button onClick={() => listDispatch({ type: 'remove', id: data.id })}>Remove</button>
                        <button onClick={() => listDispatch({ type: 'edit', id: data.id })}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    return (
        <div style={boxStyle}>
            <ContextManager>
                <ListHead />
                <ListContent />
            </ContextManager>
        </div>
    );
};

export default App;

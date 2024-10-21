import { useReducer, useState } from 'react';
import { useImmerReducer } from 'use-immer';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
};

// useReducer：用于优化 state 的复杂操作。将操作 state 的逻辑代码进行拆分。

// 1. 优化前
// const App = () => {
//     let [addValue, setAddValue] = useState('');
//     let [dataList, setDataList] = useState([
//         {
//             id: 1,
//             name: 'HALO',
//         },
//         {
//             id: 2,
//             name: 'cortana',
//         },
//         {
//             id: 3,
//             name: 'john',
//         },
//     ]);
//
//     let handleAddChange = (e) => {
//         setAddValue(e.target.value);
//     };
//
//     let handleAdd = (addValue) => {
//         setDataList((prevState) => {
//             let newDataList = [...prevState];
//             newDataList.push({
//                 id: dataList[dataList.length - 1].id + 1,
//                 name: addValue,
//             });
//             return newDataList;
//         });
//
//         setAddValue('');
//     };
//
//     let handleRemove = (id) => {
//         setDataList((prevState) => prevState.filter((data) => data.id !== id));
//     };
//
//     let handleEdit = (id) => {
//         setDataList((prevState) => {
//             return prevState.map((data) => {
//                 if (data.id === id) {
//                     data = { ...data, name: `Modified ${data.name}` };
//                 }
//                 return data;
//             });
//         });
//     };
//
//     return (
//         <div style={boxStyle}>
//             <div>
//                 <input type="text" value={addValue} onChange={handleAddChange} />
//                 <button onClick={() => handleAdd(addValue)}>Add</button>
//             </div>
//             <ul>
//                 {dataList.map((data) => (
//                     <li key={data.id}>
//                         {data.name}
//                         <button onClick={() => handleRemove(data.id)}>Remove</button>
//                         <button onClick={() => handleEdit(data.id)}>Edit</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// 2. 优化后
// let dataListReducer = (state, action) => {
//     let handleAdd = (state, value) => {
//         return [
//             ...state,
//             {
//                 id: state[state.length - 1].id + 1,
//                 name: value,
//             },
//         ];
//     };
//
//     let handleRemove = (state, id) => {
//         return state.filter((data) => data.id !== id);
//     };
//
//     let handleEdit = (state, id) => {
//         return state.map((data) => {
//             if (data.id === id) {
//                 data = { ...data, name: `Modified ${data.name}` };
//             }
//             return data;
//         });
//     };
//
//     switch (action.type) {
//         case 'add':
//             return handleAdd(state, action.value);
//         case 'remove':
//             return handleRemove(state, action.id);
//         case 'edit':
//             return handleEdit(state, action.id);
//         default:
//             throw new Error('Unsupported operation');
//     }
// };
//
// const App = () => {
//     let [addValue, setAddValue] = useState('');
//     let [dataList, dispatch] = useReducer(
//         dataListReducer,
//         [
//             {
//                 id: 1,
//                 name: 'HALO',
//             },
//             {
//                 id: 2,
//                 name: 'cortana',
//             },
//             {
//                 id: 3,
//                 name: 'john',
//             },
//         ],
//         // 对默认 initializerArg 的二次处理
//         (initializerArg) => {
//             console.log(initializerArg);
//             return initializerArg;
//         },
//     );
//
//     let handleAddChange = (e) => {
//         setAddValue(e.target.value);
//     };
//
//     return (
//         <div style={boxStyle}>
//             <div>
//                 <input type="text" value={addValue} onChange={handleAddChange} />
//                 <button onClick={() => dispatch({ type: 'add', value: addValue })}>Add</button>
//             </div>
//             <ul>
//                 {dataList.map((data) => (
//                     <li key={data.id}>
//                         {data.name}
//                         <button onClick={() => dispatch({ type: 'remove', id: data.id })}>Remove</button>
//                         <button onClick={() => dispatch({ type: 'edit', id: data.id })}>Edit</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// 3. 优化后：通过 useImmer，简化复杂对象的操作
let dataListReducer = (draft, action) => {
    let handleAdd = (draft, value) => {
        draft.push({
            id: draft[draft.length - 1].id + 1,
            name: value,
        });
        return draft;
    };

    let handleRemove = (draft, id) => {
        return draft.filter((data) => data.id !== id);
    };

    let handleEdit = (draft, id) => {
        return draft.map((data) => {
            if (data.id === id) {
                data = { ...data, name: `Modified ${data.name}` };
            }
            return data;
        });
    };

    switch (action.type) {
        case 'add':
            return handleAdd(draft, action.value);
        case 'remove':
            return handleRemove(draft, action.id);
        case 'edit':
            return handleEdit(draft, action.id);
        default:
            throw new Error('Unsupported operation');
    }
};

const App = () => {
    let [addValue, setAddValue] = useState('');
    let [dataList, dispatch] = useImmerReducer(
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
        // 对默认 initializerArg 的二次处理
        (initializerArg) => {
            console.log(initializerArg);
            return initializerArg;
        },
    );

    let handleAddChange = (e) => {
        setAddValue(e.target.value);
    };

    return (
        <div style={boxStyle}>
            <div>
                <input type="text" value={addValue} onChange={handleAddChange} />
                <button onClick={() => dispatch({ type: 'add', value: addValue })}>Add</button>
            </div>
            <ul>
                {dataList.map((data) => (
                    <li key={data.id}>
                        {data.name}
                        <button onClick={() => dispatch({ type: 'remove', id: data.id })}>Remove</button>
                        <button onClick={() => dispatch({ type: 'edit', id: data.id })}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

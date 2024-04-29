import { ReducerActionTypeEnum } from '@/store/reducer';
import { useDispatch, useSelector } from 'react-redux';

const Page11 = () => {

    // 解构时不能进行类型标注
    // let { value } = useSelector((state: ReducerState) => ({ key: state.value }));
    const { value } = useSelector((state: ReducerState) => state);

    const dispatch = useDispatch();

    const handleClick = () => dispatch({ type: ReducerActionTypeEnum.ADD, value: 1 });

    return (
        <div>
            state value: {value}
            <br></br>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default Page11;

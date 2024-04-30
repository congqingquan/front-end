import { ReducerActionTypeEnum } from '@/store/NumberStatus/reducer';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';

const Page11 = () => {
    // 解构时不能进行类型标注
    // let { value } = useSelector((state: ReducerState) => ({ key: state.value }));
    const { num } = useSelector((state: ReducerState) => state.NumberStatusReducer);

    const dispatch = useDispatch();

    const handleClick = () => dispatch({ type: ReducerActionTypeEnum.ADD, value: 1 });

    return (
        <div>
            num state: {num}
            <br></br>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default Page11;

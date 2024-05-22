import { NumberStateActionTypeEnum } from '@/store/NumberState/NumberStateReducer';
import { useDispatch, useSelector } from 'react-redux';

const Page11 = () => {
    const state = useSelector((state: any) => {
        return state['NumberStateReducer'].state.num
    });
    const dispatch = useDispatch();
    const handleClick = () => dispatch({ type: NumberStateActionTypeEnum.ADD, value: 1 });

    return (
        <div>
            num state: {state}
            <br></br>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default Page11;

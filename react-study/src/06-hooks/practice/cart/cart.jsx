import Item from './item.jsx';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';

let boxStyle = {
    width: '100vw',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => {
    const [data, setData] = useImmer([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get('./cart-data.json').then((r) => {
            if (r.data.code === 200) {
                setData(r.data.data);
                setTotal(r.data.data.map((el) => el.quantity * el.price).reduce((prev, cur) => prev + cur, 0));
            }
        });
    }, []);

    const add2ShoppingCart = (id) => {
        setData((draft) => {
            draft.forEach((el) => {
                if (el.id === id) {
                    el.active = !el.active;
                }
            });
            computeTotal(draft);
            return draft;
        });
    };

    const increaseQuantity = (id, num) => {
        setData((draft) => {
            draft.forEach((el) => {
                if (el.id === id) {
                    let newQuantity = el.quantity + num;
                    if (newQuantity < 0) {
                        return;
                    }
                    el.quantity = newQuantity;
                }
            });
            computeTotal(draft);
            return draft;
        });
    };

    const computeTotal = (data) => {
        let newTotal = data
            .filter((el) => el.active)
            .map((el) => el.quantity * el.price)
            .reduce((prev, cur) => prev + cur, 0);
        setTotal(newTotal);
    };

    return (
        <>
            <div style={boxStyle}>
                <Item data={data} add2ShoppingCart={add2ShoppingCart} increaseQuantity={increaseQuantity} />
            </div>
            <div style={{ ...boxStyle, height: 30 }}>总金额：{total}</div>
        </>
    );
};

export default App;

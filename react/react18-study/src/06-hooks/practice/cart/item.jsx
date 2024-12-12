import Style from './item.module.css';

const Item = ({ data, add2ShoppingCart, increaseQuantity }) => {
    return data.map((el) => {
        return (
            <div className={Style.cart}>
                <div>{el.name}</div>
                <div>价格：{el.price}</div>
                <div>
                    数量：
                    <span onClick={() => increaseQuantity(el.id, -1)}>-</span>
                    {el.quantity}
                    <span onClick={() => increaseQuantity(el.id, 1)}>+</span>
                </div>
                <button
                    className={el.active ? Style.activeBtn : Style.noActiveBtn}
                    onClick={() => add2ShoppingCart(el.id)}>
                    {el.active ? '取消购买' : '添加到购物车'}
                </button>
            </div>
        );
    });
};

export default Item;

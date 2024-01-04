import './MyButton.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const MyButton = ({ type, danger, size, icon, children }) => {
    const SizeMap = {
        small: 'sm',
        large: 'lg',
    };
    let sizeMapElement = SizeMap[size];
    console.log(sizeMapElement);
    let cns = classNames({
        'my-btn': true,
        'my-btn-default': true,
        'my-btn-primary': type && type === 'primary',
        'my-btn-dangerous': danger,
        [`my-btn-${SizeMap[size]}`]: true,
    });
    return <button className={cns}>{children}</button>;
};

MyButton.defaultProps = {
    type: PropTypes.string,
    danger: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large']),
    icon: PropTypes.string,
};

export default MyButton;

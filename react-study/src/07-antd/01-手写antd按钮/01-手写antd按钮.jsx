import { Button, Space } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { MyButton } from './MyButton';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => {
    return (
        <>
            <div style={boxStyle}>
                <Space>
                    <Button>按钮1</Button>
                    <Button type={'primary'}>按钮2</Button>
                    <Button danger>按钮3</Button>
                    <Button type={'primary'} danger>
                        按钮4
                    </Button>
                    <Button type={'primary'} danger size={'small'}>
                        按钮6
                    </Button>
                    <Button type={'primary'} danger size={'large'}>
                        按钮7
                    </Button>
                    <Button type={'primary'} danger size={'large'} icon={<PlusCircleFilled />}>
                        按钮8
                    </Button>
                </Space>
            </div>

            <div style={boxStyle}>
                <Space>
                    <MyButton>按钮1</MyButton>
                    <MyButton type={'primary'}>按钮2</MyButton>
                    <MyButton danger>按钮3</MyButton>
                    <MyButton type={'primary'} danger>
                        按钮4
                    </MyButton>
                    <MyButton type={'primary'} danger size={'small'}>
                        按钮6
                    </MyButton>
                    <MyButton type={'primary'} danger size={'large'}>
                        按钮7
                    </MyButton>
                    <MyButton type={'primary'} danger size={'large'} icon={<PlusCircleFilled />}>
                        按钮8
                    </MyButton>
                </Space>
            </div>
        </>
    );
};

export default App;

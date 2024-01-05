import {
    Form,
    Input,
    Select,
    Radio,
    DatePicker,
    Checkbox,
    Divider,
    TreeSelect,
    Avatar,
    Upload,
    message,
    Space,
    Button,
    Cascader,
} from 'antd';
import {
    AntDesignOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LoadingOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const App = () => {
    // prefix / suffix
    const webSiteSelectBefore = (
        <Select defaultValue="http://">
            <Select.Option value="http://">http://</Select.Option>
            <Select.Option value="https://">https://</Select.Option>
        </Select>
    );

    const webSiteSelectAfter = (
        <Select defaultValue=".com">
            <Select.Option value=".com">.com</Select.Option>
            <Select.Option value=".jp">.jp</Select.Option>
            <Select.Option value=".cn">.cn</Select.Option>
            <Select.Option value=".org">.org</Select.Option>
        </Select>
    );

    const phoneNumberSelectBefore = (
        <Select defaultValue="+86">
            <Select.Option value="+86">+86</Select.Option>
            <Select.Option value="+87">+87</Select.Option>
        </Select>
    );

    // validation
    let getRequiredRule = (message) => {
        return {
            required: true,
            message,
        };
    };

    // 复选框
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    // const [checkedList, setCheckedList] = useState([]);
    // const checkAll = plainOptions.length === checkedList.length;
    // const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    // const onCheckChange = (list) => {
    //     setCheckedList(list);
    // };
    // const onCheckAllChange = (e) => {
    //     setCheckedList(e.target.checked ? plainOptions : []);
    // };

    // 级联下拉
    const areaOptions = [
        {
            value: '黑龙江',
            label: '黑龙江',
            children: [
                {
                    value: '哈尔滨',
                    label: '哈尔滨',
                    children: [
                        {
                            value: '道里区',
                            label: '道里区',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];

    // 树形下拉
    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ];

    const tProps = {
        treeData,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };

    // 头像上传
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </div>
    );

    const handleAvatarChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!').then((r) => {
                console.log(r);
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!').then((r) => {
                console.log(r);
            });
        }
        return isJpgOrPng && isLt2M;
    };

    // 表单提交
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };
    const onFinish = (values) => {
        console.log(values);
        // form.submit();
    };

    return (
        <Space>
            <Form form={form} name="user-form" onFinish={onFinish}>
                <Form.Item name="username" label="Username" rules={[getRequiredRule('Please input username')]}>
                    <Input placeholder="Username" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[getRequiredRule('Please input password')]}>
                    <Input.Password
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm password"
                    rules={[getRequiredRule('Please input confirm password')]}>
                    <Input.Password
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item name="blogWebSite" label="Blog" rules={[getRequiredRule('Please input' + ' blog url')]}>
                    <Input addonBefore={webSiteSelectBefore} addonAfter={webSiteSelectAfter} placeholder="Blog site" />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[getRequiredRule('Please input phone' + ' number')]}>
                    <Input addonBefore={phoneNumberSelectBefore} placeholder="Phone Number" />
                </Form.Item>

                <Form.Item name="intro" label="Intro" rules={[getRequiredRule('Please input intro')]}>
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    initialValue={1}
                    rules={[getRequiredRule('Please choose' + ' gender')]}>
                    <Radio.Group>
                        <Radio value={1}>male</Radio>
                        <Radio value={2}>female</Radio>
                        <Radio value={3}>other</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="hobbies" label="Hobbies" rules={[getRequiredRule('Please choose Hobbies')]}>
                    {/*<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>*/}
                    {/*    Check all*/}
                    {/*</Checkbox>*/}
                    {/*<Divider />*/}
                    {/*<Checkbox.Group options={plainOptions} value={checkedList} onChange={onCheckChange} />*/}
                    <Checkbox.Group options={plainOptions} />
                </Form.Item>

                <Form.Item name="birthday" label="Birthday" rules={[getRequiredRule('Please choose birthday')]}>
                    <DatePicker.RangePicker showTime />
                </Form.Item>

                <Form.Item name="area" label="Area" rules={[getRequiredRule('Please choose TreeSelect')]}>
                    <Cascader options={areaOptions} placeholder="Please select area" />
                </Form.Item>

                <Form.Item name="treeSelect" label="TreeSelect" rules={[getRequiredRule('Please select TreeSelect')]}>
                    <TreeSelect {...tProps} />
                </Form.Item>

                <Form.Item name="avatar" label="Avatar" rules={[getRequiredRule('Please choose avatar')]}>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleAvatarChange}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={onFill}>
                            Fill form
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default App;

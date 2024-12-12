import { Button, Switch } from "antd";
import { useEffect, useState } from "react";

const User1: React.FC = () => {

    const [defaultChecked, setDefaultChecked] = useState<boolean>(true);
    const [checked, seChecked] = useState<boolean>(true);

    console.log("Default checked: " + defaultChecked);
    console.log("Checked: " + checked);
    
    return <>
        <Switch
            defaultChecked={defaultChecked}
        />

        <Switch
            key={defaultChecked + ""}
            defaultChecked={defaultChecked}
        />

        <Switch
            checked={checked}
        />

        <br/>
        <br/>

        <Button onClick={() => {
            setDefaultChecked(!defaultChecked);
            seChecked(!checked);
        }}>
            Change switch
        </Button>
    </>
}

const User2: React.FC = () => {

    const [defaultChecked, setDefaultChecked] = useState<boolean>(true);
    const [checked, seChecked] = useState<boolean>(true);

    console.log("Default checked: " + defaultChecked);
    console.log("Checked: " + checked);
    
    useEffect(() => {
        // 模拟接口调用
        new Promise<{ apiRes: boolean}>(resolve => {
            resolve({ apiRes: false});
        }).then(reponse => {
            setTimeout(() => {
                setDefaultChecked(reponse.apiRes);
                seChecked(reponse.apiRes);
            }, 2000);
        });
    }, []);

    return <>
        <Switch
            defaultChecked={defaultChecked}
        />

        <Switch
            key={defaultChecked + ""}
            defaultChecked={defaultChecked}
        />

        <Switch
            checked={checked}
        />
    </>
}

export default User2;
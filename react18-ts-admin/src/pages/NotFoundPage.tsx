import { useEffect } from "react";

const NotFountPage: React.FC = () => {
    let arr = [1, 2]
    useEffect(() => {
        console.log("test");
            
        arr = [...arr]
    }, [arr]);
    return <>
        404
    </>
}

export default NotFountPage;
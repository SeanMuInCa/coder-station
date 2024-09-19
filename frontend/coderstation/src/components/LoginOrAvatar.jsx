import React, { useState } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
const LoginOrAvatar = () => {
	const user = useSelector(state => state.user)
    if(user.isLogin){
        return (
            <div>login</div>
        )
    }else{
        return (
            <Button type="primary" size="large">
                Login / Register
            </Button>
        );
    }
	
};

export default LoginOrAvatar;

import config from "./routeBeforeConfig";

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 假设你使用 Redux 存储用户状态

const RouteBefore = ({ children, requireLogin  }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);
  
    useEffect(() => {
      if (requireLogin && !user.isLoggedIn) {
        // 如果需要登录但用户未登录，则重定向到登录页面
        navigate('/issues', { state: { from: location.pathname } });
      }
    }, [requireLogin, user.isLoggedIn, navigate, location.pathname]);
  
    // 如果无需登录或用户已登录，则渲染子组件，否则不渲染
    return !requireLogin || user.isLoggedIn ? children : null;
};

export default RouteBefore;

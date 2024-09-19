import React, { useState } from 'react'
import { Button } from 'antd'
const LoginOrAvatar = () => {
    const [isLogin, setIsLogin] = useState(false)
  return (
    <Button type="primary" size="large">
					Login / Register
				</Button>
  )
}

export default LoginOrAvatar
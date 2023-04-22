import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const DashBoard: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const onFinish = () => {
		setLoading(true)
		// 在这里处理登录请求
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	return (
		<Form name='login-form' onFinish={onFinish} className='login-form'>
			<Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input prefix={<UserOutlined />} placeholder='Username' />
			</Form.Item>
			<Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
				<Input.Password prefix={<LockOutlined />} placeholder='Password' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
					Log in
				</Button>
			</Form.Item>
		</Form>
	)
}

export default DashBoard

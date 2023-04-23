import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'

const Login: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const onFinish = () => {
		setLoading(true)
		// 在这里处理登录请求
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	return (
		<div className='d-flex'>
			<img
				className='object-fit-cover w-100 h-100 position-absolute'
				alt='酒店'
				src='https://sitecore-cd-imgr.shangri-la.com/MediaFiles/6/F/E/{6FED1BBC-1D58-4F53-AB2C-59CFC918AB91}1920-800.jpg'
			/>
			<div
				className='border border-2 rounded-4 d-flex justify-content-center align-items-center bg-white'
				style={{ height: '600px', width: '400px', margin: '200px 7% 0 auto', zIndex: 1 }}
			>
				<Form name='normal_login' initialValues={{ remember: true }} onFinish={onFinish} style={{ width: '70%' }}>
					<Form.Item name='title'>
						<h1>登录</h1>
					</Form.Item>
					<Form.Item name='username' rules={[{ required: true, message: 'Please input your Username!' }]}>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
						<Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
					</Form.Item>
					<Form.Item>
						<Form.Item name='remember' valuePropName='checked' noStyle>
							<Checkbox>记住我</Checkbox>
						</Form.Item>

						<a className='login-form-forgot' href=''>
							忘记密码
						</a>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
							登录
						</Button>
						<br />
						<br />
						Or <a href='https://www.bilibili.com/'>现在注册!</a>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login

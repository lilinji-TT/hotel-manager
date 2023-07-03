import HowToRegIcon from '@mui/icons-material/HowToReg'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { registerMember } from '../../api'
import { useDialog } from '../../hooks/useDialog'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const theme = createTheme()

export default function SignUp() {
	const { showMessage, Dialog } = useDialog()
	const navigate = useNavigate()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		const userName = data.get('userName')
		const password = data.get('passWord')
		const activationCode = data.get('activationCode')
		const confirmPassword = data.get('confirmPassword')
		if (password !== confirmPassword) {
			showMessage({ content: '密码不一致', duration: 3000, type: 'warning' })
			return
		}
		const {
			data: { msg, code }
		} = await registerMember(userName, password, activationCode)
		if (code === 200) {
			showMessage({ content: msg, duration: 3000, type: 'success' })
			navigate('/login')
		} else {
			showMessage({ content: msg, duration: 3000, type: 'error' })
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<HowToRegIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						注册
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete='given-name'
									name='userName'
									required
									fullWidth
									id='userName'
									label='用户名'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='activationCode'
									label='激活码'
									name='activationCode'
									autoComplete='activationCode'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='passWord'
									label='密码'
									type='password'
									id='passWord'
									autoComplete='new-passWord'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='confirmPassword'
									label='确认密码'
									type='password'
									id='confirmPassword'
									autoComplete='confirmPassword'
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value='allowExtraEmails' color='primary' />}
									label='I want to receive inspiration, marketing promotions and updates via email.'
								/>
							</Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							确定
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/login' variant='body2'>
									已经拥有账户？立即登录
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
				<Dialog />
			</Container>
		</ThemeProvider>
	)
}

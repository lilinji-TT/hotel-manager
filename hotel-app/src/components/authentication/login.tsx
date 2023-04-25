import PersonIcon from '@mui/icons-material/Person'
import { Alert, CircularProgress, Snackbar } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import { login } from '../../api'
import { UserContext } from '../../provider/UserProvider'
import { TextWithValidatField } from './validateField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='#'>
				CLRY
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const theme = createTheme()

export default function SignInSide() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const { userDispatch } = React.useContext(UserContext)

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			if (!username.trim() || !password.trim()) return
			const login_data = {
				userName: username.trim(),
				password: password.trim()
			}
			setLoading(true)
			const res = await login(login_data)
			!res && (userDispatch({ type: 'SET_LOGIN_STATE' }), setLoading(false))
		} catch (err) {
			//...
			setOpen(true)
			setLoading(false)
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://n.sinaimg.cn/sinacn21/214/w2048h1366/20180719/dd8d-hfnsvzc0685403.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<PersonIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextWithValidatField
								required
								fullWidth
								id='userName'
								label='用户名'
								name='userName'
								autoComplete='userName'
								autoFocus
								isValidate={true}
								variant='outlined'
								helperText='用户名不能为空，请填写用户名！'
								onChange={(e) => setUsername(e.target.value)}
							/>
							<TextWithValidatField
								margin='normal'
								required
								fullWidth
								name='password'
								label='密码'
								type='password'
								id='password'
								autoComplete='current-password'
								helperText='密码不能为空，请填写密码！'
								isValidate={true}
								variant={'outlined'}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='记住我' />
							<Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2, height: '2rem' }}>
								{loading ? (
									<CircularProgress
										size={24}
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px'
										}}
									/>
								) : (
									'登录'
								)}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href='/reset-password' variant='body2'>
										忘记密码?
									</Link>
								</Grid>
								<Grid item>
									<Link href={'/register'}>{'Sign Up'}</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert elevation={6} variant='filled' severity='error'>
					账号或者密码错误
				</Alert>
			</Snackbar>
		</ThemeProvider>
	)
}

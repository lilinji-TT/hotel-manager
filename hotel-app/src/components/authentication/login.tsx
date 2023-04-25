import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'

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
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		// eslint-disable-next-line no-console
		console.log({
			email: data.get('email'),
			password: data.get('password')
		})
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
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href='/reset-password' variant='body2'>
										Forgot password?
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
		</ThemeProvider>
	)
}

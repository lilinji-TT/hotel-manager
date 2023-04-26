import { useState } from 'react'
import { Snackbar, Alert, Grow } from '@mui/material'

interface DialogOptions {
	content: string
	duration?: number
	type?: 'error' | 'warning' | 'info' | 'success'
}

export const useDialog = () => {
	const [open, setOpen] = useState(false)
	const [options, setOptions] = useState<DialogOptions>({
		content: '',
		duration: 3000,
		type: 'info'
	})

	const showMessage = (options: DialogOptions) => {
		setOptions(options)
		setOpen(true)
	}

	const Dialog = () => {
		const { content, duration, type } = options

		return (
			<Grow in={open} style={{ transformOrigin: '0 0 0' }} {...(open ? { timeout: 500 } : {})}>
				<Snackbar
					open={open}
					autoHideDuration={duration}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					onClose={() => {
						setOpen(false)
					}}
				>
					<Alert severity={type} variant='standard'>
						{content}
					</Alert>
				</Snackbar>
			</Grow>
		)
	}

	return { showMessage, Dialog }
}

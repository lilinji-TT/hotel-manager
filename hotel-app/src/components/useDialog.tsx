import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

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

	const handleClose = () => {
		setOpen(false)
	}

	const showMessage = (options: DialogOptions) => {
		setOptions(options)
		setOpen(true)
	}

	const Dialog = () => {
		const { content, duration, type } = options

		return (
			<Snackbar
				open={open}
				autoHideDuration={duration}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={handleClose}
			>
				<Alert severity={type} variant='standard'>
					{content}
				</Alert>
			</Snackbar>
		)
	}

	return { showMessage, Dialog }
}

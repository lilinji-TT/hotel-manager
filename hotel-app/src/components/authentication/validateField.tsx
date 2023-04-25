import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField/TextField'
import { useState } from 'react'

export interface validateFieldProps extends OutlinedTextFieldProps {
	isValidate: boolean
}
export const TextWithValidatField: React.FC<validateFieldProps> = ({
	isValidate = false,
	autoComplete,
	name,
	label,
	id,
	autoFocus,
	helperText,
	variant,
	type,
	onChange
}) => {
	const [err, setErr] = useState<boolean>(false)
	const [text, setText] = useState<string>(helperText as string)

	const validation = {
		autoFocus
	}
	const handleChange = (e) => {
		onChange?.(e)
	}
	const handleBlur = (e) => {
		if (!e.target.value) {
			setErr(true)
			return
		} else {
			setErr(false)
			setText('')
		}

		const chineseRegex = /[\u4e00-\u9fa5]/
		if (chineseRegex.test(e.target.value)) {
			setErr(true)
			setText('不能使用中文作为用户名')
		} else {
			setErr(false)
			setText('')
		}
	}

	const validateFieldProps = isValidate ? validation : {}
	return (
		<TextField
			variant={variant}
			margin='normal'
			autoComplete={autoComplete}
			error={err}
			name={name}
			label={label}
			type={type}
			id={id}
			onChange={handleChange}
			onBlur={handleBlur}
			helperText={err ? text : ''}
			required
			fullWidth
			{...validateFieldProps}
		/>
	)
}

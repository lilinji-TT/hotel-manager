import { Stack } from '@mui/material'
import React, { ReactNode } from 'react'

interface StackProps {
	children: ReactNode
	spacing: number | string
}
export const HStack: React.FC<StackProps> = ({ children, spacing }) => {
	return (
		<Stack direction='row' spacing={spacing}>
			{children}
		</Stack>
	)
}
export const VStack: React.FC<StackProps> = ({ children, spacing }) => {
	return (
		<Stack direction='column' spacing={spacing}>
			{children}
		</Stack>
	)
}

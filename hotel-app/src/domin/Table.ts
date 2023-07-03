import { ReactNode } from 'react'
import { HeadCell } from './Headline'

export type Order = 'asc' | 'desc'

export interface TableListHeadProps<T> {
	numSelected: number
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
	order: Order
	orderBy: string
	selectBox: boolean
	rowCount: number
	headCells: HeadCell[]
}

export interface TableListToolbarProps {
	title: string
	numSelected: number
	children?: ReactNode
	search: string
	handleSearchChange: (search: string) => void
}

export interface TableListProps<T> {
	title: string
	headCells: HeadCell[]
	rows: T[]
	selectBox: boolean
	children?: ReactNode
	selected: string[]
	search: string
	handleSearchChange: (search: string) => void
	handleSelectChange: (selectValue: string[]) => void
}

export interface TableModelProps {
	title: string
	open: boolean
	handleClose: () => void
	children?: ReactNode
}

export interface TableModelTitleProps {
	id: string
	children?: React.ReactNode
	onClose: () => void
}

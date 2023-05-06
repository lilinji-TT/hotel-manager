import { Button, Table } from '@mui/material'
import React from 'react'
import { RecordContext } from '../../provider/RecordProvider'
const Manage: React.FC = () => {
	const { recordState, recordDispatch } = React.useContext(RecordContext)
	const handleSettlement = (record) => {
		recordDispatch({
			type: 'SET_HISTORY_RECORD_STATE',
			payload: { ...record, checkOutDate: new Date().toISOString().slice(0, 10), fee: 100 }
		})
	}
	const Switch = ({ record }) => {
		return (
			<>
				<td>{record.number}</td>
				<td>{record.type}</td>
				<td>{record.customName}</td>
				<td>{record.idCard}</td>
				<td>{record.phone}</td>
				<td>{record.checkInDate}</td>
				<td>{record.handlerName}</td>
				<td>
					<Button variant='text' color='primary' onClick={() => handleSettlement(record)}>
						结算
					</Button>
				</td>
			</>
		)
	}
	return (
		<>
			<Table
				aria-label='basic table'
				sx={{
					'& tr > *:first-of-type".': {
						position: 'sticky',
						left: 0,
						boxShadow: '1px 0 var(--TableCell-borderColor)',
						bgcolor: 'background.surface'
					},
					'& tr > *:last-child': {
						position: 'sticky',
						right: 0,
						bgcolor: 'var(--TableCell-headBackground)'
					}
				}}
			>
				<thead>
					<tr>
						<th style={{ width: 200 }}>房间号</th>
						<th style={{ width: 200 }}>房间类型&nbsp;</th>
						<th style={{ width: 200 }}>客户姓名&nbsp;</th>
						<th style={{ width: 200 }}>客户身份证号&nbsp;</th>
						<th style={{ width: 200 }}>客户电话号&nbsp;</th>
						<th style={{ width: 200 }}>入住时间&nbsp;</th>
						<th style={{ width: 200 }}>处理员工姓名&nbsp;</th>
						<th aria-label='last' style={{ width: 'var(--Table-lastColumnWidth)' }} />
					</tr>
				</thead>
				<tbody>
					{recordState.records.map((record, index) => {
						return (
							<tr key={index}>
								<Switch record={record} />
							</tr>
						)
					})}
				</tbody>
			</Table>
		</>
	)
}

export default Manage

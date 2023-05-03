import React from 'react'
import { RecordContext } from '../../provider/RecordProvider'
const Manage: React.FC = () => {
	const { recordState } = React.useContext(RecordContext)
	return (
		<div>
			{recordState.map((record, index) => (
				<div key={index}>{record.phone}</div>
			))}
		</div>
	)
}

export default Manage

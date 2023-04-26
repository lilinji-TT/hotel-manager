import React from 'react'
import { RoomStatus, RoomType } from '../../domin/Room'
import { RoomListPage } from './roomList'
const Room: React.FC = () => {
	const roomList = Array.from({ length: 10 }, (_, index) => ({
		_id: `${index}`,
		number: '100' + index,
		price: 100,
		status: RoomStatus.AVAILABLE,
		type: RoomType.SINGLE
	}))
	return <RoomListPage roomList={roomList} />
}

export default Room

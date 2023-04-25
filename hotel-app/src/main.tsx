import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import RecordProvider from './provider/RecordProvider'
import RoomProvider from './provider/RoomProvider'
import UserProvider from './provider/UserProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Suspense fallback={<div>Loading</div>}>
		<React.StrictMode>
			<UserProvider>
				<RoomProvider>
					<RecordProvider>
						<App />
					</RecordProvider>
				</RoomProvider>
			</UserProvider>
		</React.StrictMode>
	</Suspense>
)

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import UserProvider from './provider/UserProvider'
import RoomProvider from './provider/RoomProvider'
import RecordProvider from './provider/RecordProvider'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'

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

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import UserProvider from './provider/UserProvider'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Suspense fallback={<div>Loading</div>}>
		<React.StrictMode>
			<UserProvider>
				<App />
			</UserProvider>
		</React.StrictMode>
	</Suspense>
)

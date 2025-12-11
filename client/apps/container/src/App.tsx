import React, { Suspense } from 'react'

// @ts-ignore
const MenuEditor = React.lazy(() => import('menuEditor/MenuEditor'))
// @ts-ignore  
const MenuViewer = React.lazy(() => import('menuViewer/MenuViewer'))
// @ts-ignore
const OrderBoard = React.lazy(() => import('orderBoard/OrderBoard'))
// @ts-ignore
const AdminDashboard = React.lazy(() => import('adminDashboard/AdminDashboard'))
// @ts-ignore
const LandingPage = React.lazy(() => import('landingPage/LandingPage'))

function App() {
  return (
  <div className="text-8xl font-bold text-red-600">
  Tailwind Working in Container!
</div>

  )
}

export default App
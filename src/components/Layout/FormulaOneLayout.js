import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function FormulaOneLayout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  )
}
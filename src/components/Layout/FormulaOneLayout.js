import Navbar from './Navbar'
import Footer from './Footer'

export default function FormulaOneLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
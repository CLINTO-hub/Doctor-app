import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Route from '../Routes/Route'

function Layout() {
  return (
    <>
    <Header/>
    <main>
     <Route/>
      </main>
    <Footer/>  
    </>
  )
}

export default Layout

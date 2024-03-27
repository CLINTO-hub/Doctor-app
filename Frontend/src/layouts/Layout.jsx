import React from 'react'
import { useRoutes, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Route from '../Routes/Route'

function Layout() {

  const location = useLocation();
  const isAdminLoginRoute = location.pathname === '/Admin/Login' || location.pathname === '/Admin/Dashboard' ;
  const showHeaderAndFooter = !isAdminLoginRoute;


  return (
    <>
    {showHeaderAndFooter && <Header />}
    <main>
     <Route/>
      </main>
      {showHeaderAndFooter && <Footer />}
    </>
  )
}

export default Layout

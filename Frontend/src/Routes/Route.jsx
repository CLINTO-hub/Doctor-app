import React from 'react'
import Home from '../pages/Home'
import Service from '../pages/Cart'
import Contact from '../pages/Contact'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Supplier from '../pages/Supplier/Supplier'
import SupplierDetails from '../pages/Supplier/SupplierDetails'

import {Routes, Route} from 'react-router-dom'
import SupplierSignup from '../pages/Supplier/SupplierSignup'

const Routers = ()=>{
    return( <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/home" element = {<Home/>} />
        <Route path = "/Cart" element = {<Service/>} />
        <Route path = "/Contact" element = {<Contact/>} />
        <Route path = "/Signup" element = {<Signup/>} />
        <Route path = "/Login" element = {<Login/>} />
        <Route path = "/Supplier" element = {<Supplier/>} />
        <Route path = "/Suppliersignup" element = {<SupplierSignup/>} />
        <Route path = "/SupplierDetails/:id" element = {<SupplierDetails/>} />
    </Routes>
    )
}



export default Routers

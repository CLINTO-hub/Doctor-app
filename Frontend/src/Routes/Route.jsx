import React from 'react'
import Home from '../pages/Home'

import Contact from '../pages/Contact'
import Signup from '../pages/Signup'
import Login from '../pages/Login'



import {Routes, Route} from 'react-router-dom'

import FindaDoctor from '../pages/FindaDoctor'
import Services from '../pages/Services'
import Doctor from '../pages/Doctor/Doctor'
import DoctorDetails from '../pages/Doctor/DoctorDetails'
import Myaccount from '../Dashboard/user-account/Myaccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import CheckOutSuccess from '../pages/CheckOutSuccess'
import Chat from '../components/Chat/chat'
import ChatDoctor from '../components/Chat/chatDoctor'
import Error from '../pages/Error/Error.jsx'

const Routers = ()=>{
    return( <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/home" element = {<Home/>} />
        <Route path = "/doctors" element = {<ProtectedRoute><Doctor/></ProtectedRoute>} />
        <Route path = '/doctorsdetails/:id' element = {<ProtectedRoute allowedRoles={['patient']}><DoctorDetails/></ProtectedRoute>}/>
        <Route path = "/Contact" element = {<ProtectedRoute><Contact/></ProtectedRoute>} />
        <Route path = "/Signup" element = {<Signup/>} />
        <Route path = "/Login" element = {<Login/>} />
        <Route path = "/Services" element = {<Services/>}/>
        <Route path = "/Chat" element = {<Chat/>}/>
        <Route path='/Chatdoctor' element={<ChatDoctor/>}/>
        <Route path = "/checkout-success" element = {<CheckOutSuccess/>}/>
        <Route path = "/users/profile/me" element = {<ProtectedRoute allowedRoles={['patient']}><Myaccount/></ProtectedRoute> }/>
        <Route path = "/doctors/profile/me" element = {<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>}/>
        <Route path = "/Admin/Login" element = {<AdminLogin/>} />
        <Route path = "/Admin/Dashboard" element = {<AdminDashboard/>} />
        <Route path ="*" element ={<Error/>}/>
    </Routes>
    )
}



export default Routers

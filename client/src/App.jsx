import { useState } from 'react'
import './App.css'
import {Route,Routes,Router} from "react-router-dom"
import AddContact from './components/AddContacts/AddContact'
import Contacts from './components/Contacts'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Contacts/>}/>
      <Route path='/add' element={<AddContact/>}/>
    </Routes>
  )
}

export default App

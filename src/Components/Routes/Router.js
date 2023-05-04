import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../Pages/Main'
import Repositorio from '../Pages/Repositorio'
import Error from '../Pages/Error'

export default function Router() {
  return (
    <BrowserRouter>
    
        <Routes>

            <Route exact path='/' element={<Main/>}/>
            <Route path='/repositorio/:repositorio' element={<Repositorio/>}/>
            <Route path='*' element={<Error/>}/>

        </Routes>

    </BrowserRouter>
  )
}

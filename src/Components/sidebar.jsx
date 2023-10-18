import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6';

function sidebar() {
  return (<div className='w-25 p-5 d-grid justify-content-center' >
    <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id="accordionSidebar">
      <li className="nav-item active">
        <h2 style={{fontSize:'xxx-large',fontWeight:'700',color:'#203562'}}>Notes App</h2>
      </li>
        <li  className="nav-item active rounded p-1 d-flex gap-2 mt-5" style={{backgroundColor:'#203562'}}>
        <div className='p-1' style={{color:'white',fontSize:'20px'}}>
          <FaRegFileLines/> 
          <span className='ps-2 pe-5'>Notes</span>
        </div>
      </li>
    </ul>
    </div>
  )
}

export default sidebar

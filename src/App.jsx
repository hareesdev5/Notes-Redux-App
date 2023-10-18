import React from 'react'
import Sidebar from './Components/sidebar';
import Addnote from './Components/addnote';
import NoteContext from './context/noteContext';


function App() {
  return (
    <div className='d-flex' id='app'>
       <Sidebar/>
       <NoteContext>
        <Addnote/>
       </NoteContext>
    </div>
  )
}


export default App

import React from 'react'

export const noteDataContext = React.createContext(null);

function noteContext({children}) {

    let API = 'https://6523ad1aea560a22a4e8a6ff.mockapi.io/sdfs/usercontext';

  return (
    <noteDataContext.Provider value={{API}}>
        {children}
    </noteDataContext.Provider>
  )
}

export default noteContext

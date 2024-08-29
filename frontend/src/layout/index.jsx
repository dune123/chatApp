import React from 'react'
import logo from '../assets/logo.png'

const AuthLayouts = ({children}) => {
  return (
    <>
        <header className='flex justify-center items-center py-5 h-20 shadow-md bg-white'>
            <img 
                src={logo}
                alt='logo'
                style={{height:"10vh",width:"15vw",marginBottom:"2vh",marginTop:"2vh"}}/>
        </header>
        {
            children
        }
    </>
  )
}

export default AuthLayouts
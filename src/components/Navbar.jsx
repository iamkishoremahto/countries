
import Container from "./Container"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useState, useEffect } from 'react'

import { useThemeStore } from "../store/useStore";


export default function Navbar(){

    const { themeMode, changeThemeMode } = useThemeStore();
   
 
    useEffect(() =>{
      
        if(themeMode){

            document.documentElement.classList.add('dark')
        }
        else{
            document.documentElement.classList.remove('dark')
        }
    },[themeMode])
    
   
    
    return (
        <>
        <nav className = ' dark:bg-dark-blue dark:text-white transition-all sticky top-0 bg-white flex items-center justify-center min-h-[100px] '>
            <Container>
                <div className = 'flex items-center  justify-between p-5'>
                    <div>
                        <h1 className='lg:text-[30px] text-[20px] capitalize font-semibold'>
                            where in the world?
                        </h1>
                    </div>
                    <div>
                        <button className='flex items-center gap-2 lg:text-[25px] text-[15px]' onClick = {() =>(changeThemeMode())}>
                            {themeMode?
                            <><IoSunnyOutline /> <span>Light Mode</span></> 
                            :<><IoMoonOutline /> <span>Dark Mode</span></> }
                        </button>
                    </div>
                </div>
            </Container>

        </nav>
        </>
    )
}
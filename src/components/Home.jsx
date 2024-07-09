import React, { useState } from 'react'
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, Routes, Route } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { MdHome } from 'react-icons/md';
import { FaSearchengin } from 'react-icons/fa';
import {Projects, SignUp } from '../components/Exporter';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileDetails from '../elements/UserProfileDetails';
import { SET_SEARCH_TERM } from '../redux/action/searchActions.js';
const Home = () => {

    const [isSideMenu, setIsSideMenu] = useState(false);
    const user = useSelector((state) => state?.user?.user);
    const searchTerm = useSelector((state) => state.searchTerm?.searchTerm  ? state.searchTerm?.searchTerm : "" );
    const dispatch = useDispatch();

    // const user = true;
    // console.log(user)
  return (
    <div className='flex min-w-full'>
        {/* Left Sub section */}
        <div className={`w-2 ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"}
        min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex-col justify-start items-center gap-4 transition-all duration-200 ease-in-out`}>



          {/* Anchor  */}
          <motion.div 
          whileTap={ {scale:0.9} }
          onClick={() => setIsSideMenu(!isSideMenu)} 
          className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'>
           {
                isSideMenu ? <IoMdArrowDropright className='text-white text-2xl'/>  :  <IoMdArrowDropleft className='text-white text-2xl'/>
           }
            
          </motion.div>

           <div className='overflow-hidden w-full flex flex-col gap-4'>
              {/* Logo */}
              <Link to={"/home"}>
                <img src={Logo} alt="Logo" className='ml-4' />
              </Link>


              {/* Start Coding */}


              <Link to={"/newProject"}>
                <div className='px-6 py-3 flex items-center justify-center transition-all duration-200 rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200'>
                  <p className='text-gray-400 group-hover:text-gray-200 transition-all duration-200'>
                    Start Coading
                  </p>
                </div>
              </Link>

              {/* Home nav Link */}
              {
                user && (
                  <Link to={"/home/projects"} className='flex items-center justify-center gap-3'>
                    <MdHome className='text-primaryText textxl'/>
                    <p className='text-md text-primaryText'>Home</p>
                  </Link>
                )
              }

           </div>

        </div>





        {/* Right Sub Section */}

        <div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>
              {/* Top Section */}
              <div className='w-full flex items-center justify-between gap-3'>

                {/* Search Bar */}
                <div className=' bg-secondary w-full flex justify-center items-center px-4 py-3 rounded-md gap-3'>
                  <FaSearchengin className='text-2xl text-primaryText'/>
                  <input type="text" value={searchTerm} onChange={(event) => dispatch(SET_SEARCH_TERM(event.target.value))} className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600' placeholder='Search Here...'/>
                </div>


                {/* Profile Section */}
                  {/* IF THE USER IS NOT PRESENT */}
                  {!user && (
                    <motion.div whileTap={{scale: 0.9}} className='flex items-center justify-center gap-3'>
                      <Link to={"/home/auth"} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-md cursor-pointer hover:bg-emerald-700 transition-colors duration-200'>
                        SignUp
                      </Link>
                    </motion.div>
                    
                  )}


                  {/* IF THE USER IS PRESENT */}
                  {user && (
                    <UserProfileDetails/>

                  )}

                </div>


                {/* Bottom Section */}
                <div className='w-full'>

                  <Routes>
                    <Route path='/*' element={<Projects/>}/>
                    <Route path='/auth' element={<SignUp/>}/>
                  </Routes>

                </div>




        </div>

    </div>
  )
}

export default Home
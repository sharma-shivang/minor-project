import React, { useState } from "react";
import { useSelector } from "react-redux";
import {AnimatePresence, motion} from "framer-motion"
import { FaChevronDown } from "react-icons/fa";
import { Menus, SignOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
const UserProfileDetails = () => {
    const [isMenu, setIsMenu] = useState(false)
    const user = useSelector((state) => state.user?.user);
    // console.log(user);

    // const user = {
    //     photoURL : "https://lh3.googleusercontent.com/a/ACg8ocJPP7Gd5ILdTijjQ2VQFCd51EqGFgRvrAA0yR4z7MWsk9V34Fo=s96-c",   
    // }
    return (
        <div className="flex items-center justify-center gap-4 relative">

            {/* Profile Image */}
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden rounded-xl cursor-pointer bg-emerald-500">
                {
                    
                    user?.photoURL ? 
                    <>
                        <motion.img 
                        whileHover={{scale:1.2}}
                        // src="https://lh3.googleusercontent.com/a/ACg8ocJPP7Gd5ILdTijjQ2VQFCd51EqGFgRvrAA0yR4z7MWsk9V34Fo=s96-c"
                        src={user?.photoURL}
                        alt={"user"}
                        referrerPolicy="no-reffeerer"
                        className="w-full h-full object-cover"
                        />
                    </>
                    : 
                    <>
                        <p className="text-xl text-white font-semibold capitalize">
                            S
                        </p>
                    </>
                }
            </div>

            {/* Profile Dropdown button */}
            <motion.div 
            onClick={() => setIsMenu(!isMenu)}
            whileTap={{scale:0.9}} 
            className="h-14 w-14 flex items-center justify-center overflow-hidden rounded-xl cursor-pointer bg-secondary">
                <FaChevronDown className="text-xl text-primaryText"/>
            </motion.div>


            {/* Drop Down Menu */}
            {
                isMenu && (
                    <AnimatePresence>
                    <motion.div 
                        initial={{opacity:0 , y:-50}}
                        animate={{opacity:1, y:0}}
                        exit={{opacity:1 , y:50}}
                        className="absolute bg-secondary top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]">
                    {
                        Menus && Menus.map(menu =>(
                            <Link to={menu.url} key={menu.id} className="text-primaryText text-lg hover:bg-[rgba(255,255,255,0.05)] px-2 py-1 w-full rounded-md">
                                {menu.name}
                            </Link>
    
                        ))
                    }
                    <motion.p 
                    whileTap={{scale:0.9}}
                    onClick={SignOutAction}
                    className="text-primaryText text-lg hover:bg-[rgba(255,255,255,0.05)] px-2 py-1 w-full rounded-md cursor-pointer">
                        Sign Out
                    </motion.p>
                </motion.div>
                </AnimatePresence>
                )
            }

        </div>
    );
};

export default UserProfileDetails;

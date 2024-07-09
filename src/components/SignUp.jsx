import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import UserAuthInput from '../elements/UserAuthInput'
import { FaEnvelope } from 'react-icons/fa6'
import { MdPassword } from 'react-icons/md'
import { motion } from "framer-motion";
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa6";
import { signInWithGitHub, signInWithGoogle } from '../utils/helpers'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
const SignUp = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [emailValidationStatus , setEmailValidationStatus] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const createNewUser = async() =>{
        if(emailValidationStatus){
            await createUserWithEmailAndPassword(auth, email, password).then(userCred =>{
                if(userCred){
                    console.log(userCred);
                }
            }).catch((err) => console.log(err));
        }
    };


    const logInWithEmailAndPassword = async() =>{
        if(emailValidationStatus){
            await signInWithEmailAndPassword(auth, email, password).then(userCred =>{
                if(userCred){
                    console.log(userCred);
                }
            }).catch((err) => {
                console.log(err.message);
                if(err.message.includes("user-not-found")){
                    setAlert(true);
                    setAlertMessage("Invalid ID : User Not Found");
                }
                else if(err.message.includes("invalid-credential")){
                    setAlert(true);
                    setAlertMessage("Invalid Credential");
                }
                else{
                    setAlert(true);
                    setAlertMessage("Disabled for a short time due to many failed attempts")
                }
                setInterval(() => {
                    setAlert(false);
                }, 4000);
            })
        }
    }


  return (
    <div className='w-full py-6'>
         <img src={Logo} alt="Logo" className='ml-4 object-contain w-32 opacity-50 h-auto' />
        

        <div className='w-full flex flex-col justify-center items-center py-8'>
            <p className='py-12 text-2xl text-primaryText'>JOIN US</p>

            {/* Signup Form */}
            <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>

                {/* email */}
                <UserAuthInput
                label = "Email"
                placeholder = "Email"
                isPass = {false}
                key="Email"
                setStateFunction = {setEmail}
                Icon={FaEnvelope}
                setEmailValidationStatus={setEmailValidationStatus}
                />

                {/* Password */}
                <UserAuthInput
                label = "Password"
                placeholder = "Password"
                isPass = {true}
                key="Password"
                setStateFunction = {setPassword}
                Icon={MdPassword}
                />

                {/* Alert */}

                    <motion.p className='text-red-500'
                        key="Alert Message"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                    >
                        {alertMessage}
                    </motion.p>



                {/* Login Button */}
                {
                    isLogin ? 
                    <motion.div
                    onClick={createNewUser} 
                    whileTap={{scale:0.9}} 
                    className='flex justify-center items-center bg-emerald-500 px-6 w-full py-2 rounded-md text-white text-md cursor-pointer hover:bg-emerald-700 transition-colors duration-200'>
                        <p className='text-lg text-white'>Sign Up</p>
                    </motion.div>
                    :
                    <motion.div 
                    onClick={logInWithEmailAndPassword}
                    whileTap={{scale:0.9}} 
                    className='flex justify-center items-center bg-emerald-500 px-6 w-full py-2 rounded-md text-white text-md cursor-pointer hover:bg-emerald-700 transition-colors duration-200'>
                        <p className='text-lg text-white'>Log In</p>
                    </motion.div>
                }



                {/* Account text section */}


                {
                    isLogin ?
                    <p className='text-sm text-primaryText flex justify-center items-center gap-3'>
                        Already Have an account? {""} <span onClick={() => setIsLogin(!isLogin)} className='cursor-pointer text-emerald-500'>Login Here</span>
                    </p>
                    :
                    <p className='text-sm text-primaryText flex justify-center items-center gap-3'>
                        Doesn't Have an account? {""} <span onClick={() => setIsLogin(!isLogin)} className='cursor-pointer text-emerald-500'>Create Here</span>
                    </p>
                }


                {/* or Section  */}

                <div className='flex justify-center items-center gap-3'>
                    <div className='h-[1px] w-32 bg-[rgba(256,256,256,0.2)] rounded-md'></div>
                    <p className='text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
                    <div className='h-[1px] w-32 bg-[rgba(256,256,256,0.2)] rounded-md'></div>
                </div>



                {/* Signin With google */}
                <motion.div 
                onClick={signInWithGoogle}
                whileTap={{scale:0.9}}
                className='flex justify-center items-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] transition-colors duration-200'>
                    <FcGoogle className='text-3xl'/>
                    <p className='text-lg text-white'>Sign In With Google</p>
                </motion.div>



                {/* or Section  */}
                <div className='flex justify-center items-center gap-3'>
                    <div className='h-[1px] w-32 bg-[rgba(256,256,256,0.2)] rounded-md'></div>
                    <p className='text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
                    <div className='h-[1px] w-32 bg-[rgba(256,256,256,0.2)] rounded-md'></div>
                </div>



                {/* Signin With GitHub */}
                <motion.div
                onClick={signInWithGitHub} 
                whileTap={{scale:0.9}} 
                className='flex justify-center items-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] transition-colors duration-200'>
                    <FaGithub className='text-3xl text-white'/>
                    <p className='text-lg text-white'>Sign In With GitHub</p>
                </motion.div>




            </div>
        </div>
    </div>
  )
}

export default SignUp
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaCloudShowersWater, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png'
import { AnimatePresence , motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserProfileDetails from "../elements/UserProfileDetails"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "./Alert";


const NewProject = () => {

    const  user = useSelector((state) => state.user?.user);

    const saveProgram = async() =>{
        const id = `${Date.now()}`;
        const _doc = {
            id:id,
            title:title,
            html:html,
            css:css,
            js:js,
            output:output,
            user:user
        }
        await setDoc(doc(db, "Projects", id), _doc).then((res) =>{
            setAlert(true)
        }).catch((err) =>{
            console.log(err)
        })
        setInterval(() => {
            setAlert(false);
        }, 1000);
    }

    loadLanguage('css');
    loadLanguage('html');
    loadLanguage('javascript');
    langs.css();
    langs.html();
    langs.javascript();



    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput] = useState("");
    const [isTitle, setIsTitle] = useState(false);
    const [title, setTitle] = useState("Untitled");
    const [alert, setAlert] = useState(false);


    useEffect(() =>{
        updateOutput();
    }, [html, css, js])

    const updateOutput=() =>{
        const combinedOutput = `

        <html>
            <head>
                <style>${css}</style>

                <body>
                    ${html}
                    <script>${js}</script>
                </body>

            </head>
        </html>
        
        `;
        setOutput(combinedOutput);


    }
    return (
        <>
            <div className="max-w-screen min-h-screen flex flex-col items-start justify-start overflow-x-hidden">
                {/* Alert Sectioni */}
                <AnimatePresence>
                    {
                        alert && <Alert status={"Success"} alertMsg={"Project Saved... "}/>
                    }
                </AnimatePresence>


                {/* HEader Section */}
                <div className="w-full flex items-center justify-between px-12 py-4 gap-2">
                    <div className="flex items-center justify-center gap-6">
                        {/* Logo */}
                        <Link to={"/home"}>
                            <img src={Logo} alt="Logo" className='mt-4 h-10' />
                        </Link>
                    </div>

                    <div className="flex flex-col items-start justify-start">
                        {/* Title Section*/}
                        <div className="flex items-center justify-center gap-3">
                            <AnimatePresence>
                                {
                                    isTitle ?
                                    <>
                                        <motion.input
                                        key={"TitleInput"}
                                        type="text"
                                        className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                                        placeholder="Your Title"
                                        value={title}
                                        onChange={(e) =>{setTitle(e.target.value)}}
                                        >

                                        </motion.input>
                                    </>
                                    :
                                    <>
                                        <motion.p key={"titleLable"} className="px-3 py-2 text-lg text-white">
                                            {title}
                                        </motion.p>
                                    </>
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {
                                    isTitle ?
                                    <>
                                        <motion.div
                                            key={"MdCheck"}
                                            whileTap={{scale:0.9}}
                                            className="cursor-pointer "
                                            onClick={() => {setIsTitle(false)}}
                                        >
                                            <MdCheck className="text-2xl text-emerald-500"/>
                                        </motion.div>
                                    </>
                                    :
                                    <>
                                        <motion.div
                                            key={"MdCheck"}
                                            whileTap={{scale:0.9}}
                                            className="cursor-pointer text-white"
                                            onClick={() => {setIsTitle(true)}}
                                        >
                                            <MdEdit className="text-2xl text-primaryText"/>
                                        </motion.div>
                                    </>
                                }
                            </AnimatePresence>
                        </div>
                        {/* follow Section */}

                        <div className="flex items-center justify-center px-3 -mt-2 gap-2">

                            <p className="text-primaryText text-sm">
                                {
                                    user?.displayName ?
                                    user?.displayName
                                    :
                                    `${user?.email.split("@")[0]}`


                                }
                            </p>
                            {/* Follow Button */}
                            <motion.p whileTap={{scale:0.9}} className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer">
                                + Follow
                            </motion.p>
                        </div>

                    </div>
                    
                    {/* Save And User Section */}

                    {user && (
                        <div className="flex justify-center items-center gap-6 ml-[60rem]">
                            <motion.button onClick={saveProgram} whileTap={{scale:0.9}} className="px-4 py-3 bg-emerald-500 rounded-md cursor-pointer text-base text-primary font-semibold">
                                Save
                            </motion.button>
                            <UserProfileDetails/>
                        </div>
                    )}

                    
                </div>


                {/* Codign Section */}
                <div>
                    {/* Horizonntal Section */}
                    <SplitPane
                        split="horizontal"
                        minSize={100}
                        maxSize={-100}
                        defaultSize={"50%"}
                    >
                        {/* Top Coding Section  */}
                        <SplitPane split="vertical" minSize={500}>
                            {/* <HTML></HTML> */}
                            <div className="w-full h-full flex flex-col items-start justify-start">
                                <div className="w-full flex items-center justify-between">
                                    <div className="bg-secondary px-4 py-2 border-t-4 flex justify-center items-center gap-3">
                                        <FaHtml5 className="text-xl text-red-500 border-t-gray-500" />
                                        <p className="text-primaryText font-semibold ">
                                            HTML
                                        </p>
                                    </div>

                                    <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                                        <FcSettings className="text-xl" />
                                        <FaChevronDown className="text-xl text-primaryText" />
                                    </div>
                                </div>
                                <div className="w-full px-2 text-lg">
                                <CodeMirror value={html} 
                                height="600px" 
                                extensions={[loadLanguage('html')]}
                                theme={"dark"}
                                onChange={(value, viewUpdate) => {
                                    setHtml(value);
                                }} />
                                </div>
                            </div>


                            <SplitPane split="vertical" minSize={500}>
                                {/* <CSS></CSS> */}
                                <div className="w-full h-full flex flex-col items-start justify-start">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="bg-secondary px-4 py-2 border-t-4 flex justify-center items-center gap-3">
                                            <FaCss3 className="text-xl text-sky-500 border-t-gray-500" />
                                            <p className="text-primaryText font-semibold ">
                                                CSS
                                            </p>
                                        </div>

                                        <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                                            <FcSettings className="text-xl" />
                                            <FaChevronDown className="text-xl text-primaryText" />
                                        </div>
                                    </div>
                                    <div className="w-full px-2 text-lg">
                                        <CodeMirror value={css} 
                                        height="600px" 
                                        extensions={[loadLanguage('css')]}
                                        theme={"dark"}
                                        onChange={(value, viewUpdate) => {
                                            setCss(value);
                                        }} />
                                        </div>
                                </div>



                                {/* <JavaScript></JavaScript> */}
                                <div className="w-full h-full flex flex-col items-start justify-start">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="bg-secondary px-4 py-2 border-t-4 flex justify-center items-center gap-3">
                                            <FaJs className="text-xl text-yellow-500 border-t-gray-500" />
                                            <p className="text-primaryText font-semibold ">
                                                JS
                                            </p>
                                        </div>

                                        <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                                            <FcSettings className="text-xl" />
                                            <FaChevronDown className="text-xl text-primaryText" />
                                        </div>
                                    </div>
                                    <div className="w-full px-2 text-lg">
                                        <CodeMirror value={js} 
                                        height="600px" 
                                        extensions={[loadLanguage('javascript')]}
                                        theme={"dark"}
                                        onChange={(value, viewUpdate) => {
                                            setJs(value);
                                        }} />
                                    </div>

                                </div>

                            </SplitPane>
                        </SplitPane>


                        {/* Bottom result sectionsection */}
                        <div className="bg-white overflow-x-hidden"
                            style={{overflow:"hidden", height:"100%"}}>

                            <iframe
                                title="result"
                                srcDoc={output}
                                style={{border:"none", width:"100%", height:"100%"}}
                            />
                        </div>


                    </SplitPane>
                </div>
            </div>
        </>
    );
};

export default NewProject;

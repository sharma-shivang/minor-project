import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { MdBookmark } from 'react-icons/md'

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm  ? state.searchTerm?.searchTerm : "" );
  const [filtered, setFiltered] = useState("");  

  useEffect(() => {
    if(searchTerm?.length > 0){
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title.toLowerCase();
          // console.log(lowerCaseItem);
          return searchTerm.split("").every((letter) => lowerCaseItem.includes(letter));
        })
      );
    }
    else{
      setFiltered(null);
    }
  } ,[searchTerm])
  // console.log(projects);
  return (
    <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
      {
        filtered ? 
        <>
        {
                  filtered && filtered.map((project, index) =>(
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))
        }
        </> 
        :
        <>
        {
                  projects && projects.map((project, index) =>(
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))
        }
        </>
      } 
        
    </div>
  )
}

const ProjectCard = ({project, index}) =>{
  return <motion.div key={index} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5, delay:index*0.2}} className='w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col justify-center items-center gap-4'>
            <div className=" bg-primary w-full h-full rounded-md overflow-hidden"
                 style={{ height:"100%"}}>

                    <iframe
                      className='overflow-hidden'
                      title="result"
                      srcDoc={project?.output}
                      style={{border:"none", width:"100%", height:"100%"}}
                     />
            </div>
            <div className='flex items-center justify-start gap-3 w-full'>
                {/* Image */}
                <div className='w-14 h-14 flex justify-center items-center rounded-xl overflow-hidden cursor-pointer'>
                {
                  project?.user?.photoURL ?
                  (<motion.img
                    whileHover={{scale:1.2}}
                    src={project?.user?.photoURL}
                    referrerPolicy='no-referrer'
                    className='w-full h-full object-cover'
                  >

                  </motion.img>)
                  :
                  (<div className='text-xl text-white font-semibold capitalize'>
                    {project?.user?.email[0]}
                  </div>)
                }
                </div>
                {/* Name */}

                <div>
                  <p className='text-lg text-white capitalize'>{project?.title}</p>
                  <p className='text-primaryText text-sm capitalize'>
                  {
                    project?.user?.displayName ?
                    (<div>
                      {project?.user?.displayName}
                    </div>)
                    :
                    `${project?.user?.email.split("@")[0]}`
                  }
                  </p>
                </div>

                {/* Collections */}
                <motion.div className='ml-auto cursor-pointer' whileTap={{scale:0.9}}>
                  <MdBookmark className='text-primaryText text-3xl'/>
                </motion.div>

            </div>

    </motion.div>
}


export default Projects
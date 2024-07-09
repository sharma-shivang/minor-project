import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import {Home} from './components/Exporter'
import { auth, db } from './config/firebase.config'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { DNA } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { SET_USER } from './redux/action/userActions'
import NewProject from './components/NewProject'
import { SET_PROJECTS } from './redux/action/ProjectAction'

function App() {

  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if(userCred){
        // console.log(userCred?.providerData[0]);
        setDoc(doc(db, "Users", userCred?.uid), userCred?.providerData[0]).then(
          () =>{
          
          // Dispatch the action to store
          // console.log(userCred?.providerData[0]);
          dispatch(SET_USER(userCred?.providerData[0]));
          navigate("/home/projects", {replace:true})
        })
      }
      else{
        navigate("/home", {replace:true})
      }
        
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    // Cleadn up the listner event 
    return () => unsubscribe();

  }, []);

  useEffect(() => {
    const projectQuery = query(collection(db,"Projects"),orderBy("id", "desc"));
    const unsubscribe = onSnapshot(projectQuery,(querySnaps) =>{
      const projectsList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectsList));
      // console.log(projectsList);
    })
    return unsubscribe;

  }, [])
  

  return (
    <>
      {isLoading ? 
        (
          <div className='h-screen w-screen flex justify-center items-center'>
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
          </div>
        )
        :
        (    
          <div className='max-w-screen h-screen flex items-start justify-start overflow-hidden'>
          <Routes>
            <Route path='/home/*' element={<Home/>}/>
            <Route path='/newProject' element={<NewProject/>}/>
            {/* If the path is not matching the home route */}
            <Route path='*' element={<Navigate to={"/home"}/>}/>
          </Routes>
          </div>
        )
      }
    </>
  )
}

export default App

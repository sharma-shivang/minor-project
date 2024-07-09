import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { v4 as uuidv4 } from "uuid"


const googleProvider = new GoogleAuthProvider();
const gitHubPrivider = new GithubAuthProvider();

export const signInWithGoogle = async() =>{
    await signInWithRedirect(auth , googleProvider).then(userCred => {
        window.location.reload()
    })
}
export const signInWithGitHub = async() =>{
    await signInWithRedirect(auth , gitHubPrivider).then(userCred => {
        window.location.reload()
    })
}

export const Menus = [
    {id: uuidv4(), name:"Projects", url:"/home/projects"},
    {id: uuidv4(), name:"Collections", url:"/home/collections"},
    {id: uuidv4(), name:"Profile", url:"/home/profile"},
]

export const SignOutAction = async() =>{
    auth.signOut().then(() =>{
        window.location.reload()
    })
}
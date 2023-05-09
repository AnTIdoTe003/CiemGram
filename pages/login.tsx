import { signIn } from "next-auth/react"

export default function Login(){
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <button className="bg-red-100 w-[12rem] h-[5rem] px-4 rounded-md" onClick={()=>signIn('google', {callbackUrl:"/"})}>Sign in With Google</button>
        </div>
    )
}
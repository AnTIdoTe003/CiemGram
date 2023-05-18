import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { signOut, useSession } from 'next-auth/react'
import HomeLoader from '@/components/HomeLoader/HomeLoader'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight:'400', subsets: ['latin'] })
export default function Home() {
  const {data:session, status} = useSession({
    required:true,

  })

 if(status === 'loading'){
  return <HomeLoader></HomeLoader>
 }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${poppins.className}`}
    >
       <button className="bg-red-100 w-[12rem] h-[5rem] px-4 rounded-md" onClick={()=>signOut()}>Signout</button>
    </main>
  )
}

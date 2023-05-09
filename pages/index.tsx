import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { useSession } from 'next-auth/react'
import HomeLoader from '@/components/HomeLoader/HomeLoader'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight:'400', subsets: ['latin'] })
export default function Home() {
  const {data:session, status} = useSession({
    required:true,

  })

  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    if(status === 'loading'){
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2000)
    }
  },[status])
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${poppins.className}`}
    >
      {
         (loading)?<HomeLoader></HomeLoader>:""

}
    </main>
  )
}

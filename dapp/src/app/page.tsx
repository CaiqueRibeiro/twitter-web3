"use client"
import Image from 'next/image'
import { useState } from 'react'
import { Twitter } from 'lucide-react'
import { doLogin } from '../services/Web3Service'
import { useRouter } from 'next/navigation'


function LogoContainer() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Twitter className="sm:h-4 sm:w-4 md:h-[300px] md:w-[300px] lg:h-[500px] lg:w-[500px] flex-no-shrink" fill="white" color='none' />
    </div>
  )
}

function LoginSection() {
  const { push } = useRouter()
  const [message, setMessage] = useState("")

  function handleLogin() {
    setMessage('Connecting to MetaMask. Please wait')
    doLogin()
      .then(wallet => push("/timeline"))
      .catch(error => setMessage(error.message))
  }


  return (
    <div className="text-white flex-1 pl-8 border-l-2 border-slate-400">
      <h1 className="font-black text-9xl mb-6">CrypTwitter</h1>
      <h2 className="font-bold text-5xl mb-8">Your decentralized Twitter</h2>
      <span className="text-xl">Auth with your crypto wallet. Post your messages. All in Blockchain.</span>

      <div>
        <button
          type='button'
          className='
        flex
        items-center
        justify-center
        w-96
        px-3
        mt-8
        bg-sky-500
        rounded-full
        gap-5
        transition
        ease-in-out
        hover:bg-sky-600
        duration-200'
          onClick={handleLogin}
        >

          <Image src="metamask.svg" width="64" height="64" alt="MetaMask logo" />
          <span className='text-white text-xl'>Connect to MetaMask</span>
        </button>
        <p className="text-red-500 ml-3">{message}</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex p-5 min-h-screen items-center justify-between flex-1">
      <LogoContainer />
      <LoginSection />
    </div>
  )
}
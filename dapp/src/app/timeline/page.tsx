"use client"
import { useEffect } from "react" 
import NewTweet from "@/components/NewTweet"
import { useRouter } from "next/navigation"

export default function Timeline() {
  const { push } = useRouter()

  useEffect(() => {
    const wallet = localStorage.getItem('wallet')
    if(!wallet) push("/")
  }, [push])

  return (
    <div className="flex w-[1920px] p-5 min-h-screen items-stretch justify-between text-white">
      <div className="bg-red-400 flex-1">
        <h1>PERFIL</h1>
      </div>

      <div className="w-4/6 px-4 flex flex-column justify-between">
        <NewTweet />
      </div>
    </div>
  )
}
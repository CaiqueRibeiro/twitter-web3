"use client"
import { useEffect, useState } from "react"
import NewTweet from "@/components/NewTweet"
import { useRouter } from "next/navigation"
import Tweet from "@/components/Tweet"
import { getLastTweets } from '@/services/Web3Service'

export default function Timeline() {
  const [tweets, setTweets] = useState([] as Awaited<ReturnType<typeof getLastTweets>>)
  const [refreshList, setRefreshList] = useState(false);
  const { push } = useRouter()

  async function loadTweets(page: number = 1) {
    try {
      const results = await getLastTweets(page)
      setTweets(results.reverse() as any)
    } catch (error) {
      console.log(error)
    }
  }

  function commandRefreshList(input: boolean) {
    setRefreshList(input)
  }

  useEffect(() => {
    loadTweets(1)
  }, [])

  useEffect(() => {
    if(refreshList) {
      loadTweets(1)
      setRefreshList(false)
    }
  }, [refreshList])

  useEffect(() => {
    const wallet = localStorage.getItem('wallet')
    if (!wallet) push("/")
  }, [push])

  return (
    <div className="flex w-[1920px] p-5 min-h-screen items-stretch justify-between text-white">
      <div className="flex-1">
        <h1>PERFIL</h1>
      </div>

      <div className="w-4/6 px-4 flex flex-col justify-start">
        <NewTweet refreshList={commandRefreshList}/>
        <div className="flex flex-col gap-3 mt-10 overflow-y-auto">
          {tweets && tweets.length > 0
            ? tweets.map(tweet => <Tweet key={tweet.timestamp.toString()} data={tweet} />)
            : <p>Nothing to see here. Tweet your first stuff.</p>
          }
        </div>
      </div>
    </div>
  )
}
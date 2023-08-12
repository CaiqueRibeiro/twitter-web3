import Image from "next/image"
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'

export interface TweetProps {
  data: {
    author: string;
    text: string;
    timestamp: any;
    username: string;
  }
}

export default function Tweet(props: TweetProps) {
  return (
    <div className="bg-zinc-800 p-4 rounded-md flex gap-4">
      <div>
        <Image className="rounded-full" src={generateAvatarURL(props.data.author)} width="50" height="50" alt="Profile image" />
      </div>
      <div>
        <div className="">
          <strong>{props.data.username}</strong>
          <span className="ml-3 text-zinc-500">{props.data.author}</span>
        </div>
        <div className="mb-3 text-sm text-zinc-500">at {new Date(Number(props.data.timestamp) * 1000).toLocaleString()}</div>
        <div>{props.data.text}</div>
      </div>
    </div>
  )
}
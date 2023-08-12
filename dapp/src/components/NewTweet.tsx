"use client"
import { useState, useEffect } from 'react'
import { addTweet } from '@/services/Web3Service'

interface NewTweetProps {
  refreshList: (input: boolean) => void;
}

export default function NewTweet({ refreshList }: NewTweetProps) {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  function handleClick() {
    setMessage('Sending your tweet to the blockchain')
    addTweet(text)
      .then(result => {
        setText('')
        setMessage('')
        refreshList(true)
      })
      .catch(error => setMessage(error.message))
  }

  return (
    <div className="bg-zinc-800 p-8 rounded-md">
      <h2 className="font-bold text-5xl mb-8">Welcome back!</h2>
      <span className="text-xl">What is happening?</span>
      <div className='flex py-1'>
        <span className="
      rounded-lg
      flex-1
      bg-neutral-800
      border-neutral-800
      border
      px-5
      py-3
      flex
      gap-3
      h-44
      focus-within:bg-transparent
      focus-within:border-sky-700"
        >
          <textarea
            className='flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none'
            placeholder='Write what yout want'
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
        </span>
      </div>
      <button
        type='button'
        onClick={handleClick}
        className='flex items-center justify-center w-44 py-2 px-2 mt-8 bg-sky-500 rounded-full transition ease-in-out hover:bg-sky-600 duration-200'>
        <span className='text-white text-xl'>Tweet</span>
      </button>
      <span className="mt-4">{message}</span>
    </div>
  )
}
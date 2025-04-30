import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <>
		<h1 className='bg-green-500 '>Tailwind Test</h1>
        <p className=" hover:bg-sky-800 hover:text-black  bg-black text-blue-700 p-8 m-4 rounded-xl">Test</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click Me</button>
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">Responsive Text</div>
    </>
  )
}
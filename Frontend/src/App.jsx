import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [data, setData] = useState('');
  
  useEffect(() => {
    async function getData(){
      const res = await fetch('http://localhost:3000/home')

      const result = await res.text();
      console.log(result);
      setData(result)
  }
  getData();
}, [])

  return (
    <>
      <div className='text-xl font-bold text-red-600' >{data}</div>
    </>
  )
}

export default App

import { useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [message, setMessage] = useState([]);
  const [value, setValue] = useState('')
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const socketRef = useRef(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')

    // prevent creation of new socket on every rerender
    socketRef.current = socket;

    socket.addEventListener('open', () => {
      console.log('Websocket server connected!')
      setConnectionStatus('Connected')
    })

    socket.addEventListener('close', () => {
      console.log('Websocket server closed!')
      setConnectionStatus('Disconnected')
    })

    socket.addEventListener('message', (e) => {
      console.log('This is the message: ', e.data)
      let payload = JSON.parse(e.data)
      setMessage((parsedData) => [...parsedData, payload])
    })

}, [])

const handleSendMessage = () => {
  if(value.trim() && socketRef.current && socketRef.current.readyState === WebSocket.OPEN){
    const payload = {
      senderName: 'User',
      message: value
    }
    socketRef.current.send(JSON.stringify(payload))

    setMessage((prevMessages) => [...prevMessages, payload])
    setValue('')
  }
}

  return (
    <>
      <div className='h-screen w-full bg-black text-white flex flex-col justify-center items-center'>
        <div className="text-center text-2xl">Basic Chat Application</div>
        <p>Connection status: {connectionStatus} </p>
        <div className='flex flex-col gap-4'>
          <input 
            className='border border-white px-2'
            placeholder='Write something...' 
            value= {value}
            onChange={e=>{
              e.preventDefault();
              setValue(e.target.value)
            }}
          ></input>
          <button className='px-4 py-1 border border-white cursor-pointer 'onClick={handleSendMessage}>Send Message</button>
          <div className='bg-white text-black p-2 min-h-80'>
            {message.map((msg, index) => (
              <div key={index} className="text-sm">
                <strong>{msg.senderName}:</strong> {msg.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App

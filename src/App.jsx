import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/Card'

function App() {
  let imageList = ["https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FpYjQ4ZXg4ZHJ5MmVtMjNuaG9renF1YWx4cXdhNXJmcnl3YjdkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n2aqrebzEn6WgDE2Hu/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3JidjAxcjJncmhhZ3IyYW8xenJuamF4MTFraHU1dDQ1YTlsOGl0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaMwwM91UCxstRfvA3/giphy.gif"]
  return (
  <div>
    {imageList.map(image => (
      <Card imageURL={image}></Card>
    ))}
  </div>
  )
}

export default App

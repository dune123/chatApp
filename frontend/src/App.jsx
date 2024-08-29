import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
      <Toaster/>
      <main>
        <Outlet/>
      </main>
      </>
  )
}

export default App

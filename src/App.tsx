import { useEffect, useState } from 'react'
import './App.css'
import { List } from './components/List'




function App() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await fetch('https://randomuser.me/api/?page=1&results=10&inc=name,picture,email,id')
    const data = await response.json()
    console.log(data)
    
    setData(data.results)
  }



  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <List data={data} />
    </div>
  )
}

export default App

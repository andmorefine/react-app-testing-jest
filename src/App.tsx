import React, { useState, useEffect, useRef } from 'react'
import { getFormattedUserName } from './utility'
import './App.css'

// ユーザーデータの型を定義
interface User {
  id: number
  name: string
  username: string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const isMounted = useRef(true) // isMountedをuseRefで管理

  // Fetch the data from the server
  useEffect(() => {
    const url: string = 'https://jsonplaceholder.typicode.com/users'
    const getUsers = async () => {
      const response = await fetch(url)
      if (!response.ok) {
        console.error('Failed to fetch users')
        return
      }
      const data: User[] = await response.json()
      setUsers(data)
    }
    getUsers()
    // Cleanup function to handle component unmounting
    return () => {
      isMounted.current = false // アンマウント時には.currentをfalseにする
    }
  }, [])

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map(({ id, name, username }) => (
          <li key={id}>
            {name} -- <span>({getFormattedUserName(username)})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

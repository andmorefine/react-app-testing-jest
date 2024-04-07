import React, { useState, useEffect, useRef } from 'react'
import { getFormattedUserName } from './utility'
import './App.css'

// ユーザーデータの型を定義
interface User {
  id: number
  name: string
  username: string
}

interface Repo {
  id: number
  name: string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const isMounted = useRef(true) // isMountedをuseRefで管理

  const [username, setUsername] = useState<string>('')
  const [repos, setRepos] = useState<Repo[]>([])
  const [error, setError] = useState<string>('')

  const fetchRepos = async (username: string) => {
    setRepos([])
    setError('')
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
      )
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data: Repo[] = await response.json()
      setRepos(data)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchRepos(username)
    }
  }

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
            {name} -- ({getFormattedUserName(username || '')})
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />

      {error && <p>{error}</p>}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

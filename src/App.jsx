import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const users = {name,email}
    console.log(users);
    // data post (pathano backend)
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(users)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let newUsers = [...user,data]
      setUser(newUsers)

      form.reset()
    })
  }


  return (
    <>
      <h1>User Management systems</h1>
      <p>User length: {user.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" /> <br />
        <input type="email" name="email" id="" /> <br />
        <input type="submit" value="Add User" />
      </form>

      {
        user.map(aUser => <p key={aUser.id}>
          {aUser.id} : name {aUser.name} and email is {aUser.email}
        </p>)
      }
    </>
  )
}

export default App

import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const host = "http://localhost:8000"
  const usersInitial = []
  const [users, setUsers] = useState(usersInitial);

  // Get all Users
  const getUsers = async () => {
    // API Call 
    const response = await fetch(`${host}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setUsers(json);
  }

  // Add a new user
  const addUser =async (name, email, phoneNo, password) => {
  
    // API Call 
    const response = await fetch(`${host}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name, email, phoneNo, password})
    });

    const user = await response.json();
    setUsers(users.concat(user))
  }

  // Delete a User
  const deleteUser = async (id) => {
    // API Call
    const response = await fetch(`${host}/users/destroy/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    if(response.status === 404){
      alert("You are not admine")  
      return;  
    }

    // console.log("Deleting the note with id" + id);
    const newUser = users.filter((user) => { return user._id !== id })
    setUsers(newUser)
  }

    // Edit a Note
    const editeUser = async (id, name, isAdmin, phoneNo) => {
      // API Call 
      const response = await fetch(`${host}/users/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({name, isAdmin, phoneNo})
      });
      const json = await response.json(); 
      console.log(json)
       let newUsers = JSON.parse(JSON.stringify(users))
      // Logic to edit in client
      for (let index = 0; index < newUsers.length; index++) {
        const element = newUsers[index];
        if (element._id === id) {
          newUsers[index].name = name;
          newUsers[index].isAdmin = isAdmin;
          newUsers[index].phoneNo = phoneNo; 
          break; 
        }
      }  
      setUsers(newUsers);
    }

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, getUsers, editeUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;
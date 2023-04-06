import { useState } from "react";
import ReviewContext from './reviewContext'

const ReviewState = (props) => {

    const host = "http://localhost:8000";
    const [reviews, setReviews] = useState("");

    // fetch review
    const getReview = async (id) => {
        // API Call
        const response = await fetch(`${host}/users/getuser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        setReviews(json);  
    }

     // Add a new review
  const addReview =async (id,content) => {
  
    // API Call 
    const response = await fetch(`${host}/review/create/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({content, userId: id})
    });

    const review = await response.json();
    //setUsers(users.concat(user))
  }

   // Edit a Review
   const editeReview = async (id, content) => {
    // API Call 
    const response = await fetch(`${host}/review/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({content})
    });
    const json = await response.json(); 
    console.log(json)   
    //setUsers(newUsers);
  }

  // Delete a Review
  const deleteReview = async (id) => {
    // API Call
    const response = await fetch(`${host}/review/destroy/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    // console.log("Deleting the note with id" + id);
  }

    return (
        <ReviewContext.Provider value={{ reviews, getReview, addReview, editeReview, deleteReview }}>
            {props.children}
        </ReviewContext.Provider>
    )
}

export default ReviewState

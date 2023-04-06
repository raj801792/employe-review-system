import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import reviewContext from "../context/users/review/reviewContext"
import Reviewitem from './Reviewitem'

const Reviews = () => {
    const context = useContext(reviewContext);
    const { reviews, getReview } = context;
    let navigate = useNavigate();
    //console.log(localStorage.getItem('id'));
    let id = localStorage.getItem('id');

    useEffect(() => {
        //let id = "6421ceb711ace63a274b2983"
        //console.log("token: ",localStorage.getItem('token'))
        if (localStorage.getItem('token')) {
            //console.log("token: ", localStorage.getItem('token'))
            getReview(id)
            //localStorage.removeItem('id');
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const { addReview, editeReview } = context;

    const [review, setReview] = useState({ content: "" })

    const handleClick = (e) => {
        //it's user card id
        let id = localStorage.getItem('id');
        e.preventDefault();
        addReview(id, review.content);
        setReview({ content: "" })
    }

    const onChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    const ref = useRef(null)
    const refClose = useRef(null)
    const updateReview = (currentReview) => {
        //console.log("currentreview: ", currentReview.content);
        ref.current.click();
        setReview({ id: currentReview._id, econtent: currentReview.content })
    }

    const handleupClick = (e)=>{ 
        editeReview(review.id, review.econtent)
        refClose.current.click();
    }

    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-name" id="exampleModalLabel">Edit Review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Review</label>
                                    <textarea type="text" className="form-control" id="econtent" name="econtent" value={review.econtent} aria-describedby="emailHelp" onChange={onChange} required ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleupClick} type="button" className="btn btn-primary">Update user</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container my-3 '>
                <h3>{reviews.name}</h3>
                <form className="my-3 border border-secondary shadow p-3 mb-5 bg-body rounded ">
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Enter Review</label>
                        <textarea type="text" className="form-control" id="content" name="content" rows="4" cols="50" value={review.content} onChange={onChange} placeholder="Enter Review" ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Review</button>
                </form>
            </div>

            <div className='container'>
                <div className="row my-3">
                    <Reviewitem key={reviews._id} updateReview={updateReview} reviews={reviews} />
                </div>
            </div>
        </>
    )
}

export default Reviews

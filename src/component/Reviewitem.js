import React, { useContext } from 'react'
import reviewContext from "../context/users/review/reviewContext"

const Reviewitem = (props) => {
    const context = useContext(reviewContext);
    const { deleteReview } = context;
    const { reviews, updateReview } = props;
    let len;
    if(reviews.review !== undefined){
      //console.log("review", reviews.review.length);
      len = reviews.review.length;
    }
    /*reviews.review.map((rev) =>{
        console.log("content",rev.content)
    })*/
    
    

    return (
        <>
  

            {reviews.review !== undefined && reviews.review.map((rev) =>{
                return <div key={rev._id} className="col-md-3">
                    <div className="card my-3 shadow bg-body rounded">
                        <div className="card-body bg-info bg-gradient ">
                            <div className='d-flex justify-content-between'>
                                <span><i className={localStorage.getItem('admin') === "true" ? 'd-block fa-sharp fa-solid fa-trash' : 'd-none'} onClick={()=>{deleteReview(rev._id)}}></i></span>
                                <h5 className="card-title"> {rev.user.name}</h5>
                                <span><i className={localStorage.getItem('admin') === "true" ? 'd-block fa-solid fa-user-pen' : 'd-none'} onClick={()=>{updateReview(rev)}} ></i></span>
                            </div>
                            <p className="card-text"><b>Review:</b> {rev.content}</p>
                        </div>
                    </div>
                </div>})  
            }
            {len === 0 && <p>No Review are present</p>

            }
            

        </>
    )
}

export default Reviewitem

import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import userContext from '../context/users/userContext'
//import { flushSync } from 'react-dom';


const Useritem = (props) => {
    const context = useContext(userContext);
    const { deleteUser } = context;
    let admin=localStorage.getItem('admin');
    
    const { user, updateUser } = props;
    //console.log("admin",user.isAdmin)
    return (
        <div className="col-md-3">

            <div className="card my-3 shadow bg-body rounded">
                <div className="card-body bg-info bg-gradient ">
                    <div className='d-flex justify-content-between'>
                        <span><i className={admin ? 'd-block fa-sharp fa-solid fa-trash' : 'd-none'}  onClick={()=>{deleteUser(user._id)}}></i></span>
                        <h5 className="card-title"> {user.name}</h5>
                        <span><i className={admin ? 'd-block fa-solid fa-user-pen' : 'd-none'} onClick={()=>{updateUser(user)}}></i></span>
                    </div>
                    <p className="card-text"><b>Email id: </b>{user.email}</p>
                    
                    <p className="card-text"><b>Phone Number:</b> {user.phoneNo}</p>
                    <span className='d-flex justify-content-end'><Link to="/reviews"><i className="fa-solid fa-circle-info" onClick={()=>{localStorage.setItem('id',user._id)}}></i></Link></span>
                    
                    

                </div>
            </div>
        </div>
    )
}

export default Useritem

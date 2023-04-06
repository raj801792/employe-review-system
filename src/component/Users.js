import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from "../context/users/userContext"
import Useritem from './Useritem';
import { useNavigate } from "react-router-dom";
const Users = () => {
    const context = useContext(userContext);
    const { users, getUsers, editeUser } = context;
    let navigate = useNavigate();
    useEffect(() => {
        //console.log("token: ",localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            console.log("token: ",localStorage.getItem('token'))
            getUsers()
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)
    const [user, setUser] = useState({id: "", ename: "", eisAdmin: "", ephoneNo: ""})

    const updateUser = (currentUser) => {
        ref.current.click();
        //console.log("currUser: ",currentUser);
        setUser({id: currentUser._id, ename: currentUser.name, eisAdmin: currentUser.isAdmin, ephoneNo:currentUser.phoneNo})
    }

    const handleClick = (e)=>{ 
        editeUser(user.id, user.ename, user.eisAdmin, user.ephoneNo)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
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
                            <h5 className="modal-name" id="exampleModalLabel">Edit User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" value={user.ename} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Set Admin</label>
                                    <input type="text" className="form-control" id="eemail" name="eemail" value={user.eisAdmin} onChange={onChange}  required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNo" className="form-label">phoneNo</label>
                                    <input type="text" className="form-control" id="ephoneNo" name="ephoneNo" value={user.ephoneNo} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Update user</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Our Employe</h2>
                
                {users.map((user) => {
                    return <Useritem key={user._id} updateUser={updateUser} user={user} />
                })}
            </div>
        </>
    )
}

export default Users

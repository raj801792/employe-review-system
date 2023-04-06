
import React, { useContext, useState } from 'react'
import userContext from '../context/users/userContext'

const Addemploye = () => {
    const context = useContext(userContext);
    const {addUser} = context;

    const [user, setUser] = useState({name: "", email: "", phoneNo: "", password: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addUser(user.name, user.email, user.phoneNo, user.password);
        setUser({name: "", email: "", phoneNo: "", password: ""})
    }

    const onChange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className='container my-3 '>
                <h3>Add New Employe</h3>
                <form className="my-3 border border-secondary shadow p-3 mb-5 bg-body rounded ">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Name</label>
                    <input type="text" className="form-control" id="name" name="name"  value={user.name} onChange={onChange} placeholder="Enter Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={onChange} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Enter Phone Number</label>
                    <input type="number" className="form-control" id="phoneNo" name='phoneNo' value={user.phoneNo} onChange={onChange} placeholder="Enter Phone Number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={onChange} placeholder="Enter Password" />
                </div>
                <button disabled={user.email.length===0 || user.password.length < 7 || user.name.length < 3 || user.phoneNo.length < 10}  type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Addemploye;

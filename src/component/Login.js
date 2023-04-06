import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/users/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        let data = await response.json()
        //console.log("token: ",data.authtoken);
        //console.log(response.status);
        // console.log( localStorage.removeItem('token'));
        // localStorage.clear();

        if (response.status === 200){
            // Save the auth token and redirect
            localStorage.setItem('token', data.authtoken);
            localStorage.setItem('admin', data.admin);
            console.log(data.admin);
            
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container my-3'>
            <form  onSubmit={handleSubmit} className='my-3 border border-secondary shadow p-3 mb-5 bg-body rounded'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Email Id</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required/>
                </div>

                <button disabled={credentials.email.length=== 0 || credentials.password.length === 0} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;

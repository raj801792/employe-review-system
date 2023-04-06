import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();
    console.log("ad",localStorage.getItem('admin'))
    const handelLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={localStorage.getItem('admin') ? 'd-block nav-link active' : 'd-none'} aria-current="page" to="/addemploye">Add Employe</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                           
                            <Link className="btn btn-outline-warning mx-1" to="/login" role="button">Login</Link>
                            
                        </form>:<button className="btn btn-outline-warning" onClick={handelLogout} type="button">Logout</button>}
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar

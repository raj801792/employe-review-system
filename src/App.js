
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addemploye from './component/Addemploye';
import Home from './component/Home';

import Navbar from './component/Navbar';
import UserState from './context/users/UserState';
import Login from './component/Login';
import Reviews from './component/Reviews';
import ReviewState from './context/users/review/ReviewState';

function App() {
  return (
    <>
    
    <UserState>
      <ReviewState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
          <Route index element={<Home />} />
          <Route path="addemploye" element={<Addemploye />} />
          <Route path="login" element={<Login />} />
          <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ReviewState>
      </UserState>
      
    </>
  );
}

export default App;

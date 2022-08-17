import { useEffect } from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import {useDispatch} from "react-redux";
import{setUser} from "./redux/features/authSlice"
import AddEditPost from './pages/AddEditPost';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <BrowserRouter>
     <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/addPost" element={
        <PrivateRoute>
          <AddEditPost />
        </PrivateRoute>
        }/>
        <Route path="/editPost/:id" element={
        <PrivateRoute>
          <AddEditPost />
        </PrivateRoute>}/>
        <Route path="/post/:id" element={<SinglePost />}/>
        <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }/>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </BrowserRouter>
   
   );
}

export default App;

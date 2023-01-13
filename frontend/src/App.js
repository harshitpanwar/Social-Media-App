import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {useEffect} from "react";
import { loadUser } from './Actions/User';
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import Friends from './Components/Friends/Friends';
import Header from './Components/Header/Header';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch]);

  const {isAuthenticated, user} = useSelector((state) => state.user);
  console.log(isAuthenticated);


  return (
      <div className='App'>

        <div className="nav">
          <Header/>
        </div>

        <div className='body'>

            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/friends' element={<Friends/>}/>

            </Routes>

        </div>

      </div>

  );
}

export default App;

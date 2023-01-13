import React from 'react'
import '../../App.css'
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
	const navRef = useRef();
  const {isAuthenticated} = useSelector((state) => state.user);
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>Social Media Website</h3>
			<nav ref={navRef}>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>

        {/* show friends only if logged in */}

        {isAuthenticated && <Link to="/friends">Friends</Link>}

        {/* show login or profile depending on if logged in */}
        
        {!isAuthenticated?
        <Link to="/login">Login</Link>:
        <Link to="/profile">Profile</Link>
        }
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}


export default Header;
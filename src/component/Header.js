import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./css/Header.css";

function Navbar() {
    return (
        <>
        <nav className = 'header'>
            <div className = 'container'>
                <Link to="/"><h2 className='logo' >HelloWorld</h2> </Link>  {/*클릭시 첫 화면*/}
                
                <div className='icon' >
                </div>

                    
                    <Link to="/Login"><button className='sign-btn'>Sign up</button></Link>
            </div>
        </nav>
        </>
    );
}

export default Navbar
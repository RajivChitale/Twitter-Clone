import Feed from './Feed.js';
import Navbar from './Navbar.js';
import './2col.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from './globalvars.js';


const Home = () => {

    return (
        <div className='Home'>
            <Navbar active="/Home" />
            <Feed/>
        </div>
    );
}

export default Home;
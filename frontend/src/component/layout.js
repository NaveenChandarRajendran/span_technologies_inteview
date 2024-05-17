import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div id='main'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
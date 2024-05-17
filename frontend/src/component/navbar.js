import React from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { persistor } from '..';

const MainNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        persistor.purge();
        navigate('/signup')
    }
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Employee</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={() => handleLogout()}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default MainNavbar;
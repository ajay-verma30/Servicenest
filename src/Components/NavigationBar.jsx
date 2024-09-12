import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';

function NavigationBar() {
  return (
    <div>
      <Navbar className='bg-light'>
        <Container>
        <Navbar.Brand href='#home'>ServiceNest</Navbar.Brand>
        <Navbar.Toggle aria-controls='collapseNavbar'></Navbar.Toggle>
        <Navbar.Collapse id='collapseNavbar'>
            <Nav className='ms-auto'>
                <Nav.Link href='#home'>Home</Nav.Link>
                <Nav.Link href='#about'>About</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar

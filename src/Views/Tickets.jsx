// Tickets.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './ticket.css';
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar';
import { AuthContext } from '../Authentication/authentication'; 

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const { token, user } = useContext(AuthContext); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const ticketsData = await axios.get("http://localhost:3001/ticket/alltickets", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setTickets(ticketsData.data);
                } catch (error) {
                    console.error('Error fetching tickets:', error);
                }
            }
        };
        fetchData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail =  user.email;
        const newTicket = { ticketTitle: title, ticketDescription: description, createdBy: userEmail };
         try{
            const results = await axios.post('http://localhost:3001/ticket/newticket', newTicket, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
               })

               if(results.status === 201){
                setShow(false);
                window.location.reload();
               }
         }
         catch(e){
            console.log(e)
         }            
    };

    return (
        <div>
            <NavigationBar />
            <Container>
                <Button variant="primary" onClick={handleShow} className='raise-btn ms-auto'>Raise Ticket</Button>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ticket Number</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.tID}>
                                <td>
                                    <Link to={`/ticket/${ticket.tID}`}>
                                        {ticket.ticketNumber}
                                    </Link>
                                </td>
                                <td>{ticket.ticketTitle}</td>
                                <td>{ticket.ticketDescription}</td>
                                <td>{ticket.createdAt}</td>
                                <td>{ticket.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Raise Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="ticketTitle">
                            <Form.Label>Ticket Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ticketDescription">
                            <Form.Label>Ticket Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Tickets;

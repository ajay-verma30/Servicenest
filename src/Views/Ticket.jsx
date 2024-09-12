import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Form, Row, Col } from 'react-bootstrap';
import NavigationBar from '../Components/NavigationBar';
import { AuthContext } from '../Authentication/authentication';

function Ticket() {
  const { tID } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext); 

  useEffect(() => {
    const fetchTicketData = async() =>{
        try{
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/ticket/${tID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTicket(response.data);
        }
        catch(e){
            console.error(e)
        }
        finally{
            setLoading(false)
        }
    }
    fetchTicketData()
  }, [tID]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
        <NavigationBar/>
        <Container>
            <Form>
                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Ticket Number</Form.Label>
                            <Form.Control type="text" value={ticket.ticketNumber} disabled />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Create At</Form.Label>
                            <Form.Control type="text" value={ticket.createdAt} disabled />
                        </Form.Group></Col>
                </Row>
                <br></br>
                    <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={ticket.ticketTitle} disabled />
                    </Form.Group>
              <br></br>
              <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" as="textarea" value={ticket.ticketDescription} disabled />
                    </Form.Group>
            </Form>
        </Container>
    </div>
  );
}

export default Ticket;
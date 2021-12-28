"use strict";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modalform from './Modal'
import { Card, Button, Col, Row, Container, Modal, Form } from 'react-bootstrap';
import '../css/card.css';

function Buyer(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const baseUrl = "http://localhost:3001";
    useEffect(() => {
        async function getSellers() {
            let userToken = props.userToken
            axios.get(`${baseUrl}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Basic ${userToken}`
                }
            })
                .then((result) => {
                  
                    setData(result.data)

                  
                }).catch((error) => {
                    console.log(error);
                })
        }
        getSellers()
    }, [])

    return (
        <>
            <Container>
                <Row xs={3} md={3}>
                    {data.map((result) => {
                        return (
                            <>
                                <div className="home">
                                    <div className="center">
                                        <Col>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title> {result.username}</Card.Title>
                                                    <Card.Text>
                                                        <Modalform
                                                            id={result._id}
                                                            handleShow={handleShow}
                                                            handleClose={handleClose}
                                                            show={show}
                                                        ></Modalform>
                                                    </Card.Text>
                                                    <Button variant="outline-success" onClick={handleShow}>Book Appointment</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </div>
                                </div>

                            </>
                        )

                    })}
                </Row>
            </Container>

        </>
    );
}



export default connect(function (state) {
    return state
})(Buyer) 
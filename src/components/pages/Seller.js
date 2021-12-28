"use strict";
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Row, Container,  ListGroup, ListGroupItem } from 'react-bootstrap';
function Seller(props) {
    const [data, setData] = useState([]);
    const baseUrl = "http://localhost:3001";
    useEffect(() => {
        async function getBuyers() {
            console.log(process.env.HOST);
            let userToken = props.userToken
            axios.get(`${baseUrl}/buyers`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Basic ${userToken}`
                }
            })
                .then((result) => {

                    setData(result.data)

                }).catch((error) => {

                })
        }
        getBuyers()
    }, [])

    async function accept(appointmentId, e) {
        let userToken = props.userToken

        let status = e.target.value

        axios.patch(`${baseUrl}/appointments/${appointmentId}`, { status: status }, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Basic ${userToken}`
            }
        }).then((result) => {
            window.location.reload();
            setData(result.data)

        }).catch((error) => {

        })
    }

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
                                            <Card style={{ width: '18rem' }} border="primary">
                                                <Card.Body>

                                                    <Card.Title> </Card.Title>
                                                    <Card.Title> {result.buyer.username}</Card.Title>

                                                    <Card.Text>
                                                        <ListGroup className="list-group-flush">
                                                            <ListGroupItem>{result._id}</ListGroupItem>

                                                        </ListGroup>

                                                    </Card.Text>
                                                    <Card.Header>Buyer-Note:</Card.Header>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>

                                                            {' '}
                                                            {result.notes}
                                                            {' '}
                                                        </p>

                                                    </blockquote>
                                                    <br></br>
                                                    <Button variant="outline-danger" value="Rejected" onClick={(e) => accept(result._id, e)}>Reject</Button>
                                                    <Button variant="outline-success" value="Accepted" style={{ marginLeft: "6rem" }} onClick={(e) => accept(result._id, e)} >Accept</Button>
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
})(Seller) 
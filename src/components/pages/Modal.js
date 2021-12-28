"use strict";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { If, Else, Then, } from 'react-if';
import { Button, Form } from 'react-bootstrap';
import '../css/card.css';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';

function ModalForm(props) {
    const baseUrl = "http://localhost:3001";
    let [date, setDate] = useState('');
    let [note, setNote] = useState('');
    function onChangeDate(event) {
        setDate(event.target.value)
    }
    function onChangeText(event) {
        setNote(event.target.value)
    }
    async function bookAppointments(event) {
        props.handleClose()
        event.preventDefault();
        let userToken = props.userToken

        let appointment = [
            { seller_id: props.id, appointmentDate: date, notes: note }
        ]
        axios.post(`${baseUrl}/appointments`, appointment, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Basic ${userToken}`
            }
        })
            .then((result) => {
                console.log(result.data);
            })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your appointment created successfully',
            showConfirmButton: false,
            timer: 1500
        })

    }
    return (
        <>
            <If condition={props.show === true}>
                <Then>
                    <Form onSubmit={bookAppointments}>
                        <input
                            type="hidden"
                            name="id"
                            value={props.id}
                        />
                        <Form.Group required className="mb-3" controlId="exampleForm.ControlInput1">
                            <TextField
                                onChange={onChangeDate}
                                id="appointmentDate"
                                label="Choose booking Date"
                                type="date"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />

                        </Form.Group>
                        <Form.Group onChange={onChangeText} className="mb-3" name="text" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control required as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-success" type="submit" onClick={bookAppointments}>
                            Book Now
                        </Button>
                    </Form>
                </Then>
                <Else>
                </Else>
            </If>
        </>
    )
}

export default connect(function (state) {
    return state
})(ModalForm) 
import {Row, Col, Form, Button} from 'react-bootstrap'
import React, { useState} from 'react'
import {login} from '../../services/auth'

function Login() {
    const [username, changeUsername] = useState("")
    const [password, changePassword] = useState("")

    return(
        <Row className="justify-content-center">
            <Col md={6}>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={(e)=>changeUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={(e)=>changePassword(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Button onClick={()=>login(username, password)}>Log in</Button>
            </Col>
        </Row>
    )
}

export default Login
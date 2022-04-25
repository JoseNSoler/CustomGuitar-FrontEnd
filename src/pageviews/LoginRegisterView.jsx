import React from 'react'
import Login from '../components/Login'
import { Container, Row, Col } from 'react-bootstrap'
import '../scss/Login.scss'

export default function LoginRegisterView() {
  return (
    <Container className='mainLogin'>
        <Row xs={1} md={2}>
            <Col className='Logo'>
                <img
                src='https://user-images.githubusercontent.com/59320487/164891023-d4ab3a19-797f-4850-8b43-af3d87519f6e.jpeg'
                style={{width: "104%"}}></img>
            </Col>
            <Col className='LoginRegister'>
                <Login/>
            </Col>
        </Row>
    </Container>
  )
}

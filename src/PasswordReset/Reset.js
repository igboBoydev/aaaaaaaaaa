import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const Reset = () => {
    const [user, setUser] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
     let history = useHistory()
    const [alert, setAlert] = useState(false)
    const handleSecondChange = (e) => {
        e.preventDefault()
        setUser(e.target.value)
  }

  const handleSecondSubmit = (e) => {
      e.preventDefault()

      
    var myHeaders = new Headers();
    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": `${user}`
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

      fetch("http://localhost:5016/api/v1/password-reset", requestOptions)
          .then(response => response.json())
          .then(result => {
              if (result.success) {
                  const { message } = result.success;
                  setSuccess(message)
                  setAlert(true)
                  history.push('/profile/reset/password')
              } else if (result.error) {
                  const { message } = result.error;
                  setError(message)
              } else {
                  return;
             }
          },
              (error) => {
                  console.log(error)
              });
    }
    

     useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success, error])

  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>
              {success ? <section>
                            {showAlert && <span>{success}</span>}
             </section> : <section>
                            {showAlert && <span>{error}</span>}
             </section>
                        }
      <Form onSubmit={handleSecondSubmit}>
          <Form.Label htmlFor="inputPassword5">Enter Email:</Form.Label>
          <Form.Control
            type="email"
                name='email'
                className='input_width'
            onChange={handleSecondChange}s
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" className='mb-3' muted>
            Please enter the your valid Email address.
        </Form.Text>
            <Button className='mb-2 ' type='submit' variant="outline-success">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Reset

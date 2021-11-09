import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import IntegrationNotistack from '../Fetch/IntegrationNotistack';

const Voice = () => {
  const [value, setValue] = useState([])
    const [success, setSuccess] = useState(null)
    let history = useHistory()
    const [showAlert, setShowAlert] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation()
        let value = e.target.value;
      setValue(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "test_sk_DlzKdyZ6xHZLsA0WoS8fviJiC");
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "mobile": `${value}`
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch("http://localhost:5016/api/v1/resend-voice", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { message } = result.success;
                    setSuccess(message)
                    history.push('/validate')
                } else if (result.error) {
                    const { message } = result.error;
                    setSuccess(message)
                } else {
                    return;
               }
            },
                (error) => {
                    console.log(error)
                }
            )
    };

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success])
  
  

  return (
        <section className='register_section d-flex justify-content-center mt-5'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">OTP Via voice Call</Form.Label>
          <Form.Control
            type="text"
                name='otp'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please enter the your mobile number.
        </Form.Text>
        <Button className='my-4 ' type='submit' variant="outline-success">Submit</Button>
                      </Form>
                </Col>
            </Row>
            {success && <IntegrationNotistack success={`${success}`} />}
        </Container>
   </section>
    )
}

export default Voice

        
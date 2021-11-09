import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const SoftLottoOdds = () => {
    const [odds, setOdds] = useState('')
    const [type, setType] = useState('Regular')
    let token = localStorage.getItem('adminToken')
    const [success, setSuccess] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleChange = e => {
        e.preventDefault()
        setOdds(e.target.value)
    }

    const handleType = e => {
        e.preventDefault()
        setType(type)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
            var myHeaders = new Headers();
            myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
            myHeaders.append("timestamps", "1614848109");
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "type": `${type}`,
                "odds": `${odds}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5016/api/v2/auth/postSoftLottoOdds", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        const { message } = result.success;
                        setSuccess(message)
                    } else {
                        const { message } = result.error;
                        setSuccess(message)
                    }
                },
                    (error) => {
                        setSuccess('Please refresh your browser or try re-login to your admin account.')
                    }
                )
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success]);

    return (
        <Container className='max_amount'>
            <section className='amount_section'>
                <Form onSubmit={handleSubmit}>
                    {success && <section className='mt-2 green'>
                        {showAlert && <span>{success}</span>}
                    </section>
                    }
                    <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
                            <Form.Label>Soft Lotto Odd for Regular</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="Sofft Lotto For Regular"
                                onChange={handleChange}
                                placeholder="240"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
                        <Form.Label>Soft Lotto Odd for Ordered Games</Form.Label>
                        <Form.Control required as="select" onChange={handleType} custom>
                            <option value='Regular'>Regular</option>
                            <option value='Ordered'>Ordered</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
          
               <Form.Text id="passwordHelpBlock" muted>
                  Please provide the correct numbers and their respective gameType here.
               </Form.Text>
                    <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
                </Form>
            </section>
       </Container>
    )
}

export default SoftLottoOdds

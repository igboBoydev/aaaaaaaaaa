import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const LottoExpressOdds = () => {
    const [odds, setOdds] = useState('')
    let token = localStorage.getItem('adminToken')
    const [success, setSuccess] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleChange = e => {
        e.preventDefault()
        setOdds(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("timestamps", "1614848109");
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "odds": `${odds}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/postLottoExpressOdds", requestOptions)
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
                        <Form.Label>Lotto Express Odd</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="Lotto Express"
                                onChange={handleChange}
                                placeholder="400"
                                required
                            />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
                </Form>
            </section>
        </Container>
    )
}

export default LottoExpressOdds

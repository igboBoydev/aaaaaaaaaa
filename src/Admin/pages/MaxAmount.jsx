import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

const MaxAmount = () => {
    const [value, setValue] = useState(null)
    const [type, setType] = useState('Lotto Express')
    let token = localStorage.getItem('adminToken')
    const [success, setSuccess] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleSelect = e => {
        e.preventDefault()
        setType(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "type": `${type}`,
            "value": `${value}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/postMaxAmount", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { message } = result.success
                    setSuccess(message)
                }
            })
            .catch(error => {
                setSuccess('Please refresh or re-login and try again')
            });
    }

    const handleChange = e => {
        e.preventDefault()
        setValue(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success]);


    return (
        <Container className='max_amount'>
            <section className='amount_section'>
                <Form onSubmit={handleSubmit} >
                    {success && <section className='mt-2 green'>
                        {showAlert && <span>{success}</span>}
                    </section>
                    }
                          <Form.Group className='mt-2' controlId="exampleForm.SelectCustom">
                <Form.Label>Game Type for Amount Update:</Form.Label>
                    <Form.Control as="select" required onChange={handleSelect} custom>
                    <option name='NAP 1' value='NAP 1'>Lotto Express</option>
                    <option name='NAP 1' value='NAP 1'>Soft Lotto</option>
                    <option name='NAP 1' value='NAP 1'>General</option>
                    <option name='NAP 1' value='NAP 1'>NAP 1</option>
                    <option name='NAP 2' value='NAP 2'>NAP 2</option>
                    <option name='NAP 3' value='NAP 3'>NAP 3</option>
                    <option name='NAP 4' value='NAP 4'>NAP 4</option>
                    <option name='NAP 5' value='NAP 5'>NAP 5</option>
                </Form.Control>
              </Form.Group>
               <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
                            <Form.Label>Max game Amount</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="amount"
                                onChange={handleChange}
                                placeholder="20"
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

export default MaxAmount

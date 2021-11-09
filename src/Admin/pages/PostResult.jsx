import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const PostResult = () => {
    const [type, setType] = useState('NAP 1')
    const [odds, setOdds] = useState('')
    let token = localStorage.getItem('adminToken')
    const [success, setSuccess] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleSelect = e => {
        e.preventDefault()
        setType(e.target.value)
    }

    const handleChange = e => {
        e.preventDefault()
        setOdds(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("timestamps", "1614848109");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "names": `${type}`,
            "odds": `${odds}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/postResult", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result)
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
                                  <Form.Group className='mt-2' controlId="exampleForm.SelectCustom">
                <Form.Label>Game Type:</Form.Label>
                    <Form.Control as="select" required onChange={handleSelect} custom>
                    <option name='NAP 1' value='NAP 1'>NAP 1</option>
                    <option name='NAP 2' value='NAP 2'>NAP 2</option>
                    <option name='NAP 3' value='NAP 3'>NAP 3</option>
                    <option name='NAP 4' value='NAP 4'>NAP 4</option>
                    <option name='NAP 5' value='NAP 5'>NAP 5</option>
                    <option name='PERM 2' value='PERM 2'>PERM 2</option>
                    <option name='PERM 3' value='PERM 3'>PERM 3</option>
                    <option name='PERM 4' value='PERM 4'>PERM 4</option>
                    <option name='PERM 5' value='PERM 5'>PERM 5</option>
                    <option name='1 BANKER' value='1 BANKER'>1 BANKER</option>
                    <option name=' AGAINST' value='AGAINST'>AGAINST</option>
                </Form.Control>
              </Form.Group>
               <Form.Group className='mt-2 admin_form' controlId="validationCustom01">
                            <Form.Label>Numbers Seperated by Commas:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="odds"
                                onChange={handleChange}
                                placeholder="22,33,2,17,88"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
            <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
                    
              <Form.Group className='mt-2' controlId="exampleForm.SelectCustom"></Form.Group>
                </Form>
            </section>
       </Container>
    )
}

export default PostResult

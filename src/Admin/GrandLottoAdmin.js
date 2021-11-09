import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';

const initialState = {
    mobile: '',
    password: '',
}


const Login = () => {
    const { giveAdminAccess, showBoard, admin } = useGlobalContext();
    let history = useHistory()
    const [success, setSuccess] = useState(false)
    const [users, setUsers] = useState(initialState)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUsers({ ...users, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("timestamps", "1614848109");
        myHeaders.append("Content-Type", "application/json");

        if (users.mobile === '09020269804' && users.password === 'ABELkelly6022') {
            var raw = JSON.stringify({
                "mobile": `${users.mobile}`,
                "password": `${users.password}`
            });
        } else {
            setError('You are not an admin')
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/grandLottoAdmin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { token } = result.success;
                    localStorage.setItem('adminToken', token)
                    setShowAlert(true)
                    giveAdminAccess(token)

                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "816b807eaa6a57278d26e432e3ef53650ec3b4a7282904083654f28969bbeffe");
                    myHeaders.append("Authorization", `Bearer ${token}`);

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result.success) {
                                const { data } = result.success;
                                setSuccess(true)
                                showBoard(data)
                            } else {
                                return;
                            }
                        },
                            (error) => {
                                setSuccess('please try again')
                            });

                } else if (result.error) {
                    const { message } = result.error;
                    setError(message)
                }else{
                    return;
                }
            },
                (error) => {
                    setSuccess('please refresh and try again')
                }
        );
        
         history.push('/postResult')
        
        users.mobile = ''
        users.password = ''
    };
    
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
                            {showAlert && <span className='green'>LoggedIn successfully</span>}
             </section> : <section>
                              {showAlert && <span className='p_red'>{error}</span>}
             </section>
                        }
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0'>Mobile</Form.Label>
          <Form.Control
            type="text"
            name='mobile'
            className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0'>Password</Form.Label>
          <Form.Control
            type="Password"
            name='password'
            className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" className='ml-2 ml-lg-0' muted>
            Please Kindly Ensure your Login Details are correct.
        </Form.Text>
        <Button variant='success' className='mb-3 ml-2 ml-lg-0 mt-2' type="submit">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Login
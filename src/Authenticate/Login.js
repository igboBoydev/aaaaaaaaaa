import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import IntegrationNotistack from '../Fetch/IntegrationNotistack';
 import * as yup from 'yup';

const schema = yup.object().shape({
  mobile: yup.string().min(11, 'Must be 11 characters or more').required(),
  password: yup.string().min(8, 'Must be 8 characters or more').required(),
});

const Login = () => {
    const { giveAccess, showBoard } = useGlobalContext();
    let history = useHistory()
    const [success, setSuccess] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        let time = setTimeout(() => {
            setShowAlert(!showAlert)
            setSuccess('')
        }, 3000)

        return () => clearTimeout(time)
    }, [success]);
    
    return (
         <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                    <Col className='mt-5' md={{ span: 12, offset: 1 }}>
                        <h5 className='ml-3 mb-3' style={{ textDecoration: 'underline', color: "rgb(187, 187, 23)"}}>Login To Your Account</h5>
    <Formik
      validationSchema={schema}
        onSubmit={values => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("timestamps", "1614848109");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mobile": `${values.mobile}`,
            "password": `${values.password}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


            fetch("http://localhost:5016/api/v1/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        history.push('/games')
                        const { token } = result.success;
                        setShowAlert(true)
                        giveAccess(token)
                        var myHeaders = new Headers();
                        myHeaders.append("signatures", "5a1131f2eb747be50714281ec3e68b759476c6dc9e1faf5fc5d91c552cf8c230");
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
                                    setSuccess('Please refresh and try again')
                                    return;
                                }
                            },
                                (error) => {
                                    console.log(error)
                                });
                  } else {
                      setSuccess('Mobile number and password incorrect')
                      return;
                  }
                },
                    (error) => {
                        console.log(error)
                    }
                );

      }}
      initialValues={{
        mobile: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="10" controlId="validationFormik04">
            <Form.Label>Mobile</Form.Label>
                <Form.Control
                    value={values.mobile}
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    placeholder="0902xxxxxx"
                    isInvalid={!!errors.mobile}
                />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                    />
                                            
            <Form.Control.Feedback className='d-inline-block' type="invalid">
                {errors.password}
              </Form.Control.Feedback>

            </Form.Group>
         <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
        </Form>
      )}
        </Formik>
        <div>
            <p className='green'>Forgot Password ?</p>
            <Button variant='success' className='mb-3 ml-2 ml-lg-0' onClick={() => {
            history.push('/profile/passwordreset')      
          }} >Reset</Button>
        </div>         
                </Col>
                </Row>
        {success && <IntegrationNotistack success={`${success}`} />}
        </Container>
   </section>
    )
}

export default Login



    //     <section className='register_section d-flex justify-content-center'>
    //         <Container fluid='md'>
    //         <Row>
    //             <Col className='mt-5' md={{ span: 12, offset: 1 }}>
    //              {success && <section>
    //                         {showAlert && <span>LoggedIn successfully</span>}
    //          </section> 
    //                     }
    //   <Form onSubmit={handleSubmit}>
    //       <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0'>Mobile</Form.Label>
    //       <Form.Control
    //         type="text"
    //             name='mobile'
    //             className='input_width'
    //         onChange={handleChange}
    //         id="inputPassword5"
    //         aria-describedby="passwordHelpBlock"
    //                       />
    //                       <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0 mt-3'>Password</Form.Label>
    //                       <div className='d-flex'>
    //                   <Form.Control
    //         type={password}
    //             name='password'
    //             className='input_width'
    //         onChange={handleChange}
    //         id="inputPassword5"
    //         aria-describedby="passwordHelpBlock"
    //                           />
    //                           {
    //                               users.password &&
    //                             <span onClick={handleShow} className={`${color ? 'back show_password' : 'show_password'}`}>
    //                                 <p className='m-2'>Show</p> 
    //                             </span>
    //                           }
    //                       </div>             
    //       <Form.Text id="passwordHelpBlock" muted className='ml-2 ml-lg-0 mt-2'>
    //         Please Kindly Ensure your Login Details are correct.
    //     </Form.Text>
    //     <Button variant='success'  className='mb-3 ml-2 ml-lg-0 mt-2'type="submit">Submit</Button>
    //   </Form>
        // <div>
        //     <p className='green'>Forgot Password ?</p>
        //     <Button variant='success' o className='mb-3 ml-2 ml-lg-0' onClick={() => {
        //     history.push('/profile/passwordreset')      
        //   }} >Reset</Button>
        // </div>
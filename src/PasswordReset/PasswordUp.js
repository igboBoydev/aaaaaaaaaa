import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
 import * as yup from 'yup';

const schema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().min(8, 'Must be 8 characters or more').required(),
  confPassword: yup.string().oneOf([yup.ref('password'), null], 'Password Must Match').required('Confirm password')
});



const PasswordUp = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [showAlert, setShowAlert] = useState(false)
    const history = useHistory()
    

    

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success])
        
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
    <Formik
      validationSchema={schema}
        onSubmit={values => {
            console.log(values.token)
                                var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "token": `${values.token}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

            fetch("http://localhost:5016/api/v1/validate-token", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        var myHeaders = new Headers();
                        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                            "token": `${values.token}`,
                            "password": `${values.password}`
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch("http://localhost:5016/api/v1/update-password", requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                if (result.success) {
                                    const { message } = result.success;
                                    setSuccess(message)
                                } else if (result.error) {
                                    const { message } = result.error;
                                    setError(message)
                                } else {
                                    return
                                }
                            },
                                (error) => {
                                    console.log(error)
                                });
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
            history.push('/games')
      }}
      initialValues={{
        token: '',
        password: '',
        confPassword: ''
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
            <Form.Label>Token</Form.Label>
                <Form.Control
                    value={values.token}
                    type="text"
                    name="token"
                    onChange={handleChange}
                    placeholder="token"
                    isInvalid={!!errors.token}
                />
              <Form.Control.Feedback type="invalid">
                {errors.token}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>New Password</Form.Label>
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
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="confPassword"
                                value={values.confPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confPassword}
                                    />
              <Form.Control.Feedback type="invalid">
                {errors.confPassword}
              </Form.Control.Feedback>
            </Form.Group>
         <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
        </Form>
      )}
    </Formik>







                        
            {/* <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Token</Form.Label>
                            <Form.Control
                                    required
                                    value={users.token}
                                type="text"
                                name="token"
                                onChange={handleChange}
                                placeholder="token"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
          <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>
                            <div className='d-flex'>
                            <Form.Control
                                type={password}
                                placeholder="xxxxxxxxxxxxxxxx"
                                    name="password"
                                    value={users.password}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                    required
                                    />
                                    {
                                        users.password &&
                                        <span onClick={handleShow} className={`${color ? 'back show_password' : 'show_password'}`}>
                                            <p className='m-2'>{ `${color ? 'Hide' : 'Show'}`}</p>
                                        </span>
                                    }

                                </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          <Form.Group as={Col} md="8" controlId="validationCustom01">
                                <Form.Label>Confirm Password</Form.Label>
                                                            <div className='d-flex'>
                            <Form.Control
                                type={password1}
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="confPassword"
                                value={users.confPassword}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                    required
                                    />
                                    {
                                        users.confPassword &&
                                        <span onClick={handleShow1} className={`${color1 ? 'back show_password' : 'show_password'}`}>
                                            <p className='m-2'>{ `${color1 ? 'Hide' : 'Show'}`}</p>
                                        </span>
                                    }

                                </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          
          <Form.Text className='ml-3' id="passwordHelpBlock" muted>
            Please provide the token sent to your registered email.
        </Form.Text>
              <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
      </Form> */}
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default PasswordUp


































// return (
//         <section className='register_section d-flex justify-content-center'>
//             <Container fluid='md'>
//             <Row>
//           <Col className='mt-5' md={{ span: 12, offset: 1 }}>
//                         {success ? <section>
//                             {showAlert && <span>{success}</span>}
//              </section> : <section>
//                             {showAlert && <span>{error}</span>}
//              </section>
//                         }
//             <Form noValidate onSubmit={handleSubmit}>
//               <Form.Group as={Col} md="8" controlId="validationCustom01">
//                             <Form.Label>Token</Form.Label>
//                             <Form.Control
//                                     required
//                                     value={users.token}
//                                 type="text"
//                                 name="token"
//                                 onChange={handleChange}
//                                 placeholder="token"
//                                 required
//                             />
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                             </Form.Group>
//           <Form.Group as={Col} md="8" controlId="validationCustom01">
//                             <Form.Label>Password</Form.Label>
//                             <div className='d-flex'>
//                             <Form.Control
//                                 type={password}
//                                 placeholder="xxxxxxxxxxxxxxxx"
//                                     name="password"
//                                     value={users.password}
//                                 onChange={handleChange}
//                                 aria-describedby="inputGroupPrepend"
//                                     required
//                                     />
//                                     {
//                                         users.password &&
//                                         <span onClick={handleShow} className={`${color ? 'back show_password' : 'show_password'}`}>
//                                             <p className='m-2'>{ `${color ? 'Hide' : 'Show'}`}</p>
//                                         </span>
//                                     }

//                                 </div>
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
//           <Form.Group as={Col} md="8" controlId="validationCustom01">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                                             <div className='d-flex'>
//                             <Form.Control
//                                 type={password1}
//                                 placeholder="xxxxxxxxxxxxxxxx"
//                                 name="confPassword"
//                                 value={users.confPassword}
//                                 onChange={handleChange}
//                                 aria-describedby="inputGroupPrepend"
//                                     required
//                                     />
//                                     {
//                                         users.confPassword &&
//                                         <span onClick={handleShow1} className={`${color1 ? 'back show_password' : 'show_password'}`}>
//                                             <p className='m-2'>{ `${color1 ? 'Hide' : 'Show'}`}</p>
//                                         </span>
//                                     }

//                                 </div>
//                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         </Form.Group>
          
//           <Form.Text className='ml-3' id="passwordHelpBlock" muted>
//             Please provide the token sent to your registered email.
//         </Form.Text>
//               <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
//       </Form>
                       
//                 </Col>
//             </Row>
//         </Container>
//    </section>
//     )
// }

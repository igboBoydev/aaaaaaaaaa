import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import IntegrationNotistack from '../Fetch/IntegrationNotistack';
import { useHistory } from 'react-router';
import * as yup from 'yup';
 
const schema = yup.object().shape({
  otp: yup.string().required(),
  mobile: yup.string().min(11, 'Must be 11 characters or more').required(),
});

const Validate = () => { 
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const history = useHistory()

  //   const handleChange = (e) => {
  //       e.preventDefault();
  //       e.stopPropagation()
  //       const name = e.target.name;
  //       const value = e.target.value;
  //       setUsers({ ...users, [name]: value })
  // }
 

  //   const handleSubmit = (event) => {
  //       event.preventDefault()

  //       const form = event.currentTarget;
  //       if (form.checkValidity() === false) {
  //           event.preventDefault();
  //           event.stopPropagation();
  //     }
      

      // var myHeaders = new Headers();
      // myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "otp": `${users.otp}`,
      //   "mobile": `${users.mobile}`
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // }

      // fetch("http://localhost:5016/api/v1/validate-otp", requestOptions)
      //   .then(response => response.json())
      //   .then(result => {
      //     if (result.success) {
      //       const { message } = result.success;
      //       setSuccess(message)
      //     } else if(result.error) {
      //       const { message } = result.error;
      //       setError(message)
      //     } else {
      //       return;
      //     }
      //   },
      //     (error) => {
      //       console.log(error)
      //     });

        
  //       users.otp = ''
  //       users.mobile = ''
  // };

  useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success])
  
  return (
        <section className='register_section d-flex justify-content-center mt-5' >
            <Container fluid='md'>
            <Row>
          <Col className='mt-5' md={{ span: 12, offset: 1 }}>
    <Formik
      validationSchema={schema}
        onSubmit={values => {
      var myHeaders = new Headers();
      myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "otp": `${values.otp}`,
        "mobile": `${values.mobile}`
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch("http://localhost:5016/api/v1/validate-otp", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            const { message } = result.success;
            setSuccess(message)
            history.push('/validate/login')
          } else if(result.error) {
            const { message } = result.error;
            setError(message)
          } else {
            return;
          }
        },
          (error) => {
            console.log(error)
          });

      }}
      initialValues={{
        otp: '',
        mobile: '',
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
            <Form.Label>Otp</Form.Label>
                <Form.Control
                    value={values.otp}
                    type="text"
                    name="otp"
                    onChange={handleChange}
                    placeholder="otp"
                    isInvalid={!!errors.otp}
                />
              <Form.Control.Feedback type="invalid">
                {errors.otp}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                isInvalid={!!errors.mobile}
                                    />
                                            
            <Form.Control.Feedback className='d-inline-block' type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
         <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
        </Form>
      )}
    </Formik>
       <h6>Otp not sent ?</h6>
      <div className='d-flex'>
        <Button variant='success' onClick={() => history.push('/validate/whatsapp')} className='mb-3 mr-2' >Whatsapp</Button>
        <Button variant='success' onClick={() => history.push('/validate/voice')} className='mb-3' >Voice</Button>
      </div>
            
     
                       
                </Col>
        </Row>
    {success && <IntegrationNotistack success={`${success}`} />}
        </Container>
   </section>
    )
}

export default Validate 



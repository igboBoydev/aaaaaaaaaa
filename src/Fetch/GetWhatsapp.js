import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import login from '../svg/login.svg'


function MyVerticallyCenteredModal(props) {
    let { giveAccess, giveAdminAccess, showBoard, logOut, logedIn, isLoggedIn } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [error, setError] = useState('')
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setUserLogin({...userLogin, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
          myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
          myHeaders.append("timestamps", "1614848109");
          myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mobile": `${userLogin.mobile}`,
            "password": `${userLogin.password}`
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
                      const { token } = result.success;
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
                                  showBoard(data)
                                  props.setModalShow(false)
                                //   localStorage.setItem('user', JSON.stringify(data))
                              } else {
                                  return;
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
                  }
              );
    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img className='svg_imgs_modal' src={login} alt="" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} inline justify-content-center className="d-flex form_btn">
            <div className='d-inline-block'>
            <Form.Control name="mobile" onChange={handleLogin} type="text" placeholder="090xxxxxxxx" className="mr-2 modal_form" aria-label="Mobile" />
            <Form.Control onChange={handleLogin} type="password" name="password" placeholder="Password" className="mr-2 modal_form" aria-label="Password" />
            <Button size='sm' type='submit' className='mr-3' variant="outline-success">Login</Button>
            </div>
        </Form>
        <div className='mt-3'>
            <p className='green' style={{marginBottom: '4px'}}>Forgot Password ?</p>
            <Button variant='success' o className='mb-3' onClick={() => {
            history.push('/profile/passwordreset')      
                  }} >Reset</Button>
                  <br />
          <p>New Customer ? <Link className='mt-3' to='/register'>Register Here</Link></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
    </>
  );
}

export default App
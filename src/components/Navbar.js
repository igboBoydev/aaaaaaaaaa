import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../store/context';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useHistory } from 'react-router';
import IntegrationNotistack from '../Fetch/IntegrationNotistack';
import logo from '../static/assets/logo4.png'
import GrandLotto from '../svg/GrandLotto.svg'

const Navigation = () => {
    let { giveAccess, giveAdminAccess, showBoard, logOut, logedIn, isLoggedIn } = useGlobalContext();
    const isMounted = useRef(true)
    let history = useHistory()
    const [success, setSuccess] = useState(false)
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [user, setUser] = useState(null)
     let get = localStorage.getItem('token')

    const handleLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    };

      const handleSubmit = (e) => {
          e.preventDefault();
          e.stopPropagation()
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
                                //   localStorage.setItem('user', JSON.stringify(data))
                              } else {
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

          userLogin.mobile = ''
          userLogin.password = ''
    }

    if (isLoggedIn) {
        localStorage.setItem('token', isLoggedIn)
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        history.push('/')
        localStorage.clear()
        logOut(true)
    }

    const handleBetHistory = (e) => {
        e.preventDefault()
        history.push('/profile/betHistory')
    }

    const handleSettings = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    const handleTransactionHistory = (e) => {
        e.preventDefault()
        history.push('/profile/transactions')
    }

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "3b55227b019105b2f8550792916ee41321b53fb2104fd0149e81c360811ef027");
        myHeaders.append("Authorization", `Bearer ${get}`);


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUser(result.success.data)
                giveAccess(isLoggedIn)
            })
            .catch(error => console.log('error', error));
    }, []);


    useEffect(() => {
        const loggedInAdmin = localStorage.getItem('adminToken')
        if (loggedInAdmin) {
            giveAdminAccess(loggedInAdmin)
        }
        return () => {
            isMounted.current = false
        }
    }, [])


    return (
        <header>
        {success && <IntegrationNotistack success={`${success}`} />}
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid ms-2">
      <a className="navbar-brand" href="/">
        <img src="assets/brand/GrandLotto.svg" alt="" width="200px" height="60px" className="d-inline-block align-text-top nav_img" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse d-md-flex justify-content-end" id="navbarCollapse">
        
                        {!logedIn && <section className='d-flex flex-column flex-md-row'>
                            <form className="d-flex">
                                <input className="form-control ml-2 mr-2" type="text" id="phone" name='mobile' onChange={handleLogin} value={userLogin.mobile} placeholder="Phone" />
                                <input className="form-control ml-2 mr-2" type="password" id="password" onChange={handleLogin} name='password' placeholder="Password" value={userLogin.password} />
                                <button className="btn btn-success ml-2 mr-2" type="submit" onClick={handleSubmit}>Login</button>
          
                            </form>
                            <a href="/register"><button className="btn btn-outline-primary fredbut me-2 mt-2 mt-md-0">Sign Up</button></a>
                        </section>
                        }
                        {
                            logedIn &&
                            <section className='d-flex flex-end'>
                 
                                <DropdownButton
                                className='nav_dropdown'
                                variant='secondary'
                                size='sm'
                                menuAlign="right"
                                title="Profile"
                                id="dropdown-menu-align-right"
                            >
                                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
                                <Dropdown.Item onClick={handleTransactionHistory}>Transaction History</Dropdown.Item>
                                <Dropdown.Item onClick={handleBetHistory}>Bet History</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    history.push('/profile/results')
                                }}>Draw Results</Dropdown.Item>
                            </DropdownButton>
                   
                            </section>
                        
                        }
      </div>
    </div>
  </nav>
</header>
    )
}


export default Navigation


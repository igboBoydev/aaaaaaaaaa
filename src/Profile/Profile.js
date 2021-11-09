import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../store/context';
import { Container, Col, Row, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useHistory } from 'react-router';
import FundWallet from '../Games/FundWallet'
import Axios from 'axios';
import profile from '../svg/profile.svg'

const initialState = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: '',
    id_number: '',
    password: '',
    password2: '',
    sender_id: '',
    customer_id: '',
    id_number: '',
    id_url: '',
    amount: '',
    pin: '',
    pin2: ''
}


const Profile = () => {
    let history = useHistory()
    const { logedIn, giveAccess, game, days, isLoggedIn, token} = useGlobalContext();
    const [user, setUser] = useState([])
    const [users, setUsers] = useState(initialState)
    const [getProfile, setGetProfile] = useState(true)
    const [kyc, setKyc] = useState(false)
    const [bank, setBank] = useState(false)
    const [password, setPasword] = useState(false)
    const [withdrawalPin, setWithdrawalPin] = useState(false)
    const [fundTransfer, setFundTransfer] = useState(false)
    const [success, setSuccess] = useState('')
    const [alert, setAlert] = useState(false)
    const [showPassword, setShowPassword] = useState('password')
    const [showPassword1, setShowPassword1] = useState('password')
    const [point1, setPoint1] = useState(false)
    const [point2, setPoint2] = useState(false)
    const [shown, setShown] = useState(false)
    const [shown1, setShown1] = useState(false)
    const [options, setOptions] = useState('')
    const [idType, setIdType] = useState('')
    const [name, setName] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.name === 'profile') {
            setGetProfile(true)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'kyc') {
            setGetProfile(false)
            setKyc(true)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'transfer') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(true)
        } else if (e.target.name === 'password') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(true)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'pin') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(true)
            setFundTransfer(false)
        } else if (e.target.name === 'bank') {
            setGetProfile(false)
            setKyc(false)
            setBank(true)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else {
            setGetProfile(true)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        }
    }

    const handleShow = (e) => {
        e.preventDefault()
        if (showPassword1 === 'password') {
            setShowPassword1('text')
            setShown1(true)
        } else if (showPassword1 === 'text') {
            setShowPassword1('password') && setShown(false)
            setShown1(false)
            return
        }
         return
    }

    const handleSecShow = (e) => {
        e.preventDefault()
        if (showPassword === 'password') {
            setShowPassword('text')
            setShown(true)
        } else if (showPassword === 'text') {
            setShowPassword('password')
            setShown(false)
        }
         return
    }

    const categories = [...new Set(game.map((item) => item.name))]
    

    const handleRegisterChange = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;
        setOptions(value)
        if ((name === 'pin' && value) || (name === 'password' && value)) {
            setPoint1(true)
        } else if (((name === 'pin2' && value) || (name === 'password2' && value)) || (name === 'sender_id' && value)) {
            setPoint2(true)
        } else {
            setPoint1(false)
            setPoint2(false)
        }
        setUsers({...users, [name]: value})
    }

    let get = localStorage.getItem('token')


    const handleSubmit = (e) => {
        e.preventDefault()
        if (users.dob && users.firstName && users.lastName && users.gender) {
            var myHeaders = new Headers();
            myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
            myHeaders.append("Authorization", `Bearer ${get}`);;
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "firstname": `${users.firstName}`,
                "lastname": `${users.lastName}`,
                "dob": `${users.dob}`,
                "gender": `${users.gender}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                            updateProfile()
                            const { message } = result.success;
                            setSuccess(message)
                        }
                    })
                .catch(error => console.log('error', error));
        } else if (name && users.id_number && idType) {
            const data = new FormData()
            data.append("file", idType)

            var config = {
                method: 'post',
                url: 'http://localhost:5016/api/v2/auth/kyc-upgrade',
                headers: {
                    'signatures': 'lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=',
                    'Authorization': `Bearer ${get}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            Axios(config)
                .then(function (response) {
                    if (response.data) {
                        var myHeaders = new Headers();
                        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                        myHeaders.append("Authorization", `Bearer ${get}`);
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                            "id_type": `${name}`,
                            "id_number": `${users.id_number}`,
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch('http://localhost:5016/api/v2/auth/kyc-upgrades', requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                if (result.success) {
                                    updateProfile()
                                    const { message } = result.success;
                                    setSuccess(message)
                                }
                            })
                            .catch(error => console.log('error', error));
                    }
                })
                .catch(function (error) {
                    setSuccess('already uploaded files')
                    return
                });
        }
        else if (users.customer_id) {
            if (users.customer_id && users.sender_id && users.amount) {
                if (users.amount > parseInt(user.withdrawable) ) {
                    setSuccess('Cannot Send more than you have in your withdrawable account')
                    return
                }else if (parseInt(users.amount) > 1) {
                var myHeaders = new Headers();
                myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                myHeaders.append("Authorization", `Bearer ${get}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "customer_id": `${users.customer_id}`,
                    "amount": `${users.amount}`,
                    "pin": `${users.sender_id}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:5016/api/v2/auth/transferFund", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            updateProfile()
                            const { message } = result.success;
                            setSuccess(message)
                        }
                    })
                    .catch(error => console.log('error', error));
                } else {
                    setSuccess('Please enter a valid amount')
                }
           }  else {
                setSuccess('Please provide valid transfer credentials')
                return;
            }
        }else if (users.password) {
            if (users.password === users.password2) {
                var myHeaders = new Headers();
                myHeaders.append("signatures", "0b67f8117a7dbf296a7b28bcea50d55b71618955f9ae9267d1f77ede99c913ad");
                myHeaders.append("Authorization", `Bearer ${get}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "password": `${users.password2}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:5016/api/v2/auth/update-password", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            updateProfile()
                            const { message } = result.success;
                            setSuccess(message)
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                setSuccess('Please make sure your passwords match each other')
                return;
            }
        } else if (users.pin) {
            if (users.pin === users.pin2) {
                var myHeaders = new Headers();
                myHeaders.append("signatures", "f48eac9f1729a334dcac32b3491b98e93d3d0ad3c6efe01051e8dceb0461c1fc");
                myHeaders.append("Authorization", `Bearer ${get}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "pin": `${users.pin}`
                })

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:5016/api/v2/auth/update-pin", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            updateProfile()
                            const { message } = result.success;
                            setSuccess(message)
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                setSuccess('Please make sure your pin match each other')
                return;
            }
        }
         else {
            console.log('nah')
        }
        setOptions('')
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
                })
                .catch(error => console.log('error', error));
    }, [])

    const updateProfile = () => {
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
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        setTimeout(() => {
            setAlert(!alert)
        }, 3000)
    }, [success]);

    const handleLink = (e) => {
        e.preventDefault()
        history.push('/games')
    }

    return (
        <main className='margins'>
            <Container fluid>
                <Row>
                    <Col className='pl-4 days_column scrollbar d-none color d-lg-inline' md={2}>
                          <h6 className='draw'>Play Game</h6>
                        <section className='days scrollContent'>
                         
                            {categories.map((category) => {
                                return <p onClick={handleLink} className='category_p'>{category}</p>
                            })}
                        </section>
                    </Col>
                        <Col lg={10}>
                            <section> 
                            <section className='header_section'>
                                <div className='d-flex paragraph_header justify-content-between'>
                                    <p className='profile_paragraph'>Wallet: &#x20A6;{user.wallet}</p>
                                    <p className='profile_paragraph'>Mobile Number: {user.mobile}</p>
                                    <p className='profile_paragraph'> Withdrawable Balance: &#x20A6;{user.withdrawable}</p>
                                    <p className='profile_paragraph'>ID: {user.customer_id}</p>
                                </div>
                        </section>
                        
                            <section className='d-none d-lg-flex pt-3 justify-content-between'>
                                {
                                    user.profile_status !== 1 &&
                                    <div>
                                       <button className='profile_btn profile' name='profile' onClick={handleClick}>MY PROFILE</button>
                                    </div>
                                }
                                {
                                    user.kyc_status !== 1 &&
                                <div>
                                    <button className='profile_btn kyc' name='kyc' onClick={handleClick}>KYC DOCUMENTATION</button>
                                </div>
                                }
                              <div>
                               <button className='profile_btn transfer' name='transfer' onClick={handleClick}>FUND TRANSFER</button>
                            </div>
                            <div>
                               <button className='profile_btn password' name='password' onClick={handleClick}>CHANGE PASSWORD</button>
                            </div>
                            <div>
                               <button className='profile_btn pin' name='pin' onClick={handleClick}>WITHDRAWAL PIN</button>
                            </div>
                            <div>
                              <button className='profile_btn bank' name='bank' onClick={handleClick}> FUND WALLET</button>
                            </div>
                        </section>
                            <section className='d-lg-none mt-2 drop_section'>
                            <DropdownButton
                                className='nav_dropdown click'
                                variant='secondary'
                                size='sm'
                                menuAlign="right"
                                title="Updates"
                                id="dropdown-menu-align-right"
                                >
                                    {
                                        user.profile_status !== 1 &&
                                        <div>
                                        <Dropdown.Item className='item' name='profile' onClick={handleClick}>MY PROFILE</Dropdown.Item>
                                        <Dropdown.Divider />
                                        </div>
                                    }
                                    {
                                        user.kyc_status !== 1 &&
                                        <div>
                                        <Dropdown.Item className='item' name='kyc' onClick={handleClick}>KYC DOCUMENTATION</Dropdown.Item>
                                        <Dropdown.Divider />
                                        </div>

                                    }
                                    <Dropdown.Item className='item' name='transfer' onClick={handleClick}>FUND TRANSFER</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className='item' name='password' onClick={handleClick}>CHANGE PASSWORD</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className='item' name='pin' onClick={handleClick}>WITHDRAWAL PIN</Dropdown.Item>
                                    <Dropdown.Divider />
                                <Dropdown.Item className='item' name='bank' onClick={handleClick}>FUND ACCOUNT</Dropdown.Item>
                            </DropdownButton>
                        </section>
                            <section className='d-lg-flex justify-content-center mt-4'>
                                <article>
                                    {
                                    (user.profile_status === 1 || user.kyc_status === 1) ?
                                    <section className='mt-3 ml-5 d-lg-none'>
                                        <p>Email: {user.email}</p>
                                        <p className='mt-3'>First Name: {user.firstname}</p>
                                        <p className='mt-3'>Last Name: {user.lastname}</p>
                                        <p className='mt-3'>Date Of Birth: {user.dob}</p>
                                        <p className='mt-3'>Mobile Number: {user.mobile}</p>
                                        <p className='mt-3'>Balance In Account: &#x20A6;{user.balance}</p>
                                    </section> :
                                    <section className='ml-5 d-none'>
                                       <img className='svg_imgs' src={profile} alt="svg image indicating profile status not updated" />
                                    </section>        
                                }
                                </article>
                                <Col className='d-none d-lg-flex' lg={6}>
                                {
                                    (user.profile_status === 1 || user.kyc_status === 1) ?
                                    <section className='mt-3'>
                                        <p>Email: {user.email}</p>
                                        <p className='mt-3'>First Name: {user.firstname}</p>
                                        <p className='mt-3'>Last Name: {user.lastname}</p>
                                        <p className='mt-3'>Date Of Birth: {user.dob}</p>
                                        <p className='mt-3'>Mobile Number: {user.mobile}</p>
                                        <p className='mt-3'>Balance In Account: &#x20A6;{user.balance}</p>
                                    </section> :
                                    <section>
                                       <img className='svg_imgs' src={profile} alt="svg image indicating profile status not updated" />
                                    </section>        
                                }
                                </Col>
                                <Col lg={6}>
                                    <section>
                                {
                                            bank && <FundWallet updateProfile={updateProfile}/>
                                }
                                        {fundTransfer && 
                               <article className='width'>
                                <h5 className='ml-lg-3'>Fund Transfer</h5>
                            <p className='header_class ml-lg-3'>Uploading your KYC documents is very essential so as to remove the <br />  limitations in withdrawing funds to your accounts.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Receiver ID</Form.Label>
                            <Form.Control
                                    required
                                    value={users.customer_id}
                                type="text"
                                name="customer_id"
                                onChange={handleRegisterChange}
                                placeholder="Friend's ID"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom02">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                required
                                value={users.amount}
                                type="text"
                                name="amount"
                                onChange={handleRegisterChange}
                                placeholder="1000000000"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustomUsername">
                                            <Form.Label>Pin</Form.Label>
                            <div className="d-flex">
                            <Form.Control
                                type={showPassword}
                                value={users.sender_id}
                                placeholder="Pin"
                                name="sender_id"
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            {
                            point2 &&
                                <span onClick={handleSecShow} className='show_password'>
                                    <p className='m-2'>{!shown ? 'Show' : 'Hide'}</p>
                                </span>
                              }
                            </div>
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                                </Form.Group>
                            <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                                        {getProfile &&
                              <article className='width'>
                                <h5 className='ml-lg-3'>Update Profile</h5>
                            <p className='header_class ml-lg-3'>Please fill the form below to setup your profile information. <br />  Kindly note that your name must match your bank account name.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="firstName"
                                value={users.firstName}
                                onChange={handleRegisterChange}
                                placeholder="First Name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="lastName"
                                value={users.lastName}
                                onChange={handleRegisterChange}
                                placeholder="Last Name"
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustomUsername">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="dob"
                                value={users.dob}
                                onChange={handleRegisterChange}
                                placeholder="11/22/1896"
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please Enter A valid Date Of Birth.
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustomUsername">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MALE/FEMALE"
                                name="gender"
                                value={users.gender}
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                required
                                />
                            <Form.Control.Feedback type="invalid">
                                Gender.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant='success' className='mb-3 mt-3 ml-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                                 </section>   
                                <section>
                                    {kyc && 
                               <article className='width'>
                                <h5 className='ml-lg-3'>KYC Update</h5>
                            <p className='header_class ml-lg-3'>Uploading your KYC documents is very essential so as to remove the <br />  limitations in withdrawing funds to your accounts.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom01">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control
                                required
                                value={users.id_number}
                                type="text"
                                name="id_number"
                                onChange={handleRegisterChange}
                                placeholder="1234xxxxxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom02">
                            <Form.Label className='mr-3'>ID Type</Form.Label>
                            <Form.Select className='select' aria-label="Defaselect example" onChange={(e) => {
                              setName(e.target.value)        
                            }}>
                              <option>Select Your Idebtity Type</option>
                              <option value='National ID (NIN)'>National ID (NIN)</option>
                              <option value='International Passport'>International Passport</option>
                              <option value="Driver's License">Driver's License</option>
                              <option value="Voter's Card">Voter's Card</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="formFile" className="mb-3 mt-3">
                        <input
                            accept='.jpg'
                            type="file"
                            name="id_url"
                            id=""
                            onChange={(e) => {
                                const file = e.target.files[0]
                                setIdType(file)
                            }}
                        />
                          {/* <Form.Control required name='id_url' onChange={handleRegisterChange} type="file" size="sm"/> */}
                          </Form.Group>
                          <div>
                            {
                            success && <section>
                                {alert && <p className='green'>{success}</p> }
                            </section>
                            }
                        <Button variant='success' className='mb-3 mt-3 ml-3' type="submit">Submit</Button>
                          </div>

                        </Form>
                            </article>
                            }   
                                </section>     
                            {password &&  
                               <article className='width'>
                                    <h5 className='ml-lg-3'>Update Password</h5>
                                    <p className='header_class ml-lg-3'>Uploading your KYC documents is very essential so as to remove the <br />  limitations in withdrawing funds to your accounts.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                                            <Form.Label>New Password</Form.Label>
                            <div className="d-flex">
                            <Form.Control
                                required
                                value={users.password}
                                type={showPassword1}
                                name="password"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            {
                            point1 &&
                            <span onClick={handleShow} className='show_password'>
                                <p className='m-2'>{!shown1 ? 'Show' : 'Hide'}</p> 
                            </span>
                              }   
                            </div>

                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom01">
                            <Form.Label>Verify Password</Form.Label>
                            <div className="d-flex">
                            <Form.Control
                                required
                                value={users.password2}
                                type={showPassword}
                                name="password2"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            {
                            point2 &&
                            <span onClick={handleSecShow} className='show_password'>
                                <p className='m-2'>{!shown ? 'Show' : 'Hide'}</p> 
                            </span>
                              }            
                            </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                                        <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                             {withdrawalPin && 
                               <article className='width'>
                                    <h5 className='ml-lg-3'>WithDrawal Pin</h5>
                                    <p className='header_class ml-lg-3'>Uploading your KYC documents is very essential so as to remove the <br /> limitations in withdrawing funds to your accounts.</p>
                            <p>Set your withdrawal pin</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom01">
                        <Form.Label>Withdrawal Pin</Form.Label>
                        <div className='d-flex'>
                            <Form.Control
                                required
                                value={users.pin}
                                type={showPassword1}
                                name="pin"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                        {
                            point1 &&
                            <span onClick={handleShow} className='show_password'>
                                <p className='m-2'>{!shown1 ? 'Show' : 'Hide'}</p> 
                            </span>
                              }
                        </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" className='mt-3' controlId="validationCustom01">
                                            <Form.Label>Verify Withdrawal Pin Pin</Form.Label>
                            <div className='d-flex'>
                                <Form.Control
                                required
                                value={users.pin2}
                                type={showPassword}
                                name="pin2"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                                />
                                {
                                  point2 &&
                                <span onClick={handleSecShow} className='show_password'>
                                    <p className='m-2'>{!shown ? 'Show' : 'Hide'}</p>
                                </span>
                              }
                                                
                                            </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                                        <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                            
                                </Col>
                            </section>
                        </section>
                    </Col>
            </Row>
          </Container>

        </main>
    )
}

export default Profile

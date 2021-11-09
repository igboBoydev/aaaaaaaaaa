import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { PaystackButton } from "react-paystack"
import { useGlobalContext } from '../store/context';

const FundWallet = (props) => {
    let { giveAccess, isLoggedIn } = useGlobalContext();
    const [amount, setAmount] = useState(null)
    const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
    const [user, setUser] = useState(null)
    const [show, setShow] = useState(false)
    const get = localStorage.getItem('token')
    const [success, setSuccess] = useState('')
    const [showAlert, setShowAlert] = useState(false)

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

    let reference = new Date().getTime().toString()

    let componentProps;

    if (user) {
        componentProps = {
            email: user.email,
            reference,
            amount: parseInt(amount) * 100,
            metadata: {
                name: `${user.firstname} ${user.lastname}`,
                phone: user.mobile
            },
            publicKey,
            text: "Paystack",
            onSuccess: () => {
                var myHeaders = new Headers();
                myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                myHeaders.append("Authorization", `Bearer ${get}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "reference": `${reference}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:5016/api/v2/auth/fund-wallet", requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                setAmount("")
                props.updateProfile()
                setSuccess('Successfully Credited your account')
            },
            onClose: () => alert("Plase come back soon"),
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success])

    return (
        <section className='width'>
                <span className='span_stack'>Payment using paystack</span>
               <Form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="inputPassword5">Amount:</Form.Label>
                    <Form.Control
                      type="text"
                        name='amount'
                        value={amount}
                        placeholder='Amount'
                      className='input_widths'
                      onChange={handleChange}
                      id="inputPassword5"
                      aria-describedby="passwordHelpBlock"
                    />
                    <div className='d-flex flex-column'>

                        {success && <div className='mt-2'>
                            {showAlert && <p>{success}</p> } 
                        </div> }

                    </div>
                </Form>
                 <PaystackButton className="paystack-button" {...componentProps} />
        </section>
    )
}

export default FundWallet


// 1



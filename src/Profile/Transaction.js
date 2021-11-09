import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import notPaid from '../svg/notPaid.svg'

const Transaction = () => {
    const url = "http://localhost:5016/api/v2/auth/transactions"
    const [arr, setArr] = useState([])
    let history = useHistory()

    const get = localStorage.getItem('token')
    
    useEffect(() => {
        let isCancelled = false
        const fetchData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("signatures", "a0451a967f04a3ac7dc526086749599249a53b3d9e81b71afeb4f3efab8214d5");
            myHeaders.append("Authorization", `Bearer ${get}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                const data = result.success.result.user.filter((items) => {
                    return [items.id, items.balance, items.description, items.status, items.amount]
                })
                setArr(data)
            })
            .catch(error => console.log('error', error))
        }

        fetchData()

        return () => {
            isCancelled = true;
        }

    }, [url])

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/games')
    }


    return (
        <div className='main_sec mt-5'>
            {arr.length ?
            
            <section className='bets_history_section d-flex flex-wrap'>
                {arr.map((a) => {
                    return (
                          <TransactionHistory key={a.id} {...a} />
                    )
                })}
                </section>
                :
                <section className='bet_header_section d-flex justify-content-center align-items-center flex-column mt-3'>
                    <img className='svg_img' src={notPaid} alt="" />
                    <h1 className='bet_header'>You are yet to perform a financial transaction on this platform... </h1>
                </section>
            }
            <Button size='sm' onClick={handleClick} className='ml-1 ml-lg-5 mt-2 mb-2' variant='primary'>Play Game</Button>
        </div>
    )
}

const TransactionHistory = ({balance, description, status, amount}) => {
    return (
        <main className='ml-lg-5 sec_width'>
            <section className='betHistory_section ml-lg-4'>
            <p className='p_bets'>Description: <span className='bets_span'>{description}</span></p>
            <p className='p_bets'>Amount: <span className='bets_span'>&#x20A6;{amount}</span></p>
            <p className='p_bets'>Status: <span className='bets_span'>{status}</span></p>
            <p className='p_bets'>Balance: <span className='bets_span'>&#x20A6;{balance}</span></p>
            </section>
        </main>
        
   )
}

export default Transaction

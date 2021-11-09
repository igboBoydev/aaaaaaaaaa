import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import noBet from '../svg/notBet.svg'

const Bets = () => {
    const [arr, setArr] = useState([])
    const url = "http://localhost:5016/api/v2/auth/betting-list"
    let history = useHistory()
    
    useEffect(() => {

        let isCancelled = false
        const get = localStorage.getItem('token')

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
                    const data = result.success.result.user.filter((bets) => {
                            return [ bets.id, bets.bet_id, bets.kind, bets.status, bets.amount, bets.odd, bets.possibleWinning, bets.staked, bets.stakes, bets.stakes1, bets.stakes2, bets.date ]       
                    })
                     setArr(data)
                })
                .catch(error => console.log('error', error));
        }

        fetchData()

        return () => {
            isCancelled = true
        }
   
    }, [url])

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/games')
    }

    return (
        <div>
            {arr.length ?
            
            <section className='bets_history_section d-md-flex flex-md-wrap justify-content-md-center'>
                {arr.map((a) => {
                    return (
                        <BetHistory key={a.id} {...a} />
                    )
                })}
                </section>
                :
                <section className='bet_header_section d-flex justify-content-center align-items-center flex-column'>
                    <img className='svg_img' src={noBet} alt="" />
                    <h1 className='bet_header'>Please Place a bet and try again... </h1>
                </section>
            }
            <Button size='sm' onClick={handleClick} className='bets_btn' variant='primary'>Play Game</Button>
        </div>
    )
}

const BetHistory = ({ amount, bet_id, type, odd, kind, status, possibleWinning, staked, stakes, stakes1, stakes2, date }) => {

    console.log(date)
    let dates = new Date(date)
    let playTime = dates.toString().slice(0, 24)
    
    return (
        <main className=' ml-md-4 ml-lg-5 main_sec'>
            <section className='betHistory_section ml-lg-4'>
            <p className='p_bets'>Game Type: <span className='bets_span'>{type}</span></p>
            {kind && <p className='p_bets'>Soft Lotto: <span className='bets_span'>{kind}</span></p>}
            <p className='p_bets'>Game Time: <span className='bets_span'>{playTime}</span></p>
            <p className='p_bets'>Game ID: <span className='bets_span'>{bet_id}</span></p>
            <p className='p_bets'>Odd: <span className='bets_span'>{odd}</span></p>
            <p className='p_bets'>Possible Winning: <span className='bets_span'>&#x20A6;{possibleWinning}</span></p>
            <p className='p_bets'>Stake Amount: <span className='bets_span'>&#x20A6;{staked}</span></p>
            {stakes && <p className='p_bets'>Numbers: <span className='bets_span'>{stakes}</span></p>}
            {stakes1 && <p className='p_bets'>Against 1: <span className='bets_span'>{stakes1}</span></p>}
            {stakes2 && <p className='p_bets'>Agaisnt 2: <span className='bets_span'>{stakes2}</span></p>}
            <p className='p_bets'>Amount: <span className='bets_span'>&#x20A6;{amount}</span></p>
            <p className='p_bets'>Status: <span className='bets_span'>{status}</span></p>
            </section>
        </main>
        
   )
}

export default Bets

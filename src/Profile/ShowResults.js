import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const ShowResults = () => {
    const [arr, setArr] = useState([])
    const history = useHistory()
    const url = "http://localhost:5016/api/v1/gameresults"
    useEffect(() => {

        let isCancelled = false
        const get = localStorage.getItem('token')
        const fetchData = async () => {

            var myHeaders = new Headers();
            myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
            myHeaders.append("Authorization", `Bearer ${get}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const data = result.showGames.filter((games) => {
                        return [ games.createAt, games.name, games.odds ]
                    })
                    setArr(data)
                })
                .catch(error => console.log('error', error));
        }

        fetchData()

        return () => {
            isCancelled = true
        }

    }, [url]);
        

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/games')
    }



    return (
        <Container>
           <div className='mt-4 mb-4'>
            {arr.map((a) => {
                const { name, odds, dates } = a;
                let date = new Date(dates)
                let playtime = date.toString().slice(0, 24)
                return (
                    <section key={a.id} className='d-flex justify-content-center mb-2 result_border'>
                        <p className='mr-4'>Game Type: {name}</p>
                        <span className='green mr-4'>/</span>
                        <p className='mr-4'>Numbers: {odds}</p>
                        <span className='green mr-4'>/</span>
                        <p className='mr-4'>Date: {playtime}</p>
                   </section>
               )
           })}
            </div>
            <Button className='mb-2' onClick={handleClick} variant='outline-primary'>Play Game</Button>
        </Container>
        
    )
}

export default ShowResults
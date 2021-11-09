import React from 'react'
import pageNotFound from '../svg/pageNotFound.svg'
import {Button} from 'react-bootstrap'
import { useHistory } from 'react-router'

const Error = () => {
    let history = useHistory()
    
    const handleClick = (e) => {
        e.preventDefault()
        history.push('/games')
    }
    return (
        <div>
            <section className='bet_header_section d-flex justify-content-center align-items-center flex-column mt-3'>
            <img className='svg_img' src={pageNotFound} alt="" />
            <Button size='sm' onClick={handleClick} className='ml-5 mt-2 mb-2' variant='primary'>Play Game</Button>
            </section>
        </div>
    )
}

export default Error

import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from './pages/Sidebar'
import MaxAmount from './pages/MaxAmount';
import PostResult from './pages/PostResult'
import SoftLottoOdds from './pages/SoftLottoOdds'
import LottoExpress from './pages/LottoExpressOdds';

const Result = () => {
    const [max, setMax] = useState(true)
    const [result, setResult] = useState(false)
    const [lotto, setLotto] = useState(false)
    const [soft, setSoft] = useState(false)


    return (
        <Container className='d-flex' fluid>
            <Row>
                <Col md={4}>
                    <Sidebar result={setResult} lotto={setLotto} max={setMax} soft={setSoft} />
                </Col>
                <Col md={8}>
                    {max && <MaxAmount />}
                    {result && <PostResult />}
                    {lotto && <LottoExpress />}
                    {soft && <SoftLottoOdds />}
                </Col>
           </Row>
        </Container>
    )
}

export default Result

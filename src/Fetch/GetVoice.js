import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import login from '../svg/login.svg'


function MyVerticallyCenteredModal(props) {
    let { days, game } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [show, setShow] = useState(true)
    const [daysShow, setDaysShow] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [gameShow, setGameShow] = useState({ name: '', start: '', end: '', id: '' })
    const [clicked, setClicked] = useState(false)
    const history = useHistory()


    if (gameShow.name && gameShow.start && gameShow.end && gameShow.id) {
        props.click(true)
        props.showGames.name = gameShow.name
        props.showGames.start = gameShow.start
        props.showGames.end = gameShow.end
        props.showGames.id = gameShow.id
    }

    const handleCategory = (e, i) => {
        e.preventDefault()

        setShow((state) => {
            return {
                ...state,
                [i]: !state[i],
            };
        });

        if (show) {
            setDaysShow(e.target.textContent)
        } else {
            setDaysShow('')
        }
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
          <h6 className=''>Weekly Game Draws</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <main className='days scrollContent'>
                  {days.map((day, i) => {
                      return (
                      <section className='category'>
                          <div className='game_flex' key={i} onClick={(e) => handleCategory(e, i)}>
                              <span className='span1'>{day}</span>
                              {!show[i] && <span className='span'>+</span>}
                              {show[i] && <span className='span'>-</span>}
                          </div>
                          {
                              show[i] &&
                              <div className=''>
                                  {game.map((gam) => {
                                      if (daysShow.includes(gam.day.charAt(0).toUpperCase() + gam.day.slice(1))) {
                                          return <p onClick={(e) => {
                                              e.preventDefault()
                                              setClicked(true)
                                              props.setModalShow(false)
                                              setGameShow({ ...gameShow, name: gam.name, start: gam.startTime, end: gam.endTime, id: gam.uuid })
                                          }}
                                              className='types'>{gam.name}</p>
                                      }
                                  })}
                              </div>
                          }
                      </section>
                  )
                  })}
                        
                </main>
      </Modal.Body>
      <Modal.Footer className='modal_footer'>
        <p className='modal_p'>Click on a particular day to see games available for that day.</p>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
    const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        setGameShow={props.setGameShow}
        showGames={props.gameShow}
        click={props.clicked}
      />
    </>
  );
}

export default App
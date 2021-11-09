import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay, faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faHome, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'


const Footer = () => {

    let getYear = new Date().getFullYear()
    
    return (
        <footer className="text-center text-lg-start bg-dark text-muted">
  <section
    class="d-md-flex justify-content-center flex-row justify-content-lg-between p-4 border-bottom"
  >
    <div className="ml-5 mr-5  d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
                <div>
                    <div>
                    <Link to='https://www.facebook.com'>
        <FontAwesomeIcon className='' size-mode='2x' icon={faFacebook} />
    </Link>
    <Link to='https://www.twitter.com'>
        <FontAwesomeIcon className='ml-5 mr-5' size-md='2x' icon={faTwitter} />
    </Link>
    <Link to='https://www.instagram.com'>
        <FontAwesomeIcon className='mr-5' size-md='2x' icon={faInstagram} />
    </Link>
    <Link to='https://www.youtube.com'>
        <FontAwesomeIcon className=' '  size-md='2x' icon={faYoutube} />
    </Link>
                    </div>
   
      
    </div>
  </section>
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mt-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i><img src="assets/brand/GrandLotto.svg" /></i>
          </h6>
          <p>
            Instant Payment, No Story!
          </p>
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#" className="text-center text-reset">FirstBet</a>
          </p>
          <p>
            <a href="#!" className="text-reset">QuickMoney</a>
          </p>
          
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#" className="text-reset">How To Bet</a>
          </p>
          <p>
            <a href="#" className="text-reset">Agency Operator</a>
          </p>
          <p>
            <a href="#" className="text-reset">FAQs</a>
          </p>
         
        </div>
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <div className='col-md-12 mx-auto mb-md-0 mb-4'>
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                
    <Link to=''>
        <p className='text-muted'><FontAwesomeIcon className='mr-3' size-mode='2x' icon={faPhone} />   + 234 234 567 88</p>
    </Link>
    <Link to=''>
        <p className='text-muted'><FontAwesomeIcon className='ml-5 mr-3' size-md='2x' icon={faHome} />Lagos</p>
    </Link>
    <Link to=''>
        <p className='text-muted'> <FontAwesomeIcon className='mr-3' size-md='2x' icon={faEnvelope} /> info@grandlotto.com</p>
    </Link>
    <Link to=''>
        <p className='text-muted'><FontAwesomeIcon className='mr-3' size-md='2x' icon={faPrint} />+ 234 234 567 89</p>
    </Link>
                            </div>
                            
        </div>
      </div>
    </div>
  </section>
  <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    © {getYear}
    <a className="text-reset fw-bold" href="/"> GrandLotto</a>
  </div>
</footer>
    )
}

export default Footer

import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ball from '../static/assets/raffle-5870552_640.jpg'
import roles from '../static/assets/balls-6077901_640.jpg'
import img1 from '../static/assets/1.png'
import img2 from '../static/assets/3.png'
import img3 from '../static/assets/softLotto.jpeg'
import img4 from '../static/assets/Original.jpeg'
import img5 from '../static/assets/6.png'
import img6 from '../static/assets/img3.jpg'
import moment from 'moment'
import GrandLotto from '../svg/GrandLotto.svg'
const url = "http://localhost:5016/api/v1/gameresults"

const Home = () => {
  const [timer, setTimer] = useState(null)
  const [arr, setArr] = useState([])
  let history = useHistory()

  const handleClick = (e) => {
    history.push('/games')
  }

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
            return [games.createAt, games.name, games.odds]
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

     
   let nums = []

    for (let i = 1; i < 91; i++) {
      nums.push(i)
    }

      useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 1000)

        return () => clearInterval(timeInterval)
    })


  return (
    <main>
  <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div className="container">
          <div className="carousel-caption ">
            <h1 className="fred">₦190.79 Billion</h1>
            <p>Our Next Draw Will Take Place Soon.</p>
            <p><a className="btn btn-primary rounded-pill btnfancy" href="#">Play Now</a></p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div className="container">
          <div className="carousel-caption">
            <h1 className="fred">₦200.79 Million</h1>
            <p>Our Next Draw Will Take Place Soon.</p>
            <p><a className="btn rounded-pill btnfancy btn-primary" href="#">Play Now</a></p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div className="container">
          <div className="carousel-caption">
            <h1 className="fred">₦500.79 Million</h1>
            <p>Our Next Draw Will Take Place Soon.</p>
            <p><a className="btn rounded-pill btnfancy btn-primary" href="#">Play Now</a></p>
          </div>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>


  <div class="container marketing">
    
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Games</button>
        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Popular</button>
        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Coming Soon</button>
      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <section className="pt-5 fred2">
          <div className="container">
              <div className="row">
                  <div className="col-6 ml-2 ml-lg-0">
                      <h5 className="mb-3 fred">All Games </h5>
                  </div>
                  <div className="col-6 text-right">
                      <a className="btn btn-secondary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                        <i className="fa fa-arrow-left"></i>
                      </a>
                      <a className="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                        <i className="fa fa-arrow-right"></i>
                      </a>
                  </div>
                  <div className="col-12">
                      <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
      
                          <div className="carousel-inner">
                              <div className="carousel-item fred2 active">
                                  <div className="row">      
                                      <div className="col-md-3">
                                          <div className="card divfred">
                                              <div className="row txt">
                                                <div className="col-md-4 mt-2">
                                                  <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                                </div>
                                                <div className="col-md-8 text-start pt-2">
                                                  <h4 className='h4_type'>AKWA IBOM</h4>
                                                  <h2 className="fredtwo">₦50,000</h2>
                                                </div>

                                              </div>
                                              <div className="card-body metwo">
                                                <div className="row">
                                                  <div className="col-md-8">
                                                    <strong>1 day 12 hours</strong>
                                                    
                                                  </div>
                                                  <div className="col-md-4">
                                                    <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                  </div>
                                                </div>                        
                                              </div>
      
                                          </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred2">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>SUCCESS</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred3">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>EMBASSY</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred4">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GRANDMASTER</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>      
                                  </div>
                              </div>
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>RAMBO</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>DANSAKI</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>MEGA 77</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>TROPHY</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div class="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>  
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" class="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GOLD</h4>
                                                <h2 className="fredtwo">₦50,0000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL VAG</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL CHANCE</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>METRO</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>                          
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <section className="pt-5 fred2">
          <div className="container">
              <div className="row">
                  <div className="col-6 ml-2 ml-lg-0">
                      <h5 className="mb-3 fred">Popular Games </h5>
                  </div>
                  <div className="col-6 text-right">
                      <a className="btn btn-secondary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                        <i className="fa fa-arrow-left"></i>
                      </a>
                      <a className="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                        <i className="fa fa-arrow-right"></i>
                      </a>
                  </div>
                  <div className="col-12">
                      <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
      
                          <div className="carousel-inner">
                              <div className="carousel-item fred2 active">
                                  <div className="row">      
                                      <div className="col-md-3">
                                          <div className="card divfred">
                                              <div className="row txt">
                                                <div className="col-md-4 mt-2">
                                                  <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                                </div>
                                                <div className="col-md-8 text-start pt-2">
                                                  <h4 className='h4_type'>AKWA IBOM</h4>
                                                  <h2 className="fredtwo">₦50,000</h2>
                                                </div>

                                              </div>
                                              <div className="card-body metwo">
                                                <div className="row">
                                                  <div className="col-md-8">
                                                    <strong>1 day 12 hours</strong>
                                                    
                                                  </div>
                                                  <div className="col-md-4">
                                                    <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                  </div>
                                                </div>                        
                                              </div>
      
                                          </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred2">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>SUCCESS</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred3">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>EMBASSY</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred4">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GRANDMASTER</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>      
                                  </div>
                              </div>
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>RAMBO</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>DANSAKI</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>MEGA 77</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>TROPHY</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div class="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>  
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" class="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GOLD</h4>
                                                <h2 className="fredtwo">₦50,0000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL VAG</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL CHANCE</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>METRO</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>                          
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
        <section className="pt-5 fred2">
          <div className="container">
              <div className="row">
                  <div className="col-6 ml-2 ml-lg-0">
                      <h5 className="mb-3 fred">Coming Soon </h5>
                  </div>
                  <div className="col-6 text-right">
                      <a className="btn btn-secondary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                        <i className="fa fa-arrow-left"></i>
                      </a>
                      <a className="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                        <i className="fa fa-arrow-right"></i>
                      </a>
                  </div>
                  <div className="col-12">
                      <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
      
                          <div className="carousel-inner">
                              <div className="carousel-item fred2 active">
                                  <div className="row">      
                                      <div className="col-md-3">
                                          <div className="card divfred">
                                              <div className="row txt">
                                                <div className="col-md-4 mt-2">
                                                  <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                                </div>
                                                <div className="col-md-8 text-start pt-2">
                                                  <h4 className='h4_type'>AKWA IBOM</h4>
                                                  <h2 className="fredtwo">₦50,000</h2>
                                                </div>

                                              </div>
                                              <div className="card-body metwo">
                                                <div className="row">
                                                  <div className="col-md-8">
                                                    <strong>1 day 12 hours</strong>
                                                    
                                                  </div>
                                                  <div className="col-md-4">
                                                    <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                  </div>
                                                </div>                        
                                              </div>
      
                                          </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred2">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>SUCCESS</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred3">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>EMBASSY</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="card divfred4">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GRANDMASTER</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button class="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                      </div>      
                                  </div>
                              </div>
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>RAMBO</h4>
                                                <h2 className="fredtwo">₦50,000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>DANSAKI</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>MEGA 77</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>TROPHY</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div class="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>  
                              <div className="carousel-item fred2">
                                <div className="row">      
                                    <div className="col-md-3">
                                        <div className="card divfred">
                                            <div className="row txt">
                                              <div className="col-md-4 mt-2">
                                                <img src="assets/brand/icon.png" class="" width="100px" height="100px"/>
                                              </div>
                                              <div className="col-md-8 text-start pt-2">
                                                <h4 className='h4_type'>GOLD</h4>
                                                <h2 className="fredtwo">₦50,0000</h2>
                                              </div>

                                            </div>
                                            <div className="card-body metwo">
                                              <div className="row">
                                                <div className="col-md-8">
                                                  <strong>1 day 12 hours</strong>
                                                  
                                                </div>
                                                <div className="col-md-4">
                                                  <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                                </div>
                                              </div>                                                                                             
    
                                            </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred2">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL VAG</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred3">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>ROYAL CHANCE</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="card divfred4">
                                          <div className="row txt">
                                            <div className="col-md-4 mt-2">
                                              <img src="assets/brand/icon.png" className="" width="100px" height="100px"/>
                                            </div>
                                            <div className="col-md-8 text-start pt-2">
                                              <h4 className='h4_type'>METRO</h4>
                                              <h2 className="fredtwo">₦50,0000</h2>
                                            </div>

                                          </div>
                                          <div className="card-body metwo">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <strong>1 day 12 hours</strong>
                                                
                                              </div>
                                              <div className="col-md-4">
                                                <a href="play.html"><button className="btn btn-primary butfred rounded-pill">₦1,200</button></a>
                                              </div>
                                            </div>                                                                                             
  
                                          </div>
  
                                      </div>
                                    </div>      
                                </div>
                              </div>                          
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
    </div>
<div className="row">
  <section className="pb-5">
    <div className="container">
        <div className="row ml-5 ml-lg-0 mb-2 mb-lg-0">
            <div className="col-6 d-flex justify-between">
                <h5 className="mb-3 fred">Most Played Games </h5>
            </div>
            <div class="col-md-6 text-end"><small class="text-end"><a href="#">View All</a></small></div>
        </div>
        <div className="row ml-5 ml-lg-4">
          <div className="col-md-3 ml-5 ml-lg-0 text-center">
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: '18rem'}}>
              <div className="card-header"><img width="120px" height="120px" src="assets/brand/icon2.png" /></div>
              <div className="card-body">
                <h5 className="card-title fred">World Record Jackpot</h5>
                <p className="card-text">  128,000,000   </p>
                <a href="/games"><button className="btn btn-primary">Play Now!</button></a>
              </div>
            </div>
          </div>
          <div class="col-md-3  ml-5 ml-lg-0 text-center">
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: '18rem'}}>
              <div className="card-header"><img width="120px" height="120px" src="assets/brand/icon2.png" /></div>
              <div className="card-body">
                <h5 className="card-title fred">World Record Jackpot</h5>
                <p className="card-text">  128,000,000   </p>
                <a href="/games"><button className="btn btn-primary">Play Now!</button></a>              </div>
            </div>
          </div>
          <div className="col-md-3 ml-5 ml-lg-0 text-center">
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: '18rem'}}>
              <div className="card-header"><img width="120px" height="120px" src="assets/brand/icon2.png" /></div>
              <div className="card-body">
                <h5 className="card-title fred">World Record Jackpot</h5>
                <p className="card-text">  128,000,000   </p>
                <a href="/games"><button className="btn btn-primary">Play Now!</button></a>              </div>
            </div>
          </div>
          <div className="col-md-3 ml-5 ml-lg-0 text-center">
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: '18rem'}}>
              <div className="card-header"><img width="120px" height="120px" src="assets/brand/icon2.png" /></div>
              <div className="card-body">
                <h5 className="card-title fred">World Record Jackpot</h5>
                <p className="card-text">  128,000,000   </p>
                <a href="/games"><button className="btn btn-primary">Play Now!</button></a>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  </section>
</div>

<div className="row">
  <section className="pb-5">
    <div className="container">
        <div className="row ml-lg-4">
            <div className="">
                <h5 className="mb-3 fred">Lotto Results </h5>                                
            </div>
            <div className="col-md-6 text-end"><small class="text-end"><a href="#">View All</a></small></div>
        </div>
              <div className="row ml-lg-4">
            {arr.slice(0, 4).map((a) => {
              const { name, odds, dates } = a;
                let date = new Date(dates)
                let playtime = date.toString().slice(0, 24)
                return (
                  <div className="card col-md-3 ml-5 mr-lg-3 ml-lg-0 boxresult" style={{ maxWidth: '16rem' }}>
                    <strong className="clearfix">{name}</strong>
                    <button className="btn btn-primary ball">{odds}</button>
                    <p className='mr-4'>Date: {playtime}</p>
                    <a href="#">check result</a><br/>
                    <a href="#">Mega million statistics</a>
          </div>
               )
           })}
        </div>
    </div>
  </section>
</div>

<div className="row">
  <section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h5 className="mb-3 fred">Lotto News </h5>
            </div>
        </div>
        <div className="card-group">
          <div className="card">
            <img src="assets/brand/dm.jpg" class="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">News title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget feugiat est. Maecenas gravida sollicitudin imperdiet.</p>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-8">
                  <small className="text-muted">Last updated 3 mins ago</small> 
                </div>
                <div className="col-md-4 text-end">
                  <small>read more...</small>

                </div>
              </div>
              
            </div>
          </div>
          <div className="card">
            <img src="assets/brand/dm.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">News title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget feugiat est. Maecenas gravida sollicitudin imperdiet.</p>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-8">
                  <small className="text-muted">Last updated 3 mins ago</small> 
                </div>
                <div className="col-md-4 text-end">
                  <small>read more...</small>

                </div>
              </div>
              
            </div>
          </div>
          <div className="card">
            <img src="assets/brand/dm.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">News title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget feugiat est. Maecenas gravida sollicitudin imperdiet.</p>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-8">
                  <small className="text-muted">Last updated 3 mins ago</small> 
                </div>
                <div className="col-md-4 text-end">
                  <small>read more...</small>

                </div>
              </div>
              
            </div>
          </div>          
        </div>
    </div>
  </section>
</div>

      </div>
      </main>
    )
};

export default Home


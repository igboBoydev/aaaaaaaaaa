import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay, faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import GetWhatsapp from '../Fetch/GetWhatsapp'
import play from '../svg/play.svg'
import { RiBankLine, RiHome2Line, RiSdCardMiniLine, RiUserAddLine } from 'react-icons/ri';
import { IoIosFootball, IoMdHelpCircleOutline } from 'react-icons/io';
import { IoOptionsOutline } from "react-icons/io5";
import IntegrationNotistack from '../Fetch/IntegrationNotistack';

let date = new Date().getHours(0, 0, 0, 0);

const LottoExpress = () => {
    const [hideButton, setHideButton] = useState(false)
    const [activeNums, setActiveNums] = useState(false)
    const [value, setValue] = useState(0);
    const [showAlert, setShowAlert] = useState(false)
    const [number, setNumber] = useState(0)
    const history = useHistory()
    const { logedIn } = useGlobalContext();
    const [showAll, setShowAll] = useState([])
    let [array, setArray] = useState([])
    let [day, setDay] = useState(date)
    let [gameType, setGameType] = useState('NAP 1')
    const [betSlip, setBetSlip] = useState([])
    let [arr, setArr] = useState([])
    const [getBet, setGetBet] = useState(false)
    const [success, setSuccess] = useState('')
    const [geteNums, setGetNums] = useState(false)
    const [timer, setTimer] = useState(moment().format('LTS'))
    const [showModal, setShowModal] = useState(false)
    const [expressMax, setExpressMax] = useState(null)
    const [subValue, setSubValue] = useState(0)
    const [showGameModal, setShowGameModal] = useState(false)
    var [count, setCount] = useState(0)
    const [how, setHow] = useState(true)
    const [slip, setSlip] = useState(false)

    let nums = []

    for (let i = 1; i < 91; i++) {
        nums.push(i)
    }

    const get = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("signatures", "95631547ca07a9ca16e1116e577199003e96bf55fb110b3ccbc9ed1c1b2092e8");
        myHeaders.append("Authorization", `Bearer ${get}`);
        myHeaders.append("Content-Type", "application/json");

        const val = betSlip.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);

        if (val > 100000) {
            setSuccess(`Please kindly Note that you cannot place bet more than 10000 naira`)
            return;
        }else if (val < 1) {
            setSuccess(`Kindly add an amount`)
            return;
        } else {
            betSlip.filter((a, i) => {
            const { amount, amounts, stakeList } = a;
                if (amount < 1) {
                    setSuccess(`cannot place bet for ticket number ${i} please add an amount`)
                    return;
                } else {
                    var raw = JSON.stringify({
                "stakes": [
                    {
                        "value": `${amount}`,
                        "numbers": `${stakeList}`
                    }
                ]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5016/api/v1/placeLottoExpressStake", requestOptions)
                .then(response => response.json())
                .then(result => {
                    let show = result.result.map((res) => res)
                    const { type, odd, staked, date, possibleWinning, stakes, amount } = show[0]
                    let response = stakes.toString()
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                    myHeaders.append("Authorization", `Bearer ${get}`);
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "amount": `${amount * stakes.length}`,
                        "type": `${type}`,
                        "odd": `${odd}`,
                        "possibleWinning": `${possibleWinning}`,
                        "staked": `${staked}`,
                        "stakes": `${response}`,
                        "date": `${date}`
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:5016/api/v2/auth/betHistory", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            const { message } = result.success;
                            setSuccess(message)
                        })
                        .catch(error => console.log('error', error));
                })
                .catch(error => console.log('error', error));
            }
        });
        }

        
        setActiveNums(false)
    }

        useEffect(() => {
        let time = setTimeout(() => {
            setShowAlert(!showAlert)
            setSuccess('')
        }, 3000)

        return () => clearTimeout(time)
        }, [success]);
    
        const factorial = (num)  => {
      if (num === 0 || num === 1) return 1
      for (var i = num - 1; i >= 1; i--) {
        num *= i
      }
      return num
    }

    const perm2 = (n)  => {
      return (n * n - n) / 2
    }

    const perm3 = (n)  => {
      return factorial(n) / factorial(n - 3) / 6
    }

    const perm4 = (n)  => {
      return factorial(n) / factorial(n - 4) / 24
    }

    const perm5 = (n)  => {
      return factorial(n) / factorial(n - 5) / 120
    }


    const createSlip = () => {
        if (array.length > 0) {
            var n = array.length
        }
      var lines
      if (gameType == 'PERM 2' || gameType == 'NAP 2') {
        lines = perm2(n)
      } else if (gameType == 'PERM 3') {
        lines = perm3(n)
      } else if (gameType == 'PERM 4') {
        lines = perm4(n)
      } else if (gameType == 'PERM 5') {
        lines = perm5(n)
      } else if (gameType === '1 BANKER'){
        lines = 89
      } else if (gameType === 'AGAINST') {
        const first_against = array.slice(0, array.indexOf(0))
          const second_against = array.slice(array.indexOf(0) + 1, array[array.length - 1])
          lines = first_against.length * second_against.length
       }
      else {
          lines = 1
        }

        if (gameType === 'AGAINST') {
            let data = {
                id: new Date().getTime().toString(),
                lines: lines,
                type: gameType,
                stakeList: array.slice(0, array.indexOf(0)),
                stakeList2:  array.slice(array.indexOf(0) + 1, array[array.length - 1]),
                amount: 0 || subValue * lines,
                amounts: subValue
            }
            betSlip.push(data)
            calculateTotalStake();
            setArr([]);
        } else {
            let data = {
                id: new Date().getTime().toString(),
                lines: lines,
                type: gameType,
                stakeList: array,
                amount: 0 || subValue * lines,
                amounts: subValue
            }
            betSlip.push(data)
            calculateTotalStake();
            setArr([]);
        }
    }

    const calculateTotalStake = () => {
        setValue(0)
        const val = betSlip.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);
        setNumber(val)
        setCount(betSlip.length)
    }
    // http://www.v2nmobile.com/api/httpsms.php?u=${email}&p=${pass}&m=${'abelkelly}&r=${09047597017}&s=${senderID}&t=1`

    const calculateTotalStake1 = (newItem) => {
        setValue(0)
        const val = newItem.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);
        setNumber(val)
    }

    const handleBet = (e) => {
        e.preventDefault()
        setActiveNums(false)
        setGetNums(false)
        if (array.length < 1) {
            setSuccess('Please Select numbers to play')
            return;
        }else{
            if (gameType === 'NAP 1') {
            if (array.length < 1) {
                return;
            } else if (array.length > 1 && array.length < 3) {
                gameType = 'NAP 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to NAP 2 because the numbers picked are greater than 1; kindly choose a single number only for NAP 1 and proceed or continue with the NAP 2 game type')
                createSlip()
            } else if (array.length > 2) {
                gameType = 'PERM 2'
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            }
            else {
                createSlip()
            }
        }
        else if (gameType === 'NAP 2') {
            if (array.length < 2) {
                setSuccess('Please select atleast 2 numbers')
                return;
            } else if (array.length > 2) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'NAP 3') {
            if (array.length < 3) {
                setSuccess('Please select atleast 3 numbers')
                return;
            } else if (array.length > 3) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 3; kindly choose 3 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'NAP 4') {
            if (array.length < 4) {
                setSuccess('Please select atleast 4 numbers')
                return;
            } else if (array.length > 4) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 4; kindly choose 4 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'NAP 5') {
            if (array.length < 5) {
                setSuccess('Please select atleast 5 numbers')
                return;
            } else if (array.length > 5) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 5; kindly choose 5 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'PERM 2') {
            if (array.length < 3) {
                setSuccess('Please Select atleast 3 numbers')
                return
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'PERM 3') {
            if (array.length < 4) {
                setSuccess('Please Select atleast 4 numbers')
                return;
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'PERM 4') {
            if (array.length < 5) {
                setSuccess('Please Select atleast 5 numbers')
                return;
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === 'PERM 5') {
            if (array.length < 6) {
                setSuccess('Please Select atleast 6 numbers')
                return;
            } else if (array.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
            }
        } else if (gameType === '1 BANKER') {
            if (!array.length) {
                setSuccess('Please Select a single number')
                return
            }
            let y = array[array.length - 1]
            array = y
            createSlip()
        } else if (gameType === 'AGAINST') {
            let max = 10
            let min = 1
            const first_against = array.slice(0, array.indexOf(0))
            const second_against = array.slice(array.indexOf(0) + 1, arr[arr.length - 1])
            if ((first_against.length === 0 || second_against.length === 0)) {
                setSuccess('please choose numbers')
                return;
            } else if (first_against.length === min && second_against.length === min) {
                setSuccess('please choose atleast one 1 number for either side of the games and more than one number for the other side')
                return;
            } else if (first_against.length > max || second_against.length > max) {
                setSuccess('please choose atmost 10 numbers for either of the against games')
                return;
            } else {
                createSlip()
            }
        } else {
            createSlip()
        }
        }
    }

    
    // const handleBetSubmit = (e) => {
    //     e.preventDefault()
    //     if (array.length < 5) {
    //         setError('Please Choose numbers to play')
    //         return;
    //     } else if (amount < 50) {
    //         setError('Please add an amount from 50 naira')
    //         return;
    //     } else {
    //         setShow(true)
    //         const newItem = { id: new Date().getTime().toString(), value: amount, numbers: numbers }
    //         setCount(count += 1)
    //         setArr([...arr, newItem])
    //     }

    // }


    const removeItem = (id) => {
        let newItem = betSlip.filter((item) => item.id !== id)
        if (newItem.length < 1) {
            setBetSlip([])
            setHow(true)
            setSlip(false)
            setCount(0)
            setShowGameModal(false)
            setNumber(0)
        } else {
            setBetSlip(newItem)
            setCount(count -= 1)
            // console.log(betSlip)
            calculateTotalStake1(newItem)
        }
        // setBetSlip(newItem)
    }

    const Completionist = ({setDay}) => {
        // setDay(Date.now())
        return <p>Games Drawn</p>
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('time')
        if (loggedInUser ) {
            const foundTime = JSON.parse(loggedInUser)
            setDay(foundTime)
        }
    }, [])

    useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 500)

        return () => clearInterval(timeInterval)
    })

    const handleClass = (i) => {
        setActiveNums((state) => {
            return {
                ...state,
                [i]: !state[i],
            };
        });

        if (array.includes(i)) {
            const index = array.indexOf(i)
            if (index > -1) {
                array.splice(index, 1)
            }
        } else {
            if (array.length < 10) {
                array.push(i)
            } else {
                setGetNums((state) => {
                    return {
                        ...state,
                        [i]: !state[i],
                    };
                });
            }
        }
        
    }

        useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/gamemaxamount", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.showMax.map((value) => {
                    if (value.type === 'Lotto Express') {
                        setExpressMax(value.value)
                    } else {
                        return;
                    }
                })
            })
            .catch(error => console.log('error', error));
        
        }, [])
    
    const handleInputChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setValue(value)
    }

    const handleAgainst = (e) => {
        e.preventDefault()
        array.push(0)
        setActiveNums(false)
        setHideButton(true)
    }


    useEffect(() => {
        if (window.innerWidth > 770) {
            setShowGameModal(false)
        }
    }, [])

    const handleInputSubmit = (e, data) => {
        e.preventDefault()
        setSubValue(value)
        data.amount = value * data.lines;
        data.amounts = parseInt(value)
        setValue(0)
        calculateTotalStake()
    }

    const handleChange = (e) => {
        e.preventDefault()
        setGetNums(false)
        setArr([])
        setActiveNums(false)
        let value = e.target.value;
        if (value === 'AGAINST') {
            setHideButton(false)
        }
        setGameType(value)
    }
  
    
    
    const handleRandom = e => {
        e.preventDefault()
        if (gameType === 'NAP 1' || gameType === '1 BANKER') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                setArray([num])
                setGetNums(true);
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                setArray([number])
                setGetNums(true);
            }
        } else if (gameType === 'NAP 2') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                let num1 = generateRandom(90, showAll);
                let num2 = generateRandom(90, showAll);
                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                ar = [num, num1]
                let a = new Set(ar)
                let b = [...a]
                if (b.length !== 2) {
                    b.push(num2)
                    setArray(b)
                    setGetNums(true);
                } else {
                    setArray(b)
                    setGetNums(true);
                }
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                const number1 = Math.floor(Math.random() * 90) + 1
                const number2 = Math.floor(Math.random() * 90) + 1
                ar = [number, number1]
                let a = new Set(ar)
                let b = [...a]
                if (b.length !== 2) {
                    b.push(number2)
                    setArray(b)
                    setGetNums(true);
                } else {
                    setArray(b)
                    setGetNums(true);
                }
            }
        } else if (gameType === 'NAP 3') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                let num1 = generateRandom(90, showAll);
                let num2 = generateRandom(90, showAll);
                let num3 = generateRandom(90, showAll);
                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                ar = [num, num1, num2]
                let a = new Set(ar)
                let b = [...a]
                if (b.length !== 3) {
                    b.push(num3)
                    setArray(b)
                    setGetNums(true);
                } else {
                    setArray(b)
                    setGetNums(true);
                }
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                const number1 = Math.floor(Math.random() * 90) + 1
                const number2 = Math.floor(Math.random() * 90) + 1
                const number3 = Math.floor(Math.random() * 90) + 1
                ar = [number, number1, number2]
                let a = new Set(ar)
                let b = [...a]
                if (b.length !== 3) {
                    b.push(number3)
                    setArray(b)
                    setGetNums(true);
                } else {
                    setArray(b)
                    setGetNums(true);
                }
            }
        } else if (gameType === 'NAP 4') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                let num1 = generateRandom(90, showAll);
                let num2 = generateRandom(90, showAll);
                let num3 = generateRandom(90, showAll);
                let num4 = generateRandom(90, showAll);

                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                ar = [num, num1, num2, num3]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 4) {
                    a.push(num4)
                    setArray(a)
                    setGetNums(true);
                } else {
                    setArray(a)
                    setGetNums(true);
                }
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                const number1 = Math.floor(Math.random() * 90) + 1
                const number2 = Math.floor(Math.random() * 90) + 1
                const number3 = Math.floor(Math.random() * 90) + 1
                const number4 = Math.floor(Math.random() * 90) + 1
                ar = [number, number1, number2, number3]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 4) {
                    a.push(number4)
                    setArray(a)
                    setGetNums(true);
                } else {
                    setArray(a)
                    setGetNums(true);
                }
            }
        } else if (gameType === 'NAP 5') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                let num1 = generateRandom(90, showAll);
                let num2 = generateRandom(90, showAll);
                let num3 = generateRandom(90, showAll);
                let num4 = generateRandom(90, showAll);
                let num5 = generateRandom(90, showAll);

                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                ar = [num, num1, num2, num3, num4]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 5) {
                    a.push(num5)
                    setArray(a)
                    setGetNums(true);
                } else {
                    setArray(a)
                    setGetNums(true);
                }
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                const number1 = Math.floor(Math.random() * 90) + 1
                const number2 = Math.floor(Math.random() * 90) + 1
                const number3 = Math.floor(Math.random() * 90) + 1
                const number4 = Math.floor(Math.random() * 90) + 1
                const num5 = Math.floor(Math.random() * 90) + 1
                ar = [number, number1, number2, number3, number4]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 5) {
                    a.push(num5)
                    setArray(a)
                    setGetNums(true);
                } else {
                    setArray(a)
                    setGetNums(true);
                }
            }
        } else if (gameType === 'PERM 2' || gameType === 'PERM 3' || gameType === 'PERM 4' || gameType === 'PERM 5') {
            let ar = []
            if (showAll.length > 0) {
                let num = generateRandom(90, showAll);
                let num1 = generateRandom(90, showAll);
                let num2 = generateRandom(90, showAll);
                let num3 = generateRandom(90, showAll);
                let num4 = generateRandom(90, showAll);
                let num5 = generateRandom(90, showAll);
                let num6 = generateRandom(90, showAll);

                function generateRandom(max, except) {
                    const exceptSet = new Set(except);
                    let result;

                    do {
                        result = Math.floor(Math.random() * max) + 1;
                    } while (exceptSet.has(result));

                    return result;
                }
                ar = [num, num1, num2, num3, num4, num5]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 6) {
                    a.push(num6)
                    setArray(a)
                } else {
                    setArray(a)
                }
            } else {
                const number = Math.floor(Math.random() * 90) + 1
                const number1 = Math.floor(Math.random() * 90) + 1
                const number2 = Math.floor(Math.random() * 90) + 1
                const number3 = Math.floor(Math.random() * 90) + 1
                const number4 = Math.floor(Math.random() * 90) + 1
                const num5 = Math.floor(Math.random() * 90) + 1
                const num6 = Math.floor(Math.random() * 90) + 1
                ar = [number, number1, number2, number3, number4, num5]
                let numberSet = new Set(ar)
                let a = [...numberSet]
                if (a.length !== 6) {
                    a.push(num6)
                    setArray(a)
                } else {
                    setArray(a)
                }
            }
        } else {
            setSuccess('Please Pick gamees manually for this game type')
            return;
        }
    }


    return (

        <Container fluid className='black_bg'>
            <div className='news pl-1 pl-lg-5 pb-2 pt-2 p_white d-flex justify-content-between'>
                {timer}
                <Link className='game_links first' to='/games'>Regular Lotto</Link>
                <Link className='game_links ml-3' to='/softlotto'>Soft Lotto</Link>
                <Link className='game_links ml-3' to='/lottoexpress'>Lotto Express</Link>
                                                        <Link to='#'>
                                          <p className='game_links first'>How to Play</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links first'>Deposit Fund</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links first'>First Bet</p>
                                        </Link>
                                                                    <div class="d-flex flex-right mr-2">
                                        <Link to='https://www.facebook.com'>
                                           <FontAwesomeIcon className=' backg color3' size-mode='1x' icon={faFacebook} />
                                        </Link>
                                        <Link to='https://www.twitter.com'>
                                           <FontAwesomeIcon className='ml-1 mr-1 backg color4' size-md='1x' icon={faTwitter} />
                                        </Link>
                                        <Link to='https://www.instagram.com'>
                                           <FontAwesomeIcon className='mr-1 backg color5' size-md='1x' icon={faInstagram} />
                                        </Link>
                                        <Link to='https://www.youtube.com'>
                                           <FontAwesomeIcon className=' backg color6'  size-md='1x' icon={faYoutube} />
                                        </Link>       
                </div>
                </div>
            <Row>
                <Col className='d-none d-lg-inline' lg={3}>
                    <section className='mt-2 ml-2 ml-lg-0 mb-2 mb-lg-0 pt-5'>
                        <img src={play} alt="" className='game_section_svg' />
                    </section>
                    
                </Col>
                <Col lg={5} className={`${showGameModal && 'display2'} boxplay`}>
                                <div className='d-flex justify-content-center'>
                                    <h5 className='yellow'>Lotto Express</h5>
                    </div>
                    {gameType === 'AGAINST' && <Button variant='danger' onClick={handleAgainst} className={`small_class ml-2 mb-2 ml-lg-0 ${array.length > 0 ? '' : 'disabled' }`}>Against</Button>}
                    <Form className='form-select form-select-sm align-center' onChange={handleChange}>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Control as="select" custom>
                                            <option value='NAP 1'>NAP 1</option>
                                            <option value='NAP 2'>NAP 2</option>
                                            <option value='NAP 3'>NAP 3</option>
                                            <option value='NAP 4'>NAP 4</option>
                                            <option value='NAP 5'>NAP 5</option>
                                            <option value='PERM 2'>PERM 2</option>
                                            <option value='PERM 3'>PERM 3</option>
                                            <option value='PERM 4'>PERM 4</option>
                                            <option value='PERM 5'>PERM 5</option>
                                            <option value='1 BANKER'>1 BANKER</option>
                                            <option value='AGAINST'>AGAINST</option>
                                        </Form.Control>
                                        </Form.Group>
                    </Form>
                        <div className='mt-2 text-md-center ml-2 ml-md-0'>
                            {nums.map((i) => {
                                return <Button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) ? 'game_clicked' : geteNums && 'red'} balx`} variant='outline-primary'>{i}</Button>
                            })}
                        </div>
                        <Row className="clear mt-2">
                                <Button variant='outline-primary' className='thew' onClick={handleRandom}>Quick Pick</Button>
                            {
                                hideButton && gameType === "AGAINST" &&
                                    <Button variant='success' className='thew mt-2 mb-2 mt-lg-0 mb-lg-0' onClick={handleBet}>Play</Button>
                            }
                            {
                                gameType !== "AGAINST" &&
                                    <Button variant='success' className='thew  mt-2 mb-2 mt-lg-0 mb-lg-0' onClick={handleBet}>Play</Button>
                            }
                                <Button variant='outline-danger' className='thew' onClick={() => { setBetSlip([]); setHow(true); setSlip(false); setCount(0); setShowGameModal(false)}}>Clear</Button>
                      </Row>
                </Col>
                <Col lg={3} className='show1'>
                        <Row className='mt-2'>
                            <div className={`col-md-6 col-sm-6 mbox1 text-center ${betSlip.length < 1 && 'disabled'}`} onClick={() => { setSlip(true); setHow(false); }}>BetSlip <span class="badge bg-secondary">{count}</span></div>
                        </Row>
                        <Row>
                        
                                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    const { type, lines, id, gameId, stakeList, stakeList2, amount, amounts } = data;
                                    return (
                                        <main key={id} className='get_line'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                   removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                            <div>
                                                <p className='p_type'>Type: {type} </p>
                                                {stakeList && stakeList2 && <p className='p_type'>Numbers: {`${stakeList.toString()} ${stakeList2.toString()}`}</p>}
                                                {gameType !== 'AGAINST' && stakeList && <p className='p_type'>Numbers: {stakeList.toString()} </p>}
                                                <p className='p_type'>betSlip total Amount: {amount}</p>
                                                <p className='p_type'>Amount per Line: {amounts}</p>
                                        
                                                <Form key={id} onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(e, data)
                                                }
                                                }>
                                                    <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={handleInputChange} value={value} size='sm' placeholder='Amount' />
                                                        <Button className='btn_secondary' type='submit' size='sm' variant='success'>Submit</Button>
                                                    </InputGroup>

                                                    </Form>
                                                                                                <div className='mt-2 d-flex justify-content-lg-between'>
                                                <Button className='mr-2 mr-lg-0 games game' value='50' size='sm' onClick={() => {
                                                        data.amount = 50 * lines;
                                                        data.amounts = 50
                                                        calculateTotalStake()
                                                }}>50</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='100' size='sm' onClick={() => {
                                                        data.amount = 100 * lines;
                                                        data.amounts = 100
                                                        calculateTotalStake()
                                                }}>100</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='200' size='sm' onClick={() => {
                                                        data.amount = 200 * lines;
                                                        data.amounts = 200
                                                        calculateTotalStake()
                                                }}>200</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='300' size='sm' onClick={() => {
                                                        data.amount = 300 * lines;
                                                        data.amounts = 300
                                                        calculateTotalStake()
                                                }}>300</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='400' size='sm' onClick={() => {
                                                        data.amount = 400 * lines;
                                                        data.amounts = 400
                                                        calculateTotalStake()
                                                }}>400</Button>
                                                <Button className='mr-2 mr-lg-0' size='sm' value='500' size='sm' onClick={() => {
                                                        data.amount = 500 * lines;
                                                        data.amounts = 500
                                                        calculateTotalStake()
                                                }}>500</Button>
                                            </div>
                                        
                                             </div>
                                        </main>
                                        
                                    )
                                })}
                            </div>
                                                                        <section className='mt-2'>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Number of Bets: </p>
                                                   <p className='p_type'>{betSlip.length}</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='p_type'>Total Stake: </p>
                                                   <p className='p_type'>&#x20A6;{number}</p>
                                                </div>
                                                </section>
                                        <div className='d-flex justify-content-center'>
                                {!logedIn && <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={() => { setShowModal(!showModal); showGameModal && setShowGameModal(false)}}>Login To Place Bet</Button> }
                                {logedIn &&
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleSubmit}>Place Bet</Button>
                                }
                            </div>
                            
                </section>    
                
                        </Row>
                    </Col>
                   
                        <Col className={`${!showGameModal ? 'display' : 'c-sidebar --bet-slip is-open'} ${betSlip.length > 0 ? 'd_none scroll_game' : 'display'}`} md={3}>
                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                                <button className="game_slip_btn" onClick={() => { setBetSlip([]); setCount(0); setShowGameModal(false)}}>Clear Slip</button>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    const { id, stakeList, amount, amounts, lines, stakeList2 } = data;
                                    return (
                                        <main key={id} className='get_line'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                   removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                            <div>
                                                {stakeList && stakeList2 && <p className='p_type'>Numbers: {`${stakeList.toString()} ${stakeList2.toString()}`}</p>}
                                                {gameType !== 'AGAINST' && stakeList && <p className='p_type'>Numbers: {stakeList.toString()} </p>}
                                                <p className='p_type'>betSlip total Amount: {amount}</p>
                                                <p className='p_type'>Amount per Line: {amounts}</p>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                      <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={handleInputChange} value={value} size='sm' placeholder='Amount' />
                                                          <Button className='btn_secondary' type='submit' size='sm' variant='success'>Submit</Button>
  </InputGroup>

                                                </Form>
                                                <div className='mt-2 d-flex justify-content-lg-between'>
                                                <Button className='mr-2 mr-lg-0 games game' value='50' size='sm' onClick={() => {
                                                        data.amount = 50 * lines;
                                                        data.amounts = 50
                                                        calculateTotalStake()
                                                }}>50</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='100' size='sm' onClick={() => {
                                                        data.amount = 100 * lines;
                                                        data.amounts = 100
                                                        calculateTotalStake()
                                                }}>100</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='200' size='sm' onClick={() => {
                                                        data.amount = 200 * lines;
                                                        data.amounts = 200
                                                        calculateTotalStake()
                                                }}>200</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='300' size='sm' onClick={() => {
                                                        data.amount = 300 * lines;
                                                        data.amounts = 300
                                                        calculateTotalStake()
                                                }}>300</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='400' size='sm' onClick={() => {
                                                        data.amount = 400 * lines;
                                                        data.amounts = 400
                                                        calculateTotalStake()
                                                }}>400</Button>
                                                <Button className='mr-2 mr-lg-0' size='sm' value='500' size='sm' onClick={() => {
                                                        data.amount = 500 * lines;
                                                        data.amounts = 500
                                                        calculateTotalStake()
                                                }}>500</Button>
                                            </div>
                                             </div>
                                        </main>
                                        
                                    )
                                })}
                            </div>
                                                                        <section className='mt-2'>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Number of Bets: </p>
                                                   <p className='p_type'>{betSlip.length}</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='p_type'>Total Stake: </p>
                                                   <p className='p_type'>&#x20A6;{number}</p>
                                                </div>
                                                </section>
                                        <div className='d-flex justify-content-center'>
                                {!logedIn && <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={() => { setShowModal(!showModal); showGameModal && setShowGameModal(false)}}>Login To Place Bet</Button> }
                                {logedIn &&
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleSubmit}>Place Bet</Button>
                                }
                            </div>
                            
                </section>
            </Col>
                
                    <div class="row win">
                        <Col>
                           WIN 30 MILLION NAIRA
                        </Col>
                  {/* <div class="col-md-12 col-sm-12 col-xs-12">
                      
                  </div> */}
              </div>
            </Row>
            {showModal && <GetWhatsapp />}
            {success && <IntegrationNotistack success={`${success}`} />}
            <section className='bottom'>
                <div className='game_item' onClick={() => { showGameModal && setShowGameModal(false); history.push('/') }}>
                    <RiHome2Line className='select_icon' />
                    <span className='select_item'>Home</span>
                </div>
                <div className='game_item' onClick={() => { showGameModal && setShowGameModal(false); history.push('/') }}>
                    <IoIosFootball className='select_icon' />
                    <span className='select_item1'>Available Games</span>
                </div>
                <div className='game_item' onClick={() => setShowGameModal(!showGameModal)}>
                    {/* <span className='bet_count'>{count}</span> */}
                    <IoOptionsOutline className='select_icon' />
                    <span className='select_item'>BetSlip ({count})</span>
                </div>
                <div className={`game_item ${!logedIn && 'disabled getLogged'}`} onClick={() => { showGameModal && setShowGameModal(false); history.push('/profile') }}>
                    <IoMdHelpCircleOutline className='select_icon' />
                    <span className='select_item1'>Faqs & Support</span>
                </div>
        </section>
        </Container>
    )
}

export default LottoExpress
















































// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// import { useGlobalContext } from './store/context';

// const LottoApi = () => {
//     const { game } = useGlobalContext();
//     let games = game.slice(0, 5)
    

//     return (
    
//         <div className='games-container mt-3 d-flex justify-content-between'>
//             {games.map((lotto) => {
//                 const { name, startTime, id} = lotto;
//                 return (
//                     <Container className='mb-3' key={id}>
//                        <section className='games-card p-3 text-center'>
//                        <h3  className='name'>{name}</h3>
//                          <p>{startTime}</p>
//                         <Link size='sm' className='lottoApi_Link' to='/games'>Play Game</Link>
//                     </section>
//                     </Container>
                    
//                 )
//             })}
//         </div>
//     )
// }

// export default LottoApi


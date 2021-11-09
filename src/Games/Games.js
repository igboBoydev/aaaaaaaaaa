import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button, InputGroup, SplitButton } from 'react-bootstrap'
import { useGlobalContext } from '../store/context'
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import play from '../svg/play.svg'
import hamburger from '../svg/hanmburger.svg'
import moment from 'moment'
import { useHistory } from 'react-router';
import GetWhatsapp from '../Fetch/GetWhatsapp'
import GetVoice from '../Fetch/GetVoice'
import { RiBankLine, RiHome2Line, RiSdCardMiniLine, RiUserAddLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay, faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import IntegrationNotistack from '../Fetch/IntegrationNotistack';
import { array } from 'yup';
import { IoIosFootball, IoMdHelpCircleOutline } from 'react-icons/io';
import { IoOptionsOutline } from "react-icons/io5";

const Games = () => {
    const { game, logedIn, days } = useGlobalContext();
    let history = useHistory()
    const [showSlip, setShowSlip] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [activeNums, setActiveNums] = useState(false)
    const [geteNums, setGetNums] = useState(false)
    let [gameType, setGameType] = useState('NAP 1')
    const [games, setGames] = useState('EMBASSY')
    const [subValue, setSubValue] = useState(0)
    const [value, setValue] = useState(0);
    let [arr, setArr] = useState([])
    const [success, setSuccess] = useState('')
    let [betSlip, setBetSlip] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [hideButton, setHideButton] = useState(false)
    const [timer, setTimer] = useState(null)
    const [show, setShow] = useState(true)
    const [daysShow, setDaysShow] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [gameShow, setGameShow] = useState({ name: '', start: '', end: '', id: '' })
    const [clicked, setClicked] = useState(false)
    const [showSvg, setShowSvg] = useState(false)
    const [showVoice, setShowVoice] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [nap1Max, setNap1Max] = useState(null)
    const [nap2Max, setNap2Max] = useState(null)
    const [general, setGeneral] = useState(null)
    const [nap3Max, setNap3Max] = useState(null)
    const [nap4Max, setNap4Max] = useState(null)
    const [nap5Max, setNap5Max] = useState(null)
    const [number, setNumber] = useState(0)
    const [secArr, setSecArr] = useState([])
    var [maxArr, setMaxArr] = useState([])
    const [showAll, setShowAll] = useState([])
    const [message, showMessage] = useState(false)
    const [showGameModal, setShowGameModal] = useState(false)
    var [count, setCount] = useState(0)
    const [how, setHow] = useState(true)
    const [slip, setSlip] = useState(false)

    const categories = [...new Set(game.map((item) => {
        return [item.name, item.startTime, item.endTime]
    }))]

    
    let nums = []

    for (let i = 1; i < 91; i++) {
        nums.push(i)
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

    const handleInputChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setValue(value)
    }


    const handleInputSubmit = (e, data) => {
        e.preventDefault()
        setSubValue(value)
        data.amount = value * data.lines;
        data.amounts = parseInt(value)
        setValue(0)
        calculateTotalStake()
    }


    const createSlip = () => {
        if (arr.length > 0) {
            var n = arr.length
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
        const first_against = arr.slice(0, arr.indexOf(0))
          const second_against = arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1])
          lines = first_against.length * second_against.length
       }
      else {
          lines = 1
        }

        if (gameType === 'AGAINST') {
            let data = {
                id: new Date().getTime().toString(),
                gameId: gameShow.id,
                lines: lines,
                type: gameType,
                stakeList: arr.slice(0, arr.indexOf(0)),
                stakeList2:  arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1]),
                amount: 0 || subValue * lines,
                amounts: subValue
            }
            betSlip.push(data)
            calculateTotalStake();
            setArr([]);
            setShowSlip(true);
        } else {
            let data = {
                id: new Date().getTime().toString(),
                gameId: gameShow.id,
                lines: lines,
                type: gameType,
                stakeList: arr,
                amount: 0 || subValue * lines,
                amounts: subValue
            }
            betSlip.push(data)
            calculateTotalStake();
            setArr([]);
            setShowSlip(true);
        }
    }

    const calculateTotalStake = () => {
        setValue(0)
        setSubValue(0)
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
        setSubValue(0)
        const val = newItem.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);
        setNumber(val)
    }

    const get = localStorage.getItem('token')

    const handleGameBet = (e) => {
        e.preventDefault()

        const val = betSlip.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);

        if (val > parseInt(general)) {
            setSuccess(`Please kindly Note that you cannot place bet more than ${general} naira`)
            return;
        } else if (val < 1) {
            setSuccess(`Kindly add an amount`)
            return;
        } else {
            var myHeaders = new Headers();
            myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
            myHeaders.append("Authorization", `Bearer ${get}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "connect.sid=s%3Ae0Zu5esOyG3kUqFKLpyqNN4lka0d4o3F.WngMLxSIx3GfvGfOlQDWPwr%2BeLG2ABZ6sABSEo4Hwkc");
          
            betSlip.filter((bet) => {
                const { type, gameId, stakeList, stakeList2, amount, amounts } = bet;

                var raw = JSON.stringify({
                    "totalStake": `${number}`,
                    "stakes": [
                        {
                            "amount": `${amount}`,
                            "amounts": `${amounts}`,
                            "type": `${type}`,
                            "stakeList": `${stakeList}`,
                            "stakeList2": `${stakeList2}`,
                            "gameId": `${gameId}`
                        },
                    ]
                });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

                fetch("http://localhost:5016/api/v1/placeStake", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.result) {
                            setSubmited(true)
                            let show = result.result.map((res) => res)
                            if (show[0].type === 'AGAINST') {
                                const { type, amount, odd, staked, date, possibleWinning, stakes1, stakes2 } = show[0];
                                let response1 = stakes1.toString()
                                let response2 = stakes2.toString()
                                var myHeaders = new Headers();
                                myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                                myHeaders.append("Authorization", `Bearer ${get}`);
                                myHeaders.append("Content-Type", "application/json");

                                var raw = JSON.stringify({
                                    "amount": `${amount}`,
                                    "type": `${type}`,
                                    "odd": `${odd}`,
                                    "possibleWinning": `${possibleWinning}`,
                                    "staked": `${amount}`,
                                    "stakes1": `${response1}`,
                                    "stakes2": `${response2}`,
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
                                        console.log(result)
                                        if (result.success) {
                                            const { message } = result.success;
                                            setSuccess(message)
                                        } else {
                                            console.log(result)
                                        }
                                    })
                                    .catch(error => console.log('error', error));

                    
                            } else if (show[0].type === '1 BANKER') {
                                const { type, amount, odd, staked, date, possibleWinning, stakes } = show[0];
                                let response = stakes.toString()
                                var myHeaders = new Headers();
                                myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                                myHeaders.append("Authorization", `Bearer ${get}`);
                                myHeaders.append("Content-Type", "application/json");

                                var raw = JSON.stringify({
                                    "amount": `${amount}`,
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
                                        console.log(result)
                                        if (result.success) {
                                            const { message } = result.success;
                                            setSuccess(message)
                                        } else {
                                            setSuccess('Check your internet, refresh and try again. Thanks.')
                                            return;
                                        }
                                    })
                                    .catch(error => console.log('error', error));
                            } else {
                                const { type, amount, odd, staked, date, possibleWinning, stakes } = show[0];
                                let response = stakes.toString()
                                var myHeaders = new Headers();
                                myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                                myHeaders.append("Authorization", `Bearer ${get}`);
                                myHeaders.append("Content-Type", "application/json");

                                var raw = JSON.stringify({
                                    "amount": `${amount}`,
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
                                        if (result.success) {
                                            const { message } = result.success;
                                            setSuccess(message)
                                        } else {
                                            setSuccess('Check your internet, refresh and try again. Thanks.')
                                            return;
                                        }
                                    })
                                    .catch(error => console.log('error', error));
                            }
                        } else {
                            return
                        }
                
                    },
                        (error) => {
                            console.log(error)
                        }
                    );
            })
        }
    }

    const handleAgainst = (e) => {
        e.preventDefault()
        arr.push(0)
        setActiveNums(false)
        setHideButton(true)
    }


    const handleBets = (e) => {
        e.preventDefault()
        setActiveNums(false)
        setGetNums(false)
        if (array.length < 1) {
            setSuccess('Please Select numbers to play')
            return;
        }else{
            if (gameType === 'NAP 1') {
            if (arr.length < 1) {
                return;
            } else if (arr.length > 1 && arr.length < 3) {
                gameType = 'NAP 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to NAP 2 because the numbers picked are greater than 1; kindly choose a single number only for NAP 1 and proceed or continue with the NAP 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 2) {
                gameType = 'PERM 2'
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            }
            else {
                createSlip()
                setShowGames(true)
            }
        }
        else if (gameType === 'NAP 2') {
            if (arr.length < 2) {
                setSuccess('Please select atleast 2 numbers')
                return;
            } else if (arr.length > 2) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'NAP 3') {
            if (arr.length < 3) {
                setSuccess('Please select atleast 3 numbers')
                return;
            } else if (arr.length > 3) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 3; kindly choose 3 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'NAP 4') {
            if (arr.length < 4) {
                setSuccess('Please select atleast 4 numbers')
                return;
            } else if (arr.length > 4) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 4; kindly choose 4 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'NAP 5') {
            if (arr.length < 5) {
                setSuccess('Please select atleast 5 numbers')
                return;
            } else if (arr.length > 5) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setSuccess('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 5; kindly choose 5 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 2') {
            if (arr.length < 3) {
                setSuccess('Please Select atleast 3 numbers')
                return
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 3') {
            if (arr.length < 4) {
                setSuccess('Please Select atleast 4 numbers')
                return;
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 4') {
            if (arr.length < 5) {
                setSuccess('Please Select atleast 5 numbers')
                return;
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 5') {
            if (arr.length < 6) {
                setSuccess('Please Select atleast 6 numbers')
                return;
            } else if (arr.length > 15) {
                setSuccess('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === '1 BANKER') {
            if (!arr.length) {
                setSuccess('Please Select a single number')
                return
            }
            let y = arr[arr.length - 1]
            arr = y
            setShowGames(true)
            createSlip()
        } else if (gameType === 'AGAINST') {
            let max = 10
            let min = 1
            const first_against = arr.slice(0, arr.indexOf(0))
            const second_against = arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1])
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
                setShowGames(true)
            }
        } else {
            createSlip()
            setShowGames(true)
        }
        }
    }

    useEffect(() => {
        let time = setTimeout(() => {
            setShowAlert(!showAlert)
            setSuccess('')
        }, 3000)

        return () => clearTimeout(time)
    }, [success]);

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

    useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 1000)

        return () => clearInterval(timeInterval)
    })

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
            setSecArr([i])
        } else {
            setDaysShow('')
            setSecArr([])
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
                    if (value.type === 'NAP 1') {
                        setNap1Max(value.value)
                    } else if (value.type === 'NAP 2') {
                        setNap2Max(value.value)
                    } else if (value.type === 'NAP 3') {
                        setNap3Max(value.value)
                    } else if (value.type === 'NAP 4') {
                        setNap4Max(value.value)
                    } else if (value.type === 'NAP 5') {
                        setNap5Max(value.value)
                    } else if (value.type === 'General') {
                        setGeneral(value.value)
                    } else {
                        return;
                    }
                })
            })
            .catch(error => console.log('error', error));
        
    }, [])

    const handleRandom = e => {
        e.preventDefault()
        if (clicked) {
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
                    setArr([num])
                    setGetNums(true);
                } else {
                    const number = Math.floor(Math.random() * 90) + 1
                    setArr([number])
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
                        setArr(b)
                        setGetNums(true);
                    } else {
                        setArr(b)
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
                        setArr(b)
                        setGetNums(true);
                    } else {
                        setArr(b)
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
                        setArr(b)
                        setGetNums(true);
                    } else {
                        setArr(b)
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
                        setArr(b)
                        setGetNums(true);
                    } else {
                        setArr(b)
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
                        setArr(a)
                        setGetNums(true);
                    } else {
                        setArr(a)
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
                        setArr(a)
                        setGetNums(true);
                    } else {
                        setArr(a)
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
                        setArr(a)
                        setGetNums(true);
                    } else {
                        setArr(a)
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
                        setArr(a)
                        setGetNums(true);
                    } else {
                        setArr(a)
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
                        setArr(a)
                    } else {
                        setArr(a)
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
                        setArr(a)
                    } else {
                        setArr(a)
                    }
                }
            } else {
                setSuccess('Please Pick gamees manually for this game type')
                return;
            }
        } else {
            setSuccess('Please Choose a game type')
            return;
        }
    }


    const handleClass = (e, i) => {
        if (clicked) {
            if (showAll.includes(i)) {
                setSuccess('You cannot pick this number as you have exceeded the amount of picks for this number per day')
                return;
            }else {
                if (gameType === 'NAP 1' || gameType === '1 BANKER') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        setArr([i])
                        setGetNums((state) => {
                            return {
                                ...state,
                                [i]: !state[i],
                            };
                        });

                    }
                } else if (gameType === 'NAP 2') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        if (arr.length < 2) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else if (gameType === 'NAP 3') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        if (arr.length < 3) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else if (gameType === 'NAP 4') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        if (arr.length < 4) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else if (gameType === 'NAP 5') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        if (arr.length < 5) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else if (gameType === 'PERM 2' || gameType === 'PERM 3' || gameType === 'PERM 4' || gameType === 'PERM 5') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        if (arr.length < 15) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else if (gameType === 'AGAINST') {
                    setActiveNums((state) => {
                        return {
                            ...state,
                            [i]: !state[i],
                        };
                    });

                    if (arr.includes(i)) {
                        const index = arr.indexOf(i)
                        if (index > -1) {
                            arr.splice(index, 1)
                        }
                    } else {
                        const first_against = arr.slice(0, arr.indexOf(0))
                        const second_against = arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1])
                        if ((second_against.length + first_against.length) < 20) {
                            arr.push(i)
                        } else {
                            setGetNums((state) => {
                                return {
                                    ...state,
                                    [i]: !state[i],
                                };
                            });
                        }
                    }
                } else {
                    setSuccess('Please Choose a valid game type')
                    return;
                }
            } 
        } else {
            setSuccess('Please Choose a game type')
            return;
       }

    }

    useEffect(() => {
        
        function GetDates(startDate, daysToAdd) {
            var aryDates = [];

            for (var i = 0; i <= daysToAdd; i++) {
                var currentDate = new Date();
                currentDate.setDate(startDate.getDate() + i);
                aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()));
            }

             return aryDates;
        }

        function MonthAsString(monthIndex) {
            var month = [];
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            return month[monthIndex];
        }

        function DayAsString(dayIndex) {
            var weekdays = new Array(7);
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";

            return weekdays[dayIndex];
        }


        var startDate = new Date();
        var aryDates = GetDates(startDate, 0);
        setDaysShow(aryDates.toString())
        setSecArr([0])
        setShow(0)

        game.map((gam) => {
            if (daysShow.includes(gam.day.charAt(0).toUpperCase() + gam.day.slice(1))) {
                setClicked(true)
                setGameShow({ ...gameShow, name: gam.name, start: gam.startTime, end: gam.endTime, id: gam.uuid })
            }
        });

    }, [])

    useEffect(() => {
        if (gameShow.name) {
            setShowSvg(false)
        }
    }, [])


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "");
        myHeaders.append("Authorization", `Bearer ${get}`);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/gettotal", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    let a = []
                    let arr = result.success.total.bet_numbers
                    a = Array.from(arr.split(','), Number)
                    // setMaxArr([result.success.total.bet_numbers])
                    setMaxArr(a)
                }
            })
            .catch(error => console.log('error', error));
        
        const countDuplicate = (a) => {
            let count = {}
            for (let i = 0; i < maxArr.length; i++) {
                if (count[maxArr[i]]) {
                    count[maxArr[i]] += 1;
                } else {
                    count[maxArr[i]] = 1
                }
            }

            let x = []

            for (let prop in count) {
                if (count[prop] >= 2) {
                    console.log(prop + " counted" + " " + count[prop] + " times")
                    x.push(parseInt(prop))
                }
            }

            setShowAll(x)
        }

        countDuplicate(maxArr)
        
    }, []);

    return (
        <section className='black_bg'>
            <div className='news pl-1 pl-lg-5 pb-2 pt-2 p_white d-flex justify-content-between'>
                <p className="">{timer}</p>
                <Link className='game_links backgs first pt-1' to='/lottoexpress'>Lotto Express</Link>
                <Link className='game_links backgs ml-3 pt-1' to='/softlotto'>Soft Lotto</Link>
                                                        <Link to='#'>
                                          <p className='game_links backgs first'>How to Play</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links backgs first'>Deposit Fund</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links backgs first'>First Bet</p>
                                        </Link>
                                                                    <div class="d-flex flex-right mr-2">
                                        <Link to='https://www.facebook.com'>
                                           <FontAwesomeIcon className=' backg backgs color3' size-mode='1x' icon={faFacebook} />
                                        </Link>
                                        <Link to='https://www.twitter.com'>
                                           <FontAwesomeIcon className='ml-1 mr-1 backgs backg color4' size-md='1x' icon={faTwitter} />
                                        </Link>
                                        <Link to='https://www.instagram.com'>
                                           <FontAwesomeIcon className='mr-1 backg backgs color5' size-md='1x' icon={faInstagram} />
                                        </Link>
                                        <Link to='https://www.youtube.com'>
                                           <FontAwesomeIcon className=' backg backgs color6'  size-md='1x' icon={faYoutube} />
                                        </Link>       
                </div>
             </div>
            <Container fluid>
                 <Row>
            <Col className='' md={3}>
                        {days.map((day, i) => {  
                        return (
                            <section className=''>
                                <div className='htext' key={i} onClick={(e) => handleCategory(e, i)}>
                                   <span className=''>{day}</span>
                                </div>
                                {
                                    <div className='game_types'>
                                        {game.map((gam) => {
                                            if (secArr.includes(i) && daysShow.includes(gam.day.charAt(0).toUpperCase() + gam.day.slice(1))) {
                                                return <p onClick={(e) => {
                                                    e.preventDefault()
                                                    setClicked(true)
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
                    </Col>
                    <Col md={5} className='boxplay'>
                        <Row>
                            <Col className={`${showGameModal && betSlip.length > 0 && 'display2'}`}>
                                <div className='d-flex justify-content-center'>
                                    <h5 className='yellow'>Regular Lotto</h5>
                                </div>
                                
                                    <div className='d-flex justify-between pt-3'>
                                            <h4 className='h4_font'>
                                               {gameShow.name}
                                            </h4>
                                            {gameShow.start && <p className='col-md-4 text-center'> <span className='span_h4'>Draw:</span> <span className='span_h4'>{gameShow.start} <small>UTC</small></span></p>}
                                           {gameShow.end &&  <p className='col-md-4 text-end'> <span className='span_h4'>Closes:</span> <span className='span_h4'>{gameShow.end} <small>UTC</small> </span></p>}
                                    </div>
                            </Col>
                            </Row>
                                    {gameType === 'AGAINST' && <Button variant='danger' onClick={handleAgainst} className={`small_class ml-2 mb-2 ml-lg-0 ${arr.length > 0 ? '' : 'disabled' }`}>Against</Button>}
                                    
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
                                return <Button key={i} name={!activeNums[i] && 'ready'} onClick={(e) => handleClass(e, i)} className={`${arr.includes(i) ? 'game_clicked' : geteNums && 'red'} balx ${showAll.includes(i) && 'reds'}`} variant='outline-primary'>{i}</Button>
                            })}
                        </div>
                        <Row className="clear mt-2">
                                <Button variant='outline-primary' className='thew' onClick={handleRandom}>Quick Pick</Button>
                            {
                                hideButton && gameType === "AGAINST" &&
                                    <Button variant='success' className='thew mt-2 mb-2 mt-lg-0 mb-lg-0' onClick={handleBets}>Play</Button>
                            }
                            {
                                gameType !== "AGAINST" &&
                                    <Button variant='success' className='thew  mt-2 mb-2 mt-lg-0 mb-lg-0' onClick={handleBets}>Play</Button>
                            }
                            <Button variant='outline-danger' className='thew' onClick={() => { setArr([]); setGetNums(false) }}>Clear</Button>
                      </Row>
                    </Col>
                    <Col md={3} className='show1'>
                        <Row className='mt-2'>
                            <div className={`col-md-6 col-sm-6 mbox1 text-center ${betSlip.length < 1 && 'disabled'}`} onClick={() => { setSlip(true); setHow(false); }}>BetSlip <span class="badge bg-secondary">{count}</span></div>
                        </Row>
                        <Row>
                        {/* {
                            how ?
                            <div className="mybo col-sm-12" id="howto">
                            <ul>
                                <li>Choose a draw to play in (all the draw are at the same format, just a different times)</li>
                                <li>Set how much to play for your ticket (Min &#x20A6;5 and Max &#x20A6;{general})</li>
                                <li> NAP 1 Pick 1 Numbers And If They Are Drawn You Win 40 multiplied by Your Ticket Cost.
                                <br />
                                <strong className="str_red">Note: You cannot play more than &#x20A6;{nap1Max} on NAP 1 games</strong>
                                </li>
                                <li> NAP 2 Pick 2 Numbers And If They Are Drawn You Win 240 multiplied by Your Ticket Cost.
                                <br />
                                <strong className="str_red">Note: You cannot play more than &#x20A6;{nap2Max} on NAP 2 games</strong>
                                </li>
                                <li> NAP 3 Pick 3 Numbers And If They Are Drawn You Win 2100 multiplied by Your Ticket Cost.
                                <br />
                                <strong className="str_red">Note: You cannot play more than &#x20A6;{nap3Max} on NAP 3 games</strong>
                                </li>
                                <li> NAP 4 Pick 4 Numbers And If They Are Drawn You Win 6000 multiplied by Your Ticket Cost.
                                <br />
                                <strong className="str_red">Note: You cannot play more than &#x20A6;{nap4Max} on NAP 4 games</strong>
                                </li>
                                <li> NAP 5 Pick 5 Numbers And If They Are Drawn You Win 44,000 multiplied by Your Ticket Cost.
                                <br />
                                <strong className="str_red">Note: You cannot play more than &#x20A6;{nap5Max} on NAP 5 games</strong>
                                </li>
                                <li> PERM 2 Pick atleast 3 Numbers And If They Are Drawn You Win 240 multiplied by Your Ticket Cost.</li>
                                <li> PERM 3 Pick 1 Numbers And If They Are Drawn You Win 2100 multiplied by Your Ticket Cost.</li>
                                <li> PERM 4 Pick 1 Numbers And If They Are Drawn You Win 6000 multiplied by Your Ticket Cost.</li>
                                <li> PERM 5 Pick 1 Numbers And If They Are Drawn You Win 44,000 multiplied by Your Ticket Cost.</li>
                                <li>1 BANKER Pick 1 Numbers And If They Are Drawn You Win 4 multiplied by Your Ticket Cost.</li>
                                <li>AGAINST Pick atleast 2 Numbers click the AGAINST button and pick atleast two numbers to pllay and If They Are Drawn You Win 240 multiplied by numbers won and your Ticket Cost.</li>
                            </ul>
                                    </div> : */}
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
                                            <p className='p_type'>Lines: {lines}</p>
                                            <p className='p_type'>Type: {type}</p>
                                                {stakeList && stakeList2 && <p className='p_type'>Numbers: {`${stakeList.toString()} ${stakeList2.toString()}`}</p>}
                                                {gameType !== 'AGAINST' && stakeList && <p className='p_type'>Numbers: {stakeList.toString()} </p>}
                                                <p className='p_type'>Amount per line: {amounts}</p>
                                                <p className='p_type'>betSlip total Amount: {amount}</p>
                                                <Form key={id} onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(e, data)
                                                }
                                                }>
                                                    <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={(e) => handleInputChange(e, type)} value={value} size='sm' placeholder='Amount' />
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
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleGameBet}>Place Bet</Button>
                                }
                            </div>
                            
                </section>    
                            
                        </Row>
                    </Col>
                {showGames && 
                   
                        <Col className={`${!showGameModal ? 'display' : 'c-sidebar --bet-slip is-open'} ${betSlip.length > 0 ? 'd_none scroll_game' : 'display'}`} md={3}>
                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                        <h6 className='game_h6'>
                            {games.slice(0, 11)}
                        </h6>
                                <button className="game_slip_btn" onClick={() => { setBetSlip([]); setCount(0); setShowGameModal(false)}}>Clear Slip</button>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    const { type, lines, id, gameId, stakeList, stakeList2, amount } = data;
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
                                            <p className='p_type'>Lines: {lines}</p>
                                            <p className='p_type'>Type: {type}</p>
                                                {stakeList && stakeList2 && <p className='p_type'>Numbers: {`${stakeList.toString()} ${stakeList2.toString()}`}</p>}
                                                {gameType !== 'AGAINST' && stakeList && <p className='p_type'>Numbers: {stakeList.toString()} </p>}
                                                <p className='p_type'>Enter Stake Amount: {amount}</p>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                      <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={(e) => handleInputChange(e, type)} value={value} size='sm' placeholder='Amount' />
                                                          <Button className='btn_secondary' type='submit' size='sm' variant='success'>Submit</Button>
  </InputGroup>

                                                </Form>
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
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleGameBet}>Place Bet</Button>
                                }
                            </div>
                            
                </section>
            </Col>
                    }
                    <div class="row win">
                        <Col>
                           WIN 30 MILLION NAIRA
                        </Col>
                  {/* <div class="col-md-12 col-sm-12 col-xs-12">
                      
                  </div> */}
              </div>
        </Row>
            </Container>
            {showModal && <GetWhatsapp />}
            {success && <IntegrationNotistack success={`${success}`} />}
            {showVoice && <GetVoice
                setGameShow={setGameShow}
                clicked={setClicked}
                gameShow={gameShow}
            />}
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
       </section>
    )
}

export default Games
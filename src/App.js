import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Navigation from './components/Navbar'
import Footer from './components/Footer'
import Register from './Authenticate/Register';
import { useGlobalContext } from './store/context';
import Result from './Admin/Result'
import Validate from './Authenticate/Validate';
import Games from './Games/Games';
import LottoExpress from './Games/lottoExpress';
import SoftLotto from './Games/SoftLotto'
import Voice from './Authenticate/Voice';
import Whatsapp from './Authenticate/Whatsapp';
import Reset from './PasswordReset/Reset';
import Login from './Authenticate/Login';
import GrandLottoAdmin from './Admin/GrandLottoAdmin'
import Profile from './Profile/Profile'
import ValidateReset from './PasswordReset/ValidateReset';
import PasswordUp from './PasswordReset/PasswordUp'
import Bets from './Profile/Bets'
import ShowResults from './Profile/ShowResults'
import Transaction from './Profile/Transaction';
import Error from './components/Error'


const App = () => {
    const { admin } = useGlobalContext();

    return (
        <Router>
           <Navigation />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/validate'>
                    <Validate />
                </Route>
                {
                    admin &&
                <Route exact path='/postResult'>
                    <Result />
                </Route>
                }
                <Route exact path='/validate/login'>
                    <Login />
                </Route>
                <Route exact path='/validate/grandLottoAdmin'>
                    <GrandLottoAdmin />
                </Route>
                <Route exact path='/profile'>
                    <Profile />
                </Route>
                <Route exact path='/validate/voice'>
                    <Voice />
                </Route>
                <Route exact path='/validate/whatsapp'>
                    <Whatsapp />
                </Route>
                 <Route exact path='/games'>
                    <Games />
                </Route>
                 <Route exact path='/lottoexpress'>
                    <LottoExpress />
                </Route>
                 <Route exact path='/softlotto'>
                    <SoftLotto />
                </Route>
                <Route exact path='/profile/passwordreset'>
                    <Reset />
                </Route>
                <Route exact path='/profile/betHistory'>
                    <Bets />
                </Route>
                <Route exact path='/profile/results'>
                    <ShowResults />
                </Route>
                <Route exact path='/profile/transactions'>
                    <Transaction />
                </Route>
                <Route exact path='/profile/reset/validate'>
                    <ValidateReset />
                </Route>
                 <Route exact path='/profile/reset/password'>
                    <PasswordUp />
                </Route>
                 <Route path='*'>
                    <Error />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App

import {
    ADD_USER,
    REGISTER_ALERT,
    GET_VALUES,
    LOG_OUT,
    DISPLAY_GAMES,
    GET_DAYS_IN_WEEK,
    GET_VOICE,
    SHOW_PROFILE,
    ADMIN_PRIVILEDGE,
    GIVE_LOGIN_ACCESS,
    GET_WHATSAPP,
    VALIDATE_SENT_TOKEN,
    LOGIN,
    NO_USER,
    CANCEL_GAME,
} from './actions'


const reducer = (state, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                newAlert: action.payload,
                isSubmitted: true,
            }
        case 'ADMIN_PRIVILEDGE':
            let adminToken = { ...state.admin, tokens: action.payload }
            return {
                ...state,
                adminToken: adminToken.tokens,
                admin: true,
                logedIn: true

            }
        case REGISTER_ALERT:
            const alerts = { ...state.alert, getAlert: action.payload };
            return {
                ...state,
                alert: alerts
            }
        case SHOW_PROFILE:
            const getProfile = { ...state.profile, showProfile: action.payload };
            return {
                ...state,
                profile: getProfile.showProfile
            }
        case GET_VALUES:
            return {
                ...state,
                value: action.payload
            }
        case GIVE_LOGIN_ACCESS:
            const getToken = { ...state, showAlert: action.payload }
            return {
                ...state,
                isLoggedIn: getToken.showAlert,
                logedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                logedIn: false
            }
        case DISPLAY_GAMES:
            // console.log(action.payload)
            const getGames = { ...state, games: action.payload };
            return { ...state, game: getGames.games, loadimg: true };
        case NO_USER:
            return {
                ...state,
                isSubmitted: false
            }
        case GET_VOICE:
            const voice = { ...state.voice, voices: action.payload };
            return {
                ...state,
                voice: voice
            }
        case GET_WHATSAPP:
            const whatsapp = { ...state.whatsapp, whatsapps: action.payload };
            return {
                ...state,
                whatsapp: whatsapp
            }
        case GET_DAYS_IN_WEEK:
            const getDays = { ...state, day: action.payload };
            return {
                ...state,
                days: getDays.day
            }
        case VALIDATE_SENT_TOKEN:
            return {}
        case LOGIN:
            let grantAccess = { ...state.userLogin, userLogin: action.payload }
            return {
                ...state,
                grantAccess: grantAccess,
                isLoggedIn: true
            }
        case CANCEL_GAME:
            return {}
        default:
            return state;

    }
}

export default reducer
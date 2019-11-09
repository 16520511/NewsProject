import { USER_LOG_OUT, USER_LOG_IN } from './actions'

const initState = {
    userLoggedIn: false
}

export default function(state = initState, action) {
    switch(action.type) {
        case USER_LOG_OUT:
            return {
                userLoggedIn: false
            };
        case USER_LOG_IN:
            return {
                userLoggedIn: true
            };
    }
}
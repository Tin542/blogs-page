import {USER_STORE} from '../constants/AppConstant';

export const handleLoginWithGoogle = (data) => {
    localStorage.setItem(USER_STORE, JSON.stringify(data));
    return {
        type: 'robin/gooleLogin',
        payload: data
    }
}
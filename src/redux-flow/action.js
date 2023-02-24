import {USER_STORE, POST_STORE} from '../constants/AppConstant';

export const handleLoginWithGoogle = (data) => {
    localStorage.setItem(USER_STORE, JSON.stringify(data));
    return {
        type: 'auth/gooleLogin',
        payload: data
    }
}

export const handleUpdateProfile = (data) => {
    localStorage.setItem(USER_STORE, JSON.stringify(data));
    return {
        type: 'auth/updateProfile',
        payload: data
    }
}

export const handleAddPost = (data) => {
    localStorage.setItem(POST_STORE, data);
    return {
        type: 'post/add',
        payload: data
    }
}
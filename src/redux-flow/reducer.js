import {USER_STORE} from '../constants/AppConstant';

const userInitState = {
  data: {
    search: "",
    users: JSON.parse(localStorage.getItem(USER_STORE)) || {},
  },
  
};

const rootReducer = (state = userInitState, action) => {
  switch (action.type) {
    case "robin/gooleLogin":
      return {
        ...state,
        data: {...state.data, users: action.payload},
      }
    default:
      return state;
  }
};

export default rootReducer;

import { USER_STORE } from "../constants/AppConstant";
import { Post } from "../data/post";

const initState = {
  data: {
    users: JSON.parse(localStorage.getItem(USER_STORE)) || {},
  },
  listPost: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "auth/gooleLogin":
      return {
        ...state,
        data: { ...state.data, users: action.payload },
      };
    case "auth/updateProfile":
      return {
        ...state,
        data: { ...state.data, users: action.payload },
      };
    case "post/add":
      return {
        ...state,
        listPost: [...state.listPost, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;

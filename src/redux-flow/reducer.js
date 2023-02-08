const userInitState = {
  filters: {
    search: "",
  },
  users: [],
};

const rootReducer = (state = userInitState, action) => {
  switch (action.type) {
    case "robin/gooleLogin":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;

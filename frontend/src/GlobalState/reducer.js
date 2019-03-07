export const initialState = {
  isLoggedIn: Boolean(localStorage.getItem("jwt")),
  JWT: localStorage.getItem("jwt") || null
};

const reducer = (state, action) => {
  const reduced = { ...state };

  switch (action.type) {
    case "LOGIN":
      return {
        ...reduced,
        isLoggedIn: true,
        JWT: action.payload
      };
    case "LOGOUT":
      return {
        ...reduced,
        isLoggedIn: false,
        JWT: null
      };
    case "SET_VALUE":
      return {
        ...reduced,
        [action.target]: action.payload
      };
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};

export default reducer;

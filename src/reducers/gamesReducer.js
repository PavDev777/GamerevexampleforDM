const initState = {
  popularGames: [],
  newGames: [],
  upcomingGames: [],
  searched: []
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return { ...state };
    default:
      return { ...state };
  }
};
export default gameReducer;

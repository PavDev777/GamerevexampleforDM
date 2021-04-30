import { combineReducers } from "redux";
import gameReducer from "./gamesReducer";

 const reducers = combineReducers({
    games: gameReducer
})

export default reducers
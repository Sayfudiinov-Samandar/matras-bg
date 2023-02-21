import { combineReducers } from "redux";
import { UserReducer } from "./redux/user/userReducer";
import { TokenReducer } from "./redux/token/tokenReducer";

export const rootReducer=combineReducers({

    user: UserReducer,
    token: TokenReducer
})
import { GET_TOKEN } from "./tokenType";

const initialState = {
	token: localStorage.getItem("token") || "",
};


export const TokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		default:
			return state;
	}
};

import { GET_USER } from "./userType";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || [],
};


export const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

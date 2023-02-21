import { GET_USER } from "./userType";

export const getUser = (user) => {
	return {
		type: GET_USER,
		payload: user,
	};
};





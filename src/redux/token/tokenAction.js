import { GET_TOKEN } from "./tokenType";

export const getToken = (token) => {
	return {
		type: GET_TOKEN,
		payload: token,
	};
};





const Reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_START":
			return {
				user: null,
				isLoading: true,
				isError: false,
			};
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				isLoading: false,
				isError: false,
			};
		case "LOGIN_FAILURE":
			return {
				user: null,
				isLoading: false,
				isError: true,
			};
		case "LOGOUT":
			return {
				user: null,
				isLoading: false,
				isError: false,
			};
		default:
			return;
	}
};

export default Reducer;

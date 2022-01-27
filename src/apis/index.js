import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

const getQueryParamsObj = (queryParams) => {
	if (queryParams) {
		let result = "";
		for (let key in queryParams) {
			result = `${key}=${queryParams[key]}&`;
		}
	}
	return "";
};

const fetchSafeData = async (address) => {
	const response = await axios.get(`${URL}/safes/${address}/`);
	return response
};

const fetchBalanceData = async (address, queryParams) => {
	const response = await axios.get(
		`${URL}/safes/${address}/balances/usd/${getQueryParamsObj(queryParams)}`
	);
	return response;
};

const fetchTransactionDetails = async (address, queryParams) => {
	const response = await axios.get(
		`${URL}/safes/${address}/all-transactions/${getQueryParamsObj(queryParams)}`
	);
	return response;
};

export default {
	fetchSafeData,
	fetchBalanceData,
	fetchTransactionDetails,
};

import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

const getQueryParamsObj = (queryParams) => {
	if (queryParams) {
		let result = "?";
		for (let key in queryParams) {
			result = result + `${key}=${queryParams[key]}&`;
		}
		return result;
	}
	return "";
};

const fetchSafeData = async (address) => {
	const response = await axios.get(`${URL}/safes/${address}/`);
	return response;
};

const fetchBalanceData = async (address, queryParams) => {
	const response = await axios.get(
		`${URL}/safes/${address}/balances/usd/${getQueryParamsObj(queryParams)}`
	);
	return response;
};

const fetchTransactionDetails = async (address, queryParams) => {
	const response = await axios.get(
		`${URL}/safes/${address}/multisig-transactions/${getQueryParamsObj(
			queryParams
		)}`
	);
	return response;
};

const fetchDataByUrl = async (url) => {
	const response = await axios.get(url);
	return response;
};

export default {
	fetchSafeData,
	fetchBalanceData,
	fetchTransactionDetails,
	fetchDataByUrl,
};

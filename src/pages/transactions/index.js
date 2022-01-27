import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Apis from "apis";
import Toast from "components/Toast";
import PageContainer from "components/PageContainer";
import TransactionCard from "./TransactionCard";

const Transactions = () => {
	const [transactionData, setTransactionData] = useState();
	const [loading, setLoading] = useState(true);
	const { address } = useParams();

	const fetchData = async () => {
		try {
			const res = await Apis.fetchTransactionDetails(address, {limit:10})
			setTransactionData(res.data);
		} catch (e) {
			Toast("error", e?.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return null;
	if (!transactionData) return null;
	
	const d = transactionData.results[0]
		console.log("transactionData", d)

	return (
		<PageContainer>
			<TransactionCard data={d}/>
		</PageContainer>
	);
};

export default Transactions;

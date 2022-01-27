import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import Apis from "apis";
import constants from "constants";
import Toast from "components/Toast";
import PageContainer from "components/PageContainer";
import { CardWrapper, HeaderWrapper, BodyWrapper } from "components/Wrappers";
import TransactionCard from "./TransactionCard";

const { THRESHOLD_SCREEN_WIDTH, PAGE_HEIGHT } = constants;

const MessageWrapper = styled.div`
	margin-bottom: 5px;
	text-align: center;
	color: blue;
`;

const MesageBox = ({ label }) => {
	return (
		<CardWrapper>
			<MessageWrapper>{label}</MessageWrapper>
		</CardWrapper>
	);
};

const Transactions = () => {
	const [transactionInfo, setTransactionInfo] = useState();
	const [transactions, setTransactions] = useState([]);
	const { address } = useParams();

	const fetchData = async () => {
		try {
			const res = await Apis.fetchTransactionDetails(address, {
				txType: "MULTISIG_TRANSACTION",
				ordering: "executionDate",
				limit: 10,
			});
			const { results, ...rest } = res.data;
			const finalData = [...transactions, ...results];
			setTransactions(finalData);
			setTransactionInfo(rest);
		} catch (e) {
			Toast("error", e?.response?.data?.message);
		}
	};

	const fetchMore = async () => {
		try {
			const res = await Apis.fetchDataByUrl(`${transactionInfo.next}`);
			const { results, ...rest } = res.data;
			const finalData = [...transactions, ...results];
			setTransactions(finalData);
			setTransactionInfo(rest);
		} catch (e) {
			Toast("error", e?.response?.data?.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!transactionInfo || !transactions) return null;
	return (
		<PageContainer>
			<HeaderWrapper>Transactions</HeaderWrapper>
			<BodyWrapper>
				<InfiniteScroll
					height={
						window.innerWidth < THRESHOLD_SCREEN_WIDTH
							? window.innerHeight
							: PAGE_HEIGHT
					}
					dataLength={transactions.length}
					next={fetchMore}
					hasMore={!!transactionInfo.next}
					loader={<MesageBox label="Loading....." />}
					endMessage={<MesageBox label="***** END *****" />}
				>
					{transactions.map((d, index) => (
						<TransactionCard key={`${d.transactionHash}-${index}`} data={d} />
					))}
				</InfiniteScroll>
			</BodyWrapper>
		</PageContainer>
	);
};

export default Transactions;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import Apis from "apis";
import constants from "constants";
import Toast from "components/Toast";
import PageContainer from "components/PageContainer";
import MessageBox from "components/MessageBox";
import { CardWrapper, HeaderWrapper, BodyWrapper } from "components/Wrappers";
import TransactionCard from "./TransactionCard";

const { THRESHOLD_SCREEN_WIDTH, PAGE_HEIGHT } = constants;

const StatusWrapper = styled.div`
	margin-bottom: 5px;
	text-align: center;
	color: blue;
`;

const ListFooterBox = ({ label }) => {
	return (
		<CardWrapper>
			<StatusWrapper>{label}</StatusWrapper>
		</CardWrapper>
	);
};

const Transactions = () => {
	const [transactionInfo, setTransactionInfo] = useState();
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const { address } = useParams();

	const fetchData = async () => {
		try {
			const res = await Apis.fetchTransactionDetails(address, {
				ordering: "executionDate",
				limit: 10,
				executed: true,
			});
			const { results, ...rest } = res.data;

			const finalData = [...transactions, ...results];
			setTransactions(finalData);
			setTransactionInfo(rest);
		} catch (e) {
			Toast("error", e?.response?.data?.message);
		} finally {
			setLoading(false);
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

	const renderData = () => {
		if (loading) return <MessageBox label="Loading..." />;
		if (!transactionInfo || !transactions)
			return <MessageBox label="No Data" />;

		return (
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
					loader={<ListFooterBox label="Loading....." />}
					endMessage={<ListFooterBox label="***** END *****" />}
				>
					{transactions.map((d, index) => {
						return (
							<TransactionCard key={`${d.transactionHash}-${index}`} data={d} />
						);
					})}
				</InfiniteScroll>
			</BodyWrapper>
		);
	};

	return (
		<PageContainer>
			<HeaderWrapper>Transactions</HeaderWrapper>
			{renderData()}
		</PageContainer>
	);
};

export default Transactions;

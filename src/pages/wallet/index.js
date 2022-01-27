import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Apis from "apis";
import Toast from "components/Toast";
import PageContainer from "components/PageContainer";
import {
	CardWrapper,
	LabelWrapper,
	HeaderWrapper,
	BodyWrapper,
} from "components/Wrappers";
import SafeInfoCard from "./SafeInfoCard";
import BalanceCard from "./BalanceCard";

const ButtonWrapper = styled(CardWrapper)`
	color: blue;
	margin-bottom: 5px;
	font-weight: bolder;
	background-image: linear-gradient(180deg, lightgrey, #ffffff);
	cursor: pointer;
`;

const CardButtonBox = ({ onClick, label }) => {
	return (
		<ButtonWrapper onClick={onClick}>
			<span>{label}</span>
		</ButtonWrapper>
	);
};

const Wallet = () => {
	const [safeData, setSafeData] = useState();
	const [balanceData, setBalanceData] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const { address } = useParams();

	const fetchData = async () => {
		try {
			const [res1, res2] = await Promise.all([
				Apis.fetchSafeData(address),
				Apis.fetchBalanceData(address),
			]);
			setSafeData(res1.data);
			setBalanceData(res2.data);
		} catch (e) {
			Toast("error", e?.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	const handleViewTransactions = () => {
		navigate(`/transactions/${address}`);
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return null;
	if (!safeData || !balanceData) return null;
	return (
		<PageContainer>
			<HeaderWrapper>Wallet</HeaderWrapper>

			<BodyWrapper>
				<CardButtonBox
					onClick={handleViewTransactions}
					label={"View Transactions"}
				/>

				<SafeInfoCard label="Safe Address" value={safeData.address} />
				<SafeInfoCard label="Total Owners" value={safeData?.owners?.length} />
				<SafeInfoCard label="Owner wallet addresses" value={safeData.owners} />
				<SafeInfoCard label="Threshold" value={safeData.threshold} />
				<CardWrapper>
					<LabelWrapper>Tokens</LabelWrapper>
					{balanceData.map((token, index) => {
						return (
							<BalanceCard
								key={`${token.tokenAddress}-${index}`}
								data={token}
								isLastIndex={index === balanceData.length - 1}
							/>
						);
					})}
				</CardWrapper>
				<CardWrapper>
					<LabelWrapper>Tokens</LabelWrapper>
					{balanceData.map((token, index) => {
						return (
							<BalanceCard
								key={`${token.tokenAddress}-${index}`}
								data={token}
								isLastIndex={index === balanceData.length - 1}
							/>
						);
					})}
				</CardWrapper>
			</BodyWrapper>
		</PageContainer>
	);
};

export default Wallet;

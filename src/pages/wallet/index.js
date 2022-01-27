import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Apis from "apis";
import Toast from "components/Toast";
import PageContainer from "components/PageContainer";
import SafeInfoCard from "./SafeInfoCard";
import BalanceCard from "./BalanceCard";
import { CardWrapper, LabelWrapper } from "./Wrappers";

const Wallet = () => {
	const [safeData, setSafeData] = useState();
	const [balanceData, setBalanceData] = useState();
	const [loading, setLoading] = useState(true);
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

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return null;
	if (!safeData || !balanceData) return null;
	return (
		<PageContainer>
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
		</PageContainer>
	);
};

export default Wallet;

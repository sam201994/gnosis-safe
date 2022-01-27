import React, { useState } from "react";

import { CardWrapper, ValueWrapper, LabelWrapper } from "components/Wrappers";

const TransactionDetailedCard = ({ label, value }) => {
	return (
		<div style={{ marginBottom: "5px" }}>
			<LabelWrapper>{label}</LabelWrapper>
			{Array.isArray(value) ? (
				value.map((v) => <ValueWrapper key={v}>{v}</ValueWrapper>)
			) : (
				<ValueWrapper>{value || "NA"}</ValueWrapper>
			)}
		</div>
	);
};

const TransactionCard = React.memo(({ data }) => {
	const [showDetails, setShowDetails] = useState(false);
	const gasFee = data.fee / Math.pow(10, 18);
	const handleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	const renderShowDetails = () => {
		return (
			<>
				<TransactionDetailedCard label="Transaction Nonce" value={data.nonce} />
				<TransactionDetailedCard
					label="Time of Execution"
					value={data.executionDate}
				/>
				<TransactionDetailedCard label="Recipient" value={data.to} />
				<TransactionDetailedCard label="Gas Fee" value={`${gasFee} ETH`} />
			</>
		);
	};

	return (
		<CardWrapper onClick={handleShowDetails} style={{ cursor: "pointer" }}>
			<TransactionDetailedCard
				label="Transaction Hash"
				value={data.transactionHash || "N/A"}
			/>
			{showDetails && renderShowDetails()}
		</CardWrapper>
	);
});

export default TransactionCard;

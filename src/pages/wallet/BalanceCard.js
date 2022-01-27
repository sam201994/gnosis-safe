import styled from "styled-components";

import { ValueWrapper } from "./Wrappers";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding-bottom: ${(props) => (props.isLastIndex ? "0px" : "10px")};
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	img {
		margin-right: 10px;
	}
`;

const BalanceCard = ({ data = {}, isLastIndex }) => {
	const getToken = () => {
		const decimal = data.token ? data.token.decimals : 18;
		const symbol = data.token ? data.token.symbol : "ETH";
		return `${data.balance / Math.pow(10, decimal)} ${symbol}`;
	};

	return (
		<Container isLastIndex={isLastIndex}>
			<div>
				<img src={data?.token?.logoUri} width={20} height={20} />
			</div>
			<div>
				<ValueWrapper>{getToken()}</ValueWrapper>
				<ValueWrapper>{`${data.fiatBalance} USD`}</ValueWrapper>
			</div>
		</Container>
	);
};

export default BalanceCard;

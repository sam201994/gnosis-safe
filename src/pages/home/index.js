import { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { HeaderWrapper, BodyWrapper } from "components/Wrappers";
import PageContainer from "components/PageContainer";

const Container = styled(BodyWrapper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`;

const BoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: white;
	margin: 20px;
	padding: 30px;
	input {
		color: #4f5655;
		width: 100%;
	}
	button {
		margin-top: 20px;
		color: #4f5655;
	}
`;

const LabelWrapper = styled.div`
	color: #828786;
	margin-bottom: 20px;
	font-size: 16px;
`;

const Home = () => {
	const [address, setAddress] = useState("");
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		setAddress(e.target.value);
	};

	const handleSubmit = () => {
		if (address) navigate(`/wallet/${address}`);
	};

	return (
		<PageContainer>
			<HeaderWrapper>Home</HeaderWrapper>
			<Container>
				<BoxWrapper>
					<LabelWrapper>Wallet Address</LabelWrapper>
					<input onChange={handleOnChange} value={address} />
					<button disabled={!address} onClick={handleSubmit}>
						Submit
					</button>
				</BoxWrapper>
			</Container>
		</PageContainer>
	);
};

export default Home;

import styled from "styled-components";

import { BodyWrapper } from "components/Wrappers";

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
`;

const LabelWrapper = styled.div`
	color: #828786;
	font-size: 16px;
`;

const NotFound = () => {
	return (
		<Container>
			<BoxWrapper>
				<LabelWrapper>Not Data</LabelWrapper>
			</BoxWrapper>
		</Container>
	);
};

export default NotFound;

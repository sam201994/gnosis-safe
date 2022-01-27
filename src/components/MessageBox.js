import styled from "styled-components";

import { BodyWrapper } from "components/Wrappers";
import constants from "constants";

const { HEADER_HEIGHT } = constants;

const Container = styled(BodyWrapper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: ${(props) => `${props.height}px`};
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

const MessageBox = ({ label }) => {
	return (
		<Container height={window.innerHeight - HEADER_HEIGHT}>
			<BoxWrapper>
				<LabelWrapper>{label}</LabelWrapper>
			</BoxWrapper>
		</Container>
	);
};

export default MessageBox;

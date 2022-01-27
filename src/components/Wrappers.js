import styled from "styled-components";

import constants from "constants";

const { THRESHOLD_SCREEN_WIDTH, HEADER_HEIGHT, PAGE_WIDTH } = constants;

export const CardWrapper = styled.div`
	padding: 20px;
	margin: 5px;
	background: white;
`;

export const ValueWrapper = styled.div`
	color: "#4F5655";
	overflow-wrap: break-word;
`;

export const LabelWrapper = styled.div`
	color: #828786;
	margin-bottom: 5px;
`;

export const HeaderWrapper = styled.div`
	text-align: center;
	cursor: pointer;
	color: white;
	background-image: linear-gradient(180deg, blue, black);
	font-weight: 700;
	position: fixed;

	display: flex;
	justify-content: center;
	align-items: center;

	width: ${PAGE_WIDTH}px;
	height: ${HEADER_HEIGHT}px;
`;

export const BodyWrapper = styled.div`
	margin-top: ${HEADER_HEIGHT}px;
	@media only screen and (min-width: ${THRESHOLD_SCREEN_WIDTH}px) {
		overflow-y: scroll;
	}
`;

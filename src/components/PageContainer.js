import styled from "styled-components";

import constants from "constants";

const { THRESHOLD_SCREEN_WIDTH, PAGE_HEIGHT, PAGE_WIDTH } = constants;

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	background: #f5f5f5;

	@media only screen and (min-width: ${THRESHOLD_SCREEN_WIDTH}px) {
		height: ${PAGE_HEIGHT}px;
		width: ${PAGE_WIDTH}px;
		overflow-y: scroll;
		margin-top: 20px;
	}
`;

export default PageContainer;

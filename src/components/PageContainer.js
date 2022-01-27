import styled from "styled-components";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 0 auto;
	background: #f5f5f5;

	@media only screen and (min-width: 600px) {
		height: 600px;
		overflow-y: scroll;
		margin-top: 20px;
	}
`;

export default PageContainer;

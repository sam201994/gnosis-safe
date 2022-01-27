import { CardWrapper, ValueWrapper, LabelWrapper } from "./Wrappers";

const SafeInfoCard = ({ label, value }) => {
	return (
		<CardWrapper>
			<LabelWrapper>{label}</LabelWrapper>
			{Array.isArray(value) ? (
				value.map((v) => <ValueWrapper key={v}>{v}</ValueWrapper>)
			) : (
				<ValueWrapper>{value}</ValueWrapper>
			)}
		</CardWrapper>
	);
};

export default SafeInfoCard;

import Button from "../../../shared/button/button";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HeroButton = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Button onClick={() => navigate("/authenticate")}>
				<span>{"Join now"}</span>
				<FaArrowRight />
			</Button>
		</div>
	);
};

export default HeroButton;

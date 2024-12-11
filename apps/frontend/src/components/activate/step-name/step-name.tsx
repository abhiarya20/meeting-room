import { FC, KeyboardEventHandler, useState } from "react";

import FormLeft from "../../shared/form-left/form-left";
import FormRight from "../../shared/form-right/form-right";
import FormWrapper from "../../shared/form-wrapper/form-wrapper";
import { setName } from "../../../store/activate-slice";
import useRedux from "../../../hooks/useRedux";

type StepNameProps = {
	onNext: () => void;
};

const StepName: FC<StepNameProps> = ({ onNext }) => {
	const { useTypedSelector, useTypedDispatch } = useRedux();
	const dispatch = useTypedDispatch();
	const { name } = useTypedSelector((state) => state.activate);
	const { user } = useTypedSelector((state) => state.auth);

	const [fullname, setFullname] = useState(user?.name || name);

	const submit = () => {
		if (!fullname) return;
		dispatch(setName(fullname));
		onNext();
	};

	const handleEnterClickEvent: KeyboardEventHandler<HTMLFormElement> = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			submit();
		}
	};

	return (
		<FormWrapper isLoading={false}>
			<FormLeft title='What’s Your Name?' description='We’d love to know your name. Please enter it so we can personalize your experience.' />
			<FormRight withSocialAuthButton={false} inputPlaceholder='Abhi Arya' error={null} isLoading={false} inputValue={fullname} setInputValue={setFullname} update={submit} handleEnterClickEvent={handleEnterClickEvent}></FormRight>
		</FormWrapper>
	);
};

export default StepName;

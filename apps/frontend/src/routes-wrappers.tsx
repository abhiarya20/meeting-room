import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useRedux from "./hooks/useRedux";

type ChildProp = { children: ReactNode };

export const GuestRoute = ({ children }: ChildProp) => {
	const { useTypedSelector } = useRedux();
	const { isAuth } = useTypedSelector((state) => state.auth);
	return isAuth ? <Navigate to='/meetings' /> : children;
};

export const SemiProtectedRoute = ({ children }: ChildProp) => {
	const { useTypedSelector } = useRedux();
	const { user, isAuth } = useTypedSelector((state) => state.auth);
	if (!isAuth) {
		return <Navigate to='/' />;
	}
	return user?.activated ? <Navigate to='/meetings' /> : children;
};

export const ProtectedRoute = ({ children }: ChildProp) => {
	const { useTypedSelector } = useRedux();
	const { user, isAuth } = useTypedSelector((state) => state.auth);
	if (!isAuth) {
		return <Navigate to='/' />;
	}
	return user?.activated ? children : <Navigate to='/activate' />;
};

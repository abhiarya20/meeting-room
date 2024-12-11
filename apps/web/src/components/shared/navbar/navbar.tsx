import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../avatar/avatar";
import { BeatLoader } from "react-spinners";
import Button from "../button/button";
import { FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import Logo from "../logo/logo";
import { MdAccountCircle } from "react-icons/md";
import { logout } from "../../../http";
import { setAuth } from "../../../store/auth-slice";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import useRedux from "../../../hooks/useRedux";

type NavbarProps = {
	withLoginButton?: boolean;
	children?: React.ReactNode;
};

const Navbar: FC<NavbarProps> = ({ children, withLoginButton = false }) => {
	const [showOption, setShowOption] = useState(false);
	const [spinnerColor, setSpinnerColor] = useState("red");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const { useTypedSelector } = useRedux();
	const { isAuth, user } = useTypedSelector((state) => state.auth);
	async function logoutUser() {
		if (isLoading) return;
		try {
			setIsLoading(true);
			try {
				const { data } = await logout();
				dispatch(setAuth(data));
			} catch (err) {
				console.log("Failed to logout from server");
			}
			setIsLoading(false);
			setShowOption(false);
		} catch (err) {
			console.log(err);
		}
	}
	const navigate = useNavigate();

	return (
		<>
			<nav className={styles.navbarWrapper}>
				<div className={styles.navbar}>
					<div>
						<Logo onClick={() => navigate("/")} />
					</div>

					{isAuth ?
						<div className={styles.userBtn}>
							<div className={styles.userWrapper}>
								<span className={styles.userName}>{user.name}</span>
								<Avatar src={user.avatar} onClick={() => setShowOption((prev) => !prev)} />
							</div>
							{showOption && (
								<div className={styles.options}>
									<button>
										<span>{user.name}</span>
										<MdAccountCircle fontWeight={"bold"} fontSize={"24px"} />
									</button>
									<button>
										<span>Settings</span>
										<IoSettings fontWeight={"bold"} fontSize={"24px"} />
									</button>
									<button className={styles.logoutButton} onClick={logoutUser} onMouseEnter={() => setSpinnerColor("white")} onMouseLeave={() => setSpinnerColor("red")}>
										{isLoading ?
											<>
												<div className={styles.loggingOut}>
													<BeatLoader color={spinnerColor} />
													<span>Logging Out</span>
												</div>
												<FiLogOut fontWeight={"bold"} fontSize={"24px"} />
											</>
										:	<>
												<span>Logout</span>
												<FiLogOut fontWeight={"bold"} fontSize={"24px"} />
											</>
										}
									</button>
								</div>
							)}
						</div>
					:	withLoginButton && (
							<div className={styles.loginBtn}>
								<Button className={styles.buttonExtention} onClick={() => navigate("/authenticate")}>
									<span>Login</span>
									<FaLock className={styles.buttonIcon} />
								</Button>
							</div>
						)
					}
				</div>
			</nav>
			{children}
		</>
	);
};

export default Navbar;

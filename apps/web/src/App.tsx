import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute, SemiProtectedRoute } from "./routes-wrappers";

import Activate from "./pages/activate/activate";
import Authenticate from "./pages/authenticate/authenticate";
import { BiSolidError } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";
import Home from "./pages/home/home";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import PageError from "./components/shared/page-error/page-error";
import PageLoader from "./components/shared/page-loader/page-loader";
import Room from "./pages/room/room";
import Rooms from "./pages/rooms/rooms";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";

function App() {
	const { isLoading, error } = useLoadingWithRefresh();

	return (
		<BrowserRouter>
			{isLoading ?
				<PageLoader isLoading={isLoading} message='Loading, please wait...' />
			: error ?
				<PageError error={error} buttonTxt='Try Again' buttonIcon={<HiRefresh size={"1.5rem"} />} onButtonClick={() => window.location.reload()} icon={error.code === 500 ? <BiSolidError /> : <MdOutlineSignalWifiStatusbarConnectedNoInternet4 />} />
			:	<>
					{/* prettier-ignore */}
					<Routes>
						<Route path='/' element={<GuestRoute><Home /></GuestRoute>} />						
						<Route path='/authenticate' element={<GuestRoute><Authenticate /></GuestRoute>} />						
						<Route path='/activate' element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />						
						<Route path='/meetings' element={<ProtectedRoute><Rooms /></ProtectedRoute>} />				
						<Route path='/:id' element={<ProtectedRoute><Room /></ProtectedRoute>} />											
					</Routes>
				</>
			}
		</BrowserRouter>
	);
}

export default App;

// TODO UPDATE README
// TODO UPDATE package.json for auther & repository and more
// TODO ADD License
// TODO UPDATE .env files

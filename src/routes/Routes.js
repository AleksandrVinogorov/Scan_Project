import { Route, Routes } from "react-router-dom"
import LoginPage from '../pages/LoginPage';
import SearchData from '../pages/SearchData';
import HomePage from "../pages/HomePage";
import PrivateRoute from "./privateRoute";
import ResultPage from "../pages/ResultPage";

function App() {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />} token={token}>
                <Route path="/SearchData" element={<SearchData/>}/>
                <Route path="/ResultPage" element={<ResultPage/>}/>
            </Route>
        </Routes>
    )
}
export default App
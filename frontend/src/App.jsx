// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar"; // Import Sidebar
import UserListPage from "./pages/UserPage/UserListPage"; // Trang quản lý Users
import AdbListPage from "./pages/BlockPage/AdbListPage"; // Trang quản lý Khối xét tuyển
import AdcListPage from "./pages/CriteriaPage/AdcListPage";
import AdmListPage from "./pages/MajorPage/AdmListPage"; // Trang quản lý Ngành xét tuyển
import PermissionListPage from "./pages/PermissionPage/PermissionListPage"; // Trang quản lý Phân quyền
import AdyListPage from "./pages/YearPage/AdyListPage";
import AdrListPage from "./pages/RegionPage/AdrListPage";
import AdoListPage from "./pages/ObjectPage/AdoListPage";
import AdqListPage from "./pages/QuantityPage/AdqListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ChangePasswordPage from "./pages/PasswordPages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/PasswordPages/ForgotPasswordPage";
import ForgotPasswordNextPage from "./pages/PasswordPages/ForgotPasswordNextPage";
import OverViewMajors from "./pages/OverviewPages/OverViewMajors";
import NotFoundPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReviewerPage from "./pages/ReviewerPages/ReviewerPage";
import InfoAdmission from "./pages/ReviewerPages/InfoAdmissionReviewer";
import LearningProcessReviewer from "./pages/ReviewerPages/LearningProcessReviewer";
import TranscriptReviewer from "./pages/ReviewerPages/TranscriptReviewer";
import PhotoReviewer from "./pages/ReviewerPages/PhotoReviewer";
import OverviewRegisterMajor from "./pages/OverviewPages/OverviewRegisterMajors";
import OverviewRegisterMajorP2 from "./pages/OverviewPages/OverviewRegisterMajorPage2";
import OverviewMethods from "./pages/OverviewPages/OverviewMethods";
import OverviewBlocks from "./pages/OverviewPages/OverviewBlocks";
import FilterPage from "./pages/FilterPage/FilterPage";
import ResultPage from "./pages/OverviewPages/ResultsPage";
import ListAcceptedPage from "./pages/ListAcceptedPage/ListAcceptedPage";
function App() {
    function SidebarLayout() {
        return (
            <div className="flex">
                {/* Sidebar cố định */}
                <Sidebar className="w-1/4 bg-gray-100 h-screen" />
                {/* Nội dung sẽ thay đổi theo route */}
                <div className="w-3/4 p-6">
                    <Routes>
                        <Route path="user" element={<UserListPage />} />
                        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
                        <Route path="block" element={<AdbListPage />} />
                        <Route path="major" element={<AdmListPage />} />
                        <Route path="criteria" element={<AdcListPage />} />
                        <Route path="region" element={<AdrListPage />} />
                        <Route path="object" element={<AdoListPage />} />
                        <Route path="permission" element={<PermissionListPage />} />
                        <Route path="quantity" element={<AdqListPage />} />
                        {/* <Route path="option1" element={<AdyListPage />} /> */}
                        <Route path="option1" element={<ListAcceptedPage />} />
                        <Route path="option2" element={<FilterPage />} />
                        <Route path="option3" element={<h1 className="text-2xl font-bold">Hello World 3</h1>} />
                    </Routes>
                </div>
            </div>
        );
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/changepassword" element={<ChangePasswordPage />} />
                <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="/forgotpasswordnextpage" element={<ForgotPasswordNextPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="/sidebar/*" element={<SidebarLayout />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/overviewMajors" element={<OverViewMajors />}>
                    <Route path=":majorId" element={<OverViewMajors />} />
                </Route>
                <Route path="/overviewMethods" element={<OverviewMethods />} />
                <Route path="/overviewBlocks" element={<OverviewBlocks />} />
                <Route path="/overviewRegisterMajors" element={<OverviewRegisterMajor />} />
                <Route path="/overviewRegisterMajorsP2" element={<OverviewRegisterMajorP2 />} />
                <Route path="/reviewer" element={<ReviewerPage />} />
                <Route path="/infoAdmissionReviewer" element={<InfoAdmission />} />{" "}
                {/* Sử dụng element thay vì component */}
                <Route path="/learningReviewer" element={<LearningProcessReviewer />} />
                <Route path="/transcriptReviewer" element={<TranscriptReviewer />} />
                <Route path="/photoReviewer" element={<PhotoReviewer />} />
                <Route path="/results" element={<ResultPage />} />
            </Routes>

            {/* Main Content */}
            {/* <div className="w-4/5 p-6"></div> */}
        </Router>
    );
}

export default App;

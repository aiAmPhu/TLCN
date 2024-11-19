// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar"; // Import Sidebar
import UserListPage from "./pages/UserListPage"; // Trang quản lý Users
import AdbListPage from "./pages/AdbListPage"; // Trang quản lý Khối xét tuyển
import AdmListPage from "./pages/AdmListPage"; // Trang quản lý Ngành xét tuyển
import PermissionListPage from "./pages/PermissionList"; // Trang quản lý Phân quyền
//import GraduateListPage from "./pages/GraduateListPage"; // Trang quản lý Tuyển sinh

function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <Routes>
                        <Route path="/user" element={<UserListPage />} />
                        <Route path="/block" element={<AdbListPage />} />
                        <Route path="/major" element={<AdmListPage />} />
                        <Route path="/permission" element={<PermissionListPage />} />
                        <Route path="/permission" element={<PermissionListPage />} />
                        {/* Hiển thị Hello World 1 */}
                        <Route path="/option1" element={<h1 className="text-2xl font-bold">Hello World 1</h1>} />
                        <Route path="/option2" element={<h1 className="text-2xl font-bold">Hello World 2</h1>} />
                        <Route path="/option3" element={<h1 className="text-2xl font-bold">Hello World 3</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

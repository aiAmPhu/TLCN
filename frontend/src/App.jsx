import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Giả sử Header là component bạn đã định nghĩa
import LoginPage from "./pages/LoginPage"; // Đảm bảo bạn đã tạo component LoginPage
import RegisterPage from "./pages/RegisterPage"; // Đảm bảo bạn đã tạo component LoginPage
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

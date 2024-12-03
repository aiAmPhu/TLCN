import { useState } from "react";
import Header from "../../components/Header"; 
import AdmissionInformation from "../../components/Profile/AdmissionInformation";
import LearningProcess from "../../components/Profile/LearningProcess";
import PhotoID from "../../components/Profile/PhotoID";

const ProjfilePage = () => {
  const [activeSection, setActiveSection] = useState(null); // State để theo dõi phần nội dung được chọn

  const handleClick = (section) => {
    // Khi nhấn vào liên kết, thay đổi giá trị activeSection
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1" style={{ paddingTop: "72px" }}>
        <aside className="w-1/4 bg-gray-900 text-white p-4">
          <div className="mb-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="rounded-full mx-auto mb-2"
            />
            <p className="text-center font-semibold">NGUYỄN DUY SƠN</p>
          </div>
          <nav>
            <ul className="space-y-2">
              <li
                className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
                  activeSection === "admissioninformation" && "bg-blue-600"
                }`}
                onClick={() => handleClick("admissioninformation")}
              >
                Thông tin xét tuyển
              </li>
              <li
                className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
                  activeSection === "learningprocess" && "bg-blue-600"
                }`}
                onClick={() => handleClick("learningprocess")}
              >
                Quá trình học tập
              </li>
              <li
                className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
                  activeSection === "photo" && "bg-blue-600"
                }`}
                onClick={() => handleClick("photoid")}
              >
                Hồ sơ ảnh
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
          {activeSection === "admissioninformation" && <AdmissionInformation />}
          {activeSection === "learningprocess" && <LearningProcess />}
          {activeSection === "photoid" && <PhotoID />}
        </div>
      </div>
    </div>
  );
};

export default ProjfilePage;

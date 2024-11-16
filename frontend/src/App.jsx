// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserListPage from "./pages/UserListPage"; // Import UserListPage
import { UserIcon, DocumentTextIcon, CubeIcon, FolderIcon } from "@heroicons/react/24/outline"; // Hoặc @heroicons/react/24/solid
import AdbListPage from "./pages/AdbListPage";

function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 h-screen bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        <span>Admin</span>
                        <span className="text-yellow-500">Panel</span>
                    </h2>
                    <ul>
                        <li>
                            <Link to="/user" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <UserIcon className="w-5 h-5 mr-2" /> {/* Icon User */}
                                Quản lý Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/term" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <FolderIcon className="w-5 h-5 mr-2" />
                                Quản lý khối xét tuyển
                            </Link>
                        </li>
                        <li>
                            <Link to="/object" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <CubeIcon className="w-5 h-5 mr-2" />
                                Object
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <Routes>
                        <Route path="/user" element={<UserListPage />} />
                        <Route path="/term" element={<AdbListPage />} />
                        <Route path="/object" element={<h1 className="text-2xl font-bold mb-4">Object Page</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

// UploadForm.js
// import React, { useState } from "react";
// import axios from "axios";

// function UploadForm() {
//     const [image, setImage] = useState(null);
//     const [imageUrl, setImageUrl] = useState("");

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]); // Lấy file từ input
//     };

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append("image", image); // Gửi file trong formData

//         try {
//             const res = await axios.post("http://localhost:8080/api/upload", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             setImageUrl(res.data.imageUrl); // Lấy URL ảnh trả về từ Cloudinary
//         } catch (err) {
//             console.error("Error uploading image:", err);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageChange} accept="image/*" />
//             <button onClick={handleUpload}>Upload</button>
//             {imageUrl && (
//                 <div>
//                     <p>Ảnh đã upload:</p>
//                     <img src={imageUrl} alt="Uploaded" width="300" />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UploadForm;

//Lưu URL của ảnh vào MongoDB
// const Image = require('../models/Image');

// router.post('/upload', upload.single('image'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'Không có file nào được upload!' });
//   }

//   const newImage = new Image({
//     imageUrl: req.file.path, // Lưu URL ảnh
//   });

//   await newImage.save();

//   res.status(200).json({ imageUrl: req.file.path });
// });

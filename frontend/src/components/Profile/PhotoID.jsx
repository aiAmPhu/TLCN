// import { useState } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const PhotoID = () => {
//   const [cropper, setCropper] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [tempImages, setTempImages] = useState({});
//   const [validFileTypes, setValidFileTypes] = useState({});
//   const [currentImageType, setCurrentImageType] = useState(null);
//   const requiredFiles = [
//     "Hình 3x4",
//     "Ảnh CCCD mặt trước",
//     "Ảnh CCCD mặt sau",
//     "Học bạ lớp 10",
//     "Học bạ lớp 11",
//     "Học bạ HK1 - lớp 12",
//   ];

//   const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

//   const checkValidFile = (file) => {
//     const fileExtension = file.name.split(".").pop().toLowerCase();
//     return validImageExtensions.includes(fileExtension);
//   };

//   const handleFileUpload = (e, fileType) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!checkValidFile(file)) {
//       alert("Vui lòng chọn đúng file ảnh!");
//       setValidFileTypes((prev) => ({ ...prev, [fileType]: false }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       setCurrentImageType(fileType);
//       setImagePreview(reader.result);
//       setValidFileTypes((prev) => ({ ...prev, [fileType]: true }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleCrop = () => {
//     if (cropper) {
//       const croppedImage = cropper.getCroppedCanvas().toDataURL();
//       setTempImages((prev) => ({ ...prev, [currentImageType]: croppedImage }));
//       setImagePreview(null);
//       setCurrentImageType(null);
//     }
//   };

//   const handleSaveTemp = () => {
//     setTempImages((prev) => ({
//       ...prev,
//       [currentImageType]: imagePreview,
//     }));
//     setImagePreview(null);
//     setCurrentImageType(null);
//   };

//   const handleSaveAll = () => {
//     if (requiredFiles.every((file) => tempImages[file] && validFileTypes[file])) {
//       alert("Lưu thông tin thành công!");
//       console.log("Dữ liệu lưu:", tempImages);
//     } else {
//       alert("Vui lòng upload đủ tất cả các ảnh hợp lệ!");
//     }
//   };

//   const isAllFilesUploaded = requiredFiles.every(
//     (file) => tempImages[file] && validFileTypes[file]
//   );

//   const handleOpenPopup = (fileType) => {
//     setImagePreview(tempImages[fileType]);
//     setCurrentImageType(fileType);
//   };

//   const handleClosePopup = () => {
//     setImagePreview(null);
//     setCurrentImageType(null);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Upload Hình Ảnh</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {requiredFiles.map((fileType) => (
//           <div
//             key={fileType}
//             className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center"
//           >
//             <div className="w-32 h-32 bg-gray-200 border border-dashed rounded-md flex items-center justify-center overflow-hidden">
//               {tempImages[fileType] ? (
//                 <img
//                   src={tempImages[fileType]}
//                   alt={fileType}
//                   className="object-cover w-full h-full rounded-md"
//                   onClick={() => handleOpenPopup(fileType)}
//                 />
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <i className="fas fa-image text-blue-500 text-3xl"></i>
//                 </div>
//               )}
//             </div>
//             <div className="mt-4 w-full text-center">
//               <label className="block text-sm font-medium mb-2">{fileType}:</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileUpload(e, fileType)}
//                 className="p-2 border border-gray-300 rounded-md w-full"
//               />
//               {tempImages[fileType] ? (
//                 <div className="text-green-600 mt-2">Đã cập nhật</div>
//               ) : (
//                 <div className="text-red-600 mt-2">Chưa cập nhật</div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Popup chỉnh sửa ảnh */}
//       {imagePreview && (
//         <div className="popup fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
//             <button
//               onClick={handleClosePopup}
//               className="absolute top-2 right-2 bg-gray-300 text-black px-3 py-1 rounded-full"
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               Xử lý hình ảnh: {currentImageType}
//             </h2>
//             {currentImageType === "Hình 3x4" ? (
//               <>
//                 <Cropper
//                   src={imagePreview}
//                   style={{ height: 400, width: "100%" }}
//                   aspectRatio={4 / 6}
//                   guides={false}
//                   onInitialized={(instance) => setCropper(instance)}
//                 />
//                 <button
//                   onClick={handleCrop}
//                   className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   Cắt và Lưu Tạm
//                 </button>
//               </>
//             ) : (
//               <>
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full max-h-96 object-contain"
//                 />
//                 <button
//                   onClick={handleSaveTemp}
//                   className="w-full mt-4 py-2 bg-green-500 text-white rounded-md"
//                 >
//                   Lưu Tạm
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleSaveAll}
//         className={`mt-6 w-full py-3 font-semibold rounded-md ${
//           isAllFilesUploaded
//             ? "bg-blue-600 text-white"
//             : "bg-gray-400 text-gray-700 cursor-not-allowed"
//         }`}
//         disabled={!isAllFilesUploaded}
//       >
//         Lưu Thông Tin
//       </button>
//     </div>
//   );
// };

// export default PhotoID;

import { useState, useEffect } from "react";
import axios from "axios";

const PhotoID = () => {
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [personalPic, setPersonalPic] = useState(null);
    const [frontCCCD, setFrontCCCD] = useState(null);
    const [backCCCD, setBackCCCD] = useState(null);
    const [grade10Pic, setGrade10Pic] = useState(null);
    const [grade11Pic, setGrade11Pic] = useState(null);
    const [grade12Pic, setGrade12Pic] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isFetched = false;
        if (!token || tokenUser?.role !== "user") {
            // If no token or role is not admin, redirect to login
            window.location.href = "/404";
        }

        const fetchData = async () => {
            try {
                // Gọi API để lấy danh sách thông tin từ cơ sở dữ liệu
                const response = await axios.get("http://localhost:8080/api/photo/getAll");

                // Tìm kiếm thông tin dựa trên tokenUser.email
                const userPhoto = response.data.data.find((item) => item.email === tokenUser.email);
                setUser(userPhoto);
                //const userAdInfo = response.data.items?.find((item) => item.email === tokenUser.email);

                if (!isFetched && userPhoto) {
                    // Nếu tìm thấy, cập nhật formData
                    setPersonalPic(userPhoto.personalPic);
                    setFrontCCCD(userPhoto.frontCCCD);
                    setBackCCCD(userPhoto.backCCCD);
                    setGrade10Pic(userPhoto.grade10Pic);
                    setGrade11Pic(userPhoto.grade11Pic);
                    setGrade12Pic(userPhoto.grade12Pic);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        return () => {
            isFetched = true; // Hủy bỏ nếu component bị unmount
        };
    }, [tokenUser.email]);
    const handleUpload = async (fieldName, file, setFileUrl) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setFileUrl(res.data.imageUrl); // Cập nhật URL ảnh trả về từ server
            console.log(`${fieldName} uploaded successfully:`, res.data.imageUrl);
        } catch (err) {
            console.error(`Error uploading ${fieldName}:`, err);
        }
    };
    const handleSubmit = async () => {
        if (isEditing) {
            updateInformation();
        } else {
            submitInformation();
        }
    };
    const submitInformation = async () => {
        const data = {
            personalPic,
            frontCCCD,
            backCCCD,
            grade10Pic,
            grade11Pic,
            grade12Pic,
            email: tokenUser.email,
        };

        // Kiểm tra nếu có bất kỳ giá trị nào là null hoặc undefined
        const missingFields = Object.entries(data)
            .filter(([key, value]) => !value) // Lọc các trường có giá trị null, undefined hoặc falsey
            .map(([key]) => key); // Lấy tên các trường bị thiếu

        if (missingFields.length > 0) {
            alert(`Please upload the following images: ${missingFields.join(", ")}`);
            return;
        }

        console.log("All images uploaded:", data);
        try {
            // Make a POST request with the form data
            await axios.post("http://localhost:8080/api/photo/add", data);
            alert("Data added successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error while submitting data:", error.message);
            alert(error.message || "Failed to add data. Please try again.");
        }
    };
    const updateInformation = async () => {
        try {
            if (user) {
                const data = {
                    personalPic,
                    frontCCCD,
                    backCCCD,
                    grade10Pic,
                    grade11Pic,
                    grade12Pic,
                    email: tokenUser.email,
                };
                // Gửi yêu cầu cập nhật
                const updateResponse = await axios.put(`http://localhost:8080/api/photo/update/${user._id}`, data);
                // Thông báo thành công
                alert(updateResponse.data.message || "Data updated successfully!");
            } else {
                alert("No data available.");
            }
        } catch (error) {
            console.error("Error while submitting data:", error.response?.data?.message || error.message);
            alert("Failed to update data. Please try again.");
        }
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Upload Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {[
                    { label: "Personal Picture", file: personalPic, setFile: setPersonalPic },
                    { label: "Front CCCD", file: frontCCCD, setFile: setFrontCCCD },
                    { label: "Back CCCD", file: backCCCD, setFile: setBackCCCD },
                    { label: "Grade 10 Picture", file: grade10Pic, setFile: setGrade10Pic },
                    { label: "Grade 11 Picture", file: grade11Pic, setFile: setGrade11Pic },
                    { label: "Grade 12 Picture", file: grade12Pic, setFile: setGrade12Pic },
                ].map(({ label, file, setFile }, index) => (
                    <div key={index} className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center gap-4">
                        <label className="font-semibold text-gray-700">{label}</label>
                        <div className="flex flex-col items-center gap-2 w-full">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept="image/*"
                                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <button
                                type="button"
                                onClick={() => handleUpload(label, file, setFile)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Upload
                            </button>
                        </div>
                        {file && (
                            <div className="mt-4">
                                <img src={file} alt={label} className="w-32 h-32 rounded-lg shadow-md object-cover" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                >
                    {isEditing ? "Cập nhật" : "Lưu thông tin"}
                </button>
            </div>
        </div>
    );
};

export default PhotoID;

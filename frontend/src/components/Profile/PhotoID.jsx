import { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoID = () => {
  const [cropper, setCropper] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tempImages, setTempImages] = useState({});
  const [validFileTypes, setValidFileTypes] = useState({});
  const [currentImageType, setCurrentImageType] = useState(null);
  const requiredFiles = [
    "Hình 3x4",
    "Ảnh CCCD mặt trước",
    "Ảnh CCCD mặt sau",
    "Học bạ lớp 10",
    "Học bạ lớp 11",
    "Học bạ HK1 - lớp 12",
  ];

  const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

  const checkValidFile = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validImageExtensions.includes(fileExtension);
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!checkValidFile(file)) {
      alert("Vui lòng chọn đúng file ảnh!");
      setValidFileTypes((prev) => ({ ...prev, [fileType]: false }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImageType(fileType);
      setImagePreview(reader.result);
      setValidFileTypes((prev) => ({ ...prev, [fileType]: true }));
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setTempImages((prev) => ({ ...prev, [currentImageType]: croppedImage }));
      setImagePreview(null);
      setCurrentImageType(null);
    }
  };

  const handleSaveTemp = () => {
    setTempImages((prev) => ({
      ...prev,
      [currentImageType]: imagePreview,
    }));
    setImagePreview(null);
    setCurrentImageType(null);
  };

  const handleSaveAll = () => {
    if (requiredFiles.every((file) => tempImages[file] && validFileTypes[file])) {
      alert("Lưu thông tin thành công!");
      console.log("Dữ liệu lưu:", tempImages);
    } else {
      alert("Vui lòng upload đủ tất cả các ảnh hợp lệ!");
    }
  };

  const isAllFilesUploaded = requiredFiles.every(
    (file) => tempImages[file] && validFileTypes[file]
  );

  const handleOpenPopup = (fileType) => {
    setImagePreview(tempImages[fileType]);
    setCurrentImageType(fileType);
  };

  const handleClosePopup = () => {
    setImagePreview(null);
    setCurrentImageType(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Upload Hình Ảnh</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requiredFiles.map((fileType) => (
          <div
            key={fileType}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-gray-200 border border-dashed rounded-md flex items-center justify-center overflow-hidden">
              {tempImages[fileType] ? (
                <img
                  src={tempImages[fileType]}
                  alt={fileType}
                  className="object-cover w-full h-full rounded-md"
                  onClick={() => handleOpenPopup(fileType)}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <i className="fas fa-image text-blue-500 text-3xl"></i>
                </div>
              )}
            </div>
            <div className="mt-4 w-full text-center">
              <label className="block text-sm font-medium mb-2">{fileType}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, fileType)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              {tempImages[fileType] ? (
                <div className="text-green-600 mt-2">Đã cập nhật</div>
              ) : (
                <div className="text-red-600 mt-2">Chưa cập nhật</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Popup chỉnh sửa ảnh */}
      {imagePreview && (
        <div className="popup fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 bg-gray-300 text-black px-3 py-1 rounded-full"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Xử lý hình ảnh: {currentImageType}
            </h2>
            {currentImageType === "Hình 3x4" ? (
              <>
                <Cropper
                  src={imagePreview}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={4 / 6}
                  guides={false}
                  onInitialized={(instance) => setCropper(instance)}
                />
                <button
                  onClick={handleCrop}
                  className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Cắt và Lưu Tạm
                </button>
              </>
            ) : (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain"
                />
                <button
                  onClick={handleSaveTemp}
                  className="w-full mt-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Lưu Tạm
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleSaveAll}
        className={`mt-6 w-full py-3 font-semibold rounded-md ${
          isAllFilesUploaded
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        disabled={!isAllFilesUploaded}
      >
        Lưu Thông Tin
      </button>
    </div>
  );
};

export default PhotoID;

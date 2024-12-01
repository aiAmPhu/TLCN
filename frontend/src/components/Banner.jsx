import { useState } from "react";

const Banner = () => {
  // Danh sách các banner
  const banners = [
    "../../public/banner_1.jpeg",
    "../../public/banner_2.jpeg",
    "../../public/banner_3.jpeg",
    "../../public/banner_4.jpeg",
  ];

  // Trạng thái quản lý index của banner hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chuyển đến banner trước
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Chuyển đến banner kế tiếp
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mt-[96px] relative">
      {/* Hiển thị banner hiện tại */}
      <img
        src={banners[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="w-full h-64 object-cover"
      />

      {/* Nút mũi tên bên trái */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-500"
      >
        &#8592;
      </button>

      {/* Nút mũi tên bên phải */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-500"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Banner;

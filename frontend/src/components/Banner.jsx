import { useState, useEffect } from "react";

const Banner = () => {
  const banners = ["/banner_1.png", "/banner_2.png", "/banner_3.png"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval); 
  }, [currentIndex]); 

  // CSS nội tuyến
  const styles = {
    container: {
      position: "relative",
      marginTop: "96px",
    },
    image: {
      width: "100%",
      height: "395px",
      objectFit: "cover",
      transition: "all 0.5s ease-in-out",
    },
    button: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#4B5563",
      color: "#FFF",
      padding: "10px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
    },
    leftButton: {
      left: "16px",
    },
    rightButton: {
      right: "16px",
    },
    indicators: {
      position: "absolute",
      bottom: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
    },
    indicator: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#D1D5DB",
      cursor: "pointer",
    },
    activeIndicator: {
      backgroundColor: "#1F2937",
    },
  };

  return (
    <div style={styles.container}>
      {/* Hiển thị banner hiện tại */}
      <img
        src={banners[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        style={styles.image}
      />

      {/* Nút mũi tên bên trái */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? banners.length - 1 : prevIndex - 1
          )
        }
        style={{ ...styles.button, ...styles.leftButton }}
      >
        &#8592;
      </button>

      {/* Nút mũi tên bên phải */}
      <button
        onClick={handleNext}
        style={{ ...styles.button, ...styles.rightButton }}
      >
        &#8594;
      </button>

      {/* Nút điều khiển hiển thị */}
      <div style={styles.indicators}>
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              ...styles.indicator,
              ...(index === currentIndex ? styles.activeIndicator : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

import { useState, useEffect } from "react";
import axios from "axios";

const LearningProcess = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState({});
  const [schools, setSchools] = useState({});
  const [formData, setFormData] = useState({
    grade10: { province: "", district: "", school: "" },
    grade11: { province: "", district: "", school: "" },
    grade12: { province: "", district: "", school: "" },
    graduationYear: "2023",
    priorityGroup: "",
  });
  const [errors, setErrors] = useState({
    grade10: {},
    grade11: {},
    grade12: {},
    graduationYear: "",
    priorityGroup: "",
  });

  // Fetch provinces on initial render
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/");
        setProvinces(response.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts by province
  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      return response.data.districts || [];
    } catch (error) {
      console.error("Failed to fetch districts:", error);
      return [];
    }
  };

  // Mock API to fetch schools
  const fetchSchools = async (districtCode) => {
    return [
      { code: "1", name: `School A in District ${districtCode}` },
      { code: "2", name: `School B in District ${districtCode}` },
    ];
  };

  // Handle input changes
  const handleInputChange = async (event, grade, field) => {
    const value = event.target.value;

    if (field === "province") {
      const selectedProvince = provinces.find((p) => p.name === value);
      if (selectedProvince) {
        const fetchedDistricts = await fetchDistricts(selectedProvince.code);
        setDistricts((prev) => ({ ...prev, [grade]: fetchedDistricts }));
        setSchools((prev) => ({ ...prev, [grade]: [] }));
        setFormData((prev) => ({
          ...prev,
          [grade]: { province: value, district: "", school: "" },
        }));
      }
    } else if (field === "district") {
      const selectedDistrict = districts[grade]?.find((d) => d.name === value);
      if (selectedDistrict) {
        const fetchedSchools = await fetchSchools(selectedDistrict.code);
        setSchools((prev) => ({ ...prev, [grade]: fetchedSchools }));
        setFormData((prev) => ({
          ...prev,
          [grade]: { ...prev[grade], district: value, school: "" },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [grade]: { ...prev[grade], [field]: value },
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = { grade10: {}, grade11: {}, grade12: {}, graduationYear: "", priorityGroup: "" };

    ["grade10", "grade11", "grade12"].forEach((grade) => {
      if (!formData[grade].province) {
        newErrors[grade].province = "Vui lòng chọn Tỉnh/Thành phố.";
      }
      if (!formData[grade].district) {
        newErrors[grade].district = "Vui lòng chọn Huyện/Quận.";
      }
      if (!formData[grade].school) {
        newErrors[grade].school = "Vui lòng chọn Trường THPT.";
      }
    });

    if (!formData.priorityGroup) {
      newErrors.priorityGroup = "Vui lòng chọn Đối Tượng Ưu Tiên.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((gradeErrors) =>
      typeof gradeErrors === "object"
        ? Object.keys(gradeErrors).length === 0
        : !gradeErrors
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Gửi thông tin thành công!");
    } else {
      alert("Vui lòng kiểm tra lại thông tin nhập!");
    }
  };

  // Render inputs for each grade
  const renderGradeInputs = (grade) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Lớp {grade}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tỉnh/Thành phố */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Tỉnh/Thành phố</label>
          <select
            value={formData[`grade${grade}`].province}
            onChange={(e) => handleInputChange(e, `grade${grade}`, "province")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Chọn tỉnh/thành</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
          {errors[`grade${grade}`]?.province && (
            <p className="text-red-500 text-sm">{errors[`grade${grade}`].province}</p>
          )}
        </div>

        {/* Huyện/Quận */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Huyện/Quận</label>
          <select
            value={formData[`grade${grade}`].district}
            onChange={(e) => handleInputChange(e, `grade${grade}`, "district")}
            disabled={!formData[`grade${grade}`].province}
            className={`w-full px-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              !formData[`grade${grade}`].province ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "border-gray-300"
            }`}
          >
            <option value="">Chọn huyện/quận</option>
            {districts[`grade${grade}`]?.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {errors[`grade${grade}`]?.district && (
            <p className="text-red-500 text-sm">{errors[`grade${grade}`].district}</p>
          )}
        </div>

        {/* Trường THPT */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Trường THPT</label>
          <select
            value={formData[`grade${grade}`].school}
            onChange={(e) => handleInputChange(e, `grade${grade}`, "school")}
            disabled={!formData[`grade${grade}`].district}
            className={`w-full px-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              !formData[`grade${grade}`].district ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "border-gray-300"
            }`}
          >
            <option value="">Chọn trường THPT</option>
            {schools[`grade${grade}`]?.map((school) => (
              <option key={school.code} value={school.name}>
                {school.name}
              </option>
            ))}
          </select>
          {errors[`grade${grade}`]?.school && (
            <p className="text-red-500 text-sm">{errors[`grade${grade}`].school}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Quá Trình Học Tập Của Thí Sinh</h1>
        <div className="p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
          {["10", "11", "12"].map((grade) => renderGradeInputs(grade))}

          <div className="mb-6">
            <label className="block font-medium mb-1 text-gray-700">Đối Tượng Ưu Tiên</label>
            <select
              value={formData.priorityGroup}
              onChange={(e) => setFormData({ ...formData, priorityGroup: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Chọn đối tượng ưu tiên</option>
              <option value="1">Nhóm 1</option>
              <option value="2">Nhóm 2</option>
              <option value="3">Nhóm 3</option>
            </select>
            {errors.priorityGroup && (
              <p className="text-red-500 text-sm">{errors.priorityGroup}</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            Gửi thông tin
          </button>
        </div>
      </section>
    </div>
  );
};

export default LearningProcess;

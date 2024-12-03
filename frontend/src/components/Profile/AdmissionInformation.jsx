import { useState } from "react";

const AdmissionInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Nam",
    birthPlace: "",
    phone:"",
    email: "",
    parentEmail: "",
    idNumber: "",
    idIssueDate: "",
    idIssuePlace: "",
    province: "",
    district: "",
    commune: "",
    houseNumber: "",
    streetName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn không gửi form
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      if (index < form.elements.length - 1) {
        form.elements[index + 1]?.focus(); // Chuyển focus sang input kế tiếp
      } else {
        e.target.blur(); // Nếu ở trường cuối, bỏ focus (hoặc submit form)
      }
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "firstName":
        newErrors.firstName = value ? "" : "Họ và Họ đệm is required.";
        break;
      case "lastName":
        newErrors.lastName = value ? "" : "Tên is required.";
        break;
      case "birthDate":
        newErrors.birthDate = value ? "" : "Ngày sinh is required.";
        break;
      case "birthPlace":
        if (!value) newErrors.birthPlace = "Nơi sinh là bắt buộc";
        break;
      case "phone":
        newErrors.phone = value && /^[0-9]{10}$/.test(value)
          ? ""
          : "Số điện thoại phải nhập đủ 10 số.";
        break;
      case "email":
        newErrors.email = value && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? ""
          : "Email không hợp lệ.";
        break;
      case "idNumber":
        newErrors.idNumber = value && /^[0-9]{9,12}$/.test(value)
          ? "" 
          : "CMND/CCCD must be a valid number between 9 to 12 digits.";
        break;
      case "idIssueDate":
        newErrors.idIssueDate = value ? "" : "Ngày cấp CMND/CCCD is required.";
        break;
      case "idIssuePlace":
        newErrors.idIssuePlace = value ? "" : "Nơi cấp CMND/CCCD is required.";
        break;
      case "province":
        newErrors.province = value ? "" : "Tỉnh (Thành phố) is required.";
        break;
      case "district":
        newErrors.district = value ? "" : "Huyện (Quận) is required.";
        break;
      case "houseNumber":
        newErrors.houseNumber = value ? "" : "Số nhà is required.";
        break;
      case "streetName":
        newErrors.streetName = value ? "" : "Tên đường is required.";
        break;     
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let newErrors = {}; // Lưu các lỗi mới
  
    // Kiểm tra từng trường trong formData
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      switch (field) {
        case "firstName":
          if (!value) newErrors.firstName = "Họ và Họ đệm là bắt buộc.";
          break;
        case "lastName":
          if (!value) newErrors.lastName = "Tên là bắt buộc.";
          break;
        case "birthDate":
          if (!value) newErrors.birthDate = "Ngày sinh là bắt buộc.";
          break;
        case "birthPlace":
          if (!value) newErrors.birthPlace = "Nơi sinh là bắt buộc";
          break;
        case "phone":
          if (!value || !/^[0-9]{10}$/.test(value))
            newErrors.phone = "Số điện thoại phải nhập đủ 10 số.";
          break;
        case "email":
          if (!value || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
            newErrors.email = "Email không hợp lệ.";
          break;
        case "idNumber":
          if (!value || !/^[0-9]{9,12}$/.test(value))
            newErrors.idNumber = "CMND/CCCD phải là số từ 9 đến 12 ký tự.";
          break;
        case "idIssueDate":
          if (!value) newErrors.idIssueDate = "Ngày cấp CMND/CCCD là bắt buộc.";
          break;
        case "idIssuePlace":
          if (!value) newErrors.idIssuePlace = "Nơi cấp CMND/CCCD là bắt buộc.";
          break;
        case "province":
          if (!value) newErrors.province = "Tỉnh/Thành phố là bắt buộc.";
          break;
        case "district":
          if (!value) newErrors.district = "Huyện/Quận là bắt buộc.";
          break;
        case "commune":
          if (!value) newErrors.commune = "Xã/Phường là bắt buộc.";
          break;
        case "houseNumber":
          if (!value) newErrors.houseNumber = "Số nhà là bắt buộc.";
          break;
        case "streetName":
          if (!value) newErrors.streetName = "Tên đường là bắt buộc.";
          break;
        default:
          break;
      }
    });
  
    setErrors(newErrors); // Cập nhật các lỗi
  
    // Kiểm tra nếu không có lỗi
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      // Tiến hành xử lý dữ liệu (gửi lên server hoặc tiếp tục logic khác)
    } else {
      console.log("Form có lỗi:", newErrors);
    }
  };
  

  return (
    <div className="flex-1 p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Thông tin xét tuyển
        </h1>
        <form className="bg-white shadow-md rounded-lg p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Họ và Họ đệm</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}

                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và họ đệm"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tên</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nơi sinh</label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nơi sinh"
              />
              {errors.birthPlace && <p className="text-red-500 text-sm">{errors.birthPlace}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Additional form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email phụ huynh</label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email phụ huynh"
              />
              {errors.parentEmail && <p className="text-red-500 text-sm">{errors.parentEmail}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">CMND/CCCD</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số CMND/CCCD"
              />
              {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Ngày cấp CMND/CCCD</label>
              <input
                type="date"
                name="idIssueDate"
                value={formData.idIssueDate}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.idIssueDate && <p className="text-red-500 text-sm">{errors.idIssueDate}</p>}
            </div>

            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">Nơi cấp CMND/CCCD</label>
              <input
                type="text"
                name="idIssuePlace"
                value={formData.idIssuePlace}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nơi cấp"
              />
              {errors.idIssuePlace && <p className="text-red-500 text-sm">{errors.idIssuePlace}</p>}
            </div> */}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Nơi cấp CMND/CCCD</label>
              <select
                type="text"
                name="idIssuePlace"
                value={formData.idIssuePlace}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg  p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nơi cấp"
              >
                <option>CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI</option>
                <option>BỘ CÔNG AN</option>
              </select>
            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tỉnh (Thành phố)</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tỉnh/thành phố"
              />
              {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Huyện (Quận)</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập huyện/quận"
              />
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Xã (Phường)</label>
              <input
                type="text"
                name="commune"
                value={formData.commune}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập xã/phường"
              />
              {errors.commune && <p className="text-red-500 text-sm">{errors.commune}</p>}
            </div>
          </div>

          {/* Địa chỉ báo tin */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Địa chỉ báo tin</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập địa chỉ báo tin"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Số nhà và Tên đường (thôn, xóm, ấp) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Số nhà</label>
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số nhà"
              />
              {errors.houseNumber && <p className="text-red-500 text-sm">{errors.houseNumber}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tên đường (thôn, xóm, ấp)</label>
              <input
                type="text"
                name="streetName"
                value={formData.streetName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên đường (thôn, xóm, ấp)"
              />
              {errors.streetName && <p className="text-red-500 text-sm">{errors.streetName}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Gửi thông tin
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdmissionInformation;
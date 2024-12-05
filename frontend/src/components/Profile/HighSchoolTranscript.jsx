import { useState, useRef } from "react";

const HighSchoolTranscript = () => {
  const subjects = [
    "Toán",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Tin học",
    "Ngữ văn",
    "Lịch sử",
    "Địa lý",
    "Tiếng Anh",
    "Giáo dục Công dân",
    "Công nghệ",
    "Giáo dục Quốc phòng An Ninh",
  ];

  const years = [
    { label: "Lớp 10", color: "bg-green-100", fields: ["học kỳ 1", "học kỳ 2"] },
    { label: "Lớp 11", color: "bg-blue-100", fields: ["học kỳ 1", "học kỳ 2"] },
    { label: "Lớp 12", color: "bg-red-100", fields: ["học kỳ 1"] },
  ];

  const [grades, setGrades] = useState({});
  const [errors, setErrors] = useState({});
  const inputsRef = useRef([]);

  const handleInputChange = (subjectIndex, yearIndex, field, value) => {
    const newGrades = { ...grades };
    const newErrors = { ...errors };

    // Kiểm tra lỗi (chỉ cho phép giá trị từ 0 đến 10)
    if (value < 0 || value > 10) {
      newErrors[`${subjectIndex}-${yearIndex}-${field}`] = "Điểm phải từ 0 đến 10";
    } else {
      delete newErrors[`${subjectIndex}-${yearIndex}-${field}`];
    }

    // Lưu giá trị nhập vào
    if (!newGrades[subjectIndex]) newGrades[subjectIndex] = {};
    if (!newGrades[subjectIndex][yearIndex]) newGrades[subjectIndex][yearIndex] = {};
    newGrades[subjectIndex][yearIndex][field] = parseFloat(value) || "";

    setGrades(newGrades);
    setErrors(newErrors);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index + 1 < inputsRef.current.length) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const calculateAverage5Semesters = (subjectIndex) => {
    let totalScore = 0;
    let count = 0;

    years.forEach((year, yearIndex) => {
      if (year.fields.includes("học kỳ 1")) {
        const hk1 = grades[subjectIndex]?.[yearIndex]?.["học kỳ 1"] || 0;
        totalScore += hk1;
        count++;
      }
      if (year.fields.includes("học kỳ 2")) {
        const hk2 = grades[subjectIndex]?.[yearIndex]?.["học kỳ 2"] || 0;
        totalScore += hk2;
        count++;
      }
    });

    return count > 0 ? (totalScore / count).toFixed(2) : "0.0";
  };

  return (
    <div className="p-6">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">STT</th>
            <th className="border border-gray-300 p-2">Môn học/các hoạt động giáo dục</th>
            {years.map((year, yearIndex) =>
              year.fields.map((field, fieldIndex) => (
                <th
                  key={`${yearIndex}-${fieldIndex}`}
                  className={`border border-gray-300 p-2 ${year.color}`}
                >
                  {year.label}<br />{field}
                </th>
              ))
            )}
            <th className="border border-gray-300 p-2 bg-yellow-100">TB 5 Học kỳ</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, subjectIndex) => (
            <tr key={subjectIndex}>
              <td className="border border-gray-300 p-2 text-center">{subjectIndex + 1}</td>
              <td className="border border-gray-300 p-2">{subject}</td>
              {years.map((year, yearIndex) =>
                year.fields.map((field, fieldIndex) => (
                  <td
                    key={`${subjectIndex}-${yearIndex}-${fieldIndex}`}
                    className="border border-gray-300 p-2 text-center"
                  >
                    <input
                      type="number"
                      step="0.1"
                      className="w-full border border-gray-300 rounded p-1 text-center"
                      value={
                        grades[subjectIndex]?.[yearIndex]?.[field] ?? ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          subjectIndex,
                          yearIndex,
                          field,
                          e.target.value
                        )
                      }
                      ref={(el) =>
                        inputsRef.current.push(el)
                      }
                      onKeyDown={(e) =>
                        handleKeyPress(
                          e,
                          inputsRef.current.indexOf(
                            inputsRef.current.find(
                              (ref) => ref === e.target
                            )
                          )
                        )
                      }
                    />
                    {errors[`${subjectIndex}-${yearIndex}-${field}`] && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors[`${subjectIndex}-${yearIndex}-${field}`]}
                      </div>
                    )}
                  </td>
                ))
              )}
              <td className="border border-gray-300 p-2 text-center font-bold">
                {calculateAverage5Semesters(subjectIndex)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => console.log("Thông tin học bạ:", grades)}
        >
          Lưu thông tin học bạ
        </button>
      </div>
    </div>
  );
};

export default HighSchoolTranscript;

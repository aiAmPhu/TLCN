// Modal.js
import React from "react";
import { format } from "date-fns";
const InfoAdyModal = ({ ady, onClose }) => {
    if (!ady) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết năm tuyển sinh</h2>
                <div>
                    <p>
                        <strong>ID:</strong> {ady.yearId}
                    </p>
                    <p>
                        <strong>Tên:</strong> {ady.yearName}
                    </p>
                    <p>
                        <strong>Thời gian bắt đầu:</strong> {format(new Date(ady.startDate), "dd/MM/yyyy")}
                    </p>
                    <p>
                        <strong>Thời gian kết thúc:</strong> {format(new Date(ady.endDate), "dd/MM/yyyy")}
                    </p>
                    {/* Hiển thị Majors dưới dạng bảng */}
                    <div>
                        <strong>Ngành học:</strong>
                        {Array.isArray(ady.yearMajors) && ady.yearMajors.length > 0 ? (
                            <table className="table-auto border-collapse border border-gray-500 mt-2 w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-500 px-4 py-2" colSpan={4}>
                                            Ngành
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ady.yearMajors
                                        .reduce((rows, major, index) => {
                                            // Group items into rows of 4
                                            if (index % 4 === 0) rows.push([]);
                                            rows[rows.length - 1].push(major);
                                            return rows;
                                        }, [])
                                        .map((row, rowIndex) => (
                                            <tr key={rowIndex} className="hover:bg-gray-100">
                                                {row.map((major, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className="border border-gray-500 px-4 py-2 text-center"
                                                    >
                                                        {major}
                                                    </td>
                                                ))}
                                                {/* Add empty cells to fill row if less than 4 items */}
                                                {row.length < 4 &&
                                                    Array.from({ length: 4 - row.length }).map((_, emptyIndex) => (
                                                        <td
                                                            key={`empty-${rowIndex}-${emptyIndex}`}
                                                            className="border border-gray-500 px-4 py-2"
                                                        ></td>
                                                    ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Không tìm thấy</p>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoAdyModal;

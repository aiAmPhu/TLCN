// Modal.js
import React from "react";

const InfoAdyModal = ({ ady, onClose }) => {
    if (!ady) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Admission Year Details</h2>
                <div>
                    <p>
                        <strong>ID:</strong> {ady.yearId}
                    </p>
                    <p>
                        <strong>Name:</strong> {ady.yearName}
                    </p>
                    <p>
                        <strong>Start Date:</strong> {ady.startDate}
                    </p>
                    <p>
                        <strong>End Date:</strong> {ady.endDate}
                    </p>
                    {/* Hiển thị Majors dưới dạng bảng */}
                    <div>
                        <strong>Majors:</strong>
                        {Array.isArray(ady.majorCombination) && ady.majorCombination.length > 0 ? (
                            <table className="table-auto border-collapse border border-gray-500 mt-2 w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-500 px-4 py-2">#</th>
                                        <th className="border border-gray-500 px-4 py-2">Major</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ady.majorCombination.map((major, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border border-gray-500 px-4 py-2 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-500 px-4 py-2">{major}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No majors available</p>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoAdyModal;

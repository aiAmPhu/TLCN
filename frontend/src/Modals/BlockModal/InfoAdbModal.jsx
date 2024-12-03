// Modal.js
import React from "react";

const InfoAdbModal = ({ adb, onClose }) => {
    if (!adb) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết khối xét tuyển</h2>
                <div>
                    <p>
                        <strong>ID:</strong> {adb.admissionBlockId}
                    </p>
                    <p>
                        <strong>Khối:</strong> {adb.admissionBlockName}
                    </p>
                    <p>
                        <strong>Môn thứ 1:</strong> {adb.admissionBlockSubject1}
                    </p>
                    <p>
                        <strong>Môn thứ 2:</strong> {adb.admissionBlockSubject2}
                    </p>
                    <p>
                        <strong>Môn thứ 3:</strong> {adb.admissionBlockSubject3}
                    </p>
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

export default InfoAdbModal;

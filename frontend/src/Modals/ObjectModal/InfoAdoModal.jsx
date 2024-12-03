// Modal.js
import React from "react";

const InfoAdoModal = ({ ado, onClose }) => {
    if (!ado) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Xem chi tiết đối tượng ưu tiên</h2>
                <div>
                    <p>
                        <strong>ID:</strong> {ado.objectId}
                    </p>
                    <p>
                        <strong>Đối tượng:</strong> {ado.objectName}
                    </p>
                    <p>
                        <strong>Điểm:</strong> {ado.objectScored}
                    </p>
                    <p>
                        <strong>Mô tả:</strong> {ado.objectDescription}
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

export default InfoAdoModal;

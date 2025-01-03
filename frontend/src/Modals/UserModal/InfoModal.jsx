// Modal.js
import React from "react";

const InfoModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết người dùng</h2>
                <div>
                    <p>
                        <strong>Tên:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Mật khẩu:</strong> {user.password}
                    </p>
                    <p>
                        <strong>Vai trò:</strong> {user.role}
                    </p>
                    <p>
                        <strong>Ảnh:</strong>
                        <img src={user.pic} className="ml-[100px] rounded-md" width="200" height="200" />
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

export default InfoModal;

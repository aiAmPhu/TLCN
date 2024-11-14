import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
    const [users, setUsers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // Trạng thái hiển thị Form
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        // Lấy danh sách người dùng khi load trang
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/getall");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    const handleAddClick = () => {
        setUserToEdit(null); // Không chỉnh sửa user nào (chế độ thêm mới)
        setIsFormVisible(true); // Hiển thị Form
    };

    const handleEditClick = (user) => {
        setUserToEdit(user); // Thiết lập user cần chỉnh sửa
        setIsFormVisible(true); // Hiển thị Form
    };

    const handleFormClose = () => {
        setIsFormVisible(false); // Ẩn Form khi đóng
        setUserToEdit(null); // Reset user cần chỉnh sửa
    };

    return (
        <div className="App">
            <h1>User Management</h1>

            {/* Chỉ hiển thị UserForm khi isFormVisible là true */}
            {isFormVisible && (
                <UserForm
                    userId={userToEdit?._id}
                    setUsers={setUsers}
                    setIsEditing={setIsFormVisible}
                    userToEdit={userToEdit}
                    onClose={handleFormClose} // Đóng Form khi hoàn tất thêm/sửa
                />
            )}

            <UserList
                users={users}
                setUsers={setUsers}
                onAddClick={handleAddClick} // Thêm nút Add vào UserList
                onEditClick={handleEditClick} // Chỉnh sửa User
            />
        </div>
    );
}

export default App;

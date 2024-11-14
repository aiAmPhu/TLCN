import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
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

    return (
        <div className="App">
            <h1>User Management</h1>
            <UserForm
                userId={userToEdit?._id}
                setUsers={setUsers}
                setIsEditing={setIsEditing}
                userToEdit={userToEdit}
            />
            <UserList users={users} setUsers={setUsers} setIsEditing={setIsEditing} setUserToEdit={setUserToEdit} />
        </div>
    );
}

export default App;

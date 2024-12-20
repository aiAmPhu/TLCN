// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PermissionList from "./PermissionList";

const PermissionListPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/getall");
                // Filter users by role "reviewer"
                const reviewerUsers = response.data.filter((user) => user.role === "reviewer");
                setUsers(reviewerUsers);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
        console.log(users);
    }, []);

    return (
        <div>
            <PermissionList users={users} setUsers={setUsers} />
        </div>
    );
};

export default PermissionListPage;

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, setUsers, userToEdit, setUserToEdit }}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

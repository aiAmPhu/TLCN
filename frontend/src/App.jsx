// App.js
import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
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
            <UserList users={users} setUsers={setUsers} />
        </div>
    );
}

export default App;

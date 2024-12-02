// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdbList from "./AdbList";

const AdbListPage = () => {
    const [adbs, setAdbs] = useState([]);

    useEffect(() => {
        const fetchAdbs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adbs/getall");
                setAdbs(response.data);
            } catch (error) {
                console.error("Error fetching admission block", error);
            }
        };

        fetchAdbs();
    }, []);

    return (
        <div>
            <AdbList adbs={adbs} setAdbs={setAdbs} />
        </div>
    );
};

export default AdbListPage;

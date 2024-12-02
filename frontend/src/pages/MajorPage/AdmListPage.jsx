// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdmList from "./AdmList";

const AdmListPage = () => {
    const [adms, setAdms] = useState([]);

    useEffect(() => {
        const fetchAdms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setAdms(response.data);
            } catch (error) {
                console.error("Error fetching admission major", error);
            }
        };

        fetchAdms();
    }, []);

    return (
        <div>
            <AdmList adms={adms} setAdms={setAdms} />
        </div>
    );
};

export default AdmListPage;

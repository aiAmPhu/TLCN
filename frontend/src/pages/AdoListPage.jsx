// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdoList from "../components/AdoList";

const AdoListPage = () => {
    const [ados, setAdos] = useState([]);

    useEffect(() => {
        const fetchAdos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/ados/getall");
                setAdos(response.data);
            } catch (error) {
                console.error("Error fetching object score", error);
            }
        };

        fetchAdos();
    }, []);

    return (
        <div>
            <AdoList ados={ados} setAdos={setAdos} />
        </div>
    );
};

export default AdoListPage;

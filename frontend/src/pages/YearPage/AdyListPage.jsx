// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdyList from "./AdyList";

const AdyListPage = () => {
    const [adys, setAdys] = useState([]);

    useEffect(() => {
        const fetchAdys = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adys/getall");
                setAdys(response.data);
            } catch (error) {
                console.error("Error while fetching", error);
            }
        };

        fetchAdys();
    }, []);

    return (
        <div>
            <AdyList adys={adys} setAdys={setAdys} />
        </div>
    );
};

export default AdyListPage;

// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdrList from "../components/AdrList";

const AdrListPage = () => {
    const [adrs, setAdrs] = useState([]);

    useEffect(() => {
        const fetchAdrs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adrs/getall");
                setAdrs(response.data);
            } catch (error) {
                console.error("Error fetching region score", error);
            }
        };

        fetchAdrs();
    }, []);

    return (
        <div>
            <AdrList adrs={adrs} setAdrs={setAdrs} />
        </div>
    );
};

export default AdrListPage;

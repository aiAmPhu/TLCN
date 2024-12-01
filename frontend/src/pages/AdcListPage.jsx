// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdcList from "../components/AdcList";

const AdcListPage = () => {
    const [adcs, setAdcs] = useState([]);

    useEffect(() => {
        const fetchAdcs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adcs/getall");
                setAdcs(response.data);
            } catch (error) {
                console.error("Error fetching admission score", error);
            }
        };

        fetchAdcs();
    }, []);

    return (
        <div>
            <AdcList adcs={adcs} setAdcs={setAdcs} />
        </div>
    );
};

export default AdcListPage;

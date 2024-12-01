// src/pages/UserListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdqList from "../components/AdqList";

const AdqListPage = () => {
    const [adqs, setAdqs] = useState([]);

    useEffect(() => {
        const fetchAdqs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adqs/getall");
                setAdqs(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu", error);
            }
        };

        fetchAdqs();
    }, []);

    return (
        <div>
            <AdqList adqs={adqs} setAdqs={setAdqs} />
        </div>
    );
};

export default AdqListPage;

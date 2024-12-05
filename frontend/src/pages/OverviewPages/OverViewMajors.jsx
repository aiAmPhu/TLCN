import React, { useEffect, useState } from "react";
import axios from "axios";

const AdmsList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setData(response.data); // Assuming the API returns an array of data
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">ADM List</h1>
            {data.length === 0 ? (
                <p>No data available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="border p-4 rounded shadow hover:shadow-md transition">
                            <h2 className="font-semibold text-lg mb-2">{item.majorName || "No Name"}</h2>
                            <p>
                                <strong>ID:</strong> {item.majorId || "N/A"}
                            </p>
                            <p>
                                <strong>Description:</strong> {item.majorDescription || "No Description"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdmsList;

// Modal.js
import React from "react";

const InfoAdmModal = ({ adm, onClose }) => {
    if (!adm) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Admission Major Details</h2>
                <div>
                    <p>
                        <strong>ID:</strong> {adm.majorId}
                    </p>
                    <p>
                        <strong>Code Name:</strong> {adm.majorCodeName}
                    </p>
                    <p>
                        <strong>Name:</strong> {adm.majorName}
                    </p>
                    <p>
                        <strong>Combination:</strong>{" "}
                        {Array.isArray(adm.majorCombination) ? adm.majorCombination.join(", ") : adm.majorCombination}
                    </p>
                    <p>
                        <strong>Descripstion:</strong> {adm.majorDescription}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoAdmModal;

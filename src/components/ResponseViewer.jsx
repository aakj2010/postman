import React from 'react';

const ResponseViewer = ({ response }) => {
    return (
        <div className="p-4 mt-4 border rounded-md shadow-md bg-white">
            <h3 className="text-lg font-bold">Status: {response?.status}</h3>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 text-sm overflow-auto">
                {JSON.stringify(response?.data, null, 2)}
            </pre>
        </div>
    );
};

export default ResponseViewer;

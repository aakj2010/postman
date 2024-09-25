import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RequestForm = ({ onSendRequest }) => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);
    const [body, setBody] = useState('');
    const [params, setParams] = useState([{ key: '', value: '' }]); // Params state
    const [bodyType, setBodyType] = useState('json'); // Default to JSON
    const [activeTab, setActiveTab] = useState('params'); // Default to Params tab

    const handleAddParam = () => {
        setParams([...params, { key: '', value: '' }]);
    };

    const handleRemoveParam = (index) => {
        setParams(params.filter((_, i) => i !== index));
    };

    const handleParamChange = (index, type, value) => {
        const updatedParams = params.map((param, i) =>
            i === index ? { ...param, [type]: value } : param
        );
        setParams(updatedParams);
    };

    const handleAddHeader = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const handleRemoveHeader = (index) => {
        setHeaders(headers.filter((_, i) => i !== index));
    };

    const handleHeaderChange = (index, type, value) => {
        const updatedHeaders = headers.map((header, i) =>
            i === index ? { ...header, [type]: value } : header
        );
        setHeaders(updatedHeaders);
    };

    const handleSendRequest = () => {
        // Filter out headers with empty keys
        const validHeaders = headers.filter(header => header.key.trim());

        // Handle JSON parsing for body
        let parsedBody = body;
        // Only process the body for methods that allow it (POST, PUT, DELETE)
        if (method !== 'GET' && bodyType === 'json') {
            try {
                parsedBody = JSON.parse(body); // Parse the body if JSON is selected
            } catch (e) {
                alert("Invalid JSON body");
                return;
            }
        }

        // Build URL with query parameters
        const queryString = params
            .filter(param => param.key.trim()) // Remove empty params
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join('&');
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        onSendRequest({ url: finalUrl, method, headers: validHeaders, body: parsedBody });
    };

    return (
        <div className="p-4 border w-4/5 mx-auto rounded-md shadow-md bg-white text-xs">
            <div className='flex gap-2 '>
                <div className='flex w-4/5 items-center gap-2 mb-2 border rounded-md'>
                    {/* Method Select */}
                    <select
                        className="w-[15%] p-2 rounded-md"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    {/* URL Input */}
                    <input
                        type="text"
                        placeholder="Enter URL"
                        className="w-full mr-2 p-2 border-l pl-2"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                {/* Send Request Button */}
                <button
                    className="bg-blue-500 w-1/5 focus:outline-none text-white p-2 mb-2 rounded-md hover:bg-blue-600"
                    onClick={handleSendRequest}
                >
                    Send Request
                </button>
            </div>

            {/* Tab Headers */}
            <div className="mb-4 flex gap-2 border-b">
                <button
                    className={`p-2 focus:outline-none ${activeTab === 'params' ? 'focus:outline-none border-b-2 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('params')}
                >
                    Query Params
                </button>
                <button
                    className={`p-2 focus:outline-none ${activeTab === 'headers' ? 'focus:outline-none border-b-2 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('headers')}
                >
                    Headers
                </button>
                <button
                    className={`p-2 focus:outline-none ${activeTab === 'body' ? 'focus:outline-none border-b-2 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('body')}
                >
                    Body
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'params' && (
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Params</h4>
                        {params.map((param, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Param Key"
                                    className="w-1/2 p-2 border rounded-md"
                                    value={param.key}
                                    onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Param Value"
                                    className="w-1/2 p-2 border rounded-md"
                                    value={param.value}
                                    onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                                />
                                <button
                                    className="bg-red-500 text-white p-2 focus:outline-none rounded-md"
                                    onClick={() => handleRemoveParam(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 focus:outline-none text-white p-2 rounded-md"
                            onClick={handleAddParam}
                        >
                            Add Param
                        </button>
                    </div>
                )}

                {activeTab === 'headers' && (
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Headers</h4>
                        {headers.map((header, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Header Key"
                                    className="w-1/2 p-2 border rounded-md"
                                    value={header.key}
                                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Header Value"
                                    className="w-1/2 p-2 border rounded-md"
                                    value={header.value}
                                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                                />
                                <button
                                    className="bg-red-500 focus:outline-none text-white p-2 rounded-md"
                                    onClick={() => handleRemoveHeader(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 focus:outline-none text-white p-2 rounded-md"
                            onClick={handleAddHeader}
                        >
                            Add Header
                        </button>
                    </div>
                )}

                {activeTab === 'body' && (
                    <div className="mb-4">
                        <div className='flex gap-2'>
                            <h4 className="text-lg font-semibold mb-2">Body</h4>
                            {/* Body Type Selector */}
                            <select
                                className="mb-2 p-2 border rounded-md"
                                value={bodyType}
                                onChange={(e) => setBodyType(e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>

                        {/* Body Input */}
                        <textarea
                            placeholder={bodyType === 'json' ? 'Enter JSON body' : 'Enter text body'}
                            className="w-full h-40 mb-2 p-2 border rounded-md"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
RequestForm.propTypes = {
    onSendRequest: PropTypes.func.isRequired, // onSendRequest must be a function
};

export default RequestForm;

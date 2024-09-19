import React from 'react'
import { useState } from 'react'

const RequestForm = ({ onSendRequest }) => {
    const [url, setUrl] = useState("");
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('');
    const [headers, setHeaders] = useState([]);

    const handleSendRequest = () => {
        onSendRequest({ url, method, headers, body });
    }
    return (
        <div className="p-4 border rounded-md shadow-md bg-white">
            <input
                type='text'
                placeholder='Enter URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mb-2 p-2 border rounded-md"
            />
            <select
                className="w-full mb-2 p-2 border rounded-md"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
            </select>
            <textarea
                placeholder="Request body"
                className="w-full mb-2 p-2 border rounded-md"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
                onClick={handleSendRequest}
            >
                Send Request
            </button>
        </div>
    )
}

export default RequestForm
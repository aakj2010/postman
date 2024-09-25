import PropTypes from 'prop-types'; // Import PropTypes

const ResponseViewer = ({ response }) => {
    return (
        <div className="p-4 mt-4 border max-h-64 overflow-y-scroll rounded-md shadow-md bg-white">
            <h3 className="text-lg font-bold">Status: {response?.status}</h3>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 text-sm overflow-auto">
                {JSON.stringify(response?.data, null, 2)}
            </pre>
        </div>
    );
};

// Define prop types for response
ResponseViewer.propTypes = {
    response: PropTypes.shape({
        status: PropTypes.number,
        data: PropTypes.any, // Use any here since response data could be an object, array, string, etc.
    }),
};

export default ResponseViewer;

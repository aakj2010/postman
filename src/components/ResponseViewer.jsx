import PropTypes from 'prop-types'; // Import PropTypes

const ResponseViewer = ({ response }) => {
  return (
    <div className="p-4 mt-4 dark:bg-gray-800 border max-h-[30rem] overflow-y-scroll rounded-md shadow-md bg-white">
      <h3
        className={`text-lg font-bold ${
          response?.status >= 200 && response?.status < 300
            ? "text-green-500"
            : response?.status >= 300 && response?.status < 400
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        Status: {response?.status}
      </h3>
      {response?.data && Object.keys(response.data).length > 0 && (
        <pre className="bg-gray-100 p-4 dark:bg-gray-800 rounded-md mt-2 text-sm overflow-auto">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      )}
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

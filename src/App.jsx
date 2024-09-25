import React, { useState } from 'react';
import './App.css'
import RequestForm from './components/RequestForm';
import ResponseViewer from './components/ResponseViewer';
import { sendRequest } from './services/apiService';

const App = () => {
  const [response, setResponse] = useState(null);

  const handleSendRequest = async (requestData) => {
    const res = await sendRequest(requestData);
    setResponse(res);
  };

  return (
    <div className="min-h-screen !container lg:!w-[120rem] !mx-auto flex flex-col items-center p-4">
      <div className="w-full max-w-4xl !mx-auto">
        <RequestForm onSendRequest={handleSendRequest} />
        {response && <ResponseViewer response={response} />}
      </div>
    </div>
  );
};

export default App;

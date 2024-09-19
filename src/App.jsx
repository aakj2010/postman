import { useState } from "react";
import RequestForm from "./components/RequestForm"
import { sendRequest } from "./services/api-service";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [response, setResponse] = useState(null);

  const handleSendRequest = async (requestData) => {
    const res = await sendRequest(requestData);
    setResponse(res);
  };
  return (
    <section className="min-h-screen w-screen container mx-auto flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Postman Clone</h1>
      <div className="w-full max-w-4xl lg:!w-4/5 mx-auto">
        <RequestForm onSendRequest={handleSendRequest} />
        {response && <ResponseViewer response={response} />}
      </div>
    </section>
  )
}

export default App

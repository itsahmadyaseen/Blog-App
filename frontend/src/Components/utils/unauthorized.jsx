import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/my-blogs");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          403 - Unauthorized
        </h1>
        <p className="text-gray-700 mb-4">
          You do not have permission to perform this action
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;

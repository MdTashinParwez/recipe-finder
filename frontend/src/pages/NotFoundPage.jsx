import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-yellow-500 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
          It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/favorites"
            className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            My Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;



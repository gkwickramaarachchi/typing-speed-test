
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to GigsTyping</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your typing skills with our advanced typing test platform. Practice, improve, and track your progress with real-time feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Real-time Feedback</h3>
            <p className="text-gray-600">Get instant feedback on your typing speed, accuracy, and areas for improvement.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Visual Keyboard</h3>
            <p className="text-gray-600">Interactive keyboard display helps you learn proper finger placement and typing technique.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your improvement over time with detailed statistics and performance metrics.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/typing-test"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Start Typing Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;


import { Link } from "react-router-dom";
import { Keyboard, Clock, Target, Award, Zap, BookOpen, ChevronRight } from "lucide-react";

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

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Essential Typing Tips</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Keyboard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Master the Home Row</h3>
                    <p className="text-gray-600">Keep your fingers on ASDF and JKL; keys. This is your foundation for touch typing.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Focus on Accuracy First</h3>
                    <p className="text-gray-600">Build accuracy before speed. Slow down and ensure each keystroke is correct.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Practice Regularly</h3>
                    <p className="text-gray-600">Consistent practice for 15-30 minutes daily yields better results than long, irregular sessions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Advanced Techniques</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Build Rhythm</h3>
                    <p className="text-gray-600">Develop a consistent typing rhythm. It helps reduce errors and increases overall speed.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Set Goals</h3>
                    <p className="text-gray-600">Start with achievable targets and gradually increase them as you improve.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Practice With Us?</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Real-time Feedback</h3>
                  <p className="text-gray-600">Get instant feedback on your typing speed, accuracy, and areas for improvement.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Visual Keyboard</h3>
                  <p className="text-gray-600">Interactive keyboard display helps you learn proper finger placement.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-gray-600">Monitor your improvement over time with detailed statistics.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Improve?</h2>
              <p className="mb-6 opacity-90">Start your journey to faster, more accurate typing today.</p>
              <Link
                to="/typing-test"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Typing Test
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

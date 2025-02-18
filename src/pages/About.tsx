
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Typing Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">
            Our typing test application helps users improve their typing speed and accuracy through regular practice and real-time feedback.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
            <li>Multiple time duration options</li>
            <li>Various sample texts to practice with</li>
            <li>Real-time WPM, CPM, and accuracy tracking</li>
            <li>Virtual keyboard display</li>
            <li>Detailed results analysis</li>
          </ul>

          <p className="text-gray-600">
            Whether you're a beginner looking to improve your typing skills or a professional wanting to maintain your speed, our typing test provides the tools you need to succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

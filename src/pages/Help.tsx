
const Help = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help & Instructions</h1>
        
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Practice your typing skills with our typing test. Select a time duration, choose or add your own text, and start typing!
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Choose from predefined timer options (30s, 1m, 2m, 5m)</li>
              <li>Select from various sample texts or add your own</li>
              <li>Track your WPM (Words Per Minute), CPM (Characters Per Minute), and accuracy</li>
              <li>View your results after completing the test</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tips for Better Typing</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Maintain proper posture while typing</li>
              <li>Keep your fingers on the home row keys (ASDF JKL;)</li>
              <li>Practice regularly to improve your speed and accuracy</li>
              <li>Focus on accuracy first, speed will come naturally</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;

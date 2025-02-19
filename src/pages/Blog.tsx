
const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Typing Tips Blog</h1>
        
        <div className="space-y-6">
          <article className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="A laptop keyboard"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">The Importance of Touch Typing</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 20, 2024</p>
            <p className="text-gray-600">
              Touch typing is an essential skill in today's digital world. By using all ten fingers and maintaining proper hand positioning, you can significantly increase your typing speed and reduce fatigue. Start by mastering the home row keys (ASDF JKL;) and gradually build muscle memory for other key positions.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Person typing on laptop"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Ergonomics for Better Typing</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 18, 2024</p>
            <p className="text-gray-600">
              Proper ergonomics are crucial for long-term typing health. Keep your wrists elevated, maintain good posture, and position your screen at eye level. Take regular breaks and perform hand exercises to prevent repetitive strain injuries.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Typing practice"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Speed Building Techniques</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 16, 2024</p>
            <p className="text-gray-600">
              Focus on accuracy before speed. Start with simple exercises and gradually increase complexity. Practice with diverse texts to expose yourself to different word patterns. Set small, achievable goals and track your progress regularly.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;

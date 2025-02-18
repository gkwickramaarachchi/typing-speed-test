
const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Typing Tips Blog</h1>
        
        <div className="space-y-6">
          <article className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">The Importance of Touch Typing</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 20, 2024</p>
            <p className="text-gray-600">
              Touch typing is an essential skill in today's digital world. Learn how to improve your typing speed and efficiency.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Ergonomics for Typists</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 18, 2024</p>
            <p className="text-gray-600">
              Proper ergonomics can prevent strain and improve your typing performance. Discover the best practices for comfortable typing.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;

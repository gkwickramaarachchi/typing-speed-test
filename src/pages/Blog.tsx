
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Typing Tips Blog</h1>
        
        <div className="space-y-8">
          <article className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Person practicing typing skills"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">How to Improve Your Typing Skills as a Beginner: A Step-by-Step Guide</h2>
            <p className="text-sm text-gray-500 mb-4">Posted on April 22, 2024</p>
            <div className="text-gray-600 space-y-4">
              <p>
                Are you tired of hunting and pecking at your keyboard? Do you find yourself frustrated by slow typing speeds or frequent typos? If so, you're not alone. Learning how to type efficiently is one of the most valuable skills you can develop in today's digital world.
              </p>
              <h3 className="text-lg font-medium mt-4">Why Typing Skills Matter</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Increased Productivity: Faster typing means you can complete tasks quicker</li>
                <li>Professional Growth: Many jobs require strong typing skills</li>
                <li>Improved Focus: When you don't have to think about key locations, you can focus on content</li>
                <li>Reduced Physical Strain: Proper technique minimizes repetitive stress injuries</li>
              </ul>
              <Link to="/blog/improve-typing-skills" className="inline-block mt-4 text-blue-600 hover:underline">Read full article →</Link>
            </div>
          </article>

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
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
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

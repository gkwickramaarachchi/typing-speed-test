
import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy for GigsTyping</h1>
      
      <p className="mb-6">
        At GigsTyping, we value your privacy and are committed to protecting your personal information. 
        This Privacy Policy outlines how we collect, use, and safeguard your data when you use our typing speed test tool. 
        Please take a moment to read this policy carefully to understand our practices regarding your information.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          When using GigsTyping, we may collect certain information to enhance your experience and improve our services. 
          The types of data we collect include:
        </p>
        
        <div className="space-y-4 ml-4">
          <div>
            <h3 className="font-semibold mb-2">User Logging Data:</h3>
            <p className="text-gray-700">
              To analyze performance and provide accurate results, we log user activity during typing tests. 
              This includes keystrokes, typing speed, accuracy scores, and timestamps. 
              These logs are anonymized and do not contain personally identifiable information (PII).
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Device and Browser Information:</h3>
            <p className="text-gray-700">
              We automatically collect technical details such as your IP address, browser type, operating system, 
              and device information. This helps us ensure compatibility with various devices and optimize the 
              platform for better performance.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Cookies and Advertising Data:</h3>
            <p className="text-gray-700">
              Our website uses cookies to enhance user experience and display relevant advertisements. 
              Cookies help us understand how visitors interact with our site and tailor ads based on their interests. 
              You can manage cookie preferences through your browser settings.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-2">The data collected by GigsTyping is used solely for the following purposes:</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Providing and maintaining the functionality of the typing speed test tool.</li>
          <li>Analyzing usage patterns to improve features and overall user experience.</li>
          <li>Displaying personalized advertisements that align with your interests.</li>
          <li>Ensuring security and preventing fraudulent activities.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
        <p className="text-gray-700">
          We do not sell or rent your personal information to third parties. However, aggregated and anonymized 
          data may be shared with trusted partners, advertisers, or service providers to support operational needs 
          and deliver targeted advertising. Rest assured, any shared data will not include personally identifiable details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advertisements on GigsTyping</h2>
        <p className="text-gray-700">
          GigsTyping displays advertisements to support the free availability of our tool. These ads are served 
          by third-party ad networks that may use tracking technologies like cookies or web beacons to collect 
          non-personal data about your interactions with the ads. For more information about these practices, 
          please refer to the respective privacy policies of the ad networks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
        <p className="mb-2">You have control over how your data is used:</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>
            <span className="font-semibold">Opt-Out of Personalized Ads:</span> You can adjust your ad preferences 
            or opt out of personalized advertising by visiting the settings provided by the ad network or disabling 
            cookies in your browser.
          </li>
          <li>
            <span className="font-semibold">Manage Cookies:</span> Most browsers allow you to block or delete cookies. 
            However, doing so may affect the functionality of some features on our site.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security Measures</h2>
        <p className="text-gray-700">
          We implement industry-standard security measures to protect your data from unauthorized access, alteration, 
          disclosure, or destruction. While we strive to ensure the safety of your information, no method of 
          transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="text-gray-700">
          We reserve the right to update or modify this Privacy Policy at any time. If significant changes are made, 
          we will notify users via email or a prominent notice on our website prior to the changes taking effect. 
          We encourage you to review this page periodically to stay informed about our privacy practices.
        </p>
      </section>
    </div>
  );
};

export default Privacy;

'use client';

import Link from 'next/link';

const AboutUsPage = () => {

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 px-6 py-12 md:py-20 max-w-7xl mx-auto">
      {/* Image Section */}
      <div
        className="w-1/3 h-auto aspect-square rounded-full shadow-lg bg-cover bg-center opacity-7"
        style={{ backgroundImage: `url('/images/ngoo.jpg')` }}
      ></div>

      {/* Text Section */}
      <div className="w-full md:w-2/3 shadow-md">
        
        {/* About Us */}
        <h1 className="text-3xl font-bold mb-4 text-red-800">About Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <strong>Family Shop</strong>, your one-stop destination for a seamless online shopping experience.
          We are dedicated to bringing you a wide selection of high-quality products tailored to meet the diverse needs
          of every shopper. Whether you're looking for trendy apparel, cutting-edge electronics, home essentials, or
          unique gift items, we have you covered.
        </p>

        {/* Our Mission */}
        <h2 className="text-2xl font-bold mb-4 text-red-800">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-6">
          At <strong>Family Shop</strong>, our mission is to make online shopping convenient, enjoyable, and accessible to everyone.
          We strive to create a platform where every visitor feels valued and finds exactly what they need at competitive prices.
        </p>

        {/* Why Choose Us */}
        <h2 className="text-2xl font-bold mb-4 text-red-800">Why Choose Us?</h2>
        
        <ul className="list-disc list-inside text-lg leading-relaxed mb-6">
          <li>
            <strong>Wide Product Range:</strong> A thoughtfully curated collection of products to suit all tastes and preferences.
          </li>
          <li>
            <strong>Secure Shopping:</strong> Robust measures to protect your data and transactions.
          </li>
          <li>
            <strong>Fast Delivery:</strong> Ensuring purchases reach your doorstep quickly and efficiently.
          </li>
          <li>
            <strong>Outstanding Customer Support:</strong> A friendly team ready to assist with any queries.
          </li>
        </ul>

        {/* Our Vision */}
        <h2 className="text-2xl font-bold mb-4 text-red-800">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          We aim to become the go-to eCommerce platform for families, combining exceptional product quality with outstanding service.
          We believe in fostering trust and building lasting relationships with our customers.
        </p>

        {/* Closing Statement */}
        <p className="text-lg leading-relaxed mt-4">
          Thank you for choosing <strong>Family Shop</strong>. Together, let&rsquo;s redefine online shopping.
          For any inquiries, feel free to{' '}
          <Link href="/contacts" className="text-blue-600 hover:underline">
            Contact Us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;

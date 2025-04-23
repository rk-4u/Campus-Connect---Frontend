import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-12 border-t">
      <p className="text-sm">&copy; {new Date().getFullYear()} College Placement System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

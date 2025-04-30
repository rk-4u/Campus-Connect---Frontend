// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const links = {
    student: [
      { label: 'Dashboard', path: '/student/dashboard' },
      { label: 'Jobs', path: '/student/jobs' },
    ],
    company: [
      { label: 'Dashboard', path: '/company/dashboard' },
      { label: 'Post Job', path: '/company/post-job' },
      { label: 'Jobs', path: '/company/jobs' },
    ],    
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Placement Stats', path: '/admin/stats' },
      { label: 'Placement Drives', path: '/admin/drives' },
      { label: 'Create Drive', path: '/admin/drives/create' }, // ✅ Optional shortcut
    ],
    
  };

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 sticky top-0">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <nav className="flex flex-col gap-3">
        {links[user.role]?.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

import React from 'react';

const Header = () => {
  return (
    <header className='text-center mb-8'>
      <h1 className='text-2xl md:text-4xl mb-2'>
        🚀{' '}
        <span className='font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent '>
          Smart Task Manager
        </span>
      </h1>
      <p className='text-lg text-gray-600'>
        Organize your tasks efficiently with AI-powered assistance
      </p>
      <div className='flex justify-center items-center mt-4 space-x-6 text-sm text-gray-500'>
        <span>✨ AI Suggestions</span>
        <span>📱 Responsive Design</span>
        <span>⚡ Real-time Updates</span>
      </div>
    </header>
  );
};

export default Header;

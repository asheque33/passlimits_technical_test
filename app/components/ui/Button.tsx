import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  children = '',
  ...props
}) => {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none  hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-purple-600 to-violet-600 text-white   shadow-md hover:shadow-lg',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
    outline:
      'bg-white text-gray-900 focus:ring-gray-500 border border-gray-300',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg',
    ghost:
      'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

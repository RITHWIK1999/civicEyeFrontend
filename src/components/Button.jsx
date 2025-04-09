import React from 'react';

function Button({ type, name, onClick,className }) {
  return (
    <div className="w-full mt-4">
      <button
        type={type}
        onClick={onClick}
        className={className}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;

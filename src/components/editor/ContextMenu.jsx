import React from 'react';

const ContextMenu = ({ position, onHighlight, onComment }) => {
  return (
    <div 
      className="context-menu" 
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      <button onClick={onHighlight}>Highlight</button>
      <button onClick={onComment}>Comment</button>
    </div>
  );
};

export default ContextMenu;

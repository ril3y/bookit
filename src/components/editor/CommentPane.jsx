import React, { useState } from 'react';

const CommentPane = ({ comments }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`comment-pane ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="comment-pane-header">
        <h3>Comments</h3>
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      {!isCollapsed && (
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-card">
              <p className="comment-text">{comment.text}</p>
              <span className="comment-timestamp">
                {comment.timestamp.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentPane;

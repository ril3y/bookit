import React, { useState } from 'react';

const Details = ({ bookDetails, updateBookDetails }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBookDetails({
      ...bookDetails,
      [name]: value
    });
  };

  return (
    <div className="details-container">
      <h2>Book Details</h2>
      <div className="details-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={bookDetails.genre}
            onChange={handleChange}
            placeholder="Enter genre"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={bookDetails.description}
            onChange={handleChange}
            placeholder="Enter book description"
          />
        </div>
      </div>
    </div>
  );
};
export default Details;

import React from 'react';
import { motion } from 'framer-motion';

const Quote = ({ quote, author, book, onLike, likeCount }) => {
  return (
    <motion.div
      className="quote-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="quote-text">"{quote}"</p>
      <p className="author">- {author}</p>
      <p className="book">From: {book}</p>

      <div className="like-section">
        <button className="like-btn" onClick={onLike}>❤️ Like</button>
        <span className="like-count">{likeCount} Likes</span>
      </div>
    </motion.div>
  );
};

export default Quote;

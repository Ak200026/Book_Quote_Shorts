import React, { useState, useEffect } from 'react';
import './App.css';
import Quote from './Quote';
import quotesData from './quotes.json';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(Array(quotesData.length).fill(0));  // Track likes for each quote
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [likedQuote, setLikedQuote] = useState(null);  // Track which quote was liked

  // Auto-play functionality (changes the quote every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === quotesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevQuote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotesData.length - 1 : prevIndex - 1
    );
  };

  // Handle like button click
  const handleLike = () => {
    const updatedLikes = [...likes];
    updatedLikes[currentIndex] += 1;
    setLikes(updatedLikes);

    setLikedQuote(quotesData[currentIndex]); // Store the liked quote
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setLikedQuote(null);
  };

  return (
    <div className="App">
      <div className="quote-wrapper">
        <Quote
          quote={quotesData[currentIndex].quote}
          author={quotesData[currentIndex].author}
          book={quotesData[currentIndex].book}
          onLike={handleLike}
          likeCount={likes[currentIndex]}
        />
        <div className="buttons">
          <button onClick={prevQuote}>Previous</button>
          <button onClick={nextQuote}>Next</button>
        </div>
      </div>

      {/* Modal for liked quote */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>You liked this quote!</h2>
            <p>"{likedQuote?.quote}"</p>
            <p>- {likedQuote?.author}</p>
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

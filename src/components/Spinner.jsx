import React from 'react';
import '../styles/spinner.css'; // Ensure the path to the CSS file is correct

const Spinner = () => {
  return (
      <div className="loading-container">
          <div className="loader-border">
              <div className="loader"></div>
          </div>
      </div>
  );
};

export default Spinner;
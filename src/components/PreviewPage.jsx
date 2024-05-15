import React from 'react';

const PreviewPage = ({ data }) => {
  return (
    <div>
      <h2>Preview Your Information</h2>
      {/* Example of displaying some data */}
      <div>
        <h3>Highest Interest Codes from the RIASEC Aptitude Test</h3>
        <ul>
          {data.riasecIds.map(item => (
            <li key={item.id}>{item.name}</li>  // Displaying name
          ))}
        </ul>
      </div>

    

      {/* You can add more sections for other steps similarly */}
      {/* <div>
        <h3>Further Studies Preferences</h3>
        <p>Selected Further Studies IDs: {data.selectedFurtherIds}</p>
      </div> */}

      {/* Repeat for all collected data */}
    </div>
  );
};

export default PreviewPage;

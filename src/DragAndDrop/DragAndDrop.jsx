import React, { useCallback, useState } from 'react';
import Papa from 'papaparse';

const DragAndDrop = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      parseCSV(file);
    } else {
      setError('Please upload a CSV file.');
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setJsonData(results.data);
        setError(null);
      },
      error: (error) => {
        setError('Error parsing CSV file.');
      },
    });
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        width: '400px',
        margin: '0 auto',
      }}
    >
      <p>Drag and drop a CSV file here, or click to select one.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
};

export default DragAndDrop;

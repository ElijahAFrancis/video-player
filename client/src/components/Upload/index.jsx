import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_VIDEO } from '../../utils/mutations';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadVideo] = useMutation(UPLOAD_VIDEO);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (file && title) {
      try {
        const { data } = await uploadVideo({
          variables: {
            file,
            title,
          },
        });
        // Handle response data here
        console.log('Video uploaded successfully:', data.uploadVideo);
      } catch (error) {
        // Handle error
        console.error('Error uploading video:', error.message);
      }
    } else {
      // Handle no file or title selected
      console.error('Please enter a title and select a video file to upload.');
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form>
        <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} required />
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
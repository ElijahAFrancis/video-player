import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { UPLOAD_VIDEO } from '../../utils/mutations';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      try {
        // Send POST request using Axios
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle response data here
        console.log('Video uploaded successfully:', response.data);

        // You can also use your GraphQL mutation here if needed
        await uploadVideo({
          variables: {
            file: response.data.fileUrl, // Assuming your server sends back the file URL
            title,
          },
        });
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
    <ApolloProvider client={client}>
      <div>
        <h2>Upload Video</h2>
        <form>
          <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} required />
          <input type="file" accept="video/*" onChange={handleFileChange} required />
          <button onClick={handleUpload}>Upload</button>
        </form>
      </div>
    </ApolloProvider>
  );
};

export default Upload;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ReactPlayer from 'react-player';
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { UPLOAD_VIDEO } from '../../utils/mutations.js'; // Import the upload video mutation

function Upload() {
  const [videoURL, setVideoURL] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // Added state for selected file
  const [uploadVideo] = useMutation(UPLOAD_VIDEO);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Set selected file
    const objectURL = URL.createObjectURL(file);
    setVideoURL(objectURL);
  };

  const handleTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      console.error('No file selected!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    // Use fetch to send the file to the server endpoint for handling uploads
    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response, which may include the file path
        console.log('Server response:', data);
  
        // Call the GraphQL mutation with the received file path
        uploadVideo({ variables: { title: videoTitle, path: data.filePath } })
          .then((response) => {
            console.log('Video uploaded:', response.data.uploadVideo);
            // Handle the GraphQL response as needed
          })
          .catch((error) => {
            console.error('Error uploading video:', error);
            // Handle GraphQL errors
          });
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle file upload errors
      });
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="videoTitle">Video Title</Label>
          <Input
            type="text"
            name="title"
            id="videoTitle"
            value={videoTitle}
            onChange={handleTitleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Upload Video</Label>
          <Input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
          <FormText>Upload a video file (MP4, WebM, etc.).</FormText>
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>

      {videoURL && (
        <div>
          <h2>Uploaded Video:</h2>
          <ReactPlayer url={videoURL} width="100%" height="400px" controls={true} />
        </div>
      )}
    </div>
  );
}

export default Upload;

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Form, Button, FormGroup, Label, Input, FormText } from 'reactstrap';

function Upload() {
  const [videoURL, setVideoURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const videoObjectURL = URL.createObjectURL(file);
    setVideoURL(videoObjectURL);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    try {
      // Send the formData to the server
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message to the user
      } else {
        // Handle the error
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleUpload}>
        <FormGroup>
          <Label for="exampleFile">Upload Video</Label>
          <Input
            type="file"
            name="file"
            id="exampleFile"
            accept="video/*"
            onChange={handleFileChange}
          />
          <FormText>Upload a video file (MP4, WebM, etc.).</FormText>
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
      {videoURL && <ReactPlayer url={videoURL} controls />}
    </div>
  );
}

export default Upload;
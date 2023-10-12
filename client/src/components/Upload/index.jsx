import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

function Upload() {
  const [videoURL, setVideoURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const videoObjectURL = URL.createObjectURL(file);
    setVideoURL(videoObjectURL);
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="exampleFile">Upload Video</Label>
          <Input
            type="file"
            name="file"
            id="exampleFile"
            accept="video/*"
            onChange={handleFileChange}
          />
          <FormText>
            Upload a video file (MP4, WebM, etc.).
          </FormText>
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>

      {videoURL && (
        <div>
          <h2>Uploaded Video:</h2>
          <ReactPlayer
            url={videoURL}
            width="100%"
            height="400px"
            controls={true}
          />
        </div>
      )}
    </div>
  );
}

export default Upload;

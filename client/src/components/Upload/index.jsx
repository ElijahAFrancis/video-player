import React, { useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

function Upload() {
  return (<Form><FormGroup>
    <Label for="exampleFile">
      File
    </Label>
    <Input
      id="exampleFile"
      name="file"
      type="file"
    />
    <FormText>
      This is some placeholder block-level help text for the above input. Its a bit lighter and easily wraps to a new line.
    </FormText>
  </FormGroup>
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>);
};

export default Upload;
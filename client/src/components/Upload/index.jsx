import React, { useState } from 'react';
import {
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';

function Upload () {
<FormGroup>
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
}

export default Upload;
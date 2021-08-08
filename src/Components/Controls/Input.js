import React from 'react';
import { TextField } from '@material-ui/core';

function Input(props) {
  const { name, value, onChange, label } = props;
  return <TextField variant="outlined" name={name} value={value} onChange={onChange} label={label} />;
}

export default Input;

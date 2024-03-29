import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DialogProps } from './Blog.types';

const Dialog:React.FC<DialogProps> = ({message, onConfirm}:DialogProps) => {
  if (!message) {
    return null;
  }

  console.log("what is on confirm", onConfirm);
  return (
    <div className="dialog" onClick={() => onConfirm(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <Box
          component="span"
          sx={{
            display: 'block',
            backgroundColor: 'white',
            padding: '20px',
            marginTop: '35px',
            textAlign: 'center',
          }}
        >
          <h3>{message}</h3>
          <div className="buttons">
            <Button
              variant="contained"
              color="success"
              onClick={() => onConfirm(true)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onConfirm(false)}
            >
              No
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};
export default Dialog;

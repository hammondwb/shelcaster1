import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
  
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
}));

const Confirm = ({username, handleClose}) => {
    console.log('handleClose', handleClose);
    const classes = useStyles();
    const [code, setCode] = useState('');    
    async function confirmSignUp(code) {
        console.log('code', code);
        try {
          await Auth.confirmSignUp(username, code);
        //   setCode(code)
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        confirmSignUp(code);
        console.log('code', code);
        handleClose();
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="Confirmation Code"
                variant="filled"
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                
                // onChange={e => confirmSignUp(e.target.value)}
            />
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </div>
        </form>
    );
}

export default Confirm;
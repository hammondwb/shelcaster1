import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import Confirm from './ConfirmAuthenticationForm';

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



const SignUpForm = ({ handleClose }) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [formState, setFormState] = useState('signup');

    function getConfirmForm() {
        switch(formState) {
            case 'signup':
                return(
                    <form className={classes.root} onSubmit={handleSubmit}>
                        <TextField
                            label="First name"
                            variant="filled"
                            required
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />

                        <TextField
                            label="Last Name"
                            variant="filled"
                            required
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />

                        <TextField
                            label="Username"
                            variant="filled"
                            requiredvalue={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        <TextField 
                            label="Email"
                            variant="filled"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />

                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                )
            case 'confirm':
                return(
                    <Confirm username={username} handleClose={handleClose} />
                )
            default:
                return null;
        }
    }

    function signUp(user) {
        try {
            const { user } = Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number,
                }
            })
            console.log('user', user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        signUp(e.target.value);
        setFormState('confirm');
        console.log(username, firstName, lastName, email, password);
    }

    return (
        getConfirmForm()
    )
}

export default SignUpForm;
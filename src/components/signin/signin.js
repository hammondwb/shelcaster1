import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ModalDialog from '../widgets/ModalDialog';

function SignInForm(props) {
    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');
    let [signedIn, setSignedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState('');

    const handleOpen = (e) => {
        setFormType(e.target.id)
        setOpen(true);

        console.log('sign up link from handleOpen',e.target.id);
    }

    const handleClose = () => {
        setOpen(false);
    }

    function signIn() {
        Auth.signIn({
            username: user,
            password: password
        })
        .then(() => console.log('successfuly signed in'))
        .catch((err) => console.log(`error signing in: ${ err }`))
    }

    function confirmSignIn() {
        console.log('user', user);
        const { username } = user;
        Auth.confirmSignIn(username)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(`Error confirm sign in - ${ err }`))
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        signIn();
        confirmSignIn();
        user = setUser('');
        password = setPassword('');
        signedIn = setSignedIn(true);
        e.target.reset();
    }

    function handleChange(e) {
        if(e.target.id === 'username') {
            setUser(e.target.value);
        } else if(e.target.id === 'password') {
            setPassword(e.target.value);
        }
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={ handleSubmit }>
                    <TextField id='username' type='text' onChange={ handleChange }
                        label="User Name"
                        name="username"
                        margin="normal"
                        autoComplete="username"
                        required
                        fullWidth
                    />
                    <TextField id='password' type='password' onChange={ handleChange }
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >Sign In</Button>
                    
                </form>
                <Grid container>
                    <Grid item xs>
                        <Link id="forgot" variant="body2" onClick={handleOpen}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link id="signup" onClick={handleOpen} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        
                    </Grid>
                </Grid>
                <ModalDialog open={open} username={user} formType={formType} handleClose={handleClose} />
            </div>  
        </Container>
    )
}

export default SignInForm;


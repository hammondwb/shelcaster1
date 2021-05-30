import React from 'react';
import SignUpForm from '../SignUpForm'
import Confirm from '../ConfirmAuthenticationForm'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ReactDOM } from 'react-dom';

const ModalDialog = ({ open, handleClose, formType, username }) => {
    console.log('form type', formType);
    function getFormType(formType) {
        switch (formType) {
            case 'signup':
                return <SignUpForm handleClose={handleClose} />
            case 'forgot':
                return <Confirm handleClose={handleClose} />
            default:
                return null
        }
    }
    return (
        // props received by App.js
        <dialog open={open} username={username} handleClose={handleClose}>
            {getFormType(formType)}
        </dialog>
    );
};

export default ModalDialog
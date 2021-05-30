import React from 'react';
import ReactDom from 'react-dom';
import './App.css';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, UsernameAttributes, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import SignInForm from './components/signin/signin';
import Amplify, { Auth } from 'aws-amplify';

function App() {
  const [signedUp, setState] = React.useState(false);

  return (
    <div className="App">
      <header className="App-header">
        Welcome
      </header>
      <h1>App goes here</h1>
      {Auth.authState}
      <AmplifySignOut />
    </div>
  );
}

// class MySignIn extends SignIn {
//   render() {
//     <div className="Login">
//       Login goes here
//     </div>
//   }
// }

function MySignIn(props) {
  return (
    <div className="App">
        <div>I am always here to show current auth state: {props.authState}</div>
        <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
    </div>
  )
}


// class MySignIn extends SignIn (){
//   render() {
//     <div className="App">
//         <div>I am always here to show current auth state: </div>
    
//     </div>
//   }
// }

export default withAuthenticator(App, false, [
  <SignInForm/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>,
  <RequireNewPassword />
]);

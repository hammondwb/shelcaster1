import React from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        User name here
      </header>
      <h1>App goes here</h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

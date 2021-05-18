import React from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>App goes here</h1>
        <p>Fixed backend build</p>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

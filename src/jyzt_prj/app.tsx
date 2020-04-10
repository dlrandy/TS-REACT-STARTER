import taylorSwift from '@Assets/png/taylor_swift_600x400.png';
import Routes from '@Routes/index';
import * as React from 'react';
import './app.css';

export default function IndexApp() {
  return (
    <div className="chameleon">
      <div className="poll-admin-page">
        <Routes />
        <img src={taylorSwift} alt="Taylor Swift" />
      </div>
    </div>
  );
}

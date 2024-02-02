// Home.js
import React from 'react';

const Home = () => {
  return (
    <div style={containerStyle}>
      <h1>ブログの投稿を行うサイトです.</h1>
      <p>
        まず、User FormでUser IDとemailを登録してください。<br />
        次に、Blog Post Formからblogを投稿してください。<br />
        User IDがすでに存在している場合や、Userが登録されていない場合は投稿することができません。
      </p>
    </div>
  );
};

// CSS


const containerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

export default Home;

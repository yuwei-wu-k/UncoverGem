/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import Layout from "./Layout";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
  padding: 50px;
  position: relative;
`;

const titleStyle = css`
  font-size: 2.5em;
  font-weight: bold;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 25px;
`;

const labelStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const buttonStyle = css`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 0.8em;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // emailjs.send('service_x161mr3', 'template_cdztile', { email }, 'wwrdfBYQ24I0AfBBD')
    //   .then((response) => {
    //     alert(`A password reset link has been sent to ${email}`);
    //     setEmail('');
    //   }, (error) => {
    //     console.error('Error:', error);
    //     alert('An error occurred. Please try again.');
    //   });

    emailjs.send('service_x161mr3', 'template_cdztile', {
        user_email: email,
        user_name: 'User',
        password_reset_link: 'Your password reset link here'
    }, 'wwrdfBYQ24I0AfBBD')
      
  };
  

  return (
    <Layout>
        <div css={containerStyle}>
        <h1 css={titleStyle}>Forgot Password</h1>
        <form css={formStyle} onSubmit={handleSubmit}>
            <label css={labelStyle}>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required/>
            </label>
            <button css={buttonStyle} type="submit">Send Reset Link</button>
        </form>
        </div>
    </Layout>
  );
}

export default ForgotPassword;

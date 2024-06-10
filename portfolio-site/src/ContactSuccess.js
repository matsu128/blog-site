import React from 'react';

const ContactSuccess = ({ name, email, message }) => {
  return (
    <div>
      <h2>Thank You!</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Message: {message}</p>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default ContactSuccess;

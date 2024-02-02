import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users", { user_id: name, email: email });

      console.log(response.data);

      setSuccessMessage(response.data.message);

      setErrorMessage('');

      setName('');
      setEmail('');
    } catch (error) {
      setErrorMessage(error.response.data.error);

      setSuccessMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: '#3498db', color: '#fff', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>Submit</button>
        
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UserForm;

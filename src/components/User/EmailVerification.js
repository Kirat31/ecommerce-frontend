import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/user/verifyUser/${token}`);
        setVerificationStatus(response.data);
      } catch (error) {
        console.error('Email verification failed:', error);
        setVerificationStatus('Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerification;

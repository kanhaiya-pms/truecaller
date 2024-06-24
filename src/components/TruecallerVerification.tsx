// src/components/TruecallerVerification.tsx
"use client"
import { useState, useEffect } from 'react';

const TruecallerVerification = () => {
  const [verificationUrl, setVerificationUrl] = useState<string>('');

  useEffect(() => {
    const generateVerificationUrl = async () => {
      const response = await fetch('/api/generate-verification-url');
      const data = await response.json();
      setVerificationUrl(data.verificationUrl);
    };

    generateVerificationUrl();
  }, []);

  return (
    <div>
      <h2>Truecaller Verification</h2>
      {verificationUrl && (
        <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
          Verify with Truecaller
        </a>
      )}
    </div>
  );
};

export default TruecallerVerification;

import React, { useState } from 'react';
import './style.css';

export const App: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const countDistinctSpecialChars = (password: string) => {
    const specialChars = password.match(/[^A-Za-z0-9]/g) || [];
    const distinctSpecialChars = new Set(specialChars);
    return distinctSpecialChars.size;
  };

  const evaluatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinimumSpecialChars = countDistinctSpecialChars(password) >= 3;

    if (
      password.length >= 8 &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasMinimumSpecialChars
    ) {
      return 'Fuerte';
    } else if (password.length >= 6) {
      return 'Moderada';
    } else {
      return 'Débil';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePassword(newPassword));
  };

  return (
    <div className="password-validator-container">
      <input
        type="password"
        value={password}
        onChange={handleChange}
        className="password-input"
        placeholder="Introduce tu contraseña"
      />
      {password && (
        <div
          className={`password-strength ${
            passwordStrength === 'Fuerte'
              ? 'strong-password'
              : passwordStrength === 'Moderada'
              ? 'moderate-password'
              : 'weak-password'
          }`}
        >
          Seguridad: {passwordStrength}
        </div>
      )}
    </div>
  );
};

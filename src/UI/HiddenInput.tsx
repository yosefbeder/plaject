import React from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';

const HiddenInput: React.FC<{
  variant: 'h1' | 'h2' | 'h3' | 'text';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ variant, value, onChange, className }) => {
  const design = `var(--font-${variant})`;

  return (
    <AutosizeInput
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      placeholder="Untitled"
      inputStyle={{
        outline: 'none',
        backgroundColor: 'transparent',
        color: 'inherit',
        padding: '0.25rem',
        border: '1px solid transparent',
        borderRadius: '5px',
        transition: 'border 300ms',
        font: design,
      }}
      placeholderIsMinWidth
    />
  );
};

export default HiddenInput;

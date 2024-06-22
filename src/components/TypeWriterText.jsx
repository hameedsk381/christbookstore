import React from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterText = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: false,
        delay: 75,
      }}
    />
  );
};

export default TypewriterText;

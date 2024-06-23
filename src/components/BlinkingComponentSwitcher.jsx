import React, { useState, useEffect  } from 'react';

const BlinkingComponentSwitcher = ({ components, blinkDuration = 200, displayDuration = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        setIsBlinking(false);
      }, blinkDuration);
    }, displayDuration);

    return () => clearInterval(intervalId);
  }, [components.length, blinkDuration, displayDuration]);

  return (
    <div>
      {isBlinking ? (
        <div style={{ visibility: 'hidden' }}>_</div>
      ) : (
        components[currentIndex]
      )}
    </div>
  );
};

export default BlinkingComponentSwitcher;

import React, { useEffect, useRef } from 'react';

const ShadowDomWrapper = ({ htmlContent }) => {
  const shadowHostRef = useRef(null);

  useEffect(() => {
    let shadowRoot;

    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });
    } else {
      shadowRoot = shadowHostRef.current.shadowRoot;
    }

    if (shadowRoot) {
      shadowRoot.innerHTML = `
        <style>
          .content {
            font-family: Mandali, sans-serif;
            font-weight: bold;
            color: black;
            user-select: none; /* Disable text selection */
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            pointer-events: none; /* Disable pointer events */
          }
          .content * {
            pointer-events: auto; /* Re-enable pointer events for child elements if needed */
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0);
            pointer-events: none;
            z-index: 1000;
          }
        </style>
        <div class="content">${htmlContent.replace(/\n/g, '<br />')}</div>
        <div class="overlay"></div>
      `;
    }
  }, [htmlContent]);

  return <div ref={shadowHostRef} />;
};

export default ShadowDomWrapper;

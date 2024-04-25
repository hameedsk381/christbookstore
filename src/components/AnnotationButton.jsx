import React from 'react';
import axios from 'axios';

// Function to fetch annotations for a specific page URL using Axios
async function fetchAnnotations() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      throw new Error('Unable to fetch annotations: No active tab found');
    }
    const response = await axios.post('http://0.0.0.0:2424/sweets/getBlock', { url:tab.url });
    
    return response.data; // Assuming data is an array of annotation objects
  } catch (error) {
    console.error('Error fetching annotations:', error);
    return [];
  }
}

// Function to display annotations on the webpage using Chrome Extension APIs
function displayAnnotations(annotations) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tabId = tabs[0]?.id; // Get the active tab's ID
      if (!tabId) {
        console.error('Error: Unable to get active tab ID');
        return;
      }
  
      annotations.forEach(annotation => {
        const { target, body } = annotation;
  
        // Use XPath selector to find annotated elements
        const xpath = target.selector.value;
  
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: (xpath, body) => {
            const elements = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
            let element = elements.iterateNext();
  
            while (element) {
              // Create a tooltip element
              const tooltip = document.createElement('div');
              tooltip.textContent = body.value;
              tooltip.classList.add('annotation-tooltip'); // Add CSS class
  
              // Position the tooltip
              tooltip.style.position = 'absolute';
              tooltip.style.background = 'white';
              tooltip.style.padding = '5px';
              tooltip.style.border = '1px solid black';
              tooltip.style.zIndex = '9999';
              tooltip.style.top = `${element.offsetTop}px`;
              tooltip.style.left = `${element.offsetLeft}px`;
  
              // Append tooltip to annotated element
              element.appendChild(tooltip);
              element = elements.iterateNext();
              console.log('first')
            }
          },
          args: [xpath, body]
        });
      });
    });
  }
  
const AnnotationButton = () => {
  const handleViewAnnotationsClick = async () => {
    try {
      const pageUrl = window.location.href;
      console.log(pageUrl)
      const annotations = await fetchAnnotations();
      displayAnnotations(annotations);
    } catch (error) {
      console.error('Error fetching annotations:', error);
    }
  };

  return (
    <button onClick={handleViewAnnotationsClick}>View Annotations</button>
  );
};

export default AnnotationButton;

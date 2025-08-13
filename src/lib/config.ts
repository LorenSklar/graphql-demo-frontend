// Backend configuration
export const config = {
  backendUrl: import.meta.env.PROD 
    ? 'https://graphql-demo-backend.onrender.com'  // Production
    : 'http://localhost:8000'                      // Development
};

// Log the current backend URL and environment
console.log(
  `Backend URL: ${config.backendUrl} (Environment: ${import.meta.env.PROD ? 'PROD' : 'DEV'})`
);

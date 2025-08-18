// Backend configuration
const isDev = import.meta.env.DEV;
const backendUrl = isDev 
  ? 'http://localhost:8000' 
  : 'https://graphql-demo-backend.onrender.com';

console.log(`🚀 Environment: ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
console.log(`📡 Backend URL: ${backendUrl}`);

export const config = {
  backendUrl
};

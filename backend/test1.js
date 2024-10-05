const axios = require('axios');

async function testTriggerEndpoint() {
  try {
    const response = await axios.post('http://localhost:3000/api/zapier', {
      // Any required key-value pairs for your request body
      // In this case, the endpoint does not need any specific body data
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testTriggerEndpoint();
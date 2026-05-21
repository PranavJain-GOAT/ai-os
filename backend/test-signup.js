const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:5001/api/v1/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'Password123!',
      country: 'India',
      role: 'CLIENT'
    });
    console.log('SUCCESS:', response.data);
  } catch (error) {
    console.error('ERROR:', error.response?.status, error.response?.data || error.message);
  }
}

testSignup();

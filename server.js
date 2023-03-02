const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Define the OpenAI API endpoint and headers
const openaiApiEndpoint = 'https://api.openai.com/v1/chat/completions';
const openaiApiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
};
// Set up the body parser middleware
app.use(bodyParser.json());
// Set up the cors middleware and add the Access-Control-Allow-Origin header
app.use(cors());
// Set up the route to handle chat completions
app.post('/v1/chat/completions', async (req, res) => {
    // console.log(req);
    if (!req.body) {
        return;
    }
    try {
        // Send the request to the OpenAI API
        const response = await axios.post(openaiApiEndpoint, req.body, { headers: openaiApiHeaders });

        // Extract the completion from the response
        const completion = response.data.choices[0].text;

        // Send the completion back to the client
        res.json(response.data);
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

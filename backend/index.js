const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require ('cors');
app.use(cors());


app.use(express.json());


const FULL_NAME_DOB = "Muskan_Pandey_26012004"; 
const EMAIL = "muskan.dinesh2021@vitbhopal.ac.in";
const ROLL_NUMBER = "21BCE11405";


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Send an array' });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercaseAlphabet = '';

        data.forEach(item => {
            if (typeof item === 'string') {
                if (item.match(/^[a-zA-Z]$/)) {
                    alphabets.push(item);
                    if (item === item.toLowerCase() && (item > highestLowercaseAlphabet)) {
                        highestLowercaseAlphabet = item;
                    }
                } else if (item.match(/^\d+$/)) {
                    numbers.push(item);
                }
            }
        });

        res.json({
            is_success: true,
            user_id: FULL_NAME_DOB,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });
    } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});


app.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({
            operation_code: 1
        });
    } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
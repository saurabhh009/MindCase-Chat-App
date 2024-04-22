const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 4000;

const dotenv = require('dotenv');
const result = dotenv.config({ path: 'C:/Users/hp/Desktop/chat-app/backend/.env' });

if (result.error) {
    console.error('Error loading .env file:', result.error);
}

app.use(cors());


const API = require('./api/api');
const SignUp = require('./users/signUp');
const Login = require('./users/login');
const DB = require('./config/db');
const MsgByChat = require('./message/messageByChatId');
const CreateChat = require('./chats/createChat');
const SaveMessage = require('./message/saveMessage');
const EndChat = require('./chats/endChat');
const AllChats = require('./chats/allChats');
const GetByEmail = require('./users/getByEmail');

const supabaseUrl=process.env.SUPABSE_URL;
const supabaseKey=process.env.SUPABSE_ANON_KEY;
const apiKey=process.env.OPENAI_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

async function testDatabaseConnection() {
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Database connection successful.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testDatabaseConnection();



app.post('/users', SignUp);

app.get('/users/:email', GetByEmail)

app.post('/login', Login);

app.get('/messages/:chatid', MsgByChat);



app.post('/chats', CreateChat);

/* app.get('/chats', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('chats')
            .select();

        if (error) {
            throw error;
        }

        res.status(200).json({ chats: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */




app.get('/chats/:userID', AllChats);


app.post('/end-chat', EndChat);


app.post('/save-message', SaveMessage);


app.post('/openai-completions', API);



/* app.post('/openai-completions', async (req, res) => {
    try {

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
          });

        const responseData = completion.choices[0];

        res.json(responseData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); */

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

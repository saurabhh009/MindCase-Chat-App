const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateChat=async (req, res) => {
    try {
        const { title, userid } = req.body;
        const { data, error } = await supabase
            .from('chats')
            .insert({
                title,userid
            });

        if (error) {
            throw error;
        }
        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=CreateChat;
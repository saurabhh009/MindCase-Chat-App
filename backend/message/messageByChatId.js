const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const MsgByChat=async (req, res) => {
    try {
        const { chatid } = req.params;

        const { data, error } = await supabase
            .from('messages')
            .select()
            .eq('chatid', chatid);

        if (error) {
            throw error;
        }

        res.status(200).json({ messages: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=MsgByChat;
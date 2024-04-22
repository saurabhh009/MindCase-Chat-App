const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const EndChat=async (req, res) => {
    try {
        const { chatid } = req.body;

        const { error } = await supabase
            .from('chats')
            .update({ status: 'concluded' })
            .eq('chatid', chatid);

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Chat ended successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports=EndChat;
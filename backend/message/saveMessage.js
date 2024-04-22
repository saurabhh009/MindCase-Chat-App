const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const SaveMessage=async (req, res) => {
    try {
        const { chatid, messagetext, aireply } = req.body;
        const { data, error } = await supabase
            .from('messages')
            .insert([{ chatid,  messagetext, aireply }]);
        
        if (error) {
            throw error;
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports=SaveMessage;
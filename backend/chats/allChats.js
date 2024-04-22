
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL;
const supabaseKey=process.env.SUPABSE_ANON_KEY;
const apiKey=process.env.OPENAI_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const AllChats=async (req, res) => {
    try {
        const { userid } = req.params;
        const { data: userChatsData, error: userChatsError } = await supabase
            .from('chats')
            .select('chatid') 
            .eq('userid', userid);

        if (userChatsError) {
            throw userChatsError;
        }
        const chatIDs = userChatsData.map(userChat => userChat.chatid);
        const { data: chatsData, error: chatsError } = await supabase
            .from('chats')
            .select()
            .in('chatid', chatIDs);

        if (chatsError) {
            throw chatsError;
        }

        res.status(200).json({ chats: chatsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports=AllChats;
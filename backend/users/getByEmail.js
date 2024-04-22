const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL;
const supabaseKey=process.env.SUPABSE_ANON_KEY;
const apiKey=process.env.OPENAI_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const GetByEmail= async (req, res) => {
    const mail = req.params.email;
    try {

        console.log(mail);

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            throw error;
        }


        res.status(200).json(data); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};;

module.exports=GetByEmail;
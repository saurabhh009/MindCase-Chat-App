const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const Login=async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        res.status(200).json({ data });
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
    }
}

module.exports = Login;
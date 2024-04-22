const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const { user, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) {
            throw signUpError;
        }

        const { data, error: insertError } = await supabase
            .from('users')
            .insert({
                username,
                email,
                password,
                lastactivedate: new Date() })
            .single(); 

        if (insertError) {
            await supabase.auth.signOut();
            throw insertError;
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = SignUp;
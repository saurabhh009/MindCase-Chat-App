const { createClient } = require('@supabase/supabase-js');
const supabaseUrl=process.env.SUPABSE_URL
const supabaseKey=process.env.SUPABSE_ANON_KEY
const apiKey=process.env.OPENAI_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const DB=async function testDatabaseConnection() {
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

module.exports = DB;
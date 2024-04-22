const apiKey=process.env.OPENAI_API_KEY

const API= async (req, res) => {
    try {
        const { model, prompt, max_tokens } = req.body;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model,
                prompt,
                max_tokens,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();

        res.json(responseData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = API;
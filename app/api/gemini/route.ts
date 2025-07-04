export async function POST(request) {
  try {
    const { title, description } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
    const prompt = description
      ? `Break down this task into 3-5 simple subtasks: "${title}". 
         Context: ${description}. 
         Give me only the list, no extra text.`
      : `Break down this task into 3-5 simple subtasks: "${title}". 
         Give me only the list, no extra text.`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      // Handle quota exceeded
      if (response.status === 429) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Daily quota exceeded. Try again tomorrow.'
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 429
        });
      }

      // All other errors
      return new Response(JSON.stringify({
        success: false,
        error: 'AI service unavailable. Please try again later.'
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const subtasks = text.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[\*\-\d+\.\)]\s*/, '').trim())
      .filter(line => line.length > 0);

    return new Response(JSON.stringify({ success: true, subtasks }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Something went wrong. Please try again.' || error?.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
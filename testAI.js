require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function testAI() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "user", content: "Give me one SaaS growth tip" }
    ],
    temperature: 0.6,
    max_tokens: 100,
  });

  console.log("✅ AI RESPONSE:");
  console.log(completion.choices[0].message.content);
}

testAI().catch(console.error);

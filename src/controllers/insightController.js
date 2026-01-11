const Groq = require("groq-sdk");
const Insight = require("../models/Insight");
const DashboardStats = require("../models/DashboardStats");
const Analytics = require("../models/Analytics");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateInsight = async (req, res) => {
  try {
    // 1️⃣ Fetch data from DB
    const dashboard = await DashboardStats.findOne().sort({ updatedAt: -1 });
    const analytics = await Analytics.find();

    if (!dashboard || analytics.length === 0) {
      return res.status(400).json({ error: "Not enough data for AI insight" });
    }

    // 2️⃣ Prepare prompt
    const prompt = `
You are a SaaS analytics expert.
Return the response STRICTLY in JSON format:

{
  "summary": "",
  "risks": [],
  "suggestions": [],
  "prediction": ""
}

Dashboard Stats:
${JSON.stringify(dashboard)}

Analytics:
${JSON.stringify(analytics)}
`;

    // 3️⃣ Call Groq AI
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 300,
    });

    // 4️⃣ Parse AI response
    const aiText = completion.choices[0].message.content;
    const parsed = JSON.parse(aiText);

    // 5️⃣ Save Insight
    const insight = await Insight.create({
      summary: parsed.summary,
      risks: parsed.risks,
      suggestions: parsed.suggestions,
      prediction: parsed.prediction,
      rawPromptData: { dashboard, analytics },
    });

    res.status(201).json(insight);
  } catch (error) {
    console.error("AI Insight Error:", error.message);
    res.status(500).json({ error: "AI insight generation failed" });
  }
};

exports.getInsights = async (req, res) => {
  const insights = await Insight.find().sort({ createdAt: -1 });
  res.json(insights);
};

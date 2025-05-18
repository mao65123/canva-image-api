// /api/generate-image.js
export default async function handler(req, res) {
  // === CORS preflight ===========================
  res.setHeader("Access-Control-Allow-Origin", "*");               // 必要なら * を Canva ドメインに変更
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // プリフライト要求には 200 を即返す
    return res.status(200).end();
  }
  // ==============================================

  try {
    const { title } = req.body || {};
    console.log("▶️ API called, title:", title);

    if (!title) {
      return res.status(400).json({ error: "title required" });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `"${title}" をイメージした、近未来のビジネス都市の風景`,
        size: "1792x1024",
        n: 1,
        response_format: "b64_json",
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error("❌ OpenAI error:", data);
      return res.status(openaiRes.status).json(data);
    }

    const b64 = data.data?.[0]?.b64_json;
    console.log("✅ OpenAI success, bytes:", b64?.length);

    return res.status(200).json({ dataUrl: `data:image/png;base64,${b64}` });
  } catch (err) {
    console.error("❌ Unexpected error", err);
    return res.status(500).json({ error: "internal" });
  }
}

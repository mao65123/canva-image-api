// /api/generate-image.js

export default async function handler(req, res) {
  try {
    // 1. リクエスト内容を確認
    const { title } = req.body || {};
    console.log("▶️ API called, title:", title);

    if (!title) {
      console.error("❌ No title received");
      return res.status(400).json({ error: "title required" });
    }

    // 2. OpenAI へ画像生成リクエスト
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
        response_format: "b64_json", // ← base64 で受け取る
      }),
    });

    const data = await openaiRes.json();

    // 3. エラーハンドリング
    if (!openaiRes.ok) {
      console.error("❌ OpenAI error:", data);
      return res.status(openaiRes.status).json(data);
    }

    const b64 = data.data?.[0]?.b64_json;
    console.log("✅ OpenAI success, bytes:", b64?.length);

    // 4. dataUrl にして返す
    res.status(200).json({ dataUrl: `data:image/png;base64,${b64}` });
  } catch (err) {
    console.error("❌ Unexpected error", err);
    res.status(500).json({ error: "internal" });
  }
}

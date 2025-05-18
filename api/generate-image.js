export default async function handler(req, res) {
  // CORS対応：OPTIONSメソッドに対応する
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // POST以外は拒否
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title } = req.body;

    // ここでは仮に生成画像として1枚の固定画像URLを返します
    // 実際には title に応じて画像を生成してもOKです
    const imageUrl = "https://dummyimage.com/1792x1024/000/fff&text=" + encodeURIComponent(title);

    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();

    // CORSヘッダーの追加
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "image/png");

    return res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Failed to generate image" });
  }
}

// ファイル: /api/generate-image.js
// Canva から呼び出される画像生成 API。
// CORS を許可し、画像 URL を JSON 形式で返すサンプル実装です。

export default async function handler(req, res) {
  // --- CORS ヘッダー -----------------------------
  res.setHeader("Access-Control-Allow-Origin", "*"); // 必要に応じて Canva のドメインに限定
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // プリフライト（OPTIONS）リクエストに即応答
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POST 以外は拒否
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title = "Untitled" } = req.body ?? {};

    // ------------------ 画像生成ロジック ------------------
    // デモとして DummyImage サービスで作った画像 URL を返すだけ。
    // 本番では DALL·E などで生成 → S3 等にアップロード → URL を返す処理に差し替えてください。
    const encoded = encodeURIComponent(title);
    const imageUrl = `https://dummyimage.com/1792x1024/000/fff.png&text=${encoded}`;
    // ------------------------------------------------------

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

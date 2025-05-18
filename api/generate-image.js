/**
 * Canva から呼び出す画像生成 API（Next.js / Vercel 用）
 * ----------------------------------------------------------
 * 1. CORS を許可（Access-Control-Allow-* ヘッダー）
 * 2. POST で受け取った `title` を使い画像を生成する（ここではダミー）
 * 3. 生成した PNG を Base64 → dataUrl にして JSON で返す
 *
 * 返り値:
 *   { dataUrl: "data:image/png;base64,..." }
 *
 * Canva Apps SDK v2 では `image: { dataUrl }` で挿入すると動作確認がラク。
 */

export default async function handler(req, res) {
  // ===== CORS ヘッダー =====
  res.setHeader("Access-Control-Allow-Origin", "*");           // まずは *（開発用）。本番は Canva のドメインに制限推奨
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // プリフライトへの即時応答
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POST 以外は拒否
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title = "Untitled" } = req.body ?? {};

    // ==========================================================
    // (A) ここに本物の画像生成ロジックを入れると本番準備完了
    //     例) OpenAI DALL·E → PNG Buffer
    //
    // ▼ デモ用: 白 60×20 PNG にタイトル文字を載せたダミー画像を生成
    //   ─ Canvas 等を使わず、1×1 白PNGの Base64 でサンプル返却 ─
    // ==========================================================
    const base64White1px =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBAjYh4XkAAAAASUVORK5CYII=";

    // data:image/png;base64,<...>
    const dataUrl = `data:image/png;base64,${base64White1px}`;

    // JSON で返却
    return res.status(200).json({ dataUrl });
  } catch (error) {
    console.error("Image generation failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// ファイル: /api/generate-image.js

export default async function handler(req, res) {
  // CORSヘッダーを設定
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONSリクエストには即時応答
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POST以外は拒否
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title } = req.body;

    // 仮の画像生成処理（Canvasなどを使って実際に画像を生成する）
    // 今回は空のPNG画像をBase64で返すサンプルとする
    const imageBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAADwAAABACAYAAAB6e1rxAAAAAXNSR0IArs4c6QAAACNJREFUaEPt0zEOACAIAzHf+Z+cYwUBrig1lbYVCIIgCIIgCIIgCPxgFGf2UVBfmlAAAAAElFTkSuQmCC",
      "base64"
    );

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "inline; filename=generated.png");
    res.status(200).end(imageBuffer);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

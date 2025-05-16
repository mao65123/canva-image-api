export default async function handler(req, res) {
  const { title } = req.body;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `${title} をイメージした、近未来のビジネス都市の風景`,
      size: "1792x1024",
      n: 1,
    }),
  });

  const data = await response.json();
  const imageUrl = data.data[0].url;
  res.status(200).json({ imageUrl });
}

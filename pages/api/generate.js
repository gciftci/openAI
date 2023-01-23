import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "Wrong Key",
      },
    });
    return;
  }

  const file = req.document.files[0] || "";
  if (file.size === 0) {
    console.dir(file);
    res.status(400).json({
      error: {
        message: "Nope.",
      },
    });
    return;
  }
  try {
    const completion = await openai.createEdit({
      model: "text-davinci-003",
      instruction: `Erstelle eine detaillierte Analyse des textes und zeige mir deine Analyse mit einer Liste.`,
      temperature: 0.8,
    });
    res.status(200).json({ Result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error: ${error.message}`);
      res.status(500).json({
        error: {
          message: "err",
        },
      });
    }
  }
}
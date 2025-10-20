import type { VercelRequest, VercelResponse } from "@vercel/node";
import { get, head } from "@vercel/blob";

const BLOB_NAME = "camp-aaa-wish-results.json";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const h = await head(BLOB_NAME);
    if (!h) {
      return res.status(200).json({
        updated_at: new Date().toISOString(),
        wish: {
          "Meninas Super Poderosas": 0,
          "Panceiros": 0,
          "Bagrenarok": 0
        }
      });
    }
    const { body } = await get(BLOB_NAME);
    const txt = await body!.text();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(JSON.parse(txt));
  } catch (e) {
    return res.status(500).json({ error: "Falha ao carregar resultados" });
  }
}

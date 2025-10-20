import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, get, head } from "@vercel/blob";

type Results = {
  updated_at: string;
  wish: Record<string, number>;
};

const BLOB_NAME = "camp-aaa-wish-results.json";

async function readCurrent(): Promise<Results> {
  try {
    const h = await head(BLOB_NAME);
    if (!h) throw new Error("no-head");
    const { body } = await get(BLOB_NAME);
    const txt = await body!.text();
    return JSON.parse(txt) as Results;
  } catch {
    return {
      updated_at: new Date().toISOString(),
      wish: {
        "Meninas Super Poderosas": 0,
        "Panceiros": 0,
        "Bagrenarok": 0
      }
    };
  }
}

function inc(map: Record<string, number>, key: string) {
  if (!map[key]) map[key] = 0;
  map[key] += 1;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const payload: any = req.body || {};
  const wish = payload.wish || payload["wish"] || payload.data?.wish;

  if (!wish || typeof wish !== "string") {
    return res.status(400).json({ error: "Campo \'wish\' obrigatório" });
  }

  const results = await readCurrent();
  inc(results.wish, wish);
  results.updated_at = new Date().toISOString();

  await put(BLOB_NAME, JSON.stringify(results), {
    access: "public",
    contentType: "application/json"
  });

  return res.status(200).json({ ok: true, results });
}

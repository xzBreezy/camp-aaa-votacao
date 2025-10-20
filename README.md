# Camp AAA – Results API (Vercel)
API serverless pra agregar votos (Formspree → JSON) e servir resultado ao vivo.

## Endpoints
- POST `/api/formspree-hook` → webhook do Formspree. Soma 1 voto no campo `wish`.
- GET  `/api/results`        → retorna JSON agregado.

Formato do JSON:
{
  "updated_at": "2025-10-20T01:50:00Z",
  "wish": {
    "Meninas Super Poderosas": 10,
    "Panceiros": 7,
    "Bagrenarok": 4
  }
}

## Deploy (Vercel)
1. Cria repo no GitHub (camp-aaa-results-api)
2. Sobe esses arquivos.
3. Importa no Vercel e **Deploy**.

## Formspree → Webhook
- Em **Workflows/Webhooks** adicione:
  - URL: `https://SEU-DOMINIO.vercel.app/api/formspree-hook`
  - Payload: JSON
- O widget envia: `{ wish: "<opção>" }` e a API soma no blob público.

## Front-end (widget)
No seu `index.html`:
const RESULTS_URL = "https://SEU-DOMINIO.vercel.app/api/results";

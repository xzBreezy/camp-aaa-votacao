# Camp AAA votação (Semifinal)
Site estático com votação popular (Formspree) e placar ao vivo opcional.

## Como usar
1) Abra `index.html` no navegador OU publique no Netlify/Vercel.
2) O endpoint do Formspree já está setado como produção:
   `https://formspree.io/f/mkgqeewj`
3) Para ativar placar ao vivo, aponte `RESULTS_URL` para sua API (ex.: Vercel `/api/results`).

## Estrutura
- `index.html`: página da votação (mobile-first)
- Anti-spam: 1 voto/dia via `localStorage`

## Deploy rápido (Vercel)
- Crie um repositório no GitHub (camp-aaa-votacao)
- Faça upload destes arquivos
- Na Vercel, importe o repo e **Deploy**

Boa final! 🏆

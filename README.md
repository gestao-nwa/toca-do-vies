# Toca do Viés — Landing page Black Friday 2026

Landing page de captura de leads (lp.tocadovies.com.br) com cupom exclusivo **CLASSICOS40**: 40% OFF só nos produtos da categoria **Achados da Toca**, de 01 a 30/11, sem pedido mínimo e **não cumulativo** com o desconto progressivo.

Fluxo: anúncio (Meta/Google) → `index.html` → formulário → `obrigado.html` (cupom + botão "Ir para o site") → compra em tocadovies.com.br.

## Arquivos
- `index.html` — LP: topo com formulário, como funciona, produtos, vantagens, FAQ e rodapé.
- `obrigado.html` — página de agradecimento com o cupom (botão de copiar) e links para o site com UTM.
- `assets/js/config.js` — **todas as configurações** (pixel, GA4, webhook, WhatsApp, links).
- `assets/js/tracking.js` — Meta Pixel + GA4 (só carregam se os IDs estiverem preenchidos).
- `assets/js/main.js` — contagem regressiva, máscara/validação do formulário e envio do lead.

O cupom **não aparece** na LP antes do cadastro, só na página de agradecimento.

## Antes de publicar (pendências do briefing)
1. `META_PIXEL_ID` e `GA4_ID` em `config.js`. O cadastro dispara `Lead` (Meta) e `generate_lead` (GA4).
2. `LEAD_WEBHOOK_URL`: webhook (Make/n8n/Zapier ou API) que cria o lead no Kommo com a etiqueta **VIP Black**, avisa o e-mail responsável (a confirmar) e envia o cupom por e-mail/WhatsApp. O payload é JSON com: `nome`, `whatsapp` (55 + DDD + número), `email`, `aceite`, `tag`, `cupom`, `origem`, `pagina`, `data_cadastro` e as UTMs/gclid/fbclid da visita.
3. Confirmar o WhatsApp (11) 94002-6511.
4. `ACHADOS_URL`: link da categoria Achados da Toca. O botão "Ir para o site" da página de agradecimento leva para ela (vazio = home do site).
5. Trocar o logo pelo arquivo oficial em alta (`assets/img/logo.png`) e adicionar depoimentos, se o cliente enviar.

## Hospedagem
Site estático: basta subir todos os arquivos para a raiz de lp.tocadovies.com.br (falar com o Alexandre).
Para testar localmente: `python3 -m http.server` e abrir http://localhost:8000.

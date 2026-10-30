/*
 * Configuração da landing page Black Friday — Toca do Viés
 * Preencha os campos marcados com "A CONFIRMAR" antes de publicar.
 */
window.TOCA_CONFIG = {
  // Meta Pixel (ex.: "123456789012345"). Vazio = pixel desligado.
  META_PIXEL_ID: "",

  // Google Analytics 4 (ex.: "G-XXXXXXXXXX"). Vazio = GA4 desligado.
  GA4_ID: "",

  // Endpoint que recebe os cadastros (webhook do Make/n8n/Zapier ou API própria)
  // e cria o lead no Kommo com a etiqueta "VIP Black" + envia o aviso por e-mail.
  // A CONFIRMAR: e-mail que recebe os leads.
  LEAD_WEBHOOK_URL: "",

  // Etiqueta aplicada ao lead no Kommo
  KOMMO_TAG: "VIP Black",

  // Cupom e regras
  COUPON: "CLASSICOS40",
  CAMPAIGN_START: "2026-11-01T00:00:00-03:00",
  CAMPAIGN_END: "2026-11-30T23:59:59-03:00",

  // Contatos
  WHATSAPP: "5511940026511", // (11) 94002-6511 — A CONFIRMAR com o cliente
  SITE_URL: "https://www.tocadovies.com.br",
  INSTAGRAM_URL: "https://www.instagram.com/tocadovies",

  // Link da categoria Achados da Toca (único lugar onde o cupom vale).
  // Vazio = botão "Ir para o site" da página de agradecimento leva à home.
  ACHADOS_URL: "",

  // UTM aplicada nos links que levam da LP para o site
  SITE_UTM: "utm_source=lp&utm_medium=landing_page&utm_campaign=black_friday_2026"
};

/* Meta Pixel + GA4 — carregados só quando os IDs estão em config.js */
(function () {
  var cfg = window.TOCA_CONFIG || {};

  if (cfg.META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  if (cfg.GA4_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.GA4_ID);
  }

  // Evento de cadastro concluído (Lead no Meta, generate_lead no GA4)
  window.tocaTrackLead = function () {
    if (window.fbq) fbq('track', 'Lead', { content_name: 'Black Friday 2026 - Cupom 40% Achados da Toca' });
    if (window.gtag) gtag('event', 'generate_lead', { form_name: 'black_friday_2026', coupon: cfg.COUPON });
  };

  // Link do site com UTM
  window.tocaSiteUrl = function (url) {
    url = url || cfg.SITE_URL;
    return url + (url.indexOf('?') > -1 ? '&' : '?') + cfg.SITE_UTM;
  };
})();

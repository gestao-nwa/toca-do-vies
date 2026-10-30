(function () {
  var cfg = window.TOCA_CONFIG || {};

  /* ---------- Contagem regressiva ---------- */
  var cd = document.getElementById('countdown');
  if (cd) {
    var label = document.getElementById('countdown-label');
    var start = new Date(cfg.CAMPAIGN_START).getTime();
    var end = new Date(cfg.CAMPAIGN_END).getTime();
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    var tick = function () {
      var now = Date.now();
      var target = now < start ? start : end;
      if (now > end) {
        label.textContent = 'A Black Friday Toca foi encerrada';
        cd.hidden = true;
        return;
      }
      label.textContent = now < start ? 'A Black Friday começa em' : 'O cupom expira em';
      var diff = Math.max(0, target - now) / 1000;
      cd.querySelector('[data-d]').textContent = pad(Math.floor(diff / 86400));
      cd.querySelector('[data-h]').textContent = pad(Math.floor(diff % 86400 / 3600));
      cd.querySelector('[data-m]').textContent = pad(Math.floor(diff % 3600 / 60));
      cd.querySelector('[data-s]').textContent = pad(Math.floor(diff % 60));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Links de contato ---------- */
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    a.href = 'https://wa.me/' + cfg.WHATSAPP + '?text=' + encodeURIComponent('Olá! Vim pela página da Black Friday da Toca do Viés 🧵');
  });
  document.querySelectorAll('[data-site]').forEach(function (a) { a.href = window.tocaSiteUrl(); });
  document.querySelectorAll('[data-instagram]').forEach(function (a) { a.href = cfg.INSTAGRAM_URL; });

  /* ---------- Formulário ---------- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  // Guarda as UTMs da visita para enviar junto com o lead
  var params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach(function (k) {
    var input = form.querySelector('[name="' + k + '"]');
    if (input && params.get(k)) input.value = params.get(k);
  });

  // Máscara de WhatsApp: (11) 91234-5678
  var phone = form.querySelector('[name="whatsapp"]');
  phone.addEventListener('input', function () {
    var d = phone.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(d.length - 4);
    phone.value = out;
  });

  var setError = function (field, msg) {
    var wrap = field.closest('.field');
    wrap.classList.toggle('has-error', !!msg);
    wrap.querySelector('.field-error').textContent = msg || '';
  };

  var validate = function () {
    var ok = true;
    var name = form.elements.nome, email = form.elements.email, consent = form.elements.aceite;
    var digits = phone.value.replace(/\D/g, '');

    if (name.value.trim().length < 2) { setError(name, 'Conta pra gente o seu nome.'); ok = false; } else setError(name);
    if (digits.length < 10 || digits.length > 11) { setError(phone, 'Informe o WhatsApp com DDD.'); ok = false; } else setError(phone);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'Confira o seu e-mail.'); ok = false; } else setError(email);
    if (!consent.checked) { setError(consent, 'Marque o aceite para receber o cupom.'); ok = false; } else setError(consent);
    return ok;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector('.has-error input');
      if (first) first.focus();
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.classList.add('is-loading');

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = typeof v === 'string' ? v.trim() : v; });
    data.whatsapp = '55' + phone.value.replace(/\D/g, '');
    data.aceite = true;
    data.tag = cfg.KOMMO_TAG;
    data.cupom = cfg.COUPON;
    data.origem = 'LP Black Friday 2026';
    data.pagina = location.href;
    data.data_cadastro = new Date().toISOString();

    var done = function () {
      try { sessionStorage.setItem('toca_lead', JSON.stringify({ nome: data.nome.split(' ')[0] })); } catch (err) {}
      window.tocaTrackLead();
      // Pequena espera para os pixels dispararem antes do redirecionamento
      setTimeout(function () { location.href = 'obrigado.html'; }, 400);
    };

    if (!cfg.LEAD_WEBHOOK_URL) {
      console.warn('[Toca] LEAD_WEBHOOK_URL não configurado em assets/js/config.js — lead não enviado.', data);
      return done();
    }

    fetch(cfg.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true
    })
      .catch(function (err) { console.error('[Toca] Falha ao enviar lead', err); })
      .then(done);
  });
})();

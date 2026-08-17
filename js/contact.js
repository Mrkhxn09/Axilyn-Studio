/**
 * ═══════════════════════════════════════════════════════
 * CONTACT FORM & EMAILJS INTEGRATION — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

const EMAILJS_PUBLIC_KEY = 'ORfC8Bo3RJ6m5Tl1Q';
const EMAILJS_SERVICE = 'service_1bt46lz'; // Axilyn Studio Gmail service
const EMAILJS_NOTIFY = 'template_plovi2r'; // Notification → Studio
const EMAILJS_REPLY = 'template_dcidnxh'; // Auto-reply → Visitor

// Initialize EmailJS if library loaded
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ── Rate limiting: max 3 submissions per 10 min ── */
const RATE_KEY = 'ax_sub_times';
function checkRateLimit() {
  const now = Date.now();
  let times = JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]');
  times = times.filter((t) => now - t < 10 * 60 * 1000);
  if (times.length >= 3) return false;
  times.push(now);
  sessionStorage.setItem(RATE_KEY, JSON.stringify(times));
  return true;
}

/* ── Field validation helpers ── */
function validateField(id, condition, errId) {
  const fg = document.getElementById('fg_' + id);
  if (!fg) return true;
  if (condition) {
    fg.classList.remove('has-error');
    fg.classList.add('valid');
    return true;
  } else {
    fg.classList.add('has-error');
    fg.classList.remove('valid');
    return false;
  }
}

function validateForm() {
  const nameEl = document.getElementById('cf_name');
  const emailEl = document.getElementById('cf_email');
  const serviceEl = document.getElementById('cf_service');
  const messageEl = document.getElementById('cf_message');

  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const service = serviceEl ? serviceEl.value : '';
  const message = messageEl ? messageEl.value.trim() : '';
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let ok = true;
  ok = validateField('name', name.length >= 2, 'err_name') && ok;
  ok = validateField('email', emailRx.test(email), 'err_email') && ok;
  ok = validateField('service', service !== '', 'err_service') && ok;
  ok = validateField('message', message.length >= 10, 'err_message') && ok;
  return ok;
}

function showStatus(type, customMsg) {
  const s = document.getElementById('formSuccess');
  const er = document.getElementById('formError');
  if (!s || !er) return;

  s.className = 'form-status';
  er.className = 'form-status';

  if (type === 'success') {
    s.className = 'form-status success';
    s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    if (customMsg) er.innerHTML = '❌ ' + customMsg;
    er.className = 'form-status error';
    er.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function hideStatus() {
  const s = document.getElementById('formSuccess');
  const er = document.getElementById('formError');
  if (s) s.className = 'form-status';
  if (er) er.className = 'form-status';
}

/* ── Form Event Binding ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Live blur & input validation
  ['cf_name', 'cf_email', 'cf_service', 'cf_message'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('blur', () => {
      const key = id.replace('cf_', '');
      if (id === 'cf_email') {
        validateField('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()), 'err_email');
      } else if (id === 'cf_service') {
        validateField('service', el.value !== '', 'err_service');
      } else {
        validateField(key, el.value.trim().length >= (id === 'cf_message' ? 10 : 2), 'err_' + key);
      }
    });

    el.addEventListener('input', () => {
      const fg = el.closest('.fg');
      if (fg && fg.classList.contains('has-error')) {
        fg.classList.remove('has-error');
      }
    });
  });

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot anti-bot check
    const hp = document.getElementById('hp_field');
    if (hp && hp.value !== '') {
      return; // bot detected, silently drop
    }

    // Validate form inputs
    if (!validateForm()) return;

    // Check rate limit
    if (!checkRateLimit()) {
      showStatus('error', '⏳ Too many submissions. Please wait a few minutes before trying again.');
      return;
    }

    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spin"></span>SENDING…';
    }
    hideStatus();

    const nameVal = document.getElementById('cf_name')?.value.trim() || '';
    const compVal = document.getElementById('cf_company')?.value.trim() || 'Not provided';
    const emailVal = document.getElementById('cf_email')?.value.trim() || '';
    const phoneVal = document.getElementById('cf_phone')?.value.trim() || 'Not provided';
    const servVal = document.getElementById('cf_service')?.value || '';
    const budgVal = document.getElementById('cf_budget')?.value || 'Not specified';
    const msgVal = document.getElementById('cf_message')?.value.trim() || '';

    const params = {
      from_name: nameVal,
      company: compVal,
      reply_to: emailVal,
      phone: phoneVal,
      service: servVal,
      budget: budgVal,
      message: msgVal,
      submission_time: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    };

    try {
      if (typeof emailjs !== 'undefined') {
        // Send notification to Axilyn Studio
        await emailjs.send(EMAILJS_SERVICE, EMAILJS_NOTIFY, params);
        // Send auto-reply to visitor
        await emailjs.send(EMAILJS_SERVICE, EMAILJS_REPLY, params);
      } else {
        throw new Error('EmailJS SDK not loaded');
      }

      showStatus('success');
      form.reset();
      document.querySelectorAll('.fg').forEach((fg) => {
        fg.classList.remove('valid', 'has-error');
      });
    } catch (err) {
      console.error('EmailJS error:', err);
      showStatus('error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'SEND MESSAGE →';
      }
    }
  });
}

// Bind contact form when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

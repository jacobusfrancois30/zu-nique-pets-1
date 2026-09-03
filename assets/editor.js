/* =====================================================================
   Zu-nique Pet Shop: embedded visual editing engine (GrapesJS)
   ---------------------------------------------------------------------
   Loads nothing until you ask for it, so visitors never pay for it.

   How to open the editor:
     - Click the floating "✏️ Edit Page" button on the bottom left, or
     - Press Ctrl + Shift + E (Cmd + Shift + E on Mac), or
     - Visit https://your-site/?edit=1

   Inside the editor:
     - Drag blocks from the right-hand Blocks panel onto the page
     - Click any element to edit it, double-click text to retype it
     - Click an image, then swap its URL or upload
     - "👁️ Live Preview" to preview the page without editor controls
     - "🚀 Publish" commits the page straight to GitHub and Cloudflare Pages
       rebuilds automatically within ~60 seconds
     - "⚙️ CMS" opens Decap CMS at /admin/
     - "💾 Download" saves the finished HTML file locally
     - "✕ Exit" returns to the live page
   ===================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    repo:   'jacobusfrancois30/zu-nique-pets-1',
    branch: 'main',
    oauth:  'https://decap-oauth.jacobusfrancois30.workers.dev'
  };

  var GJS_VERSION = '0.21.13';
  var GJS_JS  = 'https://cdn.jsdelivr.net/npm/grapesjs@' + GJS_VERSION + '/dist/grapes.min.js';
  var GJS_CSS = 'https://cdn.jsdelivr.net/npm/grapesjs@' + GJS_VERSION + '/dist/css/grapes.min.css';
  var TAILWIND = 'https://cdn.tailwindcss.com';
  var FONTS = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';

  var launched = false;
  var token = null;

  /* Which file in the repo this page is. index.html for the site root. */
  function repoPath() {
    var p = window.location.pathname.replace(/^\/+/, '');
    if (!p || p.slice(-1) === '/') p += 'index.html';
    return p;
  }

  var configured = CONFIG.repo.indexOf('YOUR-GITHUB') === -1 &&
                   CONFIG.oauth.indexOf('YOUR-SUBDOMAIN') === -1;

  /* ---------- Floating Launcher Pill on Live Site ---------- */
  function addFloatingLauncher() {
    if (document.getElementById('zu-floating-edit-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'zu-floating-edit-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open Drag and Drop Visual Editor');
    btn.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:9990;display:inline-flex;align-items:center;gap:8px;' +
      'background:rgba(0,39,46,0.92);backdrop-filter:blur(12px);color:#8CC63F;border:1px solid rgba(140,198,63,0.35);' +
      'padding:10px 18px;border-radius:999px;font:700 13px/1 Outfit,system-ui,sans-serif;' +
      'box-shadow:0 12px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(140,198,63,0.2);cursor:pointer;transition:all .25s ease;';
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span>Edit Page (Drag &amp; Drop)</span>';
    
    btn.addEventListener('mouseenter', function() {
      btn.style.background = '#8CC63F';
      btn.style.color = '#00272E';
      btn.style.transform = 'translateY(-2px) scale(1.03)';
      btn.style.boxShadow = '0 16px 36px -8px rgba(140,198,63,0.45)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.background = 'rgba(0,39,46,0.92)';
      btn.style.color = '#8CC63F';
      btn.style.transform = 'none';
      btn.style.boxShadow = '0 12px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(140,198,63,0.2)';
    });
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      launch();
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFloatingLauncher);
  } else {
    addFloatingLauncher();
  }

  /* ---------- trigger: keyboard shortcut or ?edit=1 ---------- */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      launch();
    }
  });

  if (/[?&]edit=1\b/.test(window.location.search)) {
    if (document.readyState === 'complete') setTimeout(launch, 250);
    else window.addEventListener('load', function () { setTimeout(launch, 250); });
  }

  /* ---------- helpers ---------- */
  function loadCss(href) {
    return new Promise(function (res, rej) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href;
      l.onload = res; l.onerror = function () { rej(new Error('Could not load ' + href)); };
      document.head.appendChild(l);
    });
  }
  function loadJs(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = function () { rej(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function toast(msg, tone) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;z-index:100000;left:50%;bottom:26px;transform:translateX(-50%);' +
      'background:' + (tone === 'bad' ? '#EC008C' : '#8CC63F') + ';color:#00272E;font:600 14px/1.4 Outfit,system-ui,sans-serif;' +
      'padding:12px 22px;border-radius:999px;box-shadow:0 18px 40px -16px rgba(0,0,0,.7);transition:all .3s ease;';
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)'; }, 3200);
    setTimeout(function () { t.remove(); }, 3600);
  }

  /* Snapshot of the rendered page */
  function capturePage() {
    var clone = document.body.cloneNode(true);
    clone.querySelectorAll('script').forEach(function (s) { s.remove(); });
    clone.querySelectorAll('#gjs-launcher, #zu-floating-edit-btn, #zu-editor-bar, #gjs, .sr-only').forEach(function (s) { s.remove(); });
    // Freeze lazy images so their URLs survive the round-trip
    clone.querySelectorAll('img[data-src]').forEach(function (img) {
      if (!img.getAttribute('src')) img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    });
    return clone.innerHTML;
  }

  function pageCss() {
    var out = '';
    document.querySelectorAll('style').forEach(function (s) {
      if (s.id !== 'grapesjs-injected') out += s.textContent + '\n';
    });
    return out;
  }

  function tailwindConfigSource() {
    var all = '';
    document.querySelectorAll('script:not([src])').forEach(function (s) {
      if (/tailwind\.config/.test(s.textContent)) all = s.textContent;
    });
    return all || 'tailwind.config={};';
  }

  /* ---------- launch ---------- */
  function launch() {
    if (launched) return;
    launched = true;

    var floatingBtn = document.getElementById('zu-floating-edit-btn');
    if (floatingBtn) floatingBtn.remove();

    var html = capturePage();
    var css = pageCss();
    var twConfig = tailwindConfigSource();

    document.body.style.cssText = 'margin:0;background:#00272E;overflow:hidden';
    document.body.innerHTML =
      '<div id="gjs-launcher" style="position:fixed;inset:0;display:grid;place-items:center;background:#00272E;color:#F4FAF8;' +
      'font:600 16px/1.5 Outfit,system-ui,sans-serif;z-index:99999">' +
      '<div style="text-align:center"><div style="font-size:32px;margin-bottom:12px">🎨</div><div>Loading Visual Editor&hellip;</div></div></div>';

    Promise.all([loadCss(GJS_CSS), loadJs(GJS_JS)])
      .then(function () { boot(html, css, twConfig); })
      .catch(function (err) {
        document.getElementById('gjs-launcher').innerHTML =
          '<div style="text-align:center;max-width:34rem;padding:2rem">' +
          '<p style="font-size:20px;font-weight:800">The editor could not load</p>' +
          '<p style="margin-top:10px;font-weight:400;opacity:.7">' + err.message + '</p>' +
          '<p style="margin-top:10px;font-weight:400;opacity:.7">Please verify your internet connection or reload.</p>' +
          '<button onclick="location.href=location.pathname" style="margin-top:20px;background:#8CC63F;color:#00272E;border:0;' +
          'padding:12px 22px;border-radius:999px;font:700 14px Outfit,sans-serif;cursor:pointer">Back to Live Site</button></div>';
      });
  }

  /* ---------- editor ---------- */
  function boot(html, css, twConfig) {
    var launcher = document.getElementById('gjs-launcher');
    if (launcher) launcher.remove();

    var bar = document.createElement('div');
    bar.id = 'zu-editor-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;right:0;height:56px;z-index:99999;display:flex;align-items:center;' +
      'justify-content:space-between;gap:12px;padding:0 16px;background:#00272E;border-bottom:1px solid rgba(255,255,255,.1);' +
      'font-family:Outfit,system-ui,sans-serif;color:#F4FAF8;box-shadow:0 4px 20px rgba(0,0,0,.4)';
    bar.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;min-width:0">' +
        '<img src="assets/images/mark.png" alt="" style="height:30px;width:30px;border-radius:6px" onerror="this.remove()">' +
        '<div style="min-width:0">' +
          '<div style="font-weight:800;font-size:14px;line-height:1.2;color:#fff">Zu-nique Visual Editor</div>' +
          '<div style="font-size:11px;opacity:.65;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Editing ' + repoPath() + ' &bull; Drag blocks &bull; Double-click text to edit</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:6px">' +
        '<button id="zu-dev-desktop" title="Desktop view" style="background:#8CC63F;color:#00272E;border:0;padding:6px 12px;border-radius:6px;font:700 12px Outfit,sans-serif;cursor:pointer">🖥️ Desktop</button>' +
        '<button id="zu-dev-tablet" title="Tablet view" style="background:rgba(255,255,255,.08);color:#ddd;border:0;padding:6px 12px;border-radius:6px;font:600 12px Outfit,sans-serif;cursor:pointer">📱 Tablet</button>' +
        '<button id="zu-dev-mobile" title="Mobile view" style="background:rgba(255,255,255,.08);color:#ddd;border:0;padding:6px 12px;border-radius:6px;font:600 12px Outfit,sans-serif;cursor:pointer">📱 Mobile</button>' +
        '<div style="width:1px;height:20px;background:rgba(255,255,255,.15);margin:0 4px"></div>' +
        '<button id="zu-toggle-preview" title="Live Preview" style="background:rgba(41,171,226,.15);color:#29ABE2;border:1px solid rgba(41,171,226,.3);padding:6px 14px;border-radius:999px;font:700 12px Outfit,sans-serif;cursor:pointer">👁️ Preview</button>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
        '<a href="admin/" target="_blank" title="Decap CMS" style="background:rgba(255,255,255,.08);color:#F4FAF8;border:1px solid rgba(255,255,255,.14);padding:8px 14px;border-radius:999px;font:600 12px Outfit,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:4px">⚙️ CMS</a>' +
        '<button id="zu-publish" style="background:#8CC63F;color:#00272E;border:0;padding:9px 18px;border-radius:999px;font:700 13px Outfit,sans-serif;cursor:pointer;box-shadow:0 0 16px rgba(140,198,63,.3)">🚀 Publish to Live</button>' +
        '<button id="zu-export" style="background:rgba(255,255,255,.08);color:#F4FAF8;border:1px solid rgba(255,255,255,.14);padding:8px 14px;border-radius:999px;font:600 12px Outfit,sans-serif;cursor:pointer">💾 Download</button>' +
        '<button id="zu-exit" style="background:rgba(255,255,255,.08);color:#F4FAF8;border:1px solid rgba(255,255,255,.14);padding:8px 14px;border-radius:999px;font:600 12px Outfit,sans-serif;cursor:pointer">✕ Live Site</button>' +
      '</div>';
    document.body.appendChild(bar);

    var wrap = document.createElement('div');
    wrap.id = 'gjs';
    wrap.style.cssText = 'position:fixed;top:56px;left:0;right:0;bottom:0';
    document.body.appendChild(wrap);

    var editor = window.grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: 'auto',
      fromElement: false,
      storageManager: false,
      avoidInlineStyle: true,
      components: html,
      style: '',
      assetManager: {
        assets: [
          'assets/images/logo.png',
          'assets/images/mark.png'
        ],
        upload: false,
        uploadText: 'Paste an image URL below or select an asset'
      },
      deviceManager: {
        devices: [
          { id: 'desktop', name: 'Desktop', width: '' },
          { id: 'tablet',  name: 'Tablet',  width: '820px',  widthMedia: '1024px' },
          { id: 'mobile',  name: 'Mobile',  width: '390px',  widthMedia: '640px' }
        ]
      },
      canvas: { styles: [FONTS] },
      selectorManager: { componentFirst: true },
      blockManager: { appendTo: undefined }
    });

    /* Device buttons handling */
    function setDeviceActive(activeId) {
      ['desktop', 'tablet', 'mobile'].forEach(function(d) {
        var btn = document.getElementById('zu-dev-' + d);
        if (btn) {
          if (d === activeId.toLowerCase()) {
            btn.style.background = '#8CC63F';
            btn.style.color = '#00272E';
            btn.style.fontWeight = '700';
          } else {
            btn.style.background = 'rgba(255,255,255,.08)';
            btn.style.color = '#ddd';
            btn.style.fontWeight = '600';
          }
        }
      });
    }

    document.getElementById('zu-dev-desktop').addEventListener('click', function () {
      editor.setDevice('desktop');
      setDeviceActive('desktop');
    });
    document.getElementById('zu-dev-tablet').addEventListener('click', function () {
      editor.setDevice('tablet');
      setDeviceActive('tablet');
    });
    document.getElementById('zu-dev-mobile').addEventListener('click', function () {
      editor.setDevice('mobile');
      setDeviceActive('mobile');
    });

    var isPreview = false;
    document.getElementById('zu-toggle-preview').addEventListener('click', function () {
      isPreview = !isPreview;
      editor.runCommand(isPreview ? 'preview' : 'preview');
      this.textContent = isPreview ? '✏️ Edit Mode' : '👁️ Preview';
      this.style.background = isPreview ? '#29ABE2' : 'rgba(41,171,226,.15)';
      this.style.color = isPreview ? '#00272E' : '#29ABE2';
    });

    /* Inject CSS & Tailwind into editor canvas */
    editor.on('load', function () {
      var doc = editor.Canvas.getDocument();
      if (!doc) return;

      var style = doc.createElement('style');
      style.textContent = css;
      doc.head.appendChild(style);

      var cfg = doc.createElement('script');
      cfg.textContent = twConfig;
      doc.head.appendChild(cfg);

      var tw = doc.createElement('script');
      tw.src = TAILWIND;
      doc.head.appendChild(tw);

      doc.body.className = 'bg-ink text-cream/90 font-body antialiased';
      doc.body.style.background = '#00272E';

      var fix = doc.createElement('style');
      fix.textContent = '.reveal{opacity:1!important;transform:none!important}' +
                        '.tile > img{opacity:1!important}' +
                        '#site-header{position:static!important}' +
                        '#float-whatsapp{position:static!important;display:none}' +
                        '#zu-floating-edit-btn{display:none!important}';
      doc.head.appendChild(fix);
    });

    /* ---------- reusable drag & drop blocks ---------- */
    var bm = editor.BlockManager;
    var cat = 'Zu-nique Elements';

    function block(id, label, media, content) {
      bm.add(id, { label: label, category: cat, media: media, content: content, activate: true });
    }
    var ic = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' + p + '</svg>'; };

    block('zu-section', 'Section', ic('<rect x="3" y="5" width="18" height="14" rx="2"/>'),
      '<section class="py-20 sm:py-28"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">' +
      '<p class="text-xs font-semibold uppercase tracking-[.25em] text-lime">Label</p>' +
      '<h2 class="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Section heading</h2>' +
      '<p class="mt-4 max-w-2xl text-cream/65 leading-relaxed">Replace this paragraph with your own copy.</p>' +
      '</div></section>');

    block('zu-heading', 'Heading', ic('<path d="M6 4v16M18 4v16M6 12h12"/>'),
      '<h2 class="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">New heading</h2>');

    block('zu-text', 'Text Paragraph', ic('<path d="M4 6h16M4 12h16M4 18h10"/>'),
      '<p class="text-cream/70 leading-relaxed text-base">New paragraph — double-click to edit this text freely.</p>');

    block('zu-image', 'Image Tile', ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/>'),
      '<div class="tile aspect-[16/11] rounded-3xl shadow-lift ring-brand overflow-hidden"><img src="assets/images/mark.png" alt="" class="loaded" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1"></div>');

    block('zu-card', 'Feature Card', ic('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18"/>'),
      '<article class="group rounded-3xl overflow-hidden bg-white/[.035] ring-1 ring-white/[.07] shadow-lift p-6">' +
      '<div class="tile aspect-[16/11] rounded-2xl mb-4"><img src="assets/images/mark.png" alt="" class="loaded" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1"></div>' +
      '<span class="rounded-full bg-lime/15 text-lime px-3 py-1 text-[11px] font-bold">Category</span>' +
      '<h3 class="mt-3 font-display text-xl font-bold text-white">Card title</h3>' +
      '<p class="mt-2 text-sm leading-relaxed text-cream/65">Short description for this card.</p></article>');

    block('zu-grid-2', '2 Columns', ic('<rect x="3" y="5" width="8" height="14" rx="1.5"/><rect x="13" y="5" width="8" height="14" rx="1.5"/>'),
      '<div class="grid gap-6 sm:grid-cols-2"><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column one content</p></div>' +
      '<div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column two content</p></div></div>');

    block('zu-grid-3', '3 Columns', ic('<rect x="2.5" y="5" width="5.6" height="14" rx="1.4"/><rect x="9.2" y="5" width="5.6" height="14" rx="1.4"/><rect x="15.9" y="5" width="5.6" height="14" rx="1.4"/>'),
      '<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">' +
      '<div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 1</p></div>' +
      '<div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 2</p></div>' +
      '<div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 3</p></div></div>');

    block('zu-button', 'Action Button', ic('<rect x="3" y="8" width="18" height="8" rx="4"/>'),
      '<a href="#" class="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-ink hover:bg-lime/90 transition shadow-glow">Button label</a>');

    block('zu-whatsapp', 'WhatsApp Button', ic('<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L4 21l1.5-4.4A8.5 8.5 0 1 1 21 12z"/>'),
      '<a href="https://wa.me/27798200108" class="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white hover:opacity-95 transition shadow-lift">Chat on WhatsApp</a>');

    block('zu-hours', 'Hours Badge', ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
      '<div class="rounded-2xl glass ring-brand p-4"><p class="text-[11px] uppercase tracking-widest text-lime/80 font-semibold">Trading Hours</p>' +
      '<p class="mt-1 font-display text-lg font-bold text-white">08:00 &ndash; 17:00</p></div>');

    block('zu-callout', 'Alert / Notice', ic('<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'),
      '<div class="rounded-2xl bg-lime/10 border border-lime/30 p-5 text-lime"><p class="font-bold text-sm">Notice Title</p><p class="mt-1 text-sm text-cream/80">Add important store announcements or stock updates here.</p></div>');

    block('zu-divider', 'Divider Line', ic('<path d="M3 12h18"/>'),
      '<div class="my-10 h-px w-full bg-white/[.08]"></div>');

    /* ---------- export ---------- */
    function buildDocument() {
      var head = document.head.cloneNode(true);
      head.querySelectorAll('link[href*="grapesjs"]').forEach(function (n) { n.remove(); });

      var editorCss = editor.getCss({ avoidProtected: true }) || '';
      var body = editor.getHtml();
      var extra = editorCss.trim() ? '\n<style>/* styles added in visual editor */\n' + editorCss + '\n</style>\n' : '\n';

      return '<!DOCTYPE html>\n<html lang="en" class="scroll-smooth">\n<head>\n' +
        head.innerHTML.trim() + extra +
        '</head>\n<body class="bg-ink text-cream/90 font-body antialiased">\n' +
        body + '\n' + ORIGINAL_SCRIPTS + '\n</body>\n</html>\n';
    }

    var ORIGINAL_SCRIPTS = window.__ZU_SCRIPTS__ || '';

    document.getElementById('zu-export').addEventListener('click', function () {
      try {
        var out = buildDocument();
        var blob = new Blob([out], { type: 'text/html;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = repoPath();
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
        toast('File downloaded successfully.');
      } catch (err) {
        toast('Export failed: ' + err.message, 'bad');
      }
    });

    /* ---------- publish straight to GitHub ---------- */
    var publishBtn = document.getElementById('zu-publish');

    function setBusy(on, label) {
      publishBtn.disabled = on;
      publishBtn.style.opacity = on ? '.6' : '1';
      publishBtn.style.cursor = on ? 'default' : 'pointer';
      publishBtn.textContent = label || (on ? 'Publishing…' : '🚀 Publish to Live');
    }

    publishBtn.addEventListener('click', function () {
      if (!configured) {
        toast('Set repo and oauth in assets/editor.js before publishing', 'bad');
        return;
      }
      setBusy(true, 'Signing in…');
      signIn()
        .then(function () { setBusy(true, 'Publishing…'); return commitFile(buildDocument()); })
        .then(function () {
          setBusy(false);
          toast('✨ Published! The live site updates in ~60 seconds.');
        })
        .catch(function (err) {
          setBusy(false);
          token = null;
          toast('Publish failed: ' + err.message, 'bad');
        });
    });

    document.getElementById('zu-exit').addEventListener('click', function () {
      if (confirm('Exit visual editor and view live site? Any unsaved edits will be discarded.')) {
        window.location.href = window.location.pathname;
      }
    });

    toast('Visual Editor ready — drag blocks from the right panel or click to edit');
  }

  /* Stash inline scripts */
  (function stashScripts() {
    var out = [];
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('script').forEach(function (s) {
        var raw = s.getAttribute('src');
        if (raw) {
          if (/grapesjs/.test(raw)) return;
          if (/^(https?:)?\/\//i.test(raw)) return;
          out.push('<script src="' + raw + '"' + (s.defer ? ' defer' : '') + '><\/script>');
          return;
        }
        if (/tailwind\.config/.test(s.textContent || '')) return;
        var type = s.type ? ' type="' + s.type + '"' : '';
        out.push('<script' + type + '>' + s.textContent + '<\/script>');
      });
      window.__ZU_SCRIPTS__ = out.join('\n');
    });
  })();

  /* ---------- GitHub sign-in through OAuth worker ---------- */
  function signIn() {
    if (token) return Promise.resolve(token);

    return new Promise(function (resolve, reject) {
      var w = 620, h = 720;
      var left = window.screenX + (window.outerWidth - w) / 2;
      var top = window.screenY + (window.outerHeight - h) / 2;
      var popup = window.open(
        CONFIG.oauth.replace(/\/$/, '') + '/auth?provider=github&scope=repo',
        'zu-github-auth',
        'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top
      );
      if (!popup) { reject(new Error('Sign-in window blocked: please allow popups')); return; }

      var done = false;
      var expected;
      try { expected = new URL(CONFIG.oauth).origin; } catch (err) { expected = null; }

      function onMessage(e) {
        if (expected && e.origin !== expected) return;
        var d = e.data;
        if (typeof d !== 'string') return;
        if (d === 'authorizing:github') { popup.postMessage('authorizing:github', '*'); return; }
        if (d.indexOf('authorization:github:success:') === 0) {
          finish();
          try {
            token = JSON.parse(d.slice('authorization:github:success:'.length)).token;
            resolve(token);
          } catch (err) { reject(new Error('Could not parse sign-in response')); }
        } else if (d.indexOf('authorization:github:error:') === 0) {
          finish();
          reject(new Error('GitHub authorization refused'));
        }
      }
      function finish() {
        if (done) return;
        done = true;
        window.removeEventListener('message', onMessage);
        clearInterval(watch);
        try { popup.close(); } catch (e) {}
      }
      window.addEventListener('message', onMessage, false);

      var watch = setInterval(function () {
        if (popup.closed && !done) { finish(); reject(new Error('Sign-in window was closed')); }
      }, 600);

      setTimeout(function () { if (!done) { finish(); reject(new Error('Sign-in timed out')); } }, 120000);
    });
  }

  /* ---------- commit file to GitHub ---------- */
  function b64(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function api(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign({
      Authorization: 'token ' + token,
      Accept: 'application/vnd.github+json'
    }, opts.headers || {});
    return fetch('https://api.github.com' + path, opts).then(function (r) {
      if (r.status === 401) throw new Error('GitHub authentication rejected');
      if (r.status === 403) throw new Error('Account does not have write access to ' + CONFIG.repo);
      return r.json().then(function (body) { return { status: r.status, body: body }; });
    });
  }

  function commitFile(html) {
    var path = repoPath();
    var base = '/repos/' + CONFIG.repo + '/contents/' + path;

    return api(base + '?ref=' + encodeURIComponent(CONFIG.branch))
      .then(function (res) {
        var sha = res.status === 200 ? res.body.sha : undefined;
        if (res.status !== 200 && res.status !== 404) {
          throw new Error(res.body.message || 'GitHub error ' + res.status);
        }
        return api(base, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: 'Update ' + path + ' via Visual Drag & Drop Editor',
            content: b64(html),
            branch: CONFIG.branch,
            sha: sha
          })
        });
      })
      .then(function (res) {
        if (res.status === 409) throw new Error('File conflict: please reload the page and redo the edit');
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.body.message || 'GitHub error ' + res.status);
        }
        return res.body;
      });
  }
})();

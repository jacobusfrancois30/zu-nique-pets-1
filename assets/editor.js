/* =====================================================================
   Zu-nique Pet Shop: embedded visual editing engine (GrapesJS)
   ---------------------------------------------------------------------
   Loads nothing until you ask for it, so visitors never pay for it.

   How to open the editor:
     - Click the floating "✏️ Edit Page" button on the bottom left, or
     - Press Ctrl + Shift + E (Cmd + Shift + E on Mac), or
     - Visit https://your-site/?edit=1
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
  var token = localStorage.getItem('zu_gh_token') || null;

  /* Custom assets stored in localStorage */
  function getStoredAssets() {
    try {
      var raw = localStorage.getItem('zu_custom_assets');
      var list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      var defaults = [
        { src: 'assets/images/logo.png', name: 'Logo (Zu-nique)', isDefault: true },
        { src: 'assets/images/mark.png', name: 'Mark Icon', isDefault: true }
      ];
      defaults.forEach(function(d) {
        if (!list.some(function(item) { return item.src === d.src; })) {
          list.unshift(d);
        }
      });
      return list;
    } catch (e) {
      return [
        { src: 'assets/images/logo.png', name: 'Logo (Zu-nique)', isDefault: true },
        { src: 'assets/images/mark.png', name: 'Mark Icon', isDefault: true }
      ];
    }
  }

  function saveStoredAssets(assets) {
    try {
      localStorage.setItem('zu_custom_assets', JSON.stringify(assets));
    } catch (e) {
      console.warn('LocalStorage full or unavailable', e);
    }
  }

  function addStoredAsset(asset) {
    var list = getStoredAssets();
    var exists = list.some(function(a) { return a.src === asset.src; });
    if (!exists) {
      list.unshift(asset);
      saveStoredAssets(list);
    }
    return list;
  }

  function deleteStoredAsset(src) {
    var list = getStoredAssets().filter(function(a) { return a.src !== src; });
    saveStoredAssets(list);
    return list;
  }

  function addAssetToGrapes(editor, asset) {
    try {
      var am = editor.Assets || editor.assetManager || (editor.AssetManager ? editor.AssetManager : null);
      if (am && typeof am.add === 'function') {
        am.add(asset);
      }
    } catch (e) {}
  }

  function removeAssetFromGrapes(editor, src) {
    try {
      var am = editor.Assets || editor.assetManager || (editor.AssetManager ? editor.AssetManager : null);
      if (am && typeof am.remove === 'function') {
        am.remove(src);
      }
    } catch (e) {}
  }

  function processImageFile(file, callback) {
    if (!file || !file.type.match(/^image\//)) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var rawUrl = e.target.result;
      var img = new Image();
      img.onload = function() {
        var maxDim = 1600;
        var w = img.width;
        var h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        try {
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var resizedUrl = canvas.toDataURL('image/jpeg', 0.85);
          callback(resizedUrl);
        } catch (err) {
          callback(rawUrl);
        }
      };
      img.onerror = function() {
        callback(rawUrl);
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  }

  /* Which file in the repo this page is. index.html for the site root. */
  function repoPath() {
    var p = window.location.pathname.replace(/^\/+/, '');
    if (!p || p.slice(-1) === '/') p += 'index.html';
    return p;
  }

  /* ---------- trigger: keyboard shortcut or ?edit=1 (editor hidden from public) ---------- */
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
    t.style.cssText = 'position:fixed;z-index:100000;left:50%;bottom:30px;transform:translateX(-50%);' +
      'background:' + (tone === 'bad' ? '#EC008C' : '#8CC63F') + ';color:#00272E;font:700 14px/1.4 Outfit,system-ui,sans-serif;' +
      'padding:12px 24px;border-radius:999px;box-shadow:0 18px 40px -16px rgba(0,0,0,.7);transition:all .3s ease;';
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)'; }, 3200);
    setTimeout(function () { t.remove(); }, 3600);
  }

  /* Snapshot of the rendered page */
  function capturePage() {
    stashScripts();
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    var clone = document.body.cloneNode(true);
    clone.querySelectorAll('script').forEach(function (s) { s.remove(); });
    clone.querySelectorAll('#gjs-launcher, #zu-floating-edit-btn, #zu-editor-bar, #zu-context-bar, #gjs, .sr-only, #zu-auth-modal').forEach(function (s) { s.remove(); });
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
          '<div style="font-size:11px;opacity:.65;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Click any box to transform it &bull; Drag images from desktop &bull; Double-click text</div>' +
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
        '<button id="zu-token-btn" style="background:rgba(255,255,255,.08);color:#F4FAF8;border:1px solid rgba(255,255,255,.14);padding:8px 14px;border-radius:999px;font:600 12px Outfit,sans-serif;cursor:pointer" title="Configure GitHub Token">' +
          (token ? '🔑 Token Saved' : '🔑 Token') +
        '</button>' +
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

    /* ---------- Floating Selection Action Bar ---------- */
    var ctxBar = document.createElement('div');
    ctxBar.id = 'zu-context-bar';
    ctxBar.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99990;display:none;align-items:center;gap:8px;' +
      'background:rgba(0,39,46,0.95);backdrop-filter:blur(16px);color:#F4FAF8;border:1px solid rgba(140,198,63,0.4);' +
      'padding:8px 14px;border-radius:999px;box-shadow:0 14px 36px rgba(0,0,0,0.6), 0 0 20px rgba(140,198,63,0.2);' +
      'font-family:Outfit,sans-serif;font-size:13px;font-weight:600;transition:all .2s ease;';
    document.body.appendChild(ctxBar);

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
        assets: getStoredAssets(),
        upload: true,
        uploadText: '📁 Drag & drop images here or click to browse',
        embedAsBase64: true,
        dropzone: true
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
      if (isPreview) ctxBar.style.display = 'none';
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
      fix.textContent = '.reveal{opacity:1!important;transform:none!important;visibility:visible!important}' +
                        '.tile > img{opacity:1!important}' +
                        'body{background:#00272E!important;color:#F4FAF8!important;min-height:100vh}' +
                        '#site-header{position:static!important}' +
                        '#float-whatsapp{display:none!important}' +
                        '#zu-floating-edit-btn{display:none!important}' +
                        '.gjs-drop-active{outline:3px dashed #8CC63F!important;outline-offset:-3px}';
      doc.head.appendChild(fix);

      /* Direct Drag & Drop image files from desktop onto the canvas */
      doc.addEventListener('dragover', function (e) {
        if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = 'copy';
          var hoverEl = doc.elementFromPoint(e.clientX, e.clientY);
          if (hoverEl) {
            doc.querySelectorAll('.gjs-drop-active').forEach(function(el) { if (el !== hoverEl) el.classList.remove('gjs-drop-active'); });
            hoverEl.classList.add('gjs-drop-active');
          }
        }
      });

      doc.addEventListener('dragleave', function (e) {
        if (!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') {
          doc.querySelectorAll('.gjs-drop-active').forEach(function(el) { el.classList.remove('gjs-drop-active'); });
        }
      });

      doc.addEventListener('drop', function (e) {
        doc.querySelectorAll('.gjs-drop-active').forEach(function(el) { el.classList.remove('gjs-drop-active'); });
        if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files.length) return;
        var files = e.dataTransfer.files;
        var imageFiles = Array.from(files).filter(function(f) { return f.type && f.type.match(/^image\//); });
        if (imageFiles.length === 0) return;

        e.preventDefault();
        e.stopPropagation();

        var dropX = e.clientX;
        var dropY = e.clientY;
        var targetEl = doc.elementFromPoint(dropX, dropY);

        Array.from(imageFiles).forEach(function(file) {
          processImageFile(file, function(dataUrl) {
            addStoredAsset({ src: dataUrl, name: file.name });
            addAssetToGrapes(editor, { src: dataUrl, name: file.name });

            var imgEl = null;
            if (targetEl) {
              if (targetEl.tagName === 'IMG') {
                imgEl = targetEl;
              } else if (targetEl.querySelector('img')) {
                imgEl = targetEl.querySelector('img');
              } else if (targetEl.closest('.tile')) {
                imgEl = targetEl.closest('.tile').querySelector('img');
              }
            }

            if (imgEl) {
              imgEl.src = dataUrl;
              imgEl.setAttribute('src', dataUrl);
              imgEl.classList.add('loaded');
              var comp = editor.DomComponents.getWrapper().find('img').find(function(c) {
                return c.getEl() === imgEl;
              });
              if (comp) {
                comp.set('src', dataUrl);
                comp.addAttributes({ src: dataUrl });
              }
              toast('✨ Image replaced: ' + file.name);
            } else {
              var selected = editor.getSelected() || editor.DomComponents.getWrapper();
              selected.append({
                tagName: 'img',
                type: 'image',
                src: dataUrl,
                attributes: {
                  src: dataUrl,
                  alt: file.name,
                  class: 'w-full max-w-2xl rounded-3xl shadow-lift my-6 object-cover'
                }
              });
              toast('✨ Image dropped onto page: ' + file.name);
            }
          });
        });
      });
    });

    /* =====================================================================
       PHOTO GALLERY MODAL (WITH UPLOAD, SELECT & DELETE PHOTOS)
       ===================================================================== */
    function openPhotoGallery(targetComponent) {
      var modal = editor.Modal;
      modal.setTitle('📁 Image Gallery & Photo Manager');
      var container = document.createElement('div');
      container.style.cssText = 'padding:16px;font-family:Outfit,sans-serif;color:#fff;max-width:700px;max-height:75vh;overflow-y:auto';

      function renderGallery() {
        container.innerHTML = '';

        // Upload header section
        var uploadBox = document.createElement('div');
        uploadBox.style.cssText = 'border:2px dashed rgba(140,198,63,.4);border-radius:14px;padding:20px;text-align:center;background:rgba(140,198,63,.05);margin-bottom:20px;cursor:pointer';
        uploadBox.innerHTML =
          '<input type="file" id="zu-gallery-file" accept="image/*" multiple style="display:none">' +
          '<div style="font-size:24px;margin-bottom:6px">📁</div>' +
          '<div style="font-weight:700;color:#8CC63F;font-size:14px">Click or Drag &amp; Drop Image Files Here to Upload</div>' +
          '<div style="font-size:12px;opacity:.65;margin-top:4px">PNG, JPG, WEBP, GIF supported</div>';

        var fileInput = uploadBox.querySelector('#zu-gallery-file');
        fileInput.addEventListener('click', function(e) { e.stopPropagation(); });
        uploadBox.addEventListener('click', function () { fileInput.click(); });
        
        uploadBox.addEventListener('dragover', function(e) { e.preventDefault(); uploadBox.style.borderColor = '#8CC63F'; });
        uploadBox.addEventListener('dragleave', function() { uploadBox.style.borderColor = 'rgba(140,198,63,.4)'; });
        uploadBox.addEventListener('drop', function(e) {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        });
        fileInput.addEventListener('change', function() { handleFiles(fileInput.files); });

        function handleFiles(files) {
          if (!files || !files.length) return;
          var promises = [];
          Array.from(files).forEach(function(f) {
            if (!f.type.match(/^image\//)) return;
            promises.push(new Promise(function(res) {
              processImageFile(f, function(src) {
                addStoredAsset({ src: src, name: f.name });
                addAssetToGrapes(editor, { src: src, name: f.name });
                res();
              });
            }));
          });
          Promise.all(promises).then(function() {
            toast('✨ Uploaded ' + promises.length + ' image(s)!');
            renderGallery();
          });
        }

        container.appendChild(uploadBox);

        // Assets Grid
        var assets = getStoredAssets();
        var title = document.createElement('div');
        title.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px';
        title.innerHTML = '<span style="font-weight:700;font-size:15px;color:#fff">Saved Photos (' + assets.length + ')</span>' +
          '<span style="font-size:11px;opacity:.6">Click photo to apply &bull; 🗑️ to delete</span>';
        container.appendChild(title);

        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px';

        assets.forEach(function (asset) {
          var card = document.createElement('div');
          card.style.cssText = 'position:relative;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;overflow:hidden;transition:all .2s ease;display:flex;flex-direction:column';

          var thumbWrap = document.createElement('div');
          thumbWrap.style.cssText = 'width:100%;height:100px;background:#00171b;display:grid;place-items:center;overflow:hidden;cursor:pointer';
          thumbWrap.innerHTML = '<img src="' + asset.src + '" alt="" style="width:100%;height:100%;object-fit:cover">';
          
          thumbWrap.addEventListener('click', function () {
            applyPhoto(asset.src);
          });

          var meta = document.createElement('div');
          meta.style.cssText = 'padding:8px;font-size:11px;display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,.3)';
          meta.innerHTML = '<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;color:#ddd" title="' + (asset.name || 'Image') + '">' + (asset.name || 'Image') + '</div>';

          // Delete button
          var delBtn = document.createElement('button');
          delBtn.style.cssText = 'background:rgba(236,0,140,.2);color:#EC008C;border:1px solid rgba(236,0,140,.4);border-radius:6px;padding:3px 6px;cursor:pointer;font-size:11px;line-height:1;transition:all .2s ease';
          delBtn.innerHTML = '🗑️';
          delBtn.title = 'Delete photo from gallery';
          delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (confirm('Delete this photo from gallery?')) {
              deleteStoredAsset(asset.src);
              removeAssetFromGrapes(editor, asset.src);
              toast('🗑️ Photo deleted');
              renderGallery();
            }
          });
          meta.appendChild(delBtn);

          card.appendChild(thumbWrap);
          card.appendChild(meta);
          grid.appendChild(card);
        });

        container.appendChild(grid);
      }

      function applyPhoto(src) {
        if (targetComponent) {
          var isImg = targetComponent.get('tagName') === 'img' || targetComponent.is('image');
          var innerImg = targetComponent.find ? targetComponent.find('img')[0] : null;
          var compImg = isImg ? targetComponent : innerImg;

          if (compImg) {
            compImg.set('src', src);
            compImg.addAttributes({ src: src });
            var el = compImg.getEl();
            if (el) { el.src = src; el.classList.add('loaded'); }
          } else {
            // Append an image inside or after
            targetComponent.append({
              tagName: 'img',
              type: 'image',
              src: src,
              attributes: { src: src, class: 'w-full max-w-xl rounded-2xl shadow-lift my-4 object-cover' }
            });
          }
        }
        modal.close();
        toast('✨ Image selected and applied!');
      }

      renderGallery();
      modal.setContent(container);
      modal.open();
    }

    /* =====================================================================
       TRANSFORMATION ENGINE: Convert any box/element into a different type
       ===================================================================== */
    var BOX_TEMPLATES = {
      image: {
        title: '🖼️ Image Tile',
        desc: 'Converts box into a photo tile with overlay styling',
        html: '<div class="tile aspect-[16/11] rounded-3xl shadow-lift ring-brand overflow-hidden my-4"><img src="assets/images/mark.png" alt="" class="loaded" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1"></div>'
      },
      card: {
        title: '🎴 Feature Card',
        desc: 'Photo, category badge, heading, and description text',
        html: '<article class="group rounded-3xl overflow-hidden bg-white/[.035] ring-1 ring-white/[.07] shadow-lift p-6 my-4">' +
          '<div class="tile aspect-[16/11] rounded-2xl mb-4"><img src="assets/images/mark.png" alt="" class="loaded" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1"></div>' +
          '<span class="rounded-full bg-lime/15 text-lime px-3 py-1 text-[11px] font-bold">Category</span>' +
          '<h3 class="mt-3 font-display text-xl font-bold text-white">Card title</h3>' +
          '<p class="mt-2 text-sm leading-relaxed text-cream/65">Short description for this card. Double-click to edit.</p></article>'
      },
      callout: {
        title: '💬 Alert / Notice Callout',
        desc: 'Highlighted announcement box with colored accent border',
        html: '<div class="rounded-2xl bg-lime/10 border border-lime/30 p-5 text-lime my-4"><p class="font-bold text-sm">Notice Title</p><p class="mt-1 text-sm text-cream/80">Add important store announcements or stock updates here.</p></div>'
      },
      button: {
        title: '🔘 Action Button',
        desc: 'Pill-shaped call to action button',
        html: '<div class="my-3"><a href="#" class="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-ink hover:bg-lime/90 transition shadow-glow">Button label</a></div>'
      },
      whatsapp: {
        title: '📱 WhatsApp Chat Button',
        desc: 'Direct green chat button linked to WhatsApp',
        html: '<div class="my-3"><a href="https://wa.me/27798200108" class="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white hover:opacity-95 transition shadow-lift">Chat on WhatsApp</a></div>'
      },
      grid2: {
        title: '📊 2-Column Grid',
        desc: 'Two equal-width container cards side-by-side',
        html: '<div class="grid gap-6 sm:grid-cols-2 my-4"><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 1 content</p></div><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 2 content</p></div></div>'
      },
      grid3: {
        title: '📊 3-Column Grid',
        desc: 'Three container cards across the section',
        html: '<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 my-4"><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 1</p></div><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 2</p></div><div class="rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6"><p class="text-cream/75">Column 3</p></div></div>'
      },
      headingText: {
        title: '📝 Heading + Paragraph',
        desc: 'Section title with explanatory paragraph',
        html: '<div class="my-4"><h2 class="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Section Heading</h2><p class="mt-3 text-cream/70 leading-relaxed text-base">Write your copy here — double-click to retype.</p></div>'
      }
    };

    function showTransformModal(component) {
      if (!component) return;
      var modal = editor.Modal;
      modal.setTitle('🔄 Transform Selected Box');
      var container = document.createElement('div');
      container.style.cssText = 'padding:16px 8px;font-family:Outfit,sans-serif;color:#fff;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-height:65vh;overflow-y:auto';

      Object.keys(BOX_TEMPLATES).forEach(function (k) {
        var item = BOX_TEMPLATES[k];
        var card = document.createElement('div');
        card.style.cssText = 'background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;cursor:pointer;transition:all .2s ease';
        card.innerHTML = '<div style="font-weight:700;font-size:15px;color:#8CC63F;margin-bottom:6px">' + item.title + '</div><div style="font-size:12px;opacity:.7;line-height:1.4">' + item.desc + '</div>';
        
        card.addEventListener('mouseenter', function () {
          card.style.background = 'rgba(140,198,63,.15)';
          card.style.borderColor = '#8CC63F';
          card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.background = 'rgba(255,255,255,.05)';
          card.style.borderColor = 'rgba(255,255,255,.12)';
          card.style.transform = 'none';
        });
        card.addEventListener('click', function () {
          var parent = component.parent();
          if (!parent) parent = editor.DomComponents.getWrapper();
          var index = component.index();
          parent.append(item.html, { at: index });
          component.remove();
          ctxBar.style.display = 'none';
          modal.close();
          toast('✨ Box transformed to ' + item.title.split(' ')[1]);
        });
        container.appendChild(card);
      });

      modal.setContent(container);
      modal.open();
    }

    /* =====================================================================
       QUICK STYLE MODAL: 1-click theme & background colors
       ===================================================================== */
    var STYLES = [
      { name: '🟢 Lime Accent Glow', cls: 'rounded-3xl bg-lime/10 border border-lime/30 p-6 text-lime' },
      { name: '🔵 Cyan Ice Accent', cls: 'rounded-3xl bg-cyan/10 border border-cyan/30 p-6 text-cyan' },
      { name: '🟠 Amber Warm Accent', cls: 'rounded-3xl bg-amber/10 border border-amber/30 p-6 text-amber' },
      { name: '🟣 Magenta Neon Accent', cls: 'rounded-3xl bg-magenta/10 border border-magenta/30 p-6 text-magenta' },
      { name: '🪟 Frosted Glass Card', cls: 'rounded-3xl glass ring-brand p-6' },
      { name: '⬛ Solid Dark Surface', cls: 'rounded-3xl bg-white/[.035] ring-1 ring-white/[.07] p-6' },
      { name: '⭕ Rounded Pill Style', cls: 'rounded-full bg-white/[.06] border border-white/10 px-6 py-3' }
    ];

    function showStyleModal(component) {
      if (!component) return;
      var modal = editor.Modal;
      modal.setTitle('🎨 Quick Style & Theme');
      var container = document.createElement('div');
      container.style.cssText = 'padding:16px 8px;font-family:Outfit,sans-serif;color:#fff;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px';

      STYLES.forEach(function (s) {
        var card = document.createElement('div');
        card.style.cssText = 'background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;cursor:pointer;transition:all .2s ease';
        card.innerHTML = '<div style="font-weight:700;font-size:14px;color:#fff">' + s.name + '</div>';

        card.addEventListener('mouseenter', function () { card.style.borderColor = '#8CC63F'; card.style.background = 'rgba(140,198,63,.15)'; });
        card.addEventListener('mouseleave', function () { card.style.borderColor = 'rgba(255,255,255,.12)'; card.style.background = 'rgba(255,255,255,.05)'; });
        card.addEventListener('click', function () {
          var el = component.getEl();
          if (el) {
            s.cls.split(' ').forEach(function(c) { component.addClass(c); });
          }
          modal.close();
          toast('✨ Style applied: ' + s.name);
        });
        container.appendChild(card);
      });

      modal.setContent(container);
      modal.open();
    }

    /* =====================================================================
       INSERT BELOW MODAL
       ===================================================================== */
    function showInsertModal(component) {
      if (!component) return;
      var modal = editor.Modal;
      modal.setTitle('➕ Insert Element Below');
      var container = document.createElement('div');
      container.style.cssText = 'padding:16px 8px;font-family:Outfit,sans-serif;color:#fff;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px';

      var inserts = [
        { label: '🖼️ Image', html: '<div class="my-4"><img src="assets/images/mark.png" alt="Image" class="w-full max-w-xl rounded-2xl shadow-lift object-cover"></div>' },
        { label: '📝 Heading', html: '<h2 class="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white my-3">New Heading</h2>' },
        { label: '📄 Paragraph', html: '<p class="text-cream/70 leading-relaxed text-base my-3">New paragraph text — double-click to edit freely.</p>' },
        { label: '🎴 Feature Card', html: BOX_TEMPLATES.card.html },
        { label: '🔘 Button', html: BOX_TEMPLATES.button.html },
        { label: '💬 Callout Notice', html: BOX_TEMPLATES.callout.html }
      ];

      inserts.forEach(function (item) {
        var card = document.createElement('div');
        card.style.cssText = 'background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px;cursor:pointer;font-weight:700;font-size:14px;text-align:center';
        card.textContent = item.label;

        card.addEventListener('mouseenter', function () { card.style.background = 'rgba(140,198,63,.15)'; card.style.borderColor = '#8CC63F'; });
        card.addEventListener('mouseleave', function () { card.style.background = 'rgba(255,255,255,.05)'; card.style.borderColor = 'rgba(255,255,255,.12)'; });
        card.addEventListener('click', function () {
          var parent = component.parent() || editor.DomComponents.getWrapper();
          var index = component.index() + 1;
          parent.append(item.html, { at: index });
          modal.close();
          toast('✨ Inserted ' + item.label);
        });
        container.appendChild(card);
      });

      modal.setContent(container);
      modal.open();
    }

    /* =====================================================================
       RENDER FLOATING CONTEXT ACTION BAR ON COMPONENT SELECTION
       ===================================================================== */
    editor.on('component:selected', function (component) {
      if (!component || isPreview) {
        ctxBar.style.display = 'none';
        return;
      }

      var tag = component.get('tagName') || 'box';
      var isImg = tag === 'img' || component.is('image');
      var innerImgs = component.find ? component.find('img') : [];
      var hasImg = isImg || innerImgs.length > 0;

      ctxBar.innerHTML = '';
      ctxBar.style.display = 'inline-flex';

      var badge = document.createElement('span');
      badge.style.cssText = 'background:rgba(140,198,63,.2);color:#8CC63F;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800;text-transform:uppercase;margin-right:4px';
      badge.textContent = tag;
      ctxBar.appendChild(badge);

      function btn(label, bg, color, onClick, title) {
        var b = document.createElement('button');
        b.type = 'button';
        b.style.cssText = 'background:' + bg + ';color:' + color + ';border:0;padding:6px 12px;border-radius:999px;font:700 12px Outfit,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:all .15s ease';
        b.innerHTML = label;
        if (title) b.title = title;
        b.addEventListener('mouseenter', function() { b.style.transform = 'scale(1.05)'; });
        b.addEventListener('mouseleave', function() { b.style.transform = 'none'; });
        b.addEventListener('click', onClick);
        ctxBar.appendChild(b);
      }

      btn('🔄 Transform Box', '#8CC63F', '#00272E', function () {
        showTransformModal(component);
      }, 'Change this box into Image, Card, Notice, Button, Grid, etc.');

      btn('🎨 Style', 'rgba(255,255,255,.1)', '#fff', function () {
        showStyleModal(component);
      }, 'Change color theme & background');

      btn('🖼️ ' + (hasImg ? 'Change Photo' : 'Add Photo'), 'rgba(41,171,226,.2)', '#29ABE2', function () {
        openPhotoGallery(component);
      }, 'Open photo gallery to swap or upload image');

      if (hasImg) {
        btn('❌ Clear Photo', 'rgba(236,0,140,.15)', '#EC008C', function () {
          var targetImg = isImg ? component : innerImgs[0];
          if (targetImg) {
            targetImg.set('src', '');
            targetImg.addAttributes({ src: '' });
            var el = targetImg.getEl();
            if (el) el.src = '';
            toast('🗑️ Photo removed from box');
          }
        }, 'Remove photo from this element');
      }

      btn('➕ Insert Below', 'rgba(255,255,255,.1)', '#ddd', function () {
        showInsertModal(component);
      }, 'Add an element right beneath this box');

      btn('🗑️ Delete', 'rgba(236,0,140,.2)', '#EC008C', function () {
        component.remove();
        ctxBar.style.display = 'none';
        toast('🗑️ Element removed');
      }, 'Delete this box');
    });

    editor.on('component:deselected', function () {
      setTimeout(function() {
        if (!editor.getSelected()) ctxBar.style.display = 'none';
      }, 100);
    });

    /* Double-click image to open photo gallery */
    editor.on('component:dblclick', function (component) {
      if (!component) return;
      var tag = component.get('tagName');
      var isImg = tag === 'img' || component.is('image');
      var innerImgs = component.find ? component.find('img') : [];
      if (isImg || innerImgs.length > 0) {
        openPhotoGallery(component);
      }
    });

    /* Override GrapesJS open-assets command */
    editor.Commands.add('open-assets', {
      run: function (ed, sender, opts) {
        var target = (opts && opts.target) ? opts.target : ed.getSelected();
        openPhotoGallery(target);
      }
    });

    /* ---------- reusable drag & drop blocks ---------- */
    var bm = editor.BlockManager;
    var cat = 'Zu-nique Elements';

    function block(id, label, media, content) {
      bm.add(id, { label: label, category: cat, media: media, content: content, activate: true });
    }
    var ic = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' + p + '</svg>'; };

    block('zu-raw-image', 'Image', ic('<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
      '<div class="my-4"><img src="assets/images/mark.png" alt="Image" class="w-full max-w-2xl rounded-2xl shadow-lift object-cover"></div>');

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

    /* =====================================================================
       AUTHENTICATION & TOKEN MODAL
       ===================================================================== */
    function showAuthModal(onSuccess) {
      var modal = editor.Modal;
      modal.setTitle('🔑 Connect to GitHub to Publish');
      var container = document.createElement('div');
      container.style.cssText = 'padding:20px;font-family:Outfit,sans-serif;color:#F4FAF8;max-width:500px';
      container.innerHTML =
        '<div style="background:rgba(140,198,63,.08);border:1px solid rgba(140,198,63,.25);border-radius:12px;padding:14px;margin-bottom:20px">' +
          '<p style="margin:0;font-size:13px;font-weight:700;color:#8CC63F;letter-spacing:.05em">HOW TO PUBLISH YOUR SITE</p>' +
          '<ol style="margin:10px 0 0;padding-left:18px;font-size:13px;color:#ddd;line-height:1.9">' +
            '<li>Click the green button below to open GitHub</li>' +
            '<li>Sign in if prompted, then click <strong style="color:#fff">Generate token</strong></li>' +
            '<li>Copy the token that appears (starts with <code>ghp_</code>)</li>' +
            '<li>Paste it in the box below and click <strong style="color:#8CC63F">Save & Publish</strong></li>' +
          '</ol>' +
        '</div>' +
        '<a href="https://github.com/settings/tokens/new?scopes=repo&description=Zu-nique+Visual+Editor" target="_blank" ' +
          'style="display:block;background:#238636;color:#fff;text-align:center;padding:11px;border-radius:8px;font:700 14px Outfit,sans-serif;text-decoration:none;margin-bottom:18px">' +
          '🔗 Step 1: Open GitHub Token Page' +
        '</a>' +
        '<label style="display:block;font-size:12px;font-weight:700;color:#8CC63F;margin-bottom:6px;letter-spacing:.06em">STEP 2: PASTE YOUR TOKEN HERE</label>' +
        '<input id="zu-pat-input" type="text" placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" value="' + (token || '') + '" ' +
          'style="width:100%;box-sizing:border-box;background:#001d22;border:2px solid rgba(140,198,63,.4);color:#8CC63F;padding:11px 14px;border-radius:8px;font-family:monospace;font-size:13px;outline:none;letter-spacing:.04em">' +
        '<div id="zu-token-status" style="min-height:20px;margin-top:8px;font-size:12px"></div>' +
        '<div style="display:flex;gap:8px;margin-top:14px">' +
          '<button id="zu-save-pat" style="flex:1;background:#8CC63F;color:#00272E;border:0;padding:12px 16px;border-radius:8px;font:700 14px Outfit,sans-serif;cursor:pointer">✅ Save & Publish</button>' +
          (token ? '<button id="zu-clear-pat" style="background:rgba(236,0,140,.15);color:#EC008C;border:1px solid rgba(236,0,140,.3);padding:11px 14px;border-radius:8px;font:600 12px Outfit,sans-serif;cursor:pointer">🗑️ Remove</button>' : '') +
        '</div>';

      modal.setContent(container);
      modal.open();

      var patInput = container.querySelector('#zu-pat-input');
      var savePatBtn = container.querySelector('#zu-save-pat');
      var clearPatBtn = container.querySelector('#zu-clear-pat');
      var statusEl = container.querySelector('#zu-token-status');

      function setStatus(msg, ok) {
        statusEl.textContent = msg;
        statusEl.style.color = ok ? '#8CC63F' : '#ff6b6b';
      }

      savePatBtn.addEventListener('click', function () {
        var val = (patInput.value || '').trim();
        if (!val) { setStatus('⚠️ Please paste your GitHub token first.', false); return; }
        savePatBtn.disabled = true;
        savePatBtn.textContent = 'Checking token…';
        setStatus('', true);

        fetch('https://api.github.com/repos/' + CONFIG.repo, {
          headers: { Authorization: 'token ' + val, Accept: 'application/vnd.github+json' }
        }).then(function(r) {
          if (r.status === 200 || r.status === 201) {
            token = val;
            localStorage.setItem('zu_gh_token', token);
            var btn = document.getElementById('zu-token-btn');
            if (btn) btn.textContent = '🔑 Token ✓';
            modal.close();
            toast('✅ Token verified! Publishing now…');
            if (onSuccess) onSuccess();
          } else if (r.status === 401) {
            setStatus('❌ Token is invalid or expired. Please generate a new one.', false);
            savePatBtn.disabled = false;
            savePatBtn.textContent = '✅ Save & Publish';
          } else if (r.status === 403) {
            setStatus('❌ Token lacks repo access. Make sure "repo" scope is selected.', false);
            savePatBtn.disabled = false;
            savePatBtn.textContent = '✅ Save & Publish';
          } else if (r.status === 404) {
            setStatus('❌ Cannot find repo. Check your token has access to ' + CONFIG.repo, false);
            savePatBtn.disabled = false;
            savePatBtn.textContent = '✅ Save & Publish';
          } else {
            setStatus('⚠️ Unexpected response (' + r.status + '). Try again.', false);
            savePatBtn.disabled = false;
            savePatBtn.textContent = '✅ Save & Publish';
          }
        }).catch(function(err) {
          setStatus('⚠️ Network error. Check your internet connection.', false);
          savePatBtn.disabled = false;
          savePatBtn.textContent = '✅ Save & Publish';
        });
      });

      if (clearPatBtn) {
        clearPatBtn.addEventListener('click', function () {
          token = null;
          localStorage.removeItem('zu_gh_token');
          patInput.value = '';
          var btn = document.getElementById('zu-token-btn');
          if (btn) btn.textContent = '🔑 Token';
          modal.close();
          toast('Token removed.');
        });
      }
    }

    document.getElementById('zu-token-btn').addEventListener('click', function () {
      showAuthModal(null);
    });

    /* ---------- publish straight to GitHub ---------- */
    var publishBtn = document.getElementById('zu-publish');

    function setBusy(on, label) {
      publishBtn.disabled = on;
      publishBtn.style.opacity = on ? '.6' : '1';
      publishBtn.style.cursor = on ? 'default' : 'pointer';
      publishBtn.textContent = label || (on ? 'Publishing…' : '🚀 Publish to Live');
    }

    function doPublish() {
      if (!token) {
        showAuthModal(doPublish);
        return;
      }
      setBusy(true, 'Publishing to GitHub…');
      commitFile(buildDocument())
        .then(function () {
          setBusy(false);
          toast('✨ Published! The live site updates in ~60 seconds.');
        })
        .catch(function (err) {
          setBusy(false);
          var msg = err.message || '';
          if (/401|403|authentication|write access/i.test(msg)) {
            token = null;
            localStorage.removeItem('zu_gh_token');
            document.getElementById('zu-token-btn').textContent = '🔑 Token';
            toast('GitHub authentication error. Please check your token.', 'bad');
            setTimeout(function () { showAuthModal(doPublish); }, 800);
          } else {
            toast('Publish failed: ' + msg, 'bad');
          }
        });
    }

    publishBtn.addEventListener('click', function () {
      doPublish();
    });

    document.getElementById('zu-exit').addEventListener('click', function () {
      if (confirm('Exit visual editor and view live site? Any unsaved edits will be discarded.')) {
        window.location.href = window.location.pathname;
      }
    });

    toast('Visual Editor ready — click any box to transform, edit text, or manage photos');
  }

  /* Stash inline scripts */
  function stashScripts() {
    if (window.__ZU_SCRIPTS__ && window.__ZU_SCRIPTS__.length > 0) return;
    var out = [];
    document.querySelectorAll('script').forEach(function (s) {
      var raw = s.getAttribute('src');
      if (raw) {
        if (/grapesjs/.test(raw)) return;
        if (/editor\.js/.test(raw)) return;
        if (/cdn\.tailwindcss\.com/.test(raw)) return;
        out.push('<script src="' + raw + '"' + (s.defer ? ' defer' : '') + '><\/script>');
        return;
      }
      if (/tailwind\.config/.test(s.textContent || '')) return;
      var type = s.type ? ' type="' + s.type + '"' : '';
      out.push('<script' + type + '>' + s.textContent + '<\/script>');
    });
    window.__ZU_SCRIPTS__ = out.join('\n');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stashScripts);
  } else {
    stashScripts();
  }

  /* OAuth sign-in removed — PAT-only workflow is more reliable */
  /* The showAuthModal guides users to create a GitHub PAT at */
  /* https://github.com/settings/tokens/new?scopes=repo */
  /* and verifies it directly via the GitHub API before saving. */

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
      if (r.status === 401) throw new Error('GitHub authentication rejected (401)');
      if (r.status === 403) throw new Error('Account does not have write access to ' + CONFIG.repo + ' (403)');
      return r.json().then(function (body) { return { status: r.status, body: body }; });
    });
  }

  function commitFile(html, retryCount) {
    retryCount = retryCount || 0;
    var path = repoPath();
    var base = '/repos/' + CONFIG.repo + '/contents/' + path;

    return api(base + '?ref=' + encodeURIComponent(CONFIG.branch) + '&_t=' + Date.now())
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
        if (res.status === 409 && retryCount < 3) {
          return new Promise(function(resolve) { setTimeout(resolve, 500); }).then(function() {
            return commitFile(html, retryCount + 1);
          });
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.body.message || 'GitHub error ' + res.status);
        }
        return res.body;
      });
  }
})();

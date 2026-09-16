import { t } from '../i18n';
// Ortak yazdırma/PDF makinesi (web). Bir HTML belgesini yeni sekmede (ya da
// açılır pencere engellenirse gizli iframe'de) açıp yazdır/PDF diyaloğunu açar.
// ÖNEMLİ: açılır pencere, kullanıcı tıklamasıyla aynı anda (await'ten ÖNCE)
// açılmalı; yoksa tarayıcı engeller. Bu yüzden `printDocument` bir "builder"
// (async () => html) alır: pencereyi hemen açar, sonra HTML'i üretir.

// Bir belge (yeni sekme ya da iframe) içindeki görseller yüklenince yazdırır.
function printWhenReady(targetWin, targetDoc, onDone) {
  const doPrint = () => {
    try {
      targetWin.focus();
      targetWin.print();
    } catch (e) {
      // kullanıcı elle yazdırabilir
    }
    if (onDone) setTimeout(onDone, 1000);
  };
  const start = Date.now();
  const tick = () => {
    const imgs = Array.from(targetDoc.images || []);
    if (imgs.every((im) => im.complete) || Date.now() - start > 12000) setTimeout(doPrint, 300);
    else setTimeout(tick, 150);
  };
  if (targetDoc.readyState === 'complete') tick();
  else targetWin.onload = tick;
}

// Popup engellenirse gizli iframe ile yazdır (açılır pencere gerektirmez).
function printViaIframe(html) {
  try {
    const iframe = window.document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    window.document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    printWhenReady(iframe.contentWindow, doc, () => {
      try {
        window.document.body.removeChild(iframe);
      } catch (e) {
        /* yok say */
      }
    });
    return true;
  } catch (e) {
    return false;
  }
}

// builder: async () => string(html). busyMsg: pencere hazırlanırken gösterilecek not.
export async function printDocument(builder, busyMsg = t('common.preparing')) {
  let win = null;
  try {
    win = window.open('', '_blank');
  } catch (e) {
    win = null;
  }
  if (win) {
    try {
      win.document.write(
        '<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>' +
          busyMsg +
          '</title></head><body style="font-family:sans-serif;padding:24px;color:#333">' +
          busyMsg +
          '</body></html>'
      );
    } catch (e) {
      /* yok say */
    }
  }

  const html = await builder();

  if (win && !win.closed) {
    try {
      win.document.open();
      win.document.write(html);
      win.document.close();
      printWhenReady(win, win.document);
      return { ok: true };
    } catch (e) {
      // popup yazımı başarısız → iframe dene
    }
  }

  return printViaIframe(html) ? { ok: true, fallback: 'iframe' } : { ok: false, reason: 'popup' };
}

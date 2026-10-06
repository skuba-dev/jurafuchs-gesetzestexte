/* Normfenster – Prototyp. Reines JavaScript, keine Abhängigkeiten, läuft auch per file://. */
(function () {
'use strict';

const META = window.STGB_META;
const STORE_KEY = 'normfenster.v1';
const MAXPANES = 3;
const READ_SECS = 20;           // ab so vielen Sekunden Verweildauer gilt eine Norm als „gelesen“

/* ================================================================ Helpers */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sortKey = id => { const m = /^(\d+)([a-z]?)$/.exec(id); return m ? +m[1] * 100 + (m[2] ? m[2].charCodeAt(0) - 96 : 0) : 0; };
const inRange = (id, a, b) => sortKey(id) >= sortKey(a) && sortKey(id) <= sortKey(b);
const par = id => '§ ' + id;
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

const ICON = {
  star:  '<svg viewBox="0 0 24 24" width="17" height="17"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8L12 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  starOn:'<svg viewBox="0 0 24 24" width="17" height="17"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8L12 3.5z" fill="var(--star)" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  starMini:'<span class="star" role="img" aria-label="Lesezeichen" title="Lesezeichen"><svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8L12 3.5z" fill="var(--star)" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round"/></svg></span>',
  close: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
  solo:  '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  copy:  '<svg viewBox="0 0 24 24" width="16" height="16"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
};

/* ================================================================ Gesetz parsen */
function parseLaw(raw) {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l && l !== '-');
  const norms = {}, order = [], sections = [];
  let section = null, curList = [], foot = false;

  const classify = line => {
    let m;
    if ((m = /^\((\d+[a-z]?)\)\s+(.*)$/.exec(line))) return { t: 'abs', n: m[1], text: m[2] };
    if ((m = /^(\d+)\.\s+(.*)$/.exec(line)))         return { t: 'nr',  n: m[1], text: m[2] };
    if ((m = /^>\s*(.*)$/.exec(line)))                return { t: 'grp', text: m[1] };
    return { t: 'txt', text: line };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if ((m = /^(\S+) Abschnitt$/.exec(line))) {
      section = { label: m[1], nr: META.sectionNr[m[1]] || sections.length + 1, title: lines[++i], norms: [] };
      sections.push(section); curList = []; foot = false; continue;
    }
    if (line === 'Fußnote') { foot = true; continue; }
    if (line.startsWith('§')) {
      if (foot && line.includes(':')) { curList.forEach(n => n.foot.push(line)); continue; }
      const h = /^§§? (\d+[a-z]?)(?: und (\d+[a-z]?))?\s*(.*)$/.exec(line);
      if (!h) continue;
      const gone = h[3] === '(weggefallen)';
      curList = [h[1], h[2]].filter(Boolean).map(id => {
        const n = { id, title: gone ? '(weggefallen)' : h[3], gone, blocks: [], foot: [], section };
        norms[id] = n; order.push(id); section.norms.push(id); return n;
      });
      foot = false; continue;
    }
    if (foot) { curList.forEach(n => { n.foot[n.foot.length - 1] += ' ' + line; }); continue; }
    const blk = classify(line);
    curList.forEach(n => n.blocks.push(blk));
  }
  order.forEach(id => { const n = norms[id]; n.plain = n.blocks.map(b => b.text).join(' ').toLowerCase(); });
  sections.forEach(s => { s.first = s.norms[0]; s.last = s.norms[s.norms.length - 1]; });
  return { norms, order, sections };
}
const LAW = parseLaw(window.RAW_STGB);
const M = id => META.norms[id] || null;

// Rückwärts-Graph: welche Normen verlinken (per Tag) auf id?
const REV = {};
Object.keys(META.norms).forEach(src => META.norms[src].tags.forEach(([t]) => { (REV[t] = REV[t] || []).push(src); }));

/* ================================================================ State */
const DEFAULT = {
  settings: {
    linkMode: 'split', explain: true, defs: true, fs: 16, left: true, right: true, showGone: false,
    role: 'student', roleChosen: false,
    // Literatur-Kategorien je Rolle (An/Aus)
    litCats: { student: { kommentar: true, lehrbuch: true, aufsatz: true, fall: true }, pro: { kommentar: true, lehrbuch: false, aufsatz: true, fall: false } }
  },
  history: [], stats: {}, bookmarks: [], customDefs: {}, customTags: {}, notes: {}, finds: {}, last: null
};
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (s) return Object.assign({}, DEFAULT, s, { settings: Object.assign({}, DEFAULT.settings, s.settings) });
  } catch (e) { /* Storage nicht verfügbar */ }
  return JSON.parse(JSON.stringify(DEFAULT));
}
let S = loadState();
let storageOk = true;
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { storageOk = false; } };
const saveSoon = debounce(save, 400);

const ui = { panes: [], focus: 0, leftTab: 'history', extraFilter: 'all', activeAbs: null };

/* ---- Rolle: Studium vs. Praxis ---------------------------------------------------------
   Studium: Lernhilfen (Kurz erklärt, Begriffe, Lernstand, Prüfungsrelevanz), Aufsätze/Übungs-/Examensfälle zuerst.
   Praxis : ruhiger Text, Kommentare + aktuelle Rechtsprechung zuerst, Fußnoten offen, kein Lernstand-Tracking. */
const role = () => (S.settings.role === 'pro' ? 'pro' : 'student');
const ROLE_PRESET = { student: { explain: true, defs: true }, pro: { explain: false, defs: false } };
const LIT_CATS = [['kommentar', 'Kommentare'], ['lehrbuch', 'Lehrbücher'], ['aufsatz', 'Aufsätze und Anmerkungen'], ['fall', 'Übungs- und Examensfälle']];
function litCats() {
  const d = DEFAULT.settings.litCats[role()];
  return Object.assign({}, d, (S.settings.litCats || {})[role()]);
}
function applyRole(r, quiet) {
  S.settings.role = r; S.settings.roleChosen = true;
  Object.assign(S.settings, ROLE_PRESET[r]);
  if (r === 'pro' && ui.leftTab === 'learn') ui.leftTab = 'history';
  save(); closeModal(); renderAll();
  if (!quiet) toast(r === 'pro'
    ? 'Praxis-Ansicht: Kommentare und aktuelle Rechtsprechung zuerst, Lernhilfen und Lernstand ausgeblendet.'
    : 'Studium-Ansicht: Lernhilfen, Lernstand sowie Aufsätze und Fälle zur Ausbildung eingeblendet.');
}
const stat = id => (S.stats[id] = S.stats[id] || { visits: 0, secs: 0, last: 0 });
const focusId = () => ui.panes[ui.focus];

/* ================================================================ Definitionen / Begriffe */
const DEFBY = {}; META.defs.forEach(d => { DEFBY[d.key] = d; });
let TERM_CACHE = {};
function custPat(term) {
  const c = term.charAt(0);
  const first = /\p{L}/u.test(c) ? '[' + c.toLowerCase() + c.toUpperCase() + ']' : escRe(c);
  return first + escRe(term.slice(1));
}
function buildTerms() { TERM_CACHE = {}; }
// Begriffe gelten je Norm (def.in); eigene Definitionen gelten in allen Normen.
function termSet(nid) {
  if (TERM_CACHE[nid]) return TERM_CACHE[nid];
  const terms = META.defs.filter(d => !d.in || d.in.includes(nid)).map(d => ({ key: d.key, pat: d.pat }));
  Object.entries(S.customDefs).forEach(([key, c]) => { if (!DEFBY[key] && c.term) terms.push({ key, pat: custPat(c.term) }); });
  terms.sort((a, b) => b.pat.length - a.pat.length);
  const re = terms.length ? new RegExp('(?<![\\p{L}\\p{N}])(?:' + terms.map(t => '(' + t.pat + ')').join('|') + ')(?![\\p{L}\\p{N}])', 'gu') : null;
  return (TERM_CACHE[nid] = { terms, re });
}
function termify(str, nid) {
  const { terms: TERMS, re: TERM_RE } = termSet(nid);
  if (!TERM_RE || !S.settings.defs) return esc(str);
  let out = '', last = 0, m;
  TERM_RE.lastIndex = 0;
  while ((m = TERM_RE.exec(str))) {
    const gi = m.findIndex((g, i) => i > 0 && g !== undefined) - 1;
    const key = TERMS[gi].key;
    out += esc(str.slice(last, m.index));
    out += '<span class="term' + (S.customDefs[key] ? ' own' : '') + '" data-term="' + esc(key) + '" tabindex="0">' + esc(m[0]) + '</span>';
    last = m.index + m[0].length;
    if (m[0].length === 0) TERM_RE.lastIndex++;
  }
  return out + esc(str.slice(last));
}

/* ================================================================ Smart Cross References */
const REF_RE = /§§?\s*\d+[a-z]?(?:\s+(?:Abs\.|Absatz|Satz|Nr\.)\s*\d+[a-z]?)*(?:\s*(?:,|bis|und|oder)\s+(?:§\s*)?\d+[a-z]?(?:\s+(?:Abs\.|Absatz|Satz|Nr\.)\s*\d+[a-z]?)*)*/g;

function refAnchor(label, id, abs) {
  if (LAW.norms[id]) {
    return '<a class="xref" href="#/stgb/' + esc(id) + '" data-norm="' + esc(id) + '"' + (abs ? ' data-abs="' + esc(abs) + '"' : '') + '>' + esc(label) + '</a>';
  }
  return '<a class="xref ext" href="' + esc(META.law.extUrl(id)) + '" target="_blank" rel="noopener" data-ext="' + esc(id) + '" title="' + esc(par(id)) + ' ist nicht im Beispieltext – öffnet gesetze-im-internet.de">' + esc(label) + '</a>';
}
function linkChunk(chunk) {
  const T = /§§?|Abs\.|Absatz|Satz|Nr\.|\d+[a-z]?|bis|und|oder|,/g;
  const refs = []; let ctx = 'norm', sub = '', symStart = null, last = null, m;
  while ((m = T.exec(chunk))) {
    const t = m[0];
    if (t.charAt(0) === '§') { symStart = m.index; ctx = 'norm'; }
    else if (t === 'Abs.' || t === 'Absatz') { ctx = 'sub'; sub = 'abs'; }
    else if (t === 'Satz' || t === 'Nr.') { ctx = 'sub'; sub = 'other'; }
    else if (/^\d/.test(t)) {
      if (ctx === 'norm') {
        last = { start: symStart !== null ? symStart : m.index, end: m.index + t.length, id: t, abs: null };
        symStart = null; refs.push(last);
      } else if (sub === 'abs' && last && last.abs === null) last.abs = t;
    }
  }
  let out = '', pos = 0;
  refs.forEach(r => { out += esc(chunk.slice(pos, r.start)) + refAnchor(chunk.slice(r.start, r.end), r.id, r.abs); pos = r.end; });
  return out + esc(chunk.slice(pos));
}
function renderText(s, withTerms, nid) {
  const plain = withTerms ? (x => termify(x, nid)) : esc;
  let out = '', last = 0, m;
  REF_RE.lastIndex = 0;
  while ((m = REF_RE.exec(s))) {
    out += plain(s.slice(last, m.index)) + linkChunk(m[0]);
    last = m.index + m[0].length;
  }
  return out + plain(s.slice(last));
}
const bold = html => html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/* ================================================================ Einordnung (Breadcrumb) */
function pathFor(id) {
  const n = LAW.norms[id], p = [];
  p.push({ lvl: 'Gesetz', label: META.law.name + ' (' + META.law.abbr + ')' });
  META.parts.filter(x => inRange(id, x.from, x.to)).forEach(x => p.push({ lvl: 'Teil', label: x.label, rng: '§§ ' + x.from + '–' + x.to }));
  const s = n.section;
  p.push({ lvl: 'Abschnitt', label: s.nr + '. Abschnitt – ' + s.title, rng: '§§ ' + s.first + '–' + s.last, go: s.first });
  META.titles.filter(x => inRange(id, x.from, x.to)).forEach(x => p.push({ lvl: 'Titel', label: x.label, rng: '§§ ' + x.from + '–' + x.to, go: x.from }));
  p.push({ lvl: 'Norm', label: par(id) + ' ' + n.title, cur: true });
  return p;
}
function renderCrumbs() {
  const id = focusId(); if (!id) return;
  $('#crumbs').innerHTML = pathFor(id).map((c, i) => {
    const inner = '<span class="lvl">' + esc(c.lvl) + '</span><span>' + esc(c.label) + '</span>' + (c.rng ? '<span class="rng">(' + esc(c.rng) + ')</span>' : '');
    const el = c.go && LAW.norms[c.go]
      ? '<button class="crumb" data-go="' + esc(c.go) + '" title="Zum ersten Eintrag dieses Abschnitts">' + inner + '</button>'
      : '<span class="crumb' + (c.cur ? ' cur' : '') + '">' + inner + '</span>';
    return (i ? '<span class="crumb-sep" aria-hidden="true">›</span>' : '') + el;
  }).join('');
}

/* ================================================================ Navigation */
function focusedPaneFromEl(el) { const p = el && el.closest ? el.closest('.pane') : null; return p ? +p.dataset.idx : ui.focus; }

function go(id, o = {}) {
  if (!LAW.norms[id]) return;
  ui.activeAbs = o.abs || null;
  const from = o.from !== undefined ? o.from : ui.focus;
  const ex = ui.panes.indexOf(id);
  if (ex >= 0) { setFocus(ex, true); return; }
  if (!ui.panes.length) { ui.panes = [id]; ui.focus = 0; }
  else if (o.mode === 'split') {
    if (ui.panes.length < MAXPANES) { ui.panes.splice(from + 1, 0, id); ui.focus = from + 1; }
    else { const t = from < ui.panes.length - 1 ? from + 1 : from - 1; ui.panes[t] = id; ui.focus = t; }
  } else { ui.panes[ui.focus] = id; }
  afterNav(id);
}
function afterNav(id) {
  recordVisit(id);
  persistLast();
  renderPanes(); renderChrome();
  flashAbs();
}
function setFocus(i, forceRender) {
  if (i === ui.focus && !forceRender) return;
  ui.focus = i;
  recordVisit(focusId());
  persistLast();
  $$('.pane').forEach((p, k) => p.classList.toggle('focused', k === i));
  renderChrome();
  if (ui.activeAbs) flashAbs();
}
function closePane(i) {
  if (ui.panes.length < 2) return;
  ui.panes.splice(i, 1);
  if (i < ui.focus) ui.focus--; else if (i === ui.focus) ui.focus = Math.min(i, ui.panes.length - 1);
  persistLast(); renderPanes(); renderChrome();
}
function soloPane(i) { ui.panes = [ui.panes[i]]; ui.focus = 0; persistLast(); renderPanes(); renderChrome(); }
function persistLast() { S.last = { panes: ui.panes.slice(), focus: ui.focus }; save(); try { history.replaceState(null, '', '#/stgb/' + ui.panes.join(',')); } catch (e) { /* file:// ohne History-API */ } }

function recordVisit(id) {
  if (!id) return;
  const now = Date.now();
  S.history = S.history.filter(h => h.id !== id);
  S.history.unshift({ id, ts: now });
  if (S.history.length > 200) S.history.length = 200;
  const st = stat(id); st.visits++; st.last = now;
  save();
}

function flashAbs() {
  if (!ui.activeAbs) return;
  const pane = $$('.pane')[ui.focus]; if (!pane) return;
  const el = $('[data-abs="' + ui.activeAbs + '"]', pane);
  ui.activeAbs = null;
  if (el) { el.scrollIntoView({ block: 'center' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
}

/* ================================================================ Rendering: Panes */
function blocksHTML(n) {
  let hasAbs = false;
  return n.blocks.map(b => {
    const t = renderText(b.text, true, n.id);
    if (b.t === 'abs') { hasAbs = true; return '<p class="blk abs" data-abs="' + esc(b.n) + '"><button class="abs-n" data-cite="' + esc(par(n.id) + ' Abs. ' + b.n + ' ' + META.law.abbr) + '" aria-label="Zitat kopieren: ' + esc(par(n.id) + ' Abs. ' + b.n) + '" title="Klicken: Zitat kopieren">(' + esc(b.n) + ')</button><span>' + t + '</span></p>'; }
    if (b.t === 'nr')  return '<p class="blk nr"><span class="nn">' + esc(b.n) + '.</span><span>' + t + '</span></p>';
    if (b.t === 'grp') return '<p class="blk grp">' + t + '</p>';
    return '<p class="blk txt' + (hasAbs ? ' cont' : '') + '">' + t + '</p>';
  }).join('');
}
function paneHTML(id, i) {
  const n = LAW.norms[id], m = M(id), bm = S.bookmarks.includes(id);
  const kurz = S.settings.explain && m && m.kurz
    ? '<details class="explain jf-note jf-note--info"><summary class="jf-note__label">Kurz erklärt</summary><p class="jf-note__body">' + bold(renderText(m.kurz, false)) + '</p></details>' : '';
  const gone = n.gone ? '<p class="gone-note">Diese Norm ist weggefallen.</p>' : '';
  const foot = n.foot.length
    ? '<details class="foot"' + (role() === 'pro' ? ' open' : '') + '><summary>Fußnote' + (n.foot.length > 1 ? 'n (' + n.foot.length + ')' : '') + '</summary>' + n.foot.map(f => '<p>' + esc(f) + '</p>').join('') + '</details>' : '';
  return '<article class="pane' + (i === ui.focus ? ' focused' : '') + '" data-idx="' + i + '" data-id="' + esc(id) + '">' +
    '<header class="pane-head"><div class="pane-title"><span class="pane-par">' + par(id) + '</span><h2>' + esc(n.title) + '</h2></div>' +
    '<div class="pane-actions">' +
      '<button data-act="bm" class="' + (bm ? 'on' : '') + '" aria-pressed="' + bm + '" aria-label="Lesezeichen für ' + par(id) + '" title="' + (bm ? 'Lesezeichen entfernen' : 'Lesezeichen setzen') + '">' + (bm ? ICON.starOn : ICON.star) + '</button>' +
      '<button data-act="copy" aria-label="Zitat kopieren" title="Zitat kopieren (' + par(id) + ' ' + META.law.abbr + ')">' + ICON.copy + '</button>' +
      (ui.panes.length > 1 ? '<button data-act="solo" aria-label="Nur diese Norm anzeigen" title="Nur diese Norm anzeigen">' + ICON.solo + '</button><button data-act="close" aria-label="Norm schließen" title="Schließen">' + ICON.close + '</button>' : '') +
    '</div></header>' +
    '<div class="pane-body ' + (S.settings.defs ? '' : 'nodefs') + '">' + kurz + gone + blocksHTML(n) + foot + '</div></article>';
}
function renderPanes() {
  const wrap = $('#panes');
  const sc = {}; $$('.pane', wrap).forEach(p => { sc[p.dataset.id] = $('.pane-body', p).scrollTop; });
  wrap.dataset.count = ui.panes.length;
  wrap.innerHTML = ui.panes.map(paneHTML).join('');
  $$('.pane', wrap).forEach(p => { const b = $('.pane-body', p); if (sc[p.dataset.id]) { b.style.scrollBehavior = 'auto'; b.scrollTop = sc[p.dataset.id]; b.style.scrollBehavior = ''; } });
}

/* ================================================================ Rendering: Chrome */
const ago = ts => {
  const d = (Date.now() - ts) / 1000;
  if (d < 60) return 'gerade eben';
  if (d < 3600) return 'vor ' + Math.round(d / 60) + ' Min.';
  if (d < 86400) return 'vor ' + Math.round(d / 3600) + ' Std.';
  return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
};
const dayLabel = ts => {
  const a = new Date(ts); a.setHours(0, 0, 0, 0); const b = new Date(); b.setHours(0, 0, 0, 0);
  const diff = Math.round((b - a) / 86400000);
  return diff === 0 ? 'Heute' : diff === 1 ? 'Gestern' : 'Früher';
};
const fmtSecs = s => s < 60 ? s + ' Sek.' : Math.round(s / 60) + ' Min.';

function renderLeft() {
  const el = $('#left');
  const tabs = [['history', 'Verlauf'], ['bm', 'Lesezeichen']].concat(role() === 'student' ? [['learn', 'Lernstand']] : []);
  if (!tabs.some(t => t[0] === ui.leftTab)) ui.leftTab = 'history';
  let body = '', foot = '';
  if (ui.leftTab === 'history') {
    const cur = focusId();
    if (!S.history.length) body = '<div class="empty-note">Noch kein Verlauf.<br>Hier erscheinen die Normen, die du geöffnet hast – die zuletzt gelesene oben.</div>';
    else {
      let lastGroup = '';
      body = S.history.map((h, i) => {
        const n = LAW.norms[h.id]; if (!n) return '';
        const g = dayLabel(h.ts); const gl = g !== lastGroup ? '<div class="group-label">' + g + '</div>' : ''; lastGroup = g;
        const flag = h.id === cur ? '<span class="badge-now">aktuell</span>' : (i === 0 || (i === 1 && S.history[0].id === cur)) ? '<span class="badge-last">zuletzt</span>' : '';
        return gl + '<a class="nrow' + (h.id === cur ? ' cur' : '') + (ui.panes.includes(h.id) ? ' open' : '') + '" href="#/stgb/' + h.id + '" data-nav="' + h.id + '">' +
          '<span class="n">' + par(h.id) + '</span><span class="t">' + esc(n.title) + flag + '</span><span class="m">' + (S.bookmarks.includes(h.id) ? ICON.starMini : '') + '</span>' +
          '<span class="sub">' + ago(h.ts) + ' · ' + (stat(h.id).visits) + '× geöffnet</span></a>';
      }).join('');
    }
    foot = '<span>' + S.history.length + ' Normen</span><button class="link-btn" data-act="clear-history">Verlauf leeren</button>';
  } else if (ui.leftTab === 'bm') {
    body = S.bookmarks.length ? S.bookmarks.map(id => {
      const n = LAW.norms[id]; if (!n) return '';
      return '<a class="nrow' + (id === focusId() ? ' cur' : '') + '" href="#/stgb/' + id + '" data-nav="' + id + '"><span class="n">' + par(id) + '</span><span class="t">' + esc(n.title) + '</span>' +
        '<span class="m"><button class="link-btn" data-unbm="' + id + '" aria-label="Lesezeichen für ' + par(id) + ' entfernen" title="Lesezeichen entfernen"><span aria-hidden="true">×</span></button></span></a>';
    }).join('') : '<div class="empty-note">Noch keine Lesezeichen.<br>Markiere wichtige Normen mit dem Stern ☆ in der Kopfzeile einer Norm.</div>';
    foot = '<span>' + S.bookmarks.length + ' Lesezeichen</span><span></span>';
  } else body = renderLearn();
  el.innerHTML = '<div class="tabs" role="tablist">' + tabs.map(([k, l]) => '<button role="tab" aria-selected="' + (ui.leftTab === k) + '" data-tab="' + k + '" class="' + (ui.leftTab === k ? 'on' : '') + '">' + l + (k === 'bm' && S.bookmarks.length ? '<i>' + S.bookmarks.length + '</i>' : '') + '</button>').join('') + '</div>' +
    '<div class="side-body">' + body + '</div>' + (foot ? '<div class="side-foot">' + foot + '</div>' : '');
}

// Vorheriger / folgender Abschnitt: im Beispieltext vorhanden → klickbar, sonst nur als Stub (deaktiviert)
function sectionNeighbor(sec, dir) {
  const nr = sec.nr + (dir === 'prev' ? -1 : 1);
  const real = LAW.sections.find(s => s.nr === nr);
  if (real) return { nr, title: real.title, range: '§§ ' + real.first + '–' + real.last, go: real.first };
  const stub = META.sectionStubs && META.sectionStubs[nr];
  return stub ? { nr, title: stub.title, range: stub.range, go: null } : null;
}
function secNavHTML(sec, dir) {
  const n = sectionNeighbor(sec, dir); if (!n) return '';
  const lbl = dir === 'prev' ? '↑ Vorheriger Abschnitt' : '↓ Folgender Abschnitt';
  return '<button class="sec-nav ' + dir + '"' + (n.go ? ' data-secgo="' + n.go + '"' : ' disabled title="Dieser Abschnitt ist nicht im Beispieltext enthalten"') + '>' +
    '<span class="sn-l">' + lbl + '</span><span class="sn-t">' + n.nr + '. Abschnitt – ' + esc(n.title) + '</span><span class="sn-r">' + esc(n.range) + (n.go ? '' : ' · nicht im Beispieltext') + '</span></button>';
}
function renderRight() {
  const id = focusId(); if (!id) return;
  const sec = LAW.norms[id].section;
  const goneCount = sec.norms.filter(x => LAW.norms[x].gone).length;
  const list = sec.norms.filter(x => S.settings.showGone || !LAW.norms[x].gone);
  $('#right').innerHTML =
    '<div class="side-head"><div class="eyebrow">' + sec.nr + '. Abschnitt</div><h3>' + esc(sec.title) + '</h3></div>' +
    secNavHTML(sec, 'prev') +
    '<div class="side-body">' + list.map(x => {
      const n = LAW.norms[x];
      return '<a class="nrow' + (x === id ? ' cur' : '') + (ui.panes.includes(x) ? ' open' : '') + (n.gone ? ' gone' : '') + '" href="#/stgb/' + x + '" data-nav="' + x + '">' +
        '<span class="n">' + par(x) + '</span><span class="t">' + esc(n.title) + (S.bookmarks.includes(x) ? ICON.starMini : '') + '</span>' +
        '<span class="m">' + (role() === 'student' && !n.gone && M(x) ? '<span class="pips" role="img" aria-label="Prüfungsrelevanz ' + M(x).imp + ' von 5" title="Prüfungsrelevanz ' + M(x).imp + ' von 5">' + '●'.repeat(M(x).imp) + '<i>' + '●'.repeat(5 - M(x).imp) + '</i></span>' : '') +
        (stat(x).visits && !n.gone ? '<span class="dot" role="img" aria-label="schon besucht" title="schon besucht"></span>' : '') + '</span></a>';
    }).join('') + '</div>' +
    secNavHTML(sec, 'next') +
    '<div class="side-foot"><span>' + (sec.norms.length - goneCount) + ' Normen' + (goneCount ? ' · ' + goneCount + ' weggefallen' : '') + '</span>' +
    (goneCount ? '<button class="link-btn" data-act="toggle-gone">' + (S.settings.showGone ? 'ausblenden' : 'anzeigen') + '</button>' : '') + '</div>';
  const cur = $('.nrow.cur', $('#right')); if (cur) cur.scrollIntoView({ block: 'nearest' });
}

function renderTags() {
  const id = focusId(); if (!id) return;
  const base = (M(id) ? M(id).tags : []).map(([n, l]) => ({ n, l, own: false }));
  const own = (S.customTags[id] || []).map((t, i) => ({ n: t.n, l: t.l, own: true, i }));
  const chip = t => {
    const inSet = !!LAW.norms[t.n];
    const label = '<b>' + par(t.n) + '</b>' + (t.l ? '<small>' + esc(t.l) + '</small>' : '');
    const x = t.own ? '<span class="x" data-deltag="' + t.i + '" title="Tag entfernen">×</span>' : '';
    if (inSet) return '<a class="chip' + (t.own ? ' own' : '') + (ui.panes.includes(t.n) ? ' openp' : '') + '" href="#/stgb/' + t.n + '" data-norm="' + t.n + '">' + label + x + '</a>';
    return '<a class="chip ext' + (t.own ? ' own' : '') + '" href="' + esc(META.law.extUrl(t.n)) + '" target="_blank" rel="noopener" title="Nicht im Beispieltext – öffnet gesetze-im-internet.de">' + label + '<span class="x" style="pointer-events:none">↗</span>' + x + '</a>';
  };
  $('#tagbar').innerHTML = '<span class="lbl">' + (role() === 'pro' ? 'Verwandte Normen' : 'Cross-Check') + '</span>' + base.concat(own).map(chip).join('') +
    '<button class="chip chip-add" data-act="add-tag" title="Eigenen Norm-Tag hinzufügen">+ Tag</button>';
}

const articlesFor = id => (META.articles || []).filter(a => a.norms.includes(id));
const yearOf = s => { const m = String(s || '').match(/(?:19|20)\d{2}/g); return m ? Math.max.apply(null, m.map(Number)) : 0; };
const catOfArticle = a => (a.kind === 'Übungsfall' || a.kind === 'Examensfall') ? 'fall' : 'aufsatz';
const catOfGeneral = r => r.type === 'Kommentar' ? 'kommentar' : r.type === 'Lehrbuch' ? 'lehrbuch' : 'aufsatz';
// Reihenfolge der Kategorien je Rolle (kleiner = weiter oben)
const RANK = { student: { aufsatz: 0, fall: 1, lehrbuch: 2, kommentar: 3 }, pro: { kommentar: 0, aufsatz: 1, lehrbuch: 2, fall: 3 } };
function extraCounts(id) {
  const m = M(id) || { rspr: [], lit: [] };
  const mine = S.finds[id] || [];
  return {
    rspr: m.rspr.length + mine.filter(f => f.kind === 'rspr').length,
    lit: articlesFor(id).length + m.lit.length + META.litGeneral.length + mine.filter(f => f.kind === 'lit').length
  };
}
function renderHint() {
  const id = focusId(); if (!id) return;
  const c = extraCounts(id);
  $('#hintbar').innerHTML = '<span>Rechtsprechung (' + c.rspr + ') · Literatur (' + c.lit + ') · Notizen zu ' + par(id) + '</span><span class="arrow">↓</span><span>weiterscrollen</span>';
}
function renderExtra() {
  const id = focusId(); if (!id) return;
  const n = LAW.norms[id], m = M(id) || { rspr: [], lit: [] };
  const mine = S.finds[id] || [];
  const f = ui.extraFilter;
  const isPro = role() === 'pro';
  const del = i => '<button class="del" data-delfind="' + i + '" aria-label="Eintrag löschen" title="Eintrag löschen"><span aria-hidden="true">×</span></button>';
  const ownCard = o => '<div class="xcard">' + del(o.i) + '<div class="top"><span class="tag mine">Eigene' + (o.x.kind === 'lit' ? ' · ' + esc(o.x.type || 'Literatur') : '') + '</span></div><h4>' + esc(o.x.title) + '</h4>' + (o.x.note ? '<p>' + esc(o.x.note) + '</p>' : '') + '</div>';
  const rsprCard = r => '<div class="xcard"><div class="top"><span class="tag">' + esc(r.court) + '</span><span class="tag date">' + esc(r.date) + (r.az ? ' · ' + esc(r.az) : '') + '</span></div><h4>' + esc(r.title) + '</h4><p>' + esc(r.note) + '</p>' + (r.cite ? '<div class="cite">' + esc(r.cite) + '</div>' : '') + '</div>';
  // Rechtsprechung: Praxis → zusätzlich die Entscheidungen aus den Examensfällen, neueste zuerst
  const recent = new Date().getFullYear() - 3;
  const rsprItems = m.rspr.map(r => ({ year: yearOf(r.date + ' ' + r.cite), html: rsprCard(r) }));
  if (isPro) articlesFor(id).filter(a => a.kind === 'Examensfall').forEach(a => {
    const y = yearOf(a.issue);
    rsprItems.push({ year: y, html: '<div class="xcard art"><div class="top"><span class="tag">Entscheidung</span>' + (y >= recent ? '<span class="tag new">neu</span>' : '') + '<span class="tag date">' + y + '</span></div><h4>' + esc(a.title) + '</h4><p>' + esc(a.summary) + '</p><div class="cite">' + esc(a.issue) + '</div><a class="art-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">Fall lesen ↗</a></div>' });
    });
  if (isPro) rsprItems.sort((a, b) => b.year - a.year);
  const mineR = mine.map((x, i) => ({ x, i })).filter(o => o.x.kind === 'rspr');
  const rsprHTML = rsprItems.length || mineR.length ? rsprItems.map(o => o.html).concat(mineR.map(ownCard)).join('')
    : '<div class="empty-note">Für ' + par(id) + ' sind im Demo-Datensatz keine Entscheidungen hinterlegt.<br>Eigene Fundstellen kannst du oben ergänzen.</div>';
  const artCard = a => '<div class="xcard art"><div class="top"><span class="tag ' + (a.src === 'Examensgerecht' ? 'eg' : 'zjs') + '">' + esc(a.src || 'ZJS') + ' · ' + esc(a.kind) + '</span><span class="tag date">' + esc(a.issue) + (a.pages ? ', ' + esc(a.pages) : '') + '</span></div>' +
    '<h4>' + esc(a.title) + '</h4>' + (a.authors ? '<div class="authors">' + (a.src === 'Examensgerecht' ? 'Bearbeitung: ' : '') + esc(a.authors) + '</div>' : '') +
    '<p>' + esc(a.summary) + '</p><a class="art-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">' + esc(a.src === 'Examensgerecht' ? 'Fall lesen ↗' : 'Artikel lesen ↗') + '</a></div>';
  const litCard = r => '<div class="xcard"><div class="top"><span class="tag lit">' + esc(r.type) + '</span></div><h4>' + esc(r.title) + '</h4><p>' + esc(r.note) + '</p><div class="cite">' + esc(r.cite) + '</div></div>';
  // Literatur: Kategorien filtern, Reihenfolge je nach Rolle
  const cats = litCats(), R = RANK[role()];
  let items = [];
  articlesFor(id).forEach(a => items.push({ cat: catOfArticle(a), sub: (a.kind === 'Entscheidungsanmerkung') === isPro ? 0 : 1, year: yearOf(a.issue), html: artCard(a) }));
  m.lit.forEach(r => items.push({ cat: 'aufsatz', sub: 2, year: 0, html: litCard(r) }));
  META.litGeneral.forEach(r => items.push({ cat: catOfGeneral(r), sub: 0, year: 0, html: litCard(r) }));
  const counts = {}; items.forEach(it => { counts[it.cat] = (counts[it.cat] || 0) + 1; });
  items = items.filter(it => cats[it.cat]).sort((a, b) => R[a.cat] - R[b.cat] || a.sub - b.sub || b.year - a.year);
  const mineL = mine.map((x, i) => ({ x, i })).filter(o => o.x.kind === 'lit');
  const litHTML = items.map(it => it.html).concat(mineL.map(ownCard)).join('') ||
    '<div class="empty-note">Alle Kategorien sind ausgeblendet – oben einzelne Kategorien einschalten.</div>';
  const litFlt = '<div class="litflt" role="group" aria-label="Literatur filtern">' + LIT_CATS.map(([k, l]) =>
    '<button class="lf' + (cats[k] ? ' on' : '') + '" data-litcat="' + k + '" aria-pressed="' + !!cats[k] + '">' + l + ' <i>' + (counts[k] || 0) + '</i></button>').join('') + '</div>';
  const cls = f === 'rspr' ? 'only-rspr' : f === 'lit' ? 'only-lit' : '';
  $('#extra').innerHTML = '<div class="extra-inner">' +
    '<div class="extra-bar"><button class="back" data-act="to-top">↑ Zum Normtext</button><div class="extra-title"><span class="t-eyebrow">' + par(id) + ' · ' + esc(n.title) + '</span><h2>Rechtsprechung, Literatur und Notizen.</h2></div>' +
    '<div class="flt">' + [['all', 'Alles'], ['rspr', 'Rechtsprechung'], ['lit', 'Literatur']].map(([k, l]) => '<button data-flt="' + k + '" class="' + (f === k ? 'on' : '') + '">' + l + '</button>').join('') + '</div></div>' +
    '<div class="jf-note jf-note--info extra-note"><div class="jf-note__label">Hinweis · Quellen</div><div class="jf-note__body">Die ZJS-Beiträge und Examensgerecht-Fälle (frei zugänglich) wurden am 5.10.2026 recherchiert; die Kurzzusammenfassungen beruhen auf Einleitung, Leitsätzen, Gliederung bzw. der Zusammenfassung der Quellen. Rechtsprechung und Kommentare sind Beispielinhalte und nicht redaktionell geprüft. Eigene Einträge werden lokal in deinem Browser gespeichert.</div></div>' +
    '<div class="extra-grid ' + cls + '">' +
      (f !== 'lit' ? '<section class="col"><h3>' + (isPro ? 'Rechtsprechung · neueste zuerst' : 'Rechtsprechung') + ' <button class="linkbtn" data-act="add-find" data-kind="rspr">+ Eigene Fundstelle</button></h3>' + rsprHTML + '</section>' : '') +
      (f !== 'rspr' ? '<section class="col"><h3>' + (isPro ? 'Kommentare und Literatur' : 'Literatur') + ' <button class="linkbtn" data-act="add-find" data-kind="lit">+ Eigene Fundstelle</button></h3>' + litFlt + litHTML + '</section>' : '') +
      '<section class="col col-notes"><h3 id="notes-h">Meine Notizen</h3><textarea class="notes" id="notes" aria-labelledby="notes-h" placeholder="Eselsbrücken, Prüfungsschemata, Streitstände …"></textarea></section>' +
    '</div></div>';
  const ta = $('#notes'); ta.value = S.notes[id] || '';
  ta.addEventListener('input', () => { S.notes[id] = ta.value; if (!ta.value) delete S.notes[id]; saveSoon(); });
}

function renderTop() {
  $$('[data-linkmode]').forEach(b => b.classList.toggle('on', b.dataset.linkmode === S.settings.linkMode));
  $$('[data-role]').forEach(b => b.classList.toggle('on', b.dataset.role === role()));
  document.body.dataset.role = role();
  $('#stage').classList.toggle('no-left', !S.settings.left);
  $('#stage').classList.toggle('no-right', !S.settings.right);
  $('#btnLeft').classList.toggle('on', S.settings.left);
  $('#btnRight').classList.toggle('on', S.settings.right);
  document.documentElement.style.setProperty('--law-size', S.settings.fs + 'px');
}
function renderChrome() { renderTop(); renderCrumbs(); renderLeft(); renderRight(); renderTags(); renderHint(); renderExtra(); document.title = par(focusId()) + ' ' + LAW.norms[focusId()].title + ' – Normfenster'; }
function renderAll() { buildTerms(); renderPanes(); renderChrome(); }

/* ================================================================ Lernstand-Analyse (regelbasiert) */
function attention(id) { const s = S.stats[id]; return s ? Math.min(1, s.visits / 3 + s.secs / 90) : 0; }
function isRead(id) { const s = S.stats[id]; return !!s && (s.secs >= READ_SECS || s.visits >= 2); }
function learnItems() {
  return LAW.order.filter(id => !LAW.norms[id].gone && M(id)).map(id => {
    const m = M(id), s = S.stats[id] || { visits: 0, secs: 0 };
    const neigh = Array.from(new Set(m.tags.map(t => t[0]).concat(REV[id] || []))).filter(x => LAW.norms[x] && !LAW.norms[x].gone && x !== id);
    let best = null; neigh.forEach(x => { const a = attention(x); if (!best || a > best.a) best = { id: x, a }; });
    const gap = (m.imp / 5) * (1 - attention(id));
    const boost = 1 + 0.9 * (best ? best.a : 0);
    return { id, imp: m.imp, s, gap, score: gap * boost, best };
  });
}
function renderLearn() {
  const items = learnItems();
  const total = items.length, read = items.filter(x => isRead(x.id)).length;
  const touched = Object.values(S.stats).reduce((a, s) => a + (s.visits || 0), 0);
  const topics = META.topics.map(t => {
    const ids = t.ids.filter(id => LAW.norms[id] && !LAW.norms[id].gone);
    const r = ids.filter(isRead).length;
    return '<div class="topic-row"><div class="l"><span>' + esc(t.label) + '</span><span>' + r + '/' + ids.length + '</span></div><div class="bar ' + (r === ids.length ? 'good' : '') + '"><i style="width:' + (ids.length ? r / ids.length * 100 : 0) + '%"></i></div></div>';
  }).join('');
  let recs;
  if (touched < 3) recs = '<div class="empty-note">Sobald du ein paar Normen gelesen hast, erscheinen hier Empfehlungen.<br><button class="linkbtn" data-act="demo">Demo-Daten laden</button></div>';
  else {
    const top = items.filter(x => x.score > 0.12).sort((a, b) => b.score - a.score).slice(0, 5);
    recs = top.length ? top.map(x => {
      const why = ['Prüfungsrelevanz ' + x.imp + ' von 5', x.s.visits ? x.s.visits + '× geöffnet, ' + fmtSecs(x.s.secs) + ' gelesen' : 'noch nie geöffnet'];
      if (x.best && x.best.a >= 0.5) why.push('hängt zusammen mit ' + par(x.best.id) + ' (' + (stat(x.best.id).visits) + '× gelesen)');
      return '<div class="rec" data-nav="' + x.id + '"><div class="h"><b>' + par(x.id) + ' ' + esc(LAW.norms[x.id].title) + '</b><span class="pri">' + (x.score > 0.7 ? 'wichtig' : 'nachholen') + '</span></div><div class="why">' + why.join(' · ') + '</div></div>';
    }).join('') : '<div class="empty-note">Keine auffälligen Lücken.</div>';
  }
  return '<div class="card-s"><h4>Gelesen: ' + read + ' von ' + total + ' Normen</h4><div class="bar ' + (read === total ? 'good' : '') + '"><i style="width:' + (total ? read / total * 100 : 0) + '%"></i></div></div>' +
    '<div class="card-s"><h4>Themenblöcke</h4>' + topics + '</div>' +
    '<div class="group-label">Lernlücken · diese Normen fehlen dir</div><div class="recs">' + recs + '</div>' +
    '<div class="fine">Regelbasierte Mustererkennung: Prüfungsrelevanz × Verknüpfung mit oft gelesenen Normen × bisherige Verweildauer. Als „gelesen“ zählt eine Norm ab ' + READ_SECS + ' Sek. Verweildauer oder 2 Besuchen. Alles bleibt lokal in deinem Browser.</div>';
}

/* ================================================================ Popovers (Definitionen & Verweis-Vorschau) */
const pop = $('#pop'); let popTimer = null, popFor = null;
function placePop(rect) {
  pop.hidden = false;
  const w = pop.offsetWidth, h = pop.offsetHeight;
  let x = Math.min(Math.max(8, rect.left), innerWidth - w - 8);
  let y = rect.bottom + 8; if (y + h > innerHeight - 8) y = Math.max(8, rect.top - h - 8);
  pop.style.left = x + 'px'; pop.style.top = y + 'px';
}
function showTermPop(el) {
  const key = el.dataset.term, d = DEFBY[key], own = S.customDefs[key];
  const term = d ? d.term : (own && own.term) || key;
  const subs = d && d.sub ? d.sub.map(s => '<div class="subdef"><b>' + esc(s.term) + ':</b> ' + esc(s.text) + '</div>').join('') : '';
  const std = d ? '<p>' + esc(d.text) + '</p>' + subs : '';
  const kind = d ? '<span class="kind">Definition</span>' : '<span class="kind">Eigene</span>';
  const mine = own && own.text
    ? '<div class="mine"><div class="mh">Meine Definition</div><div>' + esc(own.text).replace(/\n/g, '<br>') + '</div></div>' : '';
  pop.innerHTML = '<div class="ph"><strong>' + esc(term) + '</strong>' + kind + '</div>' + std + mine +
    '<div class="row"><button class="linkbtn" data-editdef="' + esc(key) + '">' + (own ? 'Meine Definition bearbeiten' : '+ Eigene Definition') + '</button></div>';
  popFor = el; placePop(el.getBoundingClientRect());
}
function showRefPop(el) {
  const id = el.dataset.norm; const n = LAW.norms[id]; if (!n) return;
  const first = n.blocks.slice(0, 2).map(b => (b.t === 'abs' ? '(' + b.n + ') ' : '') + b.text).join(' ');
  const txt = first.length > 260 ? first.slice(0, 260).replace(/\s+\S*$/, '') + ' …' : first;
  pop.innerHTML = '<div class="ph"><strong>' + par(id) + ' ' + esc(n.title) + '</strong><span class="kind leg">Vorschau</span></div>' +
    (n.gone ? '<p><em>weggefallen</em></p>' : '<div class="prev">' + esc(txt) + '</div>') +
    '<div class="hint">' + (S.settings.linkMode === 'split' ? 'Klick: im Splitscreen daneben öffnen' : 'Klick: in neuem Tab öffnen') + ' · Strg+Klick: neuer Tab</div>';
  popFor = el; placePop(el.getBoundingClientRect());
}
const hidePop = () => { pop.hidden = true; popFor = null; };
const schedHide = () => { clearTimeout(popTimer); popTimer = setTimeout(hidePop, 220); };
document.addEventListener('mouseover', e => {
  const t = e.target.closest ? e.target.closest('.term, a.xref:not(.ext)') : null;
  if (pop.contains(e.target)) { clearTimeout(popTimer); return; }
  if (!t) return;
  if (t === popFor && !pop.hidden) { clearTimeout(popTimer); return; }
  clearTimeout(popTimer);
  popTimer = setTimeout(() => { t.classList.contains('term') ? showTermPop(t) : showRefPop(t); }, 180);
});
document.addEventListener('mouseout', e => {
  const t = e.target.closest ? e.target.closest('.term, a.xref:not(.ext)') : null;
  if (t || pop.contains(e.target)) schedHide();
});
document.addEventListener('focusin', e => { const t = e.target.closest && e.target.closest('.term'); if (t) showTermPop(t); });

/* ================================================================ Modal / Toast */
const modalEl = $('#modal');
let modalReturnFocus = null;
function openModal(html, onMount) {
  hidePop();
  modalReturnFocus = document.activeElement;
  modalEl.innerHTML = '<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-title">' + html + '</div>'; modalEl.hidden = false;
  const h = $('h3', modalEl); if (h) h.id = 'dlg-title';
  const first = $('input, textarea, .role-card, button', modalEl); if (first) setTimeout(() => { first.focus(); if (first.select && first.tagName === 'INPUT') first.select(); }, 10);
  if (onMount) onMount($('.dlg', modalEl));
}
const closeModal = () => {
  if (modalEl.hidden) return;
  modalEl.hidden = true; modalEl.innerHTML = '';
  if (modalReturnFocus && document.contains(modalReturnFocus)) { try { modalReturnFocus.focus(); } catch (e) { /* Element nicht fokussierbar */ } }
  modalReturnFocus = null;
};
modalEl.addEventListener('mousedown', e => { if (e.target === modalEl) closeModal(); });
// Fokus im Dialog halten (Tab / Shift+Tab)
modalEl.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const f = $$('input, textarea, select, button, a[href]', modalEl).filter(x => !x.disabled && x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
let toastTimer;
function toast(msg, action) {
  const t = $('#toast');
  t.innerHTML = '<span>' + esc(msg) + '</span>' + (action ? '<button>' + esc(action.label) + '</button>' : '');
  t.hidden = false;
  if (action) $('button', t).onclick = () => { t.hidden = true; action.fn(); };
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, action ? 9000 : 2600);
}

function defModal(key, prefill) {
  const d = key ? DEFBY[key] : null, own = key ? S.customDefs[key] : null;
  const term = d ? d.term : own ? own.term : (prefill || '');
  openModal('<h3>' + (own ? 'Eigene Definition bearbeiten.' : 'Eigene Definition anlegen.') + '</h3><div class="sub">Begriffe mit eigener Definition werden im Text korallefarben unterstrichen und beim Hover angezeigt.</div>' +
    (d ? '<div class="ref"><b>Standard:</b> ' + esc(d.text) + '</div>' : '') +
    '<form><label for="f-term">Begriff</label><input id="f-term" name="term" value="' + esc(term) + '" ' + (d ? 'readonly' : '') + ' required maxlength="60">' +
    '<label for="f-text">Meine Definition oder Merksatz</label><textarea id="f-text" name="text" required>' + esc(own ? own.text : '') + '</textarea>' +
    '<div class="acts">' + (own ? '<button type="button" class="jf-btn jf-btn--secondary left" data-del>Löschen</button>' : '') + '<button type="button" class="jf-btn jf-btn--secondary" data-cancel>Abbrechen</button><button class="jf-btn jf-btn--primary">Speichern</button></div></form>',
  dlg => {
    $('[data-cancel]', dlg).onclick = closeModal;
    const delb = $('[data-del]', dlg); if (delb) delb.onclick = () => { delete S.customDefs[key]; save(); closeModal(); renderAll(); toast('Eigene Definition gelöscht'); };
    $('form', dlg).onsubmit = e => {
      e.preventDefault();
      const f = e.target, t = f.term.value.trim(), x = f.text.value.trim(); if (!t || !x) return;
      const k = key || 'c:' + t.toLowerCase();
      S.customDefs[k] = { term: t, text: x }; save(); closeModal(); renderAll(); toast('Definition für „' + t + '“ gespeichert');
    };
  });
}
function tagModal() {
  const id = focusId();
  openModal('<h3>Eigenen Tag hinzufügen.</h3><div class="sub">Für ' + par(id) + ' · eine Norm, die du bei dieser Vorschrift immer mitprüfst.</div>' +
    '<form><label for="f-n">Norm, z. B. 25 oder 218a</label><input id="f-n" name="n" placeholder="25" required maxlength="8"><label for="f-l">Kurzlabel (optional)</label><input id="f-l" name="l" maxlength="40" placeholder="z. B. Mittäterschaft">' +
    '<div class="acts"><button type="button" class="jf-btn jf-btn--secondary" data-cancel>Abbrechen</button><button class="jf-btn jf-btn--primary">Hinzufügen</button></div></form>',
  dlg => {
    $('[data-cancel]', dlg).onclick = closeModal;
    $('form', dlg).onsubmit = e => {
      e.preventDefault();
      const n = e.target.n.value.toLowerCase().replace(/[§\s]/g, '');
      if (!/^\d+[a-z]?$/.test(n)) { toast('Bitte eine Normnummer wie „25“ oder „218a“ eingeben'); return; }
      (S.customTags[id] = S.customTags[id] || []).push({ n, l: e.target.l.value.trim() }); save(); closeModal(); renderTags();
    };
  });
}
function findModal(kind) {
  const id = focusId();
  openModal('<h3>Eigene Fundstelle ergänzen.</h3><div class="sub">Für ' + par(id) + ' · wird lokal in deinem Browser gespeichert.</div>' +
    '<form><label for="f-kind">Art</label><select id="f-kind" name="kind"><option value="rspr"' + (kind === 'rspr' ? ' selected' : '') + '>Rechtsprechung</option><option value="lit"' + (kind === 'lit' ? ' selected' : '') + '>Literatur</option></select>' +
    '<label for="f-type">Typ (bei Literatur)</label><select id="f-type" name="type"><option>Kommentar</option><option>Lehrbuch</option><option>Aufsatz</option><option>Sonstiges</option></select>' +
    '<label for="f-title">Fundstelle oder Titel</label><input id="f-title" name="title" required maxlength="160" placeholder="z. B. BGH, Urt. v. … – … StR …/…">' +
    '<label for="f-note">Notiz (optional)</label><textarea id="f-note" name="note"></textarea>' +
    '<div class="acts"><button type="button" class="jf-btn jf-btn--secondary" data-cancel>Abbrechen</button><button class="jf-btn jf-btn--primary">Speichern</button></div></form>',
  dlg => {
    $('[data-cancel]', dlg).onclick = closeModal;
    $('form', dlg).onsubmit = e => {
      e.preventDefault(); const f = e.target;
      (S.finds[id] = S.finds[id] || []).push({ kind: f.kind.value, type: f.type.value, title: f.title.value.trim(), note: f.note.value.trim() });
      save(); closeModal(); renderExtra(); renderHint();
    };
  });
}

/* ================================================================ Suche */
const qEl = $('#q'), resEl = $('#results'); let resSel = 0, resList = [];
function runSearch(raw) {
  const q = raw.trim().toLowerCase(); if (!q) return [];
  const num = q.replace(/^§+\s*/, '').replace(/\s+/g, '');
  const out = [];
  LAW.order.forEach(id => {
    const n = LAW.norms[id]; let score = 0, snip = '';
    if (/^\d+[a-z]?$/.test(num)) { if (id === num) score = 100; else if (id.startsWith(num)) score = 70; }
    const t = n.title.toLowerCase();
    if (!score && t.includes(q)) score = 60 + (t.startsWith(q) ? 5 : 0);
    if (!score && q.length >= 3) { const k = n.plain.indexOf(q); if (k >= 0) { score = 30; snip = n.plain.slice(Math.max(0, k - 40), k + q.length + 60); } }
    if (!score && q.length >= 4) {
      const d = META.defs.find(x => x.in.includes(id) && (x.term.toLowerCase().includes(q) || (x.sub || []).some(s => s.term.toLowerCase().includes(q))));
      if (d) { score = 20; snip = 'Begriff: ' + d.term; }
    }
    if (score) out.push({ id, score: score - (n.gone ? 25 : 0), snip });
  });
  return out.sort((a, b) => b.score - a.score || sortKey(a.id) - sortKey(b.id)).slice(0, 8);
}
function renderResults() {
  const q = qEl.value; resList = runSearch(q);
  if (!q.trim()) { resEl.hidden = true; qEl.setAttribute('aria-expanded', 'false'); return; }
  resEl.hidden = false; qEl.setAttribute('aria-expanded', 'true'); resSel = 0;
  const hl = s => esc(s).replace(new RegExp('(' + escRe(esc(q.trim())) + ')', 'ig'), '<mark>$1</mark>');
  resEl.innerHTML = resList.length ? resList.map((r, i) => '<div role="option" aria-selected="' + (i === 0) + '" class="res' + (i === 0 ? ' sel' : '') + '" data-res="' + r.id + '"><span><b>' + par(r.id) + '</b> ' + hl(LAW.norms[r.id].title) + '</span>' +
    '<small>' + esc(LAW.norms[r.id].section.nr + '. Abschnitt') + (r.snip ? ' · …' + hl(r.snip) + '…' : '') + '</small></div>').join('') : '<div class="empty">Keine Treffer im Beispieltext.</div>';
}
function pickResult(id, split) { resEl.hidden = true; qEl.value = ''; qEl.blur(); go(id, { mode: split ? 'split' : 'replace' }); }
qEl.addEventListener('input', renderResults);
qEl.addEventListener('focus', renderResults);
qEl.addEventListener('keydown', e => {
  const rows = $$('.res', resEl);
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault(); if (!rows.length) return;
    resSel = (resSel + (e.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length;
    rows.forEach((r, i) => { r.classList.toggle('sel', i === resSel); r.setAttribute('aria-selected', i === resSel); });
  } else if (e.key === 'Enter') { const r = resList[resSel]; if (r) pickResult(r.id, e.shiftKey); }
  else if (e.key === 'Escape') { resEl.hidden = true; qEl.blur(); }
});
resEl.addEventListener('mousedown', e => { const r = e.target.closest('.res'); if (r) { e.preventDefault(); pickResult(r.dataset.res, e.shiftKey); } });
document.addEventListener('mousedown', e => { if (!e.target.closest('.search')) resEl.hidden = true; });

/* ================================================================ Einstellungen */
const setEl = $('#settings');
function renderSettings() {
  const sw = (k, on) => '<button class="switch' + (on ? ' on' : '') + '" role="switch" aria-checked="' + on + '" data-sw="' + k + '"></button>';
  setEl.innerHTML = '<h3>Einstellungen.</h3>' +
    '<div class="set-row"><div><div>Ansicht</div><div class="d">Passt Lernhilfen, Literatur-Reihenfolge und Lernstand an. Beim Wechsel werden „Kurz erklärt“ und Begriffe auf die Rollen-Voreinstellung gesetzt.</div></div><select data-sel="role"><option value="student"' + (role() === 'student' ? ' selected' : '') + '>Studium</option><option value="pro"' + (role() === 'pro' ? ' selected' : '') + '>Praxis</option></select></div>' +
    '<div class="set-row"><div><div>Verweise öffnen als</div><div class="d">Splitscreen im selben Tab oder neuer Browser-Tab</div></div><select data-sel="linkMode"><option value="split"' + (S.settings.linkMode === 'split' ? ' selected' : '') + '>Splitscreen</option><option value="tab"' + (S.settings.linkMode === 'tab' ? ' selected' : '') + '>Neuer Tab</option></select></div>' +
    '<div class="set-row"><div><div>„Kurz erklärt“ anzeigen</div><div class="d">Klartext-Zusammenfassung je Norm</div></div>' + sw('explain', S.settings.explain) + '</div>' +
    '<div class="set-row"><div><div>Begriffe hervorheben</div><div class="d">Definitionen beim Drüberhovern</div></div>' + sw('defs', S.settings.defs) + '</div>' +
    '<div class="set-row"><div><div>Weggefallene Normen zeigen</div></div>' + sw('showGone', S.settings.showGone) + '</div>' +
    '<div class="set-row"><div>Schriftgröße</div><input type="range" min="14" max="22" step="1" value="' + S.settings.fs + '" data-range="fs"></div>' +
    '<div class="set-actions"><button class="jf-btn jf-btn--secondary" data-act="demo">Demo-Daten laden</button><button class="jf-btn jf-btn--secondary" data-act="export">Daten exportieren</button><button class="jf-btn jf-btn--secondary" data-act="import">Importieren</button><button class="jf-btn jf-btn--secondary" data-act="reset">Alles zurücksetzen</button></div>' +
    (storageOk ? '' : '<div class="jf-note jf-note--foxxy" style="margin-top:var(--space-3)"><div class="jf-note__label">Speicher nicht verfügbar</div><div class="jf-note__body">Änderungen gehen beim Schließen des Browsers verloren.</div></div>');
}
$('#btnSettings').onclick = e => { e.stopPropagation(); if (setEl.hidden) { renderSettings(); setEl.hidden = false; } else setEl.hidden = true; };
document.addEventListener('mousedown', e => { if (!setEl.hidden && !e.target.closest('#settings, #btnSettings')) setEl.hidden = true; });
setEl.addEventListener('click', e => {
  const sw = e.target.closest('[data-sw]');
  if (sw) { S.settings[sw.dataset.sw] = !S.settings[sw.dataset.sw]; save(); renderSettings(); renderPanes(); renderChrome(); return; }
});
setEl.addEventListener('change', e => {
  const sel = e.target.closest('[data-sel]'); if (!sel) return;
  if (sel.dataset.sel === 'role') { applyRole(sel.value); renderSettings(); return; }
  S.settings[sel.dataset.sel] = sel.value; save(); renderPanes(); renderChrome();
});
setEl.addEventListener('input', e => {
  const r = e.target.closest('[data-range]'); if (!r) return;
  S.settings[r.dataset.range] = +r.value; saveSoon(); renderTop();
});

/* ---- Demo / Export / Import / Reset */
function loadDemo() {
  const now = Date.now(), H = 3600e3, D = 24 * H;
  const plan = [['211', 6, 340, 2 * D + 3 * H], ['212', 5, 260, 2 * D + 2 * H], ['222', 3, 120, 2 * D], ['223', 6, 300, D + 5 * H], ['224', 4, 210, D + 3 * H],
    ['218', 2, 90, D], ['218a', 3, 140, 4 * H], ['219', 1, 25, 3 * H], ['225', 1, 12, 2 * H], ['229', 2, 45, H]];
  S.stats = {}; S.history = [];
  plan.forEach(([id, v, secs, ago_]) => { S.stats[id] = { visits: v, secs, last: now - ago_ }; });
  S.history = plan.map(([id, , , ago_]) => ({ id, ts: now - ago_ })).sort((a, b) => b.ts - a.ts);
  S.bookmarks = ['211', '212', '223'];
  save(); renderAll(); toast('Demo-Daten geladen – schau in „Lernstand“.', { label: 'Lernstand öffnen', fn: () => { ui.leftTab = 'learn'; renderLeft(); } });
}
function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'normfenster-daten.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importData() {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json';
  inp.onchange = () => {
    const f = inp.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { try { const d = JSON.parse(rd.result); S = Object.assign({}, DEFAULT, d, { settings: Object.assign({}, DEFAULT.settings, d.settings) }); save(); renderAll(); toast('Daten importiert'); } catch (err) { toast('Datei konnte nicht gelesen werden'); } };
    rd.readAsText(f);
  };
  inp.click();
}

/* ================================================================ Globale Klick-Behandlung */
document.addEventListener('click', e => {
  const t = e.target;

  const dt = t.closest('[data-deltag]');
  if (dt) { e.preventDefault(); const id = focusId(); (S.customTags[id] || []).splice(+dt.dataset.deltag, 1); save(); renderTags(); return; }

  // Verweise im Text + Tags
  const xr =t.closest('a.xref:not(.ext), a.chip[data-norm]');
  if (xr) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;       // Browser-Standard: neuer Tab/Fenster
    e.preventDefault(); hidePop();
    const id = xr.dataset.norm;
    if (S.settings.linkMode === 'tab' && !xr.closest('.nrow')) { window.open(location.href.split('#')[0] + '#/stgb/' + id, '_blank'); return; }
    go(id, { mode: 'split', from: focusedPaneFromEl(xr), abs: xr.dataset.abs }); return;
  }
  if (t.closest('a.xref.ext, a.chip.ext')) return;       // externer Link: Browser-Standard (neuer Tab)

  // Navigation in Seitenleisten (ersetzt die aktive Norm)
  const nav = t.closest('[data-nav]');
  if (nav && !t.closest('[data-unbm]')) {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault(); go(nav.dataset.nav, { mode: 'replace' }); return;
  }
  const crumb = t.closest('[data-go]'); if (crumb) { go(crumb.dataset.go, { mode: 'replace' }); return; }
  const secgo = t.closest('[data-secgo]'); if (secgo) { go(secgo.dataset.secgo, { mode: 'replace' }); return; }

  const unbm = t.closest('[data-unbm]'); if (unbm) { e.preventDefault(); toggleBm(unbm.dataset.unbm); return; }
  const tab = t.closest('[data-tab]'); if (tab) { ui.leftTab = tab.dataset.tab; renderLeft(); return; }
  const lm = t.closest('[data-linkmode]'); if (lm) { S.settings.linkMode = lm.dataset.linkmode; save(); renderTop(); toast(lm.dataset.linkmode === 'split' ? 'Verweise öffnen im Splitscreen' : 'Verweise öffnen in neuem Tab'); return; }
  const lc = t.closest('[data-litcat]');
  if (lc) { const r = role(), cur = litCats(); S.settings.litCats = S.settings.litCats || {}; S.settings.litCats[r] = Object.assign({}, cur, { [lc.dataset.litcat]: !cur[lc.dataset.litcat] }); save(); renderExtra(); return; }
  const rb = t.closest('[data-role]'); if (rb) { if (rb.dataset.role !== role() || rb.closest('.role-cards')) applyRole(rb.dataset.role, rb.closest('.role-cards') && rb.dataset.role === 'student'); return; }
  const flt = t.closest('[data-flt]'); if (flt) { ui.extraFilter = flt.dataset.flt; renderExtra(); return; }
  const df =t.closest('[data-delfind]'); if (df) { (S.finds[focusId()] || []).splice(+df.dataset.delfind, 1); save(); renderExtra(); renderHint(); return; }
  const ed = t.closest('[data-editdef]'); if (ed) { defModal(ed.dataset.editdef); return; }

  const cite = t.closest('[data-cite]'); if (cite) { copy(cite.dataset.cite); return; }

  const pb = t.closest('.pane [data-act]');
  if (pb) {
    const i = +pb.closest('.pane').dataset.idx, id = ui.panes[i];
    if (pb.dataset.act === 'bm') toggleBm(id);
    else if (pb.dataset.act === 'copy') copy(par(id) + ' ' + META.law.abbr);
    else if (pb.dataset.act === 'close') closePane(i);
    else if (pb.dataset.act === 'solo') soloPane(i);
    return;
  }
  const pane = t.closest('.pane'); if (pane && !t.closest('a')) setFocus(+pane.dataset.idx);

  const act = t.closest('[data-act]');
  if (act) {
    switch (act.dataset.act) {
      case 'clear-history': if (confirm('Verlauf wirklich leeren? (Lernstand-Daten bleiben erhalten)')) { S.history = []; save(); renderLeft(); } break;
      case 'toggle-gone': S.settings.showGone = !S.settings.showGone; save(); renderRight(); break;
      case 'add-tag': tagModal(); break;
      case 'add-find': findModal(act.dataset.kind); break;
      case 'to-top': $('#scroller').scrollTo({ top: 0 }); break;
      case 'demo': setEl.hidden = true; loadDemo(); break;
      case 'export': exportData(); break;
      case 'import': setEl.hidden = true; importData(); break;
      case 'reset': if (confirm('Alle lokalen Daten (Verlauf, Lesezeichen, Notizen, Definitionen) löschen?')) { try { localStorage.removeItem(STORE_KEY); } catch (err) { /* ignorieren */ } location.hash = ''; location.reload(); } break;
    }
    return;
  }
  if (t.closest('#hintbar')) { $('#scroller').scrollTo({ top: $('#stage').offsetHeight - 10 }); }
});
function copy(text) {
  const done = () => toast('Zitat kopiert: ' + text);
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => toast('Kopieren nicht möglich'));
  else { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Kopieren nicht möglich'); } ta.remove(); }
}
function toggleBm(id) {
  const i = S.bookmarks.indexOf(id);
  if (i >= 0) S.bookmarks.splice(i, 1); else S.bookmarks.push(id);
  save(); renderPanes(); renderLeft(); renderRight();
}
$('#btnLeft').onclick = () => { S.settings.left = !S.settings.left; save(); renderTop(); };
$('#btnRight').onclick = () => { S.settings.right = !S.settings.right; save(); renderTop(); };

/* Auswahl → „Eigene Definition“ */
const selBtn = $('#selbtn'); let selText = '';
document.addEventListener('mouseup', e => {
  if (e.target === selBtn) return;
  setTimeout(() => {
    const sel = getSelection(); const txt = sel ? sel.toString().trim() : '';
    if (txt && txt.length >= 3 && txt.length <= 60 && !/\n/.test(txt) && sel.rangeCount && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.pane-body')) {
      const r = sel.getRangeAt(0).getBoundingClientRect(); selText = txt;
      selBtn.hidden = false; selBtn.style.left = Math.min(r.left, innerWidth - 170) + 'px'; selBtn.style.top = (r.top - 38 < 8 ? r.bottom + 6 : r.top - 38) + 'px';
    } else selBtn.hidden = true;
  }, 10);
});
selBtn.addEventListener('mousedown', e => e.preventDefault());
selBtn.addEventListener('click', () => { selBtn.hidden = true; const key = 'c:' + selText.toLowerCase(); defModal(S.customDefs[key] ? key : null, selText); getSelection().removeAllRanges(); });
$('#scroller').addEventListener('scroll', () => { selBtn.hidden = true; hidePop(); }, { passive: true });

/* Tastatur */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qEl.focus(); qEl.select(); return; }
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); qEl.focus(); return; }
  if (e.key === 'Escape') { if (!modalEl.hidden) closeModal(); else if (!setEl.hidden) setEl.hidden = true; else hidePop(); }
});

/* ================================================================ Verweildauer */
let dirty = 0;
setInterval(() => {
  const id = focusId();
  if (!id || role() !== 'student' || document.visibilityState !== 'visible' || !document.hasFocus()) return;   // Praxis: kein Lern-Tracking
  stat(id).secs++; if (++dirty >= 10) { dirty = 0; save(); if (ui.leftTab === 'learn') renderLeft(); }
}, 1000);

/* ================================================================ Start */
function parseHash() {
  const m = /^#\/stgb\/([0-9a-z,]+)/.exec(location.hash);
  return m ? m[1].split(',').filter((id, i, a) => LAW.norms[id] && a.indexOf(id) === i).slice(0, MAXPANES) : [];
}
window.addEventListener('hashchange', () => {
  const p = parseHash();
  if (p.length && p.join() !== ui.panes.join()) { ui.panes = p; ui.focus = Math.min(ui.focus, p.length - 1); afterNav(focusId()); }
});

// Einmalige Rollenwahl beim ersten Start (jederzeit oben rechts oder in den Einstellungen änderbar)
function roleChooser() {
  openModal('<h3>Wähle deine Ansicht.</h3><div class="sub">Sie passt Hilfen und Literatur an. Du kannst jederzeit oben rechts wechseln.</div>' +
    '<div class="role-cards">' +
      '<button class="role-card" data-role="student"><b>Studium</b><span>Kurz erklärt, Begriffe zum Hovern, Lernstand, Prüfungsrelevanz. Literatur: ZJS-Aufsätze, Übungs- und Examensfälle, Lehrbücher.</span></button>' +
      '<button class="role-card" data-role="pro"><b>Praxis</b><span>Ruhiger Text, Fußnoten offen, kein Lernstand. Literatur: Kommentare und Anmerkungen; Rechtsprechung, neueste zuerst.</span></button>' +
    '</div>');
  S.settings.roleChosen = true; save();   // nur einmal fragen
}

function init() {
  buildTerms();
  const fromHash = parseHash();
  let restored = false;
  if (fromHash.length) { ui.panes = fromHash; ui.focus = 0; }
  else if (S.last && S.last.panes && S.last.panes.filter(id => LAW.norms[id]).length) { ui.panes = S.last.panes.filter(id => LAW.norms[id]); ui.focus = Math.min(S.last.focus || 0, ui.panes.length - 1); restored = true; }
  else { ui.panes = ['211']; ui.focus = 0; }
  if (!restored) recordVisit(focusId());
  persistLast();
  renderPanes(); renderChrome();
  if (!S.settings.roleChosen) { roleChooser(); return; }
  if (restored && S.history.length > 1) {
    const h = S.history[0], n = LAW.norms[h.id];
    toast('Willkommen zurück. Zuletzt gelesen: ' + par(h.id) + ' ' + n.title + ' (' + ago(h.ts) + ')', { label: 'Hier weitermachen', fn: () => { $$('.pane-body')[ui.focus].scrollTo({ top: 0 }); } });
  }
}
init();
window.__normfenster = { LAW, S: () => S, go, loadDemo };   // für Debugging in der Konsole
})();

/*
 * Redaktionelle Zusatzdaten zum StGB (Demo-Datensatz).
 * ACHTUNG: Definitionen, Kurzerklärungen, Prüfungsrelevanz und Fundstellen sind
 * Beispielinhalte zum Testen der Funktionen – vor echter Nutzung redaktionell prüfen.
 */
window.STGB_META = {
  law: { id: 'stgb', abbr: 'StGB', name: 'Strafgesetzbuch',
         extUrl: id => 'https://www.gesetze-im-internet.de/stgb/__' + id + '.html' },

  sectionNr: { Sechzehnter: 16, Siebzehnter: 17 },

  // Einordnung oberhalb der Abschnitte (Teile). Abschnitte werden automatisch aus dem Text erzeugt.
  parts: [ { label: 'Besonderer Teil', from: '80', to: '358' } ],
  // Abschnitte außerhalb des Beispieltexts (für die Vor-/Zurück-Buttons der Abschnittsleiste)
  sectionStubs: {
    15: { title: 'Verletzung des persönlichen Lebens- und Geheimbereichs', range: '§§ 201–206' },
    18: { title: 'Straftaten gegen die persönliche Freiheit', range: '§§ 232 ff.' }
  },
  // Titel unterhalb der Abschnitte (im Beispieltext nicht vorhanden): { label, from, to }
  titles: [],

  // Themenblöcke für Navigation & Lernstand-Analyse
  topics: [
    { id: 'toet', label: 'Tötungsdelikte',                         ids: ['211','212','213','216','217','221','222'] },
    { id: 'abbr', label: 'Schwangerschaftsabbruch',                ids: ['218','218a','218b','218c','219','219b'] },
    { id: 'kv',   label: 'Körperverletzung – Kerntatbestände',     ids: ['223','224','225','226','226a','227'] },
    { id: 'kv2',  label: 'Körperverletzung – Sonderregeln',        ids: ['228','229','230','231'] }
  ],

  // Definitionen: siehe data/stgb-defs.js

  /* ---------------------------------------------------------------- Normen
     imp   : Prüfungsrelevanz 1–5 (Startwert, für Lernstand-Analyse)
     kurz  : „Kurz erklärt“ (Klartext). **fett** erlaubt, Normverweise werden verlinkt.
     tags  : häufige Cross-Checks [Norm, Kurzlabel] – Normen, die nicht im Datensatz sind, öffnen gesetze-im-internet.de
     rspr  : Rechtsprechung   lit: norm-spezifische Literatur/Materialien */
  norms: {
    '211': { imp:5,
      kurz:'Qualifiziertes Tötungsdelikt: Wer einen Menschen tötet **und** mindestens ein Mordmerkmal erfüllt, wird zwingend mit lebenslanger Freiheitsstrafe bestraft. Die Merkmale sind in drei Gruppen geordnet: **Motive** (Gruppe 1), **Art der Tatausführung** (Gruppe 2), **Zweck der Tat** (Gruppe 3). Streit: Rspr. sieht § 211 als eigenständigen Tatbestand, die h. L. als Qualifikation zu § 212 – das wirkt sich auf § 28 aus.',
      tags:[['212','Abgrenzung / Grundtatbestand'],['216','Privilegierung'],['15','Vorsatz'],['22','Versuch'],['28','Besondere persönl. Merkmale'],['13','Unterlassen'],['20','Schuldunfähigkeit'],['57a','Restaussetzung']],
      rspr:[
        { court:'BVerfG', date:'21.6.1977', az:'1 BvL 14/76', cite:'BVerfGE 45, 187', title:'Lebenslange Freiheitsstrafe',
          note:'Die lebenslange Freiheitsstrafe für Mord ist mit dem Grundgesetz vereinbar, wenn die Vollstreckung dem Verurteilten eine realistische Chance auf Wiedererlangung der Freiheit lässt; § 211 ist restriktiv auszulegen.' },
        { court:'BGH', date:'19.5.1981', az:'GSSt 1/81', cite:'BGHSt 30, 105', title:'Rechtsfolgenlösung bei Heimtücke',
          note:'Bei Vorliegen außergewöhnlicher Umstände kann der Strafrahmen des § 49 Abs. 1 Nr. 1 angewendet werden, wenn lebenslange Freiheitsstrafe unverhältnismäßig wäre (Haustyrannen-Fall).' },
        { court:'BGH', date:'—', az:'', cite:'BGHSt 1, 368', title:'Verhältnis § 211 zu § 212',
          note:'Rspr.: Mord und Totschlag sind selbständige Tatbestände (Selbständigkeitstheorie). Folge für Teilnehmer: § 28 Abs. 1 vs. Abs. 2.' },
        { court:'BGH', date:'1.3.2018 / 18.6.2020', az:'4 StR 399/17; 4 StR 482/19', cite:'', title:'Berliner Raser-Fälle',
          note:'Bedingter Tötungsvorsatz und Mordmerkmale (u. a. gemeingefährliche Mittel) bei illegalen Kraftfahrzeugrennen.' }
      ],
      lit:[
        { type:'Materialien', title:'Abschlussbericht der Expertengruppe zur Reform der Tötungsdelikte (§§ 211–213, 57a StGB)', cite:'BMJV, 2015', note:'Reformvorschläge zu den Mordmerkmalen und zur absoluten Strafandrohung.' }
      ] },
    '212': { imp:5,
      kurz:'**Grundtatbestand** der vorsätzlichen Tötung: Wer vorsätzlich einen Menschen tötet, ohne Mörder zu sein, erhält 5 bis 15 Jahre. In besonders schweren Fällen (Abs. 2) lebenslang. Aufbau: Tatbestand (Mensch, Tötung, Kausalität, Vorsatz) – Rechtswidrigkeit – Schuld. Wichtig ist die Abgrenzung des **bedingten Vorsatzes** zur bewussten Fahrlässigkeit (§ 222).',
      tags:[['211','Qualifikation'],['213','Minder schwerer Fall'],['216','Privilegierung'],['222','Abgrenzung fahrlässig'],['15','Vorsatz'],['22','Versuch'],['32','Notwehr'],['13','Unterlassen']],
      rspr:[
        { court:'BGH', date:'4.11.1988', az:'1 StR 262/88', cite:'BGHSt 36, 1', title:'Aids-Entscheidung / Hemmschwelle',
          note:'Bei äußerst gefährlichen Gewalthandlungen liegt bedingter Tötungsvorsatz nahe; gegen die Annahme kann aber eine hohe Hemmschwelle sprechen.' },
        { court:'BGH', date:'23.2.2012', az:'4 StR 624/11', cite:'', title:'Hemmschwelle & Gesamtschau',
          note:'Keine „Vorsatzgrenze“ durch die Hemmschwelle: Der Vorsatz ist anhand einer Gesamtschau aller objektiven und subjektiven Tatumstände zu beurteilen.' }
      ], lit:[] },
    '213': { imp:4,
      kurz:'**Privilegierung** des Totschlags (nicht des Mordes!), mit Strafrahmen 1 bis 10 Jahre. Zwei Alternativen: (1) **Provokation** – der Täter wurde ohne eigene Schuld durch eine Misshandlung oder schwere Beleidigung zum Zorn gereizt und zur Tat hingerissen, (2) **sonstiger minder schwerer Fall** nach Gesamtwürdigung.',
      tags:[['212','Anwendungsbereich'],['211','Abgrenzung Mord'],['21','Verminderte Schuldfähigkeit'],['46','Strafzumessung']], rspr:[], lit:[] },
    '216': { imp:4,
      kurz:'**Privilegierte Tötung**: Der Täter wird durch das ausdrückliche und ernstliche Verlangen des Getöteten zur Tötung bestimmt. Strafrahmen 6 Monate bis 5 Jahre; der Versuch ist strafbar. Zentral ist die Abgrenzung zur **straflosen Beihilfe zur Selbsttötung** (Tatherrschaft über das unmittelbar todbringende Geschehen) und zur Sterbehilfe.',
      tags:[['212','Abgrenzung'],['211','Mord'],['217','Suizidhilfe'],['13','Unterlassen'],['228','Einwilligung (Grenze)'],['22','Versuch']],
      rspr:[
        { court:'BGH', date:'4.7.1984', az:'3 StR 96/84', cite:'BGHSt 32, 367', title:'Wittig-Fall',
          note:'Zur Garantenstellung und zur Verantwortlichkeit bei Suizid: Wer dem bewusstlosen Suizidenten nicht hilft, kann sich strafbar machen – Abgrenzung zum Selbsttötungsgeschehen.' },
        { court:'BGH', date:'3.7.2019', az:'5 StR 132/18; 5 StR 393/18', cite:'', title:'Ärztliche Suizidbegleitung',
          note:'Keine Garantenstellung des Arztes für das Leben des Suizidenten, der sich eigenverantwortlich zur Selbsttötung entschieden hat.' }
      ], lit:[] },
    '217': { imp:2,
      kurz:'Die Norm ist im Gesetzestext **noch enthalten, aber unwirksam**: Das BVerfG hat § 217 am 26.2.2020 für verfassungswidrig und nichtig erklärt (Recht auf selbstbestimmtes Sterben). Sie ist daher heute **nicht mehr anwendbar**, bleibt aber wichtig für das Verständnis der Sterbehilfe-Diskussion.',
      tags:[['216','Abgrenzung'],['212','Totschlag'],['26','Anstiftung'],['27','Beihilfe'],['13','Garantenstellung']],
      rspr:[
        { court:'BVerfG', date:'26.2.2020', az:'2 BvR 2347/15 u. a.', cite:'BVerfGE 153, 182', title:'Suizidhilfe',
          note:'§ 217 verletzt das allgemeine Persönlichkeitsrecht (Recht auf selbstbestimmtes Sterben) und ist nichtig.' }
      ], lit:[] },
    '218': { imp:4,
      kurz:'**Grundtatbestand** des Schwangerschaftsabbruchs. Strafbar ist das Abbrechen; **vor Abschluss der Einnistung** (Abs. 1 S. 2) liegt kein Abbruch vor. Die Schwangere selbst wird privilegiert (Abs. 3), der Versuch ist strafbar, aber nicht bei der Schwangeren (Abs. 4). Praktisch geprägt von den **Ausnahmen in § 218a**.',
      tags:[['218a','Straflosigkeit'],['218b','Ärztl. Feststellung'],['218c','Ärztl. Pflichten'],['219','Beratung'],['219b','Mittel'],['212','Mensch vs. Leibesfrucht'],['22','Versuch']],
      rspr:[
        { court:'BVerfG', date:'25.2.1975', az:'1 BvF 1/74 u. a.', cite:'BVerfGE 39, 1', title:'Schwangerschaftsabbruch I',
          note:'Schutzpflicht des Staates für das ungeborene Leben; grundsätzliche Pflicht zur Strafbewehrung.' },
        { court:'BVerfG', date:'28.5.1993', az:'2 BvF 2/90 u. a.', cite:'BVerfGE 88, 203', title:'Schwangerschaftsabbruch II',
          note:'Beratungskonzept: Abbruch nach Beratung bleibt rechtswidrig, kann aber tatbestandslos gestellt werden.' }
      ],
      lit:[ { type:'Materialien', title:'Bericht der Kommission zur reproduktiven Selbstbestimmung und Fortpflanzungsmedizin', cite:'15.4.2024', note:'Empfehlungen zur Regulierung außerhalb des Strafrechts.' } ] },
    '218a': { imp:4,
      kurz:'Hier steckt das **Konzept der Regelung**: Abs. 1 – **Beratungsregelung** (Tatbestand nicht verwirklicht, bis 12 Wochen seit Empfängnis, Beratung ≥ 3 Tage vorher, Arzt). Abs. 2 – **medizinische Indikation** (Rechtfertigung). Abs. 3 – **kriminologische Indikation** (12 Wochen). Abs. 4 – **persönlicher Strafausschluss** der Schwangeren bis 22 Wochen nach Beratung.',
      tags:[['218','Grundtatbestand'],['219','Beratung'],['218b','Ärztl. Feststellung'],['218c','Ärztl. Pflichten'],['34','Notstand'],['176','Kindesmissbrauch']],
      rspr:[ { court:'BVerfG', date:'28.5.1993', az:'2 BvF 2/90 u. a.', cite:'BVerfGE 88, 203', title:'Beratungskonzept', note:'Verfassungsrechtliche Vorgaben zu Abs. 1–4.' } ], lit:[] },
    '218b': { imp:2,
      kurz:'Sichert die **Indikationsregelung** (§ 218a Abs. 2, 3) ab: Ein **anderer** Arzt muss die Voraussetzungen vorab schriftlich feststellen. Bestraft werden der Abbruch ohne solche Feststellung und die wissentlich unrichtige Feststellung. Die Schwangere bleibt straflos.',
      tags:[['218a','Indikationen'],['218','Grundtatbestand'],['218c','Ärztl. Pflichten'],['219','Beratung']], rspr:[], lit:[] },
    '218c': { imp:2,
      kurz:'**Ärztliche Pflichtverletzungen** beim Abbruch: Keine Gelegenheit zur Darlegung der Gründe, keine ärztliche Beratung über Bedeutung des Eingriffs, keine Prüfung der Schwangerschaftsdauer, oder Abbruch nach Beratung im Fall der Beratungsregelung. Die Schwangere ist nicht strafbar.',
      tags:[['218a','Straflosigkeit'],['218','Grundtatbestand'],['219','Beratung'],['218b','Ärztl. Feststellung']], rspr:[], lit:[] },
    '219': { imp:3,
      kurz:'Regelt die **Beratung**: Sie dient dem Schutz des ungeborenen Lebens, erfolgt durch eine anerkannte Beratungsstelle und wird mit einer Bescheinigung abgeschlossen. Der abbrechende Arzt ist als Berater ausgeschlossen (Abs. 2 S. 3). Voraussetzung für die Straflosigkeit nach § 218a Abs. 1.',
      tags:[['218a','Straflosigkeit'],['218','Grundtatbestand'],['218c','Ärztl. Pflichten'],['219b','Mittel']],
      rspr:[ { court:'BVerfG', date:'28.5.1993', az:'2 BvF 2/90 u. a.', cite:'BVerfGE 88, 203', title:'Beratungskonzept', note:'Ausgestaltung der Beratungspflicht.' } ], lit:[] },
    '219b': { imp:1,
      kurz:'Strafbar ist das **Inverkehrbringen** von Mitteln oder Gegenständen, die zum Schwangerschaftsabbruch geeignet sind, **in der Absicht**, rechtswidrige Taten nach § 218 zu fördern. Die Schwangere bleibt straflos; die Mittel können eingezogen werden.',
      tags:[['218','Grundtatbestand'],['218a','Straflosigkeit'],['74','Einziehung']], rspr:[], lit:[] },
    '221': { imp:3,
      kurz:'**Aussetzung**: Zwei Tatvarianten – jemanden in eine hilflose Lage **versetzen** oder in hilfloser Lage **im Stich lassen** (mit Obhuts-/Beistandspflicht) – und dadurch in **konkrete Gefahr** des Todes oder einer schweren Gesundheitsschädigung bringen. Qualifikationen in Abs. 2 und Erfolgsqualifikation in Abs. 3 (Tod).',
      tags:[['212','Tötungsvorsatz'],['222','Fahrlässige Tötung'],['13','Garantenstellung'],['223','Körperverletzung'],['225','Schutzbefohlene'],['18','Erfolgsqualifikation']], rspr:[], lit:[] },
    '222': { imp:5,
      kurz:'**Fahrlässige Tötung** – der Klassiker unter den Fahrlässigkeitsdelikten. Prüfung: Erfolg (Tod), Kausalität, **objektive Sorgfaltspflichtverletzung**, objektive Vorhersehbarkeit, **Pflichtwidrigkeitszusammenhang** (hätte pflichtgemäßes Verhalten den Erfolg verhindert?), Rechtswidrigkeit, Schuld (subjektive Sorgfaltspflichtverletzung).',
      tags:[['212','Abgrenzung Vorsatz'],['229','Parallele KV'],['227','Erfolgsqualifikation'],['15','Fahrlässigkeit'],['13','Unterlassen'],['221','Aussetzung']],
      rspr:[ { court:'BGH', date:'25.9.1957', az:'4 StR 354/57', cite:'BGHSt 11, 1', title:'Radfahrer-Fall',
               note:'Pflichtwidrigkeitszusammenhang: Der Erfolg muss bei pflichtgemäßem Verhalten mit an Sicherheit grenzender Wahrscheinlichkeit vermieden worden sein.' } ], lit:[] },
    '223': { imp:5,
      kurz:'**Grundtatbestand** der Körperverletzung: Zwei Tathandlungen – **körperliche Misshandlung** oder **Gesundheitsschädigung**. Der Versuch ist strafbar. Verfolgung nur auf Antrag oder bei besonderem öffentlichem Interesse (§ 230). Zentral in jeder Klausur zu den Personendelikten.',
      tags:[['224','Gefährliche KV'],['226','Schwere KV'],['227','Todesfolge'],['228','Einwilligung'],['229','Fahrlässige KV'],['230','Strafantrag'],['32','Notwehr'],['22','Versuch']],
      rspr:[ { court:'BGH', date:'6.7.1990', az:'2 StR 549/89', cite:'BGHSt 37, 106', title:'Lederspray-Fall',
               note:'Kausalität und Garantenstellung bei Produktverantwortung (Rückrufpflicht) im Rahmen der Körperverletzungsdelikte.' } ], lit:[] },
    '224': { imp:5,
      kurz:'**Qualifikation** zu § 223 mit fünf Begehungsweisen: (1) **Gift**, (2) **Waffe/gefährliches Werkzeug**, (3) **hinterlistiger Überfall**, (4) **gemeinschaftlich**, (5) **lebensgefährdende Behandlung**. Strafrahmen 6 Monate bis 10 Jahre; in minder schweren Fällen 3 Monate bis 5 Jahre. Der Versuch ist strafbar.',
      tags:[['223','Grundtatbestand'],['225','Schutzbefohlene'],['226','Schwere KV'],['227','Todesfolge'],['228','Einwilligung'],['25','Mittäterschaft']], rspr:[], lit:[] },
    '225': { imp:3,
      kurz:'Besonderes Schutzverhältnis: Geschützt sind Personen **unter 18** oder **wehrlose Kranke/Gebrechliche**, die in einem Fürsorge-, Haus-, Gewalt- oder Dienstverhältnis zum Täter stehen. Tathandlungen: **quälen**, **roh misshandeln**, **böswillig vernachlässigen** (mit Gesundheitsschädigung).',
      tags:[['223','Grundtatbestand'],['224','Gefährliche KV'],['226','Schwere KV'],['227','Todesfolge'],['13','Garantenstellung']], rspr:[], lit:[] },
    '226': { imp:4,
      kurz:'**Erfolgsqualifikation**: Die Körperverletzung führt zu einer der schweren Folgen (Verlust von Sinnen/Fortpflanzungsfähigkeit, Verlust/Gebrauchsunfähigkeit eines wichtigen Gliedes, dauernde Entstellung, Siechtum, Lähmung, geistige Krankheit). Abs. 1 – mind. **Fahrlässigkeit** hinsichtlich der Folge (§ 18). Abs. 2 – **absichtlich/wissentlich**: mind. 3 Jahre.',
      tags:[['223','Grundtatbestand'],['224','Gefährliche KV'],['227','Todesfolge'],['18','Erfolgsqualifikation'],['228','Einwilligung']], rspr:[], lit:[] },
    '226a': { imp:2,
      kurz:'Eigener **Verbrechenstatbestand** gegen die Verstümmelung weiblicher Genitalien (Mindeststrafe 1 Jahr). Gegenüber § 226 spezieller; Einwilligung wirkt wegen § 228 regelmäßig nicht rechtfertigend.',
      tags:[['223','Grundtatbestand'],['226','Schwere KV'],['5','Auslandstaten']], rspr:[], lit:[] },
    '227': { imp:5,
      kurz:'**Erfolgsqualifikation**: Der Täter verursacht durch eine Körperverletzung (§§ 223–226a) den **Tod**. Prüfung: Grunddelikt (vollendet), Tod, Kausalität, **spezifischer Gefahrzusammenhang** (Tod muss sich aus der Körperverletzung ergeben), **wenigstens Fahrlässigkeit** bzgl. des Todes (§ 18). Streit: Handlungs- vs. Erfolgsbezug (Letalitätslehre).',
      tags:[['223','Grundtatbestand'],['224','Gefährliche KV'],['226','Schwere KV'],['18','Erfolgsqualifikation'],['222','Fahrlässige Tötung'],['212','Abgrenzung Vorsatz'],['231','Schlägerei']],
      rspr:[ { court:'BGH', date:'9.10.2002', az:'5 StR 42/02', cite:'BGHSt 48, 34', title:'Gubener Hetzjagd',
               note:'Gefahrzusammenhang bei § 227: Auch eine nicht den Körperverletzungserfolg, sondern die Körperverletzungshandlung betreffende Gefahr kann ausreichen (Handlungs-Gefahrzusammenhang).' } ], lit:[] },
    '228': { imp:5,
      kurz:'**Grenze der Einwilligung** bei Körperverletzung: Wirksame Einwilligung rechtfertigt – **es sei denn**, die Tat verstößt trotz Einwilligung gegen die **guten Sitten**. Maßstab: Art und Schwere der Verletzung und Lebensgefahr, nicht der Zweck (Sport, Arztbehandlung etc. regelmäßig unbedenklich).',
      tags:[['223','Grundtatbestand'],['224','Gefährliche KV'],['216','Tötung auf Verlangen'],['226a','Genitalverstümmelung'],['34','Notstand']],
      rspr:[ { court:'BGH', date:'26.5.2004', az:'2 StR 505/03', cite:'BGHSt 49, 166', title:'Fesselspiel-Fall',
               note:'Keine wirksame Einwilligung in ein lebensgefährliches Vorgehen (einvernehmliches Würgen mit Todesfolge): Die Tat verstößt trotz Einwilligung gegen die guten Sitten.' } ], lit:[] },
    '229': { imp:5,
      kurz:'**Fahrlässige Körperverletzung**: Prüfung wie bei § 222 (Sorgfaltspflichtverletzung, Vorhersehbarkeit, Pflichtwidrigkeitszusammenhang), aber mit Körperverletzungserfolg. Relatives Antragsdelikt (§ 230).',
      tags:[['222','Fahrlässige Tötung'],['223','Grundtatbestand'],['230','Strafantrag'],['15','Fahrlässigkeit'],['13','Unterlassen']], rspr:[], lit:[] },
    '230': { imp:3,
      kurz:'**Strafantragserfordernis** für §§ 223 und 229 (relative Antragsdelikte): Verfolgung nur auf Antrag, **es sei denn**, die Staatsanwaltschaft bejaht das **besondere öffentliche Interesse**. Antrag grundsätzlich binnen 3 Monaten nach Kenntnis (§ 77b). Bei Taten gegen Amtsträger auch Antrag des Dienstvorgesetzten.',
      tags:[['223','Körperverletzung'],['229','Fahrlässige KV'],['77','Antragsberechtigte'],['77b','Antragsfrist']], rspr:[], lit:[] },
    '231': { imp:3,
      kurz:'Strafbar ist bereits die **Beteiligung an einer Schlägerei oder einem Angriff mehrerer**, wenn dadurch der Tod oder eine schwere Körperverletzung (§ 226) verursacht wird. Der Eintritt der schweren Folge ist **objektive Bedingung der Strafbarkeit**. Straffrei bleibt, wem die Beteiligung nicht vorzuwerfen ist (z. B. Notwehr, Schlichten).',
      tags:[['223','Körperverletzung'],['224','Gefährliche KV'],['226','Schwere KV'],['227','Todesfolge']], rspr:[], lit:[] }
  },

  // Allgemeine Literatur (wird bei jeder Norm angezeigt) – Beispielliste, ohne Randnummern
  litGeneral: [
    { type:'Kommentar', title:'Leipziger Kommentar zum Strafgesetzbuch (LK)', cite:'De Gruyter', note:'Großkommentar für die wissenschaftlich vertiefte Praxis; ausführliche Nachweise zu Rspr. und Literatur.' },
    { type:'Kommentar', title:'Nomos Kommentar Strafgesetzbuch (NK-StGB)', cite:'Nomos', note:'Wissenschaftlicher Kommentar mit eigenständigen Positionen; häufig bei dogmatischen Streitfragen herangezogen.' },
    { type:'Kommentar', title:'BeckOK StGB', cite:'C. H. Beck (online)', note:'Online-Kommentar, laufend aktualisiert – nützlich für die tagesaktuelle Rechtsprechung.' },
    { type:'Kommentar', title:'Satzger/Schluckebier/Widmaier, StGB (SSW-StGB)', cite:'Carl Heymanns / Wolters Kluwer', note:'Praxiskommentar mit Schwerpunkt auf der Rechtsprechung.' },
    { type:'Kommentar', title:'Schönke/Schröder, Strafgesetzbuch', cite:'Beck', note:'Großkommentar, Standardwerk in Praxis und Wissenschaft.' },
    { type:'Kommentar', title:'Fischer, Strafgesetzbuch', cite:'Beck', note:'Kurzkommentar, stark rechtsprechungsorientiert.' },
    { type:'Kommentar', title:'Münchener Kommentar zum StGB', cite:'Beck', note:'Ausführlicher Kommentar mit wissenschaftlicher Tiefe.' },
    { type:'Kommentar', title:'Lackner/Kühl/Heger, Strafgesetzbuch', cite:'Beck', note:'Kompakter Kurzkommentar.' },
    { type:'Lehrbuch', title:'Rengier, Strafrecht Besonderer Teil II', cite:'Beck', note:'Delikte gegen die Person – Tötungs- und Körperverletzungsdelikte (Ausbildungsliteratur).' },
    { type:'Lehrbuch', title:'Wessels/Hettinger/Engländer, Strafrecht Besonderer Teil 1', cite:'C. F. Müller', note:'Straftaten gegen Persönlichkeits- und Gemeinschaftswerte (Ausbildungsliteratur).' },
    { type:'Lehrbuch', title:'Eisele, Strafrecht Besonderer Teil I', cite:'Kohlhammer', note:'Straftaten gegen die Person und die Allgemeinheit (Ausbildungsliteratur).' }
  ]
};

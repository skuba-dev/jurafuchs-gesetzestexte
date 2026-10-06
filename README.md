# Normfenster – Gesetzestexte verstehen

Browser-App, die den Umgang mit dem Gesetzestext am PC einfacher und interaktiver macht. Aktuell enthalten: **StGB, 16. und 17. Abschnitt (§§ 211–231)** als Beispieltext. Die App läuft komplett im Browser, ohne Server, ohne Konto und ohne Internetverbindung.

Das Design folgt dem Jurafuchs Design System (siehe [`DESIGN.md`](DESIGN.md)).

## Starten

1. Datei [`dist/jurafuchs-gesetzestexte.html`](dist/jurafuchs-gesetzestexte.html) herunterladen.
2. Per Doppelklick im Browser öffnen (Chrome, Edge oder Firefox).

Das ist alles. Nur die Links zu ZJS und Examensgerecht brauchen Internet.

## Was die App kann

**Oberfläche**
- **Mitte:** der Normtext, jeder Absatz einzeln. Ein Klick auf die Absatznummer kopiert das Zitat („§ 211 Abs. 2 StGB“).
- **Links:** Verlauf (zuletzt gelesene Norm oben), Lesezeichen und Lernstand.
- **Rechts:** alle Normen des aktuellen Abschnitts, mit Buttons zum vorherigen und folgenden Abschnitt.
- **Oben:** Einordnung im Gesetz, z. B. „Besonderer Teil › 16. Abschnitt › § 211 Mord“.
- **Unten:** Cross-Check-Tags mit Normen, die du bei dieser Vorschrift immer mitprüfst. Eigene Tags kannst du ergänzen.
- **Weiterscrollen:** Rechtsprechung, Literatur und eigene Notizen zur aktuellen Norm.

**Smart Cross References.** Verweise im Text („§ 218a Abs. 2“) sind klickbar und öffnen einen Splitscreen mit bis zu drei Normen im selben Tab. Wer lieber neue Browser-Tabs nutzt, stellt oben auf „Neuer Tab“ um. Strg+Klick öffnet immer einen neuen Tab. Beim Hovern über einen Verweis erscheint eine Vorschau der Zielnorm.

**Definitionen.** Gesetzlich besetzte Begriffe („Habgier“, „heimtückisch“, „Gift“ …) sind unterstrichen und zeigen beim Hovern ihre Lern-Definition, teils mit Teilbegriffen. Du kannst Text markieren und eine eigene Definition anlegen; sie erscheint dann korallefarben.

**Verlauf und Lernstand.** Die App merkt sich, was du gelesen hast, und öffnet beim nächsten Start die zuletzt gelesene Norm. Der Lernstand zeigt dir per Regelwerk (Prüfungsrelevanz × Verknüpfung mit oft gelesenen Normen × bisherige Verweildauer), welche wichtigen Normen dir noch fehlen. Das ist eine Heuristik, kein trainiertes Modell.

**Zwei Ansichten.** Oben rechts schaltest du zwischen **Studium** und **Praxis** um:

| | Studium | Praxis |
|---|---|---|
| Linker Bereich | Verlauf, Lesezeichen, Lernstand | Verlauf, Lesezeichen |
| Lernhilfen | „Kurz erklärt“, Begriffe, Prüfungsrelevanz | ausgeblendet |
| Fußnoten | zugeklappt | offen |
| Rechtsprechung | Leitentscheidungen | neueste zuerst |
| Literatur zuerst | ZJS-Aufsätze, Übungs- und Examensfälle | Kommentare, Anmerkungen |

Die Literatur lässt sich zusätzlich nach Kategorien filtern (Kommentare, Lehrbücher, Aufsätze und Anmerkungen, Übungs- und Examensfälle).

## Deine Daten

Verlauf, Lesezeichen, Notizen, eigene Definitionen und Einstellungen werden **nur lokal im Browser** gespeichert (je Browser und Dateispeicherort). Es gibt keinen Server und keine Übertragung. Über **Einstellungen → Daten exportieren und importieren** sicherst du sie als JSON-Datei oder überträgst sie auf ein anderes Gerät.

## Inhalte ändern

Alle Inhalte liegen als einfache JavaScript-Dateien in [`data/`](data):

| Datei | Inhalt |
|---|---|
| `stgb-text.js` | Gesetzestext (ein Block pro Zeile, Format am Dateianfang erklärt) |
| `stgb-meta.js` | Kurzerklärungen, Cross-Check-Tags, Prüfungsrelevanz, Rechtsprechung, Kommentare |
| `stgb-defs.js` | Lern-Definitionen je Norm |
| `stgb-lit.js` | ZJS-Beiträge mit Link und Kurzzusammenfassung |
| `stgb-faelle.js` | Examensgerecht-Fälle mit Link und Kurzzusammenfassung |

Zum Testen öffnest du `index.html` direkt im Browser. Die Einzeldatei baust du danach neu (Windows PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

Das Skript schreibt `dist/jurafuchs-gesetzestexte.html`, also die Datei, die du zum Starten benutzt.

## Projektstruktur

```
index.html          App-Gerüst
app.js              Logik (Parser, Navigation, Verweise, Definitionen, Lernstand)
tokens.css          Design-Tokens (1:1 aus DESIGN.md)
components.css      Basis-Komponenten des Design Systems
styles.css          App-Styles auf Basis der Tokens
data/               Gesetzestext und redaktionelle Inhalte
build.ps1           Baut die Einzeldatei in dist/
serve.ps1           Kleiner lokaler Webserver (optional)
DESIGN.md           Design-Vorgabe
```

## Wichtige Hinweise

- **Inhalte nicht ungeprüft nutzen.** Kurzerklärungen, Prüfungsrelevanz, Rechtsprechung und Kommentare sind Beispielinhalte und nicht redaktionell geprüft. Die Definitionen stammen aus eigenen Lernunterlagen.
- **Literaturhinweise** (ZJS, Examensgerecht) wurden am 5.10.2026 recherchiert. Titel, Autor:innen und Fundstellen sind an den Quellen geprüft, die Kurzzusammenfassungen sind eigene Formulierungen auf Basis von Einleitung, Leitsätzen und Gliederung. Die Beiträge selbst liegen bei den jeweiligen Anbietern.
- **Kein Dark Mode.** Das Design System definiert nur ein helles Theme.
- **Offen laut Design System:** Foxxy, Wortmarke und GT Walsheim Pro liegen nicht vor. Bis dahin greift der Fallback `Avenir Next → Segoe UI`.

## Technik

Reines HTML, CSS und JavaScript, keine Abhängigkeiten, kein Build-System. Der Gesetzestext wird beim Start aus dem Rohtext geparst.

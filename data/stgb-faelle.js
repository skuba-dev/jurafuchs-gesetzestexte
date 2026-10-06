/*
 * Examensfälle von Examensgerecht (examensgerecht.de) – Fallaufbereitung zu BGH- und OLG-Entscheidungen.
 * Recherchiert am 5.10.2026. Fundstellen anhand der Fallseiten geprüft (Seitentext bzw. Seitenmetadaten);
 * Zusammenfassungen sind eigene Formulierungen auf Basis der dortigen Zusammenfassungen/Leitsätze.
 * Die Fälle selbst (Sachverhalt, Gutachten, Zusatzfragen) stehen nur auf Examensgerecht – hier wird verlinkt.
 *
 * Hinweis zu zwei Seiten, deren Metadaten von den Seitentexten abweichen („Quarzsand“, „K.O. Tropfen“,
 * „um-sich-schlagender Täter“): Es gilt die im Seitentext genannte Entscheidung.
 */
(function () {
  const L = 'Fall auf Examensgerecht lesen ↗';
  const eg = (key, title, issue, authors, url, norms, summary) =>
    ({ key, src: 'Examensgerecht', kind: 'Examensfall', title, issue, pages: '', authors, url, norms, summary, linkLabel: L });
  const U = s => 'https://examensgerecht.de/' + s + '/';

  window.STGB_META.articles = window.STGB_META.articles.concat([

    /* ------------------------------------------------ Mord / Totschlag */
    eg('eg_leid', 'Das Leid der Welt sollst du nicht ertragen',
      'BGH, Urt. v. 19.6.2019 – 5 StR 128/19 (NJW 2019, 2413)', 'Antonia Cohrs', U('das-leid-der-welt-sollst-du-nicht-ertragen'),
      ['211', '212'],
      'Ein Mann erschlägt seine schlafende Frau mit Hammerschlägen, um sie vor einer aussichtslosen finanziellen Lage zu „bewahren“; sein geplanter Suizid scheitert. Der BGH rückt von der „feindlichen Willensrichtung“ als Zusatzmerkmal der Heimtücke ab: Heimtückisch handelt, wer die Arg- und Wehrlosigkeit bewusst ausnutzt. Ausnahmen gelten nur, wenn das Opfer einverstanden oder zu autonomer Entscheidung nicht fähig ist; besondere Umstände und Motive wirken sich über die Rechtsfolgenlösung (§ 49 Abs. 1 analog) aus. Aktualisiert damit die ältere Darstellung bei Kaspar/Broichmann (ZJS 4/2013).'),
    eg('eg_fallensteller', 'Der heimtückische Fallensteller',
      'BGH, Beschl. v. 26.3.2020 – 4 StR 134/19 (NStZ 2020, 609)', 'Moritz Stamme', U('der-heimtueckische-fallensteller'),
      ['211'],
      'Ein Täter lockt einen wohlhabenden Mann in eine Falle, erpresst ihn und tötet ihn. Heimtücke liegt auch dann vor, wenn die durch die Arglosigkeit herbeigeführte Wehrlosigkeit tatplangemäß zunächst für einen Raub oder eine räuberische Erpressung ausgenutzt wird. Verdeckungsmord ist möglich, obwohl die Tötung schon bei der Vortat geplant war, sofern Vortat und Tötung ein zweiaktiges Geschehen bilden.'),
    eg('eg_klein', 'Hoffnungslos und einsam in der Fremde',
      'BGH, Beschl. v. 12.7.2023 – 6 StR 231/23 (NStZ 2023, 675)', 'Moritz Stamme', U('hoffnungslos-und-einsam-in-der-fremde'),
      ['211', '212'],
      'Eine überforderte Mutter tötet ihr drei Monate altes Kind mit Messerstichen. Heimtücke bei Kleinkindern: Ein Kleinkind ist nicht argwohnsfähig, es kommt auf die Arg- und Wehrlosigkeit eines schutzbereiten Dritten an. Daran fehlt es, wenn dieser den Angriff wegen der räumlichen Entfernung nicht wahrnehmen kann und Gegenwehr zu spät käme – hier liegt dann Totschlag statt Mord nahe.'),
    eg('eg_unterlassen', 'Mord durch Unterlassen: Garantenstellung für strafmündige Minderjährige',
      'BGH, Urt. v. 7.10.2025 – 3 StR 11/25 (BeckRS 2025, 34352)', 'Shanna Kubaric', U('mord-durch-unterlassen-garantenstellung-minderjaehrige-bgh'),
      ['211', '212'],
      'Ein Jugendlicher erschlägt mit einem Freund einen Mann im Schlaf; die Mutter greift nicht ein. Die Garantenstellung sorgeberechtigter Eltern endet nicht mit der Strafmündigkeit des Kindes. Welche Maßnahmen geboten und zumutbar sind, hängt von Alter, Eigenart und Lebensumständen des Minderjährigen ab – vor allem davon, ob konkrete Anhaltspunkte für strafbares Verhalten bestehen. Weitere Themen: Heimtücke und Mittäterschaft.'),
    eg('eg_quarz', 'Quarzsand- statt Samthandschuhe',
      'angelehnt an BGH, Urt. v. 18.12.2024 – 2 StR 297/24 (BeckRS 2024, 45803)', 'Shanna Kubaric', U('quarzsand-statt-samthandschuhe'),
      ['212'],
      'Drei Männer schlagen einen Behördenmitarbeiter mehrfach mit verstärkten Quarzsandhandschuhen ins Gesicht. Bei besonders gefährlichen Gewalthandlungen dieser Art ist ein bedingter Tötungsvorsatz ernsthaft zu erwägen – dass das Opfer überlebt, schließt ihn nicht aus. Der Fall führt außerdem durch Versuch, Mittäterschaft und Rücktritt.'),
    eg('eg_platz', 'Platz da, hier fahre ich!',
      'BGH, Urt. v. 28.8.2025 – 4 StR 476/24', '', U('platz-da-hier-fahre-ichich-kann-es-zahlen'),
      ['212'],
      'Eine Autofahrerin „maßregelt“ einen anderen Fahrer durch aggressives Fahren; es kommt zur Kollision mit tödlichen Folgen, und sie entfernt sich ohne Rettungsmaßnahmen. Aggressives Fahrverhalten begründet nicht automatisch bedingten Tötungsvorsatz; ein erst nach dem Unfall gefasster Vorsatz ist aber möglich und kann zu einem versuchten Totschlag durch Unterlassen führen.'),
    eg('eg_manip', 'Manipulation mit tödlicher Aussicht',
      'BGH, Beschl. v. 25.10.2023 – 4 StR 81/23 (BeckRS 2023, 47800)', 'Moritz Stamme', U('bgh-4-str-81-23-mittelbare-taeterschaft-bei-suizid'),
      ['212', '216'],
      'Ein Mann isoliert einen depressiven Freund und setzt ihn über Stunden massiv unter Druck, sich das Leben zu nehmen; der Freund verletzt sich schwer, überlebt aber. Versuchter Totschlag in mittelbarer Täterschaft setzt voraus, dass der Suizident nicht freiverantwortlich handelt (z. B. durch Zwang, Täuschung oder unzulässige Einflussnahme) und der Täter objektive Tatherrschaft hat. Ein Rücktritt scheidet aus, wenn die Rettung nur der Verschleierung dient.'),
    eg('eg_mensch', 'Menschwerdung',
      'BGH, Beschl. v. 11.11.2020 – 5 StR 256/20 (NJW 2021, 645)', 'Maximilian Nussbaum', U('menschwerdung'),
      ['218', '212', '211'],
      'Die Grenze zwischen dem Schutz der §§ 218 ff. und der Tötungsdelikte (§§ 211 ff.) markiert der Beginn – nicht die Vollendung – des Geburtsvorgangs: bei natürlicher Geburt die Eröffnungswehen, beim Kaiserschnitt die Öffnung des Uterus mit dem Ziel, die Schwangerschaft zu beenden. Fall: Eine Ärztin tötet bei einem Kaiserschnitt einen der Zwillinge. Geprüft werden Totschlag und ein Rechtfertigungsgrund (§ 34).'),

    /* ------------------------------------------------ Tötung auf Verlangen / Suizid */
    eg('eg_aerzte', 'Ärztliche Suizidbeihilfe',
      'BGH, Urt. v. 3.7.2019 – 5 StR 393/18 (NJW 2019, 3089)', 'Antonia Cohrs', U('aerztliche-suizidbeihilfe'),
      ['216', '217'],
      'Eine Hausärztin überlässt einer langjährig suizidwilligen Patientin tödliche Medikamente und begleitet die Sterbende. Eine Garantenstellung besteht nicht, wenn der Arzt den Suizid in Absprache mit dem Suizidenten nur begleitet und das Unterlassen von Rettungsmaßnahmen dessen Willen entspricht (Selbstbestimmungsrecht). Die Einnahme der Medikamente wird dem Arzt nicht zugerechnet, solange der Suizident die Herrschaft über das Geschehen behält; auch § 323c scheidet aus.'),
    eg('eg_insulin', 'Insulin',
      'BGH, Beschl. v. 28.6.2022 – 6 StR 68/21 (NJW 2022, 3021)', 'Maximilian Nussbaum', U('insulin'),
      ['216'],
      'Eine Krankenschwester spritzt ihrem sterbewilligen Mann auf dessen Bitte Insulin. Die Abgrenzung von strafbarer Tötung auf Verlangen und strafloser Beihilfe zum Suizid richtet sich nach der Herrschaft über den letzten lebensbeendenden Akt; eine „normative Gesamtbetrachtung“ zur Begründung freiverantwortlicher Selbsttötung ist dogmatisch fragwürdig. Hilfsweise wird eine Unterlassungsstrafbarkeit (§§ 216, 13; § 221; § 323c) geprüft und verneint.'),
    eg('eg_pervers', 'Perverser Suizidhelfer',
      'BGH, Urt. v. 4.7.2018 – 2 StR 245/17 (NJW 2019, 449)', 'Maximilian Nussbaum', U('perverser-suizidhelfer'),
      ['216', '211', '212'],
      'Ein sexuell-sadistischer Mann manipuliert eine psychisch kranke Frau online und plant ihre „Hinrichtung“ durch Erhängen. Die Privilegierung des § 216 greift nur, wenn das Verlangen des Opfers auch für den Täter handlungsleitend ist. Ein Sich-Bereiterklären zum Mord (§ 30 Abs. 2 Var. 1) kann auch vorliegen, wenn das potenzielle Opfer Adressat der Erklärung ist; die Literatur plädiert für eine restriktive Auslegung.'),
    eg('eg_liebe', 'Brennende Liebe',
      'BGH, Beschl. v. 27.5.2020 – 1 StR 118/20 (NJW 2020, 2971)', '', U('brennende-liebe'),
      ['216'],
      'Ein Paar will gemeinsam aus dem Leben scheiden; der Mann zündet das Wohnmobil an, rettet aber im letzten Moment seine Partnerin. Schwerpunkt ist die Brandstiftung (§§ 306a, 306b) und die Frage, ob die tätige Reue des § 306e analog auch greift, wenn die Gefahr nicht durch Löschen, sondern durch Rettung der Person abgewendet wird; § 216 und §§ 223, 224 sind Nebenprobleme.'),

    /* ------------------------------------------------ Aussetzung / fahrlässige Tötung */
    eg('eg_flut', 'Der Flutkanal',
      'BGH, Urt. v. 21.9.2022 – 6 StR 47/22 (NStZ 2023, 98)', 'Antonia Cohrs', U('der-flutkanal'),
      ['221', '212'],
      'Eine Freundesgruppe begleitet einen hilflos Betrunkenen; er stürzt eine Böschung hinab und ertrinkt in einem Flutkanal. Eine Garantenstellung entsteht nicht schon durch geleisteten Beistand, sondern erst, wenn der Helfende die Lage des Hilfsbedürftigen wesentlich verändert (z. B. Rettungsmöglichkeiten ausschließt oder neue Gefahren schafft). Die bloße Gruppenzugehörigkeit begründet keine gegenseitige Hilfspflicht. Vgl. auch die ZJS-Besprechung von Woring (ZJS 3/2023).'),
    eg('eg_klasse', 'Die tödliche Klassenfahrt',
      'LG Mönchengladbach, Urt. v. 15.2.2024 – 23 KLs 6/23 (BeckRS 2024, 1971)', 'Moritz Stamme', U('die-todliche-klassenfahrt'),
      ['222'],
      'Eine Lehrerin fragt vor einer Klassenfahrt nach London die Vorerkrankungen nicht ab; eine Schülerin mit Diabetes stirbt. Lehrkräfte müssen bei Auslandsfahrten den sichersten Weg wählen und Vorerkrankungen schriftlich abfragen; das Unterlassen begründet fahrlässige Tötung durch Unterlassen (§§ 222, 13). Zusätzlich: Eine nur teilweise im Inland begangene Tat ist eine Inlandstat.'),

    /* ------------------------------------------------ Körperverletzung */
    eg('eg_zahn', 'Die Zahnextraktionszange',
      'OLG Karlsruhe, Beschl. v. 16.3.2022 – 1 Ws 47/22 (BeckRS 2022, 6691)', 'Maximilian Nussbaum', U('die-zahnextraktionszange'),
      ['223', '224'],
      'Eine Zahnärztin redet einem Patienten eine medizinisch nicht erforderliche Extraktion ein, um eine teure Prothetik anzubieten. Die Einwilligung ist wegen des Willensmangels über die Indikation unwirksam. Im Streit steht, ob ein bestimmungsgemäß eingesetztes ärztliches Instrument ein „gefährliches Werkzeug“ ist: Die Falllösung lehnt einen dogmatischen Sonderweg ab und bejaht § 224 Abs. 1 Nr. 2, jedenfalls wenn es zu erheblichen Verletzungen kommt. Daneben: Heileingriff – Tatbestands- oder Einwilligungslösung.'),
    eg('eg_ko', 'K.O. Tropfen im Drink',
      'BGH, Beschl. v. 8.10.2024 – 5 StR 382/24 (NJW 2024, 3735)', 'Antonia Cohrs', U('k-o-tropfen-im-drink'),
      ['224'],
      'Ein Mann mischt seiner Verlobten und deren Freundin heimlich K.O.-Tropfen in ein Getränk. Flüssigkeiten sind nach allgemeinem Sprachgebrauch keine „Werkzeuge“ – die Wortlautgrenze (Art. 103 Abs. 2 GG) verbietet eine erweiternde Auslegung, auch die Pipette zur Dosierung genügt nicht. Die Strafbarkeit beurteilt sich stattdessen nach den übrigen Varianten des § 224 (u. a. „andere gesundheitsschädliche Stoffe“).'),
    eg('eg_boxer', 'Gedopter Boxer',
      'OLG Köln, Beschl. v. 4.4.2019 – 2 Ws 122/19 (JR 2020, 322)', 'Maximilian Nussbaum', U('gedopter-boxer-2'),
      ['223', '224', '228'],
      'Ein Profiboxer gewinnt einen Kampf unter Dopingeinfluss, von dem der Gegner nichts wusste. Straflosigkeit im Kampfsport folgt nach (noch) h. M. nicht aus dem Tatbestand, sondern aus einer rechtfertigenden Einwilligung; § 228 markiert deren Grenze (Sittenwidrigkeit orientiert sich an der konkreten Gefährlichkeit). Diskutiert wird, ob der Irrtum über das Doping ein beachtlicher Willensmangel ist und ob Boxhandschuhe „gefährliche Werkzeuge“ sein können.'),
    eg('eg_umsich', 'Der um-sich-schlagende Täter',
      'BayObLG, Beschl. v. 24.7.2020 – 205 StRR 216/20 (NStZ 2020, 736); vgl. BGH, Urt. v. 14.1.2021 – 4 StR 95/20 (NJW 2021, 795)', 'Antonia Cohrs', U('der-um-sich-schlagende-taeter'),
      ['223', '224'],
      'Der Täter schlägt mit einem Hammer in Richtung zweier nebeneinander stehender Personen und nimmt in Kauf, dass beide getroffen werden; verletzt wird nur eine. Alternativvorsatz: Rechnet der Täter nur mit einem von mehreren möglichen Erfolgen, nimmt die h. M. Vorsatz für alle in Betracht kommenden Delikte an; Wertungswidersprüche werden auf Konkurrenzebene gelöst.'),
    eg('eg_pfleger', 'Der verantwortungsvolle Pfleger',
      'BGH, Beschl. v. 26.5.2020 – 2 StR 434/19 (NStZ 2021, 164)', 'Maximilian Nussbaum', U('der-verantwortungsvolle-pfleger'),
      ['223', '224', '228', '216'],
      'Ein Altenpfleger gibt einem sterbenden Krebspatienten entgegen der ärztlichen Anordnung die doppelte Morphindosis. Für die Einwilligung (hier: mutmaßliche) kommt es nicht darauf an, ob Arzt oder Pfleger handelt; eine Überschreitung der Verordnung kann gedeckt sein, wenn sie noch medizinisch vertretbar ist. Das schmerzfreie Sterben ist ein anerkennenswerter Zweck, sodass trotz Lebensgefahr keine Sittenwidrigkeit nach § 228 vorliegt (indirekte Sterbehilfe).'),
    eg('eg_jva', 'Prügelei in der JVA',
      'BGH, Beschl. v. 26.1.2021 – 1 StR 463/20 (BeckRS 2021, 794)', '', U('pruegelei-in-der-jva'),
      ['228', '223', '224', '227'],
      'Zwei Häftlinge vereinbaren eine Prügelei; ein Faustschlag führt zum Tod. In eine Körperverletzung kann trotz § 228 eingewilligt werden, solange schwere oder tödliche Verletzungen nicht zu erwarten sind. Die abstrakte Eskalationsgefahr unter vielen Gefangenen macht die Vereinbarung nicht allein sittenwidrig. Außerdem: Eine vollendete Qualifikationsvariante verdrängt den Versuch einer weiteren Variante derselben Tat.'),
    eg('eg_tattoo', 'Gesichtstattoo wider Willen',
      'BGH, Urt. v. 10.4.2025 – 4 StR 495/24; BGH, Beschl. v. 7.1.2025 – 6 StR 481/24', '', U('gesichtstattoo'),
      ['224', '226'],
      'Ein Täter tätowiert einem anderen ohne Einwilligung ein Wort ins Gesicht (Entstellung, § 226 Abs. 1 Nr. 3); in einer Abwandlung wird mit einer vorgehaltenen Pistole gedroht. „Mittels“ einer Waffe (§ 224 Abs. 1 Nr. 2) erfolgt die Körperverletzung nicht, wenn die Waffe nur zur Verstärkung der Drohung dient und nicht unmittelbar auf den Körper einwirkt. „Gemeinschaftlich“ (Nr. 4) fehlt, wenn jeder Täter nur einem anderen Opfer gegenübertritt.'),
    eg('eg_op', 'Operationsverweigerer',
      'BGH, Urt. v. 7.2.2017 – 5 StR 483/16 (NJW 2017, 1763)', '', U('operationsverweigerer'),
      ['226', '224'],
      'Nach einem Messerangriff lehnt das Opfer zumutbare Nachbehandlungen ab, die Hand bleibt dauerhaft beeinträchtigt. Es stellt sich die Frage, ob der gefahrspezifische Zusammenhang zur schweren Folge des § 226 besteht: Die Rechtsprechung will das Opferverhalten grundsätzlich unberücksichtigt lassen, die h. L. wendet die Zurechnungsgrundsätze an und verneint ihn bei zumutbarer Nachbehandlung.'),
    eg('eg_verw', 'Folgenschwere Verwechslung',
      'BGH, Beschl. v. 17.4.2024 – 1 StR 403/23 (NStZ 2024, 611)', '', U('folgenschwere-verwechslung'),
      ['226'],
      'Eine Ärztin sterilisiert wegen einer Verwechslung den falschen Patienten und leitet danach eine Refertilisierung ein. „Längere Dauer“ der schweren Folge des § 226 Abs. 1 verlangt keine Dauerhaftigkeit. Für die Freiwilligkeit des Rücktritts zählt der Rücktrittshorizont nach der letzten Ausführungshandlung, nicht die ursprüngliche Tatplanperspektive; ein erkannter error in persona schließt den Rücktritt nicht automatisch aus. Vgl. dazu die ZJS-Besprechung von Zieschang (ZJS 4/2024).'),

    /* ------------------------------------------------ Erfolgsqualifikation / Schlägerei */
    eg('eg_macht', 'Die Macht der Wahrnehmung',
      'BGH, Urt. v. 7.8.2024 – 1 StR 430/23 (BeckRS 2024, 23365)', '', U('die-macht-der-wahrnehmung'),
      ['227', '231', '224'],
      'Eine Gruppe überfällt ein aussteigendes Mitglied; einer sticht ihn mit einem Messer nieder, die anderen schlagen mit Fäusten bzw. einem Schlagstock zu. Mittäter können nach § 227 haften, wenn der Tod aus einem Exzess folgt – aber nur, wenn die spezifische Todesgefahr schon in den gemeinsam verübten Gewalthandlungen angelegt war. Für Beteiligte, die vom Messer nichts wussten, bleibt es bei § 224 und § 231. Zusatzfragen: Beweisantrag (Polygraph) und § 224 Abs. 1 Nr. 4 bei nur einem Täter am Tatort.')
  ]);
})();

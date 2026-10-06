/*
 * Rohtext StGB §§ 211–231 (Beispiel-Gesetzestext).
 * Format (wird von app.js geparst):
 *   "<Ordnungszahl> Abschnitt" + nächste Zeile = Abschnittstitel
 *   "§ 211 Titel"              = Beginn einer Norm   ("§§ 214 und 215 (weggefallen)" erlaubt)
 *   "(1) …"                    = Absatz
 *   "1. …"                     = Nummer
 *   "> …"                      = eingerückte Gruppe (z. B. Mordmerkmale-Gruppen)
 *   sonstige Zeile             = Fließtext / Satzfortsetzung
 *   "Fußnote" + Zeilen "§ x: …"= Fußnoten der Norm
 * Jede Zeile = ein Block (Zeilenumbrüche der Vorlage sind bereits aufgelöst).
 */
window.RAW_STGB = `Sechzehnter Abschnitt
Straftaten gegen das Leben
§ 211 Mord
(1) Der Mörder wird mit lebenslanger Freiheitsstrafe bestraft.
(2) Mörder ist, wer
> aus Mordlust, zur Befriedigung des Geschlechtstriebs, aus Habgier oder sonst aus niedrigen Beweggründen,
> heimtückisch oder grausam oder mit gemeingefährlichen Mitteln oder
> um eine andere Straftat zu ermöglichen oder zu verdecken,
einen Menschen tötet.
Fußnote
§ 211: Nach Maßgabe der Entscheidungsgründe mit dem GG vereinbar, BVerfGE v. 21.6.1977 I 1236 - 1 BvL 14/76 -
§ 212 Totschlag
(1) Wer einen Menschen tötet, ohne Mörder zu sein, wird als Totschläger mit Freiheitsstrafe nicht unter fünf Jahren bestraft.
(2) In besonders schweren Fällen ist auf lebenslange Freiheitsstrafe zu erkennen.
§ 213 Minder schwerer Fall des Totschlags
War der Totschläger ohne eigene Schuld durch eine ihm oder einem Angehörigen zugefügte Mißhandlung oder schwere Beleidigung von dem getöteten Menschen zum Zorn gereizt und hierdurch auf der Stelle zur Tat hingerissen worden oder liegt sonst ein minder schwerer Fall vor, so ist die Strafe Freiheitsstrafe von einem Jahr bis zu zehn Jahren.
§§ 214 und 215 (weggefallen)
§ 216 Tötung auf Verlangen
(1) Ist jemand durch das ausdrückliche und ernstliche Verlangen des Getöteten zur Tötung bestimmt worden, so ist auf Freiheitsstrafe von sechs Monaten bis zu fünf Jahren zu erkennen.
(2) Der Versuch ist strafbar.
§ 217 Geschäftsmäßige Förderung der Selbsttötung
(1) Wer in der Absicht, die Selbsttötung eines anderen zu fördern, diesem hierzu geschäftsmäßig die Gelegenheit gewährt, verschafft oder vermittelt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
(2) Als Teilnehmer bleibt straffrei, wer selbst nicht geschäftsmäßig handelt und entweder Angehöriger des in Absatz 1 genannten anderen ist oder diesem nahesteht.
Fußnote
§ 217: IdF d. Art. 1 Nr. 2 G v. 3.12.2015 I 2177 mWv 10.12.2015; nach Maßgabe der Entscheidungsformel mit GG unvereinbar und nichtig gem. BVerfGE v. 26.2.2020 I 525 - 2 BvR 2347/15 u.a. -
§ 218 Schwangerschaftsabbruch
(1) Wer eine Schwangerschaft abbricht, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft. Handlungen, deren Wirkung vor Abschluß der Einnistung des befruchteten Eies in der Gebärmutter eintritt, gelten nicht als Schwangerschaftsabbruch im Sinne dieses Gesetzes.
(2) In besonders schweren Fällen ist die Strafe Freiheitsstrafe von sechs Monaten bis zu fünf Jahren. Ein besonders schwerer Fall liegt in der Regel vor, wenn der Täter
1. gegen den Willen der Schwangeren handelt oder
2. leichtfertig die Gefahr des Todes oder einer schweren Gesundheitsschädigung der Schwangeren verursacht.
(3) Begeht die Schwangere die Tat, so ist die Strafe Freiheitsstrafe bis zu einem Jahr oder Geldstrafe.
(4) Der Versuch ist strafbar. Die Schwangere wird nicht wegen Versuchs bestraft.
Fußnote
§§ 218 bis 219b (früher §§ 218 bis 219d): IdF d. Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 218: Anwendbar ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 I 820 - 2 BvF 2/90 u. a. -
§ 218a Straflosigkeit des Schwangerschaftsabbruchs
(1) Der Tatbestand des § 218 ist nicht verwirklicht, wenn
1. die Schwangere den Schwangerschaftsabbruch verlangt und dem Arzt durch eine Bescheinigung nach § 219 Abs. 2 Satz 2 nachgewiesen hat, daß sie sich mindestens drei Tage vor dem Eingriff hat beraten lassen,
2. der Schwangerschaftsabbruch von einem Arzt vorgenommen wird und
3. seit der Empfängnis nicht mehr als zwölf Wochen vergangen sind.
(2) Der mit Einwilligung der Schwangeren von einem Arzt vorgenommene Schwangerschaftsabbruch ist nicht rechtswidrig, wenn der Abbruch der Schwangerschaft unter Berücksichtigung der gegenwärtigen und zukünftigen Lebensverhältnisse der Schwangeren nach ärztlicher Erkenntnis angezeigt ist, um eine Gefahr für das Leben oder die Gefahr einer schwerwiegenden Beeinträchtigung des körperlichen oder seelischen Gesundheitszustandes der Schwangeren abzuwenden, und die Gefahr nicht auf eine andere für sie zumutbare Weise abgewendet werden kann.
(3) Die Voraussetzungen des Absatzes 2 gelten bei einem Schwangerschaftsabbruch, der mit Einwilligung der Schwangeren von einem Arzt vorgenommen wird, auch als erfüllt, wenn nach ärztlicher Erkenntnis an der Schwangeren eine rechtswidrige Tat nach den §§ 176 bis 178 des Strafgesetzbuches begangen worden ist, dringende Gründe für die Annahme sprechen, daß die Schwangerschaft auf der Tat beruht, und seit der Empfängnis nicht mehr als zwölf Wochen vergangen sind.
(4) Die Schwangere ist nicht nach § 218 strafbar, wenn der Schwangerschaftsabbruch nach Beratung (§ 219) von einem Arzt vorgenommen worden ist und seit der Empfängnis nicht mehr als zweiundzwanzig Wochen verstrichen sind. Das Gericht kann von Strafe nach § 218 absehen, wenn die Schwangere sich zur Zeit des Eingriffs in besonderer Bedrängnis befunden hat.
Fußnote
§§ 218 bis 219b (früher §§ 218 bis 219d): IdF d. Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 218a Abs. 4: Anwendbar ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 - 2 BvF 2/90 u. a. -
§ 218b Schwangerschaftsabbruch ohne ärztliche Feststellung; unrichtige ärztliche Feststellung
(1) Wer in den Fällen des § 218a Abs. 2 oder 3 eine Schwangerschaft abbricht, ohne daß ihm die schriftliche Feststellung eines Arztes, der nicht selbst den Schwangerschaftsabbruch vornimmt, darüber vorgelegen hat, ob die Voraussetzungen des § 218a Abs. 2 oder 3 gegeben sind, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft, wenn die Tat nicht in § 218 mit Strafe bedroht ist. Wer als Arzt wider besseres Wissen eine unrichtige Feststellung über die Voraussetzungen des § 218a Abs. 2 oder 3 zur Vorlage nach Satz 1 trifft, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft, wenn die Tat nicht in § 218 mit Strafe bedroht ist. Die Schwangere ist nicht nach Satz 1 oder 2 strafbar.
(2) Ein Arzt darf Feststellungen nach § 218a Abs. 2 oder 3 nicht treffen, wenn ihm die zuständige Stelle dies untersagt hat, weil er wegen einer rechtswidrigen Tat nach Absatz 1, den §§ 218 oder 219b oder wegen einer anderen rechtswidrigen Tat, die er im Zusammenhang mit einem Schwangerschaftsabbruch begangen hat, rechtskräftig verurteilt worden ist. Die zuständige Stelle kann einem Arzt vorläufig untersagen, Feststellungen nach § 218a Abs. 2 und 3 zu treffen, wenn gegen ihn wegen des Verdachts einer der in Satz 1 bezeichneten rechtswidrigen Taten das Hauptverfahren eröffnet worden ist.
Fußnote
§§ 218 bis 219b (früher §§ 218 bis 219d): IdF d. Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 218b: Anwendbar ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 - 2 BvF 2/90 u. a. -
§ 218c Ärztliche Pflichtverletzung bei einem Schwangerschaftsabbruch
(1) Wer eine Schwangerschaft abbricht,
1. ohne der Frau Gelegenheit gegeben zu haben, ihm die Gründe für ihr Verlangen nach Abbruch der Schwangerschaft darzulegen,
2. ohne die Schwangere über die Bedeutung des Eingriffs, insbesondere über Ablauf, Folgen, Risiken, mögliche physische und psychische Auswirkungen ärztlich beraten zu haben,
3. ohne sich zuvor in den Fällen des § 218a Abs. 1 und 3 auf Grund ärztlicher Untersuchung von der Dauer der Schwangerschaft überzeugt zu haben oder
4. obwohl er die Frau in einem Fall des § 218a Abs. 1 nach § 219 beraten hat,
wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft, wenn die Tat nicht in § 218 mit Strafe bedroht ist.
(2) Die Schwangere ist nicht nach Absatz 1 strafbar.
§ 219 Beratung der Schwangeren in einer Not- und Konfliktlage
(1) Die Beratung dient dem Schutz des ungeborenen Lebens. Sie hat sich von dem Bemühen leiten zu lassen, die Frau zur Fortsetzung der Schwangerschaft zu ermutigen und ihr Perspektiven für ein Leben mit dem Kind zu eröffnen; sie soll ihr helfen, eine verantwortliche und gewissenhafte Entscheidung zu treffen. Dabei muß der Frau bewußt sein, daß das Ungeborene in jedem Stadium der Schwangerschaft auch ihr gegenüber ein eigenes Recht auf Leben hat und daß deshalb nach der Rechtsordnung ein Schwangerschaftsabbruch nur in Ausnahmesituationen in Betracht kommen kann, wenn der Frau durch das Austragen des Kindes eine Belastung erwächst, die so schwer und außergewöhnlich ist, daß sie die zumutbare Opfergrenze übersteigt. Die Beratung soll durch Rat und Hilfe dazu beitragen, die in Zusammenhang mit der Schwangerschaft bestehende Konfliktlage zu bewältigen und einer Notlage abzuhelfen. Das Nähere regelt das Schwangerschaftskonfliktgesetz.
(2) Die Beratung hat nach dem Schwangerschaftskonfliktgesetz durch eine anerkannte Schwangerschaftskonfliktberatungsstelle zu erfolgen. Die Beratungsstelle hat der Schwangeren nach Abschluß der Beratung hierüber eine mit dem Datum des letzten Beratungsgesprächs und dem Namen der Schwangeren versehene Bescheinigung nach Maßgabe des Schwangerschaftskonfliktgesetzes auszustellen. Der Arzt, der den Abbruch der Schwangerschaft vornimmt, ist als Berater ausgeschlossen.
§ 219a (weggefallen)
§ 219b Inverkehrbringen von Mitteln zum Abbruch der Schwangerschaft
(1) Wer in der Absicht, rechtswidrige Taten nach § 218 zu fördern, Mittel oder Gegenstände, die zum Schwangerschaftsabbruch geeignet sind, in den Verkehr bringt, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.
(2) Die Teilnahme der Frau, die den Abbruch ihrer Schwangerschaft vorbereitet, ist nicht nach Absatz 1 strafbar.
(3) Mittel oder Gegenstände, auf die sich die Tat bezieht, können eingezogen werden.
Fußnote
§§ 218 bis 219b (früher §§ 218 bis 219d): IdF d. Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 219b: Anwendbar ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 - 2 BvF 2/90 u. a. -
§ 219c (weggefallen)
Fußnote
§ 219c: Aufgeh. durch Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 219c: Aufhebung wirksam ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 - 2 BvF 2/90 u. a. -
§ 219d (weggefallen)
Fußnote
§ 219d: Aufgeh. durch Art. 13 Nr. 1 G v. 27.7.1992 I 1398 mWv 5.8.1992; Art. 13 Nr. 1 trat einstweilen nicht in Kraft gem. BVerfGE v. 4.8.1992 I 1585 - 2 BvQ 16/92 u. a. -; die einstweilige Anordnung v. 4.8.1992 wurde nach BVerfGE v. 25.1.1993 I 270 wiederholt.
§ 219d: Aufhebung wirksam ab 16.6.1993 gem. Abschn. II Nr. 1 nach Maßgabe der Nr. 2 bis 9 der Entscheidungsformel gem. BVerfGE v. 28.5.1993 - 2 BvF 2/90 u. a. -
§ 220 (weggefallen)
§ 220a (weggefallen)
§ 221 Aussetzung
(1) Wer einen Menschen
1. in eine hilflose Lage versetzt oder
2. in einer hilflosen Lage im Stich läßt, obwohl er ihn in seiner Obhut hat oder ihm sonst beizustehen verpflichtet ist,
und ihn dadurch der Gefahr des Todes oder einer schweren Gesundheitsschädigung aussetzt, wird mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft.
(2) Auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren ist zu erkennen, wenn der Täter
1. die Tat gegen sein Kind oder eine Person begeht, die ihm zur Erziehung oder zur Betreuung in der Lebensführung anvertraut ist, oder
2. durch die Tat eine schwere Gesundheitsschädigung des Opfers verursacht.
(3) Verursacht der Täter durch die Tat den Tod des Opfers, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren.
(4) In minder schweren Fällen des Absatzes 2 ist auf Freiheitsstrafe von sechs Monaten bis zu fünf Jahren, in minder schweren Fällen des Absatzes 3 auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren zu erkennen.
§ 222 Fahrlässige Tötung
Wer durch Fahrlässigkeit den Tod eines Menschen verursacht, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft.
Siebzehnter Abschnitt
Straftaten gegen die körperliche Unversehrtheit
§ 223 Körperverletzung
(1) Wer eine andere Person körperlich mißhandelt oder an der Gesundheit schädigt, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft.
(2) Der Versuch ist strafbar.
§ 224 Gefährliche Körperverletzung
(1) Wer die Körperverletzung
1. durch Beibringung von Gift oder anderen gesundheitsschädlichen Stoffen,
2. mittels einer Waffe oder eines anderen gefährlichen Werkzeugs,
3. mittels eines hinterlistigen Überfalls,
4. mit einem anderen Beteiligten gemeinschaftlich oder
5. mittels einer das Leben gefährdenden Behandlung
begeht, wird mit Freiheitsstrafe von sechs Monaten bis zu zehn Jahren, in minder schweren Fällen mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft.
(2) Der Versuch ist strafbar.
§ 225 Mißhandlung von Schutzbefohlenen
(1) Wer eine Person unter achtzehn Jahren oder eine wegen Gebrechlichkeit oder Krankheit wehrlose Person, die
1. seiner Fürsorge oder Obhut untersteht,
2. seinem Hausstand angehört,
3. von dem Fürsorgepflichtigen seiner Gewalt überlassen worden oder
4. ihm im Rahmen eines Dienst- oder Arbeitsverhältnisses untergeordnet ist,
quält oder roh mißhandelt, oder wer durch böswillige Vernachlässigung seiner Pflicht, für sie zu sorgen, sie an der Gesundheit schädigt, wird mit Freiheitsstrafe von sechs Monaten bis zu zehn Jahren bestraft.
(2) Der Versuch ist strafbar.
(3) Auf Freiheitsstrafe nicht unter einem Jahr ist zu erkennen, wenn der Täter die schutzbefohlene Person durch die Tat in die Gefahr
1. des Todes oder einer schweren Gesundheitsschädigung oder
2. einer erheblichen Schädigung der körperlichen oder seelischen Entwicklung
bringt.
(4) In minder schweren Fällen des Absatzes 1 ist auf Freiheitsstrafe von drei Monaten bis zu fünf Jahren, in minder schweren Fällen des Absatzes 3 auf Freiheitsstrafe von sechs Monaten bis zu fünf Jahren zu erkennen.
§ 226 Schwere Körperverletzung
(1) Hat die Körperverletzung zur Folge, daß die verletzte Person
1. das Sehvermögen auf einem Auge oder beiden Augen, das Gehör, das Sprechvermögen oder die Fortpflanzungsfähigkeit verliert,
2. ein wichtiges Glied des Körpers verliert oder dauernd nicht mehr gebrauchen kann oder
3. in erheblicher Weise dauernd entstellt wird oder in Siechtum, Lähmung oder geistige Krankheit oder Behinderung verfällt,
so ist die Strafe Freiheitsstrafe von einem Jahr bis zu zehn Jahren.
(2) Verursacht der Täter eine der in Absatz 1 bezeichneten Folgen absichtlich oder wissentlich, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren.
(3) In minder schweren Fällen des Absatzes 1 ist auf Freiheitsstrafe von sechs Monaten bis zu fünf Jahren, in minder schweren Fällen des Absatzes 2 auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren zu erkennen.
§ 226a Verstümmelung weiblicher Genitalien
(1) Wer die äußeren Genitalien einer weiblichen Person verstümmelt, wird mit Freiheitsstrafe nicht unter einem Jahr bestraft.
(2) In minder schweren Fällen ist auf Freiheitsstrafe von sechs Monaten bis zu fünf Jahren zu erkennen.
§ 227 Körperverletzung mit Todesfolge
(1) Verursacht der Täter durch die Körperverletzung (§§ 223 bis 226a) den Tod der verletzten Person, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren.
(2) In minder schweren Fällen ist auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren zu erkennen.
§ 228 Einwilligung
Wer eine Körperverletzung mit Einwilligung der verletzten Person vornimmt, handelt nur dann rechtswidrig, wenn die Tat trotz der Einwilligung gegen die guten Sitten verstößt.
§ 229 Fahrlässige Körperverletzung
Wer durch Fahrlässigkeit die Körperverletzung einer anderen Person verursacht, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
§ 230 Strafantrag
(1) Die vorsätzliche Körperverletzung nach § 223 und die fahrlässige Körperverletzung nach § 229 werden nur auf Antrag verfolgt, es sei denn, daß die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält. Stirbt die verletzte Person, so geht bei vorsätzlicher Körperverletzung das Antragsrecht nach § 77 Abs. 2 auf die Angehörigen über.
(2) Ist die Tat gegen einen Amtsträger, einen für den öffentlichen Dienst besonders Verpflichteten oder einen Soldaten der Bundeswehr während der Ausübung seines Dienstes oder in Beziehung auf seinen Dienst begangen, so wird sie auch auf Antrag des Dienstvorgesetzten verfolgt. Dasselbe gilt für Träger von Ämtern der Kirchen und anderen Religionsgesellschaften des öffentlichen Rechts.
§ 231 Beteiligung an einer Schlägerei
(1) Wer sich an einer Schlägerei oder an einem von mehreren verübten Angriff beteiligt, wird schon wegen dieser Beteiligung mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft, wenn durch die Schlägerei oder den Angriff der Tod eines Menschen oder eine schwere Körperverletzung (§ 226) verursacht worden ist.
(2) Nach Absatz 1 ist nicht strafbar, wer an der Schlägerei oder dem Angriff beteiligt war, ohne daß ihm dies vorzuwerfen ist.
`;

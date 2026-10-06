/*
 * Lern-Definitionen zum StGB – je Norm.
 *   key  : eindeutiger Schlüssel
 *   term : Anzeigename im Popup
 *   pat  : RegExp-Quelltext (ohne Gruppen) – der Textteil, an dem die Definition im Gesetzestext hängt
 *   in   : Normen, in denen der Begriff hervorgehoben wird
 *   text : Definition
 *   sub  : optionale Teilbegriffe [{ term, text }], die im Popup unter der Definition erscheinen
 *          (für Begriffe, die in der Definition vorkommen, aber nicht wörtlich im Gesetzestext stehen)
 */
window.STGB_META.defs = [

  /* ------------------------------------------------------------ § 212 Totschlag */
  { key:'mensch', term:'Mensch', pat:'Mensch(?:en)?', in:['211','212','213','221','222','231'],
    text:'in einem natürlichen Uterus herangereiftes Wesen, dessen Geburt mindestens schon begonnen hat und das wenigstens für kurze Zeit unabhängig von der Mutter in menschlicher Weise lebt' },
  { key:'tod', term:'Tod', pat:'tötet|Tod(?= eines Menschen)', in:['211','212','222'],
    text:'irreversible Beendigung aller Hirnfunktionen' },
  { key:'bsF', term:'besonders schwerer Fall (Abs. II)', pat:'besonders schweren Fällen', in:['212'],
    text:'wenn das in der Tat zum Ausdruck kommende Verschulden des Täters so außergewöhnlich groß ist, dass es ebenso schwer wiegt wie das eines Mörders' },

  /* ------------------------------------------------------------ § 211 Mord */
  { key:'heimtuecke', term:'Heimtücke', pat:'heimtückisch', in:['211'],
    text:'bewusstes Ausnutzen der auf Arglosigkeit beruhenden Wehrlosigkeit in feindlicher Willensrichtung',
    sub:[
      { term:'arglos', text:'wer sich bei Beginn der Tat keines tätlichen Angriffs auf seine körperliche Unversehrtheit oder sein Leben versieht' },
      { term:'wehrlos', text:'wer infolge seiner Arglosigkeit zur Verteidigung außer Stande oder in seiner Verteidigung stark eingeschränkt ist' }
    ] },
  { key:'grausam', term:'grausam', pat:'grausam', in:['211'],
    text:'wer dem Opfer aus gefühlloser, unbarmherziger Gesinnung Qualen körperlicher oder seelischer Art zufügt, die über das für die Tötung erforderliche Maß hinausgehen.' },
  { key:'gemeingef', term:'gemeingefährliche Mittel', pat:'gemeingefährlichen Mitteln', in:['211'],
    text:'solche Mittel, deren Wirkungsweise der Täter im Einzelfall nicht sicher zu beherrschen vermag und deren konkreter Einsatz daher geeignet ist, eine Vielzahl von Menschen (abstrakt) zu gefährden' },
  { key:'mordlust', term:'Mordlust', pat:'Mordlust', in:['211'],
    text:'Handlung allein aus unnatürlicher Freude an der Vernichtung eines Menschenlebens' },
  { key:'geschlechtstrieb', term:'zur Befriedigung des Geschlechtstriebs', pat:'zur Befriedigung des Geschlechtstriebs', in:['211'],
    text:'wer sich a. durch den Tötungsakt als solchen sexuelle Befriedigung verschaffen will (Lustmörder) oder b. um sich anschließend in nekrophiler Weise an der Leiche zu vergehen oder c. wer im Interesse eines ungestörten Geschlechtsgenusses Gewalt anwendet und dabei den Tod des Opfers billigend in Kauf nimmt' },
  { key:'habgier', term:'Habgier', pat:'Habgier', in:['211'],
    text:'ungezügeltes und rücksichtsloses Gewinnstreben um jeden Preis' },
  { key:'niedrig', term:'sonstige niedere Beweggründe', pat:'niedrigen Beweggründen', in:['211'],
    text:'solche Motive, die sittlich auf tiefster Stufe stehen und daher besonders verwerflich und verachtenswert sind' },
  { key:'ermoeglichung', term:'Ermöglichungsabsicht', pat:'zu ermöglichen', in:['211'],
    text:'Tötung muss (nicht notwendiges) Mittel zur Ermöglichung einer weiteren (eigenen oder fremden) Straftat sein' },
  { key:'verdeckung', term:'Verdeckungsabsicht', pat:'zu verdecken', in:['211'],
    text:'Bestreben, das Bekanntwerden einer eigenen oder fremden Vortat oder seiner Täterschaft zu verhindern oder deren Aufklärung zu erschweren, solange die Tat nach Tätervorstellung wirklich noch verheimlicht werden kann (regelmäßig dolus directus I. Grades, ausnahmsweise dolus eventualis ausreichend)' },

  /* ------------------------------------------------------------ § 216 Tötung auf Verlangen */
  { key:'verlangen', term:'Verlangen', pat:'Verlangen', in:['216'],
    text:'über bloße Zustimmung hinausgehendes nachdrückliches Begehren' },
  { key:'ausdruecklich', term:'ausdrücklich', pat:'ausdrückliche', in:['216'],
    text:'in eindeutiger, unmissverständlicher Weise (auch durch Gesten)' },
  { key:'ernstlich', term:'ernstlich (ernsthaft)', pat:'ernstliche', in:['216'],
    text:'sich der Tragweite bewusst (natürliche Einsichts- und Urteilsfähigkeit) und auf fehlerfreier Willensbildung beruhend' },
  { key:'bestimmen', term:'Bestimmen', pat:'bestimmt worden', in:['216'],
    text:'Hervorrufen des Tatentschlusses (Verlangen muss bestimmender Tatantrieb sein)' },

  /* ------------------------------------------------------------ § 218 Schwangerschaftsabbruch */
  { key:'abbrechen', term:'Abbrechen', pat:'abbricht', in:['218'],
    text:'der Schwangerschaft Eingriff, der zum Absterben der Leibesfrucht führt',
    sub:[
      { term:'Leibesfrucht', text:'sich im Mutterleib entwickelndes Leben, welches mit dem 13. Tag nach der Empfängnis beginnt und bis zur Geburt existiert' }
    ] },

  /* ------------------------------------------------------------ § 223 Körperverletzung */
  { key:'misshandlung', term:'Körperliche Misshandlung', pat:'körperlich mißhandelt', in:['223'],
    text:'jede üble, unangemessene Behandlung, welche das körperliche Wohlbefinden oder die Unversehrtheit mehr als nur unerheblich beeinträchtigt' },
  { key:'gesundheit', term:'Gesundheitsschädigung', pat:'an der Gesundheit schädigt', in:['223'],
    text:'jedes Hervorrufen oder Steigern eines pathologischen Zustandes',
    sub:[
      { term:'Pathologischer Zustand', text:'jede nachteilig abweichende Veränderung der körperlichen Verfassung' }
    ] },

  /* ------------------------------------------------------------ § 224 Gefährliche Körperverletzung */
  { key:'gift', term:'Gift', pat:'Gift', in:['224'],
    text:'jeder organische oder anorganische Stoff, der die Gesundheit durch chemisch-physikalische Wirkung zu beeinträchtigen vermag' },
  { key:'andere-stoffe', term:'andere gesundheitsschädliche Stoffe', pat:'anderen gesundheitsschädlichen Stoffen', in:['224'],
    text:'Substanzen mit mechanischer oder thermischer Wirkung sowie krankheitserregende Mikroorganismen und schädliche Stoffe des täglichen Gebrauchs' },
  { key:'beibringen', term:'Beibringen', pat:'Beibringung', in:['224'],
    text:'in Verbindung bringen des Stoffes mit dem Körper des Menschen, sodass er seine gesundheitsschädliche Wirkung entfalten kann' },
  { key:'waffe', term:'Waffe', pat:'Waffe', in:['224'],
    text:'jeder Gegenstand, der nach seiner Art gerade für Angriffs- oder Verteidigungszwecke bestimmt ist und geeignet, erhebliche Verletzungen zu verursachen' },
  { key:'werkzeug', term:'gefährliches Werkzeug', pat:'anderen gefährlichen Werkzeugs', in:['224'],
    text:'jeder Gegenstand, der nach seiner objektiven Beschaffenheit und Art der konkreten Verwendung im Einzelfall dazu geeignet ist, erhebliche Verletzungen zuzufügen' },
  { key:'ueberfall', term:'Überfall', pat:'Überfalls', in:['224'],
    text:'plötzlicher, unerwarteter Angriff auf einen Ahnungslosen' },
  { key:'hinterlistig', term:'hinterlistig', pat:'hinterlistigen', in:['224'],
    text:'planmäßig-verdeckendes Vorgehen zur Verschleierung der wahren Absicht, um dem Angegriffenen die Abwehr zu erschweren' },
  { key:'gemeinschaftlich', term:'mit einem anderen Beteiligten gemeinschaftlich', pat:'mit einem anderen Beteiligten gemeinschaftlich', in:['224'],
    text:'wenn mindestens zwei Personen am Tatort als Angreifer zusammen wirken' },

  /* ------------------------------------------------------------ § 226 Schwere Körperverletzung */
  { key:'verlust', term:'Verlust', pat:'verliert', in:['226'],
    text:'Aufhebung der jeweiligen Fähigkeit im Wesentlichen bei Unmöglichkeit der Heilung auf absehbare Zeit' },
  { key:'sehvermoegen', term:'Verlust des Sehvermögens', pat:'Sehvermögen', in:['226'],
    text:'wenn die Fähigkeit, Gegenstände zu erkennen, um 90 % aufgehoben ist' },
  { key:'gehoer', term:'Verlust des Gehörs', pat:'Gehör', in:['226'],
    text:'wenn die Fähigkeit, artikulierte Laute wahrzunehmen, auf beiden Ohren wesentlich eingeschränkt ist' },
  { key:'glied', term:'Glied', pat:'wichtiges Glied', in:['226'],
    text:'nach außen hin in Erscheinung tretendes Körperteil, das eine in sich abgeschlossene Existenz mit besonderer Funktion im Gesamtorganismus besitzt und durch Gelenk mit dem Körper verbunden ist',
    sub:[
      { term:'Wichtigkeit des Glieds', text:'wenn das Körperteil nach seiner allgemeinen Bedeutung unter Berücksichtigung der körperlichen Besonderheiten des konkreten Opfers für dieses von besonderer Bedeutung ist' }
    ] },
  { key:'entstellung', term:'Erhebliche dauerhafte Entstellung', pat:'in erheblicher Weise dauernd entstellt', in:['226'],
    text:'wesentliche Veränderung des Erscheinungsbildes des Opfers mit ständiger oder unbestimmt langwieriger Beeinträchtigung, sofern diese nicht in zumutbarer Weise ärztlich zu behandeln ist' },
  { key:'siechtum', term:'Siechtum', pat:'Siechtum', in:['226'],
    text:'chronischer Krankheitszustand, der den Gesamtorganismus in Mitleidenschaft zieht und mit einem Schwinden der körperlichen und geistigen Kräfte einhergeht' },

  /* ------------------------------------------------------------ § 227 Körperverletzung mit Todesfolge */
  { key:'todesfolge', term:'Todesfolge', pat:'Tod(?= der verletzten Person)', in:['227'],
    text:'Hirntod eines anderen Menschen',
    sub:[
      { term:'spezifischer Gefahrzusammenhang', text:'Realisierung der der Körperverletzung innewohnenden spezifischen Gefahr gerade in der Todesfolge, vergleichbar zur objektiven Zurechnung' }
    ] },

  /* ------------------------------------------------------------ § 228 Einwilligung */
  { key:'sitten', term:'Sittenverstoß (§ 228 StGB)', pat:'guten Sitten', in:['228'],
    text:'wenn die Tat auch bei grundsätzlicher Anerkennung des Verfügungsrechts über die eigene Körperintegrität nach Mittel und Art der Verletzung, auch in Zusammenschau mit anderen Normen und ergänzend nach Ziel und Beweggründen gegen das Anstandsgefühl aller billig und gerecht Denkenden nach der für das Zusammenleben grundlegenden Ordnung zu versagen ist' },

  /* ------------------------------------------------------------ § 231 Beteiligung an einer Schlägerei */
  { key:'schlaegerei', term:'Schlägerei', pat:'Schlägerei', in:['231'],
    text:'tätliche Auseinandersetzung von mindestens drei Personen, wobei mehrere, nicht unterscheidbare Zweikämpfe ebenfalls genügen' },
  { key:'angriff', term:'von Mehreren verübter Angriff', pat:'von mehreren verübten Angriff', in:['231'],
    text:'auf eine Körperverletzung gerichtete Handlung von mindestens zwei Personen' },
  { key:'beteiligung', term:'Beteiligung', pat:'beteiligt', in:['231'],
    text:'wenn der Täter am Tatort anwesend ist und in feindlicher Gesinnung in irgendeiner Weise an den Tätlichkeiten teilnimmt' }
];

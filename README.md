# Browser-Taschenrechner

Ein einfacher, einsteigerfreundlicher Taschenrechner, der direkt im Browser laeuft.  
Das Projekt wurde mit **HTML**, **CSS** und **JavaScript** umgesetzt und benoetigt kein Backend.
Dieses Projekt wurde vollständig mit einer **AI** erstellt.

![Taschenrechner im hellen Modus](/Assets/Taschenrechner_hell.png)

## Vorschau

Der Taschenrechner bietet:

- Grundrechenarten (`+`, `-`, `*`, `/`)
- Anzeige der vollstaendigen Eingabe (z. B. `12+34`)
- Ergebnisberechnung mit `=`
- `C` fuer komplettes Zuruecksetzen
- `⌫` (Backspace) zum schrittweisen Loeschen
- Tastatursteuerung
- Hell-/Dunkelmodus mit Speicherung der Auswahl

## Funktionen im Detail

### Rechnen

- Zahlen `0-9`
- Dezimalpunkt `.`
- Operatoren `+`, `-`, `*`, `/`
- `=` zur Berechnung
- Division durch `0` wird als `Fehler` angezeigt

### Eingabe und Korrektur

- Die eingegebene Rechenaufgabe bleibt im Display sichtbar
- Erst bei `=` wird das Ergebnis angezeigt
- `⌫` loescht die letzte Eingabe (Zahl, Operator oder Teil der zweiten Zahl)
- `C` setzt den kompletten Rechner zurueck

### Tastatursteuerung

- `0-9` fuer Zahlen
- `+`, `-`, `*`, `/` fuer Operatoren
- `.` fuer Dezimalzahlen
- `Enter` oder `=` fuer Ergebnis
- `Backspace` fuer Loeschen der letzten Eingabe
- `Escape` fuer komplettes Zuruecksetzen (`C`)

### Theme-Umschaltung

- Button oben links zum Wechsel zwischen Hell- und Dunkelmodus
- Theme wird in `localStorage` gespeichert und beim Neuladen wiederhergestellt

![Taschenrechner im dunklen Modus](/Assets/Taschenrechner_dunkel.png)

## Projektstruktur

```text
.
|-- index.html
|-- style.css
|-- script.js
|-- TECHNISCHES_KONZEPT.md
`-- README.md
```

## Lokales Starten

Da das Projekt rein aus statischen Dateien besteht, gibt es zwei einfache Wege:

1. Datei `index.html` direkt im Browser oeffnen  
   **oder**
2. Einen kleinen lokalen Server verwenden (empfohlen)

Beispiel mit Python:

```bash
python3 -m http.server 8000
```

Dann im Browser aufrufen:  
`http://localhost:8000`

## Bedienung (Kurz)

1. Erste Zahl eingeben
2. Operator waehlen
3. Zweite Zahl eingeben
4. Mit `=` oder `Enter` berechnen
5. Mit `⌫` korrigieren oder mit `C`/`Escape` komplett zuruecksetzen

## Technische Hinweise

- Zustandsbasiertes Rechenmodell in `script.js`
- Klare Trennung zwischen:
  - Struktur (`index.html`)
  - Design (`style.css`)
  - Logik (`script.js`)
- Responsive Darstellung fuer kleinere Bildschirme

## Roadmap (moegliche Erweiterungen)

- Prozentfunktion `%`
- Vorzeichenwechsel `+/-`
- Rechen-Historie
- Visuelles Highlight von Tasten bei Tastatureingabe

## Lizenz

Dieses Projekt kann frei fuer Lern- und Uebungszwecke verwendet und erweitert werden.

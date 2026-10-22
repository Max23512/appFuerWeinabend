# Lucky Act

Lucky Act ist ein kleines, deutschsprachiges Partyspiel für Browser und Smartphones. In jeder Runde wird eine Aktivität mit einer zufällig bestimmten Intensität von 1 bis 10 kombiniert. Die anderen können versuchen, die Aufgabe und ihre Intensität zu erraten.

## Spielablauf

1. Auf **Neue Aufgabe** tippen.
2. Eine zufällige Aktivität und eine Intensität von **1 bis 10** werden angezeigt.
3. Mit **Nächste Aufgabe** wird eine neue Aktivität samt neu gezogener Intensität gestartet.
4. **Zurück zum Start** bringt zurück zur Startseite.

Die Intensität wird als Zahl und als kurze Beschreibung angezeigt:

| Zahlen | Beschreibung |
| --- | --- |
| 1–2 | Sehr geringe Intensität |
| 3–4 | Geringe Intensität |
| 5–6 | Mittlere Intensität |
| 7–8 | Hohe Intensität |
| 9–10 | Sehr hohe Intensität |

Die Zahl gehört nicht dauerhaft zu einer Aktivität. Bei jeder neuen Runde werden Aktivität und Intensität unabhängig voneinander neu ausgewählt.

## Aktivitäten verwalten

Über **Aktivitäten verwalten** lassen sich eigene Aufgaben hinzufügen und gespeicherte Aufgaben löschen. Ein Eintrag darf höchstens 120 Zeichen lang sein. Leere und bereits vorhandene Einträge werden abgewiesen; der Duplikatvergleich ignoriert Groß- und Kleinschreibung. Die eigenen Einträge werden im lokalen Speicher des Browsers abgelegt.

Die Standardliste enthält konkrete Darstellungs-, Geräusch-, Alltags-, Berufs-, Sport-, Musik- und Essensaufgaben sowie fünf freiwillige, persönlichere Aufgaben. Die Standardaufgaben werden beim ersten Start geladen. Bei einem Update werden neue Standardaufgaben einmalig ergänzt. Bereits vorhandene eigene Aufgaben bleiben erhalten; frühere allgemeine Standardaufgaben werden, sofern vorhanden, durch konkretere Varianten ersetzt.

## Zufall und Intensität

Die Zahlen werden in `getRandomNumber()` in `script.js` gezogen. Um kurze Spielrunden abwechslungsreicher zu machen, wird für jede Zahl ein dynamisches Gewicht berechnet:

- Eine kürzlich gezogene Zahl erhält vorübergehend ein geringeres Gewicht.
- Eine Zahl, die länger nicht erschienen ist, erhält einen kleinen Ausgleich.
- Wenn in den letzten vier Ziehungen überwiegend Zahlen aus der unteren Hälfte (1–5) oder oberen Hälfte (6–10) kamen, wird diese Hälfte etwas zurückgewichtet.

Anschließend wird anhand der Summe der Gewichte zufällig eine Zahl ausgewählt. Es gibt keinen festen Zyklus und keine ausgeschlossenen Zahlen; Wiederholungen bleiben möglich. Dadurch sind die Zahlen auf kurze Sicht weniger gleichverteilt als bei einer unveränderten Gleichverteilung, sollen aber einseitige Häufungen seltener machen.

Die angezeigte Intensitätsbeschreibung wird in `getIntensityDescription()` anhand der gezogenen Zahl bestimmt. Sie ändert die Zufallsauswahl nicht.

## Projektdateien

| Datei | Zweck |
| --- | --- |
| `index.html` | HTML-Grundgerüst und die drei Ansichten: Start, Aufgabe und Aktivitätenverwaltung |
| `style.css` | Layout, Farben, Typografie, Schaltflächen und responsive Gestaltung |
| `script.js` | Spiellogik, Standardaufgaben, Zahlengenerierung, Speicherverwaltung und Ereignisbehandlung |
| `manifest.json` | Metadaten für die Installation als Web-App |
| `sw.js` | Service Worker für App-Cache und Offline-Nutzung |

## Technischer Ablauf

Beim Laden der Seite startet `initApp()` in `script.js`. Die gespeicherten Aktivitäten werden eingelesen, die Liste und Zähler werden aufgebaut und die Schaltflächen mit ihren Aktionen verbunden. `startNewTask()` wählt bei jedem Start eine Zahl und eine Aktivität aus und zeigt die Runde an.

Die Aktivitäten werden unter dem Schlüssel `luckyActActivities` in `localStorage` als JSON-Array gespeichert. Die Version des Aufgabenbestands wird separat unter `luckyActActivitiesVersion` geführt. Ist der lokale Speicher nicht verfügbar, kann die App mit der Standardsammlung für die aktuelle Sitzung weiterarbeiten; Änderungen sind dann nicht dauerhaft.

Der Service Worker in `sw.js` legt die App-Dateien im Cache ab. Dadurch kann die App nach dem Laden auch offline verfügbar sein. Service Worker benötigen einen sicheren Kontext: üblicherweise HTTPS oder `localhost`.

## Starten

Die App besteht aus statischen Dateien und benötigt keinen Build-Schritt. `index.html` kann direkt im Browser geöffnet werden. Für die Service-Worker- und Offline-Funktionen sollte die App über einen lokalen Webserver oder eine HTTPS-Adresse aufgerufen werden.

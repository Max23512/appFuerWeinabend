const STORAGE_KEY = 'luckyActActivities';
const STORAGE_VERSION_KEY = 'luckyActActivitiesVersion';
const STORAGE_VERSION = 2;
const DEFAULT_ACTIVITIES = [
  'Imitiere ein Auto, das beim ersten Startversuch nicht anspringt.',
  'Stelle dar, wie ein Auto an einer roten Ampel quietschend abbremst.',
  'Imitiere ein Motorrad, das an einer Kreuzung losfährt und davonbraust.',
  'Mache das Geräusch eines Zuges nach, der langsam im Bahnhof einfährt.',
  'Stelle pantomimisch dar, wie ein Busfahrer die Türen schließt und losfährt.',
  'Imitiere ein Fahrrad, dessen Klingel zweimal kurz läutet.',
  'Mache ein Flugzeug nach, das über dir hinwegfliegt und leiser wird.',
  'Imitiere eine Katze, die laut miaut, weil ihr Futternapf leer ist.',
  'Stelle einen Hund dar, der sich nach einem Regenschauer trocken schüttelt.',
  'Mache den Ruf eines Kuckucks dreimal hintereinander nach.',
  'Imitiere einen Frosch, der an einem Teich quakt.',
  'Stelle eine Ente dar, die watschelnd zum Wasser geht und quakt.',
  'Imitiere eine Eule, die nachts von einem Ast aus ruft.',
  'Mache das Geräusch eines tropfenden Wasserhahns nach, der immer schneller tropft.',
  'Imitiere einen Wecker, der morgens klingelt und dann ausgeschaltet wird.',
  'Stelle dar, wie du einen hartnäckigen Schluckauf loswerden willst.',
  'Spiele vor, dass du niesen musst, es aber immer wieder unterdrückst.',
  'Stelle dar, wie du auf eine frisch aufgeschnittene, sehr saure Zitrone beißt.',
  'Spiele vor, dass du dich über ein unerwartetes Geburtstagsgeschenk freust.',
  'Stelle dar, wie du den Bus knapp verpasst und ihm enttäuscht nachsiehst.',
  'Spiele vor, dass du im Fahrstuhl den falschen Knopf drückst und auf der falschen Etage aussteigst.',
  'Spiele vor, dass du einen wichtigen Namen vergessen hast und ihn zu erraten versuchst.',
  'Stelle dar, wie du eine Fliege verscheuchst, die immer wieder um dich herumfliegt.',
  'Spiele vor, dass du ein Geheimnis erzählen willst, aber bemerkst, dass jemand zuhört.',
  'Stelle dar, wie du versuchst, während einer ernsten Ansprache nicht zu lachen.',
  'Spiele vor, dass du dich auf Zehenspitzen an einer knarrenden Tür vorbeischleichst.',
  'Stelle dar, wie du einen viel zu schweren Koffer über eine kurze Strecke ziehst.',
  'Spiele vor, dass du mit nassen Händen eine Türklinke öffnen möchtest.',
  'Stelle dar, wie du in einer überfüllten Tasche hektisch nach deinem Schlüssel suchst.',
  'Spiele vor, dass du ein unsichtbares Geschenk vorsichtig auspackst und überrascht bist.',
  'Stelle dar, wie du auf glattem Boden vorsichtig das Gleichgewicht hältst.',
  'Spiele eine Barista-Person, die einen Cappuccino zubereitet und den Milchschaum verziert.',
  'Stelle eine Wettermoderatorin dar, die einen überraschenden Sturm ankündigt.',
  'Spiele einen Nachrichtensprecher, der eine Eilmeldung besonders ernst vorliest.',
  'Stelle eine Zugbegleiterin dar, die eine Verspätung freundlich durchsagt.',
  'Spiele einen Museumsführer, der ein unsichtbares Gemälde besonders feierlich erklärt.',
  'Stelle eine Köchin dar, die eine Suppe probiert und noch eine Prise Salz hinzufügt.',
  'Spiele einen Fotografen, der eine Gruppe für ein gemeinsames Foto arrangiert.',
  'Stelle eine Bibliothekarin dar, die jemanden freundlich um Ruhe bittet.',
  'Spiele einen Detektiv, der eine einzelne Fußspur entdeckt und untersucht.',
  'Stelle eine Zauberin dar, die ein imaginäres Tuch verschwinden lässt.',
  'Spiele einen Piraten, der auf einer Schatzkarte den eingezeichneten X-Punkt findet.',
  'Stelle eine Astronautin dar, die in Zeitlupe durch die Schwerelosigkeit schwebt.',
  'Spiele einen Roboter mit fast leerem Akku, der immer langsamer wird.',
  'Stelle einen Dirigenten dar, der ein Orchester erst leise und dann laut spielen lässt.',
  'Spiele einen Sportreporter, der ein Tor in der letzten Spielsekunde kommentiert.',
  'Stelle einen Tennisspieler dar, der aufschlägt und den Punkt gewinnt.',
  'Spiele eine Basketballspielerin, die einen Freiwurf trifft und sich über den Punkt freut.',
  'Stelle einen Fußballtorwart dar, der einen Elfmeter hält.',
  'Spiele eine Bowling-Spielerin, die alle Pins mit einem Wurf umwirft.',
  'Stelle einen Golfer dar, der einen kurzen Putt konzentriert ins Loch spielt.',
  'Spiele einen Skifahrer, der vorsichtig durch zwei Slalomstangen fährt.',
  'Stelle eine Tischtennisspielerin dar, die einen schnellen Ballwechsel gewinnt.',
  'Spiele einen Boxer, der sich vor einem imaginären Kampf aufwärmt.',
  'Stelle eine Läuferin dar, die nach einem Rennen die Ziellinie überquert.',
  'Spiele einen Angler, der einen schweren Fisch an Land zieht.',
  'Stelle eine Person dar, die beim Yoga in den Baumstand kommt und das Gleichgewicht hält.',
  'Spiele einen Musiker, der vor dem Auftritt nervös seine Gitarre stimmt.',
  'Stelle eine Opernsängerin dar, die einen besonders hohen Ton hält.',
  'Spiele einen Schlagzeuger, der ein kurzes, mitreißendes Solo spielt.',
  'Stelle einen DJ dar, der einen Songwechsel ankündigt und den Einsatz gibt.',
  'Spiele eine Person, die bei Karaoke den Refrain ihres Lieblingslieds begeistert singt.',
  'Stelle einen Straßenmusiker dar, der nach einem gelungenen Stück sein Publikum grüßt.',
  'Spiele eine Balletttänzerin, die vor einem imaginären Auftritt ihre Position einnimmt.',
  'Stelle einen Breakdancer dar, der eine einfache Drehung beendet und eine Pose hält.',
  'Spiele einen Schauspieler, der bei einer Preisverleihung eine Dankesrede hält.',
  'Stelle eine Person dar, die bei einem Konzert den Lieblingssong erkennt und mitsingt.',
  'Spiele einen Stand-up-Comedian, der nach einer Pointe auf die Reaktion des Publikums wartet.',
  'Stelle dar, wie du ein zu heißes Stück Pizza vorsichtig abkühlst, bevor du hineinbeißt.',
  'Spiele vor, dass du eine große Spaghetti-Nudel auf die Gabel drehst und probierst.',
  'Stelle dar, wie du eine Eiswaffel isst, bevor sie in der Sonne schmilzt.',
  'Spiele vor, dass du einen prickelnden Sprudel trinkst und überrascht aufstoßen musst.',
  'Stelle dar, wie du beim Kochen einen Topfdeckel anhebst und vom Dampf überrascht wirst.',
  'Spiele vor, dass du eine sehr scharfe Chili probierst und sofort nach Wasser suchst.',
  'Stelle dar, wie du einen viel zu großen Bissen nimmst und langsam kauen musst.',
  'Spiele vor, dass du beim Öffnen einer Getränkedose vom Zischen überrascht wirst.',
  'Stelle eine Person dar, die ein kompliziertes Rezept liest und die nächste Zutat abmisst.',
  'Spiele vor, dass du einen Kuchen aus dem Ofen holst und stolz das Ergebnis präsentierst.',
  'Stelle dar, wie du im Dunkeln nach dem Lichtschalter tastest und ihn endlich findest.',
  'Spiele vor, dass du eine Nachricht auf dem Handy liest und mit einem breiten Grinsen reagierst.',
  'Stelle dar, wie du eine viel zu lange Sprachnachricht anhörst und ungeduldig wirst.',
  'Spiele vor, dass du bei einem Videoanruf bemerkst, dass dein Mikrofon ausgeschaltet ist.',
  'Stelle dar, wie du einen Papierflieger faltest und seinen Flug gespannt verfolgst.',
  'Spiele vor, dass du einen Luftballon aufbläst und ihn vorsichtig verknotest.',
  'Stelle dar, wie du eine Geburtstagskerze auspustest und auf den Wunsch wartest.',
  'Spiele vor, dass du beim Gesellschaftsspiel kurz vor dem Ziel stehst und die letzte Zahl würfelst.',
  'Stelle eine Person dar, die beim ersten Versuch ein Schloss mit dem richtigen Schlüssel öffnet.',
  'Spiele vor, dass du einen Regenschirm bei einem plötzlichen Windstoß festhalten musst.',
  'Stelle dar, wie du bei einem überraschenden Feuerwerk den Himmel bewunderst.',
  'Spiele eine Person, die einen verlorenen Gegenstand unter dem Sofa entdeckt und erleichtert aufatmet.'
];

const LEGACY_ACTIVITY_REPLACEMENTS = new Map([
  ['Ein Tier nachmachen', 'Imitiere eine Katze, die laut miaut, weil ihr Futternapf leer ist.'],
  ['Einen Roboter darstellen', 'Spiele einen Roboter mit fast leerem Akku, der immer langsamer wird.'],
  ['Einen Motor imitieren', 'Imitiere ein Auto, das beim ersten Startversuch nicht anspringt.'],
  ['Eine berühmte Person darstellen', 'Spiele einen Nachrichtensprecher, der eine Eilmeldung besonders ernst vorliest.'],
  ['Einen Sportler darstellen', 'Stelle einen Tennisspieler dar, der aufschlägt und den Punkt gewinnt.'],
  ['Eine Person darstellen, die sich erschreckt', 'Spiele vor, dass du beim Öffnen einer Getränkedose vom Zischen überrascht wirst.'],
  ['Einen Gegenstand pantomimisch erklären', 'Stelle dar, wie du einen Papierflieger faltest und seinen Flug gespannt verfolgst.'],
  ['So tun, als würde man einen schweren Gegenstand tragen', 'Stelle dar, wie du einen viel zu schweren Koffer über eine kurze Strecke ziehst.'],
  ['Einen Filmcharakter darstellen', 'Spiele einen Detektiv, der eine einzelne Fußspur entdeckt und untersucht.'],
  ['Eine Person darstellen, die sich sehr freut', 'Spiele vor, dass du dich über ein unerwartetes Geburtstagsgeschenk freust.'],
  ['Wie ein bestimmtes Fahrzeug klingen', 'Mache das Geräusch eines Zuges nach, der langsam im Bahnhof einfährt.'],
  ['Einen unsichtbaren Gegenstand benutzen', 'Stelle dar, wie du in einer überfüllten Tasche hektisch nach deinem Schlüssel suchst.'],
  ['Eine Person darstellen, die etwas nicht versteht', 'Stelle eine Person dar, die ein kompliziertes Rezept liest und die nächste Zutat abmisst.'],
  ['Eine Alltagssituation pantomimisch vorspielen', 'Stelle dar, wie du den Bus knapp verpasst und ihm enttäuscht nachsiehst.'],
  ['Eine übertriebene Siegesfeier darstellen', 'Spiele eine Bowling-Spielerin, die alle Pins mit einem Wurf umwirft.']
]);

const state = {
  activities: [],
  currentTask: null
};

const elements = {
  startScreen: document.getElementById('start-screen'),
  taskScreen: document.getElementById('task-screen'),
  manageScreen: document.getElementById('manage-screen'),
  newTaskButton: document.getElementById('new-task-btn'),
  manageActivitiesButton: document.getElementById('manage-activities-btn'),
  backToStartButton: document.getElementById('back-to-start-btn'),
  nextTaskButton: document.getElementById('next-task-btn'),
  manageBackButton: document.getElementById('manage-back-btn'),
  activityForm: document.getElementById('activity-form'),
  activityInput: document.getElementById('activity-input'),
  addActivityButton: document.getElementById('add-activity-btn'),
  activityList: document.getElementById('activity-list'),
  activityCounter: document.getElementById('activity-counter'),
  startActivityCount: document.getElementById('start-activity-count'),
  activityFeedback: document.getElementById('activity-feedback'),
  globalStatus: document.getElementById('global-status'),
  taskNumber: document.getElementById('task-number'),
  taskActivity: document.getElementById('task-activity'),
  taskIntensity: document.getElementById('task-intensity')
};

function getDefaultActivities() {
  return [...DEFAULT_ACTIVITIES];
}

function setStatus(message, type = 'info') {
  if (!message) {
    elements.globalStatus.textContent = '';
    elements.globalStatus.removeAttribute('data-type');
    return;
  }

  elements.globalStatus.textContent = message;
  elements.globalStatus.setAttribute('data-type', type);
}

function setFeedback(message, type = 'info') {
  if (!message) {
    elements.activityFeedback.textContent = '';
    elements.activityFeedback.removeAttribute('data-type');
    return;
  }

  elements.activityFeedback.textContent = message;
  elements.activityFeedback.setAttribute('data-type', type);
}

function storageAvailable() {
  try {
    const testKey = '__luckyActStorageTest__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Die gespeicherten Aktivitäten kommen aus dem lokalen Browser-Speicher.
// Wenn noch nichts gespeicherte ist, laden wir die Standardliste.
function loadActivities() {
  if (!storageAvailable()) {
    state.activities = getDefaultActivities();
    setStatus('Der lokale Speicher ist nicht verfügbar. Änderungen bleiben nur für diese Sitzung erhalten.', 'warning');
    return state.activities;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === null) {
<<<<<<< HEAD
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
      return state.activities;
=======
      activities = normalizeActivities(DEFAULT_ACTIVITIES);
      if (!saveActivities()) {
        showFeedback("Speichern ist nicht verfügbar.", "warning");
      }
      return;
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
      return state.activities;
    }

<<<<<<< HEAD
    const storedActivities = parsed
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);

    if (storedActivities.length === 0) {
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
      return state.activities;
    }

    const storedVersion = Number.parseInt(localStorage.getItem(STORAGE_VERSION_KEY) || '0', 10);

    if (!Number.isFinite(storedVersion) || storedVersion < STORAGE_VERSION) {
      state.activities = migrateActivities(storedActivities);
      saveActivities({ silent: true });
    } else {
      state.activities = storedActivities;
=======
    activities = normalizeActivities(parsed);
    if (activities.length !== parsed.length) {
      showFeedback("Ungültige oder doppelte Einträge wurden übersprungen.", "warning");
    }
    if (!saveActivities()) {
      showFeedback("Aktivitäten geladen, aber nicht gespeichert.", "warning");
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
    }

    return state.activities;
  } catch (error) {
<<<<<<< HEAD
    state.activities = getDefaultActivities();
    saveActivities({ silent: true });
    setStatus('Die gespeicherten Aktivitäten konnten nicht gelesen werden. Die Standardliste wurde wiederhergestellt.', 'warning');
    return state.activities;
=======
    console.error("Die gespeicherten Aktivitäten konnten nicht geladen werden.", error);
    activities = normalizeActivities(DEFAULT_ACTIVITIES);

    const saved = saveActivities();
    const detail = saved
      ? "Liste nicht lesbar. Standardaktivitäten geladen."
      : "Lokaler Speicher nicht verfügbar.";
    showFeedback(detail, "warning");
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
  }
}

function migrateActivities(activities) {
  const migratedActivities = activities.map(
    (activity) => LEGACY_ACTIVITY_REPLACEMENTS.get(activity) || activity
  );
  const existingActivities = new Set(migratedActivities.map((activity) => activity.toLowerCase()));

  DEFAULT_ACTIVITIES.forEach((activity) => {
    const normalizedActivity = activity.toLowerCase();

    if (!existingActivities.has(normalizedActivity)) {
      migratedActivities.push(activity);
      existingActivities.add(normalizedActivity);
    }
  });

  return migratedActivities;
}

function saveActivities(options = {}) {
  const { silent = false } = options;

  if (!storageAvailable()) {
    if (!silent) {
      setFeedback('Die Änderungen konnten nicht dauerhaft gespeichert werden. Die App funktioniert aber für diese Sitzung weiter.', 'warning');
    }
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.activities));
    localStorage.setItem(STORAGE_VERSION_KEY, String(STORAGE_VERSION));
    return true;
  } catch (error) {
    if (!silent) {
      setFeedback('Die Aktivitäten konnten nicht gespeichert werden. Bitte prüfe den verfügbaren Speicherplatz.', 'error');
    }
    return false;
  }
}

function updateActivityCount() {
  const count = state.activities.length;
  const label = count === 1 ? 'gespeicherte Aktivität' : 'gespeicherte Aktivitäten';

<<<<<<< HEAD
  elements.startActivityCount.textContent = `${count} ${label}`;
  elements.activityCounter.textContent = String(count);
=======
    const parsed = JSON.parse(stored);
    if (typeof parsed.avoidRepeats === "boolean") {
      avoidRepeats = parsed.avoidRepeats;
    }
    if (Array.isArray(parsed.usedActivityIds)) {
      const validIds = new Set(activities.map((activity) => activity.id));
      for (const id of parsed.usedActivityIds) {
        if (typeof id === "string" && validIds.has(id)) {
          usedActivityIds.add(id);
        }
      }
    }
  } catch (error) {
    console.error("Der gespeicherte Wiederholungs-Spielstand konnte nicht geladen werden.", error);
    showFeedback("Wiederholungs-Spielstand nicht lesbar.", "warning");
  }
}

function eligibleActivities() {
  return multiPersonMode
    ? activities
    : activities.filter((activity) => activity.personCount === 1);
}

function renderRepeatControls() {
  for (const toggle of document.querySelectorAll("[data-avoid-repeats-toggle]")) {
    toggle.setAttribute("aria-pressed", String(avoidRepeats));
    toggle.querySelector(".people-mode-status").textContent = avoidRepeats
      ? "An – keine Wiederholungen"
      : "Aus – Wiederholungen erlaubt";
  }

  const eligible = eligibleActivities();
  const usedCount = eligible.filter((activity) => usedActivityIds.has(activity.id)).length;
  for (const progress of document.querySelectorAll("[data-repeat-progress]")) {
    progress.textContent = avoidRepeats && eligible.length > 0
      ? `Bereits gezogen: ${usedCount} von ${eligible.length}`
      : "";
  }
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
}

function renderActivities() {
  elements.activityList.innerHTML = '';

  if (state.activities.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.innerHTML = '<span>Keine Aktivitäten gespeichert.</span>';
    elements.activityList.appendChild(emptyItem);
    updateActivityCount();
    return;
  }

  const fragment = document.createDocumentFragment();

  state.activities.forEach((activity, index) => {
    const listItem = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = activity;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('aria-label', `Aktivität löschen: ${activity}`);
    deleteButton.dataset.index = String(index);
    deleteButton.textContent = '×';

    listItem.appendChild(text);
    listItem.appendChild(deleteButton);
    fragment.appendChild(listItem);
  });

  elements.activityList.appendChild(fragment);
  updateActivityCount();
}

function showScreen(screenName) {
  const screens = [
    elements.startScreen,
    elements.taskScreen,
    elements.manageScreen
  ];

  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === `${screenName}-screen`);
  });
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomActivity() {
  const randomIndex = Math.floor(Math.random() * state.activities.length);
  return state.activities[randomIndex];
}

function getIntensityDescription(number) {
<<<<<<< HEAD
  if (number >= 1 && number <= 2) {
    return 'Sehr geringe Intensität – eine sehr zurückhaltende Darstellung.';
  }

  if (number >= 3 && number <= 4) {
    return 'Geringe Intensität – eine leichte, unauffällige Darstellung.';
  }

  if (number >= 5 && number <= 6) {
    return 'Mittlere Intensität – eine deutlich erkennbare Darstellung.';
  }

  if (number >= 7 && number <= 8) {
    return 'Hohe Intensität – sehr ausdrucksstark darstellen!';
  }

  return 'Sehr hohe Intensität – eine besonders ausdrucksstarke Darstellung innerhalb sicherer Grenzen.';
=======
  if (number <= 2) {
    return "Sehr gering – zurückhaltend darstellen.";
  }
  if (number <= 4) {
    return "Gering – leicht darstellen.";
  }
  if (number <= 6) {
    return "Mittel – deutlich darstellen.";
  }
  if (number <= 8) {
    return "Hoch – ausdrucksstark darstellen.";
  }
  return "Sehr hoch – ausdrucksstark und sicher darstellen.";
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
}

function showTask(task) {
  elements.taskNumber.textContent = `${task.number}/10`;
  elements.taskActivity.textContent = task.activity;
  elements.taskIntensity.textContent = getIntensityDescription(task.number);
}

<<<<<<< HEAD
// Eine neue Aufgabe entsteht nur durch einen bewussten Klick auf den Button.
function startNewTask() {
  if (state.activities.length === 0) {
    setStatus('Es ist noch keine Aktivität gespeichert. Bitte füge zuerst eine Aktivität hinzu.', 'warning');
    showScreen('start');
=======
  if (eligible.length === 0) {
    showScreen("home");
    showFeedback(
      activities.length === 0
        ? "Keine Aktivitäten vorhanden. Füge Aktivitäten hinzu."
        : "Keine passenden Aktivitäten. Ändere den Modus oder füge weitere Aktivitäten hinzu.",
      "error"
    );
    document.querySelector("#manage-from-home").focus();
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
    return;
  }

  const randomNumber = getRandomNumber();
  const randomActivity = getRandomActivity();

  state.currentTask = {
    number: randomNumber,
    activity: randomActivity
  };

<<<<<<< HEAD
  showTask(state.currentTask);
  showScreen('task');
  setStatus('');
=======
  const activity = candidates[Math.floor(Math.random() * candidates.length)];

  document.querySelector("#task-number").textContent = String(number);
  document.querySelector("#task-activity").textContent = activity.name;
  const taskPeople = document.querySelector("#task-people");
  taskPeople.hidden = activity.personCount === 1;
  taskPeople.textContent = activity.personCount > 1
    ? `Benötigte Personen: ${activity.personCount}`
    : "";
  document.querySelector("#task-description").textContent = getIntensityDescription(number);
  showScreen("task");
  showFeedback("");
  usedActivityIds.add(activity.id);
  renderRepeatControls();
  if (!saveGameState()) {
    showFeedback("Wiederholungs-Spielstand nicht gespeichert.", "warning");
  }
  document.querySelector("#next-task-button").focus({ preventScroll: true });
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
}

// Neue Einträge werden vor dem Speichern geprüft: leer, doppelt oder zu lang ist nicht erlaubt.
function addActivity(event) {
  event.preventDefault();

<<<<<<< HEAD
  const enteredActivity = elements.activityInput.value.trim();

  if (!enteredActivity) {
    setFeedback('Bitte gib eine Aktivität ein.', 'error');
    elements.activityInput.focus();
    return;
  }

  if (enteredActivity.length > 120) {
    setFeedback('Die Aktivität darf maximal 120 Zeichen lang sein.', 'error');
    elements.activityInput.focus();
    return;
  }

  const isDuplicate = state.activities.some(
    (activity) => activity.toLowerCase() === enteredActivity.toLowerCase()
=======
  const name = activityInput.value.trim().slice(0, MAX_ACTIVITY_LENGTH);
  if (!name) {
    showFeedback("Aktivität eingeben.", "error");
    activityInput.focus();
    return;
  }

  if (activities.some((savedActivity) => activityKey(savedActivity.name) === activityKey(name))) {
    showFeedback("Diese Aktivität ist bereits gespeichert.", "error");
    activityInput.focus();
    return;
  }

  const personCount = Number(personCountInput.value);
  if (![1, 2, 3].includes(personCount)) {
    showFeedback("Personenzahl auswählen.", "error");
    personCountInput.focus();
    return;
  }

  activities.push({ id: createActivityId(), name, personCount });
  renderActivities();
  const saved = saveActivities();
  activityInput.value = "";
  personCountInput.value = "1";
  showFeedback(
    saved
      ? `„${name}“ hinzugefügt.`
      : `„${name}“ hinzugefügt, aber nicht gespeichert.`,
    saved ? "success" : "warning"
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
  );

  if (isDuplicate) {
    setFeedback('Diese Aktivität ist bereits gespeichert.', 'error');
    elements.activityInput.focus();
    return;
  }

  state.activities.push(enteredActivity);
  saveActivities();
  renderActivities();
<<<<<<< HEAD
  elements.activityInput.value = '';
  setFeedback('Aktivität erfolgreich hinzugefügt!', 'success');
  elements.activityInput.focus();
=======
  const saved = saveActivities();
  showFeedback(
    saved
      ? `„${removed.name}“ gelöscht.`
      : `„${removed.name}“ gelöscht, aber nicht gespeichert.`,
    saved ? "success" : "warning"
  );
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
}

function deleteActivity(indexToDelete) {
  if (Number.isNaN(indexToDelete)) {
    return;
  }

<<<<<<< HEAD
  const deleted = state.activities.splice(indexToDelete, 1);

  if (!deleted.length) {
    return;
  }

  saveActivities();
  renderActivities();

  if (state.activities.length === 0) {
    setFeedback('Alle Aktivitäten wurden gelöscht. Die Liste ist jetzt leer.', 'warning');
  } else {
    setFeedback('Aktivität gelöscht.', 'success');
  }
}

// Service Worker prüfen und für GitHub Pages plus Offline-Nutzung registrieren.
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }
=======
function updateAvoidRepeats() {
  avoidRepeats = !avoidRepeats;
  renderRepeatControls();
  if (!saveGameState()) {
    showFeedback("Einstellung nicht gespeichert.", "warning");
  }
}

document.querySelector("#new-task-button").addEventListener("click", createTask);
document.querySelector("#next-task-button").addEventListener("click", createTask);
document.querySelector("#manage-from-home").addEventListener("click", () => showScreen("manage"));
document.querySelector("#manage-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-secondary").addEventListener("click", () => showScreen("home"));
document.querySelector("#activity-form").addEventListener("submit", addActivity);
const rulesDialog = document.querySelector("#rules-dialog");
document.querySelector("#rules-button").addEventListener("click", () => rulesDialog.showModal());
rulesDialog.addEventListener("click", (event) => {
  if (event.target === rulesDialog) {
    rulesDialog.close();
  }
});
for (const toggle of document.querySelectorAll("[data-multi-person-toggle]")) {
  toggle.addEventListener("click", updateMultiPersonMode);
}
for (const toggle of document.querySelectorAll("[data-avoid-repeats-toggle]")) {
  toggle.addEventListener("click", updateAvoidRepeats);
}
document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  showScreen("home");
});
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c

  const appBaseUrl = new URL('.', window.location.href).toString();
  const serviceWorkerUrl = new URL('./sw.js', appBaseUrl).toString();

<<<<<<< HEAD
  navigator.serviceWorker.register(serviceWorkerUrl, { scope: appBaseUrl }).catch(() => {
    setStatus('Der Service Worker konnte nicht registriert werden. Die App bleibt jedoch nutzbar.', 'warning');
=======
const isSecureAppOrigin = window.location.protocol === "https:"
  || ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

if ("serviceWorker" in navigator && isSecureAppOrigin) {
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Die Offline-Unterstützung konnte nicht aktiviert werden.", error);
    showFeedback("Offline-Modus nicht verfügbar.", "warning");
>>>>>>> a5685d79ab41d18bdb649289fccdaf681752e11c
  });
}

function handleActivityListClick(event) {
  const deleteButton = event.target.closest('.delete-btn');

  if (!deleteButton) {
    return;
  }

  const index = Number(deleteButton.dataset.index);
  deleteActivity(index);
}

function initApp() {
  loadActivities();
  renderActivities();
  showScreen('start');
  updateActivityCount();
  setFeedback('');
  setStatus('');

  elements.newTaskButton.addEventListener('click', startNewTask);
  elements.manageActivitiesButton.addEventListener('click', () => {
    setFeedback('');
    showScreen('manage');
  });
  elements.backToStartButton.addEventListener('click', () => {
    setStatus('');
    showScreen('start');
  });
  elements.nextTaskButton.addEventListener('click', startNewTask);
  elements.manageBackButton.addEventListener('click', () => {
    setFeedback('');
    showScreen('start');
  });
  elements.activityForm.addEventListener('submit', addActivity);
  elements.activityList.addEventListener('click', handleActivityListClick);

  registerServiceWorker();
}

initApp();

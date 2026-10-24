const STORAGE_TASKS_KEY = 'partyMixChallengeTasks';
const STORAGE_SETTINGS_KEY = 'partyMixSettings';

const MODE_DEFINITIONS = [
  {
    id: 'challenge',
    title: 'Lucky Act Challenge',
    icon: '🎲',
    description: 'Aufgabe und Intensität ziehen',
    kind: 'challenge'
  },
  {
    id: 'would-you-rather',
    title: 'Wer würde eher ...?',
    icon: '🤔',
    description: 'Schnelle Entscheidungen für die ganze Gruppe',
    kind: 'generic'
  },
  {
    id: 'either-or',
    title: 'Entweder oder',
    icon: '⚖️',
    description: 'Kurz und kontrovers',
    kind: 'generic'
  },
  {
    id: 'pantomime',
    title: 'Pantomime',
    icon: '🎭',
    description: 'Begriffe nur durch Bewegung erklären',
    kind: 'generic'
  },
  {
    id: 'sound-guess',
    title: 'Geräusche raten',
    icon: '🔊',
    description: 'Nur Klang, kein Wort',
    kind: 'generic'
  },
  {
    id: 'number-guess',
    title: 'Zahlen-Schätzung',
    icon: '🔢',
    description: 'Schätze und prüfe danach',
    kind: 'generic'
  }
];

const DEFAULT_CHALLENGE_TASKS = [
  { id: 'c-001', text: 'Imitiere ein Auto, das beim ersten Startversuch nicht anspringt.', personCount: 1 },
  { id: 'c-002', text: 'Stelle ein verrücktes Tier dar, das im Supermarkt nach Futter sucht.', personCount: 1 },
  { id: 'c-003', text: 'Mache das Geräusch eines Zuges nach, der im Bahnhof langsam einfährt.', personCount: 1 },
  { id: 'c-004', text: 'Spiele einen Roboter mit fast leerem Akku, der immer langsamer wird.', personCount: 1 },
  { id: 'c-005', text: 'Stelle eine Katze dar, die laut miaut, weil ihr Napf leer ist.', personCount: 1 },
  { id: 'c-006', text: 'Spiele eine Person, die in einer überfüllten Tasche hektisch nach dem Schlüssel sucht.', personCount: 1 },
  { id: 'c-007', text: 'Mache den Ruf eines Kuckucks dreimal hintereinander nach.', personCount: 1 },
  { id: 'c-008', text: 'Stelle eine Bibliothekarin dar, die jemanden freundlich um Ruhe bittet.', personCount: 1 },
  { id: 'c-009', text: 'Spiele einen Sportreporter, der ein Tor in der letzten Sekunde kommentiert.', personCount: 1 },
  { id: 'c-010', text: 'Stelle eine Person dar, die eine Geburtstagskerze auspustet und einen Wunsch erwartet.', personCount: 1 },
  { id: 'c-011', text: 'Spiele „Hund ausführen“: ein Spieler ist der Hund, ein anderer der Besitzer.', personCount: 2 },
  { id: 'c-012', text: 'Stelle die Achterbahn dar: drei Spieler fahren gemeinsam die Kurven und Loopings durch.', personCount: 3 },
  { id: 'c-013', text: 'Spiele eine Person, die mit nassen Händen verzweifelt eine Türklinke öffnet.', personCount: 1 },
  { id: 'c-014', text: 'Stelle einen DJ dar, der einen Songwechsel ankündigt und den Einsatz gibt.', personCount: 1 },
  { id: 'c-015', text: 'Spiele eine Opernsängerin, die einen besonders hohen Ton hält.', personCount: 1 },
  { id: 'c-016', text: 'Stelle einen Angler dar, der mit großem Einsatz einen schweren Fisch an Land zieht.', personCount: 1 },
  { id: 'c-017', text: 'Spiele eine Tänzerin, die vor dem Auftritt nervös ihre Schuhe überprüft.', personCount: 1 },
  { id: 'c-018', text: 'Stelle eine Person dar, die auf einem glatten Boden vorsichtig das Gleichgewicht hält.', personCount: 1 },
  { id: 'c-019', text: 'Spiele ein Paar, das versucht, ein unsichtbares Geschenk vorsichtig zu öffnen.', personCount: 2 },
  { id: 'c-020', text: 'Stelle die OP am offenen Herzen dar: ein Patient und zwei Chirurgen operieren gemeinsam.', personCount: 3 },
  { id: 'c-021', text: 'Spiele vor, dass du beim Öffnen einer Dose von einem lauten Zischen überrascht wirst.', personCount: 1 },
  { id: 'c-022', text: 'Stelle einen sehr nervösen Koch dar, der ein Rezept laut liest und Zutaten abmisst.', personCount: 1 },
  { id: 'c-023', text: 'Spiele einen Verkäufer, der einem Kunden ein völlig unsinniges Produkt anpreist.', personCount: 2 },
  { id: 'c-024', text: 'Mache das Geräusch eines Luftballons nach, der laut aufpufft und dann plötzlich flach wird.', personCount: 1 },
  { id: 'c-025', text: 'Stelle eine Person dar, die auf Zehenspitzen an einer knarrenden Tür vorbeischleicht.', personCount: 1 },
  { id: 'c-026', text: 'Spiele eine Person, die beim Erkennen eines Lieblingsliedes in den Beat mitwirft.', personCount: 1 },
  { id: 'c-027', text: 'Stelle einen Spaziergänger dar, der von einer unsichtbaren Fliege verfolgt wird.', personCount: 1 },
  { id: 'c-028', text: 'Spiele im Team eine sehr langsame, aber sehr wichtige Bautätigkeit ohne Werkzeuge.', personCount: 2 },
  { id: 'c-029', text: 'Mache ein Feuerwehrfahrzeug nach, das mit lautem Signal aus der Garage fährt.', personCount: 1 },
  { id: 'c-030', text: 'Stelle eine Person dar, die einen superheißen Keks vorsichtig abkühlt, bevor sie hineinbeißt.', personCount: 1 }
];

const WOULD_YOU_RATHER_QUESTIONS = [
  { question: 'Wer würde eher ein ganzes Wochenende ohne Handy überstehen?', optionA: 'Spieler 1', optionB: 'Spieler 2' },
  { question: 'Wer würde eher eine ganze Nacht mit Musik und Tanzen verbringen?', optionA: 'Spieler 1', optionB: 'Spieler 2' },
  { question: 'Wer würde eher zufällig auf einer Party anfangen, ein Lied solo zu singen?', optionA: 'Spieler 1', optionB: 'Spieler 2' },
  { question: 'Wer würde eher eine Woche nur Pizza essen?', optionA: 'Spieler 1', optionB: 'Spieler 2' },
  { question: 'Wer würde eher eine verrückte Idee sofort umsetzen?', optionA: 'Spieler 1', optionB: 'Spieler 2' },
  { question: 'Wer würde eher im Sommer mit offenem Fenster schlafen?', optionA: 'Spieler 1', optionB: 'Spieler 2' }
];

const EITHER_OR_QUESTIONS = [
  { question: 'Kaffeetrinken oder Teetrinken?', choices: ['Kaffee', 'Tee'] },
  { question: 'Wandern oder Konzert?', choices: ['Wandern', 'Konzert'] },
  { question: 'Urlaub am Meer oder in den Bergen?', choices: ['Meer', 'Berge'] },
  { question: 'Pizza oder Pasta?', choices: ['Pizza', 'Pasta'] },
  { question: 'Lange Nacht oder ruhiger Abend zu Hause?', choices: ['Lange Nacht', 'Ruhiger Abend'] }
];

const PANTOMIME_WORDS = [
  'Kuh',
  'Schlüsselsuche',
  'Tee kochen',
  'Mikrowelle',
  'Schneeball',
  'Fahrrad',
  'Trommel',
  'Salat machen',
  'Bügeleisen',
  'Kaffeefilter'
];

const SOUND_WORDS = [
  'Hund',
  'Katze',
  'Kaffeemaschine',
  'Zug',
  'Toaster',
  'Fahrradklingel',
  'Regenschirm',
  'Mikrofon',
  'Luftballon',
  'Rasierer'
];

const ESTIMATION_QUESTIONS = [
  {
    prompt: 'Wie viele Sekunden hat eine Minute?',
    answer: 60,
    explanation: 'Eine Minute hat genau 60 Sekunden.'
  },
  {
    prompt: 'Wie viele Tage hat eine Woche?',
    answer: 7,
    explanation: 'Eine Woche hat 7 Tage.'
  },
  {
    prompt: 'Wie viele Finger hat eine Hand?',
    answer: 5,
    explanation: 'Eine Hand hat normalerweise 5 Finger.'
  },
  {
    prompt: 'Wie viele Minuten sind eine Stunde?',
    answer: 60,
    explanation: 'Eine Stunde hat 60 Minuten.'
  },
  {
    prompt: 'Wie viele Seiten hat ein normales Blatt Papier?',
    answer: 2,
    explanation: 'Ein Blatt hat eine Vorderseite und eine Rückseite.'
  }
];

const state = {
  currentMode: null,
  challengeTasks: [],
  currentChallenge: null,
  teamMode: false,
  avoidRepeats: false,
  usedChallengeIds: new Set(),
  currentGeneric: null,
  genericHistory: {
    'would-you-rather': new Set(),
    'either-or': new Set(),
    pantomime: new Set(),
    'sound-guess': new Set(),
    'number-guess': new Set()
  }
};

const elements = {
  homeScreen: document.getElementById('home-screen'),
  challengeScreen: document.getElementById('challenge-screen'),
  gameScreen: document.getElementById('game-screen'),
  manageScreen: document.getElementById('manage-screen'),
  modeGrid: document.getElementById('mode-grid'),
  activityCount: document.getElementById('activity-count'),
  repeatProgress: document.getElementById('repeat-progress'),
  taskInput: document.getElementById('task-input'),
  taskPersonCount: document.getElementById('task-person-count'),
  taskForm: document.getElementById('task-form'),
  taskList: document.getElementById('task-list'),
  taskCounter: document.getElementById('task-counter'),
  taskFeedback: document.getElementById('task-feedback'),
  manageBtn: document.getElementById('manage-btn'),
  globalStatus: document.getElementById('global-status'),
  challengeNumber: document.getElementById('challenge-number'),
  challengeTask: document.getElementById('challenge-task'),
  challengePeople: document.getElementById('challenge-people'),
  challengeIntensity: document.getElementById('challenge-intensity'),
  nextChallengeBtn: document.getElementById('next-challenge-btn'),
  challengeBackBtn: document.getElementById('challenge-back-btn'),
  gameTitle: document.getElementById('game-title'),
  gameDescription: document.getElementById('game-description'),
  gameContent: document.getElementById('game-content'),
  gameNextBtn: document.getElementById('game-next-btn'),
  gameBackBtn: document.getElementById('game-back-btn'),
  manageBackBtn: document.getElementById('manage-back-btn'),
  rulesButton: document.getElementById('rules-button'),
  rulesDialog: document.getElementById('rules-dialog'),
  imprintButton: document.getElementById('imprint-button'),
  imprintDialog: document.getElementById('imprint-dialog')
};

function showScreen(screenId) {
  const screens = [
    elements.homeScreen,
    elements.challengeScreen,
    elements.gameScreen,
    elements.manageScreen
  ];

  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === screenId);
  });
}

function setGlobalStatus(message, type = 'info') {
  if (!message) {
    elements.globalStatus.textContent = '';
    elements.globalStatus.removeAttribute('data-type');
    return;
  }

  elements.globalStatus.textContent = message;
  elements.globalStatus.setAttribute('data-type', type);
}

function setTaskFeedback(message, type = 'info') {
  if (!message) {
    elements.taskFeedback.textContent = '';
    elements.taskFeedback.removeAttribute('data-type');
    return;
  }

  elements.taskFeedback.textContent = message;
  elements.taskFeedback.setAttribute('data-type', type);
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getHistoryForMode(modeId) {
  return state.genericHistory[modeId] || new Set();
}

function pickReusableGenericItem(modeId, items) {
  const history = getHistoryForMode(modeId);
  const remaining = items.filter((item) => !history.has(item));
  const selected = remaining.length ? getRandomItem(remaining) : getRandomItem(items);

  if (typeof selected === 'string') {
    history.add(selected);
  } else {
    history.add(selected.question || selected.prompt || JSON.stringify(selected));
  }

  if (history.size > items.length + 2) {
    history.clear();
  }

  return selected;
}

function normalizeTaskArray(values) {
  return values
    .map((task) => {
      if (!task || typeof task.text !== 'string') {
        return null;
      }

      const text = task.text.trim();
      if (!text) {
        return null;
      }

      const personCount = [1, 2, 3].includes(task.personCount) ? task.personCount : 1;

      return {
        id: typeof task.id === 'string' && task.id ? task.id : `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        personCount
      };
    })
    .filter(Boolean);
}

function loadChallengeTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_TASKS_KEY);
    if (!saved) {
      state.challengeTasks = normalizeTaskArray(DEFAULT_CHALLENGE_TASKS);
      saveChallengeTasks(true);
      return;
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      state.challengeTasks = normalizeTaskArray(DEFAULT_CHALLENGE_TASKS);
      saveChallengeTasks(true);
      return;
    }

    state.challengeTasks = normalizeTaskArray(parsed);
    if (state.challengeTasks.length === 0) {
      state.challengeTasks = normalizeTaskArray(DEFAULT_CHALLENGE_TASKS);
    }
  } catch (error) {
    state.challengeTasks = normalizeTaskArray(DEFAULT_CHALLENGE_TASKS);
  }
}

function saveChallengeTasks(silent = false) {
  try {
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(state.challengeTasks));
    return true;
  } catch (error) {
    if (!silent) {
      setTaskFeedback('Die Aufgaben konnten nicht gespeichert werden.', 'warning');
    }
    return false;
  }
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    state.teamMode = parsed.teamMode === true;
    state.avoidRepeats = parsed.avoidRepeats === true;
  } catch (error) {
    state.teamMode = false;
    state.avoidRepeats = false;
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify({
      teamMode: state.teamMode,
      avoidRepeats: state.avoidRepeats
    }));
    return true;
  } catch (error) {
    return false;
  }
}

function renderSettingsButtons() {
  document.querySelectorAll('[data-setting]').forEach((button) => {
    const settingName = button.dataset.setting;
    const isOn = settingName === 'team-mode' ? state.teamMode : state.avoidRepeats;
    button.setAttribute('aria-pressed', String(isOn));
    const status = button.querySelector('.toggle-status');
    if (settingName === 'team-mode') {
      status.textContent = isOn ? 'An – Einzel- und Team-Aufgaben' : 'Aus – nur Einzelaufgaben';
    } else {
      status.textContent = isOn ? 'An – keine Wiederholungen' : 'Aus – Wiederholungen erlaubt';
    }
  });

  const eligible = getEligibleChallengeTasks();
  const usedCount = eligible.filter((task) => state.usedChallengeIds.has(task.id)).length;
  elements.repeatProgress.textContent = state.avoidRepeats && eligible.length
    ? `Bereits gezogen: ${usedCount} von ${eligible.length}`
    : '';
}

function updateChallengeCount() {
  const label = state.challengeTasks.length === 1 ? 'Challenge' : 'Challenges';
  elements.activityCount.textContent = `${state.challengeTasks.length} ${label}`;
  elements.taskCounter.textContent = String(state.challengeTasks.length);
  renderSettingsButtons();
}

function renderModeGrid() {
  elements.modeGrid.innerHTML = '';

  MODE_DEFINITIONS.forEach((mode) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mode-card';
    button.dataset.mode = mode.id;
    button.innerHTML = `
      <span class="mode-card-icon" aria-hidden="true">${mode.icon}</span>
      <span class="mode-card-copy">
        <span class="mode-card-title">${mode.title}</span>
        <span class="mode-card-text">${mode.description}</span>
      </span>
      <span class="mode-card-action">Start</span>
    `;
    elements.modeGrid.appendChild(button);
  });
}

function getEligibleChallengeTasks() {
  return state.teamMode
    ? state.challengeTasks
    : state.challengeTasks.filter((task) => task.personCount === 1);
}

function getIntensityDescription(number) {
  if (number >= 1 && number <= 2) return 'Sehr geringe Intensität – sehr zurückhaltend.';
  if (number >= 3 && number <= 4) return 'Geringe Intensität – leicht und unauffällig.';
  if (number >= 5 && number <= 6) return 'Mittlere Intensität – deutlich erkennbar.';
  if (number >= 7 && number <= 8) return 'Hohe Intensität – sehr ausdrucksstark!';
  return 'Sehr hohe Intensität – besonders auffällig, aber sicher.';
}

function renderChallengeTask(task) {
  elements.challengeNumber.textContent = `${task.number}/10`;
  elements.challengeTask.textContent = task.task.text;
  elements.challengePeople.textContent = task.task.personCount === 1 ? '1 Person' : `${task.task.personCount} Personen`;
  elements.challengeIntensity.textContent = getIntensityDescription(task.number);
}

function generateChallengeTask() {
  const eligible = getEligibleChallengeTasks();
  if (!eligible.length) {
    setGlobalStatus('Keine passenden Challenges vorhanden. Bitte Team-Modus aktivieren oder Aufgaben hinzufügen.', 'warning');
    showScreen('home-screen');
    return;
  }

  let candidates = eligible;
  if (state.avoidRepeats) {
    candidates = eligible.filter((task) => !state.usedChallengeIds.has(task.id));
    if (!candidates.length) {
      eligible.forEach((task) => state.usedChallengeIds.delete(task.id));
      candidates = eligible;
    }
  }

  const rawTask = getRandomItem(candidates);
  const intensity = Math.floor(Math.random() * 10) + 1;
  const round = {
    number: intensity,
    task: rawTask
  };

  state.currentChallenge = round;
  state.usedChallengeIds.add(rawTask.id);
  renderChallengeTask(round);
  setGlobalStatus('');
  showScreen('challenge-screen');
}

function renderTaskList() {
  elements.taskList.innerHTML = '';

  if (!state.challengeTasks.length) {
    const emptyItem = document.createElement('li');
    emptyItem.innerHTML = '<span>Keine Challenges gespeichert.</span>';
    elements.taskList.appendChild(emptyItem);
    updateChallengeCount();
    return;
  }

  state.challengeTasks.forEach((task) => {
    const item = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = task.text;

    const meta = document.createElement('span');
    meta.className = 'task-meta';
    meta.textContent = task.personCount === 1 ? '1P' : `${task.personCount}P`;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', `Challenge löschen: ${task.text}`);
    deleteButton.dataset.taskId = task.id;

    item.appendChild(text);
    item.appendChild(meta);
    item.appendChild(deleteButton);
    elements.taskList.appendChild(item);
  });

  updateChallengeCount();
}

function addChallenge(event) {
  event.preventDefault();

  const entered = elements.taskInput.value.trim();
  if (!entered) {
    setTaskFeedback('Bitte gib eine Challenge ein.', 'error');
    elements.taskInput.focus();
    return;
  }

  if (entered.length > 120) {
    setTaskFeedback('Die Challenge darf maximal 120 Zeichen lang sein.', 'error');
    elements.taskInput.focus();
    return;
  }

  const duplicate = state.challengeTasks.some((task) => task.text.toLowerCase() === entered.toLowerCase());
  if (duplicate) {
    setTaskFeedback('Diese Challenge ist bereits gespeichert.', 'error');
    elements.taskInput.focus();
    return;
  }

  const personCount = Number(elements.taskPersonCount.value);
  state.challengeTasks.push({
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text: entered,
    personCount: [1, 2, 3].includes(personCount) ? personCount : 1
  });

  saveChallengeTasks();
  renderTaskList();
  elements.taskInput.value = '';
  elements.taskPersonCount.value = '1';
  setTaskFeedback('Challenge erfolgreich hinzugefügt.', 'success');
  elements.taskInput.focus();
}

function deleteChallenge(taskId) {
  const index = state.challengeTasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    return;
  }

  const [removed] = state.challengeTasks.splice(index, 1);
  state.usedChallengeIds.delete(removed.id);
  saveChallengeTasks();
  renderTaskList();
  setTaskFeedback('Challenge gelöscht.', 'success');
}

function renderWouldYouRather() {
  const question = pickReusableGenericItem('would-you-rather', WOULD_YOU_RATHER_QUESTIONS);
  elements.gameContent.innerHTML = `
    <div class="prompt-card">
      <p class="prompt-label">Frage</p>
      <h3>${question.question}</h3>
      <div class="choice-grid">
        <button type="button" class="choice-btn" data-choice="A">${question.optionA}</button>
        <button type="button" class="choice-btn" data-choice="B">${question.optionB}</button>
      </div>
    </div>
  `;
}

function renderEitherOr() {
  const question = pickReusableGenericItem('either-or', EITHER_OR_QUESTIONS);
  elements.gameContent.innerHTML = `
    <div class="prompt-card">
      <p class="prompt-label">Entscheidung</p>
      <h3>${question.question}</h3>
      <div class="choice-grid">
        <button type="button" class="choice-btn" data-choice="A">${question.choices[0]}</button>
        <button type="button" class="choice-btn" data-choice="B">${question.choices[1]}</button>
      </div>
    </div>
  `;
}

function renderPantomime() {
  const word = pickReusableGenericItem('pantomime', PANTOMIME_WORDS);
  elements.gameContent.innerHTML = `
    <div class="word-card">
      <p class="game-label">Aktiver Spieler</p>
      <div class="big-word">${word}</div>
      <p class="note">Nur der aktive Spieler darf den Begriff sehen. Die Gruppe errät durch Körperbewegung, Mimik und Gesten.</p>
    </div>
  `;
}

function renderSoundGuess() {
  const word = pickReusableGenericItem('sound-guess', SOUND_WORDS);
  elements.gameContent.innerHTML = `
    <div class="word-card">
      <p class="game-label">Geräusch</p>
      <div class="big-word">${word}</div>
      <p class="note">Der Spieler ahmt nur das Geräusch nach – ohne das Wort auszusprechen.</p>
    </div>
  `;
}

function renderNumberGuess() {
  if (!state.currentGeneric || !state.currentGeneric.prompt) {
    const item = pickReusableGenericItem('number-guess', ESTIMATION_QUESTIONS);
    state.currentGeneric = { ...item, revealed: false };
  }

  const item = state.currentGeneric;
  const answerMarkup = item.revealed
    ? `
      <div class="result-card">
        <p class="game-label">Antwort</p>
        <div class="big-word">${item.answer}</div>
        <p class="note">${item.explanation}</p>
      </div>
    `
    : `
      <div class="result-card">
        <p class="game-label">Deine Schätzung</p>
        <p class="note">Gib deine Vermutung mündlich oder auf Papier ab. Anschließend wird die Antwort gezeigt.</p>
        <button type="button" class="reveal-btn" data-action="reveal-answer">Antwort zeigen</button>
      </div>
    `;

  elements.gameContent.innerHTML = `
    <div class="prompt-card">
      <p class="prompt-label">Frage</p>
      <h3>${item.prompt}</h3>
      ${answerMarkup}
    </div>
  `;
}

function renderGenericMode() {
  const modeMap = {
    'would-you-rather': { title: 'Wer würde eher ...?', description: 'Lesen, diskutieren und sofort entscheiden.', render: renderWouldYouRather },
    'either-or': { title: 'Entweder oder', description: 'Schnelle Auswahlfragen für die ganze Gruppe.', render: renderEitherOr },
    pantomime: { title: 'Pantomime', description: 'Ein Begriff nur durch Bewegung und Mimik erklären.', render: renderPantomime },
    'sound-guess': { title: 'Geräusche raten', description: 'Nur Klang, keine Worte.', render: renderSoundGuess },
    'number-guess': { title: 'Zahlen-Schätzung', description: 'Schätze und vergleiche danach die echte Antwort.', render: renderNumberGuess }
  };

  const config = modeMap[state.currentMode] || modeMap['would-you-rather'];
  elements.gameTitle.textContent = config.title;
  elements.gameDescription.textContent = config.description;
  config.render();
}

function startGame(modeId) {
  if (modeId === 'challenge') {
    generateChallengeTask();
    return;
  }

  state.currentMode = modeId;
  state.currentGeneric = null;
  renderGenericMode();
  showScreen('game-screen');
}

function bindEvents() {
  elements.modeGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode]');
    if (!button) {
      return;
    }

    startGame(button.dataset.mode);
  });

  elements.manageBtn.addEventListener('click', () => {
    setTaskFeedback('');
    showScreen('manage-screen');
  });

  elements.nextChallengeBtn.addEventListener('click', generateChallengeTask);
  elements.challengeBackBtn.addEventListener('click', () => {
    setGlobalStatus('');
    showScreen('home-screen');
  });

  elements.gameNextBtn.addEventListener('click', () => {
    if (state.currentMode === 'number-guess') {
      state.currentGeneric = null;
    }
    renderGenericMode();
  });

  elements.gameBackBtn.addEventListener('click', () => {
    setGlobalStatus('');
    showScreen('home-screen');
  });

  elements.taskForm.addEventListener('submit', addChallenge);
  elements.taskList.addEventListener('click', (event) => {
    const button = event.target.closest('.delete-btn');
    if (!button) {
      return;
    }

    deleteChallenge(button.dataset.taskId);
  });

  document.querySelectorAll('[data-setting]').forEach((button) => {
    button.addEventListener('click', () => {
      const setting = button.dataset.setting;
      if (setting === 'team-mode') {
        state.teamMode = !state.teamMode;
      } else {
        state.avoidRepeats = !state.avoidRepeats;
      }

      renderSettingsButtons();
      saveSettings();
    });
  });

  elements.manageBackBtn.addEventListener('click', () => {
    setTaskFeedback('');
    showScreen('home-screen');
  });

  elements.rulesButton.addEventListener('click', () => {
    elements.rulesDialog.showModal();
  });

  elements.imprintButton.addEventListener('click', () => {
    elements.imprintDialog.showModal();
  });

  document.querySelectorAll('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => {
      button.closest('dialog')?.close();
    });
  });

  elements.rulesDialog.addEventListener('click', (event) => {
    if (event.target === elements.rulesDialog) {
      elements.rulesDialog.close();
    }
  });

  elements.imprintDialog.addEventListener('click', (event) => {
    if (event.target === elements.imprintDialog) {
      elements.imprintDialog.close();
    }
  });

  elements.gameContent.addEventListener('click', (event) => {
    const revealButton = event.target.closest('[data-action="reveal-answer"]');
    if (!revealButton || !state.currentGeneric) {
      return;
    }

    state.currentGeneric.revealed = true;
    renderNumberGuess();
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Service worker registration is optional and fails on unsupported environments.
    });
  });
}

function init() {
  loadChallengeTasks();
  loadSettings();
  renderModeGrid();
  renderTaskList();
  renderSettingsButtons();
  bindEvents();
  registerServiceWorker();
  showScreen('home-screen');
}

init();

(() => {
  'use strict';

  const STORAGE_KEY = 'buzies-exam-progress-board-v1';
  const COURSE_OPTIONS = ['國語', '數學', '英語', '自然', '社會', '健康', '自修', '作文', '資訊', '體育', '國文', '英文', '生活'];
  const THEME_STYLE_OPTIONS = ['default', 'warm-journal', 'macaron', 'forest', 'retro-doodle', 'blue', 'sunlight', 'berry-twilight', 'mint-summer', 'milk-tea', 'blackboard', 'deep-ocean', 'midnight-violet', 'dark-espresso', 'cyber-night'];
  const LEGACY_THEME_STYLES = {
    lavender: 'default', peach: 'warm-journal', mint: 'forest', sky: 'blue',
    default: 'default', 'warm-journal': 'warm-journal', macaron: 'macaron', forest: 'forest', 'retro-doodle': 'retro-doodle', blue: 'blue',
    sunlight: 'sunlight', 'berry-twilight': 'berry-twilight', 'mint-summer': 'mint-summer', 'milk-tea': 'milk-tea', blackboard: 'blackboard'
  };
  const LEGACY_DEFAULT_SCHEDULE = [
    ['數學', '08:40', '09:20'], ['國語', '09:30', '10:10'], ['自然', '10:25', '11:05'],
    ['社會', '11:15', '11:55'], ['英語', '13:30', '14:10'], ['健康', '14:20', '15:00'], ['體育', '15:15', '15:55']
  ];
  const DEFAULT_EXAM_MESSAGES = [
    '請先確認姓名、班級和座號，再開始作答。',
    '仔細讀題，確認題目要問什麼，再下筆。',
    '遇到不會的題目先做記號，先完成會寫的題目。',
    '需要協助時請舉手，安靜等候老師前來。',
    '請專心作答，不玩文具、不和同學交談。',
    '完成後從頭檢查，確認每題都有作答，答案也填在正確位置。',
    '全部檢查完成後，請安靜坐好，等待考試結束。'
  ];
  const LEGACY_EXAM_MESSAGE_SETS = [
    ['考卷有不會的問題，等出題老師來了再問', '不要轉頭玩東西，寫完多檢查', '檢查完再檢查或趴下休息', '考試即將結束，檢查有沒有寫答案抄錯'],
    ['考卷有不會的問題，等出題老師來了再問', '不要玩文具，寫完多檢查', '檢查完再檢查或趴下休息', '考試即將結束，檢查有沒有寫答案抄錯']
  ];
  const LEGACY_BREAK_MESSAGES = ['等監考老師點完再離開座位下課', '利用下課準備下個科目與文具用品', '提早上廁所喝水'];
  const BPMF = {
    '廍':'ㄅㄨˋ','子':'ㄗˇ','國':'ㄍㄨㄛˊ','小':'ㄒㄧㄠˇ','段':'ㄉㄨㄢˋ','考':'ㄎㄠˇ','進':'ㄐㄧㄣˋ','度':'ㄉㄨˋ','看':'ㄎㄢˋ','板':'ㄅㄢˇ',
    '三':'ㄙㄢ','年':'ㄋㄧㄢˊ','二':'ㄦˋ','班':'ㄅㄢ','期':'ㄑㄧˊ','中':'ㄓㄨㄥ','定':'ㄉㄧㄥˋ','評':'ㄆㄧㄥˊ','量':'ㄌㄧㄤˋ',
    '目':'ㄇㄨˋ','前':'ㄑㄧㄢˊ','試':'ㄕˋ','數':'ㄕㄨˋ','學':'ㄒㄩㄝˊ','語':'ㄩˇ','英':'ㄧㄥ','自':'ㄗˋ','然':'ㄖㄢˊ','社':'ㄕㄜˋ','會':'ㄏㄨㄟˋ',
    '健':'ㄐㄧㄢˋ','康':'ㄎㄤ','修':'ㄒㄧㄡ','作':'ㄗㄨㄛˋ','文':'ㄨㄣˊ','資':'ㄗ','訊':'ㄒㄩㄣˋ','體':'ㄊㄧˇ','育':'ㄩˋ','生':'ㄕㄥ',
    '出':'ㄔㄨ','缺':'ㄑㄩㄝ','席':'ㄒㄧˊ','統':'ㄊㄨㄥˇ','計':'ㄐㄧˋ','應':'ㄧㄥ','到':'ㄉㄠˋ','實':'ㄕˊ','座':'ㄗㄨㄛˋ','號':'ㄏㄠˋ',
    '已':'ㄧˇ','結':'ㄐㄧㄝˊ','束':'ㄕㄨˋ','尚':'ㄕㄤˋ','未':'ㄨㄟˋ','開':'ㄎㄞ','始':'ㄕˇ','準':'ㄓㄨㄣˇ','備':'ㄅㄟˋ','流':'ㄌㄧㄡˊ',
    '程':'ㄔㄥˊ','今':'ㄐㄧㄣ','日':'ㄖˋ','還':'ㄏㄞˊ','沒':'ㄇㄟˊ','有':'ㄧㄡˇ','全':'ㄑㄩㄢˊ','部':'ㄅㄨˋ','辛':'ㄒㄧㄣ','苦':'ㄎㄨˇ',
    '了':'ㄌㄜ˙','距':'ㄐㄩˋ','離':'ㄌㄧˊ','本':'ㄅㄣˇ','節':'ㄐㄧㄝˊ','剩':'ㄕㄥˋ','餘':'ㄩˊ','分':'ㄈㄣ','鐘':'ㄓㄨㄥ','準':'ㄓㄨㄣˇ',
    '備':'ㄅㄟˋ','主':'ㄓㄨˇ','看':'ㄎㄢˋ','先':'ㄒㄧㄢ','前':'ㄑㄧㄢˊ','往':'ㄨㄤˇ','設':'ㄕㄜˋ','置':'ㄓˋ','本':'ㄅㄣˇ','節':'ㄐㄧㄝˊ',
    '第':'ㄉㄧˋ','行':'ㄒㄧㄥˊ','各':'ㄍㄜˋ','科':'ㄎㄜ','時':'ㄕˊ','間':'ㄐㄧㄢ','班':'ㄅㄢ','級':'ㄐㄧˊ','人':'ㄖㄣˊ','缺':'ㄑㄩㄝ',
    '考':'ㄎㄠˇ','進':'ㄐㄧㄣˋ','行':'ㄒㄧㄥˊ','課':'ㄎㄜˋ','試':'ㄕˋ','狀':'ㄓㄨㄤˋ','態':'ㄊㄞˋ','開':'ㄎㄞ','始':'ㄕˇ','名':'ㄇㄧㄥˊ',
    '稱':'ㄔㄥ','日':'ㄖˋ','期':'ㄑㄧˊ','手':'ㄕㄡˇ','動':'ㄉㄨㄥˋ','設':'ㄕㄜˋ','定':'ㄉㄧㄥˋ','班':'ㄅㄢ','級':'ㄐㄧˊ','與':'ㄩˇ',
    '數':'ㄕㄨˋ','字':'ㄗˋ','皆':'ㄐㄧㄝ','獨':'ㄉㄨˊ','立':'ㄌㄧˋ','輸':'ㄕㄨ','入':'ㄖㄨˋ','座':'ㄗㄨㄛˋ','不':'ㄅㄨˋ','自':'ㄗˋ',
    '動':'ㄉㄨㄥˋ','計':'ㄐㄧˋ','算':'ㄙㄨㄢˋ','使':'ㄕˇ','用':'ㄩㄥˋ','資':'ㄗ','料':'ㄌㄧㄠˋ','只':'ㄓˇ','保':'ㄅㄠˇ','存':'ㄘㄨㄣˊ',
    '目':'ㄇㄨˋ','瀏':'ㄌㄧㄡˊ','覽':'ㄌㄢˇ','器':'ㄑㄧˋ','換':'ㄏㄨㄢˋ','電':'ㄉㄧㄢˋ','腦':'ㄋㄠˇ','或':'ㄏㄨㄛˋ','其':'ㄑㄧˊ','他':'ㄊㄚ',
    '不':'ㄅㄨˋ','會':'ㄏㄨㄟˋ','同':'ㄊㄨㄥˊ','步':'ㄅㄨˋ','學':'ㄒㄩㄝˊ','姓':'ㄒㄧㄥˋ','私':'ㄙ','個':'ㄍㄜˋ','隱':'ㄧㄣˇ','加':'ㄐㄧㄚ',
    '請':'ㄑㄧㄥˇ','查':'ㄔㄚˊ','確':'ㄑㄩㄝˋ','認':'ㄖㄣˋ','提':'ㄊㄧˊ','醒':'ㄒㄧㄥˇ','儲':'ㄔㄨˊ','值':'ㄓˊ','失':'ㄕ','敗':'ㄅㄞˋ',
    '連':'ㄌㄧㄢˊ','接':'ㄐㄧㄝ','重':'ㄔㄨㄥˊ','疊':'ㄉㄧㄝˊ','尚':'ㄕㄤˋ','空':'ㄎㄨㄥ','白':'ㄅㄞˊ','清':'ㄑㄧㄥ','除':'ㄔㄨˊ',
    '彈':'ㄊㄢˊ','窗':'ㄔㄨㄤ','提':'ㄊㄧˊ','示':'ㄕˋ','音':'ㄧㄣ','樂':'ㄩㄝˋ','切':'ㄑㄧㄝ','換':'ㄏㄨㄢˋ','顯':'ㄒㄧㄢˇ','示':'ㄕˋ',
    '全':'ㄑㄩㄢˊ','螢':'ㄧㄥˊ','幕':'ㄇㄨˋ','依':'ㄧ','臺':'ㄊㄞˊ','灣':'ㄨㄢ','時':'ㄕˊ','區':'ㄑㄩ','顯':'ㄒㄧㄢˇ','示':'ㄕˋ',
    '已':'ㄧˇ','開':'ㄎㄞ','啟':'ㄑㄧˇ','靜':'ㄐㄧㄥˋ','音':'ㄧㄣ','測':'ㄘㄜˋ','測':'ㄘㄜˋ','柔':'ㄖㄡˊ','和':'ㄏㄜˊ','提':'ㄊㄧˊ',
    '示':'ㄕˋ','結':'ㄐㄧㄝˊ','束':'ㄕㄨˋ','測':'ㄘㄜˋ','試':'ㄕˋ','資':'ㄗ','料':'ㄌㄧㄠˋ','此':'ㄘˇ','螢':'ㄧㄥˊ','幕':'ㄇㄨˋ',
    '學':'ㄒㄩㄝˊ','校':'ㄒㄧㄠˋ','設':'ㄕㄜˋ','計':'ㄐㄧˋ','楊':'ㄧㄤˊ','依':'ㄧ','依':'ㄧ','老':'ㄌㄠˇ','師':'ㄕ','示':'ㄕˋ','範':'ㄈㄢˋ',
    '無':'ㄨˊ','示':'ㄕˋ','意':'ㄧˋ','時':'ㄕˊ','前':'ㄑㄧㄢˊ','進':'ㄐㄧㄣˋ','度':'ㄉㄨˋ','負':'ㄈㄨˋ','載':'ㄗㄞˋ','作':'ㄗㄨㄛˋ',
    '業':'ㄧㄝˋ','題':'ㄊㄧˊ','目':'ㄇㄨˋ','名':'ㄇㄧㄥˊ','重':'ㄔㄨㄥˊ','排':'ㄆㄞˊ','順':'ㄕㄨㄣˋ','序':'ㄒㄩˋ','上':'ㄕㄤˋ','下':'ㄒㄧㄚˋ',
    '新':'ㄒㄧㄣ','增':'ㄗㄥ','編':'ㄅㄧㄢ','輯':'ㄐㄧˊ','刪':'ㄕㄢ','除':'ㄔㄨˊ','儲':'ㄔㄨˊ','存':'ㄘㄨㄣˊ','請':'ㄑㄧㄥˇ','前':'ㄑㄧㄢˊ',
    '往':'ㄨㄤˇ','按':'ㄢˋ','月':'ㄩㄝˋ','課':'ㄎㄜˋ','第':'ㄉㄧˋ','尚':'ㄕㄤˋ','未':'ㄨㄟˋ','準':'ㄓㄨㄣˇ','備':'ㄅㄟˋ','看':'ㄎㄢˋ',
    '板':'ㄅㄢˇ','國':'ㄍㄨㄛˊ','字':'ㄗˋ','注':'ㄓㄨˋ','注':'ㄓㄨˋ','注':'ㄓㄨˋ','音':'ㄧㄣ','統':'ㄊㄨㄥˇ','整':'ㄓㄥˇ','項':'ㄒㄧㄤˋ',
    '目':'ㄇㄨˋ','存':'ㄘㄨㄣˊ','恢':'ㄏㄨㄟ','復':'ㄈㄨˋ','預':'ㄩˋ','設':'ㄕㄜˋ','值':'ㄓˊ','取消':'ㄑㄩˇ ㄒㄧㄠ','重':'ㄔㄨㄥˊ','設':'ㄕㄜˋ'
  };

  const DEFAULT_CONFIG = () => ({
    schoolName: '廍子國小', className: '三年二班', classSize: 27, expected: 27, actual: 27, absentSeats: '',
    examTitle: '期中定期評量', examDate: taipeiDate(), soundEnabled: false, showBopomofo: false,
    themeStyle: 'default',
    subjects: [...COURSE_OPTIONS],
    reminders: {
      examInterval: 5,
      breakInterval: 2,
      examMessages: [...DEFAULT_EXAM_MESSAGES],
      breakMessages: ['喝水休息上廁所，有時間請複習下一節的考試科目']
    },
    schedule: [
      { id: uid(), subject: '國語', start: '08:40', end: '09:20' },
      { id: uid(), subject: '英語', start: '09:30', end: '10:10' },
      { id: uid(), subject: '自然', start: '10:25', end: '11:05' }
    ]
  });

  const $ = (selector, root = document) => root.querySelector(selector);
  const app = $('#examApp');
  const drawer = $('#settingsDrawer');
  const backdrop = $('#settingsBackdrop');
  const form = $('#settingsForm');
  const rowEditor = $('#scheduleEditor');
  const timeEditor = $('#timeSettingsEditor');
  const examAudio = $('#examAudio');
  const examAudioFileInput = $('#examAudioFile');
  let config = loadConfig();
  let lastScheduleStates = null;
  let audioContext = null;
  let examAudioObjectUrl = '';
  let examAudioFileName = '';
  let audioSeekPreview = null;
  let resizeCloseTimer = null;
  let reminderRotation = { phase: '', signature: '', index: 0, nextAt: 0 };
  let activeReminderText = '';
  let activeReminderAnnotation = null;
  let bopomofoFontReady = false;
  const drawerSwitchDirty = { showBopomofo: false, soundEnabled: false };

  function uid() { return `exam-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  function taipeiParts(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23' }).formatToParts(date);
    return Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  }
  function taipeiDate(date = new Date()) { const p = taipeiParts(date); return `${p.year}-${p.month}-${p.day}`; }
  function isLegacyDefaultSchedule(schedule) {
    if (!Array.isArray(schedule) || schedule.length !== LEGACY_DEFAULT_SCHEDULE.length) return false;
    const matchesPreviousRows = LEGACY_DEFAULT_SCHEDULE.slice(0, -1).every(([subject, start, end], index) => schedule[index]?.subject === subject && schedule[index]?.start === start && schedule[index]?.end === end);
    const last = schedule[LEGACY_DEFAULT_SCHEDULE.length - 1];
    return matchesPreviousRows && last?.start === '15:15' && last?.end === '15:55' && COURSE_OPTIONS.includes(last?.subject);
  }
  function loadConfig() {
    const fallback = DEFAULT_CONFIG();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return fallback;
      const parsed = JSON.parse(stored);
      const migrateLegacySchedule = parsed && typeof parsed === 'object' && !Array.isArray(parsed) && isLegacyDefaultSchedule(parsed.schedule);
      const normalized = normalizeConfig(parsed, fallback);
      if (migrateLegacySchedule) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, schedule: normalized.schedule })); } catch (error) { /* Keep the normalized three-course view even if storage is unavailable. */ }
      }
      return normalized;
    } catch (error) {
      return fallback;
    }
  }
  function normalizeConfig(value, fallback = DEFAULT_CONFIG()) {
    const safe = value && typeof value === 'object' ? value : {};
    const savedSchedule = Array.isArray(safe.schedule) ? safe.schedule.filter((item) => item && typeof item === 'object').map((item) => ({ id: String(item.id || uid()), subject: String(item.subject ?? ''), start: String(item.start ?? ''), end: String(item.end ?? '') })) : fallback.schedule;
    const schedule = isLegacyDefaultSchedule(savedSchedule) ? fallback.schedule : savedSchedule;
    const reminderData = safe.reminders && typeof safe.reminders === 'object' ? safe.reminders : {};
    const savedExamMessages = normalizeLineList(reminderData.examMessages ?? fallback.reminders.examMessages, fallback.reminders.examMessages);
    const usesOldDefaultExamMessages = LEGACY_EXAM_MESSAGE_SETS.some((oldMessages) => oldMessages.length === savedExamMessages.length && oldMessages.every((message, index) => message === savedExamMessages[index]));
    const savedBreakMessages = normalizeLineList(reminderData.breakMessages ?? fallback.reminders.breakMessages, fallback.reminders.breakMessages);
    const usesOldDefaultBreakMessages = LEGACY_BREAK_MESSAGES.length === savedBreakMessages.length && LEGACY_BREAK_MESSAGES.every((message, index) => message === savedBreakMessages[index]);
    return {
      schoolName: '廍子國小',
      className: typeof safe.className === 'string' ? safe.className : fallback.className,
      classSize: safe.classSize ?? fallback.classSize,
      expected: safe.expected ?? fallback.expected,
      actual: safe.actual ?? fallback.actual,
      absentSeats: typeof safe.absentSeats === 'string' ? safe.absentSeats : fallback.absentSeats,
      examTitle: typeof safe.examTitle === 'string' ? safe.examTitle : fallback.examTitle,
      examDate: typeof safe.examDate === 'string' ? safe.examDate : fallback.examDate,
      themeStyle: THEME_STYLE_OPTIONS.includes(safe.themeStyle) ? safe.themeStyle : (LEGACY_THEME_STYLES[safe.themeStyle] || LEGACY_THEME_STYLES[safe.theme] || fallback.themeStyle),
      soundEnabled: safe.soundEnabled === true,
      showBopomofo: typeof safe.showBopomofo === 'boolean' ? safe.showBopomofo : fallback.showBopomofo,
      subjects: normalizeLineList(safe.subjects ?? fallback.subjects, fallback.subjects),
      reminders: {
        examInterval: normalizeReminderInterval(reminderData.examInterval, fallback.reminders.examInterval),
        breakInterval: normalizeReminderInterval(reminderData.breakInterval, fallback.reminders.breakInterval),
        examMessages: usesOldDefaultExamMessages ? [...DEFAULT_EXAM_MESSAGES] : savedExamMessages,
        breakMessages: usesOldDefaultBreakMessages ? [...fallback.reminders.breakMessages] : savedBreakMessages
      },
      _isDemo: safe._isDemo === true,
      schedule
    };
  }
  function normalizeLineList(value, fallback = []) {
    const source = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/\r?\n/) : fallback;
    return [...new Set(source.map((item) => String(item).trim()).filter(Boolean))].slice(0, 80);
  }
  function normalizeReminderInterval(value, fallback) {
    const interval = Number(value);
    return Number.isInteger(interval) && interval >= 1 && interval <= 120 ? interval : fallback;
  }
  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (error) {
      announce('瀏覽器無法保存設定，請檢查儲存空間或瀏覽器隱私設定。');
      return false;
    }
  }
  function applyTheme() { document.documentElement.dataset.theme = config.themeStyle; }
  function announce(message) { $('#liveAnnouncer').textContent = message; }
  function formatMediaTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
    const wholeSeconds = Math.floor(seconds);
    const minutes = Math.floor(wholeSeconds / 60);
    const remainder = String(wholeSeconds % 60).padStart(2, '0');
    if (minutes < 60) return `${minutes}:${remainder}`;
    return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${remainder}`;
  }
  function updateExamAudioProgress() {
    const slider = $('#audioSeek');
    const duration = examAudio.duration;
    const seekable = Boolean(examAudioObjectUrl) && Number.isFinite(duration) && duration > 0;
    $('#audioProgress').hidden = !examAudioObjectUrl;
    slider.disabled = !seekable;
    if (!seekable) {
      slider.value = '0';
      $('#audioElapsed').textContent = formatMediaTime(examAudio.currentTime || 0);
      $('#audioDuration').textContent = '--:--';
      slider.setAttribute('aria-valuetext', '0:00 / --:--');
      return;
    }
    const fraction = audioSeekPreview ?? Math.max(0, Math.min(1, examAudio.currentTime / duration));
    if (audioSeekPreview === null) slider.value = String(Math.round(fraction * 1000));
    const elapsedText = formatMediaTime(fraction * duration);
    const durationText = formatMediaTime(duration);
    $('#audioElapsed').textContent = elapsedText;
    $('#audioDuration').textContent = durationText;
    slider.setAttribute('aria-valuetext', `${elapsedText} / ${durationText}`);
  }
  function updateExamAudioControls() {
    const available = Boolean(examAudioObjectUrl);
    const playing = available && !examAudio.paused && !examAudio.ended;
    const studentButton = $('#studentAudioButton');
    const drawerButton = $('#drawerAudioButton');
    studentButton.hidden = !available;
    studentButton.textContent = playing ? '⏸ 暫停聽力' : '▶ 播放英語聽力';
    studentButton.setAttribute('aria-pressed', String(playing));
    drawerButton.disabled = !available;
    drawerButton.textContent = playing ? '⏸ 暫停音檔' : '▶ 預聽音檔';
    $('#clearAudioButton').disabled = !available;
    $('#audioFileStatus').textContent = available ? `已附加：${examAudioFileName}（僅本次頁面暫存）` : '尚未選取音檔。';
    updateExamAudioProgress();
  }
  function clearExamAudio({ resetPicker = false } = {}) {
    examAudio.pause();
    examAudio.removeAttribute('src');
    examAudio.load();
    if (examAudioObjectUrl) URL.revokeObjectURL(examAudioObjectUrl);
    examAudioObjectUrl = '';
    examAudioFileName = '';
    audioSeekPreview = null;
    if (resetPicker) examAudioFileInput.value = '';
    updateExamAudioControls();
  }
  function attachExamAudio(file) {
    if (!file) return;
    const isMp3 = file.name.toLowerCase().endsWith('.mp3') || ['audio/mpeg', 'audio/mp3'].includes(file.type);
    if (!isMp3) {
      examAudioFileInput.value = '';
      announce('請選擇 MP3 音檔。');
      return;
    }
    clearExamAudio();
    try {
      examAudioObjectUrl = URL.createObjectURL(file);
      examAudioFileName = file.name;
      audioSeekPreview = null;
      examAudio.src = examAudioObjectUrl;
      examAudio.load();
      updateExamAudioControls();
      announce(`已附加 ${file.name}，可在學生畫面按播放英語聽力。`);
    } catch (error) {
      clearExamAudio({ resetPicker: true });
      announce('無法讀取這個音檔，請重新選取 MP3 檔案。');
    }
  }
  async function toggleExamAudio() {
    if (!examAudioObjectUrl) { announce('請先在教師設定中選取 MP3 音檔。'); return; }
    try {
      if (examAudio.paused || examAudio.ended) await examAudio.play();
      else examAudio.pause();
      updateExamAudioControls();
    } catch (error) {
      announce('音檔無法播放，請確認檔案格式與裝置音量。');
    }
  }
  function textWithBopomofo(text) {
    const fragment = document.createDocumentFragment();
    for (const char of String(text)) {
      const isHan = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(char);
      const reading = isHan ? BPMF[char] : '';
      const tone = reading?.match(/[˙ˊˇˋ]$/)?.[0] || '';
      const symbols = tone ? reading.slice(0, -tone.length) : reading;
      if (!symbols || !/^[ㄅ-ㄩ]+$/.test(symbols)) {
        fragment.append(document.createTextNode(char));
        continue;
      }
      const syllable = document.createElement('span');
      syllable.className = 'zhuyin-char';
      const base = document.createElement('span');
      base.className = 'zhuyin-base';
      base.textContent = char;
      const note = document.createElement('span');
      note.className = 'zhuyin-reading';
      const noteSymbols = document.createElement('span');
      noteSymbols.className = 'zhuyin-symbols';
      noteSymbols.textContent = symbols;
      note.append(noteSymbols);
      if (tone) {
        const toneMark = document.createElement('span');
        toneMark.className = `zhuyin-tone${tone === '˙' ? ' is-neutral' : ''}`;
        toneMark.textContent = tone;
        note.append(toneMark);
      }
      note.setAttribute('aria-hidden', 'true');
      syllable.append(base, note);
      fragment.append(syllable);
    }
    return fragment;
  }
  function setAnnotatedText(element, text, annotate = config.showBopomofo) {
    const value = String(text);
    const studentFacing = $('#boardMain').contains(element);
    const useBopomofo = annotate && studentFacing;
    const renderer = useBopomofo ? (bopomofoFontReady ? 'font' : 'fallback') : 'plain';
    if (element.dataset.annotationRenderer === renderer && element.dataset.plainText === value) return;
    element.dataset.annotationRenderer = renderer;
    element.dataset.plainText = value;
    element.classList.toggle('bpmf-font-text', useBopomofo && bopomofoFontReady);
    element.replaceChildren(useBopomofo && !bopomofoFontReady ? textWithBopomofo(value) : document.createTextNode(value));
    element.setAttribute('aria-label', value);
  }
  function updateStaticAnnotations() {
    const entries = [
      ['schoolLabel', config.schoolName], ['classNameDisplay', config.className],
      ['heroClassLabel', `${config.schoolName}・${config.className}`], ['examTitleDisplay', config.examTitle],
      ['attendanceHeading', '學生出缺席統計'], ['scheduleHeading', '今日考試流程'],
      ['independentNote', '數字由教師分別輸入；座號不參與人數計算。']
    ];
    setAnnotatedText($('.brand-lockup h1'), '段考進度看板');
    entries.forEach(([id, text]) => setAnnotatedText($(`#${id}`), text));
    document.querySelectorAll('.current-tag, .schedule-table thead th').forEach((label) => {
      if (!label.dataset.plainText) label.dataset.plainText = label.textContent;
      setAnnotatedText(label, label.dataset.plainText);
    });
    document.querySelectorAll('.stat-label').forEach((label) => {
      if (!label.dataset.plainText) label.dataset.plainText = label.textContent;
      setAnnotatedText(label, label.dataset.plainText);
    });
    document.body.classList.toggle('show-bopomofo', config.showBopomofo);
    $('#zhuyinToggle').setAttribute('aria-pressed', String(config.showBopomofo));
    $('#zhuyinState').textContent = config.showBopomofo ? '開' : '關';
    syncDrawerSwitches();
  }
  function updateClock(now = new Date()) {
    const p = taipeiParts(now);
    $('#clockDisplay').textContent = `${p.hour}:${p.minute}:${p.second}`;
    const dateLabel = new Intl.DateTimeFormat('zh-TW', { timeZone:'Asia/Taipei', year:'numeric', month:'2-digit', day:'2-digit', weekday:'long' }).format(now);
    setAnnotatedText($('#dateDisplay'), dateLabel);
    setAnnotatedText($('#scheduleDate'), config.examDate === taipeiDate(now) ? '今日考程' : formatDate(config.examDate));
  }
  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '日期未設定';
    const [year, month, day] = value.split('-');
    return `${year}/${month}/${day}`;
  }
  function formatTaipeiExamDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '尚未設定評量日期';
    const [year, month, day] = value.split('-');
    return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
  }
  function timeMinutes(value) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }
  function examEpoch(date, time) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || timeMinutes(time) === null) return NaN;
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    return Date.UTC(year, month - 1, day, hours - 8, minutes, 0);
  }
  function validatedSchedule() {
    const scheduled = config.schedule.map((item, index) => ({ ...item, index, startMinute: timeMinutes(item.start), endMinute: timeMinutes(item.end) }));
    const errors = [];
    scheduled.forEach((item) => {
      const number = item.index + 1;
      if (!item.subject.trim()) errors.push(`第 ${number} 節尚未填寫科目。`);
      if (item.startMinute === null) errors.push(`第 ${number} 節缺少有效的開始時間。`);
      if (item.endMinute === null) errors.push(`第 ${number} 節缺少有效的結束時間。`);
      if (item.startMinute !== null && item.endMinute !== null && item.endMinute <= item.startMinute) errors.push(`第 ${number} 節的結束時間必須晚於開始時間。`);
    });
    const sorted = [...scheduled].filter((item) => item.startMinute !== null && item.endMinute !== null && item.endMinute > item.startMinute).sort((a, b) => a.startMinute - b.startMinute || a.endMinute - b.endMinute);
    let previous = null;
    for (const current of sorted) {
      if (previous && current.startMinute < previous.endMinute) errors.push(`第 ${previous.index + 1} 節與第 ${current.index + 1} 節時間重疊，請調整其中一節。`);
      if (!previous || current.endMinute > previous.endMinute) previous = current;
    }
    return { sorted, errors };
  }
  function currentStatus(now = new Date()) {
    const { sorted, errors } = validatedSchedule();
    const nowMs = now instanceof Date ? now.getTime() : Number(now);
    const nowDate = new Date(nowMs);
    const clock = taipeiParts(nowDate);
    const today = `${clock.year}-${clock.month}-${clock.day}`;
    const secondsOfDay = Number(clock.hour) * 3600 + Number(clock.minute) * 60 + Number(clock.second);
    const timing = { nowMs, today, secondsOfDay };
    if (!config.schedule.length) return { kind: 'empty', sorted: [], current: null, errors, ...timing };
    if (errors.length) return { kind: 'invalid', sorted, current: null, errors, ...timing };
    const day = config.examDate;
    if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return { kind: 'invalid', sorted, current: null, errors: ['請先設定有效的評量日期。'], ...timing };
    if (day > today) return { kind: 'future', sorted, current: sorted[0], next: sorted[0], errors, ...timing };
    if (day < today) return { kind: 'past', sorted, current: sorted[sorted.length - 1], next: null, errors, ...timing };
    const currentExam = sorted.find((item) => secondsOfDay >= item.startMinute * 60 && secondsOfDay < item.endMinute * 60);
    const nextExam = sorted.find((item) => secondsOfDay < item.startMinute * 60);
    if (currentExam) return { kind: 'running', sorted, current: currentExam, next: null, errors, ...timing };
    if (nextExam) return { kind: 'upcoming', sorted, current: nextExam, next: nextExam, errors, ...timing };
    return { kind: 'complete', sorted, current: sorted[sorted.length - 1], next: null, errors, ...timing };
  }
  function formatDuration(ms) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    return hours > 0 ? `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(remainder).padStart(2,'0')}` : `${String(minutes).padStart(2,'0')}:${String(remainder).padStart(2,'0')}`;
  }
  function rotatingReminder(status, now = Date.now()) {
    const isBetweenExams = status.kind === 'upcoming' && status.sorted.some((item) => item.endMinute * 60 <= status.secondsOfDay);
    const phase = status.kind === 'running' ? 'exam' : isBetweenExams ? 'break' : '';
    if (!phase) { reminderRotation = { phase: '', signature: '', index: 0, nextAt: 0 }; return ''; }
    const messages = phase === 'exam' ? config.reminders.examMessages : config.reminders.breakMessages;
    if (!messages.length) { reminderRotation = { phase, signature: '', index: 0, nextAt: 0 }; return ''; }
    const interval = phase === 'exam' ? config.reminders.examInterval : config.reminders.breakInterval;
    const signature = `${interval}\u0000${messages.join('\u0000')}`;
    if (reminderRotation.phase !== phase || reminderRotation.signature !== signature) {
      reminderRotation = { phase, signature, index: 0, nextAt: now + interval * 60_000 };
    } else if (now >= reminderRotation.nextAt) {
      reminderRotation.index = (reminderRotation.index + 1) % messages.length;
      reminderRotation.nextAt = now + interval * 60_000;
    }
    return messages[reminderRotation.index] || '';
  }
  function renderBoard(now = new Date()) {
    updateStaticAnnotations();
    const className = config.className.trim() || '班級名稱未設定';
    setAnnotatedText($('#classNameDisplay'), className);
    setAnnotatedText($('#heroClassLabel'), `${config.schoolName}・${className}`);
    setAnnotatedText($('#examTitleDisplay'), config.examTitle.trim() || '評量名稱未設定');
    setAnnotatedText($('#examDateDisplay'), `${formatTaipeiExamDate(config.examDate)}　・　${config._isDemo ? '示範資料，請依實際考程調整' : '評量日期'}`);
    renderAttendanceCount($('#classCountDisplay'), config.classSize);
    renderAttendanceCount($('#expectedCountDisplay'), config.expected);
    renderAttendanceCount($('#actualCountDisplay'), config.actual);
    $('#absentSeatsDisplay').textContent = displayAbsentSeats(config.absentSeats);
    $('#classCountDisplay').setAttribute('aria-label', `班級人數 ${config.classSize} 人`);
    $('#expectedCountDisplay').setAttribute('aria-label', `應到 ${config.expected} 人`);
    $('#actualCountDisplay').setAttribute('aria-label', `實到 ${config.actual} 人`);
    $('#absentSeatsDisplay').setAttribute('aria-label', `缺席座號 ${displayAbsentSeats(config.absentSeats)}`);
    $('#soundToggle').setAttribute('aria-pressed', String(config.soundEnabled));
    $('#soundIcon').textContent = config.soundEnabled ? '🔔' : '🔕';
    $('#soundState').textContent = config.soundEnabled ? '音效開' : '靜音';
    updateClock(now);
    const status = currentStatus(now);
    renderCurrentExam(status);
    renderSchedule(status);
    const countWarning = [];
    if (Number(config.expected) > Number(config.classSize)) countWarning.push('應到人數高於班級人數');
    if (Number(config.actual) > Number(config.classSize)) countWarning.push('實到人數高於班級人數');
    if (Number(config.actual) > Number(config.expected)) countWarning.push('實到人數高於應到人數');
    $('#independentNote').textContent = countWarning.length ? `請教師確認：${countWarning.join('；')}。各欄仍獨立保存。` : '數字由教師分別輸入；座號不參與人數計算。';
    setAnnotatedText($('#independentNote'), $('#independentNote').textContent);
    setAnnotatedText($('#attendanceHeading'), '學生出缺席統計');
    setAnnotatedText($('#scheduleHeading'), '今日考試流程');
  }
  function displayAbsentSeats(text) {
    const trimmed = String(text || '').trim();
    return trimmed ? trimmed.split(/[\s,，、]+/).filter(Boolean).join('、') : '—';
  }
  function renderAttendanceCount(element, value) {
    let number = element.firstChild;
    let unit = element.querySelector('span');
    if (number?.nodeType !== Node.TEXT_NODE || !unit) {
      number = document.createTextNode('');
      unit = document.createElement('span');
      element.replaceChildren(number, unit);
    }
    number.nodeValue = String(value);
    setAnnotatedText(unit, '人');
  }
  function renderCurrentExam(status) {
    const heading = $('#currentSubject');
    const current = status.current;
    const statusLine = $('.status-line');
    statusLine.className = 'status-line';
    $('#completionMessage').hidden = true;
    $('#currentTimeRange').textContent = current ? `${current.start || '--:--'} – ${current.end || '--:--'}` : '—';
    $('#progressStart').textContent = current?.start || '--:--';
    $('#progressEnd').textContent = current?.end || '--:--';
    let stateText = '準備中';
    let detail = '';
    let progress = 0;
    let progressText = '等待考試';
    let message = '';
    if (status.kind === 'empty') {
      setAnnotatedText(heading, '尚未設定考科');
      stateText = '準備中'; detail = '請先新增今天的考程'; message = '前往右側設定新增考試科目與時間。';
    } else if (status.kind === 'invalid') {
      setAnnotatedText(heading, current?.subject || '考程需要確認');
      stateText = '考程需要確認'; detail = '請檢查設定中的日期與考程';
      message = status.errors[0] || '請檢查考程設定。';
    } else {
      setAnnotatedText(heading, current?.subject || '尚未設定考科');
      const start = examEpoch(config.examDate, current.start);
      const end = examEpoch(config.examDate, current.end);
      const now = status.nowMs;
      if (status.kind === 'running') {
        stateText = '考試進行中'; statusLine.classList.add('is-running');
        const remaining = end - now;
        detail = `剩餘 ${formatDuration(remaining)}`;
        progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
        progressText = `考試進行中　・　${Math.floor(progress)}%`;
      } else if (status.kind === 'upcoming' || status.kind === 'future') {
        stateText = '準備中'; statusLine.classList.add('is-upcoming');
        detail = status.kind === 'future' ? `${formatDate(config.examDate)} 開始` : `距離開始 ${formatDuration(start - now)}`;
        progressText = '尚未開始';
      } else if (status.kind === 'past' || status.kind === 'complete') {
        stateText = '本節考試結束'; statusLine.classList.add('is-ended'); progress = 100; progressText = '本節已結束';
        message = status.kind === 'complete'
          ? '目前設定的考程已結束；若仍在考試，請調整最後一節的結束時間。'
          : '評量日期已過，考程已結束。';
        if (status.kind === 'complete') $('#completionMessage').hidden = false;
      }
    }
    setAnnotatedText($('#examStatus'), stateText);
    setAnnotatedText($('#statusDetail'), detail);
    $('#progressFill').style.width = `${progress}%`;
    $('#progressPercent').textContent = `${Math.floor(progress)}%`;
    $('#progressTrack').setAttribute('aria-valuenow', String(Math.floor(progress)));
    setAnnotatedText($('#progressLabel'), progressText);
    if (message) {
      const target = status.kind === 'complete' || status.kind === 'past' ? $('#completionMessage') : $('#statusDetail');
      setAnnotatedText(target, message);
    }
    const reminder = rotatingReminder(status);
    if (reminder) {
      if (reminder !== activeReminderText || activeReminderAnnotation !== config.showBopomofo) {
        setAnnotatedText($('#reminderMessage'), reminder);
        activeReminderAnnotation = config.showBopomofo;
      }
      activeReminderText = reminder;
      $('#reminderMessage').hidden = false;
    } else {
      activeReminderText = '';
      activeReminderAnnotation = null;
      $('#reminderMessage').hidden = true;
    }
  }
  function renderSchedule(status) {
    const empty = !config.schedule.length;
    $('#scheduleEmpty').hidden = !empty;
    $('#scheduleTableWrap').hidden = empty;
    const tbody = $('#scheduleRows');
    tbody.replaceChildren();
    const today = status.today;
    const valid = !status.errors.length;
    const items = [...status.sorted];
    items.forEach((item, index) => {
      let rowKind = '';
      let label = '尚未開始';
      let icon = '◷';
      if (valid && config.examDate < today) { rowKind = 'is-ended'; label = '已結束'; icon = '✓'; }
      else if (valid && config.examDate === today) {
        if (status.secondsOfDay >= item.endMinute * 60) { rowKind = 'is-ended'; label = '已結束'; icon = '✓'; }
        else if (status.secondsOfDay >= item.startMinute * 60) { rowKind = 'is-current'; label = '考試進行中'; icon = '▶'; }
      } else if (valid && config.examDate > today && index === 0) label = '尚未開始';
      const row = document.createElement('tr');
      if (rowKind) row.classList.add(rowKind);
      const period = document.createElement('td'); setAnnotatedText(period, `第 ${index + 1} 節`);
      const subject = document.createElement('td'); setAnnotatedText(subject, item.subject);
      const time = document.createElement('td'); time.textContent = `${item.start}–${item.end}`;
      const state = document.createElement('td'); const chip = document.createElement('span'); chip.className = `schedule-status${rowKind ? ` ${rowKind}` : ''}`; setAnnotatedText(chip, `${icon} ${label}`);
      state.append(chip); row.append(period, subject, time, state); tbody.append(row);
    });
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  }
  function setFormFromConfig() {
    $('#classNameInput').value = config.className;
    $('#classSizeInput').value = config.classSize;
    $('#expectedInput').value = config.expected;
    $('#actualInput').value = config.actual;
    $('#absentInput').value = config.absentSeats;
    $('#examTitleInput').value = config.examTitle;
    $('#examDateInput').value = config.examDate;
    $('#themeStyleInput').value = config.themeStyle;
    applyTheme();
    $('#drawerSoundToggle').checked = config.soundEnabled;
    $('#drawerZhuyinToggle').checked = config.showBopomofo;
    $('#subjectListInput').value = config.subjects.join('\n');
    $('#examReminderIntervalInput').value = config.reminders.examInterval;
    $('#breakReminderIntervalInput').value = config.reminders.breakInterval;
    $('#examReminderInput').value = config.reminders.examMessages.join('\n');
    $('#breakReminderInput').value = config.reminders.breakMessages.join('\n');
    renderScheduleEditor(config.schedule);
    drawerSwitchDirty.showBopomofo = false;
    drawerSwitchDirty.soundEnabled = false;
  }
  function syncDrawerSwitches() {
    if (!drawerSwitchDirty.showBopomofo) $('#drawerZhuyinToggle').checked = config.showBopomofo;
    if (!drawerSwitchDirty.soundEnabled) $('#drawerSoundToggle').checked = config.soundEnabled;
  }
  function renderScheduleEditor(items = config.schedule) {
    rowEditor.replaceChildren();
    timeEditor.replaceChildren();
    const subjectOptions = normalizeLineList($('#subjectListInput').value, config.subjects);
    items.forEach((item, index) => {
      const id = item.id || uid();
      const timeRow = document.createElement('fieldset'); timeRow.className = 'schedule-edit-row time-edit-row'; timeRow.dataset.id = id;
      const timeLegend = document.createElement('legend'); timeLegend.className = 'schedule-edit-top'; timeLegend.textContent = `第 ${index + 1} 節`;
      const timeFields = document.createElement('div'); timeFields.className = 'time-settings-fields';
      [['開始', 'start', item.start], ['結束', 'end', item.end]].forEach(([labelText, fieldName, value]) => {
        const label = document.createElement('label'); label.textContent = labelText;
        const input = document.createElement('input'); input.type = 'time'; input.value = value || ''; input.dataset.field = fieldName; input.setAttribute('aria-label', `第 ${index + 1} 節${labelText}時間`);
        label.append(input); timeFields.append(label);
      });
      timeRow.append(timeLegend, timeFields); timeEditor.append(timeRow);

      const row = document.createElement('fieldset'); row.className = 'schedule-edit-row subject-edit-row'; row.dataset.index = String(index); row.dataset.id = id;
      const legend = document.createElement('legend'); legend.className = 'schedule-edit-top';
      const label = document.createElement('span'); label.textContent = `第 ${index + 1} 節`;
      const actions = document.createElement('span'); actions.className = 'schedule-row-actions';
      const up = makeIconButton('↑', `第 ${index + 1} 節上移`); up.disabled = index === 0; up.addEventListener('click', () => moveSchedule(index, -1));
      const down = makeIconButton('↓', `第 ${index + 1} 節下移`); down.disabled = index === items.length - 1; down.addEventListener('click', () => moveSchedule(index, 1));
      const remove = makeIconButton('×', `刪除第 ${index + 1} 節`, 'delete-row'); remove.addEventListener('click', () => { const rows = readScheduleEditor(); rows.splice(index, 1); renderScheduleEditor(rows); });
      actions.append(up, down, remove); legend.append(label, actions); row.append(legend);
      const fields = document.createElement('div'); fields.className = 'subject-settings-fields';
      const subjectLabel = document.createElement('label'); subjectLabel.textContent = '科目';
      const subject = document.createElement('select'); subject.setAttribute('aria-label', `第 ${index + 1} 節科目`); subject.dataset.field = 'subject';
      const placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = '請選擇科目'; subject.append(placeholder);
      if (item.subject && !subjectOptions.includes(item.subject)) {
        const existing = document.createElement('option'); existing.value = item.subject; existing.textContent = `${item.subject}（清單外既有科目）`; subject.append(existing);
      }
      subjectOptions.forEach((subjectName) => { const option = document.createElement('option'); option.value = subjectName; option.textContent = subjectName; subject.append(option); });
      subject.value = item.subject || '';
      subjectLabel.append(subject); fields.append(subjectLabel); row.append(fields); rowEditor.append(row);
    });
  }
  function makeIconButton(label, accessibleName, extraClass = '') {
    const button = document.createElement('button'); button.type = 'button'; button.className = `icon-button ${extraClass}`.trim(); button.textContent = label; button.setAttribute('aria-label', accessibleName); return button;
  }
  function readScheduleEditor() {
    const timesById = new Map([...timeEditor.querySelectorAll('.time-edit-row')].map((row) => [row.dataset.id, row]));
    return [...rowEditor.querySelectorAll('.subject-edit-row')].map((row) => {
      const timeRow = timesById.get(row.dataset.id);
      return {
        id: row.dataset.id || uid(),
        subject: row.querySelector('[data-field="subject"]').value.trim(),
        start: timeRow?.querySelector('[data-field="start"]').value || '',
        end: timeRow?.querySelector('[data-field="end"]').value || ''
      };
    });
  }
  function moveSchedule(index, offset) {
    const rows = readScheduleEditor();
    const target = index + offset;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target], rows[index]];
    renderScheduleEditor(rows);
  }
  function openDrawer() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    setFormFromConfig();
    app.classList.remove('drawer-closed');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false'); drawer.inert = false;
    backdrop.hidden = false;
    $('#settingsOpen').setAttribute('aria-expanded', 'true');
    $('#settingsClose').focus({ preventScroll: true });
  }
  function closeDrawer() {
    applyTheme();
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true;
    app.classList.add('drawer-closed');
    backdrop.hidden = true; $('#settingsOpen').setAttribute('aria-expanded', 'false');
  }
  function parseNonnegativeInteger(id, label) {
    const input = $(`#${id}`); const raw = input.value.trim();
    input.classList.remove('form-invalid');
    if (!raw) { input.classList.add('form-invalid'); return { error: `${label}欄位不可空白。` }; }
    const value = Number(raw);
    if (!Number.isInteger(value) || value < 0) { input.classList.add('form-invalid'); return { error: `${label}必須是 0 或正整數。` }; }
    return { value };
  }
  function parseBoundedInteger(id, label, minimum, maximum) {
    const input = $(`#${id}`); const raw = input.value.trim();
    input.classList.remove('form-invalid');
    if (!raw) { input.classList.add('form-invalid'); return { error: `${label}欄位不可空白。` }; }
    const value = Number(raw);
    if (!Number.isInteger(value) || value < minimum || value > maximum) {
      input.classList.add('form-invalid'); return { error: `${label}請輸入 ${minimum} 至 ${maximum} 的整數。` };
    }
    return { value };
  }
  function absentSeatWarning(raw) {
    const value = raw.trim();
    if (!value) return '';
    const tokens = value.split(/[\s,，、]+/).filter(Boolean);
    const invalid = tokens.filter((token) => !/^\d{1,3}$/.test(token) || Number(token) < 1);
    const duplicates = tokens.filter((token, index) => tokens.findIndex((candidate) => Number(candidate) === Number(token)) !== index);
    if (invalid.length) return `缺席座號「${invalid.join('、')}」格式需為 1–3 位數字，請確認後再使用。`;
    if (duplicates.length) return '缺席座號有重複項目，請確認。';
    return '';
  }
  function validateScheduleEditor(rows) {
    const errors = [];
    const parsed = rows.map((row, index) => ({ ...row, index, startMinute: timeMinutes(row.start), endMinute: timeMinutes(row.end) }));
    parsed.forEach((row) => {
      if (!row.subject) errors.push(`第 ${row.index + 1} 節尚未填寫科目。`);
      if (row.startMinute === null) errors.push(`第 ${row.index + 1} 節缺少有效的開始時間。`);
      if (row.endMinute === null) errors.push(`第 ${row.index + 1} 節缺少有效的結束時間。`);
      if (row.startMinute !== null && row.endMinute !== null && row.endMinute <= row.startMinute) errors.push(`第 ${row.index + 1} 節的結束時間必須晚於開始時間。`);
    });
    const ordered = parsed.filter((row) => row.startMinute !== null && row.endMinute !== null && row.endMinute > row.startMinute).sort((a, b) => a.startMinute - b.startMinute || a.endMinute - b.endMinute);
    let previous = null;
    for (const current of ordered) {
      if (previous && current.startMinute < previous.endMinute) errors.push(`第 ${previous.index + 1} 節與第 ${current.index + 1} 節時間重疊，請調整其中一節。`);
      if (!previous || current.endMinute > previous.endMinute) previous = current;
    }
    return errors;
  }
  function showValidation(target, messages, kind = 'warning') {
    target.hidden = !messages.length;
    target.classList.toggle('error-message', kind === 'error');
    target.replaceChildren();
    if (messages.length) {
      const list = document.createElement('ul');
      messages.forEach((message) => { const item = document.createElement('li'); item.textContent = message; list.append(item); });
      target.append(list);
    }
  }
  function collectFormValues() {
    const classSize = parseNonnegativeInteger('classSizeInput', '班級人數');
    const expected = parseNonnegativeInteger('expectedInput', '應到人數');
    const actual = parseNonnegativeInteger('actualInput', '實到人數');
    const errors = [classSize.error, expected.error, actual.error].filter(Boolean);
    const className = $('#classNameInput').value.trim();
    const examTitle = $('#examTitleInput').value.trim();
    const examDate = $('#examDateInput').value;
    const examReminderInterval = parseBoundedInteger('examReminderIntervalInput', '考試中提醒間隔', 1, 120);
    const breakReminderInterval = parseBoundedInteger('breakReminderIntervalInput', '下課／準備中提醒間隔', 1, 120);
    if (!className) errors.push('請填寫班級名稱。');
    if (!examTitle) errors.push('請填寫評量名稱。');
    if (!examDate || !/^\d{4}-\d{2}-\d{2}$/.test(examDate)) errors.push('請設定有效的考試日期。');
    const reminderErrors = [examReminderInterval.error, breakReminderInterval.error].filter(Boolean);
    const schedule = readScheduleEditor();
    const scheduleErrors = validateScheduleEditor(schedule);
    showValidation($('#attendanceValidation'), errors, 'error');
    showValidation($('#scheduleValidation'), scheduleErrors, 'error');
    showValidation($('#reminderValidation'), reminderErrors, 'error');
    return {
      errors, scheduleErrors, reminderErrors, schedule, className, examTitle, examDate,
      themeStyle: $('#themeStyleInput').value,
      classSize: classSize.value, expected: expected.value, actual: actual.value,
      subjects: normalizeLineList($('#subjectListInput').value),
      reminders: {
        examInterval: examReminderInterval.value,
        breakInterval: breakReminderInterval.value,
        examMessages: normalizeLineList($('#examReminderInput').value),
        breakMessages: normalizeLineList($('#breakReminderInput').value)
      }
    };
  }
  function handleSave(event) {
    event.preventDefault();
    const values = collectFormValues();
    const absentWarning = absentSeatWarning($('#absentInput').value);
    if (values.errors.length || values.scheduleErrors.length || values.reminderErrors.length) {
      const firstError = values.errors[0] || values.scheduleErrors[0] || values.reminderErrors[0];
      announce(firstError);
      (values.errors.length ? $('#attendanceValidation') : values.scheduleErrors.length ? $('#scheduleValidation') : $('#reminderValidation')).scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    const countWarnings = [];
    if (values.expected > values.classSize) countWarnings.push('應到人數高於班級人數');
    if (values.actual > values.classSize) countWarnings.push('實到人數高於班級人數');
    if (values.actual > values.expected) countWarnings.push('實到人數高於應到人數');
    config = normalizeConfig({
      ...config,
      className: values.className, classSize: values.classSize, expected: values.expected, actual: values.actual,
      absentSeats: $('#absentInput').value.trim(), examTitle: values.examTitle, examDate: values.examDate,
      themeStyle: values.themeStyle,
      schedule: values.schedule, subjects: values.subjects, reminders: values.reminders,
      showBopomofo: $('#drawerZhuyinToggle').checked,
      soundEnabled: $('#drawerSoundToggle').checked,
      _isDemo: false
    });
    if (!saveConfig()) return;
    applyTheme();
    drawerSwitchDirty.showBopomofo = false;
    drawerSwitchDirty.soundEnabled = false;
    if (config.soundEnabled) prepareAudio();
    lastScheduleStates = scheduleStateMap();
    renderBoard(); renderScheduleEditor(config.schedule);
    const warnings = [...countWarnings, absentWarning].filter(Boolean);
    showValidation($('#attendanceValidation'), warnings, 'warning');
    $('#scheduleValidation').hidden = true;
    $('#reminderValidation').hidden = true;
    announce(warnings.length ? '設定已儲存，請留意欄位確認提醒。' : '段考設定已儲存。');
    if (!warnings.length) closeDrawer();
  }
  function toggleBopomofo(enabled) {
    config.showBopomofo = enabled;
    saveConfig(); renderBoard();
  }
  function setSoundEnabled(enabled) {
    config.soundEnabled = enabled;
    if (enabled) prepareAudio();
    saveConfig(); renderBoard();
  }
  function prepareAudio() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    try {
      audioContext ||= new AudioContextCtor();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    } catch (error) { /* The test button reports playback support when used. */ }
  }
  async function playChime() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) { announce('此瀏覽器不支援提示音。'); return; }
    try {
      audioContext ||= new AudioContextCtor();
      if (audioContext.state === 'suspended') await audioContext.resume();
      const now = audioContext.currentTime;
      [659.25, 783.99].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now + index * .13);
        gain.gain.exponentialRampToValueAtTime(.12, now + index * .13 + .02);
        gain.gain.exponentialRampToValueAtTime(.0001, now + index * .13 + .28);
        oscillator.connect(gain); gain.connect(audioContext.destination);
        oscillator.start(now + index * .13); oscillator.stop(now + index * .13 + .3);
      });
    } catch (error) { announce('提示音目前無法播放，請確認瀏覽器音量。'); }
  }
  function scheduleStateMap(now = new Date()) {
    const status = currentStatus(now);
    if (status.errors.length || config.examDate !== status.today || status.kind === 'invalid') return new Map();
    return new Map(status.sorted.map((item) => {
      return [item.id, status.secondsOfDay < item.startMinute * 60 ? 'upcoming' : status.secondsOfDay < item.endMinute * 60 ? 'running' : 'ended'];
    }));
  }
  function tick() {
    const now = new Date();
    const nextStates = scheduleStateMap(now);
    if (lastScheduleStates) {
      for (const [id, state] of nextStates) {
        const previous = lastScheduleStates.get(id);
        if ((state === 'running' && previous === 'upcoming') || (state === 'ended' && previous === 'running')) {
          if (config.soundEnabled) playChime();
          announce(state === 'running' ? '考試開始。' : '考試時間結束。');
        }
      }
    }
    lastScheduleStates = nextStates;
    renderBoard(now);
  }
  function resetDefaults() {
    config = DEFAULT_CONFIG();
    config._isDemo = true;
    saveConfig(); setFormFromConfig(); renderBoard(); lastScheduleStates = scheduleStateMap();
    showValidation($('#attendanceValidation'), [], 'warning');
    showValidation($('#scheduleValidation'), [], 'error');
    showValidation($('#reminderValidation'), [], 'error');
    announce('已恢復示範預設值。');
    closeDrawer();
  }
  function setupEvents() {
    $('#settingsOpen').addEventListener('click', openDrawer);
    $('#emptySettingsButton').addEventListener('click', openDrawer);
    $('#settingsClose').addEventListener('click', closeDrawer);
    $('#themeStyleInput').addEventListener('change', (event) => {
      const selectedTheme = event.currentTarget.value;
      if (THEME_STYLE_OPTIONS.includes(selectedTheme)) document.documentElement.dataset.theme = selectedTheme;
    });
    backdrop.addEventListener('click', closeDrawer);
    const isEditableTarget = (target) => {
      const element = target instanceof Element ? target : target?.parentElement;
      return Boolean(element?.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]'));
    };
    // Discourage casual copying on the display while preserving normal editing controls.
    // This is not a security boundary: public client-side code remains inspectable.
    document.addEventListener('contextmenu', (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    }, true);
    document.addEventListener('selectstart', (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    }, true);
    document.addEventListener('copy', (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    }, true);
    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const sourceShortcut = event.key === 'F12' || (modifier && (key === 'u' || (event.shiftKey && ['i', 'j', 'c'].includes(key))));
      const saveShortcut = modifier && key === 's';
      if (sourceShortcut || saveShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    }, true);
    $('#subjectListInput').addEventListener('input', () => renderScheduleEditor(readScheduleEditor()));
    $('#addScheduleButton').addEventListener('click', () => {
      const rows = readScheduleEditor();
      rows.push({ id: uid(), subject: '', start: '', end: '' });
      renderScheduleEditor(rows);
      rowEditor.lastElementChild?.querySelector('[data-field="subject"]')?.focus();
    });
    form.addEventListener('submit', handleSave);
    $('#drawerZhuyinToggle').addEventListener('change', () => { drawerSwitchDirty.showBopomofo = true; });
    $('#drawerSoundToggle').addEventListener('change', () => { drawerSwitchDirty.soundEnabled = true; });
    $('#zhuyinToggle').addEventListener('click', () => toggleBopomofo(!config.showBopomofo));
    $('#soundToggle').addEventListener('click', () => setSoundEnabled(!config.soundEnabled));
    $('#testSoundButton').addEventListener('click', playChime);
    examAudioFileInput.addEventListener('change', () => attachExamAudio(examAudioFileInput.files?.[0]));
    $('#studentAudioButton').addEventListener('click', toggleExamAudio);
    $('#drawerAudioButton').addEventListener('click', toggleExamAudio);
    $('#clearAudioButton').addEventListener('click', () => clearExamAudio({ resetPicker: true }));
    $('#audioSeek').addEventListener('input', (event) => {
      const duration = examAudio.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      audioSeekPreview = Number(event.currentTarget.value) / 1000;
      const elapsedText = formatMediaTime(audioSeekPreview * duration);
      $('#audioElapsed').textContent = elapsedText;
      event.currentTarget.setAttribute('aria-valuetext', `${elapsedText} / ${formatMediaTime(duration)}`);
    });
    $('#audioSeek').addEventListener('change', (event) => {
      const duration = examAudio.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      examAudio.currentTime = Number(event.currentTarget.value) / 1000 * duration;
      audioSeekPreview = null;
      updateExamAudioProgress();
    });
    examAudio.addEventListener('play', updateExamAudioControls);
    examAudio.addEventListener('pause', updateExamAudioControls);
    examAudio.addEventListener('ended', updateExamAudioControls);
    examAudio.addEventListener('loadedmetadata', updateExamAudioProgress);
    examAudio.addEventListener('durationchange', updateExamAudioProgress);
    examAudio.addEventListener('timeupdate', updateExamAudioProgress);
    examAudio.addEventListener('seeked', updateExamAudioProgress);
    examAudio.addEventListener('error', () => { if (examAudioObjectUrl) announce('音檔載入失敗，請重新選擇有效的 MP3 檔案。'); });
    window.addEventListener('pagehide', () => clearExamAudio({ resetPicker: true }), { once: true });
    $('#fullscreenButton').addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === app) await document.exitFullscreen();
        else { if (!app.requestFullscreen) throw new Error('瀏覽器不支援全螢幕'); await app.requestFullscreen(); }
      } catch (error) { announce(`無法切換全螢幕：${error.message || '請檢查瀏覽器設定'}`); }
    });
    document.addEventListener('fullscreenchange', () => {
      const active = document.fullscreenElement === app;
      $('#fullscreenButton').setAttribute('aria-pressed', String(active));
      $('#fullscreenButton').title = active ? '退出全螢幕' : '全螢幕依螢幕比例自動調整';
      $('#fullscreenButton').querySelector('span:last-child').textContent = active ? '退出全螢幕' : '全螢幕';
      if (active) closeDrawer();
    });
    $('#resetButton').addEventListener('click', () => $('#resetDialog').showModal());
    $('#resetDialog').addEventListener('close', () => { if ($('#resetDialog').returnValue === 'confirm') resetDefaults(); });
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeCloseTimer);
      resizeCloseTimer = window.setTimeout(() => { if (window.innerWidth < 1120 && document.fullscreenElement !== app) closeDrawer(); }, 120);
    });
  }
  function initialize() {
    try { config._isDemo = !localStorage.getItem(STORAGE_KEY); }
    catch (error) { config._isDemo = true; }
    setupEvents(); setFormFromConfig(); renderBoard();
    lastScheduleStates = scheduleStateMap();
    if (window.innerWidth >= 1120) {
      drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); drawer.inert = false;
      $('#settingsOpen').setAttribute('aria-expanded', 'true');
    } else {
      app.classList.add('drawer-closed');
      drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true; backdrop.hidden = true;
    }
    window.setInterval(tick, 1000);
  }
  initialize();
  if (document.fonts?.load) {
    document.fonts.load('16px "Bpmf Huninn Local"', '國語').then((loadedFonts) => {
      if (!loadedFonts.length) return;
      bopomofoFontReady = true;
      renderBoard();
    }).catch(() => { /* The existing per-character renderer remains as a fallback. */ });
  }
})();

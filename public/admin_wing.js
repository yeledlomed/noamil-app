// ====================================================
// ADMIN WING — אגף מנהל (חלוקה לפי שיעורים ורשימת דירות)
// סנכרון אוטומטי מלא בין כל המחשבים בזמן אמת
// ====================================================

let currentAdminWingTab = 'classes'; // 'classes' | 'apartments'

// Cache of students data parsed from 'תלמידים מעודכן.csv'
let STUDENTS_DATA = [
  ["רועי-אברהם", "לוי", "055-9970588", "ב"],
  ["טוביה", "זר-אביב", "053-5431148", "א"],
  ["יהודה", "ורגון", "055-9985563", "ב"],
  ["ידידיה", "שנור", "055-9977313", "א"],
  ["יאיר-יעקב", "שטראוס", "058-7788681", "ב"],
  ["שגיא", "מאיר", "058-6071370", "ח"],
  ["נעם", "חנון", "058-6699879", "ב"],
  ["אביאל", "קאפח", "055-9112910", "א"],
  ["אביאל", "אמסלם", "058-5777072", "ד"],
  ["אביב", "בן-נון", "058-4237673", "ב"],
  ["אביחי", "שוב", "052-4398846", "ז"],
  ["אבינועם", "גילה", "058-5966305", "ב"],
  ["אבינועם", "גולד", "054-9846891", "מבוגר"],
  ["אבינועם שמחה", "לונדין", "050-8115954", "א"],
  ["אביעד", "בן-נעים", "052-6863076", "ו"],
  ["אביעד", "מלכה", "055-6841156", "ד"],
  ["אביעד", "חגי", "054-2303999", "ג"],
  ["אבישלום", "נחשוני", "058-7976579", "ט"],
  ["אביתר", "מזוז", "054-5221473", "מבוגר"],
  ["אביתר", "רחמים", "054-9393260", "ה"],
  ["אביתר", "יחד", "058-6456810", "ו"],
  ["אברהם", "כהן", "054-2571561", "ט"],
  ["אברהם", "צוויג", "058-4740309", "א"],
  ["אברהם", "המלי", "053-2396937", "ד"],
  ["אברהם", "חביב", "058-6891507", "ח"],
  ["אהד", "וילנר", "052-7807810", "מבוגר"],
  ["אהוביה-", "אוחיון", "058-7882522", "ב"],
  ["אהרון", "שחר", "058-6619393", "ג"],
  ["אהרון", "ויגדור", "055-9591040", "ב"],
  ["אהרן", "מאיר", "055-6626248", "ז"],
  ["אוהד", "מאיר", "053-3059238", "ז"],
  ["אוהד", "איגרא", "058-7203631", "ג"],
  ["אופיר", "רייז", "054-3537096", "ט"],
  ["אופק", "שיליאן", "058-5820207", "ז"],
  ["אור", "בן-אוליאל", "055-5693716", "ב"],
  ["אורי", "כהן", "054-6519093", "מבוגר"],
  ["אורי", "וינברג", "054-5667136", "מבוגר"],
  ["אורי", "קאפח", "058-5444320", "ו"],
  ["אורי", "ינאי", "054-7080999", "ב"],
  ["מתניה", "וינברגר", "054-3995225", "ד"]
];

// Raw apartments parsed from 'דירות.csv'
let APARTMENTS_RAW_DATA = [];

const CLASS_ORDER_ADMIN = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'מבוגר', 'צהל', 'ת'];

function normalizePhoneAdmin(p) {
  return (p || '').replace(/\D/g, '');
}

function normalizeNameKey(name) {
  return (name || '').toLowerCase().replace(/[\s\-_]+/g, '').trim();
}

// ----------------------------------------------------
// PORTAL & NAVIGATION CONTROLLER
// ----------------------------------------------------
let adminWingScreen = 'portal'; // 'portal' | 'details'

function showAdminWingPortal() {
  adminWingScreen = 'portal';
  const portalEl = document.getElementById('adminWingPortalScreen');
  const detailsEl = document.getElementById('adminWingDetailsScreen');
  const titleEl = document.getElementById('adminWingTitle');
  const subTitleEl = document.getElementById('adminWingSubTitle');

  if (portalEl) portalEl.style.display = 'flex';
  if (detailsEl) detailsEl.style.display = 'none';

  if (titleEl) titleEl.textContent = 'אגף מנהל · שיעורים ודירות';
  if (subTitleEl) subTitleEl.textContent = 'מעקב וחלוקת תומכים לפי שיעורים ודירות';

  // Always update 80% alerts when on portal or details
  updateAdminWingAlerts();
}

function openAdminWingSection(tab) {
  adminWingScreen = 'details';
  const portalEl = document.getElementById('adminWingPortalScreen');
  const detailsEl = document.getElementById('adminWingDetailsScreen');

  if (portalEl) portalEl.style.display = 'none';
  if (detailsEl) detailsEl.style.display = 'flex';

  switchAdminWingTab(tab);
}

// ----------------------------------------------------
// 80% PERSONAL TARGET ALERT CONTROLLER
// בדיקה האם נציג עבר 80% מהיעד האישי שלו והצגת התראה
// ----------------------------------------------------
function updateAdminWingAlerts() {
  const container = document.getElementById('adminWingAlertContainer');
  if (!container) return;

  const personalTargets = CampaignState.targets?.agentTargets || {};
  const allAgents = getAllCampaignAgents();
  const alertItems = [];

  allAgents.forEach(agent => {
    const rawName = (agent.name || '').trim();
    const cleanName = rawName.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, ' ').trim();
    const defaultTarget = CampaignState.targets?.defaultAgentTarget || 50;
    const target = personalTargets[cleanName] || personalTargets[rawName] || personalTargets[agent.phone] || defaultTarget;

    if (target && Number(target) > 0) {
      const suppCount = getAgentSupportersCountAdmin(rawName, agent.phone);
      const targetNum = Number(target);
      const pct = Math.round((suppCount / targetNum) * 100);

      if (pct >= 80) {
        alertItems.push({
          name: cleanName || rawName,
          suppCount,
          targetNum,
          pct,
          isCompleted: pct >= 100
        });
      }
    }
  });

  if (alertItems.length === 0) {
    container.innerHTML = '';
    return;
  }

  // Sort: highest percentage first
  alertItems.sort((a, b) => b.pct - a.pct);

  // Render top 1-2 alerts
  container.innerHTML = alertItems.slice(0, 2).map(item => {
    const cls = item.isCompleted ? 'alert-completed' : '';
    const icon = item.isCompleted ? '👑' : '🔥';
    return `
      <div class="admin-target-alert-pill ${cls}" title="${item.name}: ${item.suppCount} מתוך יעד ${item.targetNum} (${item.pct}%)">
        <span>${icon}</span>
        <span><strong>${escapeHtml(item.name)}</strong> עבר 80% מהיעד האישי שלו (${item.pct}%)</span>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// TAB SWITCHING: רשימת שיעורים | רשימת דירות
// ----------------------------------------------------
function switchAdminWingTab(tab) {
  currentAdminWingTab = tab;

  const btnClasses = document.getElementById('tabBtnAdminClasses');
  const btnApts = document.getElementById('tabBtnAdminApartments');
  const searchInput = document.getElementById('adminWingSearch');
  const titleEl = document.getElementById('adminWingTitle');
  const subTitleEl = document.getElementById('adminWingSubTitle');

  if (btnClasses) btnClasses.classList.toggle('active', tab === 'classes');
  if (btnApts) btnApts.classList.toggle('active', tab === 'apartments');

  if (tab === 'classes') {
    if (titleEl) titleEl.textContent = 'אגף מנהל · רשימת שיעורים';
    if (subTitleEl) subTitleEl.textContent = 'חלוקת תלמידים ונציגים לפי שיעור (כיתה מוסד ראשי)';
    if (searchInput) searchInput.placeholder = '🔍 חיפוש נציג או שיעור...';
  } else {
    if (titleEl) titleEl.textContent = 'אגף מנהל · רשימת דירות';
    if (subTitleEl) subTitleEl.textContent = 'חלוקת תלמידים ונציגים לפי דירות ומעקב תומכים';
    if (searchInput) searchInput.placeholder = '🔍 חיפוש נציג או דירה...';
  }

  updateAdminWingAlerts();

  const q = searchInput ? searchInput.value : '';
  renderCurrentAdminWingView(q);
}

function renderCurrentAdminWingView(searchQuery) {
  updateAdminWingAlerts();
  if (currentAdminWingTab === 'apartments') {
    renderAdminWingApartments(searchQuery);
  } else {
    renderAdminWingClasses(searchQuery);
  }
}

// ----------------------------------------------------
// CSV / API LOADERS
// ----------------------------------------------------
function parseCsvStudents(csvText) {
  if (!csvText) return [];
  if (csvText.charCodeAt(0) === 0xFEFF) csvText = csvText.slice(1);
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const res = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes) {
        res.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    res.push(cur.trim());
    return res;
  };

  const header = parseRow(lines[0]);
  let classColIdx = 3;
  header.forEach((h, idx) => {
    if (h.includes('כיתה מוסד ראשי')) classColIdx = idx;
  });

  const students = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseRow(line);
    const firstName = (cols[0] || '').trim();
    const lastName = (cols[1] || '').trim();
    const phone = (cols[2] || '').trim();
    const className = (cols[classColIdx] || '').trim();
    if (firstName || lastName || phone) {
      students.push([firstName, lastName, phone, className]);
    }
  }
  return students;
}

async function loadStudentsDataAdmin() {
  try {
    const res = await fetch('/api/students', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        STUDENTS_DATA = data;
        return;
      }
    }
  } catch (e) { }

  try {
    const res = await fetch('תלמידים מעודכן.csv?t=' + Date.now());
    if (res.ok) {
      const text = await res.text();
      const parsed = parseCsvStudents(text);
      if (parsed && parsed.length > 0) {
        STUDENTS_DATA = parsed;
        return;
      }
    }
  } catch (e) { }
}

async function loadApartmentsDataAdmin() {
  try {
    const res = await fetch('/api/apartments', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.rows) && data.rows.length > 0) {
        APARTMENTS_RAW_DATA = data.rows;
      }
      if (data && data.mappings && typeof data.mappings === 'object') {
        if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
        Object.assign(CampaignState.apartmentMappings, data.mappings);
      }
      return;
    }
  } catch (e) { }

  try {
    const res = await fetch('apartments_data.json?t=' + Date.now());
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        APARTMENTS_RAW_DATA = rows;
      }
    }
  } catch (e) { }
}

// ----------------------------------------------------
// COMMON AGENTS & STUDENTS RESOLVER
// ----------------------------------------------------
function buildStudentsIndex() {
  const byPhone = {};
  const byName = {};
  const list = [];

  STUDENTS_DATA.forEach(row => {
    const firstName = (row[0] || '').trim();
    const lastName = (row[1] || '').trim();
    const phone = (row[2] || '').trim();
    const className = (row[3] || '').trim();
    if (!className) return;

    const ph = normalizePhoneAdmin(phone);
    const key = normalizeNameKey(firstName + lastName);
    const item = { firstName, lastName, phone, className, key };

    if (ph) byPhone[ph] = item;
    if (key) byName[key] = item;
    list.push(item);
  });

  return { byPhone, byName, list };
}

function getAllCampaignAgents() {
  const agentsMap = new Map();

  (CampaignState.agents || []).forEach(ag => {
    const name = (ag.name || '').trim();
    if (!name) return;
    const phone = (ag.phone || '').trim();
    const key = normalizePhoneAdmin(phone) || normalizeNameKey(name);
    agentsMap.set(key, {
      id: ag.id,
      name: name,
      phone: phone,
      status: ag.status || (ag.statusType === 'active' ? 'עובד בקמפיין' : 'נציג'),
      statusType: ag.statusType || 'active'
    });
  });

  (CampaignState.leads || []).forEach(lead => {
    const raw = (lead.last_agent || '').trim();
    if (!raw || raw === '—') return;
    const cleanName = raw.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/-/g, '').trim();
    if (!cleanName) return;

    const phMatch = raw.match(/05\d-?\d{7}/);
    const phone = phMatch ? phMatch[0] : '';
    const key = normalizePhoneAdmin(phone) || normalizeNameKey(cleanName);

    if (!agentsMap.has(key)) {
      agentsMap.set(key, {
        name: cleanName,
        phone: phone,
        status: 'לשעבר (מתוך שיחות)',
        statusType: 'former'
      });
    } else {
      const existing = agentsMap.get(key);
      if (!existing.phone && phone) existing.phone = phone;
    }
  });

  return Array.from(agentsMap.values());
}

function resolveAgentClass(agent, studentsIndex) {
  const serverMappings = CampaignState.classMappings || {};

  const agentKeyName = normalizeNameKey(agent.name);
  const agentKeyPhone = normalizePhoneAdmin(agent.phone);
  const getCleanMapping = (val) => {
    if (!val || val === 'אברכים') return null;
    return val;
  };
  if (agentKeyPhone && getCleanMapping(serverMappings[agentKeyPhone])) return getCleanMapping(serverMappings[agentKeyPhone]);
  if (agentKeyName && getCleanMapping(serverMappings[agentKeyName])) return getCleanMapping(serverMappings[agentKeyName]);
  if (agent.name && getCleanMapping(serverMappings[agent.name])) return getCleanMapping(serverMappings[agent.name]);

  if (agentKeyPhone && studentsIndex.byPhone[agentKeyPhone]) {
    return studentsIndex.byPhone[agentKeyPhone].className;
  }

  if (agentKeyName && studentsIndex.byName[agentKeyName]) {
    return studentsIndex.byName[agentKeyName].className;
  }

  const agentParts = agent.name.split(/[\s\-]+/).filter(p => p.length >= 2);
  if (agentParts.length >= 2) {
    const firstWord = agentParts[0].toLowerCase();
    const lastWord = agentParts[agentParts.length - 1].toLowerCase();
    for (const item of studentsIndex.list) {
      const sFirst = item.firstName.toLowerCase();
      const sLast = item.lastName.toLowerCase();
      if ((sFirst.includes(firstWord) || firstWord.includes(sFirst)) &&
          (sLast.includes(lastWord) || lastWord.includes(sLast))) {
        return item.className;
      }
    }
  }

  return null;
}

// ----------------------------------------------------
// APARTMENT ASSIGNMENT & PARSER
// ----------------------------------------------------
function parseApartmentsEntries() {
  const rows = APARTMENTS_RAW_DATA || [];
  if (rows.length === 0) return [];

  const entries = [];
  const headerRow = rows[0] || [];

  // Check if row 0 has student/person columns like 'שם' or 'טלפון'
  // If it has 'שם' or 'טלפון', this is ALWAYS a standard flat student roster table (Structure A)!
  const hasPersonHeaders = headerRow.some(cell => {
    const s = String(cell || '').trim();
    return s.includes('שם') || s.includes('טלפון') || s.includes('נייד') || s.includes('משפחה');
  });

  // Structure B check: ONLY if NOT a standard person table, and multiple cells have numbers or apartment titles
  const looksLikeMultiCol = !hasPersonHeaders && headerRow.some(cell => {
    const s = String(cell || '').trim();
    return s.includes('דירה') || s.includes('חדר') || (/^\d+$/.test(s) && parseInt(s, 10) > 0);
  });

  if (looksLikeMultiCol && headerRow.length >= 2) {
    for (let c = 0; c < headerRow.length; c++) {
      let aptName = String(headerRow[c] || '').trim();
      if (!aptName) continue;
      if (!aptName.includes('דירה') && /^\d+$/.test(aptName)) {
        aptName = `דירה ${aptName}`;
      }
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r] || [];
        const personVal = String(row[c] || '').trim();
        if (personVal && personVal !== '—') {
          const phMatch = personVal.match(/05\d-?\d{7}/);
          const phone = phMatch ? phMatch[0] : '';
          const cleanName = personVal.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/-/g, '').trim();
          entries.push({ apartmentName: aptName, personName: cleanName || personVal, phone });
        }
      }
    }
  } else {
    // Structure A: Flat rows (columns for: שם פרטי, שם משפחה, טלפון, כיתה, ..., דירה)
    let aptCol = -1;
    let nameCol = -1;
    let firstNameCol = -1;
    let lastNameCol = -1;
    let phoneCol = -1;
    let classCol = -1;

    headerRow.forEach((h, idx) => {
      const hStr = String(h || '').trim();
      if (hStr === 'דירה' || hStr.includes('דירה') || hStr.includes('חדר') || hStr.includes('בית')) {
        aptCol = idx;
      }
      if (hStr.includes('כיתה') || hStr.includes('שיעור')) {
        classCol = idx;
      }
      if (hStr.includes('פרטי')) {
        firstNameCol = idx;
      } else if (hStr.includes('משפחה')) {
        lastNameCol = idx;
      } else if (hStr.includes('שם') && nameCol === -1) {
        nameCol = idx;
      }
      if (hStr.includes('טלפון') || hStr.includes('נייד')) {
        phoneCol = idx;
      }
    });

    // Fallbacks if not detected by header name
    if (aptCol === -1) aptCol = headerRow.length > 5 ? 5 : (headerRow.length - 1);
    if (classCol === -1 && headerRow.length > 3) classCol = 3;
    if (nameCol === -1 && firstNameCol === -1) {
      firstNameCol = 0;
      lastNameCol = 1;
    }
    if (phoneCol === -1) phoneCol = 2;

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r] || [];
      let aptName = String(row[aptCol] || '').trim();
      
      let pName = '';
      if (firstNameCol !== -1 && lastNameCol !== -1) {
        const fn = String(row[firstNameCol] || '').trim();
        const ln = String(row[lastNameCol] || '').trim();
        pName = (fn + ' ' + ln).trim();
      } else if (nameCol !== -1) {
        pName = String(row[nameCol] || '').trim();
      }
      
      const phone = phoneCol !== -1 ? String(row[phoneCol] || '').trim() : '';
      const className = classCol !== -1 ? String(row[classCol] || '').trim() : '';
      
      const normalizedApt = cleanApartmentTitle(aptName);
      if (normalizedApt || pName) {
        entries.push({ 
          apartmentName: normalizedApt, 
          personName: pName, 
          phone,
          className
        });
      }
    }
  }

  return entries;
}

// Clean and normalize apartment name (e.g. '2מ', 'מ2' -> 'דירה 2', '2' -> 'דירה 2')
function cleanApartmentTitle(raw) {
  if (!raw) return null;
  let s = String(raw).replace(/["']/g, '').trim();
  if (!s || s === '—' || s === '-' || s === 'Unnamed: 4' || s === 'ללא דירה') return null;

  // Convert '2מ', 'מ2', 'מ-2', '2-מ', 'מ 2', '2 מ' to 'דירה 2'
  if (/^מ[\s\-]*\d+$/i.test(s) || /^\d+[\s\-]*מ$/i.test(s)) {
    const num = s.replace(/\D/g, '');
    return `דירה ${parseInt(num, 10)}`;
  }
  if (/^דירה[\s\-]*מ[\s\-]*\d+$/i.test(s) || /^דירה[\s\-]*\d+[\s\-]*מ$/i.test(s)) {
    const num = s.replace(/\D/g, '');
    return `דירה ${parseInt(num, 10)}`;
  }

  // Pure numbers like '2', '25', '34' -> 'דירה 2', 'דירה 25'
  if (/^\d+$/.test(s)) {
    return `דירה ${parseInt(s, 10)}`;
  }

  // If starts with 'דירה' followed by number: 'דירה 02' -> 'דירה 2'
  if (/^דירה\s*\d+$/i.test(s)) {
    const num = s.replace(/\D/g, '');
    return `דירה ${parseInt(num, 10)}`;
  }

  return s;
}

// Compare apartment names naturally by number first (דירה 1, דירה 2, דירה 3...), then text
function compareApartmentNames(nameA, nameB) {
  const getNum = str => {
    const m = (str || '').match(/\d+/);
    return m ? parseInt(m[0], 10) : Infinity;
  };
  const numA = getNum(nameA);
  const numB = getNum(nameB);

  if (numA !== numB) {
    return numA - numB;
  }
  return (nameA || '').localeCompare(nameB || '', 'he', { numeric: true });
}

function resolveAgentApartment(agent, aptEntries) {
  const customMappings = CampaignState.apartmentMappings || {};

  // 1. Check custom override from server first
  const agentKeyName = normalizeNameKey(agent.name);
  const agentKeyPhone = normalizePhoneAdmin(agent.phone);
  let customApt = null;
  if (agentKeyPhone && customMappings[agentKeyPhone]) customApt = customMappings[agentKeyPhone];
  else if (agentKeyName && customMappings[agentKeyName]) customApt = customMappings[agentKeyName];
  else if (agent.name && customMappings[agent.name]) customApt = customMappings[agent.name];

  if (customApt) {
    if (customApt === 'ללא דירה' || customApt === 'ממתינים לשיוך דירה') return null;
    return cleanApartmentTitle(customApt) || customApt;
  }

  // 2. Match by phone against parsed apartment file
  if (agentKeyPhone) {
    for (const e of aptEntries) {
      const eph = normalizePhoneAdmin(e.phone);
      if (eph && eph === agentKeyPhone) return e.apartmentName;
    }
  }

  // 3. Match by name key
  if (agentKeyName) {
    for (const e of aptEntries) {
      if (normalizeNameKey(e.personName) === agentKeyName) return e.apartmentName;
    }
  }

  // 4. Match compound Hebrew name parts
  const agentParts = agent.name.split(/[\s\-]+/).filter(p => p.length >= 2);
  if (agentParts.length >= 2) {
    const firstWord = agentParts[0].toLowerCase();
    const lastWord = agentParts[agentParts.length - 1].toLowerCase();
    for (const e of aptEntries) {
      const eLower = (e.personName || '').toLowerCase();
      if (eLower.includes(firstWord) && eLower.includes(lastWord)) {
        return e.apartmentName;
      }
    }
  }

  return null;
}

// Save manual apartment change to server so all computers stay in sync
async function saveAgentApartmentMapping(agentName, agentPhone, chosenApartment) {
  if (!chosenApartment) return;
  const normalizedApt = cleanApartmentTitle(chosenApartment) || chosenApartment;
  const key = normalizePhoneAdmin(agentPhone) || normalizeNameKey(agentName) || agentName;
  if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
  CampaignState.apartmentMappings[key] = normalizedApt;
  CampaignState.apartmentMappings[agentName] = normalizedApt;

  // Immediate UI update
  const searchInput = document.getElementById('adminWingSearch');
  renderCurrentAdminWingView(searchInput ? searchInput.value : '');

  // Persist to server & localStorage
  try {
    localStorage.setItem('noam_apartment_mappings', JSON.stringify(CampaignState.apartmentMappings));
  } catch (e) { }

  try {
    const payload = {};
    payload[key] = normalizedApt;
    payload[agentName] = normalizedApt;

    await fetch('/api/apartments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mappings: payload })
    });

    if (typeof showToast === 'function') {
      showToast(`✅ ${agentName} שויך בהצלחה ל-${chosenApartment} וסונכרן לכל המחשבים`);
    }
  } catch (err) {
    console.warn('Failed to sync apartment mapping to server:', err);
  }
}

// Save manual class assignment and sync to server
async function saveAgentClassMapping(agentName, agentPhone, chosenClass) {
  if (!chosenClass) return;
  const key = normalizePhoneAdmin(agentPhone) || normalizeNameKey(agentName) || agentName;
  if (!CampaignState.classMappings) CampaignState.classMappings = {};
  CampaignState.classMappings[key] = chosenClass;
  CampaignState.classMappings[agentName] = chosenClass;

  const searchInput = document.getElementById('adminWingSearch');
  renderCurrentAdminWingView(searchInput ? searchInput.value : '');

  // Persist to server & localStorage
  try {
    localStorage.setItem('noam_class_mappings', JSON.stringify(CampaignState.classMappings));
  } catch (e) { }

  try {
    const payload = {};
    payload[key] = chosenClass;
    payload[agentName] = chosenClass;

    await fetch('/api/class-mappings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (typeof showToast === 'function') {
      showToast(`✅ שיוך שיעור עבור ${agentName} נשמר וסונכרן לכל המחשבים`);
    }
  } catch (err) {
    console.warn('Failed to sync class mapping to server:', err);
  }
}

// Calculate total supporters including blocking threshold and hesitant ("תומך" + "תומך אחוז חסימה" + "מתלבט")
function getAgentSupportersCountAdmin(agentName, agentPhone) {
  let count = 0;
  const leads = CampaignState.leads || [];
  const cleanTargetName = (agentName || '').replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, '').trim().toLowerCase();
  const targetPh = normalizePhoneAdmin(agentPhone);

  leads.forEach(lead => {
    const res = (lead.result || '').trim();
    const isFullSupp = res === 'תומך' || (res.includes('תומך') && !res.includes('לא') && !res.includes('אחוז חסימה'));
    const isThresh = res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה');
    const isHesitant = res === 'מתלבט' || res.includes('מתלבט');
    if (!isFullSupp && !isThresh && !isHesitant) return;

    const lastAg = (lead.last_agent || '').trim();
    if (!lastAg || lastAg === '—') return;

    if (targetPh) {
      const phInLead = normalizePhoneAdmin(lastAg);
      if (phInLead && (phInLead.includes(targetPh) || targetPh.includes(phInLead))) {
        count++;
        return;
      }
    }

    const cleanLastAg = lastAg.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, '').trim().toLowerCase();
    if (cleanTargetName && cleanLastAg) {
      if (cleanLastAg.includes(cleanTargetName) || cleanTargetName.includes(cleanLastAg)) {
        count++;
        return;
      }
    }
  });

  return count;
}

// ----------------------------------------------------
// AGENT CALL STATS & ACTIVITY RESOLVER
// ----------------------------------------------------
function getAgentDetailedActivityAdmin(agentName, agentPhone) {
  const leads = CampaignState.leads || [];
  const cleanTargetName = (agentName || '').replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, '').trim().toLowerCase();
  const targetPh = normalizePhoneAdmin(agentPhone);

  // Match against CampaignState.agents for official stats if present
  let officialAgent = null;
  for (const ag of (CampaignState.agents || [])) {
    const agPh = normalizePhoneAdmin(ag.phone);
    const agNm = (ag.name || '').replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, '').trim().toLowerCase();
    if ((targetPh && agPh && targetPh === agPh) || (cleanTargetName && agNm && (cleanTargetName === agNm || agNm.includes(cleanTargetName) || cleanTargetName.includes(agNm)))) {
      officialAgent = ag;
      break;
    }
  }

  let totalCalls = 0;
  let callsToday = 0;
  let supportersCount = 0;
  let thresholdCount = 0;
  let hesitantCount = 0;
  let lastActivityDate = null;
  let lastActivityLabel = '';

  const now = new Date();
  const todayD = now.getDate();
  const todayM = now.getMonth() + 1;

  leads.forEach(lead => {
    const lastAg = (lead.last_agent || '').trim();
    if (!lastAg || lastAg === '—') return;

    let isMatch = false;
    if (targetPh) {
      const phInLead = normalizePhoneAdmin(lastAg);
      if (phInLead && (phInLead.includes(targetPh) || targetPh.includes(phInLead))) {
        isMatch = true;
      }
    }
    if (!isMatch && cleanTargetName) {
      const cleanLastAg = lastAg.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, '').trim().toLowerCase();
      if (cleanLastAg && (cleanLastAg.includes(cleanTargetName) || cleanTargetName.includes(cleanLastAg))) {
        isMatch = true;
      }
    }

    if (!isMatch) return;

    // Total calls/handled leads
    const attemptsNum = parseInt(lead.attempts, 10);
    const attempts = (!isNaN(attemptsNum) && attemptsNum > 0) ? attemptsNum : 1;
    totalCalls += attempts;

    // Check if updated today
    const upd = (lead.updated || '').trim();
    let isToday = false;
    if (upd.includes('היום')) {
      isToday = true;
    } else if (!upd.includes('אתמול') && !upd.includes('שלשום')) {
      const dMatch = upd.match(/(\d{1,2})[\/\.](\d{1,2})/);
      if (dMatch) {
        const pD = parseInt(dMatch[1], 10);
        const pM = parseInt(dMatch[2], 10);
        if (pD === todayD && pM === todayM) isToday = true;
      }
    }

    if (isToday) {
      callsToday += attempts;
    }

    // Supporter breakdown
    const res = (lead.result || '').trim();
    if (res === 'תומך' || (res.includes('תומך') && !res.includes('לא') && !res.includes('אחוז חסימה'))) {
      supportersCount++;
    } else if (res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה')) {
      thresholdCount++;
    } else if (res === 'מתלבט' || res.includes('מתלבט')) {
      hesitantCount++;
    }

    // Track latest activity string
    if (upd && (!lastActivityLabel || upd.includes('היום') || (!lastActivityLabel.includes('היום') && upd.includes('אתמול')))) {
      lastActivityLabel = upd;
    }
  });

  // If official agent row has higher or specific counts from table
  if (officialAgent) {
    if (typeof officialAgent.leads_today === 'number' && officialAgent.leads_today > callsToday) {
      callsToday = officialAgent.leads_today;
    }
    const offCalls = (officialAgent.leads_today || 0) + (officialAgent.released || 0) + (officialAgent.reports_count || 0);
    if (offCalls > totalCalls) {
      totalCalls = offCalls;
    }
  }

  // Determine inactivity: worked in the last 24h/today?
  const hasWorkedToday = callsToday > 0 || (lastActivityLabel && lastActivityLabel.includes('היום'));
  const hasWorkedYesterday = lastActivityLabel && lastActivityLabel.includes('אתמול');
  const isInactive = !hasWorkedToday && (!officialAgent || officialAgent.statusType !== 'active' || callsToday === 0);

  return {
    totalCalls,
    callsToday,
    supportersCount,
    thresholdCount,
    hesitantCount,
    totalPositive: supportersCount + thresholdCount + hesitantCount,
    hasWorkedToday,
    hasWorkedYesterday,
    lastActivityLabel: lastActivityLabel || (hasWorkedToday ? 'היום' : (hasWorkedYesterday ? 'אתמול' : 'אין תיעוד לאחרונה')),
    isInactive
  };
}

// ----------------------------------------------------
// VIEW 1: RENDER CLASSES
// ----------------------------------------------------
function buildAdminWingClassesData(searchQuery) {
  const studentsIndex = buildStudentsIndex();
  const allAgents = getAllCampaignAgents();
  const q = (searchQuery || '').trim().toLowerCase();
  const classBuckets = {};

  allAgents.forEach(agent => {
    const resolvedClass = resolveAgentClass(agent, studentsIndex);
    const className = resolvedClass || 'ממתין לשיוך';
    const displayName = agent.name;
    const phone = agent.phone || '';

    if (q) {
      const haystack = (displayName + ' ' + phone + ' שיעור ' + className).toLowerCase();
      if (!haystack.includes(q)) return;
    }

    if (!classBuckets[className]) {
      classBuckets[className] = {
        className,
        isUnassigned: !resolvedClass,
        students: [],
        totalSupporters: 0,
        totalCalls: 0,
        callsToday: 0,
        inactiveStudentsCount: 0,
        activeTodayCount: 0
      };
    }

    const activity = getAgentDetailedActivityAdmin(displayName, phone);
    const suppCount = activity.totalPositive;

    const studentObj = {
      name: displayName,
      phone,
      suppCount,
      pureSupporters: activity.supportersCount,
      thresholdCount: activity.thresholdCount,
      hesitantCount: activity.hesitantCount,
      totalCalls: activity.totalCalls,
      callsToday: activity.callsToday,
      hasWorkedToday: activity.hasWorkedToday,
      lastActivityLabel: activity.lastActivityLabel,
      isInactive: activity.isInactive,
      status: agent.status,
      statusType: agent.statusType,
      currentClass: className
    };

    classBuckets[className].students.push(studentObj);
    classBuckets[className].totalSupporters += suppCount;
    classBuckets[className].totalCalls += activity.totalCalls;
    classBuckets[className].callsToday += activity.callsToday;

    if (activity.isInactive) {
      classBuckets[className].inactiveStudentsCount++;
    }
    if (activity.hasWorkedToday) {
      classBuckets[className].activeTodayCount++;
    }
  });

  Object.values(classBuckets).forEach(cls => {
    // Sort students: highest supporters and calls first
    cls.students.sort((a, b) => (b.suppCount !== a.suppCount) ? (b.suppCount - a.suppCount) : (b.totalCalls - a.totalCalls));
  });

  return Object.values(classBuckets).sort((a, b) => {
    if (a.isUnassigned) return 1;
    if (b.isUnassigned) return -1;
    const ia = CLASS_ORDER_ADMIN.indexOf(a.className);
    const ib = CLASS_ORDER_ADMIN.indexOf(b.className);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return b.totalSupporters - a.totalSupporters;
  });
}

function renderAdminWingClasses(searchQuery) {
  const contentEl = document.getElementById('adminWingContent');
  const summaryEl = document.getElementById('adminWingSummaryCards');
  const metaEl = document.getElementById('adminWingMeta');
  if (!contentEl) return;

  const data = buildAdminWingClassesData(searchQuery || '');

  if (data.length === 0) {
    contentEl.innerHTML = `<div class="admin-empty">😕 לא נמצאו נציגים${searchQuery ? ' התואמים לחיפוש' : ''}</div>`;
    if (summaryEl) summaryEl.innerHTML = '';
    if (metaEl) metaEl.textContent = '';
    return;
  }

  const assignedData = data.filter(d => !d.isUnassigned);
  const maxSupp = assignedData.length > 0 ? Math.max(...assignedData.map(d => d.totalSupporters)) : 0;

  // Render top KPI summary cards for classes
  if (summaryEl) {
    summaryEl.innerHTML = data.map(d => {
      const isTop = !d.isUnassigned && d.totalSupporters > 0 && d.totalSupporters === maxSupp;
      const cardTitle = d.isUnassigned ? '⚠️ ממתין לשיוך' : `שיעור ${escapeHtml(d.className)}`;
      const alertBadge = d.inactiveStudentsCount > 0
        ? `<div style="font-size: 0.68rem; color: #dc2626; font-weight: 700; margin-top: 3px;">⚠️ ${d.inactiveStudentsCount} לא עבדו היום</div>`
        : '';
      return `<div class="admin-summary-card ${isTop ? 'top-class' : ''} ${d.isUnassigned ? 'unassigned-card' : ''}">
        <div class="asc-label">${cardTitle}</div>
        <div class="asc-num">${d.totalSupporters}</div>
        <div class="asc-sub">${d.totalCalls} שיחות · ${d.students.length} נציגים</div>
        ${alertBadge}
      </div>`;
    }).join('');
  }

  const totalAgentsCount = data.reduce((s, d) => s + d.students.length, 0);
  const totalSuppAll = data.reduce((s, d) => s + d.totalSupporters, 0);
  const totalCallsAll = data.reduce((s, d) => s + d.totalCalls, 0);
  const totalCallsToday = data.reduce((s, d) => s + d.callsToday, 0);
  const totalInactiveAll = data.reduce((s, d) => s + d.inactiveStudentsCount, 0);

  if (metaEl) {
    metaEl.innerHTML = `
      <span><strong>${totalAgentsCount}</strong> נציגים · <strong>${totalCallsAll}</strong> שיחות סה״כ (${totalCallsToday} היום) · <strong>${totalSuppAll}</strong> תומכים · <span style="color:${totalInactiveAll > 0 ? '#dc2626' : '#16a34a'}; font-weight: 700;">${totalInactiveAll} לא ביצעו שיחה היום</span> · מסונכרן חי ⚡</span>
    `;
  }

  contentEl.innerHTML = data.map((cls, i) => {
    const isUnassigned = cls.isUnassigned;
    // Default is closed; user clicks to open
    const expanded = '';
    const arrowOpen = '';

    const inactiveStudents = cls.students.filter(s => s.isInactive);

    const rows = cls.students.map(s => {
      const initials = (s.name || '?').split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('');
      const statusBadge = s.statusType === 'former'
        ? `<span style="font-size: 0.7rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">לשעבר</span>`
        : `<span style="font-size: 0.7rem; color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">פעיל</span>`;

      // Activity state badge
      let activityTag = '';
      if (s.hasWorkedToday) {
        activityTag = `<span class="student-metric-tag active-today" title="ביצע שיחות היום">⚡ פעיל היום (${s.callsToday})</span>`;
      } else {
        activityTag = `<span class="student-metric-tag inactive-warn" title="לא ביצע אף שיחה היום">⚠️ לא עבד ביום האחרון</span>`;
      }

      const optionsHtml = CLASS_ORDER_ADMIN.map(c => {
        const sel = c === s.currentClass ? 'selected' : '';
        const label = (c === 'מבוגר' || c === 'צהל') ? c : `שיעור ${c}`;
        return `<option value="${c}" ${sel}>${label}</option>`;
      }).join('');

      return `<div class="admin-student-row ${s.isInactive ? 'student-row--inactive' : ''}">
        <div class="admin-student-info">
          <div class="admin-student-avatar" style="${s.isInactive ? 'border-color: #fca5a5; background: #fef2f2; color: #dc2626;' : ''}">
            ${escapeHtml(initials)}
          </div>
          <div>
            <div class="admin-student-name">
              ${escapeHtml(s.name)}
              ${statusBadge}
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="admin-student-phone" dir="ltr">${escapeHtml(s.phone || 'ללא טלפון')}</span>
              <span class="student-time-ago">עודכן: ${escapeHtml(s.lastActivityLabel)}</span>
            </div>
          </div>
        </div>

        <div class="admin-student-metrics">
          ${activityTag}

          <div class="student-metric-tag calls-tag" title="סך הכל שיחות שבוצעו על ידי הנציג">
            📞 <strong>${s.totalCalls}</strong> שיחות
          </div>

          <div style="display:flex; align-items:center; gap: 4px;" title="שנה שיעור לנציג זה (יסתנכרן לכל המחשבים)">
            <select class="admin-class-changer" 
              data-agent-name="${escapeHtml(s.name)}" 
              data-agent-phone="${escapeHtml(s.phone)}"
              onchange="handleClassChange(this)">
              <option value="" disabled ${isUnassigned ? 'selected' : ''}>בחר שיעור...</option>
              ${optionsHtml}
            </select>
          </div>

          <div class="admin-student-supporters" title="${s.pureSupporters} תומך מלא | ${s.thresholdCount} אחוז חסימה | ${s.hesitantCount} מתלבט">
            <span class="admin-supp-pill ${s.suppCount > 0 ? '' : 'zero'}">${s.suppCount}</span>
            <span class="admin-supp-label">תומכים</span>
          </div>
        </div>
      </div>`;
    }).join('');

    const classBadgeText = isUnassigned ? '⚠️' : escapeHtml(cls.className);
    const isSpecialClass = cls.className === 'אברכים' || cls.className === 'מבוגר' || cls.className === 'צהל';
    const classNameTitle = isUnassigned ? 'נציגים ממתינים לשיוך שיעור' : (isSpecialClass ? escapeHtml(cls.className) : `שיעור ${escapeHtml(cls.className)}`);
    const classBadgeBg = isUnassigned ? 'background: #f59e0b;' : '';

    // Manager Inactivity Alert Banner for this specific class
    const inactivityBannerHtml = inactiveStudents.length > 0 ? `
      <div class="class-inactivity-banner">
        <span>⚠️ <strong>שים לב מנהל:</strong> בשיעור זה ישנם <strong>${inactiveStudents.length}</strong> נציגים שלא ביצעו שיחות ביום האחרון: ${inactiveStudents.map(st => escapeHtml(st.name)).slice(0, 5).join(', ')}${inactiveStudents.length > 5 ? ' ועוד...' : ''}</span>
      </div>
    ` : '';

    return `<div class="admin-class-section ${isUnassigned ? 'unassigned-section' : ''}">
      <div class="admin-class-header" onclick="toggleAdminClass(this)">
        <div class="admin-class-title">
          <div class="admin-class-badge" style="${classBadgeBg}">${classBadgeText}</div>
          <div>
            <div class="admin-class-name">${classNameTitle}</div>
            <div class="admin-class-sub">${cls.students.length} נציגים ברשימה · ${cls.activeTodayCount} פעילים היום</div>
          </div>
        </div>

        <div class="admin-class-header-stats">
          <div class="admin-header-chip calls" title="סך כל השיחות שנעשו על ידי כל תלמידי השיעור">
            📞 <strong>${cls.totalCalls}</strong> שיחות
          </div>

          <div class="admin-header-chip today-calls" title="שיחות שנעשו היום על ידי תלמידי השיעור">
            ⚡ <strong>${cls.callsToday}</strong> היום
          </div>

          <div class="admin-header-chip supp" title="סך תומכים שגויסו">
            🎯 <strong>${cls.totalSupporters}</strong> תומכים
          </div>

          ${cls.inactiveStudentsCount > 0 ? `
            <div class="admin-header-chip inactive-alert" title="נציגים שלא ביצעו שיחות ביום האחרון">
              ⚠️ <strong>${cls.inactiveStudentsCount}</strong> לא עבדו היום
            </div>
          ` : `
            <div class="admin-header-chip" style="background:#ecfdf5; color:#047857;" title="כל נציגי השיעור עובדים">
              ✓ כולם פעילים
            </div>
          `}

          <svg class="admin-class-toggle ${arrowOpen}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div class="class-manager-toolbar" style="${expanded ? '' : 'display:none;'}">
        <div class="class-manager-pill-group">
          <span class="class-mini-badge">👥 ${cls.students.length} נציגים</span>
          <span class="class-mini-badge" style="color:#0284c7;">📞 ממוצע ${cls.students.length > 0 ? (cls.totalCalls / cls.students.length).toFixed(1) : 0} שיחות לנציג</span>
          <span class="class-mini-badge" style="color:#047857;">📈 ממוצע ${cls.students.length > 0 ? (cls.totalSupporters / cls.students.length).toFixed(1) : 0} תומכים לנציג</span>
        </div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">
          מעקב מנהל בזמן אמת
        </div>
      </div>

      ${inactiveStudents.length > 0 ? `
        <div class="class-inactivity-banner" style="${expanded ? '' : 'display:none;'}">
          <span>⚠️ <strong>שים לב מנהל:</strong> בשיעור זה ישנם <strong>${inactiveStudents.length}</strong> נציגים שלא ביצעו שיחות ביום האחרון: ${inactiveStudents.map(st => escapeHtml(st.name)).slice(0, 5).join(', ')}${inactiveStudents.length > 5 ? ' ועוד...' : ''}</span>
        </div>
      ` : ''}

      <div class="admin-class-body ${expanded}">${rows}</div>
    </div>`;
  }).join('');
}

// Check if class or agent is an avrech (אברך / מבוגר / בוגרים)
function isAvrechClass(className) {
  if (!className) return false;
  const cn = String(className).trim().toLowerCase();
  return cn === 'מבוגר' || cn.includes('אברך') || cn.includes('בוגר') || cn === 'בוגרים' || cn.includes('נשוי');
}

function isAvrechAgent(agent, studentsIndex, aptEntries) {
  if (!agent) return false;

  // 1. Check if agent's assigned apartment is 'אברכים' (from server mappings)
  const aptMappings = (window.CampaignState && CampaignState.apartmentMappings) || {};
  const ph = normalizePhoneAdmin(agent.phone);
  const nm = normalizeNameKey(agent.name);
  const rawName = (agent.name || '').trim();

  const mappedApt = (ph && aptMappings[ph]) || (nm && aptMappings[nm]) || (rawName && aptMappings[rawName]);
  if (mappedApt && isAvrechClass(mappedApt)) {
    return true;
  }

  // 2. Check if agent's assigned class is an avrech class
  const cls = resolveAgentClass(agent, studentsIndex);
  if (isAvrechClass(cls)) return true;

  // 3. Check apartment raw data roster
  if (aptEntries && Array.isArray(aptEntries)) {
    for (const e of aptEntries) {
      if ((ph && normalizePhoneAdmin(e.phone) === ph) || (nm && normalizeNameKey(e.personName) === nm)) {
        if (isAvrechClass(e.className) || isAvrechClass(e.apartmentName)) return true;
      }
    }
  }
  return false;
}

// ----------------------------------------------------
// VIEW 2: RENDER APARTMENTS (רשימת דירות - ללא אברכים)
// ----------------------------------------------------
function buildAdminWingApartmentsData(searchQuery) {
  const aptEntries = parseApartmentsEntries();
  const allAgents = getAllCampaignAgents();
  const studentsIndex = buildStudentsIndex();
  const q = (searchQuery || '').trim().toLowerCase();
  const aptBuckets = {};

  // Collect all known apartment names from file + custom overrides
  const invalidNames = new Set(['שם פרטי', 'שם משפחה', 'טלפון נייד', 'כיתה מוסד ראשי', 'דירה', 'Unnamed: 4', 'ממתינים לשיוך דירה', 'ללא דירה', 'אברכים', 'אברך']);
  const knownAptNames = new Set(
    aptEntries
      .map(e => cleanApartmentTitle(e.apartmentName) || e.apartmentName)
      .filter(name => Boolean(name) && !invalidNames.has(name))
  );
  Object.values(CampaignState.apartmentMappings || {}).forEach(name => {
    const cleaned = cleanApartmentTitle(name) || name;
    if (cleaned && !invalidNames.has(cleaned)) knownAptNames.add(cleaned);
  });

  allAgents.forEach(agent => {
    // Exclude avrechim from apartments calculation
    if (isAvrechAgent(agent, studentsIndex, aptEntries)) {
      return;
    }

    const rawResolvedApt = resolveAgentApartment(agent, aptEntries);
    const resolvedApt = rawResolvedApt ? (cleanApartmentTitle(rawResolvedApt) || rawResolvedApt) : null;
    const aptName = resolvedApt || 'ממתינים לשיוך דירה';
    const displayName = agent.name;
    const phone = agent.phone || '';

    if (q) {
      const haystack = (displayName + ' ' + phone + ' ' + aptName).toLowerCase();
      if (!haystack.includes(q)) return;
    }

    if (!aptBuckets[aptName]) {
      aptBuckets[aptName] = {
        apartmentName: aptName,
        isUnassigned: !resolvedApt,
        students: [],
        totalSupporters: 0
      };
    }

    const suppCount = getAgentSupportersCountAdmin(displayName, phone);
    aptBuckets[aptName].students.push({
      name: displayName,
      phone,
      suppCount,
      status: agent.status,
      statusType: agent.statusType,
      currentApartment: aptName
    });
    aptBuckets[aptName].totalSupporters += suppCount;
  });

  Object.values(aptBuckets).forEach(apt => {
    apt.students.sort((a, b) => b.suppCount - a.suppCount);
  });

  // Sort apartments by natural numerical order (דירה 1, דירה 2, דירה 3, דירה 4...), unassigned always last
  const sorted = Object.values(aptBuckets).sort((a, b) => {
    if (a.isUnassigned) return 1;
    if (b.isUnassigned) return -1;
    return compareApartmentNames(a.apartmentName, b.apartmentName);
  });

  // Sort known apartment names for dropdowns numerically
  const sortedKnownAptNames = Array.from(knownAptNames).sort(compareApartmentNames);

  return { sorted, allKnownAptNames: sortedKnownAptNames };
}

function renderAdminWingApartments(searchQuery) {
  const contentEl = document.getElementById('adminWingContent');
  const summaryEl = document.getElementById('adminWingSummaryCards');
  const metaEl = document.getElementById('adminWingMeta');
  if (!contentEl) return;

  const { sorted: data, allKnownAptNames } = buildAdminWingApartmentsData(searchQuery || '');

  if (data.length === 0) {
    contentEl.innerHTML = `<div class="admin-empty">🏠 לא נמצאו נציגים או דירות${searchQuery ? ' התואמים לחיפוש' : ''}</div>`;
    if (summaryEl) summaryEl.innerHTML = '';
    if (metaEl) metaEl.textContent = '';
    return;
  }

  // Summary cards per apartment
  const assignedData = data.filter(d => !d.isUnassigned);
  const maxSupp = assignedData.length > 0 ? Math.max(...assignedData.map(d => d.totalSupporters)) : 0;

  if (summaryEl) {
    summaryEl.innerHTML = data.map(d => {
      const isTop = !d.isUnassigned && d.totalSupporters > 0 && d.totalSupporters === maxSupp;
      const cardTitle = d.isUnassigned ? '⚠️ ללא דירה' : escapeHtml(d.apartmentName);
      return `<div class="admin-summary-card ${isTop ? 'top-class' : ''} ${d.isUnassigned ? 'unassigned-card' : ''}">
        <div class="asc-label">${cardTitle}</div>
        <div class="asc-num">${d.totalSupporters}</div>
        <div class="asc-sub">${d.students.length} נציגים</div>
      </div>`;
    }).join('');
  }

  const totalAgentsCount = data.reduce((s, d) => s + d.students.length, 0);
  const totalSuppAll = data.reduce((s, d) => s + d.totalSupporters, 0);
  const assignedAptsCount = data.filter(d => !d.isUnassigned).length;

  if (metaEl) {
    metaEl.textContent = `${assignedAptsCount} דירות פעילות · ${totalAgentsCount} נציגים · ${totalSuppAll} תומכים דירתיים 🏠`;
  }

  // Accordion per apartment
  contentEl.innerHTML = data.map((apt, i) => {
    const isUnassigned = apt.isUnassigned;
    const expanded = (i === 0 || isUnassigned) ? 'expanded' : '';
    const arrowOpen = (i === 0 || isUnassigned) ? 'open' : '';

    const rows = apt.students.map(s => {
      const initials = (s.name || '?').split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('');
      const statusBadge = s.statusType === 'former'
        ? `<span style="font-size: 0.7rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">לשעבר</span>`
        : `<span style="font-size: 0.7rem; color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">פעיל</span>`;

      // Apartment changer dropdown options
      const aptOptions = allKnownAptNames.filter(n => n && n !== 'ממתינים לשיוך דירה' && n !== 'ללא דירה').map(name => {
        const sel = name === s.currentApartment ? 'selected' : '';
        return `<option value="${escapeHtml(name)}" ${sel}>${escapeHtml(name)}</option>`;
      }).join('');

      return `<div class="admin-student-row">
        <div class="admin-student-info">
          <div class="admin-student-avatar" style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-color: #6ee7b7; color: #047857;">${escapeHtml(initials)}</div>
          <div>
            <div class="admin-student-name">
              ${escapeHtml(s.name)}
              ${statusBadge}
            </div>
            <div class="admin-student-phone" dir="ltr">${escapeHtml(s.phone || 'ללא טלפון')}</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap: 10px;">
          <!-- Apartment selector for transferring/assigning an agent -->
          <div style="display:flex; align-items:center; gap: 4px;" title="העבר דירה לנציג זה (יסתנכרן לכל המחשבים)">
            <select class="admin-class-changer" 
              data-agent-name="${escapeHtml(s.name)}" 
              data-agent-phone="${escapeHtml(s.phone)}"
              onchange="handleApartmentChange(this)"
              style="max-width: 140px;">
              <option value="__NONE__" ${isUnassigned ? 'selected' : ''}>⚠️ ללא דירה</option>
              <option value="__AVRECH__">🎓 אברכים (אינו בדירה)</option>
              ${aptOptions}
              <option value="__NEW__">+ דירה חדשה...</option>
            </select>
          </div>

          <div class="admin-student-supporters">
            <span class="admin-supp-pill ${s.suppCount > 0 ? '' : 'zero'}">${s.suppCount}</span>
            <span class="admin-supp-label">תומכים</span>
          </div>
        </div>
      </div>`;
    }).join('');

    const aptBadgeIcon = isUnassigned ? '⚠️' : '🏠';
    const aptTitleText = isUnassigned ? 'נציגים ממתינים לשיוך דירה' : escapeHtml(apt.apartmentName);
    const aptBadgeBg = isUnassigned ? 'background: #f59e0b;' : '';

    return `<div class="admin-class-section ${isUnassigned ? 'unassigned-section' : ''}">
      <div class="admin-class-header" onclick="toggleAdminClass(this)">
        <div class="admin-class-title">
          <div class="admin-apt-badge" style="${aptBadgeBg}">${aptBadgeIcon}</div>
          <div>
            <div class="admin-class-name">${aptTitleText}</div>
            <div class="admin-class-sub">${apt.students.length} נציגים בדירה</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <div class="admin-class-stat">
            <div>
              <div class="admin-class-stat-num">${apt.totalSupporters}</div>
              <div class="admin-class-stat-label">תומכים<br>בדירה</div>
            </div>
          </div>
          <svg class="admin-class-toggle ${arrowOpen}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="admin-class-body ${expanded}">${rows}</div>
    </div>`;
  }).join('');
}

// User changed apartment from dropdown
function handleApartmentChange(selectEl) {
  const agentName = selectEl.getAttribute('data-agent-name');
  const agentPhone = selectEl.getAttribute('data-agent-phone');
  let chosenApt = selectEl.value;

  if (chosenApt === '__NONE__') {
    saveAgentApartmentMapping(agentName, agentPhone, 'ללא דירה');
    return;
  }

  if (chosenApt === '__AVRECH__') {
    saveAgentApartmentMapping(agentName, agentPhone, 'אברכים');
    // Also set their class to אברכים if unassigned or desired
    saveAgentClassMapping(agentName, agentPhone, 'אברכים');
    return;
  }

  if (chosenApt === '__NEW__') {
    const custom = prompt(`הזן שם או מספר דירה עבור ${agentName}:`);
    if (!custom || !custom.trim()) {
      selectEl.value = '';
      return;
    }
    chosenApt = custom.trim();
  }

  if (chosenApt) {
    saveAgentApartmentMapping(agentName, agentPhone, chosenApt);
  }
}

// User changed class from dropdown
function handleClassChange(selectEl) {
  const agentName = selectEl.getAttribute('data-agent-name');
  const agentPhone = selectEl.getAttribute('data-agent-phone');
  const newClass = selectEl.value;
  if (!newClass) return;

  saveAgentClassMapping(agentName, agentPhone, newClass);
}

function toggleAdminClass(headerEl) {
  const section = headerEl.closest('.admin-class-section');
  if (!section) return;
  const body = section.querySelector('.admin-class-body');
  const toolbar = section.querySelector('.class-manager-toolbar');
  const banner = section.querySelector('.class-inactivity-banner');
  const arrow = headerEl.querySelector('.admin-class-toggle');
  if (!body) return;

  const isOpen = body.classList.contains('expanded');
  const willOpen = !isOpen;

  body.classList.toggle('expanded', willOpen);
  if (arrow) arrow.classList.toggle('open', willOpen);

  if (toolbar) {
    toolbar.style.display = willOpen ? 'flex' : 'none';
  }
  if (banner) {
    banner.style.display = willOpen ? 'block' : 'none';
  }
}

// ----------------------------------------------------
// AUTO REFRESH & STATE PRESERVATION (ZERO JITTER)
// ----------------------------------------------------
let lastRenderedSig = '';

function getAdminDataSignature() {
  const agents = CampaignState.agents || [];
  const leads = CampaignState.leads || [];
  const classMappings = CampaignState.classMappings || {};
  const aptMappings = CampaignState.apartmentMappings || {};
  return `${currentAdminWingTab}_${agents.length}_${leads.length}_${Object.keys(classMappings).length}_${Object.keys(aptMappings).length}_${APARTMENTS_RAW_DATA.length}`;
}

function updateAdminWingIfOpen() {
  const modal = document.getElementById('adminWingModal');
  if (!modal || !modal.classList.contains('open')) return;

  // Always keep target alerts updated
  updateAdminWingAlerts();

  if (adminWingScreen === 'portal') return;

  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT')) {
    return;
  }

  const currentSig = getAdminDataSignature();
  if (currentSig === lastRenderedSig) return;
  lastRenderedSig = currentSig;

  const modalBody = modal.querySelector('.modal-body-scroll') || modal;
  const prevScroll = modalBody.scrollTop;
  const openSectionNames = new Set();
  modal.querySelectorAll('.admin-class-section').forEach(sec => {
    const b = sec.querySelector('.admin-class-body');
    const nameEl = sec.querySelector('.admin-class-name');
    if (b && b.classList.contains('expanded') && nameEl) {
      openSectionNames.add(nameEl.textContent.trim());
    }
  });

  const searchInput = document.getElementById('adminWingSearch');
  renderCurrentAdminWingView(searchInput ? searchInput.value : '');

  modal.querySelectorAll('.admin-class-section').forEach(sec => {
    const b = sec.querySelector('.admin-class-body');
    const arrow = sec.querySelector('.admin-class-toggle');
    const toolbar = sec.querySelector('.class-manager-toolbar');
    const banner = sec.querySelector('.class-inactivity-banner');
    const nameEl = sec.querySelector('.admin-class-name');
    if (b && nameEl) {
      const isExpanded = openSectionNames.has(nameEl.textContent.trim());
      b.classList.toggle('expanded', isExpanded);
      if (arrow) arrow.classList.toggle('open', isExpanded);
      if (toolbar) toolbar.style.display = isExpanded ? 'flex' : 'none';
      if (banner) banner.style.display = isExpanded ? 'block' : 'none';
    }
  });
  modalBody.scrollTop = prevScroll;
}

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
async function initAdminWing() {
  const modal = document.getElementById('adminWingModal');
  const btnOpen = document.getElementById('btnAdminWing');
  const btnClose = document.getElementById('btnCloseAdminWing');
  const btnRefresh = document.getElementById('btnRefreshAdminWing');
  const searchInput = document.getElementById('adminWingSearch');
  if (!modal || !btnOpen) return;

  // Pre-load data from files & APIs
  await Promise.all([loadStudentsDataAdmin(), loadApartmentsDataAdmin()]);

  // Password Protection for Admin Wing
  const DEFAULT_ADMIN_PASSWORD = '0000';
  const PASSWORD_STORAGE_KEY = 'noam_admin_wing_password';

  function getAdminPassword() {
    return (window.CampaignState?.targets?.adminPassword) || (window.CampaignState?.adminPassword) || localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
  }

  async function setAdminPassword(newPass) {
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPass);
    if (window.CampaignState && window.CampaignState.targets) {
      window.CampaignState.targets.adminPassword = newPass;
    }
    try {
      await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: newPass })
      });
    } catch (err) {
      console.warn('Failed to sync admin password to server:', err);
    }
  }

  // Password verification modal elements
  const pwdModal = document.getElementById('adminPasswordModal');
  const pwdInput = document.getElementById('adminPasswordInput');
  const pwdError = document.getElementById('adminPasswordError');
  const btnSubmitPwd = document.getElementById('btnSubmitAdminPassword');
  const btnClosePwd = document.getElementById('btnCloseAdminPasswordModal');
  const btnCancelPwd = document.getElementById('btnCancelAdminPassword');
  const pwdForm = document.getElementById('adminPasswordForm');

  function openPasswordPrompt() {
    if (!pwdModal || !pwdInput) return;
    pwdInput.value = '';
    if (pwdError) {
      pwdError.style.display = 'none';
      pwdError.textContent = '';
    }
    pwdModal.classList.add('open');
    setTimeout(() => {
      pwdInput.focus();
    }, 120);
  }

  function closePasswordPrompt() {
    if (pwdModal) pwdModal.classList.remove('open');
  }

  async function proceedToAdminWing() {
    closePasswordPrompt();
    if (searchInput) searchInput.value = '';
    await Promise.all([loadStudentsDataAdmin(), loadApartmentsDataAdmin()]);
    showAdminWingPortal();
    modal.classList.add('open');
  }

  function handlePasswordSubmit() {
    const entered = (pwdInput.value || '').trim();
    const currentPass = getAdminPassword();
    if (entered === currentPass) {
      if (pwdError) pwdError.style.display = 'none';
      proceedToAdminWing();
    } else {
      if (pwdError) {
        pwdError.textContent = 'סיסמה שגויה! אנא נסה שנית';
        pwdError.style.display = 'block';
      }
      pwdInput.value = '';
      pwdInput.focus();
    }
  }

  if (btnSubmitPwd) btnSubmitPwd.addEventListener('click', handlePasswordSubmit);
  if (pwdForm) pwdForm.addEventListener('submit', (e) => { e.preventDefault(); handlePasswordSubmit(); });
  if (pwdInput) {
    pwdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePasswordSubmit();
      }
    });
  }
  if (btnClosePwd) btnClosePwd.addEventListener('click', closePasswordPrompt);
  if (btnCancelPwd) btnCancelPwd.addEventListener('click', closePasswordPrompt);
  if (pwdModal) {
    pwdModal.addEventListener('click', (e) => {
      if (e.target === pwdModal) closePasswordPrompt();
    });
  }

  // Click on Admin Wing button -> prompt for password
  btnOpen.addEventListener('click', () => {
    openPasswordPrompt();
  });

  // Change Password Modal Elements & Flow
  const changePwdModal = document.getElementById('adminChangePasswordModal');
  const btnTriggerChangePwd = document.getElementById('btnAdminChangePasswordTrigger');
  const btnCloseChangePwd = document.getElementById('btnCloseAdminChangePasswordModal');
  const btnCancelChangePwd = document.getElementById('btnCancelChangePassword');
  const stepCurrent = document.getElementById('changePasswordStepCurrent');
  const stepNew = document.getElementById('changePasswordStepNew');
  const currentPwdInput = document.getElementById('adminCurrentPasswordInput');
  const currentPwdError = document.getElementById('adminCurrentPasswordError');
  const btnVerifyCurrent = document.getElementById('btnVerifyCurrentPassword');
  const newPwdInput = document.getElementById('adminNewPasswordInput');
  const confirmPwdInput = document.getElementById('adminConfirmPasswordInput');
  const newPwdError = document.getElementById('adminNewPasswordError');
  const btnSaveNewPwd = document.getElementById('btnSaveNewPassword');

  function openChangePasswordModal() {
    if (!changePwdModal) return;
    if (stepCurrent) stepCurrent.style.display = 'block';
    if (stepNew) stepNew.style.display = 'none';
    if (currentPwdInput) currentPwdInput.value = '';
    if (newPwdInput) newPwdInput.value = '';
    if (confirmPwdInput) confirmPwdInput.value = '';
    if (currentPwdError) { currentPwdError.style.display = 'none'; currentPwdError.textContent = ''; }
    if (newPwdError) { newPwdError.style.display = 'none'; newPwdError.textContent = ''; }
    changePwdModal.classList.add('open');
    setTimeout(() => { if (currentPwdInput) currentPwdInput.focus(); }, 120);
  }

  function closeChangePasswordModal() {
    if (changePwdModal) changePwdModal.classList.remove('open');
  }

  function verifyCurrentPasswordForChange() {
    const entered = (currentPwdInput.value || '').trim();
    const actual = getAdminPassword();
    if (entered === actual) {
      if (currentPwdError) currentPwdError.style.display = 'none';
      if (stepCurrent) stepCurrent.style.display = 'none';
      if (stepNew) stepNew.style.display = 'flex';
      setTimeout(() => { if (newPwdInput) newPwdInput.focus(); }, 100);
    } else {
      if (currentPwdError) {
        currentPwdError.textContent = 'הסיסמה הנוכחית שהוזנה שגויה!';
        currentPwdError.style.display = 'block';
      }
      currentPwdInput.value = '';
      currentPwdInput.focus();
    }
  }

  async function saveNewPassword() {
    const newPass = (newPwdInput.value || '').trim();
    const confirmPass = (confirmPwdInput.value || '').trim();

    if (!newPass) {
      if (newPwdError) {
        newPwdError.textContent = 'אנא הזן סיסמה חדשה!';
        newPwdError.style.display = 'block';
      }
      newPwdInput.focus();
      return;
    }

    if (newPass.length < 3) {
      if (newPwdError) {
        newPwdError.textContent = 'הסיסמה קצרה מדי (מינימום 3 תווים)!';
        newPwdError.style.display = 'block';
      }
      newPwdInput.focus();
      return;
    }

    if (newPass !== confirmPass) {
      if (newPwdError) {
        newPwdError.textContent = 'הסיסמאות אינן תואמות! אנא ודא אימות תקין.';
        newPwdError.style.display = 'block';
      }
      confirmPwdInput.value = '';
      confirmPwdInput.focus();
      return;
    }

    // Success! Update password
    await setAdminPassword(newPass);
    closeChangePasswordModal();
    if (typeof showToast === 'function') {
      showToast('סיסמת אגף המנהל עודכנה בהצלחה! ✓');
    } else {
      alert('סיסמת אגף המנהל עודכנה בהצלחה!');
    }
  }

  if (btnTriggerChangePwd) btnTriggerChangePwd.addEventListener('click', openChangePasswordModal);
  if (btnCloseChangePwd) btnCloseChangePwd.addEventListener('click', closeChangePasswordModal);
  if (btnCancelChangePwd) btnCancelChangePwd.addEventListener('click', closeChangePasswordModal);
  if (btnVerifyCurrent) btnVerifyCurrent.addEventListener('click', verifyCurrentPasswordForChange);
  if (currentPwdInput) {
    currentPwdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyCurrentPasswordForChange();
      }
    });
  }
  if (btnSaveNewPwd) btnSaveNewPwd.addEventListener('click', saveNewPassword);
  if (confirmPwdInput) {
    confirmPwdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveNewPassword();
      }
    });
  }
  if (changePwdModal) {
    changePwdModal.addEventListener('click', (e) => {
      if (e.target === changePwdModal) closeChangePasswordModal();
    });
  }

  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  if (btnRefresh) {
    btnRefresh.addEventListener('click', async () => {
      btnRefresh.disabled = true;
      btnRefresh.textContent = 'מרענן...';
      await Promise.all([loadStudentsDataAdmin(), loadApartmentsDataAdmin()]);
      renderCurrentAdminWingView(searchInput ? searchInput.value : '');
      btnRefresh.disabled = false;
      btnRefresh.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        רענן נתונים
      `;
      if (typeof showToast === 'function') {
        showToast('נתוני שיעורים ודירות עודכנו וסונכרנו ✓');
      }
    });
  }

  if (searchInput) {
    let t;
    searchInput.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => renderCurrentAdminWingView(searchInput.value), 200);
    });
  }

  // Pre-load data in background immediately so Hero Rotator displays top apartments & classes
  Promise.all([loadStudentsDataAdmin(), loadApartmentsDataAdmin()]).then(() => {
    if (typeof window.renderTopApartmentsGrid === 'function') window.renderTopApartmentsGrid();
    if (typeof window.renderTopClassesGrid === 'function') window.renderTopClassesGrid();
    updateAdminWingAlerts();
  }).catch(() => {});
}

// Global window bindings
window.buildAdminWingApartmentsData = buildAdminWingApartmentsData;
window.buildAdminWingClassesData = buildAdminWingClassesData;
window.compareApartmentNames = compareApartmentNames;
window.cleanApartmentTitle = cleanApartmentTitle;
window.showAdminWingPortal = showAdminWingPortal;
window.openAdminWingSection = openAdminWingSection;
window.isAvrechClass = isAvrechClass;
window.isAvrechAgent = isAvrechAgent;

document.addEventListener('DOMContentLoaded', () => {
  initAdminWing();
});

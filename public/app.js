// Accurate Real Data State for Noam LeYisrael Campaign (Group: מדברה כעדן)
const CampaignState = {
  campaign: {
    id: 15,
    name: 'נעם לישראל · בראשות אבי מעוז',
    group: 'מדברה כעדן',
    status: 'פעיל'
  },
  // Configurable Campaign Goals
  targets: {
    totalCalls: 200000,
    dailyCalls: 5000,
    supportersTarget: 15000,
    leadsHandled: 471,
    activeAgents: 200,
    defaultAgentTarget: 50
  },
  // EXACT REAL METRICS FROM LIVE ADMIN (מדברה כעדן)
  metrics: {
    agentsCount: 192,
    activeAgentsCount: 145,
    activeRecently: 145,
    callsToday: 2905,
    callsTotal: 3446,
    resultsMessage: '',
    supportersCount: 94,
    thresholdCount: 87,
    hesitantCount: 93
  },
  // Overview Results Breakdown (Exact real data from live campaign admin)
  overviewResults: {
    supporters: 94,
    supportersPct: 3,
    threshold: 87,
    thresholdPct: 3,
    hesitant: 93,
    hesitantPct: 3,
    notSupporters: 1120,
    notSupportersPct: 33,
    noAnswer: 1951,
    noAnswerPct: 58,
    totalReported: 3345
  },
  // Leads & Total Count
  leads: [],
  leadsTotal: 16607,
  searchQuery: '',
  agentSearchQuery: '',
  // EXACT REAL AGENTS LIST FROM LIVE ADMIN
  agents: [
    {
      id: 1,
      name: 'טוביה זר אביב',
      phone: '053-5431148',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'חבר לשעבר (יצא לפני 57 דקות)',
      statusType: 'former',
      leads_open: 1,
      leads_today: 0,
      reports_count: 0,
      avg_time: '—',
      fixes: 0,
      released: 1,
      skips: 0
    },
    {
      id: 2,
      name: 'יהודה ורגון',
      phone: '055-9985563',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'חבר לשעבר (יצא לפני 59 דקות)',
      statusType: 'former',
      leads_open: 1,
      leads_today: 0,
      reports_count: 0,
      avg_time: '—',
      fixes: 0,
      released: 1,
      skips: 0
    },
    {
      id: 3,
      name: 'ידידיה שנור',
      phone: '055-9977313',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'חבר לשעבר (יצא היום 14:09)',
      statusType: 'former',
      leads_open: 1,
      leads_today: 1,
      reports_count: 1,
      avg_time: '—',
      fixes: 0,
      released: 1,
      skips: 0
    },
    {
      id: 4,
      name: 'יאיר שטראוס',
      phone: '058-7788681',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'חבר לשעבר (יצא היום 13:49)',
      statusType: 'former',
      leads_open: 1,
      leads_today: 0,
      reports_count: 0,
      avg_time: '—',
      fixes: 0,
      released: 1,
      skips: 0
    },
    {
      id: 5,
      name: 'שגיא מאיר',
      phone: '058-6071370',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'חבר לשעבר (יצא היום 10:26)',
      statusType: 'former',
      leads_open: 1,
      leads_today: 0,
      reports_count: 1,
      avg_time: '—',
      fixes: 0,
      released: 1,
      skips: 0
    },
    {
      id: 6,
      name: 'רועי לוי',
      phone: '055-9970588',
      group: 'מדברה כעדן',
      account: 'לא נוצר',
      status: 'עובד בקמפיין',
      statusType: 'active',
      leads_open: 0,
      leads_today: 0,
      reports_count: 0,
      avg_time: '—',
      fixes: 0,
      released: 0,
      skips: 0
    },
    {
      id: 7,
      name: 'נעם חנון',
      phone: '058-6699879',
      group: 'מדברה כעדן',
      account: 'נוצר',
      status: 'עובד בקמפיין',
      statusType: 'active',
      leads_open: 0,
      leads_today: 0,
      reports_count: 0,
      avg_time: '—',
      fixes: 0,
      released: 0,
      skips: 0
    }
  ],
  visibleColumns: {
    agent_name: true,
    agent_phone: true,
    agent_group: true,
    agent_account: true,
    agent_status: true,
    leads_open: true,
    leads_today: true,
    reports_count: true,
    supporters_count: true,
    agent_target: true,
    avg_time: true,
    fixes: true,
    released: true,
    skips: true
  },
  currentTab: 'tab-leads',
  activeLeadFilter: 'all',
  activeAgentRange: 'today',
  searchQuery: ''
};

// Column Definitions for Modal
const COLUMNS_CONFIG = [
  { key: 'agent_name', label: 'שם נציג' },
  { key: 'agent_phone', label: 'טלפון' },
  { key: 'agent_group', label: 'קבוצה' },
  { key: 'agent_account', label: 'חשבון אצל השותף' },
  { key: 'agent_status', label: 'מצב נציג' },
  { key: 'leads_open', label: 'ליד פתוח' },
  { key: 'leads_today', label: 'לידים היום' },
  { key: 'reports_count', label: 'דיווחים' },
  { key: 'supporters_count', label: 'תומכים (כולל חסימה ומתלבט)' },
  { key: 'agent_target', label: 'יעד אישי (תומכים)' },
  { key: 'avg_time', label: 'זמן ממוצע לליד' },
  { key: 'fixes', label: 'תיקונים' },
  { key: 'released', label: 'שוחררו' },
  { key: 'skips', label: 'דילוגים' }
];

// Expose state globally: a top-level `const` is NOT a window property,
// and several modules (hero rotator, rabbis) read window.CampaignState.
window.CampaignState = CampaignState;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadSavedSettings();
  initTabs();
  initTargetsModal();
  initColumnsModal();
  initAgentFilters();
  initLeadFilters();
  initSearch();
  initSync();
  initCookieModal();
  initSoundTestModal();
  initRabbisModal();
  initFullscreenToggle();

  updateAllViews();
});

// Fullscreen Toggle (מצב מסך מלא להסתרת שורת משימות וכרטיסיות דפדפן)
function initFullscreenToggle() {
  const btn = document.getElementById('btnToggleFullscreen');
  if (!btn) return;

  const updateFullscreenUI = () => {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const icon = document.getElementById('fullscreenIcon');
    const tooltip = document.getElementById('fullscreenTooltip');
    if (isFull) {
      btn.classList.add('fullscreen-active');
      if (tooltip) tooltip.textContent = 'צא ממסך מלא (Esc / F11)';
      if (icon) {
        icon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>';
      }
    } else {
      btn.classList.remove('fullscreen-active');
      if (tooltip) tooltip.textContent = 'מסך מלא (F11)';
      if (icon) {
        icon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>';
      }
    }
  };

  btn.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => { });
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });

  document.addEventListener('fullscreenchange', updateFullscreenUI);
  document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
}

// Cookie Refresh Modal
function initCookieModal() {
  const modal = document.getElementById('cookieModal');
  const btnOpen = document.getElementById('btnRefreshCookie');
  const btnClose = document.getElementById('btnCloseCookieModal');
  const btnClose2 = document.getElementById('btnCloseCookieModal2');
  const btnSave = document.getElementById('btnSaveCookie');
  const textarea = document.getElementById('inputCookieValue');
  const result = document.getElementById('cookieTestResult');

  if (!modal || !btnOpen) return;

  btnOpen.addEventListener('click', () => {
    // Pre-fill with current cookie from server
    fetch('/api/config').then(r => r.json()).then(cfg => {
      if (cfg.cookie) textarea.value = cfg.cookie;
    }).catch(() => { });
    modal.classList.add('open');
  });

  const closeModal = () => { modal.classList.remove('open'); result.textContent = ''; };
  btnClose.addEventListener('click', closeModal);
  btnClose2.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  btnSave.addEventListener('click', async () => {
    let val = textarea.value.trim();
    if (!val) { result.textContent = '⚠️ יש להזין את הטוקן'; result.style.color = '#ef4444'; return; }
    // Strip "CF_Authorization=" prefix if user pasted the full cookie string
    if (val.startsWith('CF_Authorization=')) val = val.substring('CF_Authorization='.length);

    btnSave.disabled = true;
    btnSave.textContent = 'בודק...';
    result.textContent = 'שולח לשרת...';
    result.style.color = 'var(--text-muted)';

    try {
      // Save cookie to server config
      const saveRes = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_url: 'https://sms-admin.talphotos.win/admin/campaigns/15', cookie: val })
      });

      if (!saveRes.ok) throw new Error('שגיאת שמירה');

      // Test the cookie by running a sync
      result.textContent = 'בודק חיבור לאדמין...';
      const testRes = await fetch('/api/proxy?url=' + encodeURIComponent('https://sms-admin.talphotos.win/admin/campaigns/15?tab=agents'));

      if (testRes.ok) {
        const html = await testRes.text();
        const phones = (html.match(/05\d-?\d{7}/g) || []);
        if (phones.length > 0) {
          result.textContent = `✅ חיבור הצליח! נמצאו ${phones.length} מספרי טלפון. הסנכרון יעבוד עכשיו.`;
          result.style.color = '#22c55e';
          showToast('✅ הקוקי עודכן בהצלחה - מסנכרן נתונים...');
          try {
            await fetch('/api/sync', { method: 'POST' });
            await fetchLatestDataFromServer();
          } catch (e) { }
          setTimeout(closeModal, 1500);
        } else if (html.includes('cloudflareaccess') || html.includes('login')) {
          result.textContent = '❌ הטוקן לא תקין - הכתובת הפנתה ל-Cloudflare. יש להעתיק טוקן חדש.';
          result.style.color = '#ef4444';
        } else {
          result.textContent = '⚠️ החיבור עבד אך לא נמצאו נציגים - ייתכן שדף ריק.';
          result.style.color = '#f59e0b';
        }
      } else {
        result.textContent = '❌ הטוקן לא תקין (שגיאה ' + testRes.status + ')';
        result.style.color = '#ef4444';
      }
    } catch (e) {
      result.textContent = 'שגיאה: ' + e.message;
      result.style.color = '#ef4444';
    } finally {
      btnSave.disabled = false;
      btnSave.textContent = 'שמור ובדוק חיבור';
    }
  });
}

// Load settings from localStorage
function loadSavedSettings() {
  // Clear any old local targets override so all devices stay synchronized with the central server
  localStorage.removeItem('noam_campaign_targets');

  const savedCols = localStorage.getItem('noam_campaign_columns');
  if (savedCols) {
    try {
      CampaignState.visibleColumns = { ...CampaignState.visibleColumns, ...JSON.parse(savedCols) };
    } catch (e) { }
  }
}

// Master View Update
function updateAllViews() {
  renderTargetsProgress();
  renderRealMetricCards();
  renderOverviewResults();
  renderTopAgentsGrid();
  renderTopApartmentsGrid();
  renderTopClassesGrid();
  renderHeroCharts();
  renderRabbisPanel();
  renderLeadsView();
  renderAgentsTable();
  updateHeadersVisibility();
  checkNewSupporters();
  if (typeof updateAdminWingIfOpen === 'function') {
    updateAdminWingIfOpen();
  }
}

// Compute results breakdown (Supporters, Threshold Supporters, Hesitant, Not Supporters, No Answer)
function getResultsBreakdown() {
  const leads = CampaignState.leads || [];
  let supporters = 0;       // 'תומך'
  let threshold = 0;        // 'תומך אחוז חסימה'
  let hesitant = 0;         // 'מתלבט'
  let notSupporters = 0;    // 'לא תומך'
  let noAnswer = 0;         // 'אין מענה'
  let other = 0;

  leads.forEach(lead => {
    const res = (lead.result || '').trim();
    if (res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה')) {
      threshold++;
    } else if (res === 'מתלבט' || res.includes('מתלבט')) {
      hesitant++;
    } else if (res === 'תומך' || (res.includes('תומך') && !res.includes('לא'))) {
      supporters++;
    } else if (res === 'לא תומך' || res.includes('לא תומך')) {
      notSupporters++;
    } else if (res.includes('אין מענה')) {
      noAnswer++;
    } else if (res) {
      other++;
    }
  });

  const totalReported = supporters + threshold + hesitant + notSupporters + noAnswer + other;
  return {
    supporters,
    threshold,
    hesitant,
    notSupporters,
    noAnswer,
    other,
    totalReported,
    supportersPct: totalReported > 0 ? Math.round((supporters / totalReported) * 100) : 0,
    thresholdPct: totalReported > 0 ? Math.round((threshold / totalReported) * 100) : 0,
    hesitantPct: totalReported > 0 ? Math.round((hesitant / totalReported) * 100) : 0,
    notSupportersPct: totalReported > 0 ? Math.round((notSupporters / totalReported) * 100) : 0,
    noAnswerPct: totalReported > 0 ? Math.round((noAnswer / totalReported) * 100) : 0
  };
}

// Compute top agents ranked by total supporters achieved (accurate across ALL campaign leads: תומך + אחוז חסימה + מתלבט)
function getTopAgentsRanking(limit = 5) {
  const agentStats = {};
  const leads = CampaignState.leads || [];

  leads.forEach(lead => {
    const res = (lead.result || '').trim();
    const isFullSupp = res === 'תומך' || (res.includes('תומך') && !res.includes('לא') && !res.includes('אחוז חסימה'));
    const isThresh = res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה');
    const isHesitant = res === 'מתלבט' || res.includes('מתלבט');

    if ((isFullSupp || isThresh || isHesitant) && lead.last_agent) {
      const cleanName = lead.last_agent.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/-/g, '').trim();
      if (cleanName && cleanName !== '—') {
        if (!agentStats[cleanName]) {
          agentStats[cleanName] = { name: cleanName, supporters: 0, threshold: 0, hesitant: 0, total: 0 };
        }
        if (isFullSupp) agentStats[cleanName].supporters++;
        if (isThresh) agentStats[cleanName].threshold++;
        if (isHesitant) agentStats[cleanName].hesitant = (agentStats[cleanName].hesitant || 0) + 1;
        agentStats[cleanName].total++;
      }
    }
  });

  let list = Object.values(agentStats);
  list.sort((a, b) => b.total - a.total || b.supporters - a.supporters);

  // Fallback: If fewer than limit, fill from reps list based on calls/reports
  if (list.length < limit && CampaignState.agents && CampaignState.agents.length > 0) {
    const existingNames = new Set(list.map(a => a.name));
    const sortedAgents = [...CampaignState.agents].sort((a, b) =>
      ((b.reports_count || 0) + (b.leads_today || 0)) - ((a.reports_count || 0) + (a.leads_today || 0))
    );

    for (const ag of sortedAgents) {
      if (list.length >= limit) break;
      const clean = (ag.name || '').trim();
      if (!existingNames.has(clean)) {
        list.push({
          name: clean,
          supporters: 0,
          threshold: 0,
          total: (ag.reports_count || 0) + (ag.leads_today || 0),
          isFallback: true
        });
        existingNames.add(clean);
      }
    }
  }

  return list.slice(0, limit);
}

function getTopAgentBySupporters() {
  const top = getTopAgentsRanking(1);
  if (top.length > 0) {
    return { name: top[0].name, count: top[0].total };
  }
  return { name: '—', count: 0 };
}

// Render Top 5 Starting Five Agents (חמישייה פותחת)
function renderTopAgentsGrid() {
  const container = document.getElementById('topAgentsGrid');
  if (!container) return;

  const top5 = getTopAgentsRanking(5);
  const ranksConfig = [
    { rank: 1, label: 'מקום 1', badge: '🥇 מקום 1', cardClass: 'rank-1' },
    { rank: 2, label: 'מקום 2', badge: '🥈 מקום 2', cardClass: 'rank-2' },
    { rank: 3, label: 'מקום 3', badge: '🥉 מקום 3', cardClass: 'rank-3' },
    { rank: 4, label: 'מקום 4', badge: '⭐ מקום 4', cardClass: 'rank-4' },
    { rank: 5, label: 'מקום 5', badge: '⭐ מקום 5', cardClass: 'rank-5' },
  ];

  container.innerHTML = ranksConfig.map((cfg, idx) => {
    const ag = top5[idx];
    const name = ag ? ag.name : '—';
    const total = ag ? ag.total : 0;
    const supp = ag ? ag.supporters : 0;
    const thresh = ag ? ag.threshold : 0;

    let subText = '0 תומכים';
    if (ag) {
      if (ag.isFallback) {
        subText = total > 0 ? `${formatNum(total)} דיווחים / שיחות` : 'טרם נרשמו תומכים';
      } else {
        subText = `${formatNum(total)} תומכים`;
      }
    }

    return `
      <div class="overview-result-card top-agent-rank-card ${cfg.cardClass}">
        <div class="result-header">
          <span class="result-title">${cfg.label}</span>
          <span class="result-tag tag-${cfg.cardClass}">${cfg.badge}</span>
        </div>
        <div class="top-agent-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
        <div class="top-agent-stats">${escapeHtml(subText)}</div>
      </div>
    `;
  }).join('');
}

// Render Top 5 Starting Five Apartments (חמישייה פותחת - דירות)
function renderTopApartmentsGrid() {
  const container = document.getElementById('topApartmentsGrid');
  if (!container) return;

  if (typeof buildAdminWingApartmentsData !== 'function') {
    container.innerHTML = '<div style="color:var(--text-muted);padding:10px;">טוען נתוני דירות...</div>';
    return;
  }

  const { sorted } = buildAdminWingApartmentsData('');
  // Filter out unassigned, "ללא דירה", and "אברכים" - take top 5 with supporters
  const topApts = (sorted || [])
    .filter(a => {
      if (a.isUnassigned || !a.apartmentName) return false;
      const cleanName = (a.apartmentName || '').trim().toLowerCase();
      if (cleanName === 'ללא דירה' || cleanName === 'אברכים' || cleanName.includes('אברך')) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (b.totalSupporters !== a.totalSupporters) {
        return b.totalSupporters - a.totalSupporters;
      }
      if (typeof compareApartmentNames === 'function') {
        return compareApartmentNames(a.apartmentName, b.apartmentName);
      }
      return (a.apartmentName || '').localeCompare(b.apartmentName || '', 'he', { numeric: true });
    })
    .slice(0, 5);

  const ranksConfig = [
    { rank: 1, label: 'מקום 1', badge: '🥇 מקום 1', cardClass: 'rank-1' },
    { rank: 2, label: 'מקום 2', badge: '🥈 מקום 2', cardClass: 'rank-2' },
    { rank: 3, label: 'מקום 3', badge: '🥉 מקום 3', cardClass: 'rank-3' },
    { rank: 4, label: 'מקום 4', badge: '⭐ מקום 4', cardClass: 'rank-4' },
    { rank: 5, label: 'מקום 5', badge: '⭐ מקום 5', cardClass: 'rank-5' },
  ];

  container.innerHTML = ranksConfig.map((cfg, idx) => {
    const apt = topApts[idx];
    const name = apt ? apt.apartmentName : '—';
    const total = apt ? apt.totalSupporters : 0;
    const residents = apt ? apt.students.length : 0;

    let subText = '0 תומכים';
    if (apt) {
      subText = `${formatNum(total)} תומכים · ${residents} נציגים`;
    }

    return `
      <div class="overview-result-card top-agent-rank-card ${cfg.cardClass}">
        <div class="result-header">
          <span class="result-title">${cfg.label}</span>
          <span class="result-tag tag-${cfg.cardClass}">${cfg.badge}</span>
        </div>
        <div class="top-agent-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
        <div class="top-agent-stats">${escapeHtml(subText)}</div>
      </div>
    `;
  }).join('');
}

// Render Top 3 Classes (שלישייה מובילה - שיעורים)
function renderTopClassesGrid() {
  const container = document.getElementById('topClassesGrid');
  if (!container) return;

  if (typeof buildAdminWingClassesData !== 'function') {
    container.innerHTML = '<div style="color:var(--text-muted);padding:10px;">טוען נתוני שיעורים...</div>';
    return;
  }

  const classesData = buildAdminWingClassesData('');
  // Filter out unassigned and any 'אברכים' class - each person belongs to their own class
  const filteredClasses = (classesData || [])
    .filter(c => !c.isUnassigned && Boolean((c.className || '').trim()) && !c.className.includes('אברכ'))
    .sort((a, b) => b.totalSupporters - a.totalSupporters)
    .slice(0, 3);

  const ranksConfig = [
    { rank: 1, label: 'מקום 1', badge: '🥇 מקום 1', cardClass: 'rank-1' },
    { rank: 2, label: 'מקום 2', badge: '🥈 מקום 2', cardClass: 'rank-2' },
    { rank: 3, label: 'מקום 3', badge: '🥉 מקום 3', cardClass: 'rank-3' },
  ];

  container.innerHTML = ranksConfig.map((cfg, idx) => {
    const cls = filteredClasses[idx];
    let name = '—';
    if (cls) {
      const cn = cls.className.trim();
      if (cn === 'מבוגר') {
        name = 'שיעור מבוגר';
      } else {
        name = `שיעור ${cn}`;
      }
    }
    const total = cls ? cls.totalSupporters : 0;
    const studentsCount = cls ? cls.students.length : 0;

    let subText = '0 תומכים';
    if (cls) {
      subText = `${formatNum(total)} תומכים · ${studentsCount} נציגים`;
    }

    return `
      <div class="overview-result-card top-agent-rank-card ${cfg.cardClass}">
        <div class="result-header">
          <span class="result-title">${cfg.label}</span>
          <span class="result-tag tag-${cfg.cardClass}">${cfg.badge}</span>
        </div>
        <div class="top-agent-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
        <div class="top-agent-stats">${escapeHtml(subText)}</div>
      </div>
    `;
  }).join('');
}

window.renderTopApartmentsGrid = renderTopApartmentsGrid;
window.renderTopClassesGrid = renderTopClassesGrid;

// =============================================
// HERO ROTATOR SLIDE 3: CHARTS RENDERING
// Both styled as smooth green spline waves
// 1. Daily Hourly Supporters Chart (Strictly Today)
// 2. Last Hour Dynamic Minute Trend Chart (Strictly Today & Now)
// =============================================
function renderHeroCharts() {
  renderHourlySupportersChart();
  renderRecentHourSupportersChart();
}

// Helper to verify if lead update belongs strictly to today
function isLeadFromToday(lead, now = new Date()) {
  const upd = (lead.updated || '').trim();
  if (!upd) return false;

  // Past relative days are strictly excluded
  if (upd.includes('אתמול') || upd.includes('שלשום')) return false;

  // Relative recent times (e.g. "עכשיו", "לפני 5 דקות", "לפני שעה") are always today
  if (upd.includes('עכשיו') || upd.includes('לפני דק') || upd.includes('חצי שעה') || upd.includes('לפני שעה') || upd.includes('שעתיים') || /לפני\s*\d+\s*(דק|שע)/.test(upd)) {
    return true;
  }

  // Explicit "היום"
  if (upd.includes('היום')) return true;

  // Exact DD/MM check against current date
  const d = now.getDate();
  const m = now.getMonth() + 1;
  const dPad = String(d).padStart(2, '0');
  const mPad = String(m).padStart(2, '0');

  const todayPatterns = [
    `${dPad}/${mPad}`,
    `${d}/${m}`,
    `${dPad}.${mPad}`,
    `${d}.${m}`
  ];

  for (const pat of todayPatterns) {
    if (upd.startsWith(pat) || upd.includes(` ${pat}`)) {
      return true;
    }
  }

  // Any other date format (e.g. 12/10, 13/10) is excluded
  const dateMatch = upd.match(/(\d{1,2})[\/\.](\d{1,2})/);
  if (dateMatch) {
    const pD = parseInt(dateMatch[1], 10);
    const pM = parseInt(dateMatch[2], 10);
    return pD === d && pM === m;
  }

  // If time only (e.g. "14:25") and not explicitly another date, count as today
  if (/^\d{1,2}:\d{2}/.test(upd)) {
    return true;
  }

  return false;
}

// Calculate how many minutes ago a lead was updated (handles relative "עכשיו", "לפני 10 דקות" as well as "16:45")
function getLeadMinutesAgo(lead, now = new Date()) {
  const upd = (lead.updated || '').trim();
  if (!upd) return null;

  // 1. "עכשיו" -> 0 minutes ago
  if (upd === 'עכשיו' || upd.includes('עכשיו')) {
    return 0;
  }

  // 2. "לפני דקה" -> 1 minute ago
  if (upd.includes('לפני דקה')) {
    return 1;
  }

  // 3. "לפני X דקות" / "לפני X דק'"
  const minMatch = upd.match(/לפני\s*(\d+)\s*דק/);
  if (minMatch) {
    return parseInt(minMatch[1], 10);
  }

  // 4. "חצי שעה"
  if (upd.includes('חצי שעה')) {
    return 30;
  }

  // 5. "לפני שעה"
  if (upd.includes('לפני שעה') && !upd.includes('שעתיים') && !upd.match(/לפני\s*\d+\s*שעות/)) {
    return 60;
  }

  // 6. "לפני שעתיים"
  if (upd.includes('שעתיים')) {
    return 120;
  }

  // 7. "לפני X שעות"
  const hourMatch = upd.match(/לפני\s*(\d+)\s*שעות/);
  if (hourMatch) {
    return parseInt(hourMatch[1], 10) * 60;
  }

  // 8. Explicit timestamp like "17:15" or "15/10 17:15"
  const timeMatch = upd.match(/(\d{1,2}):(\d{2})/);
  if (timeMatch) {
    const h = parseInt(timeMatch[1], 10);
    const min = parseInt(timeMatch[2], 10);
    const leadTotalMin = h * 60 + min;
    const currentTotalMin = now.getHours() * 60 + now.getMinutes();
    const diff = currentTotalMin - leadTotalMin;
    if (diff >= 0 && diff < 1440) {
      return diff;
    }
  }

  return null;
}

// Box 1: Daily Supporters Breakdown by Hours of Today (Green Spline Wave)
function renderHourlySupportersChart() {
  const container = document.getElementById('hourlyChartContainer');
  const badge = document.getElementById('hourlyChartBadge');
  if (!container) return;

  const leads = CampaignState.leads || [];
  const now = new Date();

  // Filter strictly to today's supporters (full supporters + threshold supporters + hesitant)
  const todaySupporters = leads.filter(l => {
    const r = (l.result || '').trim();
    const isSupp = (r === 'תומך' || (r.includes('תומך') && !r.includes('לא'))) || r.includes('אחוז חסימה') || r.includes('מתלבט');
    return isSupp && isLeadFromToday(l, now);
  });

  // Hours: from 08:00 to 22:00
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const countsByHour = {};
  hours.forEach(h => countsByHour[h] = 0);

  let todayTotal = 0;
  todaySupporters.forEach(l => {
    todayTotal++;
    let h = null;
    const diff = getLeadMinutesAgo(l, now);
    if (diff !== null) {
      const leadDate = new Date(now.getTime() - diff * 60000);
      h = leadDate.getHours();
    } else {
      const upd = l.updated || '';
      const m = upd.match(/(\d{1,2}):(\d{2})/);
      if (m) {
        h = parseInt(m[1], 10);
      }
    }
    if (h !== null && countsByHour[h] !== undefined) {
      countsByHour[h]++;
    }
  });

  if (badge) {
    badge.textContent = `${formatNum(todayTotal)} תומכים היום`;
  }

  const svgW = 380;
  const svgH = 88;
  const padL = 24;
  const padR = 24;
  const baseLineY = 62;
  const topY = 14;
  const availH = baseLineY - topY;

  const maxVal = Math.max(2, ...Object.values(countsByHour));
  const stepX = (svgW - padL - padR) / (hours.length - 1);

  // Generate coordinates for each hour point
  const points = hours.map((h, idx) => {
    const count = countsByHour[h] || 0;
    const x = padL + idx * stepX;
    const y = baseLineY - (count / maxVal) * availH;
    const label = `${h < 10 ? '0' + h : h}:00`;
    return { x, y, count, label, hour: h };
  });

  // Generate smooth cubic bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpx1 = p0.x + (p1.x - p0.x) / 2;
    const cpy1 = p0.y;
    const cpx2 = p0.x + (p1.x - p0.x) / 2;
    const cpy2 = p1.y;
    pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${baseLineY} L ${points[0].x} ${baseLineY} Z`;

  // Draw points & labels
  let pointsHtml = '';
  points.forEach(pt => {
    const isPeak = pt.count > 0;
    const dotR = isPeak ? 4.5 : 2.5;
    const fill = isPeak ? '#10b981' : '#cbd5e1';
    const strokeW = isPeak ? 2 : 1.5;
    const valText = isPeak ? `<text x="${pt.x}" y="${pt.y - 7}" text-anchor="middle" font-size="9" font-weight="800" fill="#047857">${pt.count}</text>` : '';

    // Label hours every 2 hours: 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00
    const showLabel = (pt.hour % 2 === 0);
    const labelText = showLabel ? `<text x="${pt.x}" y="${baseLineY + 16}" text-anchor="middle" font-size="8" font-weight="700" fill="#64748b">${pt.label}</text>` : '';

    pointsHtml += `
      <g style="cursor: pointer;">
        <title>שעה ${pt.label} - ${pt.hour < 10 ? '0' + pt.hour : pt.hour}:59 : ${pt.count} תומכים היום</title>
        <circle cx="${pt.x}" cy="${pt.y}" r="${dotR}" fill="${fill}" stroke="#ffffff" stroke-width="${strokeW}" />
        ${valText}
        ${labelText}
      </g>
    `;
  });

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="hourlyWaveLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38b6ff" />
          <stop offset="50%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="hourlyWaveAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <!-- Horizontal grid guidelines -->
      <line x1="${padL}" y1="${baseLineY}" x2="${svgW - padR}" y2="${baseLineY}" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="2 2" />
      <line x1="${padL}" y1="${baseLineY - availH / 2}" x2="${svgW - padR}" y2="${baseLineY - availH / 2}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3" />
      
      <!-- Area Under Curve -->
      <path d="${areaD}" fill="url(#hourlyWaveAreaGrad)" />
      <!-- Stroke Curve -->
      <path d="${pathD}" fill="none" stroke="url(#hourlyWaveLineGrad)" stroke-width="3" stroke-linecap="round" />
      
      <!-- Dots & Labels -->
      ${pointsHtml}
    </svg>
  `;
}

// Box 2: Dynamic Minutes Trend of the Last Hour (Green Spline Wave - Strictly Today & Now)
function renderRecentHourSupportersChart() {
  const container = document.getElementById('recentChartContainer');
  const badge = document.getElementById('recentChartBadge');
  if (!container) return;

  const leads = CampaignState.leads || [];
  const now = new Date();

  // Filter strictly to today's supporters (full supporters + threshold supporters + hesitant)
  const todaySupporters = leads.filter(l => {
    const r = (l.result || '').trim();
    const isSupp = (r === 'תומך' || (r.includes('תומך') && !r.includes('לא'))) || r.includes('אחוז חסימה') || r.includes('מתלבט');
    return isSupp && isLeadFromToday(l, now);
  });

  // 6 intervals of 10 min across the last hour
  const intervals = [
    { label: "-50דק'", count: 0 },
    { label: "-40דק'", count: 0 },
    { label: "-30דק'", count: 0 },
    { label: "-20דק'", count: 0 },
    { label: "-10דק'", count: 0 },
    { label: 'עכשיו', count: 0 }
  ];

  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  let totalRecent = 0;
  todaySupporters.forEach(l => {
    const diff = getLeadMinutesAgo(l, now);
    if (diff !== null && diff >= 0 && diff <= 60) {
      const bucket = Math.max(0, Math.min(5, Math.floor((60 - diff) / 10)));
      intervals[bucket].count++;
      totalRecent++;
    }
  });

  if (badge) {
    badge.textContent = totalRecent > 0 ? `⚡ ${totalRecent} בשעה זו` : '0 בשעה זו';
  }

  const svgW = 380;
  const svgH = 88;
  const padL = 28;
  const padR = 28;
  const baseLineY = 62;
  const topY = 14;
  const availH = baseLineY - topY;

  const maxVal = Math.max(2, ...intervals.map(i => i.count));
  const stepX = (svgW - padL - padR) / (intervals.length - 1);

  // Generate coordinates
  const points = intervals.map((item, idx) => {
    const x = padL + idx * stepX;
    const y = baseLineY - (item.count / maxVal) * availH;
    return { x, y, count: item.count, label: item.label };
  });

  // Generate smooth cubic bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpx1 = p0.x + (p1.x - p0.x) / 2;
    const cpy1 = p0.y;
    const cpx2 = p0.x + (p1.x - p0.x) / 2;
    const cpy2 = p1.y;
    pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${baseLineY} L ${points[0].x} ${baseLineY} Z`;

  // Draw points & labels
  let pointsHtml = '';
  points.forEach(pt => {
    const isPeak = pt.count > 0;
    const dotR = isPeak ? 4.5 : 3;
    const fill = isPeak ? '#10b981' : '#cbd5e1';
    const strokeW = isPeak ? 2 : 1.5;
    const valText = pt.count > 0 ? `<text x="${pt.x}" y="${pt.y - 7}" text-anchor="middle" font-size="9" font-weight="800" fill="#047857">${pt.count}</text>` : '';

    pointsHtml += `
      <g style="cursor: pointer;">
        <title>${pt.label}: ${pt.count} תומכים בשעה האחרונה</title>
        <circle cx="${pt.x}" cy="${pt.y}" r="${dotR}" fill="${fill}" stroke="#ffffff" stroke-width="${strokeW}" />
        ${valText}
        <text x="${pt.x}" y="${baseLineY + 16}" text-anchor="middle" font-size="8" font-weight="700" fill="#64748b">${pt.label}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="waveLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38b6ff" />
          <stop offset="50%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="waveAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <!-- Horizontal grid guidelines -->
      <line x1="${padL}" y1="${baseLineY}" x2="${svgW - padR}" y2="${baseLineY}" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="2 2" />
      <line x1="${padL}" y1="${baseLineY - availH / 2}" x2="${svgW - padR}" y2="${baseLineY - availH / 2}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3" />
      
      <!-- Area Under Curve -->
      <path d="${areaD}" fill="url(#waveAreaGrad)" />
      <!-- Stroke Curve -->
      <path d="${pathD}" fill="none" stroke="url(#waveLineGrad)" stroke-width="3" stroke-linecap="round" />
      
      <!-- Dots & Labels -->
      ${pointsHtml}
    </svg>
  `;
}

// Render Overview Results Cards
function renderOverviewResults() {
  let b = CampaignState.overviewResults;
  if (!b || !b.totalReported) {
    b = getResultsBreakdown();
  }

  // 1. Mini Target Banner Cards
  const elSupp = document.getElementById('countSupporters');
  if (elSupp) elSupp.textContent = formatNum(b.supporters);

  const elThresh = document.getElementById('countThreshold');
  if (elThresh) elThresh.textContent = formatNum(b.threshold);

  // 2. Overview Colored Result Cards (clean - without percentages out of reported)
  const ovSupp = document.getElementById('overviewSupporters');
  if (ovSupp) ovSupp.textContent = formatNum(b.supporters);

  const ovThresh = document.getElementById('overviewThreshold');
  if (ovThresh) ovThresh.textContent = formatNum(b.threshold);

  const ovHesitant = document.getElementById('overviewHesitant');
  if (ovHesitant) ovHesitant.textContent = formatNum(b.hesitant || 0);

  const ovNoAns = document.getElementById('overviewNoAnswer');
  const totalNoAns = b.noAnswer !== undefined ? b.noAnswer : (b.noAnswer + (b.other || 0));
  if (ovNoAns) ovNoAns.textContent = formatNum(totalNoAns);

  // 3. Support Rate among Answered Calls
  const supporters = b.supporters || 0;
  const threshold = b.threshold || 0;
  const hesitant = b.hesitant || 0;
  const notSupporters = b.notSupporters || 0;
  const noAnswer = b.noAnswer || 0;
  const other = b.other || 0;

  let totalAnswered = 0;
  if (b.totalReported && b.totalReported > 0) {
    totalAnswered = Math.max(0, b.totalReported - noAnswer);
  } else {
    totalAnswered = supporters + threshold + hesitant + notSupporters + other;
  }

  const totalSupport = supporters + threshold + hesitant;
  const supportRatePct = totalAnswered > 0 ? ((totalSupport / totalAnswered) * 100) : 0;
  const formattedPct = supportRatePct % 1 === 0 ? `${Math.round(supportRatePct)}%` : `${supportRatePct.toFixed(1)}%`;

  const elRate = document.getElementById('overviewSupportRate');
  const elRateSub = document.getElementById('overviewSupportRateSub');
  if (elRate) elRate.textContent = formattedPct;
  if (elRateSub) {
    elRateSub.textContent = totalAnswered > 0
      ? `${formatNum(totalSupport)} מתוך ${formatNum(totalAnswered)} שענו לשיחה`
      : 'ממתין לנתוני מענה';
  }

  const colorfulContainer = document.getElementById('colorfulResultsContainer');
  if (colorfulContainer) colorfulContainer.style.opacity = '1';
}
// Calculate total campaign supporters dynamically from official overview results (or leads fallback)
function getTotalCampaignSupporters() {
  const ov = CampaignState.overviewResults;
  if (ov && ((ov.supporters || 0) + (ov.threshold || 0) + (ov.hesitant || 0)) > 0) {
    return (ov.supporters || 0) + (ov.threshold || 0) + (ov.hesitant || 0);
  }
  const breakdown = getResultsBreakdown();
  return (breakdown.supporters || 0) + (breakdown.threshold || 0) + (breakdown.hesitant || 0);
}

// Render Goals & Hero Progress (tracks real campaign supporters target: תומך + אחוז חסימה + מתלבט)
function renderTargetsProgress() {
  const t = CampaignState.targets;

  // Real supporters count across the entire campaign (700+)
  const totalSupporters = getTotalCampaignSupporters();
  const supportersTarget = (t.supportersTarget !== undefined && t.supportersTarget > 0) ? t.supportersTarget : 1000;
  const rawPercent = supportersTarget > 0 ? (totalSupporters / supportersTarget) * 100 : 0;
  const roundedPercent = Math.round(rawPercent);

  const progressBar = document.getElementById('mainProgressBar');
  const percentBadge = document.getElementById('targetPercentBadge');
  const currentLabel = document.getElementById('progressCurrentLabel');
  const targetLabel = document.getElementById('progressTargetLabel');

  if (progressBar) {
    const widthPct = totalSupporters > 0 ? Math.max(0.8, Math.min(100, rawPercent)) : 0;
    progressBar.style.width = `${widthPct}%`;
  }
  if (percentBadge) percentBadge.textContent = `${roundedPercent}%`;
  if (currentLabel) currentLabel.textContent = `${formatNum(totalSupporters)} תומכים גויסו`;
  if (targetLabel) targetLabel.textContent = `יעד: ${formatNum(supportersTarget)} תומכים`;
}

// Render Real Metric Cards
function renderRealMetricCards() {
  const m = CampaignState.metrics || {};
  const t = CampaignState.targets || {};

  const totalAgents = (m.agentsCount !== undefined && m.agentsCount > 0)
    ? m.agentsCount
    : (CampaignState.agents.length > 0 ? CampaignState.agents.length : 221);

  const activeAgents = (m.activeRecently !== undefined && m.activeRecently > 0)
    ? m.activeRecently
    : ((m.activeAgentsCount !== undefined && m.activeAgentsCount > 0) ? m.activeAgentsCount : 124);

  const targetAgents = (t.activeAgents !== undefined && t.activeAgents > 0) ? t.activeAgents : 150;

  const callsToday = (m.callsToday !== undefined && m.callsToday !== null) ? m.callsToday : 0;
  const targetDaily = (t.dailyCalls !== undefined && t.dailyCalls > 0) ? t.dailyCalls : 10000;
  const dailyPercent = targetDaily > 0 ? Math.min(100, Math.round((callsToday / targetDaily) * 100)) : 0;

  const callsTotal = (m.callsTotal !== undefined && m.callsTotal !== null) ? m.callsTotal : 0;
  const activeRecently = m.activeRecently !== undefined ? m.activeRecently : activeAgents;

  // Real supporters count across the entire campaign (700+)
  const totalSupporters = getTotalCampaignSupporters();
  const supportersTarget = (t.supportersTarget !== undefined && t.supportersTarget > 0) ? t.supportersTarget : 1000;
  const supportersPct = supportersTarget > 0 ? Math.min(100, Math.round((totalSupporters / supportersTarget) * 100)) : 0;

  const elAgents = document.getElementById('kpiAgentsCount');
  if (elAgents) elAgents.textContent = `${formatNum(activeAgents)} / ${formatNum(totalAgents)}`;

  const elActiveRec = document.getElementById('kpiActiveRecently');
  if (elActiveRec) elActiveRec.textContent = formatNum(activeRecently);

  const elCallsToday = document.getElementById('kpiCallsToday');
  if (elCallsToday) elCallsToday.textContent = `${formatNum(callsToday)} / ${formatNum(targetDaily)}`;

  const elSupporters = document.getElementById('kpiSupporters');
  if (elSupporters) elSupporters.textContent = `${formatNum(totalSupporters)} / ${formatNum(supportersTarget)}`;

  const elCallsTotal = document.getElementById('kpiCallsTotal');
  if (elCallsTotal) elCallsTotal.textContent = formatNum(callsTotal);

  const elSuppPct = document.getElementById('targetSupportersPercent');
  if (elSuppPct) elSuppPct.textContent = `${supportersPct}% מיעד התומכים`;

  const targetDailyPercent = document.getElementById('targetDailyPercent');
  if (targetDailyPercent) targetDailyPercent.textContent = `${dailyPercent}% מהיעד היומי`;

  const targetAgentsSub = document.getElementById('targetAgentsSub');
  if (targetAgentsSub) targetAgentsSub.textContent = `פעילים כרגע מתוך ${formatNum(totalAgents)} נציגים (יעד: ${formatNum(targetAgents)})`;

  const tabAgents = document.querySelector('[data-tab="tab-agents"]');
  if (tabAgents) tabAgents.textContent = `🏆 נציגים (${formatNum(totalAgents)})`;
}

// Tab Switching
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane-view').forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.style.display = 'block';
      CampaignState.currentTab = targetId;
    });
  });
}

// Render Leads View (Handles dynamic tab counter, filtering & search)
function renderLeadsView() {
  const emptyBox = document.getElementById('leadsEmptyBox');
  const tableContainer = document.getElementById('leadsTableContainer');
  const tbody = document.getElementById('leadsTableBody');

  // Dynamically update the tab badge count with TOTAL leads count (from pagination)
  const tabBtn = document.querySelector('[data-tab="tab-leads"]');
  if (tabBtn) {
    const displayCount = CampaignState.leadsTotal > 0 ? CampaignState.leadsTotal : CampaignState.leads.length;
    tabBtn.textContent = `👥 אנשי קשר (${displayCount})`;
  }

  let list = CampaignState.leads;

  // Filter by status chip
  if (CampaignState.activeLeadFilter && CampaignState.activeLeadFilter !== 'all') {
    const f = CampaignState.activeLeadFilter;
    list = list.filter(lead => {
      const st = lead.statusLabel || '';
      if (f === 'waiting') return st.includes('ממתין');
      if (f === 'in_progress') return st.includes('בטיפול');
      if (f === 'callback') return st.includes('חזרה');
      if (f === 'completed') return st.includes('הושלם');
      return true;
    });
  }

  // Filter by search query
  if (CampaignState.searchQuery) {
    const q = CampaignState.searchQuery.toLowerCase();
    list = list.filter(lead =>
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.includes(q)) ||
      (lead.last_agent && lead.last_agent.toLowerCase().includes(q)) ||
      (lead.result && lead.result.toLowerCase().includes(q)) ||
      (lead.note && lead.note.toLowerCase().includes(q))
    );
  }

  if (list.length === 0) {
    if (emptyBox) {
      emptyBox.style.display = 'block';
      const h3 = emptyBox.querySelector('h3');
      if (h3) {
        const totalCount = CampaignState.leadsTotal > 0 ? CampaignState.leadsTotal : CampaignState.leads.length;
        h3.textContent = CampaignState.leads.length === 0
          ? `עדיין אין אנשי קשר טעונים (${totalCount} סה״כ במערכת)`
          : `לא נמצאו תוצאות (${totalCount} סה״כ)`;
      }
    }
    if (tableContainer) tableContainer.style.display = 'none';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';
  if (tableContainer) tableContainer.style.display = 'block';

  tbody.innerHTML = list.map(lead => {
    let pillClass = 'status-active';
    const st = lead.statusLabel || '';
    if (st.includes('ממתין')) pillClass = 'status-former';

    return `
      <tr>
        <td><strong>${escapeHtml(lead.name)}</strong></td>
        <td dir="ltr" style="text-align: right; font-family: monospace;">${escapeHtml(lead.phone)}</td>
        <td><span class="status-pill ${pillClass}">${escapeHtml(st)}</span></td>
        <td>${escapeHtml(lead.result)}</td>
        <td>${escapeHtml(lead.note)}</td>
        <td>${lead.attempts}</td>
        <td>${escapeHtml(lead.last_agent)}</td>
        <td>${escapeHtml(lead.updated)}</td>
      </tr>
    `;
  }).join('');
}

// Clean and normalize agent name
function getCleanAgentName(name) {
  if (!name) return '';
  return name.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, ' ').trim();
}

// Calculate supporters count for a specific agent across all leads
function getAgentSupportersCount(cleanName, phone) {
  if (typeof getAgentSupportersCountAdmin === 'function') {
    return getAgentSupportersCountAdmin(cleanName, phone);
  }
  const leads = CampaignState.leads || [];
  const targetName = (cleanName || '').trim().toLowerCase();
  const targetPhone = (phone || '').replace(/\D/g, '');
  let count = 0;
  leads.forEach(lead => {
    const res = (lead.result || '').trim();
    const isSupp = res === 'תומך' || (res.includes('תומך') && !res.includes('לא') && !res.includes('אחוז חסימה')) ||
      res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה') ||
      res === 'מתלבט' || res.includes('מתלבט');
    if (!isSupp) return;

    const lastAg = (lead.last_agent || '').trim();
    if (!lastAg || lastAg === '—') return;

    if (targetPhone) {
      const phInLead = lastAg.replace(/\D/g, '');
      if (phInLead && (phInLead.includes(targetPhone) || targetPhone.includes(phInLead))) {
        count++;
        return;
      }
    }

    const cleanLastAg = lastAg.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, ' ').trim().toLowerCase();
    if (targetName && cleanLastAg && (cleanLastAg.includes(targetName) || targetName.includes(cleanLastAg))) {
      count++;
    }
  });
  return count;
}

// Render Exact Agents Table
function renderAgentsTable() {
  const tbody = document.getElementById('agentsTableBody');
  if (!tbody) return;

  const rawAgents = CampaignState.agents || [];
  const q = (CampaignState.agentSearchQuery || '').trim().toLowerCase();

  const filteredAgents = q
    ? rawAgents.filter(agent => {
      const name = (agent.name || '').toLowerCase();
      const cleanName = getCleanAgentName(agent.name).toLowerCase();
      const phone = (agent.phone || '').replace(/\D/g, '');
      const qDigits = q.replace(/\D/g, '');
      const group = (agent.group || '').toLowerCase();
      const status = (agent.status || '').toLowerCase();

      const matchName = name.includes(q) || cleanName.includes(q);
      const matchPhone = qDigits ? phone.includes(qDigits) : (agent.phone || '').toLowerCase().includes(q);
      const matchGroup = group.includes(q);
      const matchStatus = status.includes(q);

      return matchName || matchPhone || matchGroup || matchStatus;
    })
    : rawAgents;

  if (filteredAgents.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="14" style="text-align: center; padding: 42px 16px; color: var(--text-secondary);">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 700; font-size: 1.05rem; color: var(--brand-navy); margin-bottom: 4px;">לא נמצאו נציגים התואמים לחיפוש</div>
          <div style="font-size: 0.88rem; color: var(--text-muted);">נסה לחפש לפי שם פרטי, שם משפחה או מספר טלפון</div>
        </td>
      </tr>
    `;
    const tabBtn = document.querySelector('[data-tab="tab-agents"]');
    if (tabBtn) tabBtn.textContent = `🏆 נציגים (0 מתוך ${rawAgents.length})`;
    return;
  }

  tbody.innerHTML = filteredAgents.map(agent => {
    let statusBadge = '';
    if (agent.statusType === 'former') {
      let main = 'חבר לשעבר';
      let sub = '';
      if (agent.status && agent.status.includes('יצא')) {
        sub = agent.status.replace('חבר לשעבר', '').replace(/[()]/g, '').trim();
      }
      statusBadge = `<span class="status-pill status-former"><span>${escapeHtml(main)}</span>${sub ? `<small>${escapeHtml(sub)}</small>` : ''}</span>`;
    } else {
      statusBadge = `<span class="status-pill status-active">${escapeHtml(agent.status || 'עובד בקמפיין')}</span>`;
    }

    let accountBadge = '—';
    if (agent.account) {
      if (agent.account.includes('לא נוצר')) {
        accountBadge = `<span style="color: #dc2626; font-weight: 700; background: #fef2f2; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #fecaca;">✗ לא נוצר</span>`;
      } else {
        accountBadge = `<span style="color: #16a34a; font-weight: 700; background: #f0fdf4; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #bbf7d0;">✓ נוצר</span>`;
      }
    }

    const cleanName = getCleanAgentName(agent.name);
    const supportersCount = getAgentSupportersCount(cleanName, agent.phone);
    const suppBadge = supportersCount > 0
      ? `<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; padding: 3px 8px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 9999px; font-weight: 800; font-size: 0.92rem;">${supportersCount}</span>`
      : `<span style="color: #94a3b8; font-weight: 600;">0</span>`;

    return `
      <tr>
        ${CampaignState.visibleColumns.agent_name ? `<td><strong>${escapeHtml(agent.name)}</strong></td>` : ''}
        ${CampaignState.visibleColumns.agent_phone ? `<td dir="ltr" style="text-align: right; font-family: monospace;">${escapeHtml(agent.phone)}</td>` : ''}
        ${CampaignState.visibleColumns.agent_group ? `<td>${escapeHtml(agent.group)}</td>` : ''}
        ${CampaignState.visibleColumns.agent_account ? `<td>${accountBadge}</td>` : ''}
        ${CampaignState.visibleColumns.agent_status ? `<td>${statusBadge}</td>` : ''}
        ${CampaignState.visibleColumns.leads_open ? `<td>${agent.leads_open ? `<span style="color:#0284c7;font-weight:700;">1 פתוח</span>` : '0'}</td>` : ''}
        ${CampaignState.visibleColumns.leads_today ? `<td><strong>${agent.leads_today}</strong></td>` : ''}
        ${CampaignState.visibleColumns.reports_count ? `<td>${agent.reports_count}</td>` : ''}
        ${CampaignState.visibleColumns.supporters_count ? `<td style="text-align: center;">${suppBadge}</td>` : ''}
        ${CampaignState.visibleColumns.agent_target ? `
          <td>
            ${(() => {
          const personalTargets = CampaignState.targets?.agentTargets || {};
          const defaultTarget = CampaignState.targets?.defaultAgentTarget || 50;
          const target = (personalTargets[cleanName] ?? personalTargets[agent.name]) || defaultTarget;
          if (!target || target <= 0) {
            return '<span class="agent-target-empty">טרם הוגדר</span>';
          }
          const pct = Math.min(100, Math.round((supportersCount / target) * 100));
          const isDone = supportersCount >= target;
          return `
                <div class="agent-target-cell">
                  <div class="agent-target-meta">
                    <span class="agent-target-nums">${supportersCount} מתוך ${target}</span>
                    <span class="agent-target-pct ${isDone ? 'completed' : ''}">${pct}%</span>
                  </div>
                  <div class="agent-mini-track" title="${supportersCount}/${target} (${pct}%)">
                    <div class="agent-mini-fill ${isDone ? 'completed' : ''}" style="width: ${pct}%;"></div>
                  </div>
                </div>
              `;
        })()}
          </td>
        ` : ''}
        ${CampaignState.visibleColumns.avg_time ? `<td>${escapeHtml(agent.avg_time)}</td>` : ''}
        ${CampaignState.visibleColumns.fixes ? `<td>${agent.fixes}</td>` : ''}
        ${CampaignState.visibleColumns.released ? `<td>${agent.released}</td>` : ''}
        ${CampaignState.visibleColumns.skips ? `<td>${agent.skips}</td>` : ''}
      </tr>
    `;
  }).join('');

  const tabBtn = document.querySelector('[data-tab="tab-agents"]');
  if (tabBtn) {
    const totalCount = Math.max(rawAgents.length, CampaignState.metrics?.agentsCount || 0);
    if (q) {
      tabBtn.textContent = `🏆 נציגים (${filteredAgents.length}/${totalCount})`;
    } else {
      tabBtn.textContent = `🏆 נציגים (${totalCount})`;
    }
  }
}

// Table Header Visibility Sync
function updateHeadersVisibility() {
  const ths = document.querySelectorAll('#agentsTable th');
  ths.forEach(th => {
    const colKey = th.getAttribute('data-col');
    if (colKey && CampaignState.visibleColumns[colKey] !== undefined) {
      th.style.display = CampaignState.visibleColumns[colKey] ? '' : 'none';
    }
  });
}

// Agents Filter Chips
function initAgentFilters() {
  const chips = document.querySelectorAll('#agentRangeChips .filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      CampaignState.activeAgentRange = chip.getAttribute('data-range');
      showToast(`טווח זמן עודכן ל: ${chip.textContent}`);
    });
  });
}

// Leads Filter Chips
function initLeadFilters() {
  const chips = document.querySelectorAll('#leadStatusChips .filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      CampaignState.activeLeadFilter = chip.getAttribute('data-filter') || 'all';
      renderLeadsView();
    });
  });
}

// Search
function initSearch() {
  const input = document.getElementById('leadsSearchInput');
  if (input) {
    input.addEventListener('input', (e) => {
      CampaignState.searchQuery = e.target.value.trim();
      renderLeadsView();
    });
  }

  const agentInput = document.getElementById('agentsSearchInput');
  const agentClearBtn = document.getElementById('btnClearAgentsSearch');

  if (agentInput) {
    agentInput.addEventListener('input', (e) => {
      CampaignState.agentSearchQuery = e.target.value.trim();
      if (agentClearBtn) {
        agentClearBtn.style.display = e.target.value ? 'inline-flex' : 'none';
      }
      renderAgentsTable();
    });

    if (agentClearBtn) {
      agentClearBtn.addEventListener('click', () => {
        agentInput.value = '';
        agentClearBtn.style.display = 'none';
        CampaignState.agentSearchQuery = '';
        agentInput.focus();
        renderAgentsTable();
      });
    }
  }
}

// Targets Modal
function initTargetsModal() {
  const modal = document.getElementById('targetsModal');
  const btnOpen = document.getElementById('btnEditTargets');
  const btnClose = document.getElementById('btnCloseTargetsModal');
  const btnSave = document.getElementById('btnSaveTargets');

  const inputTotal = document.getElementById('inputTotalTarget');
  const inputDaily = document.getElementById('inputDailyTarget');
  const inputSupporters = document.getElementById('inputSupportersTarget');
  const inputLeads = document.getElementById('inputLeadsTarget');
  const inputAgents = document.getElementById('inputAgentsTarget');
  const agentTargetsContainer = document.getElementById('agentTargetsListContainer');
  const targetsNotice = document.getElementById('targetsSaveNotice');

  const searchAgentTargets = document.getElementById('inputSearchAgentTargets');

  function renderModalAgentTargets(filterQuery = '') {
    if (!agentTargetsContainer) return;
    const agents = CampaignState.agents || [];
    const personalTargets = CampaignState.targets?.agentTargets || {};

    if (agents.length === 0) {
      agentTargetsContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 10px; text-align: center;">אין עדיין נציגים טעונים במערכת</div>';
      return;
    }

    const q = (filterQuery || '').trim().toLowerCase();
    const filteredAgents = q
      ? agents.filter(ag => (ag.name && ag.name.toLowerCase().includes(q)) || (ag.phone && ag.phone.includes(q)))
      : agents;

    if (filteredAgents.length === 0) {
      agentTargetsContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 12px; text-align: center;">לא נמצאו נציגים התואמים לחיפוש "${escapeHtml(filterQuery)}"</div>`;
      return;
    }

    agentTargetsContainer.innerHTML = filteredAgents.map(ag => {
      const cleanName = getCleanAgentName(ag.name);
      const curSupporters = getAgentSupportersCount(cleanName);
      const defaultTarget = CampaignState.targets?.defaultAgentTarget || 50;
      const savedTarget = personalTargets[cleanName] ?? personalTargets[ag.name] ?? defaultTarget;

      return `
        <div class="agent-target-row" data-name="${escapeHtml((ag.name || '').toLowerCase())}" style="display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 12px; background: #ffffff; border: 1px solid var(--border-light); border-radius: 8px;">
          <div style="display: flex; flex-direction: column; min-width: 0;">
            <span style="font-weight: 700; color: var(--brand-navy); font-size: 0.92rem;">${escapeHtml(ag.name)}</span>
            <span style="font-size: 0.76rem; color: #047857;">השיג עד כה: <strong>${curSupporters} תומכים</strong></span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">יעד:</label>
            <input type="number" min="0" class="modal-input input-agent-target" data-agent="${escapeHtml(cleanName)}" value="${savedTarget}" placeholder="50" style="width: 75px; padding: 5px 8px; font-size: 0.88rem; text-align: center;">
          </div>
        </div>
      `;
    }).join('');

    // Save changes immediately into CampaignState.targets.agentTargets on change
    agentTargetsContainer.querySelectorAll('.input-agent-target').forEach(inp => {
      inp.addEventListener('input', () => {
        const agName = inp.dataset.agent;
        const val = parseInt(inp.value, 10);
        if (!CampaignState.targets.agentTargets) CampaignState.targets.agentTargets = {};
        if (agName) {
          if (!isNaN(val) && val > 0) {
            CampaignState.targets.agentTargets[agName] = val;
          } else {
            delete CampaignState.targets.agentTargets[agName];
          }
        }
      });
    });
  }

  // Live filter input listener
  if (searchAgentTargets) {
    searchAgentTargets.addEventListener('input', (e) => {
      renderModalAgentTargets(e.target.value);
    });
  }

  btnOpen.addEventListener('click', () => {
    inputTotal.value = CampaignState.targets.totalCalls;
    if (inputDaily) inputDaily.value = CampaignState.targets.dailyCalls || 100;
    if (inputSupporters) inputSupporters.value = CampaignState.targets.supportersTarget || 50;
    if (inputLeads) inputLeads.value = CampaignState.targets.leadsHandled;
    inputAgents.value = CampaignState.targets.activeAgents;
    if (targetsNotice) targetsNotice.textContent = '';
    if (searchAgentTargets) searchAgentTargets.value = '';
    renderModalAgentTargets('');
    modal.classList.add('open');
  });

  btnClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  btnSave.addEventListener('click', async () => {
    CampaignState.targets.totalCalls = parseInt(inputTotal.value, 10) || 1000;
    if (inputDaily) CampaignState.targets.dailyCalls = parseInt(inputDaily.value, 10) || 100;
    if (inputSupporters) CampaignState.targets.supportersTarget = parseInt(inputSupporters.value, 10) || 50;
    if (inputLeads) CampaignState.targets.leadsHandled = parseInt(inputLeads.value, 10) || 471;
    CampaignState.targets.activeAgents = parseInt(inputAgents.value, 10) || 15;

    // Collect individual agent targets
    const updatedAgentTargets = {};
    if (agentTargetsContainer) {
      agentTargetsContainer.querySelectorAll('.input-agent-target').forEach(inp => {
        const agName = inp.dataset.agent;
        const val = parseInt(inp.value, 10);
        if (agName && !isNaN(val) && val > 0) {
          updatedAgentTargets[agName] = val;
        }
      });
    }
    CampaignState.targets.agentTargets = updatedAgentTargets;

    // Clear local storage override so all devices stay 100% in sync with the central server
    localStorage.removeItem('noam_campaign_targets');
    modal.classList.remove('open');
    renderTargetsProgress();
    renderRealMetricCards();
    renderAgentsTable();
    showToast('יעדי הקמפיין והיעדים האישיים עודכנו ומסונכרנים לכל המחשבים!');

    // Persist targets directly to server so all clients receive them on their next poll
    await saveTargetsToServer(CampaignState.targets);
  });
}

// Columns Customization Modal
function initColumnsModal() {
  const modal = document.getElementById('columnsModal');
  const btnOpen = document.getElementById('btnCustomizeColumns');
  const btnClose = document.getElementById('btnCloseColumnsModal');
  const btnSave = document.getElementById('btnSaveColumns');
  const list = document.getElementById('columnsCheckboxList');

  list.innerHTML = COLUMNS_CONFIG.map(col => `
    <label style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; padding: 6px; cursor: pointer;">
      <input type="checkbox" id="col_${col.key}" ${CampaignState.visibleColumns[col.key] ? 'checked' : ''} style="accent-color: #38b6ff;">
      <span>${col.label}</span>
    </label>
  `).join('');

  btnOpen.addEventListener('click', () => modal.classList.add('open'));
  btnClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  btnSave.addEventListener('click', () => {
    COLUMNS_CONFIG.forEach(col => {
      const cb = document.getElementById(`col_${col.key}`);
      if (cb) CampaignState.visibleColumns[col.key] = cb.checked;
    });

    localStorage.setItem('noam_campaign_columns', JSON.stringify(CampaignState.visibleColumns));
    modal.classList.remove('open');
    renderAgentsTable();
    showToast('העדפות העמודות עודכנו בהצלחה!');
  });
}

// ---- SYNC & HTML PARSING ENGINE ----
const ADMIN_BASE_URL = 'https://sms-admin.talphotos.win/admin/campaigns/15';

// Parse agents from raw HTML (exact table extraction)
function parseAgentsFromHtml(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const rows = Array.from(doc.querySelectorAll('tr'));
  const agents = [];
  let agentIdx = 1;

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    if (!cells || cells.length < 2) continue;

    const name = cells[0];
    if (!name || name === 'נציג' || name.includes('מיון')) continue;

    // Identify phone (col 1 in admin table, or scan first 3 cells)
    let phoneVal = '';
    for (let i = 1; i < Math.min(4, cells.length); i++) {
      const match = cells[i].match(/05\d-?\d{7}|\d{9,10}/);
      if (match) {
        phoneVal = match[0];
        break;
      }
    }
    if (!phoneVal && cells[1] && /\d{7,10}/.test(cells[1])) {
      phoneVal = cells[1].replace(/[^\d\-]/g, '');
    }

    const group = cells[2] || 'מדברה כעדן';
    const account = cells[3] || 'נוצר';
    const rawStatus = cells[4] || 'עובד בקמפיין';

    // Strict former agent identification (never counted as active)
    const isFormer = rawStatus.includes('לשעבר') || rawStatus.includes('יצא') || rawStatus.includes('עזב');
    let statusFormatted = rawStatus;
    if (rawStatus.includes('לשעבר')) {
      if (rawStatus.includes('יצא')) {
        const parts = rawStatus.split('יצא');
        statusFormatted = `חבר לשעבר (יצא ${parts[1].trim()})`;
      } else {
        statusFormatted = 'חבר לשעבר';
      }
    } else if (!statusFormatted || statusFormatted === '—') {
      statusFormatted = 'עובד בקמפיין';
    }

    const parseNum = (val) => {
      const m = (val || '').match(/\d+/);
      return m ? parseInt(m[0], 10) : 0;
    };

    agents.push({
      id: agentIdx,
      name: name,
      phone: phoneVal,
      group: group,
      account: account,
      status: statusFormatted,
      statusType: isFormer ? 'former' : 'active',
      leads_open: (cells.length > 5 && cells[5] && cells[5] !== '—' && cells[5] !== '-') ? 1 : 0,
      leads_today: parseNum(cells[6]),
      reports_count: parseNum(cells[7]),
      avg_time: (cells[8] && cells[8] !== '0') ? cells[8] : '—',
      fixes: parseNum(cells[11]),
      released: parseNum(cells[12]),
      skips: parseNum(cells[13])
    });
    agentIdx++;
  }
  return agents;
}

// Parse overview metrics from raw HTML
function parseOverviewMetricsFromHtml(html) {
  if (!html) return {};
  const metrics = {};

  // 1. Exact extraction from admin .stat cards
  const mAgents = html.match(/<div class="label">נציגים<\/div>\s*<div class="value">(\d+)<\/div>/i) ||
    html.match(/stat">\s*<div[^>]*>נציגים<\/div>\s*<div[^>]*>(\d+)<\/div>/i);
  if (mAgents) metrics.agentsCount = parseInt(mAgents[1], 10);

  const mActive = html.match(/<div class="label">פעלו בחצי השעה האחרונה<\/div>\s*<div class="value">(\d+)<\/div>/i) ||
    html.match(/stat">\s*<div[^>]*>פעלו בחצי השעה האחרונה<\/div>\s*<div[^>]*>(\d+)<\/div>/i);
  if (mActive) {
    metrics.activeRecently = parseInt(mActive[1], 10);
    metrics.activeAgentsCount = parseInt(mActive[1], 10);
  }

  const mToday = html.match(/<div class="label">שיחות היום<\/div>\s*<div class="value">(\d+)<\/div>/i) ||
    html.match(/stat">\s*<div[^>]*>שיחות היום<\/div>\s*<div[^>]*>(\d+)<\/div>/i);
  if (mToday) metrics.callsToday = parseInt(mToday[1], 10);

  const mTotal = html.match(/<div class="label">שיחות מתחילת הקמפיין<\/div>\s*<div class="value">(\d+)<\/div>/i) ||
    html.match(/stat">\s*<div[^>]*>שיחות מתחילת הקמפיין<\/div>\s*<div[^>]*>(\d+)<\/div>/i);
  if (mTotal) metrics.callsTotal = parseInt(mTotal[1], 10);

  // מנקה את ה-HTML כדי שחיפוש הנתונים מהאתר החיצוני יעבוד בכל מצב
  const textClean = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

  if (!mAgents) {
    const agentsMatch = textClean.match(/נציגים[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}נציגים/);
    if (agentsMatch) metrics.agentsCount = parseInt(agentsMatch[1], 10);
  }

  if (!mActive) {
    const activeMatch = textClean.match(/פעלו בחצי השעה האחרונה[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}פעלו בחצי השעה האחרונה/);
    if (activeMatch) metrics.activeRecently = parseInt(activeMatch[1], 10);
  }

  if (!mToday) {
    const todayMatch = textClean.match(/שיחות היום[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}שיחות היום/);
    if (todayMatch) metrics.callsToday = parseInt(todayMatch[1], 10);
  }

  if (!mTotal) {
    const totalMatch = textClean.match(/שיחות מתחילת הקמפיין[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}שיחות מתחילת הקמפיין/);
    if (totalMatch) metrics.callsTotal = parseInt(totalMatch[1], 10);
  }

  // חילוץ מדויק של תוצאות הסקירה מהאתר החיצוני 
  const threshMatch = textClean.match(/אחוז\s*חסימה[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}אחוז\s*חסימה/);
  const suppMatch = textClean.match(/תומך(?!\s*אחוז)[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}תומך(?!\s*אחוז)/);
  const hesitantMatch = textClean.match(/מתלבט[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}מתלבט/);
  const notSuppMatch = textClean.match(/לא\s*תומך[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}לא\s*תומך/);
  const noAnsMatch = textClean.match(/אין\s*מענה[^\d]{1,100}(\d+)/) || textClean.match(/(\d+)[^\d]{1,100}אין\s*מענה/);
  const totalRepMatch = textClean.match(/מתוך\s*([\d,]+)\s*מדווחים/) || textClean.match(/([\d,]+)\s*מדווחים/);

  if (suppMatch || threshMatch || hesitantMatch || notSuppMatch || noAnsMatch) {
    const supp = suppMatch ? parseInt(suppMatch[1], 10) : 0;
    const thresh = threshMatch ? parseInt(threshMatch[1], 10) : 0;
    const hesitant = hesitantMatch ? parseInt(hesitantMatch[1], 10) : 0;
    const notSupp = notSuppMatch ? parseInt(notSuppMatch[1], 10) : 0;
    const noAns = noAnsMatch ? parseInt(noAnsMatch[1], 10) : 0;
    const totalRep = totalRepMatch ? parseInt(totalRepMatch[1].replace(/,/g, ''), 10) : (supp + thresh + hesitant + notSupp + noAns);

    CampaignState.overviewResults = {
      supporters: supp,
      supportersPct: totalRep > 0 ? Math.round((supp / totalRep) * 100) : 0,
      threshold: thresh,
      thresholdPct: totalRep > 0 ? Math.round((thresh / totalRep) * 100) : 0,
      hesitant: hesitant,
      hesitantPct: totalRep > 0 ? Math.round((hesitant / totalRep) * 100) : 0,
      notSupporters: notSupp,
      notSupportersPct: totalRep > 0 ? Math.round((notSupp / totalRep) * 100) : 0,
      noAnswer: noAns,
      noAnswerPct: totalRep > 0 ? Math.round((noAns / totalRep) * 100) : 0,
      totalReported: totalRep
    };
  }

  return metrics;
}

// Parse leads contacts from raw HTML
function parseLeadsFromHtml(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // --- Extract total leads count from pagination text ---
  // Looks for patterns like: "מוצגים 1-100 מתוך 471 אנשי קשר"
  const bodyText = doc.body ? doc.body.innerText || doc.body.textContent : '';
  const paginationMatch = bodyText.match(/מוצגים\s*\d+[-ע]\d+\s*מתוך\s*(\d+)/) ||
    bodyText.match(/(\d+)\s*אנשי\s*קשר/) ||
    html.match(/מתוך\s*(\d+)\s*אנשי\s*קשר/) ||
    html.match(/total["']?\s*:\s*(\d+)/) ||
    html.match(/count["']?\s*:\s*(\d+)/);
  if (paginationMatch) {
    const total = parseInt(paginationMatch[1], 10);
    if (total > 0) CampaignState.leadsTotal = total;
  }

  const rows = Array.from(doc.querySelectorAll('tr'));
  const leads = [];
  let leadIdx = 1;

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    if (!cells || cells.length < 3) continue;

    let phone = '';
    for (const c of cells) {
      if (/05\d-?\d{7}/.test(c) || /\d{9,10}/.test(c)) {
        phone = c;
        break;
      }
    }

    if (phone) {
      leads.push({
        id: leadIdx,
        name: cells[0] || `ליד ${leadIdx}`,
        phone: phone,
        statusLabel: cells[2] || 'ממתין',
        result: cells[3] || '—',
        note: cells[4] || '—',
        attempts: cells[5] || '0',
        last_agent: cells[6] || '—',
        updated: cells[7] || 'היום'
      });
      leadIdx++;
    }
  }
  return leads;
}

// Fetch admin page via local proxy
async function fetchAdminHtml(url) {
  try {
    const proxyUrl = '/api/proxy?url=' + encodeURIComponent(url);
    const res = await fetch(proxyUrl, { cache: 'no-store' });
    if (res.ok) {
      const html = await res.text();
      if (html && html.includes('<') && html.length > 500) return html;
    }
  } catch (e) { }
  return null;
}

// Save updated targets directly to server so all clients get them
async function saveTargetsToServer(targets) {
  try {
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targets: targets })
    });
  } catch (e) {
    console.error('Failed to sync targets to server:', e);
  }
}

// Save updated CampaignState back to server (targets are safely isolated and not sent here)
async function saveStateToServer() {
  try {
    const payload = { ...CampaignState };
    delete payload.targets;
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload })
    });
  } catch (e) { }
}

async function fetchLatestDataFromServer() {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.metrics) {
        CampaignState.metrics = data.metrics;
        // Only update overviewResults if server returned valid data (totalReported > 0)
        // This prevents stale/zero data from overwriting manually corrected values
        if (data.overviewResults && data.overviewResults.totalReported > 0) {
          CampaignState.overviewResults = data.overviewResults;
        }
        checkCampaignMilestones();
        if (data.agents && data.agents.length) {
          CampaignState.agents = data.agents;
        }
        if (data.leads) {
          CampaignState.leads = data.leads;
        }
        if (data.leadsTotal && data.leadsTotal > CampaignState.leadsTotal) {
          CampaignState.leadsTotal = data.leadsTotal;
        }
        if (data.targets) {
          CampaignState.targets = { ...CampaignState.targets, ...data.targets };
        }
        if ('rabbis' in data) {
          // Normalize: server may send a single object (1 rabbi) or null (0 rabbis)
          let rb = data.rabbis;
          if (rb && !Array.isArray(rb) && typeof rb === 'object') rb = [rb];
          if (!Array.isArray(rb)) rb = [];
          CampaignState.rabbis = rb;
          CampaignState.rabbisLoaded = true;
          try {
            localStorage.setItem(STORAGE_RABBIS_KEY, JSON.stringify(rb));
          } catch (e) { }
        }
        if (data.classMappings && typeof data.classMappings === 'object') {
          CampaignState.classMappings = data.classMappings;
        }
        if (data.apartmentMappings && typeof data.apartmentMappings === 'object') {
          if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
          Object.assign(CampaignState.apartmentMappings, data.apartmentMappings);
        }
        updateSyncStamp(data);
        updateAllViews();
        return true;
      }
    }
  } catch (err) { }

  // Fallback for Firebase Hosting / Static Hosting (where /api/data returns 404)
  try {
    const ts = Date.now();
    const [resData, resTargets, resClasses, resApts, resRabbis] = await Promise.all([
      fetch('campaign_data.json?t=' + ts).catch(() => null),
      fetch('targets.json?t=' + ts).catch(() => null),
      fetch('class_mappings.json?t=' + ts).catch(() => null),
      fetch('apartment_mappings.json?t=' + ts).catch(() => null),
      fetch('rabbis.json?t=' + ts).catch(() => null)
    ]);

    let loadedSomething = false;
    let latestData = null;

    if (resData && resData.ok) {
      const data = await resData.json();
      latestData = data;
      if (data && data.metrics) {
        CampaignState.metrics = data.metrics;
        if (data.overviewResults && data.overviewResults.totalReported > 0) {
          CampaignState.overviewResults = data.overviewResults;
        }
        checkCampaignMilestones();
        if (data.agents && data.agents.length) CampaignState.agents = data.agents;
        if (data.leads) CampaignState.leads = data.leads;
        if (data.leadsTotal && data.leadsTotal > CampaignState.leadsTotal) {
          CampaignState.leadsTotal = data.leadsTotal;
        }
        if (data.targets) {
          CampaignState.targets = { ...CampaignState.targets, ...data.targets };
        }
        if (data.classMappings && typeof data.classMappings === 'object') {
          CampaignState.classMappings = { ...(CampaignState.classMappings || {}), ...data.classMappings };
        }
        if (data.apartmentMappings && typeof data.apartmentMappings === 'object') {
          if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
          Object.assign(CampaignState.apartmentMappings, data.apartmentMappings);
        }
        loadedSomething = true;
      }
    }

    if (resTargets && resTargets.ok) {
      const t = await resTargets.json();
      if (t) {
        CampaignState.targets = { ...CampaignState.targets, ...t };
        loadedSomething = true;
      }
    }

    if (resClasses && resClasses.ok) {
      const c = await resClasses.json();
      if (c && typeof c === 'object') {
        CampaignState.classMappings = { ...(CampaignState.classMappings || {}), ...c };
        loadedSomething = true;
      }
    }

    if (resApts && resApts.ok) {
      const a = await resApts.json();
      if (a && typeof a === 'object') {
        if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
        Object.assign(CampaignState.apartmentMappings, a);
        loadedSomething = true;
      }
    }

    if (resRabbis && resRabbis.ok) {
      const r = await resRabbis.json();
      if (r) {
        let rb = Array.isArray(r) ? r : [r];
        CampaignState.rabbis = rb;
        CampaignState.rabbisLoaded = true;
        loadedSomething = true;
      }
    }

    if (loadedSomething) {
      updateSyncStamp(latestData);
      updateAllViews();
      return true;
    }
  } catch (staticErr) {
    console.warn('Firebase static JSON fallback error:', staticErr);
  }

  return false;
}

function updateSyncStamp(data) {
  const stamp = document.getElementById('lastSyncStamp');
  if (!stamp) return;

  if (data && data.syncStatus === 'expired_cookie') {
    stamp.textContent = '⚠️ טוקן לאדמין פג תוקף - לחץ לעדכון';
    stamp.style.background = '#fef2f2';
    stamp.style.color = '#ef4444';
    stamp.style.border = '1px solid #f87171';
    stamp.style.cursor = 'pointer';
    stamp.onclick = () => {
      const modal = document.getElementById('cookieModal');
      if (modal) modal.classList.add('open');
    };
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const totalCount = CampaignState.agents?.length || 0;
  const activeCount = CampaignState.agents?.filter(a => a.statusType === 'active' && !a.status?.includes('לשעבר')).length || 0;
  stamp.textContent = `מעודכן אוטומטית ל-${timeStr} · ${totalCount} נציגים (${activeCount} פעילים)`;
  stamp.style.background = '';
  stamp.style.color = '';
  stamp.style.border = '';
  stamp.style.cursor = 'default';
  stamp.onclick = null;
}

// ====================================================
// CAMPAIGN MILESTONE ALERTS (1000 SUPPORTERS & 8500 CALLS)
// ====================================================
let is1000SupportersCelebrated = false;
let is8500CallsCelebrated = false;

function checkCampaignMilestones() {
  const totalSupporters = getTotalCampaignSupporters();
  const callsToday = CampaignState.metrics?.callsToday || 0;

  // 1. Target Milestone: 1,000 Supporters reached!
  if (totalSupporters >= 1000 && !is1000SupportersCelebrated) {
    const todayKey = 'noam_milestone_1000_supp_' + new Date().toISOString().slice(0, 10);
    if (!sessionStorage.getItem(todayKey)) {
      sessionStorage.setItem(todayKey, 'true');
      is1000SupportersCelebrated = true;
      triggerMilestoneCelebrationAlert('עברנו את ה-1,000 תומכים!', 'יאללה חברה בכל הכוח עוד רגע מגיעים ל10000!!!!');
    }
  }

  // 2. Daily Calls Milestone: 8,500 Calls reached!
  if (callsToday >= 8500 && !is8500CallsCelebrated) {
    const todayKey = 'noam_milestone_8500_calls_' + new Date().toISOString().slice(0, 10);
    if (!sessionStorage.getItem(todayKey)) {
      sessionStorage.setItem(todayKey, 'true');
      is8500CallsCelebrated = true;
      triggerMilestoneCelebrationAlert('עברנו את ה-8,500 שיחות היום!', 'יאללה חברה בכל הכוח עוד רגע מגיעים ל10000!!!!');
    }
  }
}

function triggerMilestoneCelebrationAlert(titleText, bodyText) {
  playCampaignSound('צלצול של חמישים.mp3');

  let overlay = document.getElementById('callsMilestoneOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'callsMilestoneOverlay';
    overlay.className = 'calls-milestone-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="calls-milestone-card">
      <button class="calls-milestone-close" id="btnCloseMilestone" title="סגור">&times;</button>
      <div class="calls-milestone-badge">🔥 ציון דרך אדיר · יעד הקמפיין 🔥</div>
      <div class="calls-milestone-icon">🏆</div>
      <div class="calls-milestone-title" id="milestoneCardTitle">${escapeHtml(titleText || 'עברנו את ה-1,000 תומכים!')}</div>
      <div class="calls-milestone-text" id="milestoneCardText">${escapeHtml(bodyText || 'יאללה חברה בכל הכוח עוד רגע מגיעים ל10000!!!!')}</div>
      <div class="calls-milestone-timer-bar-wrap">
        <div class="calls-milestone-timer-fill" id="milestoneTimerFill"></div>
      </div>
    </div>
  `;

  const btnClose = overlay.querySelector('#btnCloseMilestone');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
  }

  // Entrance animation and start 20s progress bar
  setTimeout(() => {
    overlay.classList.add('show');
    const timerFill = overlay.querySelector('#milestoneTimerFill');
    if (timerFill) {
      timerFill.style.transition = 'none';
      timerFill.style.width = '100%';
      setTimeout(() => {
        timerFill.style.transition = 'width 20s linear';
        timerFill.style.width = '0%';
      }, 50);
    }
  }, 50);

  // Stays for exactly 20 seconds
  setTimeout(() => {
    overlay.classList.remove('show');
  }, 20000);
}

// Global console helper to test 1000 supporters milestone
window.test1000Milestone = function () {
  triggerMilestoneCelebrationAlert('עברנו את ה-1,000 תומכים!', 'יאללה חברה בכל הכוח עוד רגע מגיעים ל10000!!!!');
};

// Global console helper to test 8500 calls milestone
window.test8500Milestone = function () {
  triggerMilestoneCelebrationAlert('עברנו את ה-8,500 שיחות היום!', 'יאללה חברה בכל הכוח עוד רגע מגיעים ל10000!!!!');
};

// Full sync: fetches admin tabs, parses DOM, updates UI, saves to file
async function performFullBrowserSync() {
  const results = { overview: false, agents: false, leads: false };
  let anySuccess = false;

  // 1. Fetch Agents tab (contains all reps and statuses across all pages)
  const allAgents = [];
  const seenKeys = new Set();
  for (let p = 0; p < 8; p++) {
    const pageUrl = p === 0 ? (ADMIN_BASE_URL + '?tab=agents') : `${ADMIN_BASE_URL}?tab=agents&page=${p}`;
    const htmlAgents = await fetchAdminHtml(pageUrl);
    if (!htmlAgents) break;
    const parsed = parseAgentsFromHtml(htmlAgents);
    if (parsed.length === 0) break;
    for (const ag of parsed) {
      const k = ag.phone || ag.name;
      if (!seenKeys.has(k)) {
        seenKeys.add(k);
        ag.id = allAgents.length + 1;
        allAgents.push(ag);
      }
    }
    if (!htmlAgents.includes(`page=${p + 1}`) && !htmlAgents.includes(`&amp;page=${p + 1}`)) break;
  }

  if (allAgents.length > 0) {
    CampaignState.agents = allAgents;
    const activeCount = allAgents.filter(a => a.statusType === 'active' && !a.status.includes('לשעבר')).length;
    CampaignState.metrics.activeAgentsCount = activeCount;
    CampaignState.metrics.agentsCount = allAgents.length;
    results.agents = true;
    anySuccess = true;
  }

  // 2. Fetch Overview tab (calls metrics & results breakdown from סקירה)
  let htmlOverview = await fetchAdminHtml(ADMIN_BASE_URL + '?tab=overview');
  if (!htmlOverview || !htmlOverview.includes('תומך')) {
    htmlOverview = await fetchAdminHtml(ADMIN_BASE_URL);
  }
  if (htmlOverview) {
    const parsedMetrics = parseOverviewMetricsFromHtml(htmlOverview);
    CampaignState.metrics = { ...CampaignState.metrics, ...parsedMetrics };
    if (!results.agents) {
      const parsedFromOverview = parseAgentsFromHtml(htmlOverview);
      if (parsedFromOverview.length > 0) {
        CampaignState.agents = parsedFromOverview;
        const activeCount = parsedFromOverview.filter(a => a.statusType === 'active' && !a.status.includes('לשעבר')).length;
        CampaignState.metrics.activeAgentsCount = activeCount;
        CampaignState.metrics.agentsCount = parsedFromOverview.length;
        results.agents = true;
      }
    }
    results.overview = true;
    anySuccess = true;
  }

  // 3. Fetch Leads tabs: Specifically all supporters, all threshold supporters, plus all pages
  const suppUrl = ADMIN_BASE_URL + '?tab=leads&result=' + encodeURIComponent('תומך');
  const threshUrl = ADMIN_BASE_URL + '?tab=leads&result=' + encodeURIComponent('תומך אחוז חסימה');

  const [htmlSupp, htmlThresh] = await Promise.all([
    fetchAdminHtml(suppUrl),
    fetchAdminHtml(threshUrl)
  ]);

  const allParsedLeads = [];

  // Fetch all supporters, threshold supporters, and hesitant leads across all pages
  const suppTypes = ['תומך', 'תומך אחוז חסימה', 'מתלבט'];
  for (const st of suppTypes) {
    for (let p = 1; p <= 15; p++) {
      const pageUrl = p === 1
        ? `${ADMIN_BASE_URL}?tab=leads&result=${encodeURIComponent(st)}`
        : `${ADMIN_BASE_URL}?tab=leads&result=${encodeURIComponent(st)}&page=${p}`;
      const html = await fetchAdminHtml(pageUrl);
      if (html) {
        const parsed = parseLeadsFromHtml(html);
        if (parsed.length === 0) break;
        allParsedLeads.push(...parsed);
      } else {
        break;
      }
    }
  }

  // Fetch general leads across all database pages (up to 35 pages)
  for (let p = 1; p <= 35; p++) {
    const pageUrl = p === 1 ? ADMIN_BASE_URL + '?tab=leads' : `${ADMIN_BASE_URL}?tab=leads&page=${p}`;
    const htmlPage = await fetchAdminHtml(pageUrl);
    if (htmlPage) {
      const pLeads = parseLeadsFromHtml(htmlPage);
      if (pLeads.length === 0) break;
      allParsedLeads.push(...pLeads);
    } else {
      break;
    }
  }

  if (allParsedLeads.length > 0) {
    const leadMap = {};
    (CampaignState.leads || []).forEach(l => { if (l.phone) leadMap[l.phone] = l; });
    allParsedLeads.forEach(l => { if (l.phone) leadMap[l.phone] = l; });
    CampaignState.leads = Object.values(leadMap).map((l, i) => ({ ...l, id: i + 1 }));
    results.leads = true;
    anySuccess = true;
  }

  if (anySuccess) {
    updateAllViews();
    await saveStateToServer();
  }

  return { anySuccess, results };
}

// Sync Button Handler
function initSync() {
  const btn = document.getElementById('btnSyncNow');
  const icon = document.getElementById('syncIcon');
  const text = document.getElementById('syncText'); // hidden, kept for compat
  const tooltip = document.getElementById('syncTooltipLabel');
  const stamp = document.getElementById('lastSyncStamp');

  if (!btn) return;

  function setSyncLabel(msg) {
    if (text) text.textContent = msg;
    if (tooltip) tooltip.textContent = msg;
    if (btn.title !== undefined) btn.title = msg;
  }

  btn.addEventListener('click', async () => {
    icon.style.animation = 'spin 1s linear infinite';
    setSyncLabel('מסנכרן...');
    btn.disabled = true;

    try {
      let synced = false;

      if (window.location.protocol.startsWith('http')) {
        setSyncLabel('שולף נתונים מהאדמין...');

        // Method 1: Server-side live sync (fastest & most reliable)
        try {
          const res = await fetch('/api/sync', { method: 'POST' });
          if (res.ok) {
            const result = await res.json();
            if (result.success && result.data) {
              const d = result.data;
              if (d && (d.agents || d.metrics)) {
                if (d.metrics) CampaignState.metrics = d.metrics;
                if (d.overviewResults) CampaignState.overviewResults = d.overviewResults;
                if (d.agents && d.agents.length) CampaignState.agents = d.agents;
                if (d.leads) CampaignState.leads = d.leads;
                if (d.leadsTotal) CampaignState.leadsTotal = d.leadsTotal;
                if (d.targets) {
                  CampaignState.targets = { ...CampaignState.targets, ...d.targets };
                }
                if (d.classMappings) CampaignState.classMappings = d.classMappings;
                if (d.apartmentMappings) {
                  if (!CampaignState.apartmentMappings) CampaignState.apartmentMappings = {};
                  Object.assign(CampaignState.apartmentMappings, d.apartmentMappings);
                }
                updateAllViews();
                synced = true;
              }
            } else if (result.error) {
              console.warn("Sync failed on server:", result.error);
            }
          }
        } catch (e) { }

        // Method 2: Browser proxy sync fallback
        if (!synced) {
          setSyncLabel('מנסה סנכרון דפדפן...');
          const { anySuccess } = await performFullBrowserSync();
          if (anySuccess) synced = true;
        }

        // Method 3: Static files fallback (Firebase Hosting)
        if (!synced) {
          const loadedStatic = await fetchLatestDataFromServer();
          if (loadedStatic) synced = true;
        }

        if (synced) {
          const activeCount = CampaignState.agents.filter(a => a.statusType === 'active' && !a.status.includes('לשעבר')).length;
          const totalCount = CampaignState.agents.length;
          const now = new Date();
          const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          if (stamp) stamp.textContent = `מעודכן ל-${timeStr} · ${totalCount} נציגים (${activeCount} פעילים)`;
          showToast(`✅ סנכרון הצליח! עודכנו ${totalCount} נציגים (${activeCount} פעילים)`);
        } else {
          showToast('⚠️ לא ניתן למשוך נתונים - הקוקי לאדמין פג תוקף! לחץ על כפתור 🔑 לעדכון');
          if (stamp) {
            stamp.textContent = '⚠️ טוקן פג תוקף - לחץ כאן לעדכון חיבור';
            stamp.style.cursor = 'pointer';
            stamp.onclick = () => {
              const modal = document.getElementById('cookieModal');
              if (modal) modal.classList.add('open');
            };
          }
        }
      } else {
        showToast('פתח את האתר דרך http://localhost:8080 לסנכרון');
      }
    } catch (e) {
      showToast('שגיאה בסנכרון: ' + (e.message || e));
    } finally {
      icon.style.animation = '';
      setSyncLabel('סנכרון נתונים');
      btn.disabled = false;
    }
  });

  // Periodic polling for network and live updates every 10 seconds
  if (window.location.protocol.startsWith('http')) {
    fetchLatestDataFromServer();
    setInterval(fetchLatestDataFromServer, 10000);
  }
}

// Toast Helper
function showToast(message) {
  const toast = document.getElementById('toastBar');
  const txt = document.getElementById('toastBarText');
  if (!toast || !txt) return;

  txt.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// Escape HTML utility
function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// Format number with comma thousands separators (e.g. 5000 → 5,000)
function formatNum(n) {
  if (n === null || n === undefined || n === '') return '—';
  const num = typeof n === 'string' ? parseFloat(n.replace(/,/g, '')) : n;
  if (isNaN(num)) return String(n);
  return num.toLocaleString('en-US');
}


// Global animation CSS helper
const animStyle = document.createElement('style');
animStyle.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
document.head.appendChild(animStyle);

// ====================================================
// ELECTION DAY COUNTDOWN — 27 October 2026 (Israel)
// ====================================================
(function startElectionCountdown() {
  // Election day: October 27, 2026 at 01:00:00 Israel time (UTC+3) — added 1 hour as requested
  const ELECTION_DATE = new Date('2026-10-27T01:00:00+03:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const diff = ELECTION_DATE - now;

    const elDays = document.getElementById('cdDays');
    const elHours = document.getElementById('cdHours');
    const elMinutes = document.getElementById('cdMinutes');
    const elSeconds = document.getElementById('cdSeconds');
    const wrap = document.querySelector('.election-countdown-wrap');

    if (!elDays) return;

    if (diff <= 0) {
      // Election day has arrived!
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      if (wrap) {
        wrap.style.background = 'linear-gradient(135deg, #065f46 0%, #059669 100%)';
        wrap.title = '🗳️ יום הבחירות הגיע!';
        const label = wrap.querySelector('.countdown-label');
        if (label) label.textContent = '🗳️ יום הבחירות הגיע!';
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);

    // Pulse effect on seconds digit
    elSeconds.style.transition = 'color 0.1s';
    elSeconds.style.color = '#7dd3fc';
    setTimeout(() => { if (elSeconds) elSeconds.style.color = '#38b6ff'; }, 150);
  }

  tick();
  setInterval(tick, 1000);
})();

// ====================================================
// NOTIFICATIONS & SOUNDS SYSTEM (מערכת התראות וצלילים)
// ====================================================

// Unlock audio on first user gesture (satisfies browser autoplay policies)
let audioUnlocked = false;
function unlockAudioContext() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  try {
    const silent = new Audio();
    silent.play().catch(() => { });
  } catch (e) { }
  document.removeEventListener('click', unlockAudioContext);
  document.removeEventListener('keydown', unlockAudioContext);
  document.removeEventListener('touchstart', unlockAudioContext);
}
document.addEventListener('click', unlockAudioContext, { once: true });
document.addEventListener('keydown', unlockAudioContext, { once: true });
document.addEventListener('touchstart', unlockAudioContext, { once: true });

// Play sound file with full error handling
function playCampaignSound(filename) {
  try {
    const audio = new Audio(encodeURI(filename));
    audio.volume = 1.0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio play restricted by browser autoplay policy:', err);
      });
    }
  } catch (err) {
    console.warn('Failed to play sound:', filename, err);
  }
}

// Track processed supporters and celebrated milestones
const knownSupporters = new Set();
const celebratedMilestones = new Set();
let isFirstSupportersCheck = true;

// Clean agent name (strip phones/dashes/numbers)
function getCleanAgentName(rawName) {
  if (!rawName) return 'נציג';
  return rawName.replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/-/g, '').trim() || 'נציג';
}

// Count total supporters achieved by an agent across ALL campaign leads (תומך + אחוז חסימה + מתלבט)
function getAgentSupportersCount(agentName) {
  let count = 0;
  (CampaignState.leads || []).forEach(l => {
    const r = (l.result || '').trim();
    const isSupp = r === 'תומך' || (r.includes('תומך') && !r.includes('לא')) || r.includes('אחוז חסימה') || r.includes('מתלבט');
    if (isSupp && l.last_agent) {
      const aName = getCleanAgentName(l.last_agent);
      if (aName === agentName || l.last_agent.includes(agentName)) {
        count++;
      }
    }
  });
  return count;
}

// Master supporters check called on every data update/sync
function checkNewSupporters() {
  const leads = CampaignState.leads || [];
  if (leads.length === 0) return;

  const newSupportersToNotify = [];

  leads.forEach(lead => {
    const res = (lead.result || '').trim();
    const isThreshold = res === 'תומך אחוז חסימה' || res.includes('אחוז חסימה');
    const isHesitant = !isThreshold && (res === 'מתלבט' || res.includes('מתלבט'));
    const isFull = !isThreshold && !isHesitant && (res === 'תומך' || (res.includes('תומך') && !res.includes('לא')));

    if (isThreshold || isHesitant || isFull) {
      const leadKey = lead.phone || `lead_${lead.id}`;
      if (isFirstSupportersCheck) {
        // Acknowledge initial state so historical leads don't spam popups on page open
        knownSupporters.add(leadKey);
      } else if (!knownSupporters.has(leadKey)) {
        // New supporter found!
        knownSupporters.add(leadKey);
        newSupportersToNotify.push({ lead, isThreshold, isHesitant });
      }
    }
  });

  // On first load, also register agents who have already hit 25 or 50 historically
  if (isFirstSupportersCheck) {
    const agentsChecked = new Set();
    leads.forEach(lead => {
      const agentName = getCleanAgentName(lead.last_agent);
      if (agentName && !agentsChecked.has(agentName)) {
        agentsChecked.add(agentName);
        const count = getAgentSupportersCount(agentName);
        if (count >= 25) celebratedMilestones.add(agentName + '_25');
        if (count >= 50) celebratedMilestones.add(agentName + '_50');
      }
    });
    isFirstSupportersCheck = false;
    return;
  }

  // Trigger sound and popup for newly gained supporters (staggered, capped to 3 in bursts to prevent screen clutter)
  const toNotify = newSupportersToNotify.length > 3
    ? newSupportersToNotify.slice(-3)
    : newSupportersToNotify;

  toNotify.forEach((item, idx) => {
    setTimeout(() => {
      const { lead, isThreshold, isHesitant } = item;
      const agentName = getCleanAgentName(lead.last_agent);
      const totalCount = getAgentSupportersCount(agentName);

      // Check for milestones
      if (totalCount >= 50 && !celebratedMilestones.has(agentName + '_50')) {
        celebratedMilestones.add(agentName + '_50');
        playCampaignSound('צלצול של חמישים.mp3');
        showSupporterToast(agentName, totalCount, isThreshold, 50, isHesitant);
      } else if (totalCount >= 25 && !celebratedMilestones.has(agentName + '_25')) {
        celebratedMilestones.add(agentName + '_25');
        playCampaignSound('השיג 25 תומכים.mp3');
        showSupporterToast(agentName, totalCount, isThreshold, 25, isHesitant);
      } else {
        playCampaignSound('הושג תומך.mp3');
        showSupporterToast(agentName, totalCount, isThreshold, 0, isHesitant);
      }
    }, idx * 1200);
  });
}

// Function to dismiss a single toast cleanly and prevent double dismissal
function dismissSupporterToast(toast, immediate = false) {
  if (!toast || toast.classList.contains('dismissing')) return;
  toast.classList.add('dismissing');
  toast.classList.remove('show');
  if (toast._dismissTimer) {
    clearTimeout(toast._dismissTimer);
    toast._dismissTimer = null;
  }
  const delay = immediate ? 250 : 500;
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, delay);
}

// Display supporter toast notification with milestone styling
function showSupporterToast(agentName, count, isThreshold, milestone = 0, isHesitant = false) {
  let container = document.getElementById('supporterToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'supporterToastContainer';
    document.body.appendChild(container);
  }

  // Maximum allowed popups visible on screen simultaneously (3)
  // If there are too many, dismiss the oldest ones to keep the screen clean
  const MAX_TOASTS = 3;
  const activeToasts = Array.from(container.querySelectorAll('.supporter-toast:not(.dismissing)'));
  if (activeToasts.length >= MAX_TOASTS) {
    const excessCount = activeToasts.length - MAX_TOASTS + 1;
    for (let i = 0; i < excessCount; i++) {
      dismissSupporterToast(activeToasts[i], true);
    }
  }

  const toast = document.createElement('div');
  let contentHtml = '';

  if (milestone === 50) {
    toast.className = 'supporter-toast toast-milestone-50';
    contentHtml = `
      <button class="supporter-toast-close" title="סגור">&times;</button>
      <div class="supporter-toast-icon">👑</div>
      <div class="supporter-toast-title">🏆 כבוד ענק! ${escapeHtml(agentName)} הגיע ל-50 תומכים!</div>
      <div class="supporter-toast-sub">ציון דרך היסטורי ומרגש בקמפיין נעם לישראל! 🎉</div>
    `;
  } else if (milestone === 25) {
    toast.className = 'supporter-toast toast-milestone-25';
    contentHtml = `
      <button class="supporter-toast-close" title="סגור">&times;</button>
      <div class="supporter-toast-icon">🌟</div>
      <div class="supporter-toast-title">⭐ ציון דרך! ${escapeHtml(agentName)} הגיע ל-25 תומכים!</div>
      <div class="supporter-toast-sub">הישג אדיר של 25 תומכים לקמפיין! 🌟🎉</div>
    `;
  } else if (isHesitant) {
    toast.className = 'supporter-toast toast-blue';
    contentHtml = `
      <button class="supporter-toast-close" title="סגור">&times;</button>
      <div class="supporter-toast-icon">🤝</div>
      <div class="supporter-toast-title">${escapeHtml(agentName)}</div>
      <div class="supporter-toast-sub">השיג מתלבט / תומך חדש! (סה״כ ${formatNum(count)} תומכים)</div>
    `;
  } else if (isThreshold) {
    toast.className = 'supporter-toast toast-blue';
    contentHtml = `
      <button class="supporter-toast-close" title="סגור">&times;</button>
      <div class="supporter-toast-icon">🚀</div>
      <div class="supporter-toast-title">${escapeHtml(agentName)}</div>
      <div class="supporter-toast-sub">השיג תומך אחוז חסימה! (סה״כ ${formatNum(count)} תומכים)</div>
    `;
  } else {
    toast.className = 'supporter-toast toast-green';
    contentHtml = `
      <button class="supporter-toast-close" title="סגור">&times;</button>
      <div class="supporter-toast-icon">🎯</div>
      <div class="supporter-toast-title">${escapeHtml(agentName)}</div>
      <div class="supporter-toast-sub">השיג תומך חדש לקמפיין! (סה״כ ${formatNum(count)} תומכים) 🎉</div>
    `;
  }

  toast.innerHTML = contentHtml;

  // Allow clicking anywhere on the toast or close button to dismiss immediately
  toast.addEventListener('click', () => {
    dismissSupporterToast(toast, true);
  });

  container.appendChild(toast);

  // Entrance animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Stays on screen for exactly 5 seconds (5000ms), then smoothly departs
  const duration = 5000;
  toast._dismissTimer = setTimeout(() => {
    dismissSupporterToast(toast);
  }, duration);
}

// Sound testing modal setup
function initSoundTestModal() {
  const modal = document.getElementById('soundTestModal');
  const btnOpen = document.getElementById('btnTestSound');
  const btnClose1 = document.getElementById('btnCloseSoundTestModal');
  const btnClose2 = document.getElementById('btnCloseSoundTestModal2');

  const btnSupp = document.getElementById('btnTestSoundSupporter');
  const btn25 = document.getElementById('btnTestSound25');
  const btn50 = document.getElementById('btnTestSound50');

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => modal.classList.add('open'));
  }
  if (btnClose1 && modal) btnClose1.addEventListener('click', () => modal.classList.remove('open'));
  if (btnClose2 && modal) btnClose2.addEventListener('click', () => modal.classList.remove('open'));
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (btnSupp) {
    btnSupp.addEventListener('click', () => {
      playCampaignSound('הושג תומך.mp3');
      const testName = 'מתניה וינברגר';
      const realCount = getAgentSupportersCount(testName) || 1;
      showSupporterToast(testName, realCount, false, 0);
    });
  }
  if (btn25) {
    btn25.addEventListener('click', () => {
      playCampaignSound('השיג 25 תומכים.mp3');
      const testName = 'יעקב מאיר';
      const realCount = Math.max(25, getAgentSupportersCount(testName));
      showSupporterToast(testName, realCount, false, 25);
    });
  }
  if (btn50) {
    btn50.addEventListener('click', () => {
      playCampaignSound('צלצול של חמישים.mp3');
      const testName = 'יהודה מאיר סרור';
      const realCount = Math.max(50, getAgentSupportersCount(testName));
      showSupporterToast(testName, realCount, false, 50);
    });
  }
}

// Global console helper for testing
window.testCampaignSound = function (type) {
  if (type === '50' || type === 50) {
    playCampaignSound('צלצול של חמישים.mp3');
    showSupporterToast('נציג לדוגמה', 50, false, 50);
  } else if (type === '25' || type === 25) {
    playCampaignSound('השיג 25 תומכים.mp3');
    showSupporterToast('נציג לדוגמה', 25, false, 25);
  } else {
    playCampaignSound('הושג תומך.mp3');
    showSupporterToast('נציג לדוגמה', 1, false, 0);
  }
};

// =============================================
// HERO ROTATOR — alternates every 5 seconds
// 4 Slides: Targets -> Top 5 Agents -> Live Charts -> Active Rabbis
// HERO ROTATOR — alternates every 5 seconds
// Uses pure CSS Grid layout and class transitions
// =============================================
// Helper to retrieve currently active rabbis list
window.getActiveRabbisList = function () {
  const mappings = typeof loadRabbisMappings === 'function' ? loadRabbisMappings() : [];
  if (!mappings || mappings.length === 0) return [];

  const agents = (window.CampaignState && window.CampaignState.agents) || [];
  const clean = (s) => (s || '').replace(/05\d-?\d{7}/g, '').replace(/\d+/g, '').replace(/[\s\-]+/g, ' ').trim().toLowerCase();

  // If agents are loaded, check active status
  const activeAgents = agents.filter(ag => {
    const stType = ag.statusType || '';
    const st = ag.status || '';
    return (stType === 'active' || st.includes('עובד')) && !st.includes('לשעבר');
  });

  const activeCleanNames = activeAgents.map(ag => clean(ag.name)).filter(Boolean);
  const activePhones = activeAgents.map(ag => (ag.phone || '').replace(/\D+/g, '')).filter(Boolean);

  return mappings.filter(m => {
    const orig = clean(m.originalAgent);
    if (!orig) return false;
    const isMatch = activeCleanNames.some(act => act === orig || act.includes(orig) || orig.includes(act)) ||
      activePhones.some(ph => orig.includes(ph));
    return isMatch;
  });
};

window.initHeroRotator = function () {
  let timer = null;
  let currentIdx = 0;

  function getActiveSlidesAndDots() {
    const activeRabbis = window.getActiveRabbisList ? window.getActiveRabbisList() : [];
    const hasActiveRabbis = activeRabbis.length > 0;

    const rabbisSlide = document.getElementById('heroSlideRabbis');
    const rabbisDot = document.querySelector('.hero-dot[data-slide="3"]');

    if (!hasActiveRabbis) {
      if (rabbisSlide) {
        rabbisSlide.style.display = 'none';
        rabbisSlide.classList.remove('hero-slide--active');
        rabbisSlide.classList.add('hero-slide--out');
      }
      if (rabbisDot) {
        rabbisDot.style.display = 'none';
      }
    } else {
      if (rabbisDot) {
        rabbisDot.style.display = '';
      }
    }

    const allSlides = [
      document.getElementById('heroSlideTargets'),
      document.getElementById('heroSlideTop5'),
      document.getElementById('heroSlideCharts'),
      hasActiveRabbis ? rabbisSlide : null,
      document.getElementById('heroSlideTopApartments'),
      document.getElementById('heroSlideTopClasses')
    ].filter(Boolean);

    const allDots = Array.from(document.querySelectorAll('.hero-dot')).filter(d => d.style.display !== 'none');

    return { slides: allSlides, dots: allDots };
  }

  function showSlide(idx) {
    const { slides, dots } = getActiveSlidesAndDots();
    if (slides.length === 0) return;
    if (idx >= slides.length) idx = 0;
    if (idx < 0) idx = 0;

    slides.forEach((s, i) => {
      if (i === idx) {
        s.style.display = 'block';
        // Force reflow for silky smooth CSS transition
        void s.offsetWidth;
        s.classList.remove('hero-slide--out');
        s.classList.add('hero-slide--active');
      } else if (s.classList.contains('hero-slide--active')) {
        s.classList.remove('hero-slide--active');
        s.classList.add('hero-slide--out');
        // Keep in DOM briefly to finish exit animation, then hide
        setTimeout(() => {
          if (!s.classList.contains('hero-slide--active')) {
            s.style.display = 'none';
          }
        }, 500);
      } else {
        s.classList.remove('hero-slide--active');
        s.classList.add('hero-slide--out');
        s.style.display = 'none';
      }
    });

    dots.forEach((d, i) => d.classList.toggle('hero-dot--active', i === idx));
    currentIdx = idx;
    // Schedule next slide with custom duration per slide
    scheduleNextSlide();
  }

  function getSlideDuration(slideEl) {
    if (slideEl && slideEl.id === 'heroSlideTargets') {
      return 20000; // 20 שניות ליעד הראשי
    }
    return 5000; // 5 שניות לכל שאר השקופיות
  }

  function scheduleNextSlide() {
    stopAutoRotate();
    const { slides } = getActiveSlidesAndDots();
    if (slides.length <= 1) return;
    
    const currentSlide = slides[currentIdx];
    const duration = getSlideDuration(currentSlide);

    timer = setTimeout(() => {
      const { slides: latestSlides } = getActiveSlidesAndDots();
      if (latestSlides.length <= 1) return;
      const nextIdx = (currentIdx + 1) % latestSlides.length;
      showSlide(nextIdx);
    }, duration);
  }

  function startAutoRotate() {
    scheduleNextSlide();
  }

  function stopAutoRotate() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  // Handle dot clicks - map clicking dot to the corresponding active slide index
  const heroDotsContainer = document.getElementById('heroDots');
  if (heroDotsContainer) {
    heroDotsContainer.onclick = (e) => {
      const dot = e.target.closest('.hero-dot');
      if (!dot) return;
      const { dots } = getActiveSlidesAndDots();
      const dotIndex = dots.indexOf(dot);
      if (dotIndex !== -1) {
        showSlide(dotIndex);
        startAutoRotate();
      }
    };
  }

  const heroContainer = document.getElementById('heroRotator');
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', stopAutoRotate);
    heroContainer.addEventListener('mouseleave', startAutoRotate);
  }

  window.refreshHeroRotator = function () {
    const { slides, dots } = getActiveSlidesAndDots();
    if (currentIdx >= slides.length) {
      currentIdx = 0;
    }
    // Update dots indicator
    dots.forEach((d, i) => d.classList.toggle('hero-dot--active', i === currentIdx));

    // If current active slide was removed or hidden, show current
    const currentSlideEl = slides[currentIdx];
    if (!currentSlideEl || currentSlideEl.style.display === 'none') {
      showSlide(currentIdx);
    }
  };

  // Show first slide immediately and start timer
  showSlide(0);
  startAutoRotate();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initHeroRotator);
} else {
  window.initHeroRotator();
}

// ====================================================
// ACTIVE RABBIS SYSTEM (מערכת שיוך רבנים פעילים)
// ====================================================
const STORAGE_RABBIS_KEY = 'noam_campaign_rabbis_mappings';

function loadRabbisMappings() {
  // Server data is the source of truth once loaded (keeps all computers in sync)
  if (window.CampaignState && CampaignState.rabbisLoaded && Array.isArray(CampaignState.rabbis)) {
    return CampaignState.rabbis.slice();
  }
  try {
    const raw = localStorage.getItem(STORAGE_RABBIS_KEY);
    if (raw) {
      let arr = JSON.parse(raw);
      if (arr && !Array.isArray(arr) && typeof arr === 'object') arr = [arr];
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) { }
  if (window.CampaignState && Array.isArray(window.CampaignState.rabbis) && window.CampaignState.rabbis.length > 0) {
    return window.CampaignState.rabbis.slice();
  }
  return [];
}

async function saveRabbisMappings(list) {
  if (window.CampaignState) {
    CampaignState.rabbis = list.slice();
    CampaignState.rabbisLoaded = true;
  }
  try {
    localStorage.setItem(STORAGE_RABBIS_KEY, JSON.stringify(list));
  } catch (e) { }

  // Persist directly to central server so all computers & phones on the network stay 100% in sync
  try {
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rabbis: list })
    });
  } catch (err) {
    console.warn('Failed to sync rabbis to server:', err);
  }
}

// Render Active Rabbis Panel (Slide 4)
function renderRabbisPanel() {
  const grid = document.getElementById('rabbisCardsGrid');
  const badge = document.getElementById('rabbisActiveCountBadge');
  if (!grid) return;

  const mappings = loadRabbisMappings();
  const activeRabbis = window.getActiveRabbisList ? window.getActiveRabbisList() : [];

  if (badge) {
    badge.textContent = `${activeRabbis.length} רבנים פעילים`;
  }

  // Update hero rotator
  if (typeof window.refreshHeroRotator === 'function') {
    window.refreshHeroRotator();
  }

  if (activeRabbis.length === 0) {
    if (mappings.length === 0) {
      grid.innerHTML = `
        <div class="rabbis-empty-state">
           טרם הוגדרו רבנים במערכת.<br>
          לחץ על כפתור <strong>רבנים פעילים</strong> בסרגל הצד כדי להוסיף שיוך רב לנציג.
        </div>
      `;
    } else {
      grid.innerHTML = `
        <div class="rabbis-empty-state">
          🕒 אין כרגע רבנים במצב פעיל מתוך ${mappings.length} הרבנים המוגדרים.<br>
          <small>כאשר הנציג המשויך ייכנס לפעילות בקמפיין, הרב יופיע כאן אוטומטית עם תגית פעיל.</small>
        </div>
      `;
    }
    return;
  }

  grid.innerHTML = activeRabbis.map(rabbi => {
    return `
      <div class="rabbi-card">
        <div class="rabbi-card-header">
          <span class="rabbi-card-name" title="${escapeHtml(rabbi.rabbiName)}">${escapeHtml(rabbi.rabbiName)}</span>
          <span class="rabbi-active-pill">פעיל</span>
        </div>
      </div>
    `;
  }).join('');
}

// Rabbis Management Modal
function initRabbisModal() {
  const modal = document.getElementById('rabbisModal');
  const btnOpen = document.getElementById('btnManageRabbis');
  const btnClose1 = document.getElementById('btnCloseRabbisModal');
  const btnClose2 = document.getElementById('btnCloseRabbisModal2');

  const inputOrig = document.getElementById('inputOrigAgentName');
  const inputRabbi = document.getElementById('inputRabbiName');
  const btnAdd = document.getElementById('btnAddRabbi');
  const listContainer = document.getElementById('rabbisListContainer');
  const datalist = document.getElementById('agentsSuggestionsList');
  const statusNotice = document.getElementById('rabbisStatusNotice');

  if (!modal || !btnOpen) return;

  function refreshDatalist() {
    if (!datalist) return;
    const names = (CampaignState.agents || []).map(a => (a.name || '').trim()).filter(Boolean);
    const unique = Array.from(new Set(names));
    datalist.innerHTML = unique.map(n => `<option value="${escapeHtml(n)}"></option>`).join('');
  }

  function renderModalRabbisList() {
    if (!listContainer) return;
    const list = loadRabbisMappings();
    if (list.length === 0) {
      listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.86rem; padding: 14px;">אין עדיין רבנים מוגדרים. הוסף רב למעלה.</div>';
      if (statusNotice) statusNotice.textContent = '';
      return;
    }

    const agents = CampaignState.agents || [];
    const activeNames = new Set(
      agents.filter(a => (a.statusType === 'active' || (a.status || '').includes('עובד')) && !(a.status || '').includes('לשעבר'))
        .map(a => (a.name || '').trim().toLowerCase())
    );

    listContainer.innerHTML = list.map((item, idx) => {
      const origLow = (item.originalAgent || '').trim().toLowerCase();
      let isAct = false;
      for (const aName of activeNames) {
        if (aName === origLow || aName.includes(origLow) || origLow.includes(aName)) {
          isAct = true;
          break;
        }
      }

      return `
        <div class="rabbi-list-item" data-index="${idx}" style="display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; background: #ffffff; border: 1px solid var(--border-light); border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
              <span style="font-size: 1.15rem;">✡️</span>
              <div>
                <div class="rabbi-display-name" style="font-weight: 800; color: var(--brand-navy); font-size: 0.98rem;">${escapeHtml(item.rabbiName)}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">נציג מקורי: <strong>${escapeHtml(item.originalAgent)}</strong></div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
              ${isAct ? '<span class="rabbi-active-pill" style="font-size: 0.78rem; padding: 2px 10px;">פעיל</span>' : '<span style="font-size: 0.78rem; color: #94a3b8; background: #f1f5f9; padding: 2px 8px; border-radius: 9999px;">לא מחובר</span>'}
              <button class="btn btn-secondary btn-edit-rabbi" data-index="${idx}" style="padding: 4px 10px; font-size: 0.82rem; color: #0284c7; border-color: #bae6fd; background: #f0f9ff;" title="ערוך שם רב">
                ✎ עריכה
              </button>
              <button class="btn btn-secondary btn-delete-rabbi" data-index="${idx}" style="padding: 4px 10px; font-size: 0.82rem; color: #ef4444; border-color: #fecaca; background: #fef2f2;" title="מחק שיוך">
                מחק ✕
              </button>
            </div>
          </div>
          <!-- Inline Edit Form (Hidden by default) -->
          <div class="rabbi-edit-form" style="display: none; align-items: center; gap: 8px; margin-top: 4px; padding-top: 8px; border-top: 1px dashed #e2e8f0;">
            <input type="text" class="modal-input edit-rabbi-input" value="${escapeHtml(item.rabbiName)}" placeholder="הזן שם רב חדש..." style="flex: 1; padding: 6px 12px; font-size: 0.9rem;">
            <button class="btn btn-cyan btn-save-edit-rabbi" data-index="${idx}" style="padding: 6px 14px; font-size: 0.84rem; white-space: nowrap;">
              ✓ שמור
            </button>
            <button class="btn btn-secondary btn-cancel-edit-rabbi" data-index="${idx}" style="padding: 6px 12px; font-size: 0.84rem; white-space: nowrap;">
              ביטול
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (statusNotice) {
      statusNotice.textContent = `${list.length} רבנים מוגדרים במערכת`;
    }

    // Attach edit listeners
    listContainer.querySelectorAll('.btn-edit-rabbi').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemWrap = btn.closest('.rabbi-list-item');
        if (!itemWrap) return;
        const editForm = itemWrap.querySelector('.rabbi-edit-form');
        const input = itemWrap.querySelector('.edit-rabbi-input');
        if (editForm) {
          editForm.style.display = 'flex';
          btn.style.display = 'none';
          if (input) {
            input.focus();
            input.select();
          }
        }
      });
    });

    // Attach cancel edit listeners
    listContainer.querySelectorAll('.btn-cancel-edit-rabbi').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemWrap = btn.closest('.rabbi-list-item');
        if (!itemWrap) return;
        const editForm = itemWrap.querySelector('.rabbi-edit-form');
        const btnEdit = itemWrap.querySelector('.btn-edit-rabbi');
        if (editForm) editForm.style.display = 'none';
        if (btnEdit) btnEdit.style.display = 'inline-flex';
      });
    });

    // Attach save edit listeners
    listContainer.querySelectorAll('.btn-save-edit-rabbi').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemWrap = btn.closest('.rabbi-list-item');
        if (!itemWrap) return;
        const input = itemWrap.querySelector('.edit-rabbi-input');
        const newName = (input ? input.value : '').trim();
        if (!newName) {
          alert('שם הרב לא יכול להיות ריק.');
          return;
        }

        const index = parseInt(btn.dataset.index, 10);
        const currentList = loadRabbisMappings();
        if (currentList[index]) {
          currentList[index].rabbiName = newName;
          saveRabbisMappings(currentList);
          renderModalRabbisList();
          renderRabbisPanel();
          showToast(`שם הרב עודכן ל-"${newName}" בהצלחה!`);
        }
      });
    });

    // Enter key saves in edit input
    listContainer.querySelectorAll('.edit-rabbi-input').forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const saveBtn = inp.closest('.rabbi-edit-form')?.querySelector('.btn-save-edit-rabbi');
          if (saveBtn) saveBtn.click();
        } else if (e.key === 'Escape') {
          const cancelBtn = inp.closest('.rabbi-edit-form')?.querySelector('.btn-cancel-edit-rabbi');
          if (cancelBtn) cancelBtn.click();
        }
      });
    });

    // Attach delete listeners
    listContainer.querySelectorAll('.btn-delete-rabbi').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.dataset.index, 10);
        const currentList = loadRabbisMappings();
        const deletedRabbi = currentList[index]?.rabbiName || '';
        currentList.splice(index, 1);
        saveRabbisMappings(currentList);
        renderModalRabbisList();
        renderRabbisPanel();
        showToast(deletedRabbi ? `הרב "${deletedRabbi}" נמחק` : 'שיוך הרב נמחק בהצלחה');
      });
    });
  }

  btnOpen.addEventListener('click', () => {
    refreshDatalist();
    renderModalRabbisList();
    modal.classList.add('open');
  });

  const closeModal = () => modal.classList.remove('open');
  if (btnClose1) btnClose1.addEventListener('click', closeModal);
  if (btnClose2) btnClose2.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const orig = (inputOrig ? inputOrig.value : '').trim();
      const rabbi = (inputRabbi ? inputRabbi.value : '').trim();

      if (!orig || !rabbi) {
        alert('אנא הזן גם את שם הנציג המקורי וגם את שם הרב.');
        return;
      }

      const list = loadRabbisMappings();
      list.push({
        id: Date.now(),
        originalAgent: orig,
        rabbiName: rabbi
      });

      saveRabbisMappings(list);
      if (inputOrig) inputOrig.value = '';
      if (inputRabbi) inputRabbi.value = '';

      renderModalRabbisList();
      renderRabbisPanel();
      showToast(`הרב "${rabbi}" נוסף בהצלחה!`);
    });
  }
}



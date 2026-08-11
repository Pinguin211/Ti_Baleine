/**
 * Planning 2 Semaines - Application JavaScript Vanilla
 * Gestion dynamique de 2 semaines (Semaine en cours + Semaine prochaine)
 * Attribution des tâches quotidiennes par persona, persistance & export
 */

(function () {
  'use strict';

  // --- Constantes & Couleurs ---
  const COLOR_PALETTE = [
    '#0284c7', // Bleu Océan
    '#06b6d4', // Cyan
    '#10b981', // Émeraude
    '#8b5cf6', // Violet
    '#f59e0b', // Ambre
    '#ec4899', // Rose
    '#6366f1', // Indigo
    '#f97316'  // Orange
  ];

  // --- Données Démo Ti'Baleine ---
  const SAMPLE_PERSONAS = [
    { id: 'p_benjamin', name: 'Benjamin', role: 'Lead Backend & DB', color: '#0284c7' },
    { id: 'p_thomas', name: 'Thomas', role: 'Frontend & UI/UX', color: '#8b5cf6' },
    { id: 'p_ivan', name: 'Ivan', role: 'Fullstack API & WhatsApp', color: '#10b981' },
    { id: 'p_loic', name: 'Loïc', role: 'Chef de projet & Recette', color: '#f59e0b' }
  ];

  // --- État de l'application ---
  let state = {
    startMonday: getMonday(new Date()), // Date du lundi de départ
    daysPerWeek: 5,                     // 5 ou 7 jours
    searchQuery: '',
    personas: [],
    tasks: {}                           // Clé: `${personaId}__${dateISO}` -> { title, status, notes }
  };

  // Handle de fichier pour File System Access API (si supporté)
  let fileHandle = null;

  // --- Initialisation au chargement ---
  window.addEventListener('DOMContentLoaded', () => {
    loadInitialPlanningData();
    initColorPalette();
    bindEvents();
    render();
  });

  // --- Gestion des Dates ---
  function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // ajustement pour lundi
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  function formatDateISO(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function formatShortDate(d) {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(d);
  }

  function getDayName(d) {
    return new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(d);
  }

  // --- Génération des jours des 2 semaines ---
  function getSprintDays() {
    const days = [];
    const totalDays = state.daysPerWeek * 2;
    
    // Semaine 1
    for (let i = 0; i < state.daysPerWeek; i++) {
      days.push({
        date: addDays(state.startMonday, i),
        weekNum: 1
      });
    }

    // Semaine 2 (commence le lundi suivant)
    const nextMonday = addDays(state.startMonday, 7);
    for (let i = 0; i < state.daysPerWeek; i++) {
      days.push({
        date: addDays(nextMonday, i),
        weekNum: 2
      });
    }

    return days;
  }

  // --- Initialisation Palette Couleurs Modal ---
  function initColorPalette() {
    const paletteEl = document.getElementById('colorPalette');
    if (!paletteEl) return;
    paletteEl.innerHTML = '';
    
    COLOR_PALETTE.forEach((col, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `color-option ${index === 0 ? 'selected' : ''}`;
      btn.style.backgroundColor = col;
      btn.dataset.color = col;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('personaColor').value = col;
      });
      paletteEl.appendChild(btn);
    });
  }

  // --- Écouteurs d'événements ---
  function bindEvents() {
    // Navigation Semaines — bloquée sur 10/08 → 21/08
    const prevBtn = document.getElementById('prevWeekBtn');
    const nextBtn = document.getElementById('nextWeekBtn');
    const todayBtn = document.getElementById('todayBtn');
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (todayBtn) todayBtn.style.display = 'none';

    // Toggle 5j / 7j
    document.getElementById('toggle5Days').addEventListener('click', () => {
      state.daysPerWeek = 5;
      document.getElementById('toggle5Days').classList.add('active');
      document.getElementById('toggle7Days').classList.remove('active');
      render();
    });

    document.getElementById('toggle7Days').addEventListener('click', () => {
      state.daysPerWeek = 7;
      document.getElementById('toggle7Days').classList.add('active');
      document.getElementById('toggle5Days').classList.remove('active');
      render();
    });

    // Recherche / Filtre
    document.getElementById('searchInput').addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      render();
    });

    // Menu Dropdown
    const menuBtn = document.getElementById('menuOptionsBtn');
    const menuDropdown = document.getElementById('optionsDropdownMenu');
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menuDropdown.classList.remove('show');
    });

    // Bouton Nouveau Persona
    document.getElementById('addPersonaBtn').addEventListener('click', () => {
      openPersonaModal();
    });

    // Formulaire Persona
    document.getElementById('personaForm').addEventListener('submit', handlePersonaSubmit);

    // Formulaire Tâche
    document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);

    // Actions Fichier Local data.js
    document.getElementById('downloadDataJsBtn').addEventListener('click', downloadUpdatedDataJs);
    document.getElementById('importDataJsInput').addEventListener('change', handleImportDataJs);
    document.getElementById('reloadInitialDataBtn').addEventListener('click', reloadFromDataJs);
    document.getElementById('printBtn').addEventListener('click', () => window.print());
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);
  }

  // --- Rendu Principal ---
  function render() {
    renderDateSubtitle();
    renderTableHeader();
    renderTableBody();
    renderStats();
  }

  // --- Sous-titre Dates ---
  function renderDateSubtitle() {
    const days = getSprintDays();
    if (days.length === 0) return;
    const startStr = formatShortDate(days[0].date);
    const endStr = formatShortDate(days[days.length - 1].date);
    const year = days[0].date.getFullYear();
    document.getElementById('dateRangeSubtitle').textContent = `Du ${startStr} au ${endStr} ${year}`;
  }

  // --- Rendu En-têtes du Tableau (Personas en colonnes) ---
  function renderTableHeader() {
    const weekGroupRow = document.getElementById('weekGroupRow');
    const daysHeaderRow = document.getElementById('daysHeaderRow');
    const today = new Date();

    // Ligne 1 : cellule vide + groupes Semaine 1 & Semaine 2
    weekGroupRow.innerHTML = `
      <th class="date-col-head"></th>
      <th class="week-badge-w1" colspan="${state.personas.length}">
        Semaine 1 (En cours)
      </th>
    `;
    // On n'a qu'un seul groupe de semaines dans le header supérieur,
    // la séparation visuelle entre S1 et S2 se fera dans le tbody via les lignes

    // Ligne 2 : En-têtes Personas
    let personasHtml = `<th class="date-col-head"><span>Date</span></th>`;

    state.personas.forEach(persona => {
      const initials = persona.name.substring(0, 2).toUpperCase();
      personasHtml += `
        <th class="persona-col-th">
          <div class="persona-col-header">
            <div class="persona-avatar-sm" style="background-color: ${persona.color || '#0284c7'}">${initials}</div>
            <div class="persona-col-meta">
              <span class="persona-col-name">${escapeHtml(persona.name)}</span>
              <span class="persona-col-role">${escapeHtml(persona.role || 'Membre')}</span>
            </div>
            <div class="persona-col-actions">
              <button class="persona-action-btn" title="Modifier" onclick="window.editPersona('${persona.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
              <button class="persona-action-btn delete" title="Supprimer" onclick="window.deletePersona('${persona.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </th>
      `;
    });

    daysHeaderRow.innerHTML = personasHtml;
  }

  // --- Rendu Corps du Tableau (Jours en lignes, Personas en colonnes) ---
  function renderTableBody() {
    const tbody = document.getElementById('planningBody');
    const emptyState = document.getElementById('emptyState');
    const planningWrapper = document.getElementById('planningWrapper');
    const sprintDays = getSprintDays();
    const today = new Date();

    if (state.personas.length === 0) {
      tbody.innerHTML = '';
      emptyState.style.display = 'flex';
      planningWrapper.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    planningWrapper.style.display = 'block';

    const statusLabels = {
      todo: 'À faire',
      in_progress: 'En cours',
      done: 'Terminé',
      blocked: 'Bloqué'
    };

    tbody.innerHTML = '';

    let prevWeekNum = null;

    sprintDays.forEach(dayInfo => {
      const dateISO = formatDateISO(dayInfo.date);
      const isToday = isSameDay(dayInfo.date, today);
      const isWeekend = dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6;

      // Séparateur visuel entre S1 et S2
      if (prevWeekNum !== null && dayInfo.weekNum !== prevWeekNum) {
        const sepRow = document.createElement('tr');
        sepRow.className = 'week-separator-row';
        sepRow.innerHTML = `<td colspan="${state.personas.length + 1}" class="week-separator-cell">Semaine 2 — Suivante</td>`;
        tbody.appendChild(sepRow);
      }
      prevWeekNum = dayInfo.weekNum;

      const row = document.createElement('tr');
      row.className = `day-row${isToday ? ' is-today-row' : ''}${isWeekend ? ' is-weekend-row' : ''}`;

      // Cellule date (1ère colonne)
      let rowHtml = `
        <td class="date-cell${isToday ? ' is-today' : ''}${isWeekend ? ' is-weekend' : ''}">
          <div class="date-cell-inner">
            <span class="date-day-name">${getDayName(dayInfo.date)}</span>
            <span class="date-day-num">${formatShortDate(dayInfo.date)}</span>
            ${isToday ? '<span class="today-badge">Aujourd\'hui</span>' : ''}
          </div>
        </td>
      `;

      // Cellule tâche pour chaque persona
      state.personas.forEach(persona => {
        const taskKey = `${persona.id}__${dateISO}`;
        const task = state.tasks[taskKey];

        // Filtre recherche
        if (state.searchQuery) {
          const matchPersona = persona.name.toLowerCase().includes(state.searchQuery) ||
                               (persona.role && persona.role.toLowerCase().includes(state.searchQuery));
          const matchTask = task && (
            task.title.toLowerCase().includes(state.searchQuery) ||
            (task.notes && task.notes.toLowerCase().includes(state.searchQuery))
          );
          if (!matchPersona && !matchTask) {
            rowHtml += `<td class="day-cell${isToday ? ' is-today' : ''} filtered-out"></td>`;
            return;
          }
        }

        rowHtml += `<td class="day-cell${isToday ? ' is-today' : ''}${isWeekend ? ' is-weekend' : ''}" data-persona-id="${persona.id}" data-date="${dateISO}">`;

        if (task && task.title.trim() !== '') {
          const statusClass = task.status || 'todo';
          rowHtml += `
            <div class="task-card" onclick="window.openTaskModal('${persona.id}', '${dateISO}')">
              <div class="task-card-header">
                <span class="task-status-pill ${statusClass}">${statusLabels[statusClass] || 'À faire'}</span>
              </div>
              <div class="task-title">${escapeHtml(task.title)}</div>
              ${task.notes ? `<div class="task-notes" title="${escapeHtml(task.notes)}"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${escapeHtml(task.notes)}</div>` : ''}
            </div>
          `;
        } else {
          rowHtml += `
            <button class="empty-cell-btn" onclick="window.openTaskModal('${persona.id}', '${dateISO}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Définir</span>
            </button>
          `;
        }

        rowHtml += `</td>`;
      });

      row.innerHTML = rowHtml;
      tbody.appendChild(row);
    });
  }

  // --- Statistiques globales ---
  function renderStats() {
    const sprintDays = getSprintDays();
    let totalTasks = 0;
    let doneTasks = 0;

    state.personas.forEach(p => {
      sprintDays.forEach(d => {
        const key = `${p.id}__${formatDateISO(d.date)}`;
        const t = state.tasks[key];
        if (t && t.title.trim() !== '') {
          totalTasks++;
          if (t.status === 'done') doneTasks++;
        }
      });
    });

    const percent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    document.getElementById('statPersonaCount').textContent = state.personas.length;
    document.getElementById('statTotalTasks').textContent = totalTasks;
    document.getElementById('statProgressBar').style.width = `${percent}%`;
    document.getElementById('statPercent').textContent = `${percent}%`;
  }

  // --- Modale Persona ---
  window.openPersonaModal = function (personaId = null) {
    const modal = document.getElementById('personaModal');
    const titleEl = document.getElementById('personaModalTitle');
    const form = document.getElementById('personaForm');

    form.reset();

    if (personaId) {
      const persona = state.personas.find(p => p.id === personaId);
      if (!persona) return;
      titleEl.textContent = 'Modifier le Persona';
      document.getElementById('personaId').value = persona.id;
      document.getElementById('personaName').value = persona.name;
      document.getElementById('personaRole').value = persona.role || '';
      document.getElementById('personaColor').value = persona.color || '#0284c7';

      // Sélection couleur
      document.querySelectorAll('.color-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.color === persona.color);
      });
    } else {
      titleEl.textContent = 'Nouveau Persona';
      document.getElementById('personaId').value = '';
      const defaultColor = COLOR_PALETTE[state.personas.length % COLOR_PALETTE.length];
      document.getElementById('personaColor').value = defaultColor;
      document.querySelectorAll('.color-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.color === defaultColor);
      });
    }

    modal.classList.add('active');
    document.getElementById('personaName').focus();
  };

  window.closePersonaModal = function () {
    document.getElementById('personaModal').classList.remove('active');
  };

  function handlePersonaSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('personaId').value;
    const name = document.getElementById('personaName').value.trim();
    const role = document.getElementById('personaRole').value.trim();
    const color = document.getElementById('personaColor').value;

    if (!name) return;

    if (id) {
      // Modification
      const p = state.personas.find(item => item.id === id);
      if (p) {
        p.name = name;
        p.role = role;
        p.color = color;
        showToast(`Persona "${name}" mis à jour`);
      }
    } else {
      // Ajout
      const newPersona = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name,
        role,
        color
      };
      state.personas.push(newPersona);
      showToast(`Persona "${name}" ajouté avec succès`);
    }

    closePersonaModal();
    render();
  }

  window.editPersona = function (personaId) {
    window.openPersonaModal(personaId);
  };

  window.deletePersona = function (personaId) {
    const persona = state.personas.find(p => p.id === personaId);
    if (!persona) return;
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${persona.name} et ses tâches associées ?`)) {
      state.personas = state.personas.filter(p => p.id !== personaId);
      // Supprimer les tâches associées
      Object.keys(state.tasks).forEach(k => {
        if (k.startsWith(`${personaId}__`)) {
          delete state.tasks[k];
        }
      });
      showToast(`Persona ${persona.name} supprimé`);
      render();
    }
  };

  // --- Modale Tâche ---
  window.openTaskModal = function (personaId, dateISO) {
    const persona = state.personas.find(p => p.id === personaId);
    if (!persona) return;

    const modal = document.getElementById('taskModal');
    const deleteBtn = document.getElementById('deleteTaskBtn');
    const dateObj = new Date(dateISO + 'T00:00:00');
    const formattedDate = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(dateObj);

    document.getElementById('taskPersonaId').value = personaId;
    document.getElementById('taskDate').value = dateISO;
    document.getElementById('taskModalSubtitle').textContent = `${persona.name} • ${formattedDate}`;

    const taskKey = `${personaId}__${dateISO}`;
    const task = state.tasks[taskKey];

    if (task && task.title.trim() !== '') {
      document.getElementById('taskModalTitle').textContent = 'Modifier la tâche';
      document.getElementById('taskTitle').value = task.title;
      document.getElementById('taskNotes').value = task.notes || '';
      
      const statusRadio = document.querySelector(`input[name="taskStatus"][value="${task.status || 'todo'}"]`);
      if (statusRadio) statusRadio.checked = true;

      deleteBtn.style.display = 'inline-flex';
    } else {
      document.getElementById('taskModalTitle').textContent = 'Nouvelle tâche du jour';
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskNotes').value = '';
      
      const todoRadio = document.querySelector('input[name="taskStatus"][value="todo"]');
      if (todoRadio) todoRadio.checked = true;

      deleteBtn.style.display = 'none';
    }

    modal.classList.add('active');
    setTimeout(() => {
      document.getElementById('taskTitle').focus();
    }, 100);
  };

  window.closeTaskModal = function () {
    document.getElementById('taskModal').classList.remove('active');
  };

  function handleTaskSubmit(e) {
    e.preventDefault();
    const personaId = document.getElementById('taskPersonaId').value;
    const dateISO = document.getElementById('taskDate').value;
    const title = document.getElementById('taskTitle').value.trim();
    const notes = document.getElementById('taskNotes').value.trim();
    const status = document.querySelector('input[name="taskStatus"]:checked').value;

    if (!title) return;

    const taskKey = `${personaId}__${dateISO}`;
    state.tasks[taskKey] = {
      title,
      status,
      notes,
      updatedAt: new Date().toISOString()
    };

    closeTaskModal();
    showToast('Tâche enregistrée');
    render();
  }

  window.deleteCurrentTask = function () {
    const personaId = document.getElementById('taskPersonaId').value;
    const dateISO = document.getElementById('taskDate').value;
    const taskKey = `${personaId}__${dateISO}`;

    if (state.tasks[taskKey]) {
      delete state.tasks[taskKey];
      closeTaskModal();
      showToast('Tâche supprimée');
      render();
    }
  };

  // --- Sauvegarde & Téléchargement data.js ---

  // Télécharger le fichier data.js à jour
  function downloadUpdatedDataJs() {
    const dataToSave = {
      startMonday: formatDateISO(state.startMonday),
      daysPerWeek: state.daysPerWeek,
      lastSaved: new Date().toISOString(),
      personas: state.personas,
      tasks: state.tasks
    };

    const jsContent = `/**\n * Fichier de données local pour le planning 2 semaines\n * Ce fichier est chargé directement par index.html\n */\nwindow.PLANNING_INITIAL_DATA = ${JSON.stringify(dataToSave, null, 2)};\n`;
    
    downloadFile(jsContent, 'data.js', 'application/javascript');
    showToast('💾 data.js téléchargé ! Glissez-le dans concept/planing');
    animateSaveButton();
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleImportDataJs(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        // Extraire l'objet JSON après window.PLANNING_INITIAL_DATA =
        const jsonMatch = text.match(/window\.PLANNING_INITIAL_DATA\s*=\s*(\{[\s\S]*\});?/);
        if (jsonMatch && jsonMatch[1]) {
          const imported = JSON.parse(jsonMatch[1]);
          applyImportedData(imported);
        } else {
          // Essai parsing direct si format JSON pur
          const imported = JSON.parse(text);
          applyImportedData(imported);
        }
      } catch (err) {
        alert('Erreur lors de la lecture du fichier data.js.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function applyImportedData(imported) {
    if (Array.isArray(imported.personas)) {
      state.personas = imported.personas;
      state.tasks = imported.tasks || {};
      if (imported.daysPerWeek) state.daysPerWeek = imported.daysPerWeek;
      if (imported.startMonday) state.startMonday = getMonday(new Date(imported.startMonday));
      render();
      showToast('✅ Données rechargées avec succès !');
    } else {
      alert('Format de données invalide.');
    }
  }

  function reloadFromDataJs() {
    if (window.PLANNING_INITIAL_DATA && Array.isArray(window.PLANNING_INITIAL_DATA.personas)) {
      const data = window.PLANNING_INITIAL_DATA;
      state.personas = JSON.parse(JSON.stringify(data.personas));
      state.tasks = JSON.parse(JSON.stringify(data.tasks || {}));
      if (data.daysPerWeek) state.daysPerWeek = data.daysPerWeek;
      if (data.startMonday) state.startMonday = getMonday(new Date(data.startMonday));
      render();
      showToast('🔄 Planning rechargé depuis le fichier local data.js !');
    } else {
      showToast('Aucun fichier data.js trouvé');
    }
  }

  function animateSaveButton() {
    const btn = document.getElementById('downloadDataJsBtn');
    if (!btn) return;
    btn.classList.add('saved');
    setTimeout(() => {
      btn.classList.remove('saved');
    }, 1500);
  }

  function clearAllData() {
    if (confirm('Voulez-vous vraiment effacer tous les personas et toutes les tâches ?')) {
      state.personas = [];
      state.tasks = {};
      render();
      showToast('Toutes les données ont été effacées.');
    }
  }



  function loadInitialPlanningData() {
    // Charger depuis le fichier local data.js si présent
    if (window.PLANNING_INITIAL_DATA && Array.isArray(window.PLANNING_INITIAL_DATA.personas)) {
      const data = window.PLANNING_INITIAL_DATA;
      state.personas = JSON.parse(JSON.stringify(data.personas));
      state.tasks = JSON.parse(JSON.stringify(data.tasks || {}));
      if (data.daysPerWeek) state.daysPerWeek = data.daysPerWeek;
      if (data.startMonday) state.startMonday = getMonday(new Date(data.startMonday));
      return;
    }

    // Fallback : données démo
    state.personas = JSON.parse(JSON.stringify(SAMPLE_PERSONAS));
    state.tasks = {};
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // --- Utilitaire sécurité HTML ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();

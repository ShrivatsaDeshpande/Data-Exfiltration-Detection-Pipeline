// Setup Chart.js global defaults
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Outfit', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(10, 15, 30, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#00f2fe';
Chart.defaults.plugins.tooltip.bodyColor = '#f8fafc';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0, 242, 254, 0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;

async function fetchCSV(url) {
    let response = await fetch(url);
    if (!response.ok && url.startsWith('/')) {
        response = await fetch(url.slice(1));
    }
    if (!response.ok) return [];
    const csvText = await response.text();
    return new Promise((resolve) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data)
        });
    });
}

async function loadDashboard() {
    // Fetch logs
    const accessLogs = await fetchCSV('/logs/access_logs.csv');
    const alerts = await fetchCSV('/logs/alerts.csv');
    const exportsLogs = await fetchCSV('/logs/exports.csv');

    // 1. Update KPIs
    document.getElementById('kpi-total-requests').innerText = accessLogs.length;
    
    let successReads = 0;
    let deniedReads = 0;
    accessLogs.forEach(row => {
        if (row.status === 'success') successReads++;
        else if (row.status === 'denied') deniedReads++;
    });

    document.getElementById('kpi-success-reads').innerText = successReads;
    document.getElementById('kpi-denied-reads').innerText = deniedReads;
    document.getElementById('kpi-total-exports').innerText = exportsLogs.length;
    document.getElementById('kpi-total-alerts').innerText = alerts.length;

    // --- NEW: Threat Actor Audit Chart (Focus on Top Actor) ---
    const actorExportMap = {};
    exportsLogs.forEach(row => {
        if (!row.actor_user_id) return;
        actorExportMap[row.actor_user_id] = (actorExportMap[row.actor_user_id] || 0) + parseInt(row.rows_exported || 0);
    });

    const sortedActors = Object.keys(actorExportMap).sort((a,b) => actorExportMap[b] - actorExportMap[a]).slice(0, 5);
    const actorData = sortedActors.map(id => actorExportMap[id]);
    const actorLabels = sortedActors.map(id => id === '66' ? 'User 66 (Threat Actor)' : `User ${id}`);
    
    // Highlight User 66 or top user
    const actorColors = sortedActors.map(id => id === '66' || id === sortedActors[0] ? '#ff0844' : 'rgba(0, 242, 254, 0.5)');

    new Chart(document.getElementById('threatActorChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: actorLabels,
            datasets: [{
                label: 'Total Rows Exported',
                data: actorData,
                backgroundColor: actorColors,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: actorColors.map(c => c === '#ff0844' ? '#ffb199' : '#00f2fe')
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // --- NEW: Exfiltration Lifecycle Timeline ---
    const timelineContainer = document.getElementById('lifecycle-timeline');
    const lifecycleSteps = [
        { icon: '👁️', title: 'Phase 1: Initial Reconnaissance', desc: `${accessLogs.length} total API access attempts recorded. Identifying target endpoints.`, alert: false, delay: 0.1 },
        { icon: '📦', title: 'Phase 2: Data Staging & Export', desc: `${exportsLogs.length} bulk export operations executed by active users.`, alert: false, delay: 0.2 },
    ];
    
    if (alerts.length > 0) {
        // Find first alert
        const firstAlert = alerts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))[0];
        lifecycleSteps.push({
            icon: '🚨', 
            title: `Phase 3: Anomaly Detected (${firstAlert.rule_name})`, 
            desc: `Detection engine triggered high-severity alert for User ${firstAlert.actor_user_id}. Pattern matches known exfiltration behavior.`, 
            alert: true,
            delay: 0.3
        });
    }

    if (deniedReads > 0) {
        lifecycleSteps.push({
            icon: '🛡️',
            title: 'Phase 4: Mitigation & Blocking',
            desc: `Secure mode enforced. ${deniedReads} unauthorized access attempts were actively denied and blocked.`,
            alert: false,
            delay: 0.4
        });
    }

    lifecycleSteps.forEach(step => {
        const stepEl = document.createElement('div');
        stepEl.className = `timeline-step ${step.alert ? 'alert' : ''}`;
        stepEl.style.animationDelay = `${step.delay}s`;
        stepEl.innerHTML = `
            <div class="timeline-icon">${step.icon}</div>
            <div class="timeline-content">
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        `;
        timelineContainer.appendChild(stepEl);
    });

    // 2. Vulnerable vs Secure Mode Chart
    const modeCounts = { Vulnerable: { success: 0, denied: 0 }, Secure: { success: 0, denied: 0 } };
    accessLogs.forEach(row => {
        const mode = row.mode;
        if (modeCounts[mode]) {
            if (row.status === 'success') modeCounts[mode].success++;
            else if (row.status === 'denied') modeCounts[mode].denied++;
        }
    });

    new Chart(document.getElementById('modeChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Vulnerable Mode', 'Secure Mode'],
            datasets: [
                { label: 'Successful (Exposed)', data: [modeCounts.Vulnerable.success, modeCounts.Secure.success], backgroundColor: '#ff0844', borderRadius: 4 },
                { label: 'Denied (Protected)', data: [modeCounts.Vulnerable.denied, modeCounts.Secure.denied], backgroundColor: '#00f2fe', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
        }
    });

    // 3. Alerts by Rule Pie Chart
    const rulesMap = {};
    alerts.forEach(row => { rulesMap[row.rule_name] = (rulesMap[row.rule_name] || 0) + 1; });

    new Chart(document.getElementById('ruleChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(rulesMap),
            datasets: [{
                data: Object.values(rulesMap),
                backgroundColor: ['#ff0844', '#00f2fe', '#f39c12', '#9b59b6'],
                borderWidth: 2,
                borderColor: 'rgba(10, 15, 30, 1)',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: '#f8fafc' } } }
        }
    });

    // 5. Alerts by User
    const userAlertMap = {};
    alerts.forEach(row => {
        if (!row.actor_user_id) return;
        userAlertMap[row.actor_user_id] = (userAlertMap[row.actor_user_id] || 0) + 1;
    });

    new Chart(document.getElementById('userChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(userAlertMap).map(id => `User ${id}`),
            datasets: [{
                label: 'Alerts Triggered',
                data: Object.values(userAlertMap),
                backgroundColor: 'rgba(255, 8, 68, 0.8)',
                borderColor: '#ff0844',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { grid: { display: false } }
            }
        }
    });

    // 6. Populate Recent Alerts Table
    const tableBody = document.querySelector('#alertsTable tbody');
    const sortedAlerts = [...alerts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    
    sortedAlerts.forEach(alert => {
        if (!alert.timestamp) return;
        const date = new Date(alert.timestamp);
        const formattedDate = date.toLocaleString();
        const severityClass = `severity-${alert.severity ? alert.severity.toLowerCase() : 'low'}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formattedDate}</td>
            <td><span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${alert.rule_name}</span></td>
            <td class="${severityClass}">${(alert.severity || '').toUpperCase()}</td>
            <td>User <span style="color: #00f2fe;">${alert.actor_user_id}</span></td>
            <td>${alert.details}</td>
        `;
        tableBody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', loadDashboard);

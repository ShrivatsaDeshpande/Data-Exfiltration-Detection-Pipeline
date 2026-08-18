// Setup Chart.js global defaults
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Outfit', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(10, 15, 30, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#00f2fe';
Chart.defaults.plugins.tooltip.bodyColor = '#f8fafc';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0, 242, 254, 0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;

const DEFAULT_DATASETS = {
    'access_logs.csv': `timestamp,mode,event_type,actor_user_id,target_record_id,rows_returned,status,reason,ip_address,user_agent
2026-06-15T05:19:04.218735+00:00,Vulnerable,get_record,77,1,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.223430+00:00,Vulnerable,get_record,77,2,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.227356+00:00,Vulnerable,get_record,77,3,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.232135+00:00,Vulnerable,get_record,77,4,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.236500+00:00,Vulnerable,get_record,77,5,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.240876+00:00,Vulnerable,get_record,77,6,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.244651+00:00,Vulnerable,get_record,77,7,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.248212+00:00,Vulnerable,get_record,77,8,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.251649+00:00,Vulnerable,get_record,77,9,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.255377+00:00,Vulnerable,get_record,77,10,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.259250+00:00,Vulnerable,get_record,77,11,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.262894+00:00,Vulnerable,get_record,77,12,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.266442+00:00,Vulnerable,get_record,77,13,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.269942+00:00,Vulnerable,get_record,77,14,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.273908+00:00,Vulnerable,get_record,77,15,1,success,,127.0.0.1,bola-script
2026-06-15T05:19:04.459179+00:00,Vulnerable,export_records,99,,180,success,,127.0.0.1,bulk-exfiltration-script
2026-06-15T05:19:04.644004+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-06-15T05:19:04.857510+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-06-15T05:19:05.074045+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-06-15T05:19:05.289051+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-06-15T05:19:05.502247+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-06-15T05:19:08.923992+00:00,Secure,get_record,77,1,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.928507+00:00,Secure,get_record,77,2,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.932928+00:00,Secure,get_record,77,3,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.937872+00:00,Secure,get_record,77,4,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.941996+00:00,Secure,get_record,77,5,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.945948+00:00,Secure,get_record,77,6,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.949638+00:00,Secure,get_record,77,7,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.953348+00:00,Secure,get_record,77,8,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.957687+00:00,Secure,get_record,77,9,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.961499+00:00,Secure,get_record,77,10,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.965367+00:00,Secure,get_record,77,11,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.968873+00:00,Secure,get_record,77,12,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.972562+00:00,Secure,get_record,77,13,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.976488+00:00,Secure,get_record,77,14,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-06-15T05:19:08.980375+00:00,Secure,get_record,77,15,0,denied,owner_mismatch,127.0.0.1,bola-script
2026-08-01T20:34:18.408922+00:00,Vulnerable,get_record,77,1,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.418023+00:00,Vulnerable,get_record,77,2,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.423548+00:00,Vulnerable,get_record,77,3,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.427799+00:00,Vulnerable,get_record,77,4,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.432792+00:00,Vulnerable,get_record,77,5,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.437295+00:00,Vulnerable,get_record,77,6,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.441565+00:00,Vulnerable,get_record,77,7,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.446208+00:00,Vulnerable,get_record,77,8,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.451742+00:00,Vulnerable,get_record,77,9,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.455781+00:00,Vulnerable,get_record,77,10,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.459863+00:00,Vulnerable,get_record,77,11,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.464206+00:00,Vulnerable,get_record,77,12,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.469011+00:00,Vulnerable,get_record,77,13,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.473030+00:00,Vulnerable,get_record,77,14,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.477046+00:00,Vulnerable,get_record,77,15,1,success,,127.0.0.1,bola-script
2026-08-01T20:34:18.665135+00:00,Vulnerable,export_records,99,,180,success,,127.0.0.1,bulk-exfiltration-script
2026-08-01T20:34:18.921154+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-08-01T20:34:19.135640+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-08-01T20:34:19.349518+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-08-01T20:34:19.563215+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script
2026-08-01T20:34:19.776948+00:00,Vulnerable,export_records,66,,80,success,,127.0.0.1,off-hours-script`,

    'alerts.csv': `timestamp,rule_name,severity,actor_user_id,details
2026-06-15T05:19:10.593204+00:00,high_volume_export,high,99,Exported 180 rows to csv_endpoint
2026-06-15T05:19:10.593405+00:00,repeated_export_activity,medium,66,Repeated export activity detected
2026-06-15T05:19:10.593608+00:00,denied_record_access,medium,77,Unauthorized object access attempts detected
2026-08-01T20:34:23.446405+00:00,high_volume_export,high,99,Exported 180 rows to csv_endpoint
2026-08-01T20:34:23.446910+00:00,high_volume_export,high,99,Exported 180 rows to csv_endpoint
2026-08-01T20:34:23.447100+00:00,repeated_export_activity,medium,66,Repeated export activity detected
2026-08-01T20:34:23.447312+00:00,denied_record_access,medium,77,Unauthorized object access attempts detected`,

    'exports.csv': `timestamp,actor_user_id,rows_exported,export_target
2026-06-15T05:19:04.459346+00:00,99,180,csv_endpoint
2026-06-15T05:19:04.644241+00:00,66,80,csv_endpoint
2026-06-15T05:19:04.857708+00:00,66,80,csv_endpoint
2026-06-15T05:19:05.074343+00:00,66,80,csv_endpoint
2026-06-15T05:19:05.289257+00:00,66,80,csv_endpoint
2026-06-15T05:19:05.502432+00:00,66,80,csv_endpoint
2026-08-01T20:34:18.665346+00:00,99,180,csv_endpoint
2026-08-01T20:34:18.921502+00:00,66,80,csv_endpoint
2026-08-01T20:34:19.135990+00:00,66,80,csv_endpoint
2026-08-01T20:34:19.349795+00:00,66,80,csv_endpoint
2026-08-01T20:34:19.563523+00:00,66,80,csv_endpoint
2026-08-01T20:34:19.777185+00:00,66,80,csv_endpoint`
};

function parseCSVString(csvText) {
    return new Promise((resolve) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data || [])
        });
    });
}

async function fetchCSV(url) {
    const filename = url.split('/').pop();
    const candidates = [
        url,
        url.startsWith('/') ? url.slice(1) : '/' + url,
        '/logs/' + filename,
        'logs/' + filename
    ];

    for (const path of candidates) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const text = await response.text();
                if (text && text.trim().length > 0 && !text.includes('<!DOCTYPE html>')) {
                    const parsed = await parseCSVString(text);
                    if (parsed && parsed.length > 0) return parsed;
                }
            }
        } catch (e) {
            // continue
        }
    }

    // Fallback to embedded seed dataset
    if (DEFAULT_DATASETS[filename]) {
        return await parseCSVString(DEFAULT_DATASETS[filename]);
    }
    return [];
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDashboard);
} else {
    loadDashboard();
}

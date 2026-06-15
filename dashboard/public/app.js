// Setup Chart.js global defaults
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#f8fafc';
Chart.defaults.plugins.tooltip.bodyColor = '#f8fafc';

async function fetchCSV(url) {
    const response = await fetch(url);
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

    // 2. Vulnerable vs Secure Mode Chart
    const modeCounts = {
        Vulnerable: { success: 0, denied: 0 },
        Secure: { success: 0, denied: 0 }
    };

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
            labels: ['Vulnerable', 'Secure'],
            datasets: [
                {
                    label: 'Successful',
                    data: [modeCounts.Vulnerable.success, modeCounts.Secure.success],
                    backgroundColor: '#2ecc71',
                    borderRadius: 4
                },
                {
                    label: 'Denied',
                    data: [modeCounts.Vulnerable.denied, modeCounts.Secure.denied],
                    backgroundColor: '#e74c3c',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 3. Alerts by Rule Pie Chart
    const rulesMap = {};
    alerts.forEach(row => {
        rulesMap[row.rule_name] = (rulesMap[row.rule_name] || 0) + 1;
    });

    new Chart(document.getElementById('ruleChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(rulesMap),
            datasets: [{
                data: Object.values(rulesMap),
                backgroundColor: ['#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#1abc9c'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });

    // 4. Export Activity Over Time
    const exportMap = {};
    exportsLogs.forEach(row => {
        // Truncate to hour
        const date = new Date(row.timestamp);
        if (isNaN(date)) return;
        const hour = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:00`;
        exportMap[hour] = (exportMap[hour] || 0) + 1;
    });

    new Chart(document.getElementById('exportChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: Object.keys(exportMap),
            datasets: [{
                label: 'Export Events',
                data: Object.values(exportMap),
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { grid: { display: false } }
            }
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
                label: 'Alerts',
                data: Object.values(userAlertMap),
                backgroundColor: '#e74c3c',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                y: { grid: { display: false } }
            }
        }
    });

    // 6. Populate Recent Alerts Table
    const tableBody = document.querySelector('#alertsTable tbody');
    // Sort alerts by timestamp descending, take top 10
    const sortedAlerts = [...alerts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    
    sortedAlerts.forEach(alert => {
        if (!alert.timestamp) return;
        
        const tr = document.createElement('tr');
        
        // Format timestamp
        const date = new Date(alert.timestamp);
        const formattedDate = date.toLocaleString();
        
        const severityClass = `severity-${alert.severity ? alert.severity.toLowerCase() : 'low'}`;

        tr.innerHTML = `
            <td>${formattedDate}</td>
            <td>${alert.rule_name}</td>
            <td class="${severityClass}">${(alert.severity || '').toUpperCase()}</td>
            <td>User ${alert.actor_user_id}</td>
            <td>${alert.details}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadDashboard);

document.addEventListener('DOMContentLoaded', function() {
    // Base URL for API requests
    const API_BASE_URL = 'https://ai-safety-incident-log.onrender.com/api';
    
    // Elements
    const incidentsTableBody = document.getElementById('incidentsTableBody');
    const addIncidentForm = document.getElementById('addIncidentForm');
    const saveIncidentBtn = document.getElementById('saveIncidentBtn');
    const deleteIncidentBtn = document.getElementById('deleteIncidentBtn');
    
    // Bootstrap modals
    const addIncidentModal = new bootstrap.Modal(document.getElementById('addIncidentModal'));
    const incidentDetailsModal = new bootstrap.Modal(document.getElementById('incidentDetailsModal'));
    
    // Current incident ID (for deletion)
    let currentIncidentId = null;
    
    // Load all incidents when the page loads
    loadIncidents();
    
    // Event Listeners
    saveIncidentBtn.addEventListener('click', saveIncident);
    deleteIncidentBtn.addEventListener('click', deleteIncident);
    
    // Functions
    function loadIncidents() {
        axios.get(`${API_BASE_URL}/incidents`)
            .then(response => {
                displayIncidents(response.data);
            })
            .catch(error => {
                console.error('Error loading incidents:', error);
                showAlert('Failed to load incidents', 'danger');
            });
    }
    
    function displayIncidents(incidents) {
        incidentsTableBody.innerHTML = '';
        
        if (incidents.length === 0) {
            incidentsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No incidents found</td>
                </tr>
            `;
            return;
        }
        
        incidents.forEach(incident => {
            const row = document.createElement('tr');
            row.className = 'incident-row';
            row.dataset.id = incident.id;
            
            const reportedDate = new Date(incident.reportedAt).toLocaleString();
            
            row.innerHTML = `
                <td>${incident.id}</td>
                <td>${incident.title}</td>
                <td><span class="badge badge-${incident.severity.toLowerCase()}">${incident.severity}</span></td>
                <td>${reportedDate}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary view-btn" data-id="${incident.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${incident.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            
            incidentsTableBody.appendChild(row);
            
            // Add event listener to the row
            row.addEventListener('click', function(e) {
                if (!e.target.closest('.btn')) {
                    showIncidentDetails(incident.id);
                }
            });
            
            // Add event listeners to buttons
            row.querySelector('.view-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                showIncidentDetails(incident.id);
            });
            
            row.querySelector('.delete-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                confirmDelete(incident.id);
            });
        });
    }
    
    function showIncidentDetails(id) {
        axios.get(`${API_BASE_URL}/incidents/${id}`)
            .then(response => {
                const incident = response.data;
                currentIncidentId = incident.id;
                
                document.getElementById('detailTitle').textContent = incident.title;
                document.getElementById('detailDescription').textContent = incident.description;
                
                const severityBadge = document.getElementById('detailSeverity');
                severityBadge.textContent = incident.severity;
                severityBadge.className = `badge badge-${incident.severity.toLowerCase()}`;
                
                document.getElementById('detailDate').textContent = new Date(incident.reportedAt).toLocaleString();
                
                incidentDetailsModal.show();
            })
            .catch(error => {
                console.error('Error loading incident details:', error);
                showAlert('Failed to load incident details', 'danger');
            });
    }
    
    function saveIncident() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const severity = document.getElementById('severity').value;
        
        if (!title || !description || !severity) {
            showAlert('Please fill in all fields', 'warning');
            return;
        }
        
        const incidentData = {
            title,
            description,
            severity
        };
        
        axios.post(`${API_BASE_URL}/incidents`, incidentData)
            .then(response => {
                addIncidentModal.hide();
                addIncidentForm.reset();
                loadIncidents();
                showAlert('Incident reported successfully', 'success');
            })
            .catch(error => {
                console.error('Error saving incident:', error);
                
                // Display validation errors if available
                if (error.response && error.response.data) {
                    const errorMessages = Object.values(error.response.data).join(', ');
                    showAlert(`Validation Error: ${errorMessages}`, 'danger');
                } else {
                    showAlert('Failed to save incident', 'danger');
                }
            });
    }
    
    function confirmDelete(id) {
        currentIncidentId = id;
        if (confirm('Are you sure you want to delete this incident?')) {
            deleteIncident();
        }
    }
    
    function deleteIncident() {
        if (!currentIncidentId) return;
        
        axios.delete(`${API_BASE_URL}/incidents/${currentIncidentId}`)
            .then(response => {
                incidentDetailsModal.hide();
                loadIncidents();
                showAlert('Incident deleted successfully', 'success');
                currentIncidentId = null;
            })
            .catch(error => {
                console.error('Error deleting incident:', error);
                showAlert('Failed to delete incident', 'danger');
            });
    }
    
    function showAlert(message, type = 'info') {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert at the top of the container
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Automatically dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
});

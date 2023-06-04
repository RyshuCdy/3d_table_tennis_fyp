// Fetch data from the backend API
fetch('/api/feedback')
  .then(response => response.json())
  .then(data => {
    const feedbackTable = document.getElementById('feedbackTable').getElementsByTagName('tbody')[0];
    data.forEach(feedback => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${feedback.name}</td>
        <td>${feedback.email}</td>
        <td>${feedback.message}</td>
      `;
      feedbackTable.appendChild(row);
    });
  })
  .catch(error => console.error(error));

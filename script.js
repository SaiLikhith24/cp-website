document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://cp-website.onrender.com/api/contests';

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.status && data.status !== 'OK') {
        throw new Error(data.detail || 'API returned an error.');
      }

      if (!data.objects || data.objects.length === 0) {
        document.getElementById('loader').textContent = 'No upcoming contests found.';
        return;
      }

      displayContests(data.objects);
    })
    .catch(error => {
      console.error(error);
      document.getElementById('loader').textContent = '❌ Error: ' + error.message;
    });
});

function displayContests(contests) {
  const tbody = document.querySelector('#contest-table tbody');
  document.getElementById('loader').style.display = 'none';

  contests.forEach(contest => {
    const tr = document.createElement('tr');

    const startUTC = new Date(contest.start);
    const startIST = new Date(startUTC.getTime() + (5.5 * 60 * 60 * 1000));

    const dateStr = startIST.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const dayStr = startIST.toLocaleDateString('en-IN', {
      weekday: 'short'
    });

    const timeStr = startIST.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const durationHours = (contest.duration / 3600).toFixed(2);

    let platformName = contest.resource.name;
    let platformIconUrl = `https://clist.by${contest.resource.icon}`;

    const dateTd = document.createElement('td');
    dateTd.textContent = dateStr;

    const dayTd = document.createElement('td');
    dayTd.textContent = dayStr;

    const nameTd = document.createElement('td');
    const link = document.createElement('a');
    link.href = contest.href;
    link.target = '_blank';
    link.textContent = contest.event;
    nameTd.appendChild(link);

    const platformTd = document.createElement('td');
    const img = document.createElement('img');
    img.src = platformIconUrl;
    img.alt = platformName;
    img.style.height = '24px';
    img.style.verticalAlign = 'middle';
    img.style.marginRight = '8px';

    const span = document.createElement('span');
    span.textContent = platformName;

    platformTd.appendChild(img);
    platformTd.appendChild(span);

    const durationTd = document.createElement('td');
    durationTd.textContent = durationHours;

    const timeTd = document.createElement('td');
    timeTd.textContent = timeStr;

    tr.appendChild(dateTd);
    tr.appendChild(dayTd);
    tr.appendChild(nameTd);
    tr.appendChild(platformTd);
    tr.appendChild(durationTd);
    tr.appendChild(timeTd);

    tbody.appendChild(tr);
  });
}

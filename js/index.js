var siteName = document.getElementById('site-name');
var siteUrl = document.getElementById('site-url');
var submitBtn = document.getElementById('submit');
var siteNameMessage = document.getElementById('siteName-message');
var siteUrlMessage = document.getElementById('siteUrl-message');
var nameIcon = document.getElementById('nameIcon');
var urlIcon = document.getElementById('urlIcon');
var nameExclamation = document.getElementById('nameExclamation');
var urlExclamation = document.getElementById('urlExclamation');

var websites = [];

if(localStorage.getItem('websites') != null) {
  websites = JSON.parse(localStorage.getItem('websites'));
  displayWebsite();
}

submitBtn.onclick = function() {
  if (siteName.value === '' || siteUrl.value === '') {
    siteNameMessage.classList.remove('d-none');
    siteUrlMessage.classList.remove('d-none');
  } else {
    if (siteName.value.match(/^\w{3,}(\s+\w+)*$/) && siteUrl.value.match(/^(https?:\/\/)?(w{3}\.)?\w+\.\w{3,}$/)) {
      addWebsite();
    }
  }
}

function addWebsite() {
  var website = {
    name: siteName.value,
    url: siteUrl.value
  };
  websites.push(website);
  localStorage.setItem('websites', JSON.stringify(websites));
  displayWebsite();
  clearData()
}

function clearData() {
  siteName.value = null;
  siteUrl.value = null;
}

function displayWebsite() {
  var row = '';
  for (var i = 0; i < websites.length; i++) {
    row += `
      <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${websites[i].name}</td>
        <td>
          <button onclick="visitWebsite(${i})" class="btn visit">
            <i class="fa-solid fa-eye me-1"></i>
            Visit
          </button>
        </td>
        <td>
          <button onclick="deleteWebsite(${i})" class="btn delete">
            <i class="fa-solid fa-trash me-1"></i>
            Delete
          </button>
        </td>
      </tr>
    `
  }
  document.getElementById('tableData').innerHTML = row;
}

function visitWebsite(i) {
  window.open(`https://${websites[i].url}`);
}

function deleteWebsite(i) {
  websites.splice(i, 1);
  localStorage.setItem('websites', JSON.stringify(websites));
  displayWebsite();
}

siteName.addEventListener('input', function(e) {
  var websiteNameRegex = /^\w{3,}(\s+\w+)*$/;
  if(websiteNameRegex.test(e.target.value)) {
    siteName.style.borderColor = '#198754';
    siteName.style.boxShadow = '0 0 0 0.25rem #19875440';
    siteNameMessage.classList.add('d-none');
    nameExclamation.classList.remove('fa-exclamation');
    nameExclamation.classList.add('fa-check');
    nameIcon.style.color = '#198754';
    nameIcon.style.borderColor = '#198754';
  } else if (e.target.value === '') {
    siteName.style.borderColor = '#dc3545';
    siteName.style.boxShadow = 'none';
    siteNameMessage.classList.remove('d-none');
    nameIcon.classList.remove('d-none');
    nameExclamation.classList.remove('fa-check');
    nameExclamation.classList.add('fa-exclamation');
    nameIcon.style.color = '#eb1d36';
    nameIcon.style.borderColor = '#eb1d36';
  } else {
    siteName.style.borderColor = '#dc3545';
    siteName.style.boxShadow = '0 0 0 0.25rem #dc354540';
    siteNameMessage.classList.remove('d-none');
    nameIcon.classList.remove('d-none');
    nameExclamation.classList.remove('fa-check');
    nameExclamation.classList.add('fa-exclamation');
    nameIcon.style.color = '#eb1d36';
    nameIcon.style.borderColor = '#eb1d36';
  }
});

siteUrl.addEventListener('input', function(e) {
  var websiteUrlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{3,}$/;
  if (websiteUrlRegex.test(e.target.value)) {
    siteUrl.style.borderColor = '#198754';
    siteUrl.style.boxShadow = '0 0 0 0.25rem #19875440';
    siteUrlMessage.classList.add('d-none');
    urlExclamation.classList.remove('fa-exclamation');
    urlExclamation.classList.add('fa-check');
    urlIcon.style.color = '#198754';
    urlIcon.style.borderColor = '#198754';
  } else if (e.target.value === '') {
    siteUrl.style.borderColor = '#dc3545';
    siteUrl.style.boxShadow = 'none';
    siteUrlMessage.classList.remove('d-none');
    urlIcon.classList.remove('d-none');
    urlExclamation.classList.remove('fa-check');
    urlExclamation.classList.add('fa-exclamation');
    urlIcon.style.color = '#eb1d36';
    urlIcon.style.borderColor = '#eb1d36';
  } else {
    siteUrl.style.borderColor = '#dc3545';
    siteUrl.style.boxShadow = '0 0 0 0.25rem #dc354540';
    siteUrlMessage.classList.remove('d-none');
    urlIcon.classList.remove('d-none');
    urlExclamation.classList.remove('fa-check');
    urlExclamation.classList.add('fa-exclamation');
    urlIcon.style.color = '#eb1d36';
    urlIcon.style.borderColor = '#eb1d36';
  }
});

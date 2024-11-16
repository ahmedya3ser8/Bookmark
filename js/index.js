var websiteName = document.getElementById('site-name');
var websiteUrl = document.getElementById('site-url');
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
  if (websiteName.value === '' || siteUrl.value === '') {
    siteNameMessage.classList.remove('d-none');
    siteUrlMessage.classList.remove('d-none');
  } else {
    if (websiteName.value.match(/^\w{3,}(\s+\w+)*$/) && websiteUrl.value.match(/^(https?:\/\/)?(w{3}\.)?\w+\.\w{3,}$/)) {
      addWebsite();
    }
  }
}

function addWebsite() {
  var website = {
    name: websiteName.value,
    url: websiteUrl.value
  };
  websites.push(website);
  localStorage.setItem('websites', JSON.stringify(websites));
  displayWebsite();
  clearData()
}

function clearData() {
  websiteName.value = null;
  websiteUrl.value = null;
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
  var websiteUrlRegex = /^https?:\/\//;
  if (websiteUrlRegex.test(websites[i].url)) {
    window.open(websites[i].url);
  } else {
    window.open(`https://${websites[i].url}`);
  }
}

function deleteWebsite(i) {
  websites.splice(i, 1);
  localStorage.setItem('websites', JSON.stringify(websites));
  displayWebsite();
}

websiteName.addEventListener('input', function(e) {
  validateInputs(/^\w{3,}(\s+\w+)*$/, websiteName, siteNameMessage, nameIcon, nameExclamation, e);
});

websiteUrl.addEventListener('input', function(e) {
  validateInputs(/^(https?:\/\/)?(w{3}\.)?\w+\.\w{3,}$/, websiteUrl, siteUrlMessage, urlIcon, urlExclamation, e);
});

function validateInputs(regexValidate, website, siteMessage, icon, exclamationIcon, e) {
  var regex = regexValidate;
  if (regex.test(e.target.value)) {
    website.style.borderColor = '#198754';
    website.style.boxShadow = '0 0 0 0.25rem #19875440';
    siteMessage.classList.add('d-none');
    exclamationIcon.classList.remove('fa-exclamation');
    exclamationIcon.classList.add('fa-check');
    icon.style.color = '#198754';
    icon.style.borderColor = '#198754';
  } else if (e.target.value === '') {
    website.style.borderColor = '#dc3545';
    website.style.boxShadow = 'none';
    siteMessage.classList.remove('d-none');
    icon.classList.remove('d-none');
    exclamationIcon.classList.remove('fa-check');
    exclamationIcon.classList.add('fa-exclamation');
    icon.style.color = '#eb1d36';
    icon.style.borderColor = '#eb1d36';
  } else {
    website.style.borderColor = '#dc3545';
    website.style.boxShadow = '0 0 0 0.25rem #dc354540';
    siteMessage.classList.remove('d-none');
    icon.classList.remove('d-none');
    exclamationIcon.classList.remove('fa-check');
    exclamationIcon.classList.add('fa-exclamation');
    icon.style.color = '#eb1d36';
    icon.style.borderColor = '#eb1d36';
  }
}

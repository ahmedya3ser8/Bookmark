var websiteName = document.getElementById('siteName');
var websiteUrl = document.getElementById('siteUrl');
var submitBtn = document.getElementById('submit');

var websites = [];

if(localStorage.getItem('websites') != null) {
  websites = JSON.parse(localStorage.getItem('websites'));
  displayWebsite();
}

submitBtn.addEventListener('click', function() {
  if (validateInputs(websiteName, 'msgName') && validateInputs(websiteUrl, 'msgUrl') && !isDuplicate(websiteName, 'msgName', 'Website Name already exists!') && !isDuplicate(websiteUrl, 'msgUrl', 'Website Url already exists!')) {
    addWebsite();
  }
});

websiteName.addEventListener('input', function() {
  validateInputs(websiteName, 'msgName');
  isDuplicate(websiteName, 'msgName', 'Website Name already exists!');
});

websiteUrl.addEventListener('input', function() {
  validateInputs(websiteUrl, 'msgUrl');
  isDuplicate(websiteUrl, 'msgUrl', 'Website Url already exists!');
});

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
  websiteName.classList.remove('is-valid');
  websiteUrl.classList.remove('is-valid');
  websiteName.style.cssText = 'border-color: none; box-shadow: none';
  websiteUrl.style.cssText = 'border-color: none; box-shadow: none';
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

function validateInputs(element, msgId) {
  var text = element.value;
  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{3,}$/
  };
  var msg = document.getElementById(msgId);
  if (regex[element.id].test(text)) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    msg.classList.add('d-none');
    element.style.cssText = 'border-color: #198754; box-shadow: 0 0 0 0.25rem #19875440';
    return true;
  } else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    msg.classList.remove('d-none');
    element.style.cssText = 'border-color: #dc3545; box-shadow: 0 0 0 0.25rem #dc354540';
    return false;
  }
}

function isDuplicate(element, msgId, msgText) {
  var isDuplicated = websites.some((site) => site.name === element.value || site.url === element.value);
  if (element.value === '') {
    element.classList.remove('is-invalid');
    element.style.cssText = 'border-color: none; box-shadow: none';
    document.getElementById(msgId).classList.add('d-none');
  } else if (isDuplicated) {
    document.getElementById(msgId).innerHTML = msgText;
    document.getElementById(msgId).classList.remove('d-none');
    return true;
  }
  // another solution
  /*
  for (var i = 0; i < websites.length; i++) {
    if (websites[i].name === element.value || websites[i].url === element.value) {
      document.getElementById(msgId).innerHTML = msgText;
      document.getElementById(msgId).classList.remove('d-none');
      return true;
    }
  }
  if (element.value === '') {
    element.classList.remove('is-invalid');
    element.style.cssText = 'border-color: none; box-shadow: none';
    document.getElementById(msgId).classList.add('d-none');
  } 
  */
}

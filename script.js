const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // Math.floor: Largest integer less than or equal to a number
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double all users' money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest (descending)
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter to only include millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Add new user object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Calculate total wealth of all users
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Update DOM
// Setting default value of data array (ES6 syntax)
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Old style of looping, before forEach
  // for (i = 0, i < providedData.length, i++) {
  //   providedData[i]
  // }

  // forEach is from ES5
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    // Insert newly created element into DOM
    main.appendChild(element);
  });
}

// Format money value
function formatMoney(number) {
  // Regular expression matches a single digit \d followed by a three-digit sets only (?=(\d{3})+(?!\d)). The matched digit is then replaced with $1,. The $1 is a special replacement pattern which holds a value of the first parenthesized sub-match string (in our case it is the matched digit)
  return '$' + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

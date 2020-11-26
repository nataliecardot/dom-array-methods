const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubltBtn = document.getElementById('double');
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

  console.log(data);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // Math.floor: Largest integer less than or equal to a number
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new user object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
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

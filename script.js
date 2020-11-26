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
}

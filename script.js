// * Validate form inputs before submiting data
function validateForm() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let age = document.getElementById('age').value;
  let address = document.getElementById('address').value;

  if (name == '') {
    alert('Name is required!');
    return false;
  }

  if (email == '') {
    alert('Email is required');
    return false;
  } else if (!email.includes('@')) {
    alert('Invalid email address!');
    return false;
  }

  if (age == '') {
    alert('Age is required!');
    return false;
  } else if (age < 1) {
    alert('Age must not be zero or less than zero');
    return false;
  }

  if (address == '') {
    alert('Address is required');
    return false;
  }

  return true;
}

// * Function to show data from local storage
function showData() {
  let peopleList;
  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  let html = '';

  peopleList.forEach(function (element, index) {
    html += '<tr>';
    html += '<td>' + element.name + '</td>';
    html += '<td>' + element.email + '</td>';
    html += '<td>' + element.age + '</td>';
    html += '<td>' + element.address + '</td>';
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning">Edit</button></td>';
    html += '</tr>';
  });

  document.querySelector('#crudTable tbody').innerHTML = html;
}

// * Loads all data from local storage when document or page loaded
document.onload = showData();

// * Function to add data to local storage
function addData() {
  // ? if form is validate
  if (validateForm() == true) {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;

    let peopleList;

    if (localStorage.getItem('peopleList') == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    peopleList.push({
      name: name,
      email: email,
      age: age,
      address: address,
    });

    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData();

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
  }
}

// Function to delete data from local storage
function deleteData(index) {
  let peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  peopleList.splice(index, 1);
  localStorage.setItem('peopleList', JSON.stringify(peopleList));
  showData();
}

// function to update/edit data in local storage
function updateData(index) {
  // Register button will hide and Update button will show for updating of Data in local storage
  document.getElementById('registerButton').style.display = 'none';
  document.getElementById('updateButton').style.display = 'block';

  var peopleList;
  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  document.getElementById('name').value = peopleList[index].name;
  document.getElementById('email').value = peopleList[index].email;
  document.getElementById('age').value = peopleList[index].age;
  document.getElementById('address').value = peopleList[index].address;

  document.querySelector('#updateButton').onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById('name').value;
      peopleList[index].email = document.getElementById('email').value;
      peopleList[index].age = document.getElementById('age').value;
      peopleList[index].address = document.getElementById('address').value;

      localStorage.setItem('peopleList', JSON.stringify(peopleList));

      showData();

      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('age').value = '';
      document.getElementById('address').value = '';

      // Update button will hide and Register button will show for updating of data in local storage
      document.getElementById('registerButton').style.display = 'block';
      document.getElementById('updateButton').style.display = 'none';
    }
  };
}

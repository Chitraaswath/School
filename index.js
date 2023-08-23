let nameinput = document.getElementById('name');
let pass = document.getElementById('password');
let signname = document.getElementById('signname');
let signpass = document.getElementById('signpassword');
let email = document.getElementById('email');
let passtext = document.getElementById('passtext');
let stuname = document.getElementById('stuname');
let stuemail = document.getElementById('stuemail');
let taskid = document.getElementById('taskid');
let tasksubject = document.getElementById('tasksubject');
let taskactivity = document.getElementById('taskactivity');
var extradiv = document.getElementById('extra');

let credentials = [];
let monthlyactivities = [];
let extraactivities = [];

credentials.push({ name: 'admin', password: '12345678', email: 'admin@gmail.com' });
monthlyactivities.push({
    id: 1,
    activity: "create project file which contains tables between 12 to 19",
    subject: "Maths"
}, {
    id: 2,
    activity: "create project file which contains derivations",
    subject: "Physics"
});


nameinput.addEventListener('click', () => {
    if (nameinput.style.color == 'red') {
        nameinput.value = '';
        pass.value = '';
        nameinput.style.color = "black";
        nameinput.style.fontSize = "1rem";
    }
})
signname.addEventListener('click', () => {
    passtext.innerText = '';
})

function login() {
    return new Promise((resolve, reject) => {
        let username = nameinput.value;
        let passvalue = pass.value;
        let index = searchvalue(username, passvalue);
        let useremail = credentials[index].email;
        if (username.length > 0 && passvalue > 0) {
            if (searchStringInArray(username, passvalue)) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userpass', passvalue);
                sessionStorage.setItem('useremail', useremail);
                resolve();
            } else {
                reject("Invalid username or password");
            }
        }
        else {
            nameinput.style.color = "red";
            nameinput.style.fontSize = "0.8rem";
            nameinput.value = "*Please enter valid data*";
        }
    });
}

function loginbtn() {
    login()
        .then(() => {
            location.href = "welcome.html";
        })
        .catch(error => {
            nameinput.style.color = "red";
            nameinput.style.fontSize = "0.8rem";
            nameinput.value = `*Invalid username or password*`;
        })
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}
function signup() {
    if (signpass.value.length < 8) {
        passtext.innerText = "*password should be atleast 8 characters";
        signname.value = '';
        signpass.value = '';
        email.value = '';
    }
    else if (!ValidateEmail(email.value)) {
        passtext.innerText = "*please enter valid email address*";
        signname.value = '';
        signpass.value = '';
        email.value = '';
    }
    else {
        alert('signup successful!!');
        let userdata = {
            name: signname.value,
            password: signpass.value,
            email: email.value
        }
        credentials.push(userdata);
        signname.value = '';
        signpass.value = '';
        email.value = '';
        console.log('signup scuccessful', userdata);
    }
}
function searchStringInArray(name, pass) {
    for (var j = 0; j < credentials.length; j++) {
        if (credentials[j].name.match(name) && credentials[j].password.match(pass)) return true;
    }
    return false;
}
function searchvalue(name, pass) {
    for (var j = 0; j < credentials.length; j++) {
        if (credentials[j].name.match(name) && credentials[j].password.match(pass)) return j;
    }
    return null;
}
function monthlycall() {
    monthlyactivities.forEach(element => {
        monthly(element);
    })
}
function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
function monthly(element) {
    let monthlydiv = document.getElementById('monthly');
    const card = document.createElement('div');
    card.style.backgroundColor = generateRandomColor();
    card.setAttribute('class', 'activities');
    let clutter = `<div class="actbox">
      <h2 class="boxid">Task : ${element.id}</h2>
      <h3 class="subject">Subject: ${element.subject}</h3>
      <p class="activity">${element.activity}.</p>
    </div>`
    monthlydiv.appendChild(card).innerHTML = clutter;
}
function addtask() {
    let taskid = document.getElementById('taskid');
    let tasksubject = document.getElementById('tasksubject');
    let taskactivity = document.getElementById('taskactivity');
    let monthlydiv = document.getElementById('monthly');
    let obj = {
        id: taskid.value,
        activity: taskactivity.value,
        subject: tasksubject.value
    }
    monthlyactivities.push(obj);
    while (monthlydiv.hasChildNodes()) {
        monthlydiv.firstChild.remove();
    }
    monthlycall();
    console.log("Task added");
}
// extra activity page
function extra(element) {
    let extradiv = document.getElementById('extra');
    const card = document.createElement('div');
    card.style.backgroundColor = generateRandomColor();
    card.setAttribute('class', 'activities');
    let clutter = `<div class="actbox">
      <h2 class="boxid">Task : ${element.id}</h2>
      <h3 class="subject">Subject: ${element.subject}</h3>
      <p>Date: ${element.date} </p>
      <p class="activity">${element.activity}.</p>
    </div>`
    extradiv.appendChild(card).innerHTML = clutter;
}

function extraactivity() {
    let extaskid = document.getElementById('extaskid');
    let extasksubject = document.getElementById('extasksubject');
    let extaskactivity = document.getElementById('extaskactivity');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    let obj = {
        id: extaskid.value,
        date: formattedDate,
        activity: extaskactivity.value,
        subject: extasksubject.value
    }
    const storedExtraActivities = localStorage.getItem('extraactivities');
    const extraactivities = storedExtraActivities ? JSON.parse(storedExtraActivities) : [];
    extraactivities.push(obj);
    sessionStorage.setItem('extraactivities', JSON.stringify(extraactivities));
    console.log("Task added");
}

async function fetchdata() {
    const response = await fetch("data.json");
    var data = await response.json();
    return data;
}

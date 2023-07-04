let form = document.querySelector("form");
let selectedId = null;
form.addEventListener("submit", OnButtonClick);
const students = [];
let studentID = 1;
let selectedRow = null;

function addIttoTable() {
  let obj = {
    id: studentID++,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    gpa: document.getElementById("gpa").value,
    age: document.getElementById("age").value,
    degree: document.getElementById("degree").value,
  };

  if (obj.id && obj.name && obj.email && obj.gpa && obj.age && obj.degree) {
    students.push(obj);
    let newRow = `
        <tr>
          <td>${obj.id}</td>
          <td>${obj.name}</td>
          <td>${obj.email}</td>
          <td>${obj.age}</td>
          <td>${obj.gpa}</td>
          <td><div id="cell">
          <p>${obj.degree}</p> 
          <div id="ED">
          <button id="edit" onClick="onEdit(this)"><div><img src="./assets/images/edit 1.png"> </div>
      </button> 
      <button id="delete" onClick="onDelete(this)">
          <div> <img src="./assets/images/trash-2 1.png"> </div>
      </button>
  </div>
</div></td>
        </tr>
        `;

    document.querySelector("tbody").insertAdjacentHTML("beforeend", newRow);
  }
}

function onEdit(td) {
  document.querySelector("#submit").classList.add("edit");
  selectedRow = td.parentElement.parentElement.parentElement.parentElement;
  selectedId = parseInt(selectedRow.cells[0].innerText);
  document.getElementById("name").value = selectedRow.cells[1].innerText;
  document.getElementById("email").value = selectedRow.cells[2].innerText;
  document.getElementById("gpa").value = selectedRow.cells[4].innerText;
  document.getElementById("age").value = selectedRow.cells[3].innerText;
  document.getElementById("degree").value = selectedRow.cells[5].innerText;
  document.querySelector("#submit").innerText = "Edit Student";
}

function updateRecord() {
  let index = selectedId - 1;
  students[index].name = document.getElementById("name").value;
  students[index].email = document.getElementById("email").value;
  students[index].gpa = document.getElementById("gpa").value;
  students[index].age = document.getElementById("age").value;
  students[index].degree = document.getElementById("degree").value;
  selectedRow.cells[1].innerHTML = `<td>${students[index].name}</td>`;
  selectedRow.cells[2].innerHTML = `<td>${students[index].email}</td>`;
  selectedRow.cells[4].innerHTML = `<td>${students[index].gpa}</td>`;
  selectedRow.cells[3].innerHTML = `<td>${students[index].age}</td>`;
  selectedRow.cells[5].innerHTML = `<td><div id="cell">
    <p>${students[index].degree}</p> 
    <div id="ED">
    <button id="edit" onClick="onEdit(this)"><div><img src="./assets/images/edit 1.png"> </div>
</button> 
<button id="delete" onClick="onDelete(this)">
    <div> <img src="./assets/images/trash-2 1.png"> </div>
</button>
</div>
</div></td>`;
  document.querySelector("#submit").innerText = "Add Student";
  document.querySelector("#submit").classList.remove("edit");
}

function onDelete(td) {
  let row = td.parentElement.parentElement.parentElement.parentElement;
  document.querySelector("table").deleteRow(row.rowIndex);
  students.splice(row.rowIndex + 1, 1);
  resetForm();
}

function OnButtonClick(event) {
  event.preventDefault();
  if (document.querySelector("#submit").innerText === "Add Student") {
    addIttoTable();
  } else {
    updateRecord();
  }
  resetForm();
}

function displaySearch() {
  const searchTerm = document
    .querySelector("#Search")
    .value.trim()
    .toLowerCase();
  const filteredData = students.filter((student) => {
    const studentName = student.name.toLowerCase();
    const studentEmail = student.email.toLowerCase();
    const studentDegree = student.degree.toLowerCase();
    return (
      studentName.includes(searchTerm) ||
      studentEmail.includes(searchTerm) ||
      studentDegree.includes(searchTerm)
    );
  });
  document.querySelector("tbody").innerHTML = "";
  for (let i = 0; i < filteredData.length; i++) {
    let cells = `
    <tr>
    <td>${filteredData[i].id}</td>
    <td>${filteredData[i].name}</td>
    <td>${filteredData[i].email}</td>
    <td>${filteredData[i].age}</td>
    <td>${filteredData[i].gpa}</td>
    <td><div id="cell">
    <p>${filteredData[i].degree}</p> 
    <div id="ED">
    <button id="edit" onClick="onEdit(this)"><div><img src="./assets/images/edit 1.png"> </div>
</button> 
<button id="delete" onClick="onDelete(this)">
    <div> <img src="./assets/images/trash-2 1.png"> </div>
</button>
</div>
</div></td>
  </tr>
`;
    let Container = document.createElement("tr");
    Container.innerHTML = cells;
    document.querySelector("tbody").append(Container);
  }
}

document.querySelector("#Search").addEventListener("keyup", displaySearch);

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gpa").value = "";
  document.getElementById("age").value = "";
  document.getElementById("degree").value = "";
  selectedRow = null;
}

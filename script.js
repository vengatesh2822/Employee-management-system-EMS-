if(localStorage.getItem("isLoggedIn") !== "true"){

    const currentPage =
    window.location.pathname.split("/").pop();

    if(currentPage !== "login.html"){
        window.location.href = "login.html";
    }

}



document.addEventListener("DOMContentLoaded",()=>{
// Sidebar Menu Items
const menuItems = document.querySelectorAll(".menu-item");

// Sections
const dashboardSection = document.getElementById("dashboard-section");
const employeesSection = document.getElementById("employees-section");
const addEmployeeSection = document.getElementById("add-employee-section");
const departmentSection = document.getElementById("department-section");
const reportSection = document.getElementById("report-section");
const profileSection = document.getElementById("profile-section");

// Sidebar Navigation
menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.getAttribute("data-page");

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        item.classList.add("active");

        // Hide all sections
        dashboardSection.classList.add("hidden");
        employeesSection.classList.add("hidden");
        addEmployeeSection.classList.add("hidden");
        departmentSection.classList.add("hidden");
        reportSection.classList.add("hidden");
        profileSection.classList.add("hidden");


        // Show selected section
        if(page === "dashboard"){
            dashboardSection.classList.remove("hidden");
        }

        if(page === "employees"){
            employeesSection.classList.remove("hidden");
        }

        if(page === "add-employee"){
            addEmployeeSection.classList.remove("hidden");
        }
        if(page === "department"){
            departmentSection.classList.remove("hidden");
        }
        if(page === "report"){
            reportSection.classList.remove("hidden");
        }
        if(page==="profile"){
            profileSection.classList.remove("hidden");
        }

    });

});


// ====================================
// Dashboard Buttons & Quick Actions
// ====================================

// Sidebar References
const menuDashboard = document.getElementById("menuDashboard");
const menuEmployees = document.getElementById("menuEmployees");
const menuAddEmployee = document.getElementById("menuAddEmployee");

// Dashboard Top Add Employee Button
const dashboardAddBtn = document.getElementById("dashboardAddBtn");

if(dashboardAddBtn){
    dashboardAddBtn.addEventListener("click", () => {
        menuAddEmployee.click();
    });
}

// Quick Action - Add Employee
const quickAddEmployee = document.getElementById("quickAddEmployee");

if(quickAddEmployee){
    quickAddEmployee.addEventListener("click", () => {
        menuAddEmployee.click();
    });
}

// Quick Action - View Employees
const viewEmployees = document.getElementById("viewEmployees");

if(viewEmployees){
    viewEmployees.addEventListener("click", () => {
        menuEmployees.click();
    });
}

const addDepartment =
document.getElementById("addDepartment");


if(addDepartment){

addDepartment.addEventListener("click",()=>{

    dashboardSection.classList.add("hidden");

    addEmployeeSection.classList.add("hidden");

    employeesSection.classList.add("hidden");

    departmentSection.classList.remove("hidden");

});

}

// ===============================
// Save / Update Employee Details
// ===============================

const employeeForm = document.querySelector(".employee-form");


employeeForm.addEventListener("submit", function(e){

    e.preventDefault();


    let employees = JSON.parse(localStorage.getItem("employees")) || [];


    let employee = {

        id: getNextEmployeeId(),

        name: document.getElementById("empName").value,

        email: document.getElementById("empEmail").value,

        department: document.getElementById("empDepartment").value,

        position: document.getElementById("empPosition").value,

        status: "Active"

    };


    let editId = employeeForm.getAttribute("data-edit-id");


    if(editId){


        employees = employees.map(emp=>{


            if(emp.id == editId){


                return {

                    id: emp.id,
                    name: employee.name,
                    email: employee.email,
                    department: employee.department,
                    position: employee.position,
                    status: emp.status

                };

            }


            return emp;


        });


        alert("Employee Updated Successfully ✅");


        employeeForm.removeAttribute("data-edit-id");


    }

    else{


        employees.push(employee);


        alert("Employee Saved Successfully ✅");


    }



    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    employeeForm.reset();


    loadEmployees();
    updateDashboardCards();
    updateReportSummary();
    loadDepartmentChart();

});



function getNextEmployeeId(){


    let employees = JSON.parse(localStorage.getItem("employees")) || [];


    if(employees.length === 0){

        return 101;

    }


    let lastId = employees[employees.length - 1].id;


    return lastId + 1;

}



// ===============================
// Load Employees Data
// ===============================

function loadEmployees(){


    let employees = JSON.parse(localStorage.getItem("employees")) || [];



    // Employees Page Table

    const employeeTable = document.querySelector(
        "#employees-section tbody"
    );


    employeeTable.innerHTML = "";



    employees.forEach(emp=>{


        employeeTable.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.position}</td>

            <td>
                <span class="status active">
                    ${emp.status}
                </span>
            </td>

            <td>

                <button class="edit-btn" onclick="editEmployee(${emp.id})">
                    Edit
                </button>

                <button class="status-btn" onclick="toggleStatus(${emp.id})">
                    Toggle
                </button>

                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
                    Delete
                </button>

</td>

        </tr>

            `;


    });



    // Dashboard Recent Employees

    const dashboardTable =
    document.querySelector(
        "#dashboard-section tbody"
    );


    dashboardTable.innerHTML="";



    employees.slice(-4).reverse().forEach(emp=>{


        dashboardTable.innerHTML +=`

        <tr>

        <td>${emp.id}</td>

        <td>${emp.name}</td>

        <td>${emp.department}</td>

        <td>${emp.position}</td>

        <td>
        <span class="status active">
        ${emp.status}
        </span>
        </td>

        </tr>

        `;


    });


}



loadEmployees();
updateDashboardCards();
loadDepartmentChart();

// delete function


function deleteEmployee(id){

    if(!confirm("Are you sure you want to delete this employee?")){
        return;
    }

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

    employees =
    employees.filter(emp => emp.id !== id);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    alert("Employee Deleted ✅");

    loadEmployees();
    updateDashboardCards();
    updateReportSummary();
}
window.deleteEmployee = deleteEmployee;


function toggleStatus(id){

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

    employees = employees.map(emp => {

        if(emp.id === id){

            emp.status =
            emp.status === "Active"
            ? "Inactive"
            : "Active";

        }

        return emp;

    });

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    loadEmployees();
    updateDashboardCards();
    updateReportSummary();
    loadDepartmentChart();
}
window.toggleStatus = toggleStatus;


// edit function
function editEmployee(id){

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


    let emp = employees.find(
        employee => employee.id === id
    );


    document.getElementById("empName").value = emp.name;
    document.getElementById("empEmail").value = emp.email;
    document.getElementById("empDepartment").value = emp.department;
    document.getElementById("empPosition").value = emp.position;


    menuAddEmployee.click();


    employeeForm.setAttribute(
        "data-edit-id",
        id
    );

    
}
window.editEmployee = editEmployee;

// ===============================
// Update Dashboard Cards
// ===============================

function updateDashboardCards(){

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


    // Total
    document.getElementById("totalEmployees").innerText =
    employees.length;



    // Active
    let active =
    employees.filter(emp => emp.status === "Active").length;


    document.getElementById("activeEmployees").innerText =
    active;



    // New This Month
    let newEmployees =
    employees.slice(-3).length;


    document.getElementById("newEmployees").innerText =
    newEmployees;



    // Departments
    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];


    document.getElementById("totalDepartments").innerText =
    departments.length;

}
//chart
function loadDepartmentChart(){

    const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

    const departmentCount = {};

    employees.forEach(emp => {

        if(departmentCount[emp.department]){

            departmentCount[emp.department]++;

        }else{

            departmentCount[emp.department] = 1;

        }

    });

    const labels = Object.keys(departmentCount).map(label => {

    if(label === "Human Resource(HR)") return "HR";

    if(label === "Customer Support") return "Support";

    return label;

});
    const data = Object.values(departmentCount);

    const canvas =
    document.getElementById("departmentChart");

    if(!canvas) return;

    if(window.departmentChartInstance){
        window.departmentChartInstance.destroy();
    }

    window.departmentChartInstance =
    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                label: "Employees",

                data: data

            }]

        },

            options: {

    responsive: true,

    maintainAspectRatio: false,

    layout: {
        padding: 20
    },

    plugins: {

        legend: {

            position: "bottom",

            labels: {

                boxWidth: 15,
                padding: 20,
                font: {
                    size: 14
                }

            }

        }

    }

}

    });

}
// ===============================
// Employee Search
// ===============================

const searchInput = document.getElementById("searchEmployee");


if(searchInput){

searchInput.addEventListener("input", function(){


let searchValue = this.value.toLowerCase();


let employees =
JSON.parse(localStorage.getItem("employees")) || [];


let filteredEmployees = employees.filter(emp =>


emp.name.toLowerCase().includes(searchValue) ||

emp.email.toLowerCase().includes(searchValue) ||

emp.department.toLowerCase().includes(searchValue) ||

emp.id.toString().includes(searchValue)


);



const employeeTable =
document.querySelector("#employees-section tbody");



employeeTable.innerHTML = "";



// NO DATA FOUND

if(filteredEmployees.length === 0){

employeeTable.innerHTML = `

<tr>

<td colspan="7" class="no-data">

No Employee Found ❌

</td>

</tr>

`;

return;

}



// SHOW DATA

filteredEmployees.forEach(emp=>{


employeeTable.innerHTML += `

<tr>

<td>${emp.id}</td>

<td>${emp.name}</td>

<td>${emp.email}</td>

<td>${emp.department}</td>

<td>${emp.position}</td>

<td>
<span class="status active">
${emp.status}
</span>
</td>


<td>

<button class="edit-btn" onclick="editEmployee(${emp.id})">
Edit
</button>


<button class="status-btn" onclick="toggleStatus(${emp.id})">
Toggle
</button>


<button class="delete-btn" onclick="deleteEmployee(${emp.id})">
Delete
</button>


</td>

</tr>

`;

});


});

}

// ===============================
// Save Department
// ===============================

const departmentForm = document.querySelector(".department-form");


if(departmentForm){

departmentForm.addEventListener("submit", function(e){

    e.preventDefault();


    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];


    let deptName =
    document.getElementById("deptName").value;


    if(deptName === ""){
        alert("Enter Department Name");
        return;
    }


    let department = {

        id: departments.length + 1,

        name: deptName

    };


    departments.push(department);


    localStorage.setItem(
        "departments",
        JSON.stringify(departments)
    );


    alert("Department Saved Successfully ✅");


    departmentForm.reset();


    loadDepartments();
    loadDepartmentDropdown();
    updateReportSummary();

});

}


// ===============================
// Load Departments
// ===============================

function loadDepartments(){


    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];


    const table =
    document.getElementById("departmentTable");


    if(!table) return;


    table.innerHTML = "";


    departments.forEach(dept=>{


        table.innerHTML += `

        <tr>

            <td>${dept.id}</td>

            <td>${dept.name}</td>
            <td>
                <button 
                class="delete-btn"
                onclick="deleteDepartment(${dept.id})">
                Delete
                </button>
            </td>

        </tr>

        `;


    });


}


loadDepartments();

function deleteDepartment(id){

    if(!confirm("Are you sure you want to delete this department?")){
        return;
    }

    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];

    departments =
    departments.filter(dept => dept.id !== id);

    localStorage.setItem(
        "departments",
        JSON.stringify(departments)
    );

    alert("Department Deleted ✅");

    loadDepartments();
    loadDepartmentDropdown();
    updateDashboardCards();
    updateReportSummary();
}
window.deleteDepartment = deleteDepartment;

// ===============================
// Load Department Dropdown
// ===============================

function loadDepartmentDropdown(){


    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];


    const select =
    document.getElementById("empDepartment");


    if(!select) return;


    select.innerHTML = `

    <option value="">
    Select Department
    </option>

    `;


    departments.forEach(dept=>{


        select.innerHTML += `

        <option value="${dept.name}">
        ${dept.name}
        </option>

        `;


    });

}


// page load
loadDepartmentDropdown();

// ===============================
// Department Positions
// ===============================
const departmentPositions = {

    "IT": [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "QA Engineer"
    ],

    "Human Resource(HR)": [
        "HR Executive",
        "HR Manager",
        "Recruiter"
    ],

    "Finance": [
        "Accountant",
        "Finance Manager",
        "Auditor"
    ],

    "Marketing": [
        "Marketing Executive",
        "SEO Specialist",
        "Content Writer"
    ],

    "Sales": [
        "Sales Executive",
        "Sales Manager",
        "Business Development Executive"
    ],

    "Operations": [
        "Operations Executive",
        "Operations Manager",
        "Process Coordinator"
    ],

    "Customer Support": [
        "Support Executive",
        "Customer Service Representative",
        "Support Manager"
    ],

    "Administration": [
        "Administrator",
        "Office Manager",
        "Administrative Assistant"
    ]

};
const departmentSelect =
document.getElementById("empDepartment");

const positionSelect =
document.getElementById("empPosition");

departmentSelect.addEventListener("change", function(){

    let selectedDepartment = this.value;

    console.log(selectedDepartment);
    console.log(departmentPositions[selectedDepartment]);

    positionSelect.innerHTML =
    `<option value="">Select Position</option>`;


    if(departmentPositions[selectedDepartment]){

        departmentPositions[selectedDepartment]
        .forEach(position => {

            positionSelect.innerHTML += `
            <option value="${position}">
                ${position}
            </option>
            `;

        });

    }

});

// ===============================
// Generate Report
// ===============================

const generateReport = document.getElementById("generateReport");

if(generateReport){

    generateReport.addEventListener("click", function(){

        let employees = JSON.parse(localStorage.getItem("employees")) || [];


        if(employees.length === 0){
            alert("No Employee Data Available");
            return;
        }


        let rows = "";

        employees.forEach(emp=>{

            rows += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.status}</td>
            </tr>`;

        });


        let excel = `
        <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
        </tr>

        ${rows}

        </table>`;


        let blob = new Blob(
            [excel],
            {type:"application/vnd.ms-excel"}
        );


        let link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "Employee_Report.xls";

        link.click();

    });

}

// ===============================
// Profile Load
// ===============================

let data = localStorage.getItem("adminProfile");

if(data){

    let profile = JSON.parse(data);

    document.getElementById("profileName").value = profile.name;
    document.getElementById("profileEmail").value = profile.email;
    document.getElementById("profilePassword").value =
    profile.password || "admin123";

    document.getElementById("profilePopupName").innerText =
    profile.name;

    document.getElementById("profilePopupEmail").innerText =
    "Email: " + profile.email;

    document.getElementById("navProfileName").innerText =
    profile.name;

    document.getElementById("navProfileEmail").innerText =
    profile.email;
}

});

 
function updateReportSummary(){

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


    let departments =
    JSON.parse(localStorage.getItem("departments")) || [];


    document.getElementById("reportTotalEmployees").innerText =
    employees.length;


    document.getElementById("reportActiveEmployees").innerText =
    employees.filter(emp=>emp.status==="Active").length;


    document.getElementById("reportInactiveEmployees").innerText =
    employees.filter(emp=>emp.status==="Inactive").length;


    document.getElementById("reportDepartments").innerText =
    departments.length;

}


updateReportSummary();

function toggleProfile(){

let menu=document.getElementById("profileMenu");

if(menu.style.display==="block"){
    menu.style.display="none";
}
else{
    menu.style.display="block";
}

}

function openProfile(){

    // hide all sections
    document.querySelectorAll("section").forEach(sec=>{
        sec.classList.add("hidden");
    });


    // show profile
    document.getElementById("profile-section")
    .classList.remove("hidden");


    // sidebar active change

    const menuItems = document.querySelectorAll(".menu-item");


    menuItems.forEach(item=>{
        item.classList.remove("active");
    });


    document.querySelector('[data-page="profile"]')
    .classList.add("active");

}

function saveProfile(){

    let name = document.getElementById("profileName").value;
    let email = document.getElementById("profileEmail").value;
    let password = document.getElementById("profilePassword").value;


    let profileData = {
        name:name,
        email:email,
        password:password
    };


    localStorage.setItem(
        "adminProfile",
        JSON.stringify(profileData)
    );


if(document.getElementById("navProfileName")){
    document.getElementById("navProfileName").innerText = name;
}

if(document.getElementById("navProfileEmail")){
    document.getElementById("navProfileEmail").innerText = email;
}

if(document.getElementById("profilePopupName")){
    document.getElementById("profilePopupName").innerText = name;
}

if(document.getElementById("profilePopupEmail")){
    document.getElementById("profilePopupEmail").innerText =
    "Email: " + email;
}


    let welcome = document.getElementById("welcomeText");

    if(welcome){
        welcome.innerText =
        "Welcome back, " + name + " 👋";
    }


    alert("Profile Updated Successfully");

}
// photo upload
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

if(imageUpload){

    imageUpload.addEventListener("change", function(){

        const file = this.files[0];

        if(file){

            const reader = new FileReader();

            reader.onload = function(e){

                profileImage.src = e.target.result;

                document.getElementById("navProfileImage").src =e.target.result;

                localStorage.setItem(
                    "profilePic",
                    e.target.result
                );

            };

            reader.readAsDataURL(file);
        }

    });

    const savedPic = localStorage.getItem("profilePic");

    if(savedPic){
        profileImage.src = savedPic;

          document.getElementById("navProfileImage").src =savedPic;
    }
}


function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("isLoggedIn");

        window.location.href = "login.html";
    }

}

document.addEventListener("DOMContentLoaded",()=>{

    let savedProfile = JSON.parse(localStorage.getItem("adminProfile"));

    if(savedProfile){

        let welcome = document.getElementById("welcomeText");

        if(welcome){
            welcome.innerText =
            "Welcome back, " + savedProfile.name + " 👋";
        }

    }

}); 
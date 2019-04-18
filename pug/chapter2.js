<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">

  <title>Filipichev +38 068 354 60 90</title>
  <meta name="viewport" content="width=device-width,
 initial-scale=1.0">    
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">

  <link rel="stylesheet" href="styles/style.css">

</head>

<body>

<div class="form__main">
	<h2 class="form__header">
		Project Manager
	</h2>
  
  <form action="get" class="form__main--container">
  <fieldset>

		<div class="form__field--name">
			<label for="name" class="form__label--name">Task Name</label>
      <input id="name" name="name" type="text" placeholder="Name of project" required/>
    </div>
    
    <div class="form__field--date">
    	<label for="name" class="form__label--date">Date</label>
      <input id="date" name="date" type="date" />
    </div>

    <div class="form__field--desc">
    	<h4 class="form__label--desc">Task Description</h4>
    	<textarea id="story" name="story"
          rows="5" placeholder="It was a dark and stormy night..."></textarea>
    </div>

    <div class="form__action">
    	<a href="#" class="form__button form__button--green">Add to the list</a>
    </div>

  </fieldset>
  </form>

</div>




<div class="table__container--main" id="table__main">
	<div class="table__header--main">
		<h2>All tasks</h2>
	</div>

	<div class="table__content--main">
   <div class="table__column--name-h u-center">Task Name</div>
   <div class="table__column--date-h u-center">Starting Date</div>
   <div class="table__column--desc-h u-center">Task Description</div>
   <div class="table__column--edited-h u-center">Was Edited</div>
   <div class="table__column--status-h u-center">Status</div>
	</div>

	<div class="table__content--main" id="table__rows--container">
		<div class="table__column--name-c u-center">Drawing</div>
		<div class="table__column--date-c u-center">15.02.2005</div>
		<div class="table__column--desc-c u-center">We are going to mix some colors.</div>
		<div class="table__column--edited-c u-center">Yes</div>
		<div class="table__column--status-c">
			<div class="status__choose--container"><span class="status__choose--badge">Pending  ▼</span></div>
<!-- 			<ul class="list__task--dropdown closed">
       <li class="status__pending"><a href="#1" class="table__status--button">Pending<span class="triangle">▼</span></a></li>
       <li class="status__ongoing">Ongoing</li>
       <li class="status__complete">Complete</li>
       </ul> -->
		</div>
	</div>

</div>

  <script src="js/main.js"></script>
</body>
</html>

 :root {
--black-color: #282828;
}

@font-face {
  font-family: Lato;
  src: url("/fonts/Lato-Regular.ttf") format("ttf");
  font-weight: normal;
}
@font-face {
  font-family: Lato;
  src: url("/fonts/Lato-Bold.ttf") format("ttf");
  font-weight: bold;
}

html { font-size: 62.5%; }
body {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.7;
  color: #282828;
  padding: 3rem;
  background-color: #D3D3D3;
}
h1   { font-size: 2.4rem; }

*, *:before, *:after {
  box-sizing: border-box;
    padding: 0;
    margin: 0;
}

textarea,
input,
fieldset {
  color: inherit; /* 1 */
  font: 1.6rem; /* 2 */
  margin: 0;
  border: none;
}

textarea:focus,
input:focus,
fieldset:focus {
  border: none;
  outline-offset: 0;
  outline: none;
}

:focus {
    outline: -webkit-focus-ring-color auto 5px;
}

textarea {
  resize: none;
}

input[type="checkbox"] ~ label, input[type="radio"] ~ label {
  width: auto;
  text-align: left;
  padding-left: 0.4em;
}

/* label state styles */
input:focus ~ label, textarea:focus ~ label, select:focus ~ label {
  color: #933;
}

/* FORM  /////////////////////////////////////////////////////////////// */
.form__main {
  display: grid;
  grid-template-columns: minmax(150px, 1fr);
  border-radius: 3px;
  border: 1px solid var(--black-color);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  margin: 2rem;
  background-color: #E8E8E8;
}

.form__header {
  grid-column: 1/2;
  align-self: center;
  justify-self: stretch;
  text-align: center;
  padding: 1rem;
  color: var(--black-color);
  border-bottom: 1px solid var(--black-color);
}

.form__main--container {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: minmax(150px, 1fr), minmax(150px, 2fr);
}

.form__input {
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  transition: all 0.3s; }
/*  @media only screen and (max-width: 56.25em) {
    .form__input {
      width: 100%; } }*/
  #name:focus, #date:focus {
    outline: none;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid #55c57a; }
  #name:focus:invalid, #date:focus:invalid {
    border-bottom: 3px solid #ff7730; }
  #name:focus:invalid::-webkit-input-placeholder,
  #date:focus:invalid::-webkit-input-placeholder {
    color: #999; }

.form__label {
  font-weight: 700;
  transition: all 0.3s; }

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4rem); }



.form__field--name {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-flow: column;
  border-bottom: 1px solid var(--black-color);
  background-color: #F8F8F8;
}
.form__field--date {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-flow: column;
  border-bottom: 1px solid var(--black-color);
  background-color: #F8F8F8;
}


.form__label--name {
  align-self: center;
  padding: 1rem;
  border-right: 1px solid var(--black-color);
  background-color: #E8E8E8;
  font-weight: bold;
}
.form__label--date {
  align-self: center;
  padding: 1rem;
  border-right: 1px solid var(--black-color);
  background-color: #E8E8E8;
  font-weight: bold;
}

.form__label--desc {
  font-weight: normal;
  align-self: center;
  padding: 1rem;
  background-color: #E8E8E8;
  font-weight: bold;
}

#name, #date, #story {
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  padding: 1rem;
  background-color: #FFFFFF;
}



.form__field--desc {
  display: grid;
  grid-column: 1/2;
  background-color: #F8F8F8;
}

.form__action {
  padding: 2rem;
  padding-left: 3rem;
  border-top: 1px solid var(--black-color);
  justify-self: stretch;
  align-self: center;
  background-color: #E8E8E8;
}


/* BUTTON */
.form__button, .form__button:link, .form__button:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.5rem 4rem;
  display: inline-block;
  border-radius: 10rem;
  transition: all 0.2s;
  position: relative;
  font-size: 1.6rem;
  border: none;
  cursor: pointer; }

.form__button:hover {
  transform: translateY(-0.3rem);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2); }
  .form__button:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0; }

.form__button:active, .form__button:focus {
  outline: none;
  transform: translateY(0.2rem);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2); }


.form__button::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s; }

.form__button--green {
  background-color: #55c57a;
  color: #fff; }
  .form__button--green::after {
    background-color: #55c57a; }

.btn--animated {
  animation: moveInTop 0.5s ease-out 0.75s;
  animation-fill-mode: backwards; }

.btn-text:link, .btn-text:visited {
  font-size: 1.6rem;
  color: #55c57a;
  display: inline-block;
  text-decoration: none;
  border-bottom: 1px solid #55c57a;
  padding: 3px;
  transition: all 0.2s; }

.btn-text:hover {
  background-color: #55c57a;
  color: #fff;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  transform: translateY(-2px); }

.btn-text:active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  transform: translateY(0); }

/* DECISION WITH GRID: */
.list__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: 1fr 3fr 12fr;
  justify-items: stretch;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
  border: 2px solid black;
  margin-top: 2rem;
}


.list__header--main {
  display: block;
  grid-row: 1/2;
  grid-column: 1/6;
  justify-self: center;
  align-self: center;
}
.list__headers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: 1fr;
  grid-column: 1/6;
  grid-row: 2/3;
  justify-items: stretch;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.list__headers > * {
  border: 1px solid black;
}

.list__header--name {
  grid-column: 1/2;
  grid-row: 1/2;
  border-left: 1px solid transparent;
}
.list__header--date {
  grid-column: 2/3;
  grid-row: 1/2;
}
.list__header--desc {
  grid-column: 3/4;
  grid-row: 1/2;
}
.list__header--wasedited {
  grid-column: 4/5;
  grid-row: 1/2;
}
.list__header--status {
  grid-column: 5/6;
  grid-row: 1/2;
  border-right: 1px solid transparent;
}

.list__task-container {
  grid-column: 1/6;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-flow: column;
}

.list__task-container > * {
  border: 1px solid black;
}



.list__task-names {
  grid-column: 1/2;
  border-left: 1px solid transparent;
}
.list__task-dates {
  grid-column: 2/3;
}
.list__task-content {
  grid-column: 3/4;
}
.list__task-wassedited {
  grid-column: 4/5;
}
.list__task-status {
  grid-column: 5/6;
  border-right: 1px solid transparent;
}


/* DROPDOWN LIST */
.list__task--dropdown {
  display: grid;
  grid-template-rows: 66px 66px 68px;
  grid-template-columns: 1fr;
  border-radius: 5px;
  border: 1px solid #2566ce;

  list-style: none; 
  overflow: hidden;
  height: 200px;
  background-color: #f44336;
  color: white;

  align-content: start;

  margin: 0 auto;
  text-align: center;
  -webkit-transition: height 0.3s ease;
          transition: height 0.3s ease;
  z-index: 2;
  width: 100%;
}

.list__task--dropdown.closed {
   height: 66px;
}

.status__choose--container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: column;
  color: white;
  align-items: center;
  justify-content: center;
  z-index: 2;
  align-self: stretch;
  background-color: #f44336;
  text-align: center;
   border-bottom: 1px solid var(--black-color);
    border-left: 1px solid var(--black-color);
    border-right: 1px solid var(--black-color);
}

/*.status__choose--badge {
  background-color: #f44336;
  grid-column: 1/2;
  justify-self: stretch;
  align-self: stretch;
  z-index: 1;
}*/

.status__pending {
  grid-row: 1/2;
  border-bottom: 1px solid #2566ce;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  background-color: #f44336;
  white-space: pre-wrap;
}

/*.status__pending a:after {
  content: "\25BC";
  float: right;
  margin-left: -20px;
  margin-right: 15px;
}*/


.status__ongoing {
  grid-row: 2/3;
  border-bottom: 1px solid #2566ce;
  display: grid;
  align-items: center;
  background-color: #fbc02d;
   
}
.status__complete {
  grid-row: 3/4;
  display: grid;
  align-items: center;
  background-color: #55c57a;
   
}

.list__task--dropdown a {
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: inherit;
}

/* SECOND GRID */
.table__container--main {
  border: 1px solid var(--black-color);
  border-radius: 4px;
  margin: 1rem;
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
}

.table__header--main {
  grid-column: 1/2;
  justify-self: stretch;
  text-align: center;
  border: 1px solid var(--black-color);
  padding: 2rem 0;
  display: block;
  width: 100%;
}

.table__content--main {
  grid-column: 1/2;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: stretch;
}

.table__column--name {
  display: grid;
  grid-template-columns: minmax(150px, 1fr);
}

.table__header--main,
.table__column--name-h,
.table__column--date-h,
.table__column--desc-h,
.table__column--edited-h,
.table__column--status-h {
  font-weight: bold;
  background-color: #E8E8E8;
}

.table__column--status-c {
  padding-top: 0;
  align-items: stretch;
  justify-content: stretch;
  display: grid;
}

.table__status--button {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;

}

.table__status--button span {
   padding-left: 30px;
   margin-right: -38px;
}

.table__column--name-c,
.table__column--date-c,
.table__column--desc-c,
.table__column--edited-c,
.table__column--status-c {
  background-color: #FFFFFF;
  }
 
/*.table__status--button:after {
  content: "\25BC";
  float: right;
  margin-left: -20px;
  margin-right: 15px;
}*/


/* UTILITIES */
.u-center {
  padding: 2rem;
  align-items: center;
  border: 1px solid var(--black-color);
}

.u-invisible {
  display: none;
}
.u-red {
  background-color: #f44336;
}
.u-yellow {
  background-color: #fbc02d;
}
.u-green {
  background-color: #55c57a;
}

	  
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded");

    var taskList = new Array();
     
    var sortOrder = 'desc';

    var tableMainContainer = document.getElementById('table__main');

    var currentTask = {
      taskId: null,
      taskName: "",
      date: "",
      desc: "",
      wasEdited: false,
      status: "pending"
      };

  //   (function() {
  // document.querySelector('#list__status--button').addEventListener('click', function() {
  //   this.parentNode.parentNode.classList.toggle('closed')
  // }, false);
  // })();

  // (function() {
  // document.querySelector('.table__status--button').addEventListener('click', function() {
  //  const statusButton = this;
  //   statusButton.parentNode.parentNode.classList.toggle('closed')

  //   var triangle = document.querySelector('.triangle');
  //   if(triangle.textContent == "▼") {
  //    triangle.textContent = "▲";
  //    console.log('Set to up');
  //   } else {
  //    triangle.textContent = "▼";
  //   }


  // }, false);
  // })();
  (function() {
    document.querySelector('#table__main').addEventListener('click', function(event) {
        
     if(event.target.classList.contains("status__choose--container")) {
      const acceptor = event.target;
      acceptor.classList.add("u-invisible");

      generateStatusDropdown(acceptor);

      var currentDropdown = document.querySelector('.list__task--dropdown');

      currentDropdown.addEventListener('click', function(event) {
        var myTarget = event.target;

        if(myTarget.classList.contains("status__pending")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #f44336;");
          acceptor.textContent = "Pending ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);


        } else if(myTarget.classList.contains("status__ongoing")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #fbc02d");
          acceptor.textContent = "Ongoing ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);
        } else if(myTarget.classList.contains("status__complete")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #55c57a");
          acceptor.textContent = "Complete ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);
        } else {
          return;
        }
      }, false);

     } else {
      return;
     }
    }, false);
  })();
  
  (function() {
    document.querySelector('.form__button').addEventListener('click', function(event) {
     event.preventDefault();

     // var localStore = [];

     var localTask = {
      taskId: null,
      taskName: "",
      date: "",
      desc: "",
      wasEdited: false,
      status: "pending"
      };

     inputNameValue = document.getElementById("name").value;
     inputDateValue = document.getElementById("date").value;
     inputDescValue = document.getElementById("story").value;

     localTask.taskName = inputNameValue;
     localTask.date = inputDateValue;
     localTask.desc = inputDescValue;
     localTask.wasEdited = false;
     localTask.status = "pending";
     localTask.taskId = taskList.length + 1;

     localTaskCopy = Object.assign({}, localTask);

     taskList.push(localTaskCopy);

     // localStore.push(localTask);

     renderTable(taskList);  

     if(taskList.length >= 1){
      changeStatus(1, "complete");
      console.log(taskList); 
     }
     
    });
  })();

     
  (function() {
     document.getElementById('table__main').addEventListener('click', function(event) {
         
       if(event.target.classList.contains("table__column--name-h") ) {
          
          toggleSortOrder();  
          taskList.sort(compareStrings('taskName', sortOrder));
          renderTable(taskList);
       } else if (event.target.classList.contains("table__column--desc-h")) {
         
         toggleSortOrder();  
         taskList.sort(compareStrings('desc', sortOrder));
         renderTable(taskList);
       } else if (event.target.classList.contains("table__column--status-h")) {
         
         toggleSortOrder();
         taskList.sort(compareStrings('status', sortOrder));
         renderTable(taskList);
       } else if(event.target.classList.contains("table__column--edited-h")) {
         
         toggleSortOrder(); 
         taskList.sort(compareBooleans('wasEdited', sortOrder));
         renderTable(taskList);
       //  taskList = [...taskList];
       } else if(event.target.classList.contains("table__column--date-h")) {

         toggleSortOrder();
         taskList.sort(compareDates('date', sortOrder));
         renderTable(taskList);
       }
       console.log(taskList);
         
     }, false); 
  })();

/* || event.target.classList.contains("table__column--desc-h") || event.target.classList.contains("table__column--edited-h") ||  event.target.classList.contains("table__column--status-h")     */
     
     

  function generateHTML() {
  return `
    <ul class="list__task--dropdown">
       <li class="status__pending"><a href="#1" class="table__status--button">Pending<span class="triangle">▼</span></a></li>
       <li class="status__ongoing">Ongoing</li>
       <li class="status__complete">Complete</li>
       </ul>`
   };

   function generateTableRow(index, name, date, desc, wasEdited, status) {

    this.id = index;
    this.name = name;
    this.date = date;
    this.desc = desc;
    this.wasEdited = wasEdited;
    this.status = status;

    //var parentContainer = document.getElementById('table__main');

    // var mainContainer = document.getElementById('table__rows--container');

    var mainContainer = document.createElement('div');
    mainContainer.className = "table__content--main";

    var cellName = document.createElement('div');
    cellName.className = "table__column--name-c u-center";
    cellName.innerHTML = this.name;
    
    var cellDate = document.createElement('div');
    cellDate.className = "table__column--date-c u-center";
    cellDate.innerHTML = this.date;

    var cellDesc = document.createElement('div');
    cellDesc.className = "table__column--desc-c u-center";
    cellDesc.innerHTML = this.desc;

    var cellWasEdited = document.createElement('div');
    cellWasEdited.className = "table__column--edited-c u-center";
    if(this.wasEdited) {
      cellWasEdited.innerHTML = "Yes";
    } else {
      cellWasEdited.innerHTML = "No";
    }
    

    var cellStatus = document.createElement('div');
    cellStatus.className = `table__column--status-c row-${this.id}`;

    var cellStatusInnerContainer = document.createElement('div');

    if(this.status == "pending") {
      cellStatusInnerContainer.className = "status__choose--container u-red";
    } else if (this.status == "ongoing") {
      cellStatusInnerContainer.className = "status__choose--container u-yellow";
    } else if (this.status == "complete") {
      cellStatusInnerContainer.className = "status__choose--container u-green";
    }
    
    cellStatusInnerContainer.innerHTML = this.status.charAt(0).toUpperCase() + this.status.substr(1) + " ▼";
    

    // final steps:
    cellStatus.appendChild(cellStatusInnerContainer);
    mainContainer.appendChild(cellName);
    mainContainer.appendChild(cellDate);
    mainContainer.appendChild(cellDesc);
    mainContainer.appendChild(cellWasEdited);
    mainContainer.appendChild(cellStatus);

    tableMainContainer.appendChild(mainContainer);
   };

   function generateStatusDropdown(context) {

      const acceptor = context;

      var newUL = document.createElement('ul');
      newUL.className = "list__task--dropdown";

      var statusPending = document.createElement('li');
      statusPending.className = "status__pending";
      
      // innerBlock:
      var tableStatusButton = document.createElement('a');
      tableStatusButton.className = "table__status--button";
      tableStatusButton.innerHTML = "Pending";
      tableStatusButton.setAttribute("href", "#1");
      var triangle = document.createElement('span');
      triangle.className = "triangle";
      triangle.innerHTML = "▼";
      // end of innerBlock
      // we append it to the parent:
      statusPending.appendChild(tableStatusButton);
      statusPending.appendChild(triangle);

      var statusOngoing = document.createElement('li');
      statusOngoing.className = "status__ongoing";
      statusOngoing.innerHTML = "Ongoing";
      var statusComplete = document.createElement('li');
      statusComplete.className = "status__complete";
      statusComplete.innerHTML = "Complete";

      newUL.appendChild(statusPending);
      newUL.appendChild(statusOngoing);
      newUL.appendChild(statusComplete);

      acceptor.parentNode.appendChild(newUL);
   };

   function createHeaders() {
    var mainHeaderContainer = document.createElement('div');
    mainHeaderContainer.className = "table__header--main";
    
    var mainHeader = document.createElement('h2');
    mainHeader.innerHTML = "All tasks";

    mainHeaderContainer.appendChild(mainHeader);

    var mainContainer = document.createElement('div');
    mainContainer.className = "table__content--main";

    var headerName = document.createElement('div');
    headerName.className = "table__column--name-h u-center";
    headerName.innerHTML = "Task Name";

    var headerDate = document.createElement('div');
    headerDate.className = "table__column--date-h u-center";
    headerDate.innerHTML = "Starting Date";

    var headerDesc = document.createElement('div');
    headerDesc.className = "table__column--desc-h u-center";
    headerDesc.innerHTML = "Task Description";

    var headerWasEdited = document.createElement('div');
    headerWasEdited.className = "table__column--edited-h u-center";
    headerWasEdited.innerHTML = "Was Edited";

    var headerStatus = document.createElement('div');
    headerStatus.className = "table__column--status-h u-center";
    headerStatus.innerHTML = "Status";

    mainContainer.appendChild(headerName);
    mainContainer.appendChild(headerDate);
    mainContainer.appendChild(headerDesc);
    mainContainer.appendChild(headerWasEdited);
    mainContainer.appendChild(headerStatus);

    tableMainContainer.appendChild(mainHeaderContainer);
    tableMainContainer.appendChild(mainContainer);
   };

/*
<div class="table__header--main">
    <h2>All tasks</h2>
  </div>
  <div class="table__content--main">
   <div class="table__column--name-h u-center">Task Name</div>
   <div class="table__column--date-h u-center">Starting Date</div>
   <div class="table__column--desc-h u-center">Task Description</div>
   <div class="table__column--edited-h u-center">Was Edited</div>
   <div class="table__column--status-h u-center">Status</div>
  </div> */


   function clearTable() {
    tableMainContainer.innerHTML = "";

     // for(let i = 2; i <= tableMainContainer.children.length - 1; i++) {
     //   console.log(tableMainContainer.children);
     //     tableMainContainer.children[i].remove();
     // }
   };
     
   function compareStrings(key, order = 'asc') {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
          
       const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
       const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
          
       let comparison = 0;
       if(varA > varB) {
           comparison = 1;
       } else if (varA < varB) {
           comparison = -1;
       }
       return((order == 'desc') ? (comparison * -1) : comparison);
      }
   };
     
   function compareBooleans(key, order = 'asc') {
       return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
           
       if(typeof a[key] === 'boolean') {
          const varA = a[key]; 
        }
       if(typeof b[key] === 'boolean') {
          const varB = b[key];
        }
           
      let comparison = 0;
      if(varA === varB) {
          comparison = 0;
      } else if(varA == false) {
          comparison = -1;
      } else {
          comparison = 1;
      }
      return((order == 'desc') ? (comparison * -1) : comparison);
       }
   };
     
  function compareDates(key, order = 'asc') {
    return function(a, b) {
        
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        
    const varA = (typeof a[key] === 'string') ? a[key] : "No date";
    const varB = (typeof b[key] === 'string') ? b[key] : "No date";
          
    let comparison = 0;
        //2019-04-10
    let aYear = varA.substring(0, 4);
    let aMonth = varA.substring(5, 7);
    let aDay = varA.substring(8);
    var aDate = new Date(aYear, aMonth, aDay);
        
    let bYear = varB.substring(0, 4);
    let bMonth = varB.substring(5, 7);
    let bDay = varB.substring(8);
    var bDate = new Date(bYear, bMonth, bDay);
    

    if(aDate.getTime() == bDate.getTime()) {
          comparison = 0;
      } else if(aDate.getTime() > bDate.getTime()) {
          comparison = 1;
      } else if(aDate.getTime() < bDate.getTime()) {
          comparison = -1;
      }
      return((order == 'desc') ? (comparison * -1) : comparison);
       }

    };
     
  function toggleSortOrder() {
    if(sortOrder == 'asc') {
        sortOrder = 'desc';
    } else {
        sortOrder = 'asc';
    }
  };

  function renderTable(taskList) {

    this.taskList = taskList;
    clearTable();
    createHeaders();
    taskList.forEach(function(el) {
      generateTableRow(el.taskId, el.taskName, el.date, el.desc, el.wasEdited, el.status);
     });
  };

  function changeStatus(index, status) {
    this.index = index;
    this.status = status;

    const soughtIndex = taskList.findIndex(task => task.taskId == this.index);
    
    if(typeof taskList[soughtIndex] !== 'undefined' && taskList[soughtIndex] != -1) {
       taskList[soughtIndex].status = this.status;
    }
   
  };

});



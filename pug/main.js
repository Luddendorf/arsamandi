  document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded");

    var taskList = new Array();

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
  // 	const statusButton = this;
  //   statusButton.parentNode.parentNode.classList.toggle('closed')

  //   var triangle = document.querySelector('.triangle');
  //   if(triangle.textContent == "▼") {
  //   	triangle.textContent = "▲";
  //   	console.log('Set to up');
  //   } else {
  //   	triangle.textContent = "▼";
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

  	 var localStore = [];

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

  	 clearTable();
  	 createHeaders();
  	 taskList.forEach(function(el) {

  	 	  generateTableRow(el.taskId, el.taskName, el.date, el.desc, el.wasEdited, el.status);

  	   	localStore = [];
  	 });
  	 

  	 	  	

  	});
  })();


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
 		cellStatus.className = "table__column--status-c";

 		var cellStatusInnerContainer = document.createElement('div');
 		cellStatusInnerContainer.className = "status__choose--container";
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
  	 // 	console.log(tableMainContainer.children);
  	 // 		tableMainContainer.children[i].remove();
  	 // }
   };

  });

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

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "pending");
          }

        } else if(myTarget.classList.contains("status__ongoing")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #fbc02d");
          acceptor.textContent = "Ongoing ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "ongoing");
          }

        } else if(myTarget.classList.contains("status__complete")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #55c57a");
          acceptor.textContent = "Complete ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "complete");
          }

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
    document.querySelector('#table__main').addEventListener('click', function(event) {
        


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
       // console.log(taskList);
         
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
    mainContainer.className = `table__content--main row-${this.id}`;

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

  function changeProperty(index, propertyName, propertyValue) {
    this.index = index;
    this.propertyName = propertyName;
    this.propertyValue = propertyValue;

    const soughtIndex = taskList.findIndex(task => task.taskId == this.index);
    
    if(typeof taskList[soughtIndex] !== 'undefined' && taskList[soughtIndex] != -1) {
       taskList[soughtIndex][this.propertyName] = this.propertyValue;
    }
   
  };

  function createTableCell(event) {

    this.cell = event.target;

    if(this.cell.classList.contains("status__choose--container")) {

    }
  };

});

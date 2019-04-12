html { font-size: 62.5%; }  /* =10px */
body { font-size: 1.4rem; } /* =14px */
h1   { font-size: 2.4rem; } /* =24px */


/* some basic styling to make things pretty */
*, *:before, *:after {
  box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body, input, textarea, select, option {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
}

body {
  font-size: 125%;
  color: #333;
  background-color: #9bd;
}

fieldset {
  width: 25em;
  margin: 20px;
  border: 0 none;
}

legend {
  font-size: 1.2em;
  width: 100%;
  border-bottom: 1px dotted #99c;
}

fieldset div {
  margin: 4px 0;
}

input, textarea, select {
  font-size: 1em;
  padding: 2px 5px 4px;
  border: 0 none;
  border-radius: 2px;
}

/* flexbox styles */
fieldset div {
  display: flex;
  align-items: center;
}

label {
  order: 1;
  width: 10em;
  text-align: right;
  padding-right: 0.5em;
    white-space: nowrap;
  user-select: none;
  cursor: pointer;
}

input, textarea, select {
  order: 2;
  flex: 1 1 auto;
}

input[type="checkbox"], input[type="radio"] {
  order: 1;
  flex: none;
  width: auto;
  margin-left: 10em;
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

input:checked ~ label {
  font-weight: bold;
}
/*
.list__container {
  display: flex;
  flex-direction: column;
}

.list__headers {
  display: flex;
  justify-content: space-between;
}

.list__header {
  flex: 0 0 auto;
  margin: 1rem;
}

.list__task-container {
  display: flex;
  justify-content: space-between;
}

.list__task-names {
  margin: 1rem;
}

.list__task-dates {
  margin: 1rem;
}
.list__task-content {
  margin: 1rem;
}
.list__task-isedited {
  margin: 1rem;
}
.list__task-status {
  margin: 1rem;
} */


/* DECISION WITH GRID: */
.list__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 15% 15% 1fr;
  grid-gap: 1.5rem;
  justify-items: stretch;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
}
.list__container > * {
  margin: 1.5rem;
}

.list__header--main {
  grid-column: 1/6;
  grid-row: 1/2;
  justify-self: center;
}
.list__headers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 1.5rem;
  grid-column: 1/6;
  grid-row: 2/3;
  justify-items: stretch;
}


.list__header--name {
  grid-column: 1/2;
  grid-row: 1/2;
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
}

.list__task-container {
  grid-column: 1/6;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-flow: column;
}

.list__task-names {
  grid-column: 1/2;
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
}


<form action="get">
  <fieldset>
    <legend>Your skillset</legend>
    
    <div>
      <input id="name" name="name" type="text" />
      <label for="name">Name</label>
    </div>
    
    <div>
      <input id="date" name="date" type="date" />
      <label for="name">Date</label>
    </div>
    
    <div>
      <input id="name" name="name" type="text" />
      <label for="name">Task</label>
    </div>
    
    <div>
      <select id="experience" name="experience">
        <option value="1">1 year or less</option>
        <option value="2">2 years</option>
        <option value="3">3 - 4 years</option>
        <option value="5">5 years or more</option>
      </select>
      <label for="experience">experience</label>
    </div>
    
    <div>
      <input id="html" name="html" type="checkbox" />
      <label for="html">HTML</label>
    </div>
    
    <div>
      <input id="css" name="css" type="checkbox" />
      <label for="css">CSS</label>
    </div>
    
    <div>
      <input id="javascript" name="javascript" type="checkbox" />
      <label for="javascript">JavaScript</label>
    </div>
    
  </fieldset>
  
  <button type="button">Add to the list</button>
</form>

<div class="list__container">
  <h2 class="list__header--main">All Tasks</h2>
  
  <div class="list__headers">
    <div class="list__header--name">Task Name</div>
    <div class="list__task-names">Deving</div>
    
    <div class="list__header--date">Starting Date</div>
    <div class="list__task-dates">26.05.1999</div>
    
    <div class="list__header--desc">Task Description</div>
    <div class="list__task-content">Begin our very interesting journey.</div>
    
    <div  class="list__header--wasedited">Was edited</div>
    <div class="list__task-wasedited">Yes</div>
    
    <div class="list__header--status">Status</div>
    <div class="list__task-status">On run</div>
    
  </div>
  
 <div class="list__task-container">
   

</div>
  
</div>

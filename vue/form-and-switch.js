<template>
	<div class="container">
		<form>
			<div class="row">
				<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
					<h1>File a Complaint</h1>
					<hr>
					<div class="form-group">
						<label for="email">Mail</label>
                        <input
                                type="text"
                                id="email"
                                class="form-control"
                                :value="userData.email"
                              @input="userData.email = $event.target.value" 
                                v-model.lazy="userData.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                :value="userData.password"
                                @input="userData.password = $event.target.value"
                                v-model.lazy="userData.password">
                      <p>{{ userData.password }}</p>
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input
                                type="number"
                                id="age"
                                class="form-control"
                                v-model.number="userData.age">
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                    <label for="message">Message</label><br>
                    <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
                    <textarea
                            id="message"
                            rows="5"
                            class="form-control"
                            v-model="message"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label for="sendmail">
                            <input
                                    type="checkbox"
                                    id="sendmail"
                                    value="SendMail"
                                    v-model="sendMail"> Send Mail
                        </label>
                        <label for="sendInfomail">
                            <input
                                    type="checkbox"
                                    id="sendInfomail"
                                    value="SendInfoMail"
                                    v-model="sendMail"> Send Infomail
                        </label>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                    <label for="male">
                        <input
                                type="radio"
                                id="male"
                                value="Male"
                                v-model="gender"> Male
                    </label>
                    <label for="female">
                        <input
                                type="radio"
                                id="female"
                                value="Female"
                                v-model="gender"> Female
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
                    <label for="priority">Priority</label>
                    <select
                            id="priority"
                            class="form-control"
                            v-model="selectedPriority">
                        <option v-for="priority in priorities"
                        >{{ priority }}</option>
                    </select>
                </div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <app-switch v-model="dataSwitch"></app-switch>
              </div>

            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button
                            class="btn btn-primary">Submit!
                    </button>
                </div>
            </div>
        </form>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Mail: {{ userData.email }}</p>
                        <p>Password: {{ userData.password }}</p>
                        <p>Age:{{ userData.age }}</p>
                        <p style="white-space: pre">Message: {{ message }}</p>
                        <p><strong>Send Mail?</strong></p>
                        <ul>
                            <li v-for="item in sendMail">{{ item }}</li>
                        </ul>
                        <p>Gender: {{ gender }}</p>
                        <p>Priority: {{ selectedPriority }}</p>
                        <p>Switched: {{ dataSwitch }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
     data() {
       return {
         userData: {
           email: '',
           password: '',
           age: 27
         },
         message: 'A new text',
         sendMail: [],
         gender: 'Male',
         selectedPriority: 'High',
         priorities: ['High', 'Medium', 'Low'],
        dataSwitch: true
       }
     }
    }
</script>

<style>

</style>

//  Switch.vue ////////////////////////////
<template>
  <div>
    <div id="on"
        @click="switched(true)"
        :class="{active: value}"
    >On</div>
    <div iud="off"
         @click="switched(false)"
         :class="{active: !value}"
    >Off</div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      switched(isOn) {
        this.$emit('input', isOn);
      }
    }
  }
</script>

<style scoped>
   #on, #off {
     width: 40px;
     height: 20px;
     background-color: lightgrey;
     padding: 2px;
     display: inline-block;
     margin: 10px -2px;
     box-sizing: content-box;
     cursor: pointer;
     text-align: center;
   }
   #on:hover, #on.active {
     background-color: lightgreen;
   }

   #off:hover, #off.active {
     background-color: lightcoral;
   }
</style>

<template>
  <div class="input" :class="{invalid: $v.age.$error}">
    <label for="age">Your Age</label>
    <input type="number"
           id="age"
           @blur="$v.age.$touch()"
           v-model.number="age">
    <p v-if="!$v.age.minVal">You have to be at least {{ $v.age.$params.minVal.min }}</p>
  </div>
  <div class="input" :class="{invalid: $v.password.$error}">
    <label for="password">Password</label>
    <input type="password"
           id="password"
           @blur="$v.password.$touch()"
           v-model="password">
  </div>
  <div class="input" :class="{invalid: $v.confirmPassword.$error}">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password"
           id="confirm-password"
           @blur="$v.confirmPassword.$touch()"
           v-model="confirmPassword">
  </div>

  <div class="hobbies">
    <h3>Add some Hobbies</h3>
    <button @click="onAddHobby" type="button">Add Hobby</button>
    <div class="hobby-list">
      <div class="input"
           v-for="(hobbyInput, index) in hobbyInputs"
           :key="hobbyInput.id"
           :class="{invalid: $v.hobbyInputs.$each[index].$error}">
        <label :for="hobbyInput.id">Hobby #{{ index }}</label>
        <input type="text"
              :id="hobbyInput.id"
              @blur="$v.hobbyInputs.$each[index].value.touch()"
              v-model="hobbyInput.value">
        <button @click="onDeleteHobby(hobbyInput.id)"
               type="button">X</button>
      </div>
      <p v-if="$v.hobbyInputs.minLen">You have to give at least {{ $v.hobbyInputs.$params.minLen.min }} hobbies.</p>
      <p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
    </div>
  </div>

  <div class="input inline" :class="{invalid: $v.terms.$invalid}">
     <input type="checkbox" id="terms"
            @change="$v.terms.$touch()"
            v-model="terms">
     <label for="terms">Accept Terms of Use</label>
  </div>
  <div class="submit">
    <button type="submit" :disabled="$v.$invalid">Submit</button>
  </div>
</template>


<script>
  import { required, email, numeric, minValue,
   minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators';
   import axios from 'axios';

  export default {
    validations: {
      email: {
        required: required,
        email: email,
        unique: val => {
          if(val === '') return true;
          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')]
            .then(res => {
              return Object.keys(res.data).length === 0; 
            });
        }
      },
      // return new Promise((resolve, reject) => {
      //       setTimeout(resolve(val !== 'test@test.com'), 1000);
      //     })
      age: {
        required: required,
        minVal: minValue(18)
      },
      password: {
        required: required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password'),
       // or: 
        sameAs: sameAs(vm => {
         return vm.password + 'b';
       })
      },
      terms: {
        required: requiredUnless(vm => {
          return vm.country === 'germany';
        })
      },
      hobbyInputs: {
        required: required,
        minLen: minLength(2),
        $each: {
          value: {
            required: required,
            minLen: minLength(5)
          }
        }
      }
    }
  }
</script>

// main.js //////////////////////////

axios.defaults.baseURL = 'http://vue.firebase.io';

axios.defaults.headers.get['Accept'] = 'application/json';

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

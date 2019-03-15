<div v-if="isSubmitted">
          Personal Info
        </div>

        <button class="btn btn-primary"
               @click.prevent="submitted">Submit
        </button>

        <app-switch v-model="dataSwitch"></app-switch>
        <p>Switched: {{ dataSwitch }}</p>
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
         dataSwitch: true,
         isSubmitted: false
       }
     },
     methods: {
      submitted() {
        this.isSubmitted = true;
      }
     },
     components: {
       appSwitch: Switch
     }
    }
</script>

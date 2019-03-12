// app.js ////////////////////////////////////////////////////////
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
          var damage = this.calculateDamage(3, 10);
          this.monsterHealth -= damage;
          this.turns.unshift({
             isPlayer: true,
             text: 'Player hits Monster for ' + damage
          });
            
          if(this.checkWin()) {
              return;
          }
            
          this.monsterAttacks();
        },
        specialAttack: function() {
           var damage = this.calculateDamage(10, 20);
           this.monsterHealth -= damage;
            
           this.turns.unshift({
              isPlayer: true,
              text: 'Player hits Monster hard for ' + damage
           });
            
           if(this.checkWin()) {
               return;
           }
            
           this.monsterAttacks();
        },
        heal: function() {
           if(this.playerHealth <= 90) {
              this.playerHealth += 10;
           } else {
              this.playerHealth = 100;
           }
            
           this.turns.unshift({
             isPlayer: true,
             text: 'Player heals for 10'
           });
            
           this.monsterAttacks();
        },
        giveUp: function() {
           this.gameIsRunning = false;
        },
        monsterAttacks: function() {
           var damage = this.calculateDamage(5, 12);
           this.playerHealth -= damage;
           this.checkWin();
           this.turns.unshift({
               isPlayer: false,
               text: 'Monster hits Player for ' + damage
           })
        },
        calculateDamage: function(min, max) {
          return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
           if(this.monsterHealth <= 0) {
             if(confirm('You won! New Game?')) {
                 this.startGame();
             } else {
                 this.gameIsRunning = false;
             }
             return true;
           } else if(this.playerHealth <= 0) {
               if(confirm('You lost! New Game?')) {
                  this.startGame();
               } else {
                  this.gameIsRunning = false;
               }
               return true;
           }
           
            return false;
        }
        
    }
});









// auth.effects.ts ////////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
    
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
      tap(action => localStorage.setItem("user",         JSON.stringify(action.user)))
  );
    
 @Effect({dispatch: false})
 logout$ = this.actions$.pipe(
   ofType<Logout>(AuthActionTypes.LogoutAction),
     tap(() => {localStorage.removeItem("user"),
       this.router.navigateByUrl('/login');
                
   })
 );
    
  constructor(private actions$: Actions, private router: Router) {}
}


<!DOCTYPE html>
<html>

<head>
	<title>Monster Slayer</title>
	<script src="https://npmcdn.com/vue/dist/vue.js">
	</script>
	<link rel="stylesheet" href="css/foundation.min.css">
	<link rel="stylesheet" href="css/app.css">
</head>

<body>
	<div id="app">
		<section class="row">
			<div class="small-6 columns">
				<h1 class="text-center">YOU</h1>
				<div class="healthbar">
					<div class="healthbar text-center"
          style="background-color: green; margin: 0; color: white;"
          :style="{width: playerHealth + '%'}">
            {{ playerHealth }}
					</div>
				</div>
			</div>
			<div class="small-6 columns">
				<h1 class="text-center">MONSTER</h1>
				<div class="healthbar">
					<div class="healthbar text-center"
          style="background-color: green; margin: 0; color: white;"
          :style="{width: monsterHealth + '%'}">
            {{ monsterHealth }}
					</div>
				</div>
			</div>
		</section>
		<section class="row controls" v-if="!gameIsRunning">
			<div class="small-12 columns">
				<button id="start-game"
                @click="startGame">START NEW GAME</button>
        </div>
    </section>
    <section class="row controls" v-else>
        <div class="small-12 columns">
            <button id="attack" @click="attack">ATTACK</button>
            <button id="special-attack" @click="specialAttack">SPECIAL ATTACK</button>
            <button id="heal" @click="heal">HEAL</button>
            <button id="give-up" @click="giveUp">GIVE UP</button>
        </div>
    </section>
    <section class="row log" v-if="turns.length > 0">
        <div class="small-12 columns">
            <ul>
                <li v-for="turn in turns"
                     :class="{'player-turn': turn.isPlayer, 'monster-turn': !turn.isPlayer}">
                   {{ turn.text }}
                </li>
            </ul>
        </div>
    </section>
</div>
<script src="app.js"></script>
</body>
</html>

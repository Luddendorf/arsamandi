// welcome.component.html /////////////////////////////////////////////////





// welcome.component.css /////////////////////////////////////////////////

.welcome {
  text-align: center;
}


// material.module.ts ////////////////////////

import { MatTabsModule, MatCardModule }

imports: [MatTabsModule, MatCardModule]

imports: [MatTabsModule, MatCardModule]


<!-- welcome.component.html -->

<div class="welcome" fxLayout="column"
                     fxLayout.gt-md="row"
                     fxLayoutGap.gt-md="20px"
                     fxLayoutAlign="center center">
  <section>
    <h1>ACTIVITY</h1>
    <p>Stay active and enjoy better health and more fun!</p>
  </section>
  <section>
    <h1>COMMUNITY</h1>
    <p>Get to know other people who share your passion!</p>
  </section>
  <section>
    <h1>CHALLENGES</h1>
    <p>Never stop! Dive into new challenges every day.</p>
  </section>
</div>

<!-- training.component.html -->

<mat-tab-group>
  <mat-tab label="New Excercise">
    <app-new-training></app-new-training>
  </mat-tab>
  <mat-tab label="Past Exercises">
    <app-past-trainings></app-past-trainings>
  </mat-tab>
</mat-tab-group>

<!-- new-training.component.html -->
<section class="new-training" fxLayout fxLayoutAlign="center">
  <mat-card fxFlex="400px">
    <mat-card-title>Time to start a workout!</mat-card-title>
    <mat-card-content>
      <mat-form-field>
        <mat-select placeholder="">
          <mat-option *ngFor="">
            {{}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-card-content>
    
    <mat-card-actions>
      <button type="submit" mat-button
              >Start</button>
    </mat-card-actions>
  </mat-card>
</section>


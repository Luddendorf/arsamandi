I am JavaScript, Angular 4/6, Angular Material, Vue.js, Vuetify, D3.js, jQuery, lodash.js, anime.js and so on, GSAP, HTML, HTML5 canvas, CSS3, flexboxes, CSS-grids,SASS, postprocessors, SVG-graphics, SVG-animations. Of course Gulp, Git, NPM.

module Memento {

  class PersonMemento {
      constructor(public firstName: string,
                 public lastName: string,
                 public age: number) {
      }
  }

  export class Person {
      constructor(public firstName: string,
                 public lastName: string,
                 public age: number) {
      }

      public GetMemento(): any {
          return new PersonMemento(this.firstName, this.lastName, this.age);
      }

      public RestoreMemento(state: any) {
          var personState = <PersonMemento>state;
          this.firstName = personState.firstName;
          this.lastName = personState.lastName;
          this.age = personState.age;
      }

      public display() {
          Output.WriteLine(this.firstName + " | " + this.lastName + " | " + this.age);
      }
  }
}

window.addEventListener("load", function () {
  var mementos = new Array();

  var person = new Memento.Person("Wesley", "Bakker", 36);
  person.display();

  mementos.push(person.GetMemento());

  person.firstName = "Sam";
  person.age = 3;
  person.display();

  mementos.push(person.GetMemento());

  person.firstName = "Imen";
  person.lastName = "ben Jeddou"
  person.age = 36;
  person.display();

  mementos.push(person.GetMemento());

  person.RestoreMemento(mementos[0]);
  person.display();

  person.RestoreMemento(mementos[1]);
  person.display();

  person.RestoreMemento(mementos[2]);
  person.display();
});

// state.ts ///////////////////////////////////////////////////
interface State {
  order: Order;

  cancelOrder();
  verifyPayment();
  shipOrder();
}

class Order {
  
  public paymentPendingState: State;
  public cancelledOrderState: State;
  public orderBeingPreparedState: State;
  public orderShippedState: State;

  public currentState: State;

  constructor() {
    this.paymentPendingState = new PaymentPendingState(this);
    this.cancelledOrderState = new CancelledOrderState(this);
    this.orderBeingPreparedState = new OrderBeingPreparedState(this);
    this.orderShippedState = new OrderShippedState(this);

    this.setState(this.paymentPendingState);
  }

  public setState(state: State) {
    this.currentState = state;
  }

  public getState(): State {
    return this.currentState;
  }
}

class PaymentPendingState implements State {
  
  public order: Order;

  constructor(order: Order) {
     this.order = order;
  }

  public cancelOrder() {
     console.log('Cancelling your unpaid order...');
     this.order.setState(this.order.cancelledOrderState);
  }

  public verifyPayment() {
    console.log('Payment verified! Shipping soon.');
    this.order.setState(this.order.orderBeingPreparedState);
  }

  public shipOrder() {
    console.log('Cannot ship the order when payment is pending.');
  }
}

class CancelledOrderState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log('Your order has already been cancelled');
  }
  public verifyPayment() {
    console.log('Order cancelled, you cannot verify payment.');
  }
  public shipOrder() {
    console.log('Order cannot be shipped, it was cancelled.');
  }
}

class OrderBeingPreparedState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log('Cancelling your order...');
    this.order.setState(this.order.cancelledOrderState);
  }
  public verifyPayment() {
    console.log('Already verified your payment.');
  }
  public shipOrder() {
    console.log('Shipping your order now!');
    this.order.setState(this.order.orderShippedState);
  }
}

class OrderShippedState implements State {
  public order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public cancelOrder() {
    console.log('You cannot cancel, already shipped...');
  }
  public verifyPayment() {
    console.log('You cannot verify, already shipped.');
  }
  public shipOrder() {
    console.log('You cannot ship it again, already shipped.');
  }
}


let order = new Order();
order.getState().shipOrder();
order.getState().verifyPayment();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();

console.log('Order state: ' + (<any> order.getState()).constructor.name);





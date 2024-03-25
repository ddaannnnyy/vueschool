# ES6

## Variables

### Const

Const is a constant variable. It creates an immutable, read-only variable which cannot be re-assigned. Const is locally block-scoped. Meaning that it cannot be reassigned inside the same code block, but another variable can use the name outside of the block. For example:

```javascript
function APICall() {
    const request = await fetch(...someAPI);
    const result = await request.json();
    return result;
}
function aDifferentFunction() {
    const request = await fetch(...anotherAPI);
    const result = await request.json();
    return result;
}
```

Even though we're using the same variable names because they are in separate code blocks the constants request and result only exist inside of the functions that they were declared in. We could not, for example do this:

```javascript
function APICall() {
    const request = await fetch(...someAPI);
    const result = await request.json();
    const request = await fetch(...anotherAPI); // we cannot re-use or re-assign the request constant. It already exists inside this code block (specified by the curly brackets)
    const anotherResult = await request.json();
}
```

It's important to remember that const (as well as let below) are BLOCK scoped. They don't have to be unique inside a function, just inside a curly bracket code block. For example, this code blcok is perfectly valid because the if and the else are separate code blocks:

```javascript
const valid = password.length > 6;
if (valid) {
  const message = "Your password is valid";
  console.log(message);
} else {
  const message = "Your password is not valid";
  console.log(message);
}
```

### let vs var

Let is a locally block-scoped variable, meaning that it can be used inside a code block and then safely reused elsewhere. Var defines a globally scoped variable, meaning that it can be set inside a scope and then accessed later. For example:

```javascript
for (var i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
console.log(i); // 3
```

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
console.log(i); // ReferenceError: i is not defined
```

It's also worth noting that var will inherit an undefined if accessed before declaration. let and const will result in runtime errors.

## Arrow Functons

Arrow functions are an alternative syntax to writing traditional functions. For example:

```javascript
function hello(msg) {
  return "Hello " + msg;
}
```

becomes

```javascript
const hello = (msg) => {
  return "Hello " + msg;
};
```

The benefit of arrow functions are:

- Implicit return
  If the arrow function is a one line, immediate return we don't have to use the return keyword. We could write the above function as `const hello = msg => "Hello "+ msg`.
- Brevity
  Arrow functions for simple tasks are much, much shorter than traditional functions. In the proper syntax a function takes up a minimum of 3 lines. Arrow functions are short one-liners. Which makes them especially useful for calls that take a function as a parameter. e.g. `Array.map((item) => item * 2)`.

Drawbacks of arrow functions:

- Because we're delaring arrow functions as variables. They react differently to hoisting (i.e. being able to invoke a function on a line before your function is declared). Arrow functions do not work this way, you cannot call an arrow function before it has been declared.

This works (but honestly is bad practice)

```javascript
console.log(hello());
function hello() {
  console.log("hey!");
}
```

Where as this will result in an error.

```javascript
console.log(hello); // Cannot access 'name' before initialisation
const hello = () => console.log("hey!");
```

- Difference in the behaviour of the `this` keyword. With a traditional function the `this` keyword can be used to reference variables in the same scope. For example:

```javascript
const circle = {
  radius: 10,
  diameter: function () {
    return this.radius * 2;
  },
};
console.log(circle.diameter); // 20
```

Whereas with an arrow function:

```javascript
const circle = {
  radius: 10,
  diameter: () => this.radius * 2,
};
console.log(circle.diameter); // NaN
```

This is because the `this` keyword has been rescoped to the arrow function, and the variable radius doesn't exist inside the arrow function.

This can also cause unintended side effects from the global scope.

```javascript
var radius = 5;
const circle = {
  radius: 10,
  diameter: () => this.radius * 2,
};
console.log(circle.diameter); // 10
```

Because the arrow function doesn't have a definition of the radius, it's inheriting it from the global scope. Which can lead to incorrect values without throwing an error.

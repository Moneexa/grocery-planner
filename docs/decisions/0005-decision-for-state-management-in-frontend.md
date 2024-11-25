# Decision for State Management in Frontend

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice for state management in frontend.

## Context and Problem Statement

We want to decide between which state management strategy will be suitable in react

## Decision Drivers

* Less lines of code
* No additional setup
* Easy Data maintenance

## Considered Options

* Prop Drilling
* Context API
* Redux

## Decision Outcome

Chosen option: "Context API", because Less lines of code without installing additional package, and data maintenance would be easy in this project.

## Pros and Cons of the Options

### Prop Drilling

Prop drilling requires  sharing data among components via passing props.

* Good, because Easy to use
* Good, because less lines of code
* Bad, because Data maintenance can get complex when component hierarchy gets complex

### Context API

Context API is React's own library of managing state.

* Good, because Less lines of code.
* Good, because Does not require additional setup
* Good, because Data Maintenance is not complex
* Bad, because Can get complex to manage in big projects

### Redux

Redux is another library to manage states in React App

* Good, because Data maintenance is easy
* Bad, because Alot of boilerplate code
* Bad, because Requires additional setup

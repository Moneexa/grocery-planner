# Decision for Styling Components in Frontend

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice for the library for styling purposes.

## Context and Problem Statement

We want to decide between the choices of styling

## Decision Drivers

* design consistency
* no custom css

## Considered Options

* Bootstrap/Tailwind
* Design Systems e.g(Material-ui, antd)

## Decision Outcome

Chosen option: "Design Systems e.g(Material-ui, antd)", because no custom css is required and design consistency is maintained throughout

## Pros and Cons of the Options

### Bootstrap/Tailwind

requires writing css as classnames

* Good, because no custom css is required
* Bad, because design consistency cannot be guaranteed

### Design Systems e.g(Material-ui, antd)

Design systems is a collection of built in components that can be used in place of native HTML elements.

* Good, because provides design consistency, if library components are used in the app througout
* Good, because no custom css is required.
* Bad, because additional setup, and thorough understanding of usage

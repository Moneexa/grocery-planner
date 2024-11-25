# Decision for caching mechanism

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice of caching mechanism

## Context and Problem Statement

We want to choose between various caching mechanisms.

## Decision Drivers

* Easy setup.
* OS Compatible

## Considered Options

* Redis
* Django's own caching mechanism

## Decision Outcome

Chosen option: "Django's own caching mechanism", because Easy to use for minimal MVP

## Pros and Cons of the Options

### Redis

Redis provides caching mechanism

* Good, because Easy to use
* Bad, because setup with Windows is not supported

### Django's own caching mechanism

Django has its own way of caching data

* Good, because Supported in all OS
* Good, because Easy to use
* Bad, because Not suitable for production grade application

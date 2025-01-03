# Decision for backend Framework

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice of backend framework

## Context and Problem Statement

We have to decide the framework for building the backend of grocery-planner

## Decision Drivers

* Support for Admin like Interface
* Support for ORM for less lines of code

## Considered Options

* .NET
* Django
* Springboot

## Decision Outcome

Chosen option: "Django", because provides support for admin dashboard

## Pros and Cons of the Options

### .NET

.NET framework provides support for ORM, and is very performant for handling resource intensive operations

* Good, because provides query manipulation via ORM
* Bad, because doesnt support template view without writing alot of code in ASP.NET

### Django

Django is Python's framework that is also very performant and provides an organized way for development which is easy to extend. In addition it provides interfaces which are GUIs for manipulating data directly without additional work.

* Good, because Provides ORM support and provides admin like dashboard support 
* Bad, because Can be a bit complex and learning curve is steep.

### Springboot

Springboot is a java based framework that provides ORM support via Hibernate.

* Good, because Supports ORM. Also a good choice for big complex projects
* Bad, because Requires additional setup for Hibernate to use ORM feature, also does not have a simple implementation for templates

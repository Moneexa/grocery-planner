# Decision for data Storage

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice of data storage

## Context and Problem Statement

We want to decide which relational db is useful for us.

## Decision Drivers

* Support for storing JSON (Dishes have to be stored in json format)
* Time Constraint
* Limited Resource Availability (Our app is small scale MVP)

## Considered Options

* Mysql
* Postgres
* SQlite

## Decision Outcome

Chosen option: "SQlite", because Light weight database without additional setup and resources, suitable for small scale dev environment.

## Pros and Cons of the Options

### Mysql

MySQL provides storing relational dbs. It is performant database.

* Good, because Provides JSON storage support
* Bad, because Requires additional setup for connecting with backend.
* Bad, because Needs resources to host database in the cloud

### Postgres

Very performant storage for storing relational dbs.

* Good, because Robust mechanism for storing JSON
* Good, because very performant
* Bad, because Requires additional setup to connect with backend.
* Bad, because Needs resources to host the data store in cloud.

### SQlite

SQLite is a performant database, for storing relational data.

* Good, because Very light weight data storage in the form of file.
* Good, because Does not require additional setup.
* Good, because No resources required as such.
* Bad, because Cant be used for production level applications

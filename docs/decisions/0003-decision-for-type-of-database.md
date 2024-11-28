# Decision for Type of Database

* Status: proposed
* Date: 2024-11-25

Technical Story: Choice of Type of Database

## Context and Problem Statement

We want to decide the structure of db

## Decision Drivers

* Provides support for data analytics (for insights)
* Consistency (relevant grocery items and recipes for checkouts per plan )

## Considered Options

* Relational Databases
* Non-relational Databases

## Decision Outcome

Chosen option: "Relational Databases", because provides data consistency and easy data analytics

## Pros and Cons of the Options

### Relational Databases

Relational Databases are structural. They maintain data consistency

* Good, because Easy data analytics
* Good, because is ATOMIC in nature thus, consistent
* Bad, because Does not allow easy data write.

### Non-relational Databases

Non-relational databases are not structured. They have collections, with each having documents as rows.

* Good, because Good for write heavy applications.
* Bad, because complex data analytics
* Bad, because no guarantee of data consistency

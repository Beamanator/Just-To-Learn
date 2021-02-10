# PHP

## Setting up mysql

installation of mysql: https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html

launch with
-> spotlight -> system preferences -> mysql

1. `mysql> CREATE DATABASE menagerie;` (https://dev.mysql.com/doc/refman/8.0/en/creating-database.html)

## PDO (PHP Data Objects)

Works with multiple databases

-   postgresql, ibm, informix, and more

data access layer for no matter the database

Completely object oriented

Security

-   prepared statements (prevent sql-injections)
    -   pre-compiled sql statement which separates instruction of sql from data
    -   data from user is treated just as data, never an sql instruction

usable

-   lots of helper functions, exceptions, etc

reusable

-   unified api to access multiple databases

error handling

-   styling, warning, exception?

classes

-   PDO
    -   pdo connection to database
-   PDOStatement
    -   prepared statement & result
-   PDOException
    -   errors raised by PDO

## MySqli

(my-sql improved)

doesn't work with multiple databases

does include prepared statements, pdo may be better

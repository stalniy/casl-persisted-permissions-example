# CASL roles with persisted permissions

This example shows how to configure [CASL](https://github.com/stalniy/casl) with permissions that is stored in the database. See [Cookbook](https://stalniy.github.io/casl/en/cookbook/roles-with-persisted-permissions) for details.

## Installation

```sh
npm ci
npm run migrate # migrates sqlite database
npm run seed # adds default records to the database
```

## Run

To run application:

```sh
npm start
```

To update permissions of a member role:

```sh
npm run allowMembersToCreateAnyArticle
```

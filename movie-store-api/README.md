# Movie Store API

#### The server part to react-movie-store.
#### It uses `MongoDB` as database so if you have an account there you are good to go.
#### Otherwise you have to either open an account or rewrite it to use the database of your choice.
#

## Installation

1. Run `yarn` / `npm install` to install the dependencies

1. Add a `.env` file with these properties
   - `MONGODB_URI`

   - `PORT` (default = 8000)

   - `ACCESS_KEY` (Used to authorize requests. If empty, requests are not authorized)

1. Run `yarn seed` / `npm run seed` to populate the database with 21 movies (optional)

## Scripts

### Run the app

```sh
yarn start
```

or

```sh
npm run start
```

### Start the development server

```sh
yarn dev
```

or

```sh
npm run dev
```

### Seeding the database

```sh
yarn seed
```

or

```sh
npm run seed
```

### Clear the movies in the database

```sh
yarn seed:clear
```

or

```sh
npm run seed:clear
```

## When the app is running

- Navigate to [localhost:8000/api-docs/](http://localhost:8000/api-docs) to see the API documentation ([swagger](https://swagger.io/))

- All API requests must be authorized with the `ACCESS_KEY` using the `Authorization` header (if the `ACCESS_KEY` is set in the `.env` file)

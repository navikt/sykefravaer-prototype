# Sykefravær Prototype

For testing av nytt design til ditt sykefravær.

Laget med [Create React App](https://github.com/facebook/create-react-app).

## Utvikling

/src/ inneholder 3 mapper:

-   Sykmeldinger
-   Sykepenger
-   Sykefravaer

Hver av disse mappene inneholder:

-   En basic.less-fil som importerer /src/basic.less (Dette er for å slippe å legge til en /../ i hver .less-fil som importerter basic.less)
-   Innholdet i /src/-mappen til hver app. Dette kopieres over fra de ulike appene ved behov.

src/Datafetcher:

-   Datafetcher oppdateres med de nødvendige mockene for å hente data. Dette må manuelt merges for de forskjellige appene.

src/App.tsx:

-   App.tsx oppdateres med samlede routes for de ulike appene.

src/store/useAppStore.ts:

-   Merges inn i /src/useAppStore.ts
-   useAppStore.ts i hver av appene importerer kun /src/useAppStore.ts

src/mock/index.ts:

-   Oppdateres med mock data

## Køring

Prosjektet kan kjøres lokalt eller bygges med Docker.

### Lokalt

Installer avhengigheter

```
npm install && cd /server && npm install
```

Frontend kan startes opp med dev-server ved å kjøre (fra root dir):

```
npm start
```

Kan også bygges og serves fra express-server

```
npm run build-prod && node /server/server.js
```

### Docker

Bygges fra dockerfile

```
docker build -t 'sykefravaer-prototype' .
```

Kjøring og port-forwarding. Merk: Dersom PORT settes i env.vars. må dette endres både i docker-file og her

```
docker run -p 5000:5000 sykefravaer-prototype
```

## Deployment

Kjøres på [heroku](http://sykefravaer-prototype.herokuapp.com/).
Skal etterhvert over på NAIS på GCP.

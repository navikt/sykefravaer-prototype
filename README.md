# Sykefravær Prototype
For testing av nytt design til ditt sykefravær.

Laget med [Create React App](https://github.com/facebook/create-react-app).

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
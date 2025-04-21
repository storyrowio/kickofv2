This is a Storyrow project skeleton. Different service deployment. So the result image in registry will be two (frontend and backend).

## Tech

- Golang
- NextJS
- MongoDB

## Workflow
- Run the project in different service and port
- Frontend: 3000
- Backend: 8000
- When deploy on docker, it will be in 2 service (backend and frontend)
- Run Dockerfile

## Important Note!
By using this flow, the NextJS is used as static file in golang project so it can not has NextJS api because api is dynamic while NextJS will be exported as static.

## Getting Started

First, install packages for Golang:

```bash
go get .
```
Second, install NextJS dependencies

```bash
npm install
```

## Use on Scratch Project

### Copy all golang directories
### If don't want to copy all the ``web`` dir
- Copy from src directory: ``components``, ``constants``, ``layouts``, ``services``, ``store``, ``theme``, ``utils``
- Replace ``layout`` and ``page`` in ``src/app``
- Copy public data
- Replace favicon.ico
- Add env to ``next.config.mjs``

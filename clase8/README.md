# Iniciar proyecto Node

#En la terminal
npm init
npm install -D typescript nodemon ts-node @types/express @types/node
npm install express --save
npx tsc --init


# En tsconfig.json
"lib": ["ES2015","DOM"],
"outDir": "./dist"
"moduleResolution": "node",


# En package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node dist/app.js",
    "dev": "nodemon --exec ts-node app.ts",
    "build": "npx tsc -p ."
},

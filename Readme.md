To build/run this project you need a global node installation. I am using node 18.17.1. You find a windows installer here:
https://nodejs.org/de/download

You also need a global pnpm install. When node is installed just run in the CLI:
npm install -g pnpm

To install the project do in CLI:
cd turbo
pnpm install

To start backend do in CLI:
cd turbo/backend1
pnpm dev

To start the client do in CLI:
cd turbo/app1
pnpm dev

Website should now be served to:
http://localhost:5173/

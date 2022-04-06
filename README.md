# bendle

### What is it?
What initially started off as yet another Wordle clone turned into a bit of a different game. Instead of having 24 hours to solve a 5 letter, 6 guess puzzle,
you have 60 seconds. The goal is to get the highest streak of correct puzzle answers in a row before either getting one wrong or running out of time. the game
resets every 60 seconds or when either the game is won or lost.

### How do I play it?
There are two (well three but the third sucks) options:
* On a laptop, desktop, or other device with a hardware keyboard, you can just use that
* On a phone, tablet, or other touchscreen device you can use the onscreen keyboard
* You can also click the onscreen keyboard with a mouse. This is very slow and makes the game tough. This method is not recommended.

## How do I run it?
As of now there are two options:

##### Run it using npm and vite:
1) clone the repository
2) `cd bendle` into the repository
3) run `npm install` to install vite, tailwind, and other required dependencies
4) use `npm run dev` to run the game using an npm server then open it in a browser. It defaults to `http://localhost:3000/` as the location to go to

##### Build it then run it using your web server of choice
1) clone the repository
2) `cd bendle` into the repository
3) run `npm install` to install vite, tailwind, and other required dependencies
4) use `npm run build` to do a proper build of the application. It will spit out a complete, minified application to the newly created `dist` directory. From there
5) use your favourite web server to run the newly created app using the contents of `dist` as your source.

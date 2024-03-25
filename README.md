# tackeons - A fork of Tachyons v5 beta
<pre>
   __             __                        
  / /_____ ______/ /_____  ____  ____  _____
 / __/ __ `/ ___/ //_/ _ \/ __ \/ __ \/ ___/
/ /_/ /_/ / /__/ ,< /  __/ /_/ / / / (__  ) 
\__/\__,_/\___/_/|_|\___/\____/_/ /_/____/
</pre>

### Changes
- Replaced [normalize.css](https://github.com/necolas/normalize.css/) with [modern-normalize.css](https://github.com/sindresorhus/modern-normalize)
- Removed font-family variables & replaced rules w/utilities ones
- Added font-family rules for https://github.com/system-fonts/modern-font-stacks
- Added rules for grey so can use either spelling

### Local Setup

Clone the repo from Github and install dependencies through npm.

```
git clone https://github.com/mrkhdly/tackeons.git
cd tackeons
npm install
```

#### Dev

If you want to just use everything in tachyons/src as a jumping off point and
edit all the code yourself, you can compile all of your wonderful changes by
running:

```npm start```

This will output both minified and unminified versions of the CSS to the CSS directory and watch the src directory for changes.
It's aliased to the command:

```npm run build:watch```

If you'd like to just build the CSS once without watching the src directory, run:

```npm run build```

If you want to check that a class hasn't been redefined or 'mutated,' there is a linter to check that all of the classes have only been defined once. This can be useful if you are using another library or have written some of your own CSS and want to make sure there are no naming collisions. To do this run the command:

```npm run mutations```

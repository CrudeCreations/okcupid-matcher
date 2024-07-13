# okcupid-matcher

> A chrome extension that allows you to match profiles that like you on OkCupid for free.

**WARNING** - Currently under early stages of development. Expect things to not work right now.

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `yarn` to install the dependencies.

## Developing

run the command

```shell
$ cd okcupid-matcher

$ yarn dev
```

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `okcupid-matcher/build` folder

### Nomal FrontEnd Developer Mode

1. access `http://0.0.0.0:5173/`
2. when debugging popup page, open `http://0.0.0.0:5173/popup.html`
3. when debugging options page, open `http://0.0.0.0:5173/options.html`

## Packing

After the development of your extension run the command

```shell
$ yarn build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

---
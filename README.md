# Dillo Theme Blueprint

This is a [Dillo](http://dillo.space) theme in its simplest form. Use it to start your making own themes.

Download this repo and put it next to your Dillo install. Now edit the *config.json* file next to this readme:
```
{
  "theme_name" : "awesometheme",
  "dillo_install" : "../dillo_git"
}
```
* **theme_name** : the name and folder where your theme will be built. Don't go fancy, better to use one-word, lowercase names. This is the same name you'll use within Dillo settings.
* **dillo_install** : path to the root of your Dillo install.

That's it! Once you run ```gulp``` it will compile the theme in the right place, specify the same name under Dillo settings and it should work fine. You can run ```gulp watch``` as well to watch the /src folders for changes and automatically re-compile.

### Folder structure
* **/src/styles** : .sass files here will be built as CSS. On this repo I put an empty override.sass that you can use to test. **Note:** Remember the main stylesheet in Dillo is called main.css, so if you make a main.sass file here it will completely change how your Dillo looks. The best way to start changing the looks and style of Dillo is to copy-paste _all_ the .sass files from the original Dillo theme, and start tweaking the colors and values in _config.sass.
* **/src/templates** : Here you can tweak the actual layout of the theme, files here are Jade templates. For example adding _sidebar.jade here will build _sidebar.html, and completely override the sidebar. Same as with the CSS, better start by copy-pasting the original Jade files from Dillo, then start tweaking your own changes. You don't need to copy everything, you can copy just the sidebar, notifications, layout, and so on.
* **/scripts/uglify** : All the javascript files here will be compiled minified into a ingle tutti.min.js file (that Dillo always looks for, so don't put anything here or copy over the scripts/uglify files from the original theme if you want to keep everything working the same). All files *outside* /uglify will be compiled+minified into their own individual files, with the extension '.min.js'. For example if you make /scripts/banana.js, it will be compiled into banana.min.js in the scripts folder in Dillo.

### Questions
Let us know if something goes wrong on Twitter [@dillospace](https://twitter.com/dillospace)

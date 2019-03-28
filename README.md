# enferlazt-clock
Its a Javascript library which adds clock(analogue or digital) to your site.

## Features
* Four types of clocks: 3 analogue and 1 digital
* Possible to display the name of city time zone
* Displaying location of city time zone on map

## Install
### Connection
Download files from git. Directory `enferlazt-clock` move to your project
***
You need to insert this code in your HTML file.
On Head
```html
<link href="enferlazt-clock/css/enferlazt-clock.min.css" rel="stylesheet">
```
Before close body tag
```html
<script src="http://momentjs.com/downloads/moment.js"></script>
<script src="http://momentjs.com/downloads/moment-timezone-with-data.js"></script>
<script src="enferlazt-clock/js/enferlazt-clock.min.js"></script>
```
### Using
Add div with class enferlazt-clock
```html
<div class="enferlazt-clock" data-type="0" data-location="europe/london" data-map="enable">
</div>
```
Only `data-location="europe/london"` parameter is required. This parameter contains time zone. All using time zones can be found on <http://momentjs.com/timezone/>

**Warning! Use only cities of this website with a continent prefix, if you write another city its not work**

`data-type="0"` - is type of clock enferlazt-clock. Choose one number from 1 to 4.

**Attention! If you did not write a number, type of clock takes the random value after _every_ page refresh**

`data-map="enable"` - its enable link to location of this city on map.

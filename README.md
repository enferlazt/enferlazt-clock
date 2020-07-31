

# enferlazt-clock
It is a JavaScript clock library. Makes it easy to add a clock or time to your website. This library use [Moment Timezone](https://momentjs.com/timezone/) for this.

### Features
* Two types and four variations these types
* Display caption under clock: city of time zone or any title
* Google map with city location

+ [enferlazt-clock](#enferlazt-clock)
	+ [Features](#features)
+ [Demo](#demo)
+ [Install](#install)
	+ [From CDN](#from-cdn)
	+ [From a local path](#from-a-local-path)
+ [Usage](#usage)
	+ [Required fields](#required-fields)
	+ [Non-required common fields](#non-required-common-fields)
	+ [Additional fields of analog type](#additional-fields-of-analog-type)
	+ [Additional fields of digital type](#additional-fields-of-digital-type)

## Demo
You can see it in work [here](http://enferlazt-clock.freeoda.com/)

## Install
###### From CDN:
Inset it in your HTML document:
+ In `<head>` tag
```html
        <link rel="stylesheet" href="https://unpkg.com/enferlazt-clock/dist/enferlazt-clock.min.css">
```

+ To end `<body>` tag
```html
        <script src="https://unpkg.com/enferlazt-clock"></script>
```

It is all. The library ready to work
###### From a local path:
Load this library from https://github.com/enferlazt/enferlazt-clock
Copy **src** directory into your project. If necessary rename directory. This includes code on ECMA2015 and will be have partical browser support. You can edit this files for your project.

+ In `<head>` tag
```html
        <link rel="stylesheet" href="src/enferlazt-clock.css">
```

+ To end `<body>` tag
```html
        <script src="src/enferlazt-clock.js"></script>
```

It is all. The library ready to work
## Usage

For usage enough paste this code:
```html
<enferlazt-clock type="analog" location="Europe/London"></enferlazt-clock>
```
It is simplest example of usage this library. It includes two required parameters: **type** and **location**.

#### Required fields

+ **type** - is first required field, can have one of two values: `analoge` or `digital` clock.

+ **location** - is second required field which depends on the [Moment Timezone](https://momentjs.com/timezone/) library. You can only use their location values, for example: `America/New_York` or `America/Argentina/Buenos_Aires`.

#### Non-required common fields

+ **title** - this adds a caption with arbitrary text under clock

+ **map** - it is adds a **title** with city from **location**, which acts as a switch between clock and Google map with the city location. You can change the caption text in **title** field. Content of this field displays on Google map, for example `map="San Francisco"` with `location="America/Los_angeles"` displays San Francisco on map

+ **title-styles** - css styles of title, works only with usage field **title** or **map**

+ **seconds="false"** - disable seconds on clock

#### Additional fields of analog type

Attention! This fields works only with `type="analog"`

+ **variation** - analog clock has three style variation, can has value from 1 to 3

+ **bgImg** - custom clock face image of clock(without hands). Clock hands will keep images of their **variation**. Recommended size with equal height and width, like 170 x 170 pixels.

+ **hourImg** - custom image for hour hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.

+ **minImg** - custom image for minute hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.

+ **secImg** - custom image for second hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.

#### Additional fields of digital type

+ **styles** - can contains css styles for digital clock, for example:
```html
<enferlazt-clock
	type="digital"
	location="Europe/London"
	styles="font: italic 1.2em 'Fira Sans', serif;
			color: green;
			width: 300px;
			height: 300px;"
></enferlazt-clock>
```
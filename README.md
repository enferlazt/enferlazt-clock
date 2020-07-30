# enferlazt-clock
It is a JavaScript clock library. Makes it easy to add a clock or time to your website. This library use [Moment Timezone](https://momentjs.com/timezone/) for this.

### Features
* Two types and four variations these types
* Display caption under clock: city of time zone or any title
* Google map with city location

[TOC]

##Demo
You can see it in work [here](enferlazt-clock.freeoda.com)

## Install
######From CDN:
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
######From a local path:
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
It is simplest example of usege this library. It includes two required parameters: **type** and **location**.

####Required fields

+ **type** - is first required field, can have one of two values: `analoge` or `digital` clock.

+ **location** - is second required field which depends on the [Moment Timezone](https://momentjs.com/timezone/) library. You can only use their location values, for example: `America/New_York` or `America/Argentina/Buenos_Aires`.

####Non-required common fields

+ **variation** - is variation of type, each type can has range values (default always 1):

	+ `analoge` type can has value from 1 to 3

	+ `digital` type can has only value 1(on current version)

+ **title** - this adds a caption with arbitrary text under clock

+ **map** - it is adds a **title** with city from **location**, which acts as a switch between clock and Google map with the city location. You can change the caption text in **title** field. For work needs value - true: `map="true"`

####Additional fields of analog type

Attention! This fields works only with `type="analog"`

+ **bgImg** - custom clock face image of clock(without hands). Clock hands will keep images of their **variation**. Recommended size with equal height and width, like 170 x 170 pixels.

+ **hourImg** - custom image for hour hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.

+ **minImg** - custom image for minute hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.

+ **secImg** - custom image for second hand. Clock face & rest hands will keep images of their **variation**. Hand nut should be in center image and hand points twelve. Recommended size with equal height and width, like 170 x 170 pixels.
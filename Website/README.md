# Project 2 - Home Dashboard

## Case

You make a dashboard for a house.
* Provide a dashboard by means of. HTML, CSS and JS/TS.

There are 4 Shelly plugs to which devices are connected.
* You automatically add the found Shelly plugs to the dashboard.
* For each plug, a switch on/off and the current consumption are displayed.
* With the switch you can turn the plug on or off.

There are also Philips Hue lamps that are connected via a bridge.
* You automatically add the found Philips Hue lamps to the dashboard.
* A switch is displayed for each lamp with a color indication of the lamp.
* You can switch the lamp on or off via the switch.
* You can also adjust the color via a color picker.

## Elaboration

* Make visual groups of the lamps and the plugs.
* The color picker is only visible when needed.
* Use TypeScript to generate your JavaScript.

## Todo:

* Complete the interfaces section
* Complete the variables section
* Complete the `DOMContentLoaded` eventlistener
* Complete the `placeShellyOnDom` function
* Complete the `RefreshShellyInfo` function
* Complete the `placeHueOnDom` function

## Development Testing

In development fase you can test by using the JSON objects in the files `hue.json` and `shelly.json` to populate the array's.

## Physical Testing

* To test your website you need to be connected to the `devbit` network
* You can find the setup in the back of B303
* Please only test if there are no courses in this room
* You need permission to test from a teacher
* One one student can test at a time
* If you are done testing make sure all plugs and lamps are turned off
* DO NOT DISCONNECT THE POWER OF THE SETUP!!

## Extra credits

If your website is working you can deploy it to your VM.
All information needed for this has been added to [the online course](https://eo-ict-fullstackdevelopment.netlify.app/82_docker_static/) 
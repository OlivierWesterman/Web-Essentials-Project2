/*
    Interfaces
*/

interface IcolorRGB {
    // Todo: add the variables r,g and b with the type number.
    r: number;
    g: number;
    b: number;
}

interface Ilights {
    // Todo:  add the variables id and name with the type string,
    //        state with the type boolean,
    //        bri, hue and sat with the type number.
    id: string;
    name: string;
    state: boolean;
    bri: number;
    hue: number;
    sat: number;
    
    }

interface Iplugs {
    // Todo: add the variables ip, id, device and name with the type string,
    //       state with the type boolean,
    //       power with the type number.
    ip: string;
    id: string;
    device: string;
    name: string;
    state: string;
    power: number;
}

/*
    Variables
*/

    // Todo: make a variable colorRGB with the type IcolorRGB
    //       make a variable colorPicker with the type number and initialize it with -1
    //       make a variable lampen with the type an array of Ilights and initialize it with an empty array
    //       make a variable plugs with the typa an array of Iplugs and initialize it with an empty array.
let colorRGB: IcolorRGB;
let colorPicker: number = -1;
let lampen: Array<Ilights> = [];
let plugs: Array<Iplugs> = [];
/*
    Constants
    DO NOT CHANGE THIS CODE
*/

const colors = [
    {r: 0xe4, g: 0x3f, b: 0x00},
    {r: 0xfa, g: 0xe4, b: 0x10},
    {r: 0x55, g: 0xcc, b: 0x3b},
    {r: 0x09, g: 0xad, b: 0xff},
    {r: 0x6b, g: 0x0e, b: 0xfd},
    {r: 0xe7, g: 0x0d, b: 0x86},
    {r: 0xe4, g: 0x3f, b: 0x00}
];

/*
    Place information on DOM when loaded  
*/

document.addEventListener('DOMContentLoaded', (event) => {
    // Todo: Make the Colorpicker invisible
    //       call the setColorListeners function
    let hiddenWheel = document.getElementById('choosecolor') as HTMLBodyElement;
    hiddenWheel.style.display = "none";
    setColorListeners();

    // Toddo: call the placeShellyonDom function
    //        call the placeHueOnDom function
    placeShellyOnDom();
    placeHueOnDom();

    // Todo: if there are plugs found then call the RefreshShellyInfo function
    //       make sure the RefreshShellyInfo function is called every 10 seconds
    if (plugs != undefined) {
        RefreshShellyInfo();
        setInterval(RefreshShellyInfo, 10000);
        //console.log("Refreshed Shelly Info");
    }
});

/*
    Place Shelly information on the DOM and add eventlisteners
*/

async function placeShellyOnDom(): Promise<void> {

    // Todo: get the Shelly plug info by using the getShellyPlugInfo function
    //       log the info to the console
    let plugInfo = await getShellyPlugInfo();
    //console.log(plugInfo);

    // Todo: if there are shelly plugs devices are found
    //       then loop through them and if they are 'SHPLG-S' devices then
    //       push the information to the variable plugs
    if (plugInfo != undefined) {
        for (let key in plugInfo.devices_status) {
            if (plugInfo.devices_status[key]._dev_info.code  == 'SHPLG-S') {
                let plug : Iplugs = {ip: plugInfo.devices_status[key].wifi_sta.ip, 
                                    id: plugInfo.devices_status[key]._dev_info.id, 
                                    device: plugInfo.devices_status[key]._dev_info.code, 
                                    name: "Shelly Plug " + (plugs.length+1), 
                                    state: plugInfo.devices_status[key].relays[0].ison ? "off" : "on", 
                                    power: plugInfo.devices_status[key].meters[0].power};
                plugs.push(plug);
                //console.log(plugs);
            }   
        } 
    }
    else {
        console.log("No Shelly plugs found");
    }

    
    // Todo: if the variable plugs contains information then
    //       loop through it and add each one as a tile in the div with id container
    //       a tile has the following structure:
    //       <div class="item">
    //          <div class="itembody">
    //              <i class="fa-solid fa-plug fa-2xl" id="plug<number of plug>"></i>
    //              <h5><device name></h5>
    //          </div>
    //          <div class="itemfooter">
    //              <div class="footerinfo">
    //                  <p>Power</p>
    //                  <p id="shellypower<number of plug>"><power info>W</p>
    //              </div>
    //              <div></div>
    //              <i class="fa-solid fa-power-off" id="onoff<number of plug>" style="color: <depending on state of plug>;"></i>
    //          </div>
    //       </div>
    //       finish off with adding eventlisteners to each power icon
    //       this uses the function setPlugState to change the status of the plug
if (plugs != undefined) {
        for (let i = 0; i < plugs.length; i++) {
            let powerColor = plugs[i].state ? "red" : "green";
            let power = plugs[i].power;
            //console.log(power);
            //console.log(plugIp);
            let container = document.getElementById('container') as HTMLBodyElement;
    
            // Creating the main div for each plug
            let itemDiv = document.createElement('div');
            itemDiv.classList.add("itemplugs");
            container.appendChild(itemDiv);
    
            // Creating the body of the tile
            let itemBodyDiv = document.createElement('div');
            itemBodyDiv.classList.add("itembody");
            itemDiv.appendChild(itemBodyDiv);
    
            // Creating the footer of the tile
            let itemFooterDiv = document.createElement('div');
            itemFooterDiv.classList.add("itemfooter");
            itemDiv.appendChild(itemFooterDiv);
    
            // Creating the power icon
            let powerIcon = document.createElement('i');
            powerIcon.classList.add("fa-solid", "fa-power-off");
            powerIcon.id = "onoff" + plugs[i].id;
            powerIcon.style.color = powerColor;
            itemFooterDiv.appendChild(powerIcon);
    
            // Creating the plug icon
            let itemBodyImage = document.createElement('i');
            itemBodyImage.classList.add("fa-solid", "fa-plug", "fa-2xl");
            itemBodyImage.id = "plug" + plugs[i].id;
            itemBodyImage.style.color = "gray";
            itemBodyDiv.appendChild(itemBodyImage);
    
            // Creating the name of the device
            let itemBodyH5 = document.createElement('h5');
            itemBodyH5.textContent = plugs[i].name;
            itemBodyDiv.appendChild(itemBodyH5);
    
            // Creating the power information
            let itemFooterFirstPara = document.createElement('p');
            itemFooterFirstPara.textContent = "Power: ";
            itemFooterDiv.appendChild(itemFooterFirstPara);
    
            let itemFooterSecondPara = document.createElement('p');
            itemFooterSecondPara.id = "shellypower" + plugs[i].id;
            itemFooterSecondPara.textContent = plugs[i].power + "W";
            itemFooterDiv.appendChild(itemFooterSecondPara);
    
            // Adding event listener to the power icon
            powerIcon.addEventListener('click', async() =>{   
             await setPlugState("0", plugs[i].ip, plugs[i].state)
             if (plugs[i].state == "on") 
             {powerIcon.style.color = "green"; 
             plugs[i].state= "off";
             itemBodyImage.style.color = "yellow"; }
             else 
             {powerIcon.style.color = "red" ;
              itemBodyImage.style.color = "gray";
              plugs[i].state= "on";}})
        }
    }
}

/*
    Refresh the info of the shelly plugs
*/
async function RefreshShellyInfo(): Promise<void> {

    // Todo : if there is plug information in the variable plugs
    //        then loop through it and use the function GetPlugPower to get and
    //        update the power information.
if (plugs != undefined) {
    for (let i = 0; i < plugs.length; i++) {
        let power = await GetPlugPower(plugs[i].id);
        //console.log(power);
        let powerInfo = document.getElementById("shellypower" + plugs[i].id) as HTMLBodyElement;
        powerInfo.textContent = power + "W";
    }
    console.log("Refreshed Power");
}
else {
    console.log("Failed to refresh Power");}
}


/*
    Place the Philips Hue information on the DOM and add eventlisteners
*/

async function placeHueOnDom(): Promise<void> {
    
    // Todo: use the function getLampsInfo the get the information on detected
    //       Philips Hue lamps
    let lampsInfo = await getLampsInfo();
	let lampsValue = Object.keys(lampsInfo);
    //let lampsInfo = {id : 2, name : "Hue Lamp 1", state : {on : true, bri : 254, hue : 10000, sat : 254}, uniqueid : "00:17:88:01:02:03:04:05-0b", type : "Extended color light"};
    console.log(lampsInfo);
    console.log("lamps loaded into lampInfo");
    //       if there are lamps then iterate through them and push the information
    //       to the variable lampen. 
    // If there are lamps, iterate through them and push the information to the variable lampen.
if (lampsInfo != undefined) {
    let lampsValue = Object.keys(lampsInfo);
    for (let l = 0; l < lampsValue.length; l++) {
        let key = lampsValue[l];
        let lamp : Ilights ={
            id: lampsValue[l],
            name: lampsInfo[key].name,
            state: lampsInfo[key].state.on,
            bri: lampsInfo[key].state.bri,
            hue: lampsInfo[key].state.hue,
            sat: lampsInfo[key].state.sat
        };
        lampen.push(lamp);
        //console.log(lampen);
    }
} 

    //       iterate through lampen and add each lamp as a tile to the div with id container
    //       a tile has the following structure:
    //       <div class="item">
    //          <div class="itembody">
    //              <i class="fa-solid fa-lightbulb fa-2xl" id="bulb<number of lamp>" style="color: <color of the lamp>;"></i>
    //              <h5><name of the lamp></h5>
    //          </div>
    //          <div class="itemfooter">
    //              <i class="fa-solid fa-palette" id="color<number of the lamp>"></i> 
    //              <input type="range" min="0" max="255" class="slider" id="dimming<number of the lamp>" disabled="">
    //              <i class="fa-solid fa-power-off" id="power<number of the lamp>" style="color: <depending on state of the lamp>;"></i>
    //          </div>
    //       </div>
    //       for each palette icon a eventlistener is added that activates the colorpicker tile
    //       for each slider a eventlistener is added that uses the function setLightBri to change the brightness of the lamp
    //       for each power icon a eventlistener is added that uses the function setLightState to change the state of the lamp
    if (lampen != undefined) {
        for (let i = 0; i < lampen.length; i++) {
            let lampPower = lampen[i].state ? "green" : "red";
            let lampColor = "hsl(" + ((360*lampen[i].hue)/65535) + "," + (100*lampen[i].sat/254) + "%," + (100*lampen[i].bri/254) + "%)";
            let container = document.getElementById('container') as HTMLBodyElement;
    
            // Creating the main div for each lamp
            let itemDiv = document.createElement('div');
            itemDiv.classList.add("itemlights");
            itemDiv.id = "item" + lampen[i].name;
            container.appendChild(itemDiv);
    
            // Creating the body of the tile
            let itemBodyDiv = document.createElement('div');
            itemBodyDiv.classList.add("itembody");
            itemDiv.appendChild(itemBodyDiv);
    
            // Creating the footer of the tile
            let itemFooterDiv = document.createElement('div');
            itemFooterDiv.classList.add("itemfooter");
            itemDiv.appendChild(itemFooterDiv);
    
            // Creating the power icon
            let powerIcon = document.createElement('i');
            powerIcon.classList.add("fa-solid", "fa-power-off");
            powerIcon.id = "power" + lampen[i].name;
            powerIcon.style.color = lampPower;
            itemFooterDiv.appendChild(powerIcon);
    
            // Creating the lamp icon
            let lampIcon = document.createElement('i');
            lampIcon.classList.add("fa-solid", "fa-lightbulb", "fa-2xl");
            lampIcon.id = "bulb" + lampen[i].name; 
            lampIcon.style.color = lampColor;
            itemBodyDiv.appendChild(lampIcon);

            // Creating the palette icon
            let paletteIcon = document.createElement('i');
            paletteIcon.classList.add("fa-solid", "fa-palette");
            paletteIcon.id = "color" + lampen[i].name;
            itemFooterDiv.appendChild(paletteIcon);
    
            // Creating the name of the lamp
            let itemBodyH5 = document.createElement('h5');
            itemBodyH5.textContent = lampen[i].name;
            itemBodyDiv.appendChild(itemBodyH5);
    
            // Creating the brightness slider
            let brightnessSlider = document.createElement('input');
            brightnessSlider.type = "range";
            brightnessSlider.min = "0";
            brightnessSlider.max = "255";
            brightnessSlider.classList.add("slider");
            brightnessSlider.id = "dimming" + lampen[i].name;
            brightnessSlider.disabled = false;
            itemFooterDiv.appendChild(brightnessSlider);
    
            // Adding event listener to the power icon
            powerIcon.addEventListener("click", async () => {
                let flippedState = !lampen[i].state;
                let response = await setLightState(Number(lampen[i].id), flippedState);
                if (response) {
                    lampen[i].state = flippedState;
                    powerIcon.style.color = flippedState ? "green" : "red";
                }
            });
    
            // Adding event listener to the palette icon
            paletteIcon.addEventListener('click', () => {
                lampColor = "hsl(" + ((360*lampen[i].hue)/65535) + "," + (100*lampen[i].sat/254) + "%," + (100*lampen[i].bri/254) + "%)";
                colorPicker = lampen.indexOf(lampen[i]);
                let colorWheel = document.getElementById('choosecolor') as HTMLBodyElement;
                if (colorWheel.style.display == "block") {
                    colorWheel.style.display = "none";
                }
                else {
                    colorWheel.style.display = "block";
                }
            });
    
            // Adding event listener to the slider
            brightnessSlider.addEventListener('input', () => {
                setLightBri(Number(lampen[i].id), Number(brightnessSlider.value));
                let shadowBri = document.getElementById("bulb" + lampen[i].name) as HTMLBodyElement;
                shadowBri.style.filter = "brightness(" + (Number(brightnessSlider.value)+25) / 255 + ")";
                console.log(brightnessSlider.value);
            });
        }
    }
}
/*
    Add Eventlisteners to the colorwheel to calculate the RGB values when moving the cursor
    Add Eventlisteners when color is picked by clicking on it.
    DO NOT CHANGE THIS CODE
*/

function setColorListeners(){

    (document.getElementById('color-wheel') as HTMLElement).addEventListener('mousemove', function(e) {
        var rect = (e.target as HTMLElement).getBoundingClientRect();
        // Calculate Cartesian coordinates as if the circle radius were 1
        var x = 2 * (e.clientX - rect.left) / (rect.right - rect.left) - 1;
        var y = 1 - 2 * (e.clientY - rect.top) / (rect.bottom - rect.top);
        // Calculate the angle in degrees with 0 at the top and rotate clockwise as expected by css conical gradient
        var a = ((Math.PI / 2 - Math.atan2(y, x)) / Math.PI * 180);
        if (a < 0) a += 360;
        // Draw the angle between 0 and the number of colors in the gradient minus one
        a = a / 360 * (colors.length - 1);  // minus one because the last item is at 360°, which is the same as 0°
        // Calculate the colors to interpolate
        var a0 = Math.floor(a) % colors.length;
        var a1 = (a0 + 1) % colors.length;
        var c0 = colors[a0];
        var c1 = colors[a1];
        // Calculate the weights and interpolate colors
        var a1w = a - Math.floor(a);
        var a0w = 1 - a1w;
        colorRGB = {
            r: c0.r * a0w + c1.r * a1w,
            g: c0.g * a0w + c1.g * a1w,
            b: c0.b * a0w + c1.b * a1w
        };
        // Calculate the radius
        var r = Math.sqrt(x * x + y * y);
        if (r > 1) r = 1;
        // Calculate the white weight, interpolate, and round to a whole number
        var cw = r < 0.8 ? (r / 0.8) : 1;
        var ww = 1 - cw;
        colorRGB.r = Math.round(colorRGB.r * cw + 255 * ww);
        colorRGB.g = Math.round(colorRGB.g * cw + 255 * ww);
        colorRGB.b = Math.round(colorRGB.b * cw + 255 * ww);
    });

     (document.getElementById('color-wheel') as HTMLElement).addEventListener('click', async (): Promise<void> => {
        // Convert the chosen RGB color to HSL
        let hsl = rgbToHSB(colorRGB.r,colorRGB.g,colorRGB.b);
        console.log(colorPicker);
        lampen[colorPicker].hue=hsl.hue;
        
        lampen[colorPicker].bri=hsl.bri;
        lampen[colorPicker].sat=hsl.sat;
        // Setting the color on the lamp
        await setLightColor(Number(lampen[colorPicker].id),lampen[colorPicker].hue,lampen[colorPicker].bri,lampen[colorPicker].sat);
        // Adjust the information on the DOM
        (document.getElementById("bulb" + lampen[colorPicker].name) as HTMLElement).style.color = "hsl(" + (360*lampen[colorPicker].hue/65535) + "," + (100*lampen[colorPicker].sat/254) + "%," + (100*lampen[colorPicker].bri/254) + "%)";
        (document.getElementById("dimming" + lampen[colorPicker].name) as HTMLFormElement).value = lampen[colorPicker].bri;
        // deactivate colorpicker again
        colorPicker=-1;
        (document.getElementById('choosecolor') as HTMLElement).style.display= "none";
    });
}

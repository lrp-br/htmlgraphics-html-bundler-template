import { renderer } from "./onInit";

console.log('onRender start')

render(); // call main function of onRender
function render(): void {
    // get state string from db
    const valueField = data.series[0].fields[1];
    const arrayLength = valueField.values.length;
    const value = valueField.values.get(arrayLength - 1);

    //check if value exists before continuing
    if (!value) {
        console.log('No new value', value)
        return;
    }

    //change background color based on state
    if (value) {
        switch (value) {
            case 'Stopped':
                renderer?.setClearColor(0xE44C5C);
                break;
            case 'Resetting':
                renderer?.setClearColor(0x267EB6);
                break;
            case 'Idle':
                renderer?.setClearColor(0x3BB626);
                break;
            case 'Starting':
                renderer?.setClearColor(0xB62E26);
                break;
            case 'Execute':
                renderer?.setClearColor(0x6B4CE4);
                break;
            case 'Aborting':
                renderer?.setClearColor(0x51E44C);
                break;
            case 'Aborted':
                renderer?.setClearColor(0x4C60E4);
                break;
            case 'Clearing':
                renderer?.setClearColor(0x4CC8E4);
                break;
            case 'Stopping':
                renderer?.setClearColor(0x4CE4CA);
                break;
        }
        console.log(value);
    } 
    console.log('reached bottom of onRender');
}



 /* CODE FOR USE WHEN ONLY USING LOCALHOST VIA "npm run dev"
 *------------- Sets value as randomized state -------------*/

// setInterval(function setRandomState(): void {
//     const states = ["Stopped", "Resetting", "Idle", "Starting", "Execute", "Aborting", "Aborted", "Clearing", "Stopping"];

//     const random = Math.floor(Math.random() * states.length);
//     let value = states[random];
//     console.log(random, states[random]);


//     if (value) {
//         switch (value) {
//             case 'Stopped':
//                 renderer.setClearColor(0xE44C5C);
//                 break;
//             case 'Resetting':
//                 renderer.setClearColor(0x267EB6);
//                 break;
//             case 'Idle':
//                 renderer.setClearColor(0x3BB626);
//                 break;
//             case 'Starting':
//                 renderer.setClearColor(0xB62E26);
//                 break;
//             case 'Execute':
//                 renderer.setClearColor(0x6B4CE4);
//                 break;
//             case 'Aborting':
//                 renderer.setClearColor(0x51E44C);
//                 break;
//             case 'Aborted':
//                 renderer.setClearColor(0x4C60E4);
//                 break;
//             case 'Clearing':
//                 renderer.setClearColor(0x4CC8E4);
//                 break;
//             case 'Stopping':
//                 renderer.setClearColor(0x4CE4CA);
//                 break;
//         }
//         console.log(value);

//     }

//     console.log('rendering complete');
// }, 5000)

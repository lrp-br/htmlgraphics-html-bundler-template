import { camera, controls, renderer, scene } from "./onInit";

console.log('hello world')

// get state string from db
const valueField = data.series[0].fields[1];
const arrayLength = valueField.values.length;
const value = valueField.values.get(arrayLength - 1);


if(value) {
  switch(value) {
    case 'Stopped': 
        renderer.setClearColor(0xE44C5C);
        break;
    case 'Resetting':
        renderer.setClearColor(0x267EB6);
        break;
    case 'Idle':
        renderer.setClearColor(0x3BB626);
        break;
    case 'Starting': 
        renderer.setClearColor(0xB62E26);
        break;
    case 'Execute':
        renderer.setClearColor(0x6B4CE4);
        break;
    case 'Aborting':
        renderer.setClearColor(0x51E44C);
        break;
    case 'Aborted':
        renderer.setClearColor(0x4C60E4);
        break;
    case 'Clearing':
        renderer.setClearColor(0x4CC8E4);
        break;
    case 'Stopping':
        renderer.setClearColor(0x4CE4CA);
        break;
  }
  console.log(value);
}
// Render loop
function animate(): void {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();

console.log('rendering complete');
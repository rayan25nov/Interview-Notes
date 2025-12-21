// import events module
const EventEmitter = require("events");

// create an event emitter object
const eventEmitter = new EventEmitter();
// create an event handler
const eventHandler = () => {
  console.log("Event occurred: Custom event has been triggered!");
};
// assign the event handler to an event
eventEmitter.on("customEvent", eventHandler);

// trigger the event
eventEmitter.emit("customEvent");

// events arguments example
const eventHandlerWithArgs = (arg1, arg2) => {
  console.log(`Event occurred with arguments: ${arg1}, ${arg2}`);
}
eventEmitter.on("eventWithArgs", eventHandlerWithArgs);
eventEmitter.emit("eventWithArgs", "Argument 1", "Argument 2");


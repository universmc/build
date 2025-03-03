// Create a data channel from a peer connection
const dc = pc.createDataChannel("oai-events");

// Listen for server-sent events on the data channel - event data 
// will need to be parsed from a JSON string
dc.addEventListener("message", (e) => {
  const realtimeEvent = JSON.parse(e.data);
  console.log(realtimeEvent);
});

// Send client events by serializing a valid client event to
// JSON, and sending it over the data channel
const responseCreate = {
  type: "response.create",
  response: {
    modalities: ["text"],
    instructions: "Write a haiku about code",
  },
};
dc.send(JSON.stringify(responseCreate));
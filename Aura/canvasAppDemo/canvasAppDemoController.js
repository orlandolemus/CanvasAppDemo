({
    init: function(component, event, helper) {
        console.log("Aura window location:", window.location.href);
        
        window.addEventListener("message", function(e) {
            // Log all messages for debug
            console.log('Received postMessage:', e.data);

            // Only handle actual Canvas SDK custom events
            if (e.data && e.data.type === "canvas-iframe-message") {
                var canvasEvent = e.data.payload;

                if (canvasEvent && canvasEvent.name === "canvasToAuraEvent") {
                    var msg = canvasEvent.payload.message;
                    var time = canvasEvent.payload.time;

                    console.log("Canvas event received:", msg, time);

                    $A.get("e.force:showToast").setParams({
                        title: "Canvas App Message",
                        message: msg + " at " + time,
                        type: "success"
                    }).fire();
                }
            }
        });
    }
})

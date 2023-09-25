/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const apiAction = new Action('com.andersonannex.realninja.apiaction');
const apiToggleAction = new Action('com.andersonannex.realninja.apitoggleaction');

async function getURL(url) {
	var controller = new AbortController();
	var signal = controller.signal;

	try {
		var timeoutId = setTimeout(() => controller.abort(), 5000)
		var response = await fetch(url, { signal });
		clearTimeout(timeoutId);
		var parsedResponse = await response.json();
	} catch (error) {
		var parsedResponse = {success: false, message: "error: "+error};
	}
	return(parsedResponse);
}

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected((jsn = { actionInfo, appInfo, connection, messageType, port, uuid }) => {
});

apiAction.onWillAppear((jsn) => {
	$SD.getSettings(jsn.context);
});

apiAction.onDidReceiveSettings((jsn) => {
		//saveSettings to action
		apiAction.url = jsn.payload.settings.url;
		apiAction.responsefield = jsn.payload.settings.responsefield;
	}
); 

apiAction.onKeyUp(async ({ action, context, device, event, payload }) => {
	var response = await getURL(apiAction.url);
	console.log(response);
	if(response.success) {
		$SD.showOk(context);
	} else {
		$SD.showAlert(context);
	}
});



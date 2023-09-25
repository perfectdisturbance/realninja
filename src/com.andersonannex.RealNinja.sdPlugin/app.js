/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const apiAction = new Action('com.andersonannex.realninja.apiaction');
const apiToggleAction = new Action('com.andersonannex.realninja.apitoggleaction');
var settingsCache = {};

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
		//saveSettings to the cache
		if(!settingsCache.hasOwnProperty(jsn.context)) {
			settingsCache[jsn.context] = {};
		}
		settingsCache[jsn.context].url = jsn.payload.settings.url;
		settingsCache[jsn.context].method = jsn.payload.settings.method;
		settingsCache[jsn.context].reqpayload = jsn.payload.settings.reqpayload;
		settingsCache[jsn.context].successfield = jsn.payload.settings.successfield;
	}
); 

apiAction.onKeyUp(async ({ action, context, device, event, payload }) => {
	var response = await getURL(settingsCache[context].url);
	console.log(response);
	if(response[settingsCache[context].successfield]) {
		$SD.showOk(context);
	} else {
		$SD.showAlert(context);
	}
});



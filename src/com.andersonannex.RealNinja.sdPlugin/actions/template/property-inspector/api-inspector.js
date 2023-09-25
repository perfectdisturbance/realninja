/// <reference path="../../../libs/js/property-inspector.js" />
/// <reference path="../../../libs/js/utils.js" />

$PI.onConnected((jsn) => {
    const form = document.querySelector('#property-inspector');
    const {actionInfo, appInfo, connection, messageType, port, uuid} = jsn;
    const {payload, context} = actionInfo;
    const {settings} = payload;

    Utils.setFormValue(settings, form);

    form.addEventListener(
        'input',
        Utils.debounce(150, () => {
            const value = Utils.getFormValue(form);
            $PI.setSettings(value);
        })
    );
});

$PI.onDidReceiveSettings(({payload}) => {
    console.log('onDidReceiveGlobalSettings', payload);
})

$PI.onPropertyInspectorDidAppear(() => {
    console.log("PI appeared");
    $PI.getSettings();
});

/**
 * Provide window level functions to use in the external window
 * (this can be removed if the external window is not used)
 
window.sendToInspector = (data) => {
    console.log(data);
};

document.querySelector('#open-external').addEventListener('click', () => {
    window.open('../../../external.html');
});*/

document.querySelectorAll('textarea').forEach(e => {
    const maxl = e.getAttribute('maxlength');
    e.targets = document.querySelectorAll(`[for='${e.id}']`);
    if (e.targets.length) {
        let fn = () => {
            for(t of e.targets) {
                t.innerText = maxl ? `${e.value.length}/${maxl}` : `${e.value.length}`;
            }
        };
        fn();
        e.onkeyup = fn;
    }
});

function saveSettings() {
    var settings = {
        url: document.querySelector('#url').value,
        method: document.querySelector('#method').value,
        payload: document.querySelector('#payload').value,
        responsefield: document.querySelector('#successfield').value
    }
    console.log(settings);
    $PI.setSettings({context: $PI.context, payload: settings});
}

function loadSettings(jsn) {
    console.log(jsn);
}

document.querySelectorAll('.settingkey').forEach(e => {
    e.onkeyup = (() => { saveSettings(); });
})

document.querySelectorAll('.settingchange').forEach(e => {
    e.onchange = (() => { saveSettings() });
})
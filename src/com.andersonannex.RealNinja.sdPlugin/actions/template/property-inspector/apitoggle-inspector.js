/// <reference path="../../../libs/js/property-inspector.js" />
/// <reference path="../../../libs/js/utils.js" />

/*$PI.onConnected((jsn) => {
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

$PI.onDidReceiveGlobalSettings(({payload}) => {
    console.log('onDidReceiveGlobalSettings', payload);
})*/

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


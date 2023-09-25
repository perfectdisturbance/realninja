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
            console.log(value);
            $PI.setSettings(value);
        })
    );
});

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

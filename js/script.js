'use strict';

const settingsContainer = document.querySelector('.settings-content');
const buttons = settingsContainer.querySelectorAll('button[data-setting-name]');

function dashToCamelCase(str) {
    return str.replace(/-([a-z])/g, function(g) {return g[1].toUpperCase();});
}

function applySettings(params, elem) {
    for (const key of Object.keys(params)) {
        elem.dataset[key] = params[key];
    }
}

function setActiveButton(buttonClicked, params) {
    for (const key of Object.keys(params)) {
        Array.from(buttons).filter((button) => {
            button.dataset['settingName'] = key;
        }).forEach((targetButton) => {
            targetButton.classList.remove('active');
        });
        buttonClicked.classList.add('active');
    }
    
}

function buttonClickHandler(el) {
    const buttonClicked = el.closest('button');
    if (!buttonClicked) {
        return;
    } 
    const {settingName, settingValue} = buttonClicked.dataset;
    const params = {};
    params[dashToCamelCase(settingName)] = settingValue;

    const elem = document.documentElement;

    applySettings(params, elem);
    setActiveButton(buttonClicked, params);
}

function init() {
    settingsContainer.addEventListener('click', (e) => {
        buttonClickHandler(e.target);
    });
};

init();

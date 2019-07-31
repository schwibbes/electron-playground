'use strict';

const { ipcRenderer } = require('electron')
let configValues = [...document.querySelectorAll('[config-value]')];
let successMessage = document.getElementById('success-message');

ipcRenderer.on('apply-success', (event, arg) => {
    console.log(arg)
    successMessage.classList.remove('d-none')
})

document.getElementById('btn-apply').addEventListener("click", e => {
    let configuration = configValues.map(element => {
        return {
            name: element.attributes['config-value'].value,
            val: element.value
        }
    });
    console.log(configuration)
    ipcRenderer.send('apply-config', configuration)
})
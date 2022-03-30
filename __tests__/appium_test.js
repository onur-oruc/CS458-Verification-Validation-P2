const wdio = require('webdriverio');
const assert = require('assert');
//const selectByIndex = require("webdriverio/build/commands/element/selectByIndex");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "11",
    deviceName: "emulator-5554",
    app: "C:\\Users\\User\\Desktop\\Klonlama\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
    // appPackage: "io.appium.android.apis",
    // appActivity: ".view.TextFields",
    automationName: "UiAutomator2"
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main () {
  const client = await wdio.remote(opts);
  await sleep(5000);
  const field = await client.$("~namebox");
  await field.setValue("Kubra");
  const field2 = await client.$("~surnamebox").setValue("Okumus");

  //let namefield = await client.findElement('accessibility id', "1234789")

  await sleep(20000)

  await client.deleteSession();
}

main();

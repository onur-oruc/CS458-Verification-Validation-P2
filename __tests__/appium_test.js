const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "11",
    deviceName: "emulator-5554",
    app: "C:\\Users\\User\\Desktop\\cs458\\p2\\CS458-Verification-Validation-P2\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
    automationName: "UiAutomator2"
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendButtonTest (client) {
  var missingFieldsText = 'Missing Fields\n' +
    'Fill the following fields: City, Gender, Vaccine Type, Positive cases after 3rd vaccination'
  await client.$("~namebox").setValue("Kubra");
  await client.$("~surnamebox").setValue("Okumus");

  await client.$("~sendButton").click();
  await sleep(2000)
  let text = await client.getAlertText()
  await client.acceptAlert()
  try {
    assert.strictEqual(missingFieldsText,text);
    console.log("Missing Fields test is succesfull");
  } catch(error) {console.log("Error: ", error)}
}

async function RadioButtonTest(client) {

  let a = await client.$("~male").click();
  await client.$("~female").click();
  await sleep(2000)

  //click male and female
  let maleChecked = await client.$("~male").getAttribute("checked")
  let femaleChecked = await client.$("~female").getAttribute("checked")
  let otherChecked = await client.$("~other").getAttribute("checked")
  try {
    assert.strictEqual(maleChecked,"false");
    assert.strictEqual(femaleChecked,"true");
    assert.strictEqual(otherChecked,"false");
    console.log("successful");
  } catch(error) {console.log("Error: ", error)}

  await console.log("male", maleChecked)
  await console.log("female", femaleChecked)
}

async function runTestCases () {
  const client = await wdio.remote(opts);
  //await sendButtonTest(client)
  await RadioButtonTest(client)
  await client.deleteSession();
}

runTestCases();

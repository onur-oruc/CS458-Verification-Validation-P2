const wdio = require('webdriverio');
const assert = require('assert');
const {
  assertBoolean,
  assertString,
} = require('@babel/core/lib/config/validation/option-assertions');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    platformVersion: '11',
    deviceName: 'emulator-5554',
    app: 'C:\\Users\\User\\Desktop\\cs458\\p2\\CS458-Verification-Validation-P2\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk',
    automationName: 'UiAutomator2',
  },
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendButtonTest(client) {
  const scroll =
    '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[3]/android.widget.Button[1]';
  const ankara =
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[3]';
  const confirmDate =
    '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]';
  const biontech =
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]';

  // check whether the send button is enabled
  let isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'false');
    console.log('Send button is not enabled at the beginnng');
  } catch (error) {
    console.log('Error: ', error);
  }

  await sleep(200);
  await client.$('~namebox').setValue('Kubra');
  await client.$('~surnamebox').setValue('Okumus');

  await client.$('~bdayButton').click();
  for (var i = 0; i < 15; i++) {
    await client.$(scroll).click();
  }
  await client.$(confirmDate).click();

  await client.$('~cityPicker').click();
  await sleep(200);
  await client.$(ankara).click();

  await client.$('~female').click();

  await client.$('~vaxPicker').click();
  await client.$(biontech).click();

  await client.$('~no').click();

  await sleep(200);
  isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'true');
    console.log('Send button is enabled after required fields are filled');
  } catch (error) {
    console.log('Error: ', error);
  }

  await client.$('~namebox').setValue('');

  isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'false');
    console.log('Send button is disabled after lefting the name field empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  await sleep(2000);
}

async function RadioButtonTest(client) {
  let maleChecked = await client.$('~male').getAttribute('checked');
  let femaleChecked = await client.$('~female').getAttribute('checked');
  let otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'false');
    assert.strictEqual(otherChecked, 'false');
    console.log('button test 1:successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  //click male and female
  await client.$('~male').click();
  await client.$('~female').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'true');
    assert.strictEqual(otherChecked, 'false');
    console.log('button test 2:successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  // click female then male
  await client.$('~female').click();
  await client.$('~male').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'true');
    assert.strictEqual(femaleChecked, 'false');
    assert.strictEqual(otherChecked, 'false');
    console.log('button test 3: successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  // click female, then other
  await client.$('~female').click();
  await client.$('~other').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'false');
    assert.strictEqual(otherChecked, 'true');
    console.log('button test 4: successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  // click other, then female
  await client.$('~other').click();
  await client.$('~female').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'true');
    assert.strictEqual(otherChecked, 'false');
    console.log('button test 5: successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  // click all of them
  await client.$('~female').click();
  await client.$('~male').click();
  await client.$('~other').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'false');
    assert.strictEqual(otherChecked, 'true');
    console.log('button test 6: successful');
  } catch (error) {
    console.log('Error: ', error);
  }

  // click all of them
  await client.$('~female').click();
  await client.$('~yes').click();
  await sleep(2000);
  femaleChecked = await client.$('~female').getAttribute('checked');
  let yesChecked = await client.$('~yes').getAttribute('checked');
  let noChecked = await client.$('~no').getAttribute('checked');
  console.log('no:', noChecked);
  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'true');
    assert.strictEqual(otherChecked, 'false');
    assert.strictEqual(yesChecked, 'true');
    assert.strictEqual(noChecked, 'false');
    console.log('button test 7: successful');
  } catch (error) {
    console.log('Error: ', error);
  }
}

async function PCRPosTestCase(client) {
  let textbox = '//android.view.ViewGroup[@content-desc="symptomstextbox"]';
  await sleep(2000);
  await client.$('~yes').click();
  await sleep(200);
  let a = await client.$(textbox);
  console.log('aaaa: ', a);
  try {
    await client.$(textbox).toBePresent();
    console.log('symptoms text box is appeared');
  } catch (error) {
    console.log('Error: ', error);
  }

  await client.$('~no').click();
  await sleep(2000);
  try {
    await client.$(textbox).toBePresent();
  } catch (error) {
    console.log('Error: ', error);
  }
}

async function runTestCases() {
  const client = await wdio.remote(opts);

  //await sendButtonTest(client)
  //await RadioButtonTest(client);
  await PCRPosTestCase(client);

  await client.deleteSession();
}

runTestCases();

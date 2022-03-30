const wdio = require('webdriverio');
const assert = require('assert');

const {
  assertBoolean,
  assertString,
} = require('@babel/core/lib/config/validation/option-assertions');
const getValue = require('webdriverio/build/commands/element/getValue');

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

const months = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  June: 5,
  July: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const city =
  '//android.widget.Spinner[@content-desc="cityPicker"]/android.widget.TextView';
const vaccine =
  '//android.widget.Spinner[@content-desc="vaxPicker"]/android.widget.TextView';
const scrollup =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[3]/android.widget.Button[1]';
const scrolldownmonth =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[1]/android.widget.Button[2]';
const scrolldownday =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[2]/android.widget.Button[2]';
const ankara =
  '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[3]';
const confirmDate =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]';
const biontech =
  '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]';
const year =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[3]/android.widget.EditText';
const bday =
  '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]';
const scroll =
  '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[3]/android.widget.Button[1]';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function invalidInputTest(client) {
  await sleep(2000);
  await client.$('~namebox').setValue('Kubra');
  await client.$('~surnamebox').setValue('Okumus');
  await client.$('~cityPicker').click();
  await sleep(200);
  await client.$(ankara).click();
  await client.$('~female').click();
  await client.$('~vaxPicker').click();
  await client.$(biontech).click();
  await client.$('~no').click();

  //invalid birthday test
  await sleep(200);

  await client.$('~bdayButton').click();
  await client.$(scrolldownmonth).click();
  await client.$(scrolldownday).click();

  await client.$(confirmDate).click();

  let birtDate = await getBday(client);
  let currentdate = new Date().getTime();
  try {
    let validDate = currentdate >= birtDate;
    await assert.strictEqual(validDate, true);
    console.log('Valid birth date');
  } catch (error) {
    console.log('Error: ', error);
  }

  //invalid name test
  await client.$('~namebox').setValue('invalidname123');

  let isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'false');
    console.log('Send button is disabled because of the invalid name');
  } catch (error) {
    console.log('Error: ', error);
  }

  //invalid surname test
  await client.$('~namebox').setValue('Kubra');
  await client.$('~surnamebox').setValue('invalidsurname123');

  isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'false');
    console.log('Send button is disabled because of the invalid surname');
  } catch (error) {
    console.log('Error: ', error);
  }
  await sleep(2000);
}

async function sendButtonTest(client) {
  // check whether the send button is enabled
  let isEnabled = await client.$('~sendButton').getAttribute('enabled');
  try {
    await assert.strictEqual(isEnabled, 'false');
    console.log('Send button is not enabled at the beginnig');
  } catch (error) {
    console.log('Error: ', error);
  }
  await sleep(200);
  await client.$('~namebox').setValue('Kubra');
  await client.$('~surnamebox').setValue('Okumus');

  await client.$('~bdayButton').click();
  for (var i = 0; i < 5; i++) {
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

  // click female and yes
  await client.$('~female').click();
  await client.$('~yes').click();
  await sleep(2000);
  maleChecked = await client.$('~male').getAttribute('checked');
  femaleChecked = await client.$('~female').getAttribute('checked');
  otherChecked = await client.$('~other').getAttribute('checked');
  let yesChecked = await client.$('~yes').getAttribute('checked');
  let noChecked = await client.$('~no').getAttribute('checked');
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
  await sleep(2000);
  await client.$('~yes').click();
  await sleep(200);

  let existence = await client.$('~symptomstextbox').isExisting();

  try {
    assert.strictEqual(existence, true);
    console.log('Textbox has appeared');
  } catch (error) {
    console.log('Error: ', error);
  }

  await client.$('~no').click();
  await sleep(2000);
  existence = await client.$('~symptomstextbox').isExisting();
  try {
    assert.strictEqual(existence, false);
    console.log('Textbox has disappeared');
  } catch (error) {
    console.log('Error: ', error);
  }
}

async function resetAfterSubmitTest(client) {
  await client.$('~namebox').setValue('Kubra');
  await client.$('~surnamebox').setValue('Okumus');

  await client.$('~bdayButton').click();
  for (var i = 0; i < 5; i++) {
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
  await client.$('~sendButton').click();
  await sleep(1000);
  await client.acceptAlert();

  let nametext = await client.$('~namebox').getText();
  let surnametext = await client.$('~surnamebox').getText();
  let maleChecked = await client.$('~male').getAttribute('checked');
  let femaleChecked = await client.$('~female').getAttribute('checked');
  let otherChecked = await client.$('~other').getAttribute('checked');
  let yesChecked = await client.$('~yes').getAttribute('checked');
  let noChecked = await client.$('~no').getAttribute('checked');
  let currentcity = await client.$(city).getText();
  let currentvax = await client.$(vaccine).getText();

  try {
    assert.strictEqual(nametext, 'Name');
    console.log('Name field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  try {
    assert.strictEqual(surnametext, 'Surname');
    console.log('Surname field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  try {
    assert.strictEqual(maleChecked, 'false');
    assert.strictEqual(femaleChecked, 'false');
    assert.strictEqual(otherChecked, 'false');
    console.log('Gender field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  try {
    assert.strictEqual(yesChecked, 'false');
    assert.strictEqual(noChecked, 'false');
    console.log('positive case field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  try {
    assert.strictEqual(currentcity, '---Select Your City---');
    console.log('city field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }

  try {
    assert.strictEqual(currentvax, '---Select Vaccine Type---');
    console.log('vaccine type field is empty');
  } catch (error) {
    console.log('Error: ', error);
  }
}

async function getBday(client) {
  let date = await client.$(bday).getAttribute('text');
  let counter = 0;
  let year2 = '';
  let day = '';
  let month = '';
  for (let i = date.length; i > 0; --i) {
    if (counter == 0) {
      year2 = date.substring(i - 4, i);
      i = i - 6;
      counter++;
    }
    if (counter == 1) {
      let temp = i;
      let flag = false;
      while (!flag) {
        if (date.substring(temp, temp + 1) === ' ') {
          flag = true;
        } else {
          temp--;
        }
      }
      day = date.substring(temp + 1, i);
      counter++;
      i = temp;
    } else {
      let temp = i;
      let flag = false;
      while (!flag) {
        if (date.substring(temp, temp + 1) === ' ') {
          flag = true;
        } else {
          temp--;
        }
      }
      month = date.substring(temp + 1, i);
      break;
    }
  }
  return new Date(year2 + '-' + month + '-' + day).getTime();
}

async function runTestCases() {
  const client = await wdio.remote(opts);

  await invalidInputTest(client);
  await sendButtonTest(client);
  await RadioButtonTest(client);
  await PCRPosTestCase(client);
  await resetAfterSubmitTest(client);

  await client.deleteSession();
}

runTestCases();

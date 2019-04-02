/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

function addChoice(form, value, text) {
  const choice = document.createElement('input');
  choice.id = `bdc_${value}Choice`;
  choice.type = 'radio';
  choice.value = value;
  choice.name = 'bug_nobug_choice';

  const choiceLabel = document.createElement('label');
  choiceLabel.htmlFor = choice.id;
  choiceLabel.textContent = text;

  form.appendChild(choice);
  form.appendChild(choiceLabel);
  form.appendChild(document.createElement('br'));

  return choice;
}

(function() {
  const bugId = document.getElementById('bug_id').value;

  const new_comment_actions = document.getElementById('new-comment-actions');
  if (!new_comment_actions) {
    return;
  }

  const form = document.createElement('form');

  const regressionChoice = addChoice(form, 'regression', 'Regression');
  const bugChoice = addChoice(form, 'bug', 'Bug (but not a regression)');
  const unknownregressionChoice = addChoice(form, 'bug_unknown_regression', 'Bug (unknown if it is a regression)');
  const nobugChoice = addChoice(form, 'nobug', 'Not a bug');

  const qa_form = document.createElement('form');

  const qaneededChoice = addChoice(qa_form, 'qaneeded', 'Bug that needs QA');
  const noqaneededChoice = addChoice(qa_form, 'noqaneeded', 'Bug that doesn\'t need QA');

  const keywords = document.getElementById('field-keywords').textContent;
  const flags = document.getElementById('module-firefox-tracking-flags-content');
  if ((keywords && keywords.includes('qawanted')) || (flags && flags.textContent.includes('qe-verify'))) {
    qaneededChoice.checked = true;
  } else {
    noqaneededChoice.checked = true;
  }

  const submit = document.createElement('button');
  const qa_submit = document.createElement('button');
  submit.textContent = 'Submit';
  qa_submit.textContent = 'Submit';
  submit.onclick = function(e) {
    e.preventDefault();

    let regression_bug_nobug;
    if (regressionChoice.checked) {
      regression_bug_nobug = 'regression'
    } else if (unknownregressionChoice.checked) {
      regression_bug_nobug = 'bug_unknown_regression';
    } else if (bugChoice.checked) {
      regression_bug_nobug = 'bug_no_regression';
    } else if (nobugChoice.checked) {
      regression_bug_nobug = 'nobug';
    } else {
      alert('You need to select something!');
    }

    browser.storage.sync.get('regression_bug_nobug').then(function(data) {
      data = data['regression_bug_nobug'];
      if (typeof data  === 'undefined') {
        data = {[bugId]: regression_bug_nobug};
      } else {
        data[bugId] = regression_bug_nobug;
      }
      browser.storage.sync.set({['regression_bug_nobug']: data});
    });
  };
  qa_submit.onclick = function(e) {
    e.preventDefault();

    let qa;
    if (qaneededChoice.checked) {
      qa = 'qaneeded';
    } else if (noqaneededChoice.checked) {
      qa = 'noqaneeded';
    } else {
      alert('You need to select something!');
    }

    browser.storage.sync.get('qaneeded').then(function(data) {
      data = data['qaneeded'];
      if (typeof data  === 'undefined') {
        data = {[bugId]: qa};
      } else {
        data[bugId] = qa;
      }
      browser.storage.sync.set({['qaneeded']: data});
    });
  };

  new_comment_actions.appendChild(document.createElement('br'));
  new_comment_actions.appendChild(form);
  form.appendChild(document.createElement('br'));
  form.appendChild(submit);
  new_comment_actions.appendChild(document.createElement('br'));
  new_comment_actions.appendChild(qa_form);
  qa_form.appendChild(document.createElement('br'));
  qa_form.appendChild(qa_submit);
})();


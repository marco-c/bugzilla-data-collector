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

  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  submit.onclick = function(e) {
    e.preventDefault();

    let categorization;
    if (regressionChoice.checked) {
      categorization = 'regression'
    } else if (unknownregressionChoice.checked) {
      categorization = 'bug_unknown_regression';
    } else if (bugChoice.checked) {
      categorization = 'bug_no_regression';
    } else if (nobugChoice.checked) {
      categorization = 'nobug';
    } else {
      alert('You need to select something!');
    }

    browser.storage.sync.set({
      [bugId]: categorization,
    });
  };

  new_comment_actions.appendChild(document.createElement('br'));
  new_comment_actions.appendChild(form);
  form.appendChild(document.createElement('br'));
  form.appendChild(submit);
})();

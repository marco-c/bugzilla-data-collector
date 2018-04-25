/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

(function() {
  const bugId = document.getElementById('bug_id').value;

  const new_comment_actions = document.getElementById('new-comment-actions');
  if (!new_comment_actions) {
    return;
  }

  const form = document.createElement('form');
  const bugChoice = document.createElement('input');
  bugChoice.id = 'bdc_bugChoice';
  bugChoice.type = 'radio';
  bugChoice.value = 'bug';
  bugChoice.name = 'bug_nobug_choice';
  const bugChoiceLabel = document.createElement('label');
  bugChoiceLabel.htmlFor = bugChoice.id;
  bugChoiceLabel.textContent = 'bug';
  const nobugChoice = document.createElement('input');
  nobugChoice.id = 'bdc_nobugChoice';
  nobugChoice.type = 'radio';
  nobugChoice.value = 'nobug';
  nobugChoice.name = 'bug_nobug_choice';
  const nobugChoiceLabel = document.createElement('label');
  nobugChoiceLabel.htmlFor = nobugChoice.id;
  nobugChoiceLabel.textContent = 'nobug';
  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  submit.onclick = function(e) {
    e.preventDefault();

    if (!bugChoice.checked && !nobugChoice.checked) {
      alert('You need to select something!');
    }

    if (bugChoice.checked && nobugChoice.checked) {
      alert('Both options are checked, something has gone really wrong!');
    }

    browser.storage.sync.set({
        [bugId]: bugChoice.checked ? 1 : 0,
    });
  };

  new_comment_actions.appendChild(document.createElement('br'));
  new_comment_actions.appendChild(form);
  form.appendChild(bugChoice);
  form.appendChild(bugChoiceLabel);
  form.appendChild(nobugChoice);
  form.appendChild(nobugChoiceLabel);
  form.appendChild(document.createElement('br'));
  form.appendChild(submit);
})();

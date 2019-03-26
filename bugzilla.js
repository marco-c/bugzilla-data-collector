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

  const qaChoice = addChoice(qa_form, 'qa', 'Bug that need QA');
  const noqaChoice = addChoice(qa_form, 'noqa', 'Bug that doesn\'t need QA');

  const keywords = document.getElementById('field-keywords').textContent;
  const flags = document.getElementById('module-firefox-tracking-flags-content');
  if(keywords && keywords.includes('qawanted') || flags && flags.textContent.includes('qe-verify')){
    qaChoice.checked = true;
  } else {
    noqaChoice.checked = true;
  }

  const submit = document.createElement('button');
  const qa_submit = document.createElement('button');
  submit.textContent = 'Submit';
  qa_submit.textContent = 'Submit';
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

    browser.storage.sync.get("categorization").then(function(data){
      data = data["categorization"];
      if(typeof data  === 'undefined'){
        data = {[bugId]: categorization};
      } else {
        data[bugId] = categorization;
      }
      browser.storage.sync.set({["categorization"]: data});
    });
  };
  qa_submit.onclick = function(e) {
    e.preventDefault();

    let qa;
    if(qaChoice.checked){
      qa = "qa";
    } else if (noqaChoice.checked){
      qa = "noqa";
    } else {
      alert('You need to select something!');
    }

    browser.storage.sync.get("qa").then(function(data){
      data = data["qa"];
      console.log(data);
      if(typeof data  === 'undefined'){
        data = {[bugId]: qa};
      } else {
        data[bugId] = qa;
      }
      browser.storage.sync.set({["qa"]: data});
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


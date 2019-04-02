function downloadCsv(data){
  let csv = 'bug_id,category\n';
  for (let bugId in data) {
    csv += `${bugId},${data[bugId]}\n`;
  }

  let blob = new Blob([csv], {
    type: 'text/csv',
  });

  return browser.downloads.download({
    url : window.URL.createObjectURL(blob),
    filename : 'data.csv',
  });

}
document.getElementById('downloadRegressionBugNobugData').onclick = function() {
  browser.storage.sync.get('regression_bug_nobug')
    .then(function(data) {
      return downloadCsv(data['regression_bug_nobug']);
    })
    .catch(function(e) {
      alert('Error ' + e);
    });
};
document.getElementById('downloadQaNeededData').onclick = function() {
  browser.storage.sync.get('qaneeded')
    .then(function(data) {
      return downloadCsv(data['qaneeded']);
    })
    .catch(function(e) {
      alert('Error ' + e);
    });
};

document.getElementById('clearData').onclick = function() {
  browser.storage.sync.clear()
    .then(function() {
      alert('Data cleared!');
    });
};


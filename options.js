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
document.getElementById('downloadCategorizationData').onclick = function() {
  browser.storage.sync.get("categorization")
    .then(function(data) {
      return downloadCsv(data["categorization"]);
    })
    .catch(function(e) {
      alert('Error ' + e);
    });
};
document.getElementById('downloadQaData').onclick = function() {
  browser.storage.sync.get("qa")
    .then(function(data) {
      return downloadCsv(data["qa"]);
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


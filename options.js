document.getElementById('downloadData').onclick = function() {
  browser.storage.sync.get()
  .then(function(data) {
      let blob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });

      return browser.downloads.download({
        url : window.URL.createObjectURL(blob),
        filename : 'data.json',
      });
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

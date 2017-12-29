$('#run').click(function() {
  var root = location.protocol + '//jsonplaceholder.typicode.com';
  $.ajax({
    url: root + '/posts/1',
    method: 'GET'
  }).then(function(data) {
    var str = JSON.stringify(data, null, '\t')
    $('#result').html(
      str.replace(/\n/g, '<br/>')
        .replace(/\\n/g, ' ')
        .replace(/\t/g, '&nbsp;&nbsp;')
    );
  });
});
$( document ).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    dataType: 'json',
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
    success: function(data) {
      var title = data[0].title.toUpperCase().slice(1,20);
      $('.latest-news.module--width50 .news-feed__heading--green').text('News from API Request');

      for (var i = 0; i < 10; i++) {
        addItemToFeed({
          "ranking": data[i].id,
          "title": data[i].title,
          "url": 'https://www.example.com/' + data[i].title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
        });
      }
    }
  });

  function addItemToFeed(item) {

    var newsItem = $('<li/>', {
        'class':'news-feed__item'
    })

    var ranking = $('<span/>', {
        'class':'news-feed__item-rank',
        'html': item.ranking+"."
    }).appendTo(newsItem);

    var headline = $('<a/>', {
        'class':'news-feed__item-headline news-feed__item-headline--black',
        'href': item.url,
        'html': item.title
    }).appendTo(newsItem);

    newsItem.appendTo('.module--width50 .news-feed__list');

  };
});

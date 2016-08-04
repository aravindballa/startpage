var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

$( document ).ready(function() {

  $.ajax({
    url : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A%2F%2Fwww.google.com%2Ftrends%2Fhottrends%2Fatom%2Ffeed%3Fpn%3Dp3',
    type: 'GET',
    beforeSend: function (request) {
                request.setRequestHeader("Access-Control-Allow-Origin", "*");
    },
    success: function(data){
        var datadict = JSON.parse(data);
        var entries = datadict.responseData.feed.entries;
        console.log(entries[0]);
        $("li > a > .trend-content > h5").each(function(index){
          $(this).html(entries[index].title);
        });
        $("li > a > .trend-content > span").each(function(index){
          $(this).html(new Date(entries[index].publishedDate)
          .toLocaleDateString("en-US", options));
        });
        $("li > a").each(function(index){
          $(this).attr("href", "http://www.google.com/search?q="+ entries[index].title.split(" ").join("+"));
          $(this).attr("target", "_blank");
        });
    }
  });

});

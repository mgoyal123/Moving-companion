
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    // $('.bgimg').attr('src',function() {
    //     return (this.src + $street +" "+ $city + key);
    // });
    $greeting.text('So, you want to live at '+$street +","+ $city+'?');
    streetviewUrl= "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+ $street +","+ $city +"&key= AIzaSyBMsdetpHabbmwwLIB1GAgf-3nRJD_YrNI ";
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "c5f7c1569e7849128c1e39373225da31",
        'q' : $city
        });
    
    $.getJSON(url,function(data) {
        $nytHeaderElem.text("New York Times Articles about "+ $city);
        var items = [];
        for(i in data.response.docs) {
            items.push( "<li class = 'article'> <a href = '"+data.response.docs[i].web_url +"'>"+ data.response.docs[i].headline.main +"</a> <p>"+ data.response.docs[i].snippet+"</li>" );
            // console.log(items[i]);
        };
        // console.log(items)
        $nytElem.append(items);
    }).fail(function(err) {
        $nytHeaderElem.text("New York Times Articles could not be loaded");
    });

    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("Failed to get wikipedia resources")
  }, 8000);
    var wiki_url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ $city+"&format=json&callback=wikiCallback";
    $.ajax({url: wiki_url, dataType : "jsonp"}).success(function(data){
        var items = [];
        for (i in data[1]){
            items.push("<li> <a href='"+data[3][i]+"'>"+data[1][i]+"</a></li>");
        }
        $wikiElem.append(items);
        clearTimeout(wikiRequestTimeout);
    });

    return false;
};

$('#form-container').submit(loadData);

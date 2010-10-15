/* Author: Andreas Wålm
*/

// globals
var disqus_developer = (location.href.indexOf('http://localhost') != -1 ? 1 : 0), 
    disqus_shortname = 'awalm';
// var disqus_iframe_css = '';

(function($){

  //from http://twitter.com/javascripts/blogger.js
  function relative_time(time_value) {
    var values = time_value.split(" ");
    time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
      return 'less than a minute ago';
    } else if(delta < 120) {
      return 'about a minute ago';
    } else if(delta < (60*60)) {
      return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if(delta < (120*60)) {
      return 'about an hour ago';
    } else if(delta < (24*60*60)) {
      return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
      return '1 day ago';
    } else {
      return (parseInt(delta / 86400)).toString() + ' days ago';
    }
  }

  //fix links and username in tweet status
  function tweet_tags(text){
    var status = text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'" target="_blank">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.substring(1)+'</a>';
    });
    return status;
  }

  
  //get latest tweets
  $.getJSON("http://twitter.com/statuses/user_timeline/walming.json?count=1&callback=?",
      function(data){
        try{
          var text = tweet_tags(data[0].text), time = relative_time(data[0].created_at);
          $('<p>'+ text +'</p><p class="meta"><span class="datetime">'+ time +'</span></p>').prependTo('#twitter');
          $('#sidebar').show();
        }catch(error){ $('#twitter').remove(); }
      });

  //get flickr photos
  var query = "select * from flickr.photos.search where user_id='25675530@N03' LIMIT 4",
      url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&callback=?';
  $.getJSON(url, function(data){
    try{
      var photos = data.query.results.photo;
      if ($.isArray(photos)) {
        $.each(photos, function(index, photo) {
          var url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret,
          title = photo.title;
        $('<li><div class="image"><a href="http://www.flickr.com/photos/walm/'+ photo.id +'" target="_blank"><img src="'+ url +'_s.jpg" border="0" title="'+ title +'" width="80" height="80"/></a></div></li>').appendTo('#flickr ul');
        });
      }
    }catch(error){ console.log('Cant load photos from flickr'); }
  });


  //get latest zoo share
  $.getJSON("http://zootool.com/api/users/items/?username=walming&limit=4&apikey=c4d30ed6f69892daa55101466899d112&callback=?",
      function(data){
        try{
          $.each(data, function(index, value){
            var url = value['permalink'], img = value['thumbnail'], title = value['title'];
            $('<li><div class="image"><a href="'+ url +'" target="_blank"><img src="'+ img +'" border="0" title="'+ title +'" width="80" height="80"/></a></div></li>').appendTo('#zootools ul');
          });
        }catch(error){ console.log('Cant load links from zootools'); }
      });

  //select on focus in searchbox
  $('#searchbox').focus(
      function(){
        $(this).attr('data-preval', $(this).val());
        $(this).val('');
      }).focusout(
        function(){
          var val = $(this).val();
          if (val.trim() == '')
            $(this).val($(this).attr('data-preval'));
        });

  // disqus plugin
  (function() {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = 'http://awalm.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

    var s = document.createElement('script'); 
    s.async = true;
    s.src = 'http://disqus.com/forums/awalm/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  })();

  //add translate select to top right (at moment not enabled as I'm not done)
  // $.getScript('http://jquery-translate.googlecode.com/files/jquery.translate-1.3.9.min.js', function(){ //when the script is loaded
  //   $.translate(function(){ //when the Google Language API is loaded

  //     $.translate.ui('select', 'option') //generate dropdown
  //     .change(function(){ //when selecting another language
  //       $('body').translate( 'swedish', $(this).val(), { //translate from swedish to the selected language
  //         not: '.option, #demo, #source, pre, .notrans, .jq-translate-ui', //exclude these elements
  //       fromOriginal: true //always translate from swedish (even after the page has been translated)
  //       });
  //     })
  //   .val('Swedish') //select default
  //     .appendTo('#toolbar'); //insert the dropdown to the page

  //   //insert Google's logo after the dropdown:
  //   $.translate.getBranding().appendTo('#toolbar');

  //   });
  // });

})(window.jQuery);

function shorten_url(url, callback){
  var $ = window.jQuery;
  $.getJSON('http://api.bit.ly/v3/shorten?login=walm&apiKey=R_3fc4f9708d3cd0a2ba40116c3febe2ed&longUrl='+ url +'&format=json&callback=?',
      function(data){
        callback(data.data.url);
      });
}

function share_on_twitter(title, url){
  shorten_url('http://andreas.walm.se'+ url, function(short_url){
      var status = title +' '+ short_url,
      share_url = "http://twitter.com/home?status="+ status +"&source=shareaholic";
      location.href = share_url;
      });
}

function share_on_facebook(title, url){
  var share_url = "http://www.facebook.com/share.php?v=4&src=bm&u=http://andreas.walm.se"+ url +"&t="+ title;
  location.href = share_url;
}


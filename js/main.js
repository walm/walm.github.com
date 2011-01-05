// load all libs
head.js(
  'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'
);

// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

// ready!
head.ready(function(){

  var $ = jQuery; // just to be sure

  // navigation
  $('header a, nav a').click(function(event){
    event.preventDefault();
    var left = 0, height = 330, picker = 507, card = $(this).attr('rel');
    switch( card ) {
      case 'work':
        left = -620;
        height = 355;
        picker = 550;
        break;
      case 'contact':
        left = -1240;
        height = 455;
        picker = 602;
        break;
    }

    $('nav a').removeClass('current');
    if (card == "me") {
      $('nav a:first').addClass('current');
      $('header h1').css('opacity', '0');
    } else {
      $(this).addClass('current');
      $('header h1').css('opacity', '1');
    }
    $('#item-pick').css('margin-left', picker +'px');
    $('#card-slider').css('left', left +'px').css('height', height +'px');
  });

  // make sure we diplay right card
  var url = location.href, page = url.substring(url.lastIndexOf('/'));
  $('nav a[href$="'+ page +'"]:first').click();

  // map footer links inside icons to icon
  $('#footer .icon a').each(function(){
    var link = $(this).attr('href');
    $(this).parent().click(function(){ console.log('hej'); location.href = link; });
  });

  // twitter
  // from http://twitter.com/javascripts/blogger.js
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
      var text = tweet_tags(data[0].text), time = relative_time(data[0].created_at)
      $('#feed .text').html(text).css('margin-top', 0);
      $('#feed .time').text(time).css('margin-top', 0);
    }catch(error){ }
  });

});


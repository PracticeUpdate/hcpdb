var waxMustache = function(){

  var dataPath = "content/json/";
  var templatePath = "content/json/";
  var targetElem = "";
  var htmlMethod = "html";
  var mustacheList = [
  ["feed","feed-item",".stream-container", "append"]
  ["recent","module-recent",".recent", "html"]
  ["user-topic","user-topic",".user-topic", "html"]
  ["cta-meet-experts",".cta.meet-experts", "html"]
  ["cta-bcf-01", "cta", ".bcf-01", "html"]
  ["user-console", "user-console", ".user-console", "html"]
  ["job-feed", "module-job-feed", ".job-feed", "html"]
  ["recent", "module-most-read", ".most-read", "html"]
  ["page-footer", "page-footer", ".page-footer", "html"]
  ["modals", "body", "append"]
  ["modals-forgot-password", "body", "append"]
  ["page-footer", ".site-footer", "html"]
  ];

  for(i=mustacheList.length; i>=0; i-=1){
    var curData;
    var curTemplate;
    var curTarget;
    var curMethod;
    var curSet = mustacheList[i]
    if(curSet.length === 4){//build templates with json data
      curData = dataPath + curSet[0] + ".json";
      curTemplate = templatePath + curSet[1]+ ",mustache";
      curTarget = curSet[2];
      curMethod = curset[3];
      $.getJSON(curData, function(data) {
		$.get(curTemplate, function(template) {
	    var html = Mustache.to_html(template, data);
	    $(curTarget).curMethod(html);
		});
	});
      console.log("$.getJSON(\"" + curData + "\", function(data) {$.get(\"" + curTemplate + "\", function(template) {var html = Mustache.to_html(template, data);$('" + curTarget + "')." + curMethod + "(html);\});});");
    } else if(curSet.length === 3){//build templates with no json data
      curTemplate = templatePath + curSet[0]+ ",mustache";
      curTarget = curSet[1];
      curMethod = curset[2];
        $.get(curTemplate, function(template) {
        var html = Mustache.to_html(template);
        $(currentTarget).curMethod(html);
      });
    }
  }
};

/*---

$('.user-console').practiceupdateDrawer();
      if($('body').hasClass('page-preferences')){
        $('.user-settings-menu').toggleClass('is-collapsed is-expanded');
        $('.user-settings-menu li:first').addClass('active');
      }


    /* Mustache - explore slider template */
/*     $('.explore-feature').orbit({pauseOnHover: false, directionalNav: false, bullets: true, fluid: '16x9'}); */

---*/
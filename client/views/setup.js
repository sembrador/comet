var ga, gajs, s;

Template.setup.rendered = function() {};

if (window._gaq == null) {
  window._gaq = [];
}

_gaq.push(['_setAccount', 'UA-XXXXXXXX-N']);

_gaq.push(['_trackPageview']);

(function() {}, ga = document.createElement('script'), ga.type = 'text/javascript', ga.async = true, gajs = '.google-analytics.com/ga.js', ga.src = 'https:' === document.location.protocol ? 'https://ssl' + gajs : 'http://www' + gajs, s = document.getElementsByTagName('script')[0], s.parentNode.insertBefore(ga, s))();
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},17:function(e,t,n){},19:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(11),i=n.n(c),l=n(25),r=(n(17),n(4)),s=n(5),p=n(8),u=n(6),m=n(9),d=function(e){function t(){return Object(r.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(){this.props.loading?console.log("content is still loading"):this.map=new this.props.googleObject.Map(document.getElementById("map"),{center:{lat:40.7413549,lng:-73.9980244},zoom:13})}},{key:"render",value:function(){return a.a.createElement("div",{id:"map"})}}]),t}(o.Component);n(19);var g=function(e){function t(){var e,n;Object(r.a)(this,t);for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={loading:!0},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=new Promise(function(e,t){window.resolveGoogleMapsPromise=function(){e(window.google),delete window.resolveGoogleMapsPromise};var n=document.createElement("script");n.src="https://maps.googleapis.com/maps/api/js?libraries=places&key=".concat("AIzaSyAP4vpEbZ99EZkBmoTlvApp1wTIbDJtA-8","&callback=resolveGoogleMapsPromise"),n.async=!0,document.body.appendChild(n)});Promise.all([t]).then(function(t){e.googleObject=t[0].maps,e.setState({loading:!1})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"Hello World!"),a.a.createElement(d,{loading:this.state.loading,googleObject:this.googleObject}))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(l.a,null,a.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,2,1]]]);
//# sourceMappingURL=main.afbdb6d8.chunk.js.map
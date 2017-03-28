(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['marionette', 'backbone', 'underscore'], function(Marionette, Backbone, _) {
      return (root.Ibird = factory(root, Marionette, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Marionette = require('marionette');
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(root, Marionette, Backbone, _);
  } else {
    root.Ibird = factory(root, root.Marionette, root.Backbone, root._);
  }

}(this, function(root, Marionette, Backbone, _) {

    "use strict";
    //命名空间
    var Ibird = new Marionette.Application();
    //版本号
    Ibird.VERSION = '0.0.0';
    //默认region加载
    Ibird.addInitializer(function(){
        Ibird.addRegions({
            navRegion: '#nav',
            headerRegion: '#header',
            mainRegion: '#main',
            footerRegion: '#footer',
        });
    });

    //路由扩展
    Ibird.AppRouter = Marionette.AppRouter.extend({
        onRoute:function(name,path,args){
            var router = {name:name,path:path,args:args};
            Ibird.commands.execute('change:Router',router);
        }
    });
    Ibird.on('start', function(options) {
        if (Backbone.history){
            Backbone.history.start();
        }
    });
    return Ibird;
}));
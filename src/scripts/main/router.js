/******************************************************************
 *
 * 全局路由
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Ibird.module('Router', function(Router, Ibird, Backbone, Marionette, $, _){
    Router.startWithParent = true;
    Router.Router = Ibird.AppRouter.extend({
        appRoutes:{
            '':'index',
            'index':'index',
            'test':'test',
            '*error':'fourOfour',
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function(){
            Backbone.history.navigate('#index')
            Ibird.Index.StartApp();
        },
        test: function(){
            console.log('test');
        },
        fourOfour: function(data){
            console.log('error page');
        }
    });
    Router.on('start', function(){
        new Router.Router({
            controller: new Router.Controller
        });
    });
});


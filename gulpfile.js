'use strict';
var gulp = require('gulp');//引入gulp
var del = require('del');//引入删除文件
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var express = require('express');
var router = express.Router();

gulp.task('concatRoutes',function(){
  var concat = require('gulp-concat');
  gulp.src(['routers/a.js','routers/router/*.js','routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})

gulp.task('serve',['concatRoutes'],function(){

  var routerFs = require('./routers/router')(router);
  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'src', 'test'],
      routes:{
        "/bower_components":"bower_components",
        "/test":"test"
      },
      middleware:router
    }
  });

  gulp.watch(['routers/router/*.js'],['concatRoutes']);
  gulp.watch(['src/scss/*.scss','src/scss/apps/*.scss'],['css']);

});

gulp.task('css', function(){

  var sass = require('gulp-ruby-sass');
  // var concat = require('gulp-concat');

  sass(['src/scss/apps/*.scss'],{
        style: 'expanded',
        precision: 10
        })
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/styles'))
    .pipe(gulp.dest('src/styles'))
    .pipe($.size({title:'build/styles'}));


})


gulp.task('js', function () {

  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  var fs = require('fs');
  fs.readdir('src/scripts', function(err, files){
    if (err) {  
      console.log('read dir error');
    }else{
      files.forEach(function(item){
        if(item != '.DS_Store'){
          gulp.src('src/scripts/'+item+'/**/*.js')
           .pipe(concat(item+'.js'))    //合并所有js到main.js
           .pipe(gulp.dest('../js'))    //输出main.js到文件夹
           .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
           .pipe(uglify())    //压缩
           .pipe(gulp.dest('../js'));  //输出
           console.log(item+'打包完成');
        }
        
      })
    }
  })

});














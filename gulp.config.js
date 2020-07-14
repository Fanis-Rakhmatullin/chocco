module.exports = {
  SRC_PATH : 'src',
  DIST_PATH : 'dist',
  STYLE_LIBS : [
    'node_modules/normalize.css/normalize.css',
    'node_modules/bxslider/dist/jquery.bxslider.min.css',
    //Закомментировано, т.к. компиллятор sass жалуется на fancybox. Стиль добавлен в html
    // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
  ],
  JS_LIBS : [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bxslider/dist/jquery.bxslider.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
    'node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
    'node_modules/mobile-detect/mobile-detect.min.js',
  ]
 }
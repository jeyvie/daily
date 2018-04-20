# gulp 自动更新


> 现在都流行 `webpack` 了，今天要整一个老项目，它用 `gulp`构建的，但不支持自动更新。之前好像也做过，但具体操作记不太清了。今天再弄了下，竟花了点时间。为了以后少花时间，这次就记一下。


主要通过 `browser-sync`。

没用 `gulp-livereload` 是因为它好像还得在浏览器里做配置，麻烦。


 `browser-sync` 本身很简单，但它默认针对多页应用的，所以得针对 `SPA` 做下处理。

1. 准备
	
	```
	var browserSync = require('browser-sync').create();
	var url = require('url');
	var fs = require('fs');
	var path = require('path');
	
	```

2. 第二，主要是在中间件了做下路由处理:

	```
	var folder = path.resolve(__dirname, './');
	var defaultFile = 'index.html';

	gulp.task('start', function () {
	  browserSync.init({
	    open: false,
	    files: ['assets', 'components', 'modules', 'pages', 'tpl'], // 文件
	    server:{
	      baseDir:'./',  // 设置服务器的根目录
	      index:'index.html', // 指定默认打开的文件,
	      middleware: function(req, res, next) {
	        var fileName = url.parse(req.url);
	        fileName = fileName.href.split(fileName.search).join('');
	        var fileExists = fs.existsSync(folder + fileName);
	        if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
	          req.url = '/' + defaultFile;
	        }
	        return next();
	      }
	    },
	    port:8050
	  });
	});
	```


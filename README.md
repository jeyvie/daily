# daily

先记着，忙过了这阵处理(`4/23`)

1. [免切换合并分支](https://coderwall.com/p/0kxphg/merging-branches-without-checkout)

	```
	git fetch . dev:master
	```
2. [比较不同分支里的文件](https://stackoverflow.com/questions/4099742/how-to-compare-files-from-two-different-branches)

	```
	git diff mybranch master -- myfile.cs
	```
3. git add 添加除某某文件的所有文件, [参考](http://stackoverflow.com/questions/4475457/add-all-files-to-a-commit-except-a-single-file) 
	
	```
	git add -u
	git reset -- main/dontcheckmein.txt
	```

4. [`gulp` 自动更新](docs/gulp_live.md)

* [ ] 5. `gulp` 给文件做 `hash`, 或者 `gulp` 基本配置，常用插件

6. 查找快捷键
	
	- `cmd + f`: 查找内容
	- `cmd + g`: 跳转到下一个匹配到的内容
	- `cmd + shif + g`: 跳转到上一个匹配到的内容
	- 目前的感觉，`cmd + g` 可以代替 `cmd + f`， 不仅能查找，还能跳转

7. `linux` 权限命令 与 `gitreceive`

	上周五弄了把上线， 用 [gitreceive](https://github.com/progrium/gitreceive) 做了上线自动编译的事
	
	今天操作了下权限相关的事
	
	1. 一个坑
		
		```
		如果 user1 对文件夹dir没有执行权限，那把dir下的文件 file1 执行权赋予了  user1。那 user1 也是没法操作 file1 的。
		```
	
	2. 相关文章
		
		- [Linux系统下如何查看及修改文件读写权限](https://www.cnblogs.com/CgenJ/archive/2011/07/28/2119454.html)
		- [linux修改权限的相关命令](https://www.jianshu.com/p/9b6f7ba6bc7f)
		- [ Linux中link，unlink，close，fclose详解](https://blog.csdn.net/dlutbrucezhang/article/details/9159431)
		- [linux shell中，unlink和rm命令有什么区别呢](http://bbs.chinaunix.net/thread-2080409-1-1.html)


8. [monitorEvents](docs/command_line_api.md)

9. 下载文件
	
	```
	wget -P directory URL
	``` 


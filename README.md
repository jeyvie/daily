# daily

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


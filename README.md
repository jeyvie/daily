#daily

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


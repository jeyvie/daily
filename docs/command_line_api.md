# monitorEvents 

今天发现一网站 `a` 标签 `hash` 跳转失败，推测是 `a` 标签默认事件被禁了。 想到了之前看到过 `chrome` 调试工具里，  有一方法:

1. `getEventListeners`

	能返回绑定在元素上的所有事件
	
	
	```
	getEventListeners($0)
	
	//返回值 
	{
		click: [handlers]
	}
	
	```
	
	可惜的是，不能返回具体哪一行绑定了事件。`handler` 里也没找到事件对象信息。 
	
	顺着又看到了另一个方法:
	
2. `monitorEvents`

	```
	monitorEvents($0, 'click')
	
	// 返回事件对象
	
	{
		...
		defaultPrevented: true,
		...
	
	}
	```	
	
	猜想证实成功。



## 参考

[Command Line API 参考](https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference?hl=zh-cn)


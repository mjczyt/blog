# Linux1.	linux中设置全局的对所有用户都可以的使用的PATH: 可以通过修改配置文件： /etc/profile 来时配置，全局的PATH; 

	```	- 编辑profile： vi /etc/profile  	- 在最后后加一行：export PATH=THE_SET_GLOBLE_ENV_PATH:$PATH;	THE_SET_GLOBLE_ENV_PATH为命令所在的bin文件目录。
	```
2.	用pwd来查看当前位置的路径。3.	将linux上的文件夹设置可读写权限chmod -R a+w 目录名   -R是递归久是在该目录下所有文件将都按照这个权限设置。## Systemd
### 修改配置文件
Systemd 启动上面这个脚本，需要一个配置文件node-server.service。这个文件的文件名可以随便取，但是后缀名必须是.service。
	
	
	[Unit]
	Description=node simple server
	
	[Service]
	ExecStart=[/path/to/node/executable] [path/to/node-systemd-demo]/server.js
	Restart=always
	User=[yourUserName]
	Group=[yourUserGroup]
	Environment=PATH=/usr/bin:/usr/local/bin
	Environment=NODE_ENV=production
	WorkingDirectory=[/path/to/node-systemd-demo]
	
	[Install]
	WantedBy=multi-user.target
	
上面脚本里面，有五个地方出现了四个占位符。

	[/path/to/node/executable]：node可执行文件的绝对路径
	[path/to/node-systemd-demo]：示例库的绝对路径
	[yourUserName]：你的用户名
	[yourUserGroup]：你的组名

需要将上面这四个占位符，改成自己电脑的设置。下面是一个已经改好的例子。

	[Unit]
	Description=node simple server
	
	[Service]
	ExecStart=/usr/bin/node /tmp/node-systemd-demo/server.js
	Restart=always
	User=nobody
	Group=nobody
	Environment=PATH=/usr/bin:/usr/local/bin
	Environment=NODE_ENV=production
	WorkingDirectory=/tmp/node-systemd-demo
	
	[Install]
	WantedBy=multi-user.target

不知道这几个占位符的值，下面的命令可以帮你找出来。
	# node executable path
	$ which node
	
	# your user name
	$ id -un
	
	# your group name
	$ id -gn
	
### 配置文件的解释
Unit区块的Description字段，是服务的简单描述。
Service区块的字段含义如下。

	ExecStart：启动命令
	Restart：如何重启。always表示如果进程退出，总是重启
	Environment：环境变量
	WorkingDirectory：工作目录
Install区块的WantedBy字段指定，设为开机启动时，该服务所在的 Target 是multi-user.target。

### 启动服务
现在将配置文件拷贝到 Systemd 之中。

	$ sudo cp node-server.service /etc/systemd/system
	接着，就启动服务。
	
	# 重载配置文件
	$ sudo systemctl daemon-reload
	
	# 启动服务
	$ sudo systemctl start node-server
	
	
### 查看状态
如果启动失败，或者想查看日志，就要执行下面的命令。

	# 查看状态
	$ sudo systemctl status node-server
	
	# 查看日志
	$ sudo journalctl -u node-server
	
	# 实时输出最新日志
	$ sudo journalctl --follow -u node-server
	

### 重启服务和停止服务

	# 重启服务
	$ sudo systemctl restart node-server
	
	# 停止服务
	$ sudo systemctl stop node-server
如果想设为开机启动，就要执行systemctl enable。

	$ sudo systemctl enable node-server
	




















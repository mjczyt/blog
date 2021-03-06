# Node基本1.	node采用一个长期运行的进程，，Apache会产出对个线程（每个请求一个线程），每次都会刷新状态。2.	事件轮询：从本质上来说，node会先注册事件，随后不停地询问内核这些时间是否已经分发。当事件分发时，对应的回调函数就会被触发，然后继续执行下去。如果没有事件触发，则继续执行其他代码，直到有新事件时，再去执行对应的回调函数。3.	在程序中定义配置项如app.set(“photo”,__dirname+’/public/photos’)后就可以在各种环境下任意改变此目录。4.	当node接收到从浏览器发来的http请求时，底层的TCP连接会分配一个文件描述符。随后，如果客户端向服务器发送数据，node就会收到该文件描述符上的通知，然后触发JavaScript的回调函数。5.	对于阻塞式I/O线程在执行中遇到磁盘读写或者数据库通讯，网络通讯这种耗时比较多的时候，操作系统将会剥夺此线程的CPU资源，并暂停此线程，转而去执行别的线程。异步式I/O则针对所有操作采取不阻塞的方法，当线程遇到I/O操作时将操作发送给操作系统，然后接着执行下一个操作，当操作系统执行完I/O操作之后，将以事件的方式通知执行I/O的线程，线程会在特定的时候执行这个事件。这一切的前提就是系统需要一个时间循环，以不断地去查询有没有未处理的事件，然后交给预处理。对比与阻塞I/O，异步模型极大提高了web服务器的并发性。6.	buffer是一个表示固定内存分配的全局对象（即放到缓冲区的字节数需要提前确定）7.	node的HTTP服务器是构建于node TCP服务器之上的，即node中的HTTP.server继承自net.server（net为TCP模块）。TCP的首要特性是它面向连接。8.	Node中的管道可以让数据流动到指定目的地（即WriteableStream）读取一个文件并写入到另一个文件中，利用pipe（）作为连接，ReadableStream.pipe(WriteableStream).HTTP请求中在客户端request就是一个WriteableStream，response为Readablestream，而在服务器端则相反。
9. node与操作系统交互的工具
	* 全局的process对象————包含当前进程的相关信息，如传参和当前设定的环境变量
	* fs模块————包含底层的ReadStream和WriteStream类。
	* child_process模块————繁衍子进程的底层和高层接口，以及一种繁衍带有双向信息传递通道node实例的特殊办法。
	

# 网络通信

## REST API
-  API与用户的通信协议，总是使用HTTPs协议。
-  应该尽量将API部署在专用域名之下，或者主域名下：https://example.org/api/
-  应该将API的版本号放入URL：https://api.example.com/v1/
-  网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。
- 对于资源的具体操作类型，由HTTP动词表示。常用的HTTP动词有下面五个（括号里是对应的SQL命令）。

	``` 
	GET（SELECT）：从服务器取出资源（一项或多项）
	POST（CREATE）：在服务器新建一个资源
	PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）
	PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）
	DELETE（DELETE）：从服务器删除资源	```
- 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。
下面是一些常见的参数。

	```
	?limit=10：指定返回记录的数量
	?offset=10：指定返回记录的开始位置。
	?page=2&per_page=100：指定第几页，以及每页的记录数。
	?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
	?animal_type_id=1：指定筛选条件
	```
- 服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）

	```
	200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
	201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
	202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
	204 NO CONTENT - [DELETE]：用户删除数据成功。
	400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
	401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
	403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
	404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
	406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
	410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
	422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
	500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
	```
- 针对不同操作，服务器向用户返回的结果应该符合以下规范。

	```
	GET /collection：返回资源对象的列表（数组）
	GET /collection/resource：返回单个资源对象
	POST /collection：返回新生成的资源对象
	PUT /collection/resource：返回完整的资源对象
	PATCH /collection/resource：返回完整的资源对象
	DELETE /collection/resource：返回一个空文档
	```

- RESTful API最好做到Hypermedia，即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么。

# Node使用1.	在node中定义了静态文件app.use(express.static(path))之后如果要用里面数据可以直接使用以/开头的静态文件相对路径。2.	node删除file使用fs.unlink( )!3.	node中fs.stat( )系统调用获取文件的相关信息，比如修改时间、字节数等，如果文件不存在fs.stat()会在err.code中放入ENOOENT作为响应。
4.  app.use('/api',api.auth)这是挂载点，即任何以/api开头的请求路径名和HTTP谓词都会导致这个中间件被调用。4.	模块内引用路径时一定要使用绝对路径，借助于全局变量__dirname与__filename来使用。因为当主函数使用模块时若是相对路径则以主函数作为参考。5.	标准库组件url可以补全地址url.resolve（主站url，href）。6.	node中的全局函数process.argv为一个argument的数组索引为零的储存的是node所在文件夹，索引为1的是当前执行文件路径，后面的索引为在命令行启动node时传入的参数。7.	模块导出时用module.exports={函数名}的形式，导入模块时即使在同一目录下也需要在开头加“./文件名.js”若不加./则优先在内置模块中寻找，然后是在node_modules文件夹中寻找。8.	绝大部分node异步API接收的回调函数，第一个参数都是错误对象或者是null。9.	Event模块时node对‘发布/订阅’模式的实现，其中提供了一个EventEmitter对象，核心事件就是事件的触发与事件监听功能的封装。

	```javascriptvar EventEmitter = require('events').EventEmitter;                var emitter = new EventEmitter; //初始化对象emitter.on(‘自定义事件名’，function（）{})  //绑定事件emitter.emit(‘事件名’，‘回调函数的参数’) // 触发事件
	```10.	使用net.creatServer( function(socket){})时候回调函数传回来的是一个socket对象，可以通过给socket对象setEncoding来设置接收到的流的显示方式。socket.on(‘data’,回调函数)来给socket绑定接受到数据时触发的事件。11.	fs.createReadStream('fire.jpg').pipe(respond);在http中通过流的方式给页面中传图片。12.	 node中http会将所有主机名后面的内容放入request.url中.13.	node提供querystring的模块，该模块含有一个.parse( )方法，传入参数如“q=1”的字符串返回一个{q:1}的对象。这个解析处理方式和Node解析header消息的方法类似，node将http请求数据中的header信息从字符串解析成一个方便处理的header对象。同样可以使用querystring.stringfy({q:1})将对象转为字符串。 14.	在http的请求中一般通过给respond绑定data事件来获取返回的数据，绑定end事件等待数据获取完后执行相应操作。15.	express客户端使用socket.io要引入socket.io给客户端写的js文件<script src='/socket.io/socket.io.js'></script>16.	express中使用socket.io模块，如果要群发信息则需要每个客户端都加入到同一房间内，使用socket.join（‘房间名’）；来加入房间，然后使用socket.to(‘房间名’).emit(‘event’，fn)来广播消息，消息默认只对除当前客户端之外的所有客户端发送，如果还要对当前客户端发送则再加上socket.emit(‘event’,fn)。可以利用socket.rooms来查看客户端所在的房间，返回一个对象。一个客户端可以在多个房间，第一个房间与客户端的id相同，是一个随机的字符串，如果要针对某个客户端单独发消息可以用to指向客户端所对应的专属房间。17.	express中路由和中间件的添加顺序至关重要，如果把404处理器放在所有路由上面，首页和相关页面就无法显示。自己编写中间件时如果方法后面没有调用next()则不会再执行之后的中间件。使用app.use(‘/url’,中间件)，第一个参数表示当url前缀与之匹配是才会调用后面的中间件。18.	bodyParser()组件用于解析POST请求，它提供了req.body属性，可以用来解析注册信息如JSON、x-www-form-urlencoded(HTML表单的默认值)和multipart/form-data请求。如果是multipart/form-data请求，如文件上传，则还有req.files对象。19.	query()组件主要用于解析GET请求，它提供req.query对象将url中的GET数据转化成一个对象存在req.query中。20.	cheerio组件为一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。在爬虫应用中使用superagent.get（）得到网页的数据srea之后利用cheerio 来将数据解析var $ = cheerio.load(sres.text);之后通过$(‘.’)方式来获取DOM。21.	利用eventproxy组件针对多个异步请求统一处理回调函数，无深度嵌套。用来检测多个异步操作是否完成，完成之后，会自动调用处理函数，并将抓取到的数据当参数传过来。22.	当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async做异步处理。23.	nodemon这个库是专门调试时候使用的，它会自动检测node.js 代码的改动，然后帮你自动重启应用。在调试时可以完全用 nodemon 命令代替 node 命令。$ nodemon app.js 启动应用。24.	上传大型文件时可以使用formidable的流式解析器，它可以随着数据块的上传接收它们并呈现特定的部分这种方式不仅快，还不会因为需要大量的缓冲而导致内存膨胀，即便像视频这种大型文件，也不会把进程压垮。25.	使用node运行cmd中的命令，先var exec=require(“child_process”).exec;得到执行方法，再使用exec(“要执行的cmd命令语句”，callback（err,stdout,stdin）)；26.	管理用户密码文件时所谓加Salt，就是加点“佐料”。当用户首次提供密码时（通常是注册时），由系统自动往这个密码里加一些“Salt值”，这个值是由系统随机生成的，并且只有系统知道。然后再散列。而当用户登录时，系统为用户提供的代码撒上同样的“Salt值”，然后散列，再比较散列值，已确定密码是否正确。这样，即便两个用户使用了同一个密码，由于系统为它们生成的salt值不同，他们的散列值也是不同的。即便黑客可以通过自己的密码和自己生成的散列值来找具有特定密码的用户，但这个几率太小了（密码和salt值都得和黑客使用的一样才行）。参看express的auth示例。27.	Post/Redirect/Get(PRG)模式是一个常用的web程序设计模式。在这种模式中，用户请求表单，用HTTP/POST请求表单数据，然后用户被重定向到另外一个web页面上。被重定向到哪里取决于表单数据是否有效。如果表单数据无效，程序会让用户回到表单页面。如果表单数据有效，程序会让用户到新的页面中。PRG模式主要是为了防止表单的重复提交。28.	在express中用户被重定向后，res.locals中的内容会被重置。Server传来消息最好存在会话变量中。res.message函数可以吧消息添加到任何Express请求的会话变量中。29.	express.response对象是Express给相应对象的原型，向这个对象中添加属性意味着所有的中间件和路由都能访问它们。
# 爬虫1.	__VIEWSTATEa)	ViewState是ASP.NET中用来保存WEB控件回传时状态值一种机制。在WEB窗体(FORM)的设置为runat="server",这个窗体(FORM)会被附加一个隐藏的属性_VIEWSTATE。_VIEWSTATE中存放了所有控件在ViewState中的状态值。 ViewState是类Control中的一个域，其他所有控件通过继承Control来获得了ViewState功能。它的类型是system.Web.UI.StateBag，一个名称/值的对象集合。 b)	当请求某个页面时，ASP.NET把所有控件的状态序列化成一个字符串，然后做为窗体的隐藏属性送到客户端。当客户端把页面回传时，ASP.NET分析回传的窗体属性，并赋给控件对应的值。2.	__EVENTVALIDATION__EVENTVALIDATION只是用来验证事件是否从合法的页面发送，只是一个数字签名，所以一般很短。“id”属性为“__EVENTVALIDATION”的隐藏字段是ASP.NET 2.0的新增的安全措施。该功能可以阻止由潜在的恶意用户从浏览器端发送的未经授权的请求.为了确保每个回发和回调事件来自于所期望的用户界面元素，ASP.NET运行库将在事件中添加额外的验证层。服务器端通过检验表单提交请求的内容，将其与“id”属性为“__EVENTVALIDATION”隐藏字段中的信息进行匹配。根据匹配结果来验证未在浏览器端添加额外的输入字段（有可能为用户在浏览器端恶意添加的字段），并且该值是在服务器已知的列表中选择的。ASP.NET运行库将在生成期间创建事件验证字段，而这是最不可能获取该信息的时刻。像视图状态一样，事件验证字段包含散列值以防止发生浏览器端篡改。说明：“id”属性为“__EVENTVALIDATION”隐藏字段一般在表单的最下方，如果表单在浏览器端尚未解析完毕时，用户提交数据有可能导致验证失败。__EVENTVALIDATION与__VIEWSTATE一般可以在浏览器页面源代码中找到，作为form中被隐藏的标签，与其他数据一同提交。3.	使用superagent得到response的cookie: JSON.stringify(res.header["set-cookie"]);4.	针对superagent获取的网页乱码的情况，superagent-charset扩展了superagent的功能，使其可以手动指定编码功能。5.	MD5加密是一种不可逆加密算法，使用MD5加密时相同内容以字符串传入与数字传入得到的结果不同。
# Angular1. 创建模块： var oneApp = angular.module("myApp"，[ ] )  第一个参数是模块名，第二个参数是填所依赖的模块。返回模块对象。只传一个参数是获取。2. 给刚刚添加的oneApp模块对象添加控制器，一定要在方法前注入要使用的$参数：
	
	```
oneApp.controller('oneController',[‘$scope’,’$http’，function($scope,$http)]{ $scope.***=" "； 赋值操作 //当控制器执行时自动运行的函数 }); 通过$scope与视图关联。
	```
	由于压缩代码会改变参数名称，注册控制器的方法就通过第二个参数为数组的方式注入参数，最后一个成员为原本的控制器函数，前面的成员都是需要注入的对象名称。一个angular对象可以有多个controller
3. 使用模块时给要使用的区域
	```
	<div ng-app="myApp" ng-controller='oneController'>  </div> 
	```
	使用ng-app来声明这里面包含的内容要使用angular来管理。
4. 可以给使用angular的标签里面添加ng-click="函数名( )",并在controller里用$scope.函数名=function( )来定义函数，在click时调用。5. 控制器的三种职责：
	- 为应用中的模型设置初始状态。	- 通过$scope对象把数据模型或函数对象传递给视图。	- 利用$watch( )函数监视模型的变化做出相应的响应。   $scope.$watch(“要监视的变量名”，function（now，old）{ //变量值改变时执行})6. 为了防止Angular在未完全执行完之前页面显示原本的HTML内容，给最外层的div节点即添加了ng-app的节点添加ng-cloak属性,并在css中设置[ng-cloak]{display:none},ng-cloak属性在Angular加载完成后自动删除。7. ng-app 指令初始化一个 AngularJS 应用程序。        ng-init 指令初始化应用程序数据。        ng-model 指令把元素值（比如输入域的值）绑定到应用程序。8. AngularJS过滤器：可用于转换数据：currency	格式化数字为货币格式。filter从数组项中选择一个子集。lowercase格式化字符串为小写。uppercase大写。orderBy根据某个表达式排列数组。9. $location服务，它可以返回当前页面的 URL 地址。$scope.myUrl = $location.absUrl();

	```	$http 服务向服务器发送请求，应用响应服务器传送过来的数据。	$http.get("welcome.htm").then(function (response){$scope.my=response.data;});	$timeout 服务对应了 JS window.setTimeout 函数。
	$timeout(function(){$scope.myHeader = " 	ready?";}, 2000);	$interval 服务对应了 JS window.setInterval 函数。	$interval(function () {$scope.theTime=new Date().toLocaleTimeString();},1000);
	```
10. 所有的dom操作都应该封装到自定指令当中！将复杂的HTML片段注入到页面。通过angular对象.directive（’指令名’,function（）{所有的DOM操作都要在link函数里return{ restrict: 'A',  表示能在属性上使用，E表示只能当表情使用，C表示只能当类使用，M为在注释里使用 link: function(scope, element, attr，controller) {参数代表使用这个指令的对象信息，操作dom元素}}]）在link函数中可以给元素注册事件利用element.on（‘事件名’，function（）{}）；使用时可以<指令名></指令名>来使用。也可以当做属性放在标签中。还可以return一个templateUrl和replace参数，templateUrl代表要添加的模板内容，replace为true时清空之前标签内的html替换为template。   自定义指令时name采用驼峰命名法如tsHello使用时采用—的方式如te-hello。11. 想要按回车键时触发事件给input加上form标签利用ng-submit=函数名来触发。想要阻止表单的自动提交并刷新浏览器给form标签添加onsubmit=’return false’只有return false时候才能阻止自动提交。12. 使用angular时不要操作Dom元素，要想如何传给控制台参数并通过控制台执行相应函数来改变视图中的数据。13. 如果在控制器中调用js中的window时，需要通过依赖注入的$window对象，因为每一个控制器的代码只是在它管辖的作用域中使用，通过这样的写法可以防止它与全局的window对象混淆，出现各类诡异的异常！！！！14. 给父子标签添加controller时子标签中的controller自动继承父标签中controller中$scope的属性和方法。15. 添加angular模板。	- 首先构建模板，创建type为‘text/ng-template’并含有id属性的script标签，标签内写入模板内容。<script type=‘text/ng-template’ id=‘模板名’>模板内容</script>	- 然后在html中需要使用模板的地方加div，并设置ng-include、src=‘模板名’、ng-controller。	- 之后再相应的controller中设置模板所需要的值。16. angular中改变css样式：	- 方法一：在标签中添加ng-class属性并等于“{{$scope.样式名}}”利用$scope.样式名=…添加class。	- 方式二：可以一次添加多个标签，先设置值为布尔类型的$scope属性，在标签中添加	ng-class=”{‘red’:$scope属性,‘green’:$scope属性}”当对应的属性为true时添加该样式名。17. 自增长型id可能会因为前面的元素被删除后之后添加的id会与前一个id冲突，所以可以通过将id设置为random来保证id不会重复。18. 不要在以数组长度为循环条件的情况下增加或删除数组，这样会影响循环而且很傻。19. 改变url的哈希值利用$location.path（“a”）在地址后面添加# /a与路由一起实现页面局部跳转。20. 配置路由：当请求来时用路由寻找到相应的控制器	- 首先引入angular-route这个包，在创建angular对象时第二个参数依赖里填入’ngRoute’加引号！！
	
	```
	之后用angular对象的config（‘$routeProvider’，function（$ routeProvider）{ 	$routeProvider.when(‘/a’,{controller:对应控制器名 ，templateUrl：‘模板路径’})               .when(‘/b’,{…} )  利用when 来设置配置规则               .otherwise（{redirect:’/a’}）}）；
	```
	* 当请求提交时路由模块改变的是含ng-view属性的标签，将其中内容替换成相应的template。	* 填入的模板路径一定是相对于使用者的路径而非controller的路径。	* 填入哈希值时可以用’/student/:name?’冒号后面的被当做占位符可以任意匹配加问号表示可以为空值。在controller里注入$ routerParmas.name可以得到name匹配到的值。
	21. 使用服务模块，对于业务逻辑都应该放入服务模块中，创建服务模块：angular对象.service（“mainService”，function（）{ this.函数名=function(){}}）添加业务逻辑。使用时先将这个模块注入到主要的angular对象，然后将service名mainService注入到controller中。22. 过滤器：过滤器参数若是一个值则会在目标对象的全部属性中查找匹配。若想执行所查找的属性则{{data|filter:{score:80}}}这样过滤器只看对象中score属性是否满足条件。使用自定函数匹配{{data|filter:函数名}}添加函数$scope.函数名=function(e){}e为现过滤对象。返回true或false。23．在给图片标签的src绑定地址时要用ng-src绑定，因为如果用src浏览器会在angular为启动时请求图片。24. 用angular控制tab栏的样式切换先使用ng-repeat来生成tab栏然后在点击时触发事件并根据id来改变对应栏样式。

	```
<li ng-repeat="list in li " ng-class='{"active":list.active}' 
ng-click="activeChange(list.id)" >
	```
	使用ng-repeat时最好在后面加上track by id之类的唯一标识属性，在下次数据更新时页面渲染速度回加快。
25. 路由最好只定义一个when（“/：参数/:参数”…）通过修改参数$route.updataParams（{参数名:参数值}）来实现页面的跳转！！！用$scope.$on("$routeChangeSuccess", function () { })来监听地址栏的变化！！！还有一种可以选择的跳转方式就是用a标签的href属性，对应不同情况来选择跳转方式。26. 想要在angular启动时执行某函数用$scope.init( )=function（）{ }函数27. 路由的匹配也有顺序，按when的照前后或者依赖注入的先后排序，先匹配上的先使用。没有得到正确匹配一定要从路由的匹配顺序上找问题！！！28. angular中http的配置选项：	- $http({可以配置内容有method、url、data、params、transformRequest、transformResponse、cache、timeout})	- data属性是一个对象，作为消息体的一部分发送给服务端	- params对应一个字符串或对象，若是对象则自动按照json格式序列化并追加到url后面作为发送数据的一部分	- transformRequest用于请求体头信息和请求体进行序列化转换，并生成一个数组发送给服务端，transformResponse则是解析服务端传回的响应体头信息和响应体信息。	- $http服务是只能接受一个参数的函数，这个参数是一个对象，包含了用来生成HTTP请求的配置内容。这个函数返回一个promise对象，具有success和error两个方法。success(function(data,status,config,headers){}。
		### CommonJS之Promises/A规范:通过规范API接口来简化异步编程，使我们的异步逻辑代码更易理解。遵循Promises/A规范的实现我们称之为Promise对象，Promise对象有且仅有三种状态：unfulfilled、fulfilled、failed；初始创建的时候是unfulfilled状态，状态只可以从unfulfilled变成fulfilled，或者unfulfilled变成failed。状态一旦变成fulfilled或者failed，状态就不能再变了。Promises/A规范提供了一个在程序中描述延时（或将来）概念的解决方案，是一种处理异步编程的模式，可以有效解决回调的烦恼，并以一种同步的方式去处理业务流程。主要的思想不是执行一个方法然后阻塞应用程序等待结果返回后再回调其他方法，而是返回一个Promise对象来满足未来监听。fulfilled状态和failed状态都可以被监听。Promise通过实现一个then接口来返回Promise对象来注册回调：then(fulfilledHandler, errorHandler, progressHandler)；then接口用于监听一个Promise的不同状态。fulfilledHandler用于监听fulfilled状态，errorHandler用于监听failed状态，progressHandler用于监听unfulfilled状态。Promise不强制实现unfulfilled（未完成）的事件监听。在$htto请求中使用promise对象并不会带来根本上的变化，但它会减少数据加载时的白框现象或者等待加载的时间，在优化用户体验上将发挥明显的作用。具体使用如下。

	```	angular.module('goodsList.serivice',[])
	    .factory('GoodsListFty',function($http,$q){
	        testPromise:function(){
	            //首先要定义一个延迟对象
	            var deferrd=$q.derfer();
	            //模拟异步请求访问
	            serTimeout(function(){
	                deferrd.resolve("吃饭了")
	            }，5000)；
	            //返回promise对象
	            return deferrd.promise;
	        }
	    })	
	```

	在factory中创建，在controller中使用。Angular中需要配合$q一起使用。	Promise.then( )返回的对象给下一个.then（ ）使用链式编程的方式消除了层层嵌套的麻烦，使异步变为同步。最后执行finally内的函数。then( )里面第一个匿名函数使成功时调用的方法，第二个方法是失败时调用。
	
	```
console.log(1)；
//通过方法获取promise对象
var promise=GoodListFty.testPromise();
//通过then方法触发状态监听
promise.then(
    function(data){
        console.log(2);
        return data;
    },
    function(reason){

    }
).then(function(data){
    console.log(7);
    console.log(data);
}).finally(
    function(){
        console.log(3);
    });
console.log(4); 	```29. 在控制器中注入$rootScope对象使用时面对的是页面中的各个控制器，通过$rootScope绑定的事件在各个控制器中都会触发生效，$scope只针对一个控制器。Angular中绑定事件调用obj.$on.(eventName,fn).30. 在angular中大部分操作之后的效果都是由$apply（）方法自动在页面中完成，如果调用了非angular中的方法和函数如setTimeout方法后需要手动调用$apply方法来改变页面中对应的属性值。31. 在为标签绑定事件时可以传入$event参数，通过event常量返回当前触发事件的对象元素。32. 在使用插件ui-router时候可以使用angular的campoent写法，一种较为简便的angular写法。

	```angular.module('hellogalaxy').component('hello', {   template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +              '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',               controller: function() {     this.greeting = 'hello';        this.toggleGreeting = function() {       this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'}}})之后在$stateProvider中注册state{name: 'hello',  url: '/hello',  component: 'hello'}
	```
33. 包含Service,factory,Provider三个子级概念，都是返回service（父级概念）对象三种概念定义模块的使用场景：	- Factory:返回一个匿名对象，匿名对象中是方法的集合 return{各种方法}	- Service:在一个模块中返回多个服务，适合用service创建模块	- Provider：是service的底层实现，angular本身的东西，提供的服务34. 原声JS中调用angular的$scope：  可以给$scope中添加原声的JavaScript函数

	```        var appElement= $('[ng-controller="myCtrl"]');        var $scope = angular.element(appElement).scope();	```

# # JSONP由于默认angular提供的异步请求对象不支持自定义回调函数名angular随机分配的回调函数名称不被豆瓣支持。所以通过service自己写方法来获取豆瓣上的数据。使用时给controller注入'HttpService'通过HttpService.jsonp（url，data，callback）得到data数据。注意：在angular中如果通过自己写的函数或第三方的库来调用ajax请求必须要使用$apply（‘被改变的数据’）来通知angular$scope中的某个数据被改变，需要重新渲染。$scope.$apply（）；可以刷新所有的数据。

		(function(angular) {  	// 由于默认angular提供的异步请求对象不支持自定义回调函数名  	// angular随机分配的回调函数名称不被豆瓣支持 	 var http = angular.module('moviecat.services.http', []); 	 http.service('HttpService', ['$window', '$document', function($window, $document) {   	 // url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行   	 this.jsonp = function(url, data, callback) {    	  // if (typeof data == 'function') {     	 //   callback = data;      	// }      	var querystring = url.indexOf('?') == -1 ? '?' : '&';      	for (var key in data) {        	querystring += key + '=' + data[key] + '&';      	}      	var fnSuffix = Math.random().toString().replace('.', '');      	var cbFuncName = 'my_json_cb_' + fnSuffix;      	querystring += 'callback=' + cbFuncName;      	var scriptElement = $document[0].createElement('script');      	scriptElement.src = url + querystring;      	// 不推荐      	$window[cbFuncName] = function(data) {        	callback(data);        	$document[0].body.removeChild(scriptElement);  //使用完后清除掉json文件      	};      	$document[0].body.appendChild(scriptElement);    	};  	}]);	})(angular);利用scriptjs来实现异步加载库，先引入angular-loader，因为scriptjs异步加载可能会因为有些文件小而提前加载完成，在未加载完他的依赖库就执行导致错误，angular-loader会根据文件的依赖顺序进行异步加载
	$script([      './bower_components/angular/angular.js',      './bower_components/angular-route/angular-route.js',      './app.js' // 由于这个包比较小，下载完成过后就直接执行，为保证执行顺序要先引用angular-load    ], function() {  //库全部加载完后执行这个回调函数      console.log(angular);      angular.bootstrap(document, ['moviecat']);    }); 
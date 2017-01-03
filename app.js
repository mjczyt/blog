var exec = require("child_process").exec;

exec("hexo server", function (err, stdout, stderr) {
	console.log(stdout);
	console.log("start hexo server");
});
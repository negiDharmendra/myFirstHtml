var http = require('http');
var fs  = require('fs');
var querystring = require('querystring');
var EventsEmitter = require('events').EventEmitter;
var emitter = new EventsEmitter();

var getHandler = [
	{path:'^/$', handler:serveDefaultFile},
	{path:'', handler:serveAllFile},
	{path:'', handler:fileNotFound}
];

var postHandler = [
	{path:'', handler:postGivenDataIntoRelevantFile},
	{path:'', handler:methodNotAllowed}
];

var match_URL_patterns = function(url){
	return function(handler){
		return url.match(new RegExp(handler.path,'g'));
	};
};

emitter.on('next',function(handler,req,res,next){
	if(handler.length==0) return
	var pathHandlers = handler.shift();
	pathHandlers.handler(req,res,next)
})

var all_get_handler = function(req,res){
	var get_handler = getHandler.filter(match_URL_patterns(req.url));
	function next(){
		emitter.emit('next',get_handler,req,res,next);
	};
	next();
};

var all_post_handler = function(req,res){
	var post_handler = postHandler.filter(match_URL_patterns(req.url));
	function next(){
		emitter.emit('next',post_handler,req,res,next);
	};
	next();
};

var requestHandler = function(req,res){
	console.log("url==>",req.url)
	console.log("method==>",req.method)
	if(req.method=="POST"){
		all_post_handler(req,res)
	}
	else if(req.method=="GET"){
		all_get_handler(req,res)
	}
}
//==================================GET=======================================================
function fileNotFound(req,res,next){
	res.writeHead(405)
	console.log(res.statusCode+"\n-------------------------------------------------------");
	res.end("<html><head><title></title></head><body><h>File Not Found</h></body></html>")
}

function serveDefaultFile(req,res,next){
	fs.readFile('./index.html','utf-8',function(err,data){
		res.writeHead(200,{contentLength:data.length})
		console.log(res.statusCode+"\n-------------------------------------------------------");
		res.end(data);
	})
}

function serveAllFile(req,res,next){
	fs.readFile('.'+req.url,function(err,data){
		if(data){
			res.writeHead(200,{contentLength:data.length})
			console.log(res.statusCode+"\n-------------------------------------------------------");
			res.end(data);
		}
		else next();
	})
};
//==================================POST=======================================================
function maintainDataBase(comment){
	var dataBase = fs.existsSync('./myData/studentDetails.json')&&JSON.parse(fs.readFileSync('./myData/studentDetails.json','utf-8'))||{};
	dataBase[comment.name] = comment;
	var jsonData = JSON.stringify(dataBase)
	fs.writeFileSync('./myData/studentDetails.json',jsonData);
};

function parepareHtml(comment){
	var time = new Date().toString().substr(0,24)
	return "<tr><td>"+comment.name+"</td><td>"+comment['D.O.B']+"</td><td>"+comment.employee_id+"</td><td>"+comment.e_mail+"</td><td>"+comment.Git_HUB+"</td><td>"+comment.contact_number+"</td></tr>"
}

function postGivenDataIntoRelevantFile(req,res,next){
	var data = '';
	req.on('data',function(chunk){
		data+=chunk;
		data = querystring.parse(data);
	console.log(data)
	})
	req.on('end',function(){
		maintainDataBase(data)
		var commentData = JSON.parse(fs.readFileSync('./myData/studentDetails.json','utf-8'));
		var keys = Object.keys(commentData).sort();
		commentData = keys.map(function(key){return commentData[key]})
		console.log(commentData,"=============++++++++++++++++++++")
		var dataToBeAdded = commentData.map(parepareHtml)
		var fileData = fs.readFileSync("./step2015_iframe.html",'utf-8').split(/\n\r|\n\t|\n/);
		var fileDataInArray = fileData.slice(0,23)
		fileDataInArray = fileDataInArray.concat(dataToBeAdded)
		fileDataInArray.push("</table>\n</div>\n</body>\n</html>")
		fs.writeFileSync("./step2015_iframe.html",fileDataInArray.join('\n'));
		res.writeHead(301,{date: new Date(),'content-type': 'text/html',
		  'content-length': fileData.length,connection: 'close',Location:"./step2015_details.html"});
		res.end()
	})
};

function methodNotAllowed(req,res,next){
	res.writeHead(404);
	console.log(res.statusCode+"\n-------------------------------------------------------");
	res.end("This"+ req.method+" method is not allowed for this link.")
}
var port = +process.argv[2]
http.createServer(requestHandler).listen(port, function(){
	console.log("Server is started at port \""+port+"\"")
});
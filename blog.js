var express = require("express"),
	app = express();
	
	var arrayPosts=[];
	
app.configure(function() {
	app.engine("jade", require("jade").__express);
	app.set("views", "./views");
	app.set("view engine", "jade");
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.multipart());
	app.use(express.methodOverride());
	  app.use(app.router)
	app.use(express.static(__dirname +'/public'));
})


app.get('/new', function(req, res) {
    res.redirect('/posts/new');
})

app.get("/", function(req, res) {
	res.render("layout.jade", {});
})

app.get("/posts", function(req, res) {
	res.render("post-list.jade", {posts: arrayPosts});
})

app.get("/posts/new", function(req, res) {
	res.render("new-post.jade", {post:{date:null, id: arrayPosts.length}});
})

app.get("/posts/:id", function(req, res) {
	res.render("post-detail.jade", {post: req.post});
})

app.get("/posts/:id/edit", function(req, res) {
	res.render("new-post.jade", {post:req.post});
})

app.post('/posts', function(req, res) {
	var post={};
	var len = arrayPosts.length?arrayPosts.length:0;
	post.id=len;
	post.title=req.body.title;
	post.content=req.body.content;
	post.date='11/12/1900'
	arrayPosts[len]=post;
    res.redirect('/posts');
})

app.put('/posts/:id', function(req, res) {
	console.log("put");
	req.post.title=req.body.title;
	req.post.content=req.body.content;
    res.redirect('/posts/'+req.post.id);
})

app.del('/posts/:id', function(req, res) {
	console.log("del");
	var index = 0;
	var keys = [];
	for (var key in arrayPosts) {
		if(arrayPosts[key] == req.post){
			break;
		}
		index++;
	}
	console.log("index "+index);
	if(index >= 0){	
		arrayPosts.splice(index,1);
	}
    res.redirect('/posts');
})

app.param("id", function(req, res, next, postId) {
	req.post = arrayPosts[postId];
	if (typeof err !== 'undefined' || !req.post) {
		res.redirect('/');
	} else {
		next();
	}
});

app.listen(3000)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article")
const ArticleRouter = require("./routes/articles");
const methodOverride = require('method-override');
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{
    // const articles = [
    //     {
    //         title: "Title 1",
    //         description: "Description 1",
    //         createdAt: new Date(),
    //     },  
    //     {
    //         title: "Title 2",
    //         description: "Description 2",
    //         createdAt: new Date(),
    //     },
    //     {
    //         title: "Title 3",
    //         description: "Description 3",
    //         createdAt: new Date(),
    //     },
    // ]
    const articles = await Article.find().sort({createdAt: 'desc'});

    res.render("articles/index", {articles: articles});
});

app.use('/articles', ArticleRouter);
app.listen(PORT, () =>{
    console.log(`Running server on http://localhost:${PORT}`);
});
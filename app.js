var express = require('express');
var path = require('path');
var expressHbs = require('express-handlebars');
// var userRouter = require('./routes/userRoutse');
var userControllers = require('./controllers/userControllers');
var productController = require('./controllers/productController');
var mongoose = require('mongoose');
var bodyparser=require('body-parser');

const url="mongodb+srv://hungnvpd06861:hung123@cluster0.2kpfpct.mongodb.net/dbUserManager?retryWrites=true&w=majority"


var app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());



app.use(express.json());


app.use(express.static('assets'));
app.use(express.static('images'));
mongoose.connect(url,{useNewUrlParser: true,
    useUnifiedTopology: true});

// app.use(userRouter);

app.use('/user',userControllers);
app.use('/product', productController);
app.listen(9000);
app.engine('.hbs', expressHbs.engine(
    {
        extname: '.hbs',
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, '/views/layouts/'),
        partialsDir: path.join(__dirname, '/views/partials/'),
        helpers: {
            'for': function (n, block) {
                let accum = '';
                for (let i = 0; i < n; ++i) {
                    accum += block.fn(i, { data: { index: i } });
                }
                return accum;
            },
            isActive : function (page, current) {
                return page === current ? 'active' : '';
            }
        }
    }
));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))

app.get('/home', function (req, res) {
    res.render('index', { pageTitle: 'Trang chủ', cssPath: '/css/index.css' });//file name
});

app.get('/product', function (req, res) {
    res.render('product', { pageTitle: 'Sản phẩm', cssPath: '/css/product.css' });
});

app.get('/contact', function (req, res) {
    res.render('contact', { pageTitle: 'Liên hệ', cssPath: '/css/auth.css' });
});

app.get('/about', function (req, res) {
    res.render('about', { pageTitle: 'Giới thiệu', cssPath: '/css/about.css' });
});

app.get('/signin', function (req, res) {
    res.render('signin', { pageTitle: 'Đăng nhập', cssPath: '/css/auth.css' });
});

app.get('/signup', function (req, res) {
    res.render('signup', { pageTitle: 'Đăng ký', cssPath: '/css/auth.css' });
});



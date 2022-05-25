// Models for Database
const { User } = require('./models/User');
const { Product } = require('./models/Product');
const { News } = require('./models/News');

// Libs for server
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Settings
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

/* USER */
app.post('/user-register', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: { message: 'Данные не получены или они не существуют!' } });
        }

        const { Username, Useremail, Userpassword, Userrole } = req.body;

        const canditate = await User.findOne({ username: Username, useremail: Useremail });

        if (canditate) {
            return res.status(400).json({ error: { message: `Такой пользователь уже существует!` } });
        }

        const hashPassword = await bcrypt.hash(Userpassword, 10);

        const newUser = new User({
            username: Username,
            useremail: Useremail,
            userpass: hashPassword,
            userrole: Userrole,
            userimage: 'defaultUser.png'
        });

        await newUser.save();
        return res.status(201).json({
            user: {
                _id: newUser._id,
                username: newUser.username,
                useremail: newUser.useremail,
                userrole: newUser.userrole,
                userimage: newUser.userimage
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: { messeage: 'Ошибка сервера, ответа нет!' } });
    }
});

app.post('/user-login', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: { message: 'Данные не получены или они не существуют!' } });
        }

        const { Useremail, Userpassword } = req.body;
        const user = await User.findOne({ useremail: Useremail });

        if (!user) {
            return res.status(400).json({ error: { message: 'Не могу найти пользователя с такой почтой!' } });
        }

        const isMatchPass = await bcrypt.compare(Userpassword, user.userpass);

        if (!isMatchPass) {
            return res.status(400).json({ error: { message: 'Неправильный пароль!' } });
        }

        return res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                useremail: user.useremail,
                userrole: user.userrole,
                userimage: user.userimage
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: { messeage: 'Ошибка сервера, ответа нет!' } });
    }
});

app.get('/get-users', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(201).json({ users: users });
    } catch (e) {
        return res.status(500).json({ errors: [{ message: `Ошибка сервера, статус 500!` }] });
    }
});

app.put('/edit-user', async (req, res) => {
    try {
        const { Editname, Editemail, Editrole, Editeduser } = req.body;

        const user = await User.find({ _id: Editeduser._id, username: Editeduser.username, useremail: Editeduser.useremail });

        if (!user) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }

        await User.updateOne({ _id: Editeduser._id }, {
            $set: {
                username: Editname,
                useremail: Editemail,
                userrole: Editrole,
            }
        });

        return res.status(201).json({ message: 'Пользователь был обновлён!' });

    } catch (error) {
        console.error(error);
    }
});

app.delete('/delete-user', async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ _id: data._id });

        if (!user) {
            return res.status(404).json({ errors: [{ message: `Такой пользователь не найден!` }] });
        }

        if (!data._id) {
            return res.status(404).json({ errors: [{ message: `Такого ID не существует!` }] });
        }

        await User.deleteOne({ _id: data._id });
        return res.status(201).json({ message: `Пользователь был удалён!` });
    } catch (error) {
        console.error(error);
    }
});

/* USER PRODUCTS */
app.put('/add-user-product', async (req, res) => {
    try {
        const { Userdata, Productdata } = req.body;
        
        const candidate = await User.find({ _id: Userdata._id, username: Userdata.username, useremail: Userdata.useremail });
        
        if (!candidate) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }
        
        await User.updateOne({ _id: Userdata._id }, {
            $push: {
                userproducts: {
                    productname: Productdata.productname,
                    productkey: Productdata.productkey,
                    productprice: Productdata.productprice,
                    productdesc: Productdata.productdesc,
                    productimage: Productdata.productimage,
                }
            }
        });
        
        return res.status(201).json({ message: 'Продукт был добавлен пользователю!' });
        
    } catch (error) {
        console.error(error);
    }
});

app.post('/get-user-products', async (req, res) => {
    try {
        const { Userdata } = req.body;

        const candidate = await User.find({ _id: Userdata._id, username: Userdata.username, useremail: Userdata.useremail });

        if (!candidate) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }

        return res.status(201).json({
            products: {
                userproducts: candidate[0].userproducts
            }
        })

    } catch (error) {
        console.error(error);
    }
});

app.delete('/delete-user-product', async (req, res) => {
    try {
        const { Userdata, Product } = req.body;
        const candidate = await User.findOne({ _id: Userdata._id });

        if (!candidate) {
            return res.status(400).json({ error: { message: 'Я не могу найти такого пользователя!' } });
        }

        await User.updateOne({ _id: Userdata._id }, {
            $pull: {
                userproducts: {
                    productkey: Product.productkey,
                }
            }
        });

        return res.status(201).json({ message: 'Предмет был удалёе!' });

    } catch (error) {
        console.error(error);
    }
});


/* USER ORDERS */
app.post('/create-user-orders', async (req, res) => {
    try {
        const { UserId, Products, PhoneNumber, OrderNum, OrderDate } = req.body;

        const candidate = await User.find({ _id: UserId });

        if (!candidate) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }

        await User.updateOne({ _id: UserId }, {
            $push: {
                userorders: {
                    ordernum: OrderNum,
                    orderproducts: Products,
                    phonenumber: PhoneNumber,
                    orderstatus: 'Обработка',
                    orderdate: OrderDate
                }
            },

            $set: {
                userproducts: []
            },
        },
            {
                multi: true
            });

        return res.status(201).json({ message: 'Заказ успешно оформлен!' });

    } catch (error) {
        console.error(error);
    }
})

app.post('/get-user-orders', async (req, res) => {
    try {
        const { Userdata } = req.body;

        const candidate = await User.find({ _id: Userdata._id, username: Userdata.username, useremail: Userdata.useremail });

        if (!candidate) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }

        return res.status(201).json({
            orders: {
                userorders: candidate[0].userorders
            }
        })

    } catch (error) {
        console.error(error);
    }
});

app.get('/get-all-orders', async (req, res) => {
    try {
        const arrayOrders = [];
        const allUsers = await User.find();

        for (let user in allUsers) {
            for (let order in allUsers[user].userorders) {
                arrayOrders.push(allUsers[user].userorders[order]);
            }
        }

        res.status(200).json({ orders: arrayOrders });
    } catch (error) {
        console.error(error)
    }
});

app.post('/update-order', async (req, res) => {
    try {
        let userData, userOrderNum, userOrder;
        const { Order, Status } = req.body;
        const allUsers = await User.find();

        for (let user in allUsers) {
            for (let order in allUsers[user].userorders) {
                if (Order.ordernum === allUsers[user].userorders[order].ordernum) {
                    userData = allUsers[user];
                    userOrder = allUsers[user].userorders[order];
                    userOrderNum = allUsers[user].userorders[order].ordernum;
                }
            }
        }

        userOrder.orderstatus = Status;

        await User.updateOne({ _id: userData._id }, {
            $pull: {
                userorders: {
                    ordernum: userOrderNum
                }
            }
        });

        await User.updateOne({ _id: userData._id }, {
            $push: {
                userorders: {
                    ordernum: userOrder.ordernum,
                    orderproducts: userOrder.orderproducts,
                    phonenumber: userOrder.phonenumber,
                    orderstatus: userOrder.orderstatus,
                    orderdate: userOrder.orderdate
                }
            }
        });

        res.status(200).json({ message: 'Статус заказа был изменён!' });
    } catch (error) {
        console.error(error);
    }
});


/* NEWS */
app.post('/create-news', async (req, res) => {
    try {
        if (!req.files) {
            res.status(400).json({ error: 'Файл не был загружен или найден! ' });
        }

        const file = req.files.file;

        file.mv(`${__dirname}/client/public/news/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.status(201).json({ message: 'Файл загружен!', fileName: file.name, filePath: `/news/${file.name}` })
        });

        const { newsHeader, newsTitle, newsContent, newsAuthor, newsDate } = req.body;

        const article = await News.findOne({ newsheader: newsHeader });

        if (article) {
            return res.status(400).json({ errors: { message: `Новость с таким заголовком уже существует!` } });
        }

        const newArticle = new News({
            newsheader: newsHeader,
            newstitle: newsTitle,
            newscontent: newsContent,
            newsimage: file.name,
            newsauthor: newsAuthor,
            newsdate: newsDate
        });

        await newArticle.save();
        return res.status(201).json({ article: newArticle });
    } catch (error) {
        console.error(error);
    }
});

app.get('/get-news', async (req, res) => {
    try {
        const news = await News.find();
        return res.status(201).json({ articles: news });
    } catch (e) {
        return res.status(500).json({ errors: [{ message: `Ошибка сервера, статус 500!` }] });
    }
})

/* PRODUCT */
app.post('/create-product', async (req, res) => {
    try {
        if (!req.files) {
            res.status(400).json({ error: 'Файл не был загружен или найден! ' });
        }

        const file = req.files.file;

        file.mv(`${__dirname}/client/public/products/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.status(201).json({ message: 'Герой успешно создан!', fileName: file.name, filePath: `/products/${file.name}` })
        });

        const { productName, productKey, productPrice, productDesc, dateAdded } = req.body;

        const canditate = await Product.findOne({ productname: productName, productkey: productKey });

        if (canditate) {
            return res.status(400).json({ errors: { message: `Такой герой уже существует, может другого добавить?` } });
        }

        const newProduct = new Product({
            productname: productName,
            productkey: productKey,
            productprice: productPrice,
            productdesc: productDesc,
            productimage: file.name,
            added: dateAdded,
        });

        await newProduct.save();
        return res.status(201).json({ product: newProduct });
    } catch (error) {
        console.error(error);
    }
});

app.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(201).json({ products: products });
    } catch (e) {
        return res.status(500).json({ errors: [{ message: `Ошибка сервера, статус 500!` }] });
    }
});

/* FEEDBACKS */
app.put('/create-user-feedback', async (req, res) => {
    try {
        const { OrderNum, Userdata, Feedback } = req.body;

        const user = await User.find({ _id: Userdata._id, username: Userdata.username, useremail: Userdata.useremail });

        if (!user) {
            return res.status(400).json({ error: { message: 'Такого пользователя не существует!' } });
        }

        await User.updateOne({ _id: Userdata._id }, {
            $push: {
                userfeedbacks: {
                    name: Feedback.Username,
                    surname: Feedback.Usersurname,
                    phonenumber: Feedback.Usernumber,
                    feedback: Feedback.Feedback,
                    date: Feedback.Date,
                    ordernum: OrderNum,
                }
            }
        });

        return res.status(201).json({ message: 'Отзыв был создан!' });

    } catch (error) {
        console.error(error);
    }
});

app.get('/get-all-feedbacks', async (req, res) => {
    try {
        const arrayFeedbacks = [];
        const allUsers = await User.find();

        for (let user in allUsers) {
            for (let feedback in allUsers[user].userfeedbacks) {
                arrayFeedbacks.push(allUsers[user].userfeedbacks[feedback]);
            }
        }
        res.status(200).json({ feedbacks: arrayFeedbacks });
    } catch (error) {
        console.error(error)
    }
});

// Functiion for starting server
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://shopopalo:Var54321@cluster0.qvze0.mongodb.net/awesome?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.error(e);
    }
}

start();
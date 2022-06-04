let mongoose = require('mongoose');

let DB_URL = 'mongodb+srv://nagaraj:nagaraj@cluster0.hujvw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(
    DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log('DB creation failed');
        } else {
            console.log('DB creation succussfull....!');

        }
    }
)
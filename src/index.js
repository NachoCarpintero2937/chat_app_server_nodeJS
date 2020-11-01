const express = require('express');
const app = express();
var cors = require('cors')

//settings
app.set('port', process.env.PORT || 80);

// middlewares
app.use(express.json(), cors({ credentials: true, origin: true }));

//routes
app.use([
    require('./routes/solicitudes'),
    require('./routes/usuario'),
    require('./routes/login')
])

app.listen(app.get('port'), () => {

});
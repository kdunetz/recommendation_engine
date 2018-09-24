/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.doSQLQuery = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
 var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '35.226.239.197',
    database : 'kevin',
    user     : 'root',
    password : 'root',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM another_customer limit 0,15', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
        message += JSON.stringify(result);
    });
    res.status(200).send(message);
});

connection.end();

  
};
const db = require('./index.js');

const save = (data, callback) => {
    const sql = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${data.firstname}', '${data.lastname}', '${data.email}', '${data.password}')`;
    db.query(sql, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

const exists = (email, password, callback) => {
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            if(data.length !== 0){
                const id = data[0].id;
                const sqlStr = `SELECT * FROM goals WHERE userId = ${id}`;
                db.query(sqlStr, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else {
                       if(res.length === 0){
                           const data = {
                               id: id
                           };
                           callback(null, data)
                       }else {
                           callback(null, res);
                       }
                    }
                });
            }
        }
    });
};


const saveGoal = (data, callback) => {
    const sql = `INSERT INTO goals (title, status, category, userId) VALUES ('${data.title}', '${data.status}', '${data.category}', '${data.userId}')`;
    db.query(sql, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            const id = res.insertId;
            const sqlStr = `SELECT * FROM goals WHERE id = ${id}`;
            db.query(sqlStr, (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, res);
                }
            });
        }
    });
};

const editGoal = (data, callback) => {
    if (data['input'] === '') {
        const sql = `DELETE FROM goals WHERE id = ${data.toEdit}`;
        db.query(sql, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, [{id: 0, title: "", status: 0, category: "", userId: 0}]);
            }
        });
    } else {
        const sql = `UPDATE goals SET title = '${data.input}', status = '${data.progressStatus}' WHERE id = ${data.toEdit}`;
        db.query(sql, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                const sqlStr = `SELECT * FROM goals WHERE id = ${data.toEdit}`;
                db.query(sqlStr, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, res);
                    }
                });
            }
        });
    }
};

module.exports = {
    save,
    exists,
    saveGoal,
    editGoal
};
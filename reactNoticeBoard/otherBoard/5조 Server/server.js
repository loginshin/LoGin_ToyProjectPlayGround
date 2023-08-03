//server.js 파일
//npm install express --save
//npm install --save mysql 
//node .\server.js // 실행

// express
var express = require('express');
var app = express();
const cors = require('cors');
const date = require('date-utils');
const util = require('util');

app.use(express.urlencoded({extended : false}));
app.use(express.json())
app.use(cors());

// sql 연동 - db 계정 정보를 넣어줍시다.
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'condb'
});

db.connect(function(err) {
    if(err) throw err;
    console.log('DB is Connected!')
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

// API Server
//유저조회
app.get('/users', (req, res) => {
    var sql = 'SELECT * FROM condb.user;' //쿼리문이 들어가는 변수
    db.query(sql,
    (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });
});

//글 작성
app.post('/questions', (req, res) => {
    let post_title = req.body.params.post_title;
    let post_content = req.body.params.post_content;
    let post_nickname = req.body.params.post_nickname;
    let post_user_id = req.body.params.post_user_id;
    let values = [post_title, post_content, 0, post_nickname, post_user_id]

    const sql = "INSERT INTO condb.post_info(post_title, post_content, post_like_count, post_nickname, post_user_id) VALUES(?, ?, ? ,?, ?)"
    db.query(sql,values,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

//전체 글 가져오기
app.get('/questions', (req, res) => {
    const sql = "SELECT * FROM condb.post_info ORDER BY post_id DESC;;"
    db.query(sql,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

//게시글 상세페이지 보기
app.post('/postview', (req, res) => {
    let post_id = req.body.params.post_id;

    const sql = "SELECT * FROM condb.post_info WHERE post_id = ?;"
    db.query(sql, post_id,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

//게시글 상세페이지 댓글
app.post('/postcomment', (req, res) => {
    let post_id = req.body.params.post_id;

    const sql = "SELECT * FROM condb.comment_info WHERE fk_post_info_id = ?;"
    db.query(sql, post_id,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

//댓글 작성
app.post('/comments', (req, res) => {
    let comment_content = req.body.params.comment_content;
    let comment_nickname = req.body.params.comment_nickname;
    let fk_post_info_id = req.body.params.comment_fk_post_info_id;
    let values = [comment_content, 0, comment_nickname, fk_post_info_id]

    const sql = "INSERT INTO condb.comment_info(comment_content, comment_like_count, comment_nickname, fk_post_info_id) VALUES(?, ?, ? ,?)"
    db.query(sql,values,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

//유저로그인
app.post('/onLogin', (req, res) => {
    console.log(`= = = > req : ${util.inspect(req)}`)
    // user_id, user_pw 변수로 선언
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
   
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = 'SELECT COUNT(*) AS result FROM user WHERE iduser = ?'
    db.query(sql1, user_id, (err, data) => {
        if(!err) {
           
           // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result < 1) {
                res.send('false')
            } else {
                const sql2 = 'SELECT * FROM user WHERE iduser = ? AND password = ?'

                const params = [user_id, user_pw]
                db.query(sql2,params,  (err, data) => {
                    if(!err) {
                        res.send(data[0])

                    } else {
                        res.send(err)
                    }
                })

            }
        } else {
            res.send(err)
        }
    })
});

//회원가입
app.post('/signup', (req, res) => {
    let iduser = req.body.params.id;
    let password = req.body.params.password;
    let nickname = req.body.params.username;
    let values = [iduser, password, nickname];

    const sql = "INSERT INTO condb.user(iduser, password, nickname) VALUES(?, ?, ?)"
    db.query(sql, values,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send("회원가입 성공");
        });
});

//id 중복체크
app.post('/idDuplicateCheck', (req, res) => {
    let iduser = req.body.params;

    const sql = "SELECT COUNT(*) as count FROM user WHERE iduser = ?;"
    db.query(sql, iduser,
        (err, result) => {
            if (err)
                console.log(err);
            else
                res.send(result);
        });
});

/* 업데이트
*/

app.post('/onUpdate', (req, res) => {
    const post_id = req.body.params.post_id;
    const post_title = req.body.params.post_title;
    const post_content = req.body.params.post_content;
    const post_nickname = req.body.params.post_nickname;

    // 게시글 nickname과 동일한 nickname이 mysql 에 있는 지 확인
    const sql = "SELECT COUNT(*) AS result FROM user WHERE nickname = ?"

    db.query(sql, post_nickname, (err, data) => {
        if (!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if (data.result < 1) {
                res.send("아이디 확인")
            } else { // 동일한 nickname 있으면
                //업데이트할 게시글 찾아서 업데이트
                const sql2 = "UPDATE post_info SET post_title = ?, post_content=? where post_id = ?"
                const params = [post_title, post_content, post_id]
                db.query(sql2, params, (err, data) => {
                    if (!err) {
                        res.send("성공")
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});


/* 델리트
1. 삭제하려는 유저의 닉네임과 게시글의 닉네임이 동일해야 삭제가능
2. 삭제할 post_id / 행 지우는 쿼리 작성
DELETE FROM 테이블명 WHERE post_id = 5 
*/

app.post('/onDelete', (req, res) => {
    const post_id = req.query.post_id;
    // post_nickname 변수로 선언
    const post_nickname = req.query.post_nickname;

    // 게시글 nickname과 동일한 nickname이 mysql 에 있는 지 확인
    const sql1 = "SELECT COUNT(*) AS result FROM user WHERE nickname = '?'"

    db.query(sql1, post_nickname, (err, data) => {

        if (!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            //console.log("data"+data.result);
            if (data.result < 1) {
                // res.send({ 'msg': ' nickname이 일치하지 않습니다.'})
                res.send('false')
            } else { // 동일한 nickname 있으면
                //삭제할 게시글 찾아서 삭제
                const sql2 = "DELETE FROM condb.post_info WHERE post_id = ?"
                db.query(sql2, post_id,
                    function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                        res.send('true');
                    });
            }
        } else {
            res.send(err)
        }
    })
});

/* 댓글 삭제 */


app.post('/onDeleteComment', (req, res) => {
    const comment_id =  req.body.params.comment_id;
    // post_nickname 변수로 선언
    const comment_nickname =  req.body.params.comment_nickname;
    // 게시글 nickname과 동일한 nickname이 mysql 에 있는 지 확인
    const sql1 = "SELECT COUNT(*) AS result FROM comment_info WHERE comment_nickname = ?"
    db.query(sql1, comment_nickname, (err, data) => {
        if (!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            //console.log("data"+data.result);
            if (data.result < 1) {
                // res.send({ 'msg': ' nickname이 일치하지 않습니다.'})
                res.send('false')
            } else { // 동일한 nickname 있으면
                //삭제할 게시글 찾아서 삭제
                const sql2 = "DELETE FROM condb.comment_info WHERE comment_id = ?"
                db.query(sql2, comment_id,
                    function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                        res.send('true');
                    });
            }
        } else {
            res.send(err)
        }
    })
});
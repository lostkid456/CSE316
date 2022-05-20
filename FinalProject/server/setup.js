//MySQL Schema setup if using MySQL
const mysql = require("mysql");
var async = require("async");
require("dotenv").config();

const table_setup = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

table_setup.connect(function (err) {
  if (err) throw err;
});

async.parallel(
  [
    function (callback) {
      table_setup.query(
        "drop table if exists user,question,answer,tag,comment,qu,qt,qv,qc,au,qa,ac,tu"
      );
      callback();
    },
  ],
  function (err) {
    if (err) {
      table_setup.end();
      throw err;
    }
    create_tables();
  }
);

function create_tables() {
  async.parallel(
    [
      function (callback) {
        table_setup.query(
          "create table user(uid int auto_increment not null, username varchar(36) not null,email varchar(256) not null,password text not null,\
          reputation int default 100,create_date datetime default current_timestamp,primary key(uid))"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table question(qid int auto_increment not null, title varchar(50),text text not null,summary varchar(140),\
          views int default 0,upvote int default 0, downvote int default 0,ask_date_time datetime default current_timestamp,primary key(qid))"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table tag(tid int auto_increment not null, name text not null,primary key(tid))"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table answer(aid int auto_increment not null,text text not null,ans_date_time datetime default current_timestamp\
          ,primary key(aid))"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table comment(cid int auto_increment not null,text text not null,\
          c_date_time datetime default current_timestamp,user varchar(36),primary key(cid))"
        );
        callback();
      },
    ],
    function (err) {
      if (err) {
        table_setup.end();
        throw err;
      }
      addRelationshipTables();
    }
  );
}

function addRelationshipTables() {
  async.parallel(
    [
      function (callback) {
        table_setup.query(
          "create table qu(qid int,uid int,primary key(qid,uid),foreign key (qid) references question(qid) on delete cascade,foreign key(uid) \
          references user(uid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table qt(qid int,tid int,primary key(qid,tid),foreign key (qid) references question(qid) on delete cascade,foreign key(tid) \
          references tag(tid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table qa(qid int,aid int,primary key(qid,aid),foreign key (qid) references question(qid) on delete cascade,foreign key(aid) \
          references answer(aid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table au(aid int,uid int, primary key(aid,uid),foreign key (aid) references answer(aid) on delete cascade,foreign key(uid) \
          references user(uid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table tu(tid int,uid int,primary key(tid,uid),foreign key(tid) references tag(tid) on delete cascade,foreign key(uid) \
          references user(uid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table qv(qid int,uid int,vote int,primary key(qid,uid),foreign key(qid) references question(qid) on delete cascade,foreign key(uid) references \
          user(uid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table ac(aid int,cid int,primary key(aid,cid),foreign key(aid) references answer(aid) on delete cascade,foreign key(cid) references \
          comment(cid) on delete cascade)"
        );
        callback();
      },
      function (callback) {
        table_setup.query(
          "create table qc(qid int,cid int, primary key(qid,cid),foreign key(qid) references question(qid) on delete cascade,foreign key(cid) references \
          comment(cid) on delete cascade)"
        );
        callback();
      },
    ],
    function (err) {
      if (err) {
        table_setup.end();
        throw err;
      }
      console.log("All tables set up!!");
      table_setup.end();
    }
  );
}

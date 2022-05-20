// Answer-related queries
exports.getQuestionAnswer = function (connection, values) {
  const query =
    "select answer.text,answer.aid,answer.ans_by,answer.ans_date_time from answer inner join qa on answer.aid=qa.ansId inner join question on question.qid=qa.qstnId where question.qid=? \
    order by answer.ans_date_time desc";
  return new Promise((resolve) => {
    connection.query(query, values, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

exports.addAnswer=function(connection,values){
  const query="insert into answer(ans_by,text) values(?,?)";
  return new Promise((resolve)=> {
    connection.query(query,values,(err,result)=>{
      if(err) throw err;
      resolve(result);
    });
  });
};

exports.updateQa=function(connection,values){
  const query="insert into qa(qstnId,ansId) values(?,?)";
  return new Promise((resolve)=>{
    connection.query(query,values,(err,result)=>{
      if(err) throw err;
      resolve(result);
    })
  });
};

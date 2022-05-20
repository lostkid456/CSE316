// Question-related Queries
exports.getQuestions = function (connection) {
  const query =
    "select question.qid,tag.tid as tag_id,tag.name as tag_name,count(qa.ansId) as answer_count,question.views,question.title,question.text,question.asked_by,question.ask_date_time from question inner join \
        qt on question.qid=qt.qstnId inner join tag on tag.tid=qt.tagId left join qa on question.qid=qa.qstnId group by question.qid,tag.tid \
        order by question.ask_date_time desc";
  return new Promise((resolve) => {
    connection.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

exports.addQuesion=function(connection,values){
    const query="insert into question(title,text,asked_by) values(?,?,?)";
    return new Promise((resolve)=>{
        connection.query(query,values,(err,result)=>{
            if(err) throw err;
            resolve(result);
        })
    })
}

exports.updateQt=function(connection,values){
    const query="insert into qt(qstnId,tagId) values(?,?)";
    return new Promise((resolve)=>{
        connection.query(query,values,(err,result)=>{
            if(err) throw err;
            resolve(result);
        })
    })
}

exports.updateViewCount=function(connection,values){
  const query="update question set views=views+1 where qid=?";
  return new Promise((resolve)=>{
    connection.query(query,values,(err,result)=>{
      if(err) throw err;
      resolve(result);
    })
  })
}

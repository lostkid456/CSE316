// Tag related queries
exports.getTags = function (connection) {
  const query = "select tag.tid as tag_id,tag.name as tag_name from tag";
  return new Promise((resolve) => {
    connection.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

exports.createTag=function(connection,tag){
    const query="insert into tag(name) values (?)";
    return new Promise((resolve)=>{
        connection.query(query,[tag],(err,result)=>{
            if(err) throw err;
            resolve(result);
        });
    });
}

module.exports = {
  shitman: () => {
    return 'niggerbigy'
  },
  SQL: (dbInstance) => async (query, next) => {
    // console.log(dbInstance, `dbInstance`, query);

    let getConnection = await new Promise((resolve, reject) => {
      dbInstance.getConnection((err, conn) => {
        if (err) {
          resolve({
            asyncR: false,
            result: err
          })
        } else {
          console.log(`dbInstance.getConnection() 获取成功`);
          resolve({
            asyncR: true,
            result: conn
          })
        }
      })
    })
    if (!getConnection.asyncR) {
      // next(getConnection.result);
      console.log("获取POOL  getConnection 失败：", getConnection.result);
    }
    let connection = getConnection.result;
    let queryR = await new Promise((resolve, reject) => {
      connection.query(query, (err, result, fields) => {
        if (err) {
          console.log(err, query, '查询失败');
          resolve({
            asyncR: false,
            result: err
          })
        } else {
          console.log("查询成功");
          resolve({
            asyncR: true,
            result: {
              result,
              fields
            }
          })
        }
      })
    })
    connection.release();
    return queryR;
  }
}
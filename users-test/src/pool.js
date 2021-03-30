const pg = require('pg');

class Pool {
  _pool = null;
  connect(opt){
    this._pool = new pg.Pool(opt);
    return this._pool.query('select 1 + 1;');
  }
  close(){
    return this._pool.end();
  }
  query(sql,params){
    return this._pool.query(sql,params)
  }
}

module.exports = new Pool();

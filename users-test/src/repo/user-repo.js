const pool = require('../pool');
class UserRepo{
  static async find(){
    const res = await pool.query('select * from users;');
    return res.rows;
  }
  static async findById(id){
    const {rows} = await pool.query(
      'select * from users where id = $1',
      [id]
    );
    return rows[0];

  }
  static async insert(username,bio){
  const {rows}  = await pool.query(
      'insert into users (username,bio) values ($1,$2) returning *;',
      [username,bio]
    );
    return rows[0];
  }
  static async update(id,username,bio){
    const {rows}  = await pool.query(
        'UPDATE users set username=$1, bio=$2 where id=$3 returning *;',
        [username,bio,id]);
      return rows[0];
  }
  static async delete(id){
    const {rows}  = await pool.query(
        'delete from users where id=$1 returning *;',
        [id]);
      return rows[0];
  }
  static async count(){
    const {rows} = await pool.query('select count(*) from users;');
    return rows[0].count 
  }
}

module.exports  = UserRepo;

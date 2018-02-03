import { createPool, Pool, PoolConnection, MysqlError } from "mysql";
import { Result } from "./result";
import { Optional } from "./option";

export namespace database {
  export function createDbPool() {
    return createPool({
      host: "localhost",
      user: "game",
      password: "asdf",
      database: "test",
      connectionLimit: 10
    });
  }

  function runQuery(connection: PoolConnection | Pool, query: string, queryParameters: any): Promise<any> {
    return new Promise((resolve, reject)=> {
      connection.query(query, queryParameters, (error, results)=> {
        if(error) {
          reject(error);
          return resolve(Result.Error(error));
        }
        resolve(results);
      });
    });
  }

  async function beginTransaction(pool: Pool): Promise<PoolConnection> {
    return new Promise<PoolConnection>((resolve, reject)=> {
      return pool.getConnection((error, connection)=> {
        if(error) {
          reject(error);
          return;
        }
        connection.beginTransaction((error)=> {
          if(error) {
            reject(error);
            return;
          }

          resolve(connection);
        });
      });
    });
  }

  export async function register(pool: Pool, data: { username: string, password: string }): Promise<Result<number, MysqlError>> {
    try {
      let transactionConn = await beginTransaction(pool);
      try {
        let playerId = await runQuery(transactionConn, "insert into player_account set ?", data);
        await runQuery(transactionConn, "insert into player_state set ?", {player_id: playerId.insertId, state: "{}"});
        transactionConn.commit();
        return Result.Ok(playerId.insertId);
      } catch(e) {
        console.error(e);
        transactionConn.rollback();
        return Result.Error(e);
      }
    } catch (e) {
      console.error(e);
      return Result.Error(e);
    }
  }

  export async function getUser(pool: Pool, data: { username: string }): Promise<Result<Optional<{password: string}>, MysqlError>> {
    let results: {password: string}[] = await runQuery(pool, "select password from player_account where ?", data);
    if (results.length <= 0) {
      return Result.Ok(Optional.None);
    }
    let firstRow = results[0];
    return Result.Ok(Optional.Some({password: firstRow.password}));
  }
}

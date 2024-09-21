import { Context } from 'mocha';

// import GlobalVariables from '../../src/config/global.config';
// import MYSQL_DB_CONNECTION from '../../src/config/mysqldb.config';
// import ORACLE_DB_CONNECTION from '../../src/config/oracledb.config';

// let globalVariables: GlobalVariables | null = null
// let mysqlConnection: MYSQL_DB_CONNECTION | null = null;
// let oracleConnection: ORACLE_DB_CONNECTION | null = null;
export async function mochaGlobalSetup(this: Context) {
  console.log("BeforeAll Hooks************************************************");
//   globalVariables = GlobalVariables.getInstance();
//   mysqlConnection = MYSQL_DB_CONNECTION.getInstance();
//   oracleConnection = ORACLE_DB_CONNECTION.getInstance();
//   await globalVariables.setAuthToken();
//   await mysqlConnection.createConnection('localhost', 3306, 'root', 'singhrajkr', 'sms');
//   await oracleConnection.createConnection('QA');
//   globalVariables.addVar('HELLO', 'NAMASTE MOCHA.JS');
//   console.log("globalVariables - ", globalVariables);
//   console.log("mysqlConnection - ", MYSQL_DB_CONNECTION);
//   console.log("oracleConnection - ", ORACLE_DB_CONNECTION);
};



export async function mochaGlobalTeardown(this: Context) {
  console.log("AfterAll Hooks************************************************");
//   console.log("globalVariables - ", globalVariables);
};
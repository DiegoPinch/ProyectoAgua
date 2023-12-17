import mysql from 'mysql';
import Keys from '../keys';

const connection = mysql.createConnection(Keys);

export default connection;


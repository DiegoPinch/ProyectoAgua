import mysql from 'mysql';
import Keys from '../keys';

const connection = mysql.createPool(Keys);

export default connection;


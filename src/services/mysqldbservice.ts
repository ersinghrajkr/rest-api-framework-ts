// src/services/dbService.ts

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();  // To load environment variables from .env

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export class DbService {
    /**
     * Execute a query against the database.
     * @param query - The SQL query to execute.
     * @param params - Optional query parameters.
     * @returns The results of the query.
     */
    static async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    /**
     * Retrieve data from a specific table.
     * @param tableName - The name of the table to query.
     * @param conditions - Optional SQL WHERE conditions.
     * @returns The selected rows.
     */
    static async getRows(tableName: string, conditions: string = '1=1'): Promise<any> {
        const query = `SELECT * FROM ${tableName} WHERE ${conditions}`;
        return this.executeQuery(query);
    }

    /**
     * Insert a row into a table.
     * @param tableName - The name of the table to insert into.
     * @param data - An object representing the row data (column-value pairs).
     * @returns The result of the insertion.
     */
    static async insertRow(tableName: string, data: Record<string, any>): Promise<any> {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        return this.executeQuery(query, values);
    }

    /**
     * Update a row in a table.
     * @param tableName - The name of the table to update.
     * @param data - An object representing the row data (column-value pairs).
     * @param conditions - SQL WHERE conditions to identify which rows to update.
     * @returns The result of the update.
     */
    static async updateRow(tableName: string, data: Record<string, any>, conditions: string): Promise<any> {
        const columns = Object.keys(data).map(col => `${col} = ?`).join(', ');
        const values = Object.values(data);

        const query = `UPDATE ${tableName} SET ${columns} WHERE ${conditions}`;
        return this.executeQuery(query, values);
    }

    /**
     * Delete a row from a table.
     * @param tableName - The name of the table to delete from.
     * @param conditions - SQL WHERE conditions to identify which rows to delete.
     * @returns The result of the deletion.
     */
    static async deleteRow(tableName: string, conditions: string): Promise<any> {
        const query = `DELETE FROM ${tableName} WHERE ${conditions}`;
        return this.executeQuery(query);
    }

    /**
     * Retrieve data with optional JOIN conditions.
     * @param query - The SQL query for retrieving data (including JOINs if needed).
     * @param params - Optional query parameters.
     * @returns The selected rows.
     */
    static async getWithJoin(query: string, params: any[] = []): Promise<any> {
        return this.executeQuery(query, params);
    }

    /**
      * Retrieve data with any type of JOIN (INNER, LEFT, RIGHT, FULL OUTER, etc.).
      * @param columns - Columns to select.
      * @param table1 - The first table name.
      * @param table2 - The second table name.
      * @param joinCondition - The JOIN condition between two tables.
      * @param joinType - The type of JOIN (INNER, LEFT, RIGHT, FULL OUTER, etc.).
      * @param conditions - Additional SQL WHERE conditions (optional).
      * @returns The joined rows.
      */
    static async getJoinedRows(
        columns: string,
        table1: string,
        table2: string,
        joinCondition: string,
        joinType: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL OUTER' = 'INNER', // Default to INNER JOIN
        conditions: string = '1=1'
    ): Promise<any> {
        const query = `
      SELECT ${columns}
      FROM ${table1}
      ${joinType} JOIN ${table2}
      ON ${joinCondition}
      WHERE ${conditions}
    `;
        return this.executeQuery(query);
    }
}

/**
 * Example of Joins
 * // src/app.ts

import { DbService } from './services/dbService';

async function main() {
  try {
    // INNER JOIN (default)
    const innerJoinResults = await DbService.getJoinedRows(
      'users.name, orders.order_id, orders.amount',
      'users',
      'orders',
      'users.id = orders.user_id',
      'INNER',  // INNER JOIN
      'users.id > 1'
    );
    console.log('INNER JOIN Results:', innerJoinResults);

    // LEFT JOIN
    const leftJoinResults = await DbService.getJoinedRows(
      'users.name, orders.order_id, orders.amount',
      'users',
      'orders',
      'users.id = orders.user_id',
      'LEFT',  // LEFT JOIN
      'users.id > 1'
    );
    console.log('LEFT JOIN Results:', leftJoinResults);

    // RIGHT JOIN
    const rightJoinResults = await DbService.getJoinedRows(
      'users.name, orders.order_id, orders.amount',
      'users',
      'orders',
      'users.id = orders.user_id',
      'RIGHT',  // RIGHT JOIN
      'orders.amount > 50'
    );
    console.log('RIGHT JOIN Results:', rightJoinResults);

    // FULL OUTER JOIN (MySQL doesn’t support FULL OUTER JOIN directly, but you can simulate it)
    const fullOuterJoinResults = await DbService.getJoinedRows(
      'users.name, orders.order_id, orders.amount',
      'users',
      'orders',
      'users.id = orders.user_id',
      'FULL OUTER',  // FULL OUTER JOIN (simulated)
      'users.id > 1 OR orders.amount > 50'
    );
    console.log('FULL OUTER JOIN Results:', fullOuterJoinResults);
  } catch (error) {
    console.error('Error in JOIN query:', error);
  }
}

main();

 */
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'UserDatabase.db';
const database_version = '1.0';
const database_displayname = 'SQLite User Database';
const database_size = 200000;

let db: SQLite.SQLiteDatabase;

export const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
    if (db) return db;
    db = await SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
    );
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            mobile TEXT NOT NULL
        );`
    );
    return db;
};

export const addUser = async (name: string, age: number, mobile: string) => {
    const db = await openDatabase();
    await db.executeSql('INSERT INTO Users (name, age, mobile) VALUES (?, ?, ?)', [name, age, mobile]);
};

export const getUsers = async (): Promise<any[]> => {
    const db = await openDatabase();
    const results = await db.executeSql('SELECT * FROM Users');
    let users: any[] = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            users.push(result.rows.item(i));
        }
    });
    return users;
};

export const updateUser = async (id: number, name: string, age: number, mobile: string) => {
    const db = await openDatabase();
    await db.executeSql('UPDATE Users SET name = ?, age = ? , mobile = ? WHERE id = ?', [name, age, mobile, id]);
};

export const deleteUser = async (id: number) => {
    const db = await openDatabase();
    await db.executeSql('DELETE FROM Users WHERE id = ?', [id]);
};

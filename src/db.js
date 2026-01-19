import Database from '@tauri-apps/plugin-sql';

let db = null;

export const initDb = async () => {
  if (db) return db;
  db = await Database.load('sqlite:paper-todo.db');
  
  // Create tables if they don't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      image TEXT,
      order_index INTEGER DEFAULT 0
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS subtasks (
      id TEXT PRIMARY KEY,
      todo_id TEXT NOT NULL,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      image TEXT,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (todo_id) REFERENCES todos (id) ON DELETE CASCADE
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS activity_log (
      date TEXT PRIMARY KEY,
      pts INTEGER DEFAULT 0
    );
  `);

  return db;
};

export const getTodos = async () => {
  const conn = await initDb();
  const todos = await conn.select('SELECT * FROM todos ORDER BY order_index ASC');
  const subtasks = await conn.select('SELECT * FROM subtasks ORDER BY order_index ASC');

  return todos.map(todo => ({
    ...todo,
    completed: !!todo.completed,
    subTasks: subtasks
      .filter(st => st.todo_id === todo.id)
      .map(st => ({ ...st, completed: !!st.completed }))
  }));
};

export const saveTodo = async (todo) => {
  const conn = await initDb();
  await conn.execute(
    'INSERT OR REPLACE INTO todos (id, text, completed, image, order_index) VALUES ($1, $2, $3, $4, $5)',
    [todo.id, todo.text, todo.completed ? 1 : 0, todo.image, todo.order_index || 0]
  );

  // Clear existing subtasks and re-insert
  await conn.execute('DELETE FROM subtasks WHERE todo_id = $1', [todo.id]);
  for (let i = 0; i < todo.subTasks.length; i++) {
    const st = todo.subTasks[i];
    await conn.execute(
      'INSERT INTO subtasks (id, todo_id, text, completed, image, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
      [st.id, todo.id, st.text, st.completed ? 1 : 0, st.image, i]
    );
  }
};

export const deleteTodoDb = async (id) => {
  const conn = await initDb();
  await conn.execute('DELETE FROM todos WHERE id = $1', [id]);
};

export const getActivityLog = async () => {
  const conn = await initDb();
  const rows = await conn.select('SELECT * FROM activity_log');
  const log = {};
  rows.forEach(row => {
    log[row.date] = row.pts;
  });
  return log;
};

export const saveActivityLog = async (date, pts) => {
  const conn = await initDb();
  await conn.execute(
    'INSERT OR REPLACE INTO activity_log (date, pts) VALUES ($1, $2)',
    [date, pts]
  );
};

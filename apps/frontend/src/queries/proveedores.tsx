import pgPromise from 'pg-promise';

const connectionOptions = {
  host: 'localhost',
  port: 5433,
  database: 'ingDatos',
  user: 'postgres',
  password: 'asd123',
};

const pgp = pgPromise();
const db = pgp(connectionOptions);

const obtenerProveedoresMasCaros = async () => {
  try {
    const result = await db.any('SELECT * FROM productos WHERE productos.nombre="A"');
    return result;
  } catch (error) {
    throw error;
  } finally {
    pgp.end();
  }
};

export { obtenerProveedoresMasCaros };
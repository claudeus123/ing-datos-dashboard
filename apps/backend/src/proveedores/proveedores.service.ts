import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ProveedoresDTO } from './dto/proveedores_dot';
import * as pgPromise from 'pg-promise';


const connectionOptions = {
  host: 'localhost',
  port: 5433,
  database: 'ingdatos',
  user: 'postgres',
  password: 'asd123',
};

@Injectable()
export class ProveedoresService implements OnModuleDestroy {
  private pgp = pgPromise();
  private db;

  constructor() {
    this.db = this.pgp(connectionOptions);
  }

  async getDatos(proveedoresDTO: ProveedoresDTO) {
    return this.db.any(proveedoresDTO.query);
  }

  onModuleDestroy() {
    this.db.$pool.end();
  }
}

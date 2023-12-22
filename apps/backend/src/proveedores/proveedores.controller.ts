import { Controller, Post, Body } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresDTO } from './dto/proveedores_dot'

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}



  @Post()
  create(@Body() proveedoresDTO: ProveedoresDTO) {
    return this.proveedoresService.getDatos(proveedoresDTO);
  }
  
}

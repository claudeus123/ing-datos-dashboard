// pages/api/proveedores.js
import { obtenerProveedoresMasCaros } from '../../ruta/del/archivo';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const resultado = await obtenerProveedoresMasCaros();
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

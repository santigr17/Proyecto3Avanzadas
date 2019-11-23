module.exports = {
    code:"number",
   latitud: "number",
   longitud:"number",
   direccion:"string",
   nombre:"string",
   descripcion:"string",
   imagen:"string",
   telefono:"string",
   raiting:"number",
   sells: {
       type: 'relationship',
       relationship: 'SELLS',
       target:'Producto',
       
   }
}
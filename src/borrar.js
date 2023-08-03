//constantes globales
let hojas = SpreadsheetApp.getActiveSheet();


// Limpiar celdas de entrada
function LimpiarEntrada() {
  const celdasALimpiar = ["B5", "B7", "F6", "F8", "F9", "F10"]; // Celdas a limpiar
  celdasALimpiar.forEach(celda => {
    hojas.getRange(celda).clearContent();
  });
}

function guardarEntrada() {
  //Declaracion de constantes
  const HOJA_FORMULARIO = "Entrada(s)"
  const HOJA_PRODUCTOS = "Registro de entradas"

  const CODIGO = "F7"
  const FECHA = "F5"
  const PRODUCTO = "B5"
  const CANTIDAD = "B7"

//variableas de los datos que se insertaron en cada casilla
  let codigo = hojaFormulario.getRange(CODIGO).getValue();
  let producto = hojaFormulario.getRange(PRODUCTO).getValue();
  let fecha = hojaFormulario.getRange(FECHA).getValue();
  let cantidad = hojaFormulario.getRange(CANTIDAD).getValue();

//datos para pegar
  let hojaFormulario = hojas.getSheetName(HOJA_FORMULARIO)
  let hojaProducto = hojas.getSheetName(HOJA_PRODUCTOS)
  
  if (producto !== "" && cantidad !== "") {
    const respuesta = SpreadsheetApp.getUi().alert(
      `¿Está seguro(a) de registrar como entrada ${cantidad} producto(s) tipo: ${producto}?`,
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );

    if (respuesta === SpreadsheetApp.getUi().Button.YES) {
      // Insertar nuevos valores en HOJA_PRODUCTOS
      hojaProducto.appendRow([fecha, codigo, producto, cantidad]);

  LimpiarEntrada()
}

function LimpiarEntrada() {
  let hojaFormulario = hojas.getSheetName(HOJA_FORMULARIO)

  const celdasALimpiar = ["B5", "B7", "F6", "F8", "F9", "F10"]; // Celdas a limpiar
  celdasALimpiar.forEach(celda => {
    hojaFormulario.getRange(celda).clearContent();
  });
}

function guardarSalidas() {
  //Declaracion de constantes
  const HOJA_FORMULARIO = "Salida(s)"
  const HOJA_PRODUCTOS = "Registro de salidas"
  
  const FECHA = "F5"
  const SEDE = "F6"
  const CODIGO = "F7"
  const AUTORIZACION = "F8"
  const PERSONAL = "F9"
  const SUB_DEP = "F10"
  const PRODUCTO = "B5"
  const CANTIDAD = "B7"

//variableas a copiar
  let fecha = hojaFormulario.getRange(FECHA).getValue();
  let sede = hojaFormulario.getRange(SEDE).getValue();
  let codigo = hojaFormulario.getRange(CODIGO).getValue();
  let autorizacion = hojaFormulario.getRange(AUTORIZACION).getValue();
  let personal = hojaFormulario.getRange(PERSONAL).getValue();
  let subDep = hojaFormulario.getRange(SUB_DEP).getValue();
  let producto = hojaFormulario.getRange(PRODUCTO).getValue();

  if (PRODUCTO !== "" && CANTIDAD !== "") {
    const respuesta = interface.alert(
      `¿Está seguro(a) de registrar como entrada ${CANTIDAD} producto(s) tipo: ${PRODUCTO}?`,
      interface.ButtonSet.YES_NO
    );

    if (respuesta === interface.Button.YES) {
      const valores = [
        [
           FECHA,
           SEDE,
           CODIGO,
           AUTORIZACION,
           PERSONAL,
           SUB_DEP,
           PRODUCTO,
           CANTIDAD,
        ],
      ];

//donde se insertan los datos
  let hojaFormulario = hojas.getSheetName(HOJA_FORMULARIO)
  let hojaProducto = hojas.getSheetName.push(HOJA_PRODUCTOS)
  
  if (producto !== "" && cantidad !== "") {
    const respuesta = SpreadsheetApp.getUi().alert(
      `¿Está seguro(a) de registrar como entrada ${cantidad} producto(s) tipo: ${producto}?`,
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );

    if (respuesta === SpreadsheetApp.getUi().Button.YES) {
      // Insertar nuevos valores en HOJA_PRODUCTOS
        hojaProducto.appendRow([fecha, sede, codigo, autorizacion, personal, subDep, "", cantidad])

 LimpiarEntrada()
}
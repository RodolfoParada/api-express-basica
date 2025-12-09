const { Parser } = require('json2csv');

exports.exportarA_CSV = (data, fields) => {
  try {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    return csv;
  } catch (err) {
    console.error('Error al generar CSV:', err);
    throw new Error('No se pudo generar el archivo CSV.');
  }
};



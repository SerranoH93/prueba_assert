// ejercicio1.js
const registros = [
  { dev: 'Ana', proyecto: 'Portal Web', horas: 4, fecha: '2024-01-15' },
  { dev: 'Bob', proyecto: 'App Movil', horas: 6, fecha: '2024-01-15' },
  { dev: 'Ana', proyecto: 'Portal Web', horas: 3, fecha: '2024-01-16' },
  { dev: 'Carlos', proyecto: 'Portal Web', horas: 8, fecha: '2024-01-15' },
  { dev: 'Bob', proyecto: 'Portal Web', horas: 2, fecha: '2024-01-16' },
  { dev: 'Ana', proyecto: 'App Movil', horas: 5, fecha: '2024-01-16' },
  { dev: 'Carlos', proyecto: 'App Movil', horas: 3, fecha: '2024-01-16' },
  { dev: 'Bob', proyecto: 'App Movil', horas: 0, fecha: '2024-01-17' },
  { dev: 'Ana', proyecto: 'Portal Web', horas: 10, fecha: '2024-01-17' },
];

function analizarRegistros(registros) {
  const horasPorProyecto = {};
  const horasPorDev = {};
  const registrosSospechosos = [];
  const diasPorDev = {};
  const fechasUnicas = {};

  //Se recorre todos los registros una sola vez, así mejoramos la eficiencia
  for (const registro of registros) {
    const { dev, proyecto, horas, fecha } = registro;


    //Suma de horas por proyecto
    if (!horasPorProyecto[proyecto]) {
      horasPorProyecto[proyecto] = 0;
    }

    horasPorProyecto[proyecto] += horas;


    //Suma de horas por dev
    if (!horasPorDev[dev]) {
      horasPorDev[dev] = 0;
    }

    horasPorDev[dev] += horas;


    //Dias sopechosos
    if (horas === 0) {
      registrosSospechosos.push({
        ...registro,
        motivo: 'Registro sin horas'
      });
    }

    if (horas > 8) {
      registrosSospechosos.push({
        ...registro,
        motivo: 'Registro con mas de 8 horas'
      });
    }


    //Registro de dias unicos con registros
    if (!fechasUnicas[dev]) {
      fechasUnicas[dev] = new Set();
    }

    fechasUnicas[dev].add(fecha);


    //Cuenta de dias unicos con registros
    for (const dev in fechasUnicas) {
      diasPorDev[dev] = fechasUnicas[dev].size;
    }
  }


  //Desarrollador con más horas
  let devMasHoras = '';
  let maxHoras = 0;

  for (const dev in horasPorDev) {
    if (horasPorDev[dev] > maxHoras) {
      maxHoras = horasPorDev[dev];
      devMasHoras = dev;
    }
  }

  const promedioHorasPorDev = {};

  for (const dev in diasPorDev) {
    promedioHorasPorDev[dev] =
      horasPorDev[dev] / diasPorDev[dev];
  }


  return {
    horasPorProyecto,
    //horasPorDev,
    devMasHoras,
    registrosSospechosos,
    //diasPorDev,
    promedioHorasPorDev
  }
}

console.log(analizarRegistros(registros));
module.exports = { analizarRegistros };

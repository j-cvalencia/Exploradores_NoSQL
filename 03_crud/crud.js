db.hospitalizaciones.insertOne({
  id_hospitalizacion: "HOSP-0021",
  eliminado: false,
  paciente: { id_paciente: "P021", nombre: "Paciente Prueba 21", documento_prueba: "1000000021", tipo_documento: "CC", edad: 50, sexo: "M" },
  admision: { fecha_ingreso: ISODate("2026-11-05T13:00:00Z"), servicio: "Medicina Interna", habitacion: "321-B", estado: "Hospitalizado" },
  diagnosticos: [ { codigo: "J18.9", descripcion: "Neumonía no especificada", fecha: ISODate("2026-11-05T14:00:00Z"), principal: true } ],
  evoluciones: [ { fecha: ISODate("2026-11-06T13:00:00Z"), nota: "Ingreso por tos y fiebre.", profesional: "Dra. Laura Gómez", profesional_id: "MED001" } ],
  notas_enfermeria: [ { fecha: ISODate("2026-11-06T08:00:00Z"), turno: "Mañana", nota: "Paciente estable." } ],
  ordenes_medicamentos: [ { medicamento: "Ceftriaxona", dosis: "1 g", via: "IV", frecuencia: "cada 12 h", estado: "activa" } ],
  signos_vitales: [ { fecha: ISODate("2026-11-06T08:00:00Z"), frecuencia_cardiaca: 90, frecuencia_respiratoria: 22, presion_arterial: "125/80", saturacion_o2: 93, temperatura_c: 38.2 } ],
  alta: null
})

db.hospitalizaciones.insertOne({
  id_hospitalizacion: "HOSP-PRUEBA",
  eliminado: false,
  paciente: { id_paciente: "P999", nombre: "Paciente Temporal", documento_prueba: "1000000999", tipo_documento: "CC", edad: 30, sexo: "F" },
  admision: { fecha_ingreso: ISODate("2026-11-07T10:00:00Z"), servicio: "Medicina Interna", habitacion: "999-Z", estado: "Hospitalizado" },
  diagnosticos: [], evoluciones: [], notas_enfermeria: [], ordenes_medicamentos: [], signos_vitales: [], alta: null
})



db.hospitalizaciones.find({ "admision.servicio": "UCI" }, { _id: 0, id_hospitalizacion: 1, "paciente.nombre": 1, "admision.estado": 1 })

db.hospitalizaciones.findOne({ id_hospitalizacion: "HOSP-0001" })


db.hospitalizaciones.updateOne(
  { id_hospitalizacion: "HOSP-0001" },
  { $set: { "admision.estado": "En observación" } }
)

db.hospitalizaciones.updateOne(
  { id_hospitalizacion: "HOSP-0001" },
  { $push: { evoluciones: { fecha: new Date(), nota: "Afebril, tolera vía oral.", profesional: "Dr. Carlos Ruiz", profesional_id: "MED002" } } }
)

db.hospitalizaciones.updateOne(
  { id_hospitalizacion: "HOSP-0001", "ordenes_medicamentos.medicamento": "Ceftriaxona" },
  { $set: { "ordenes_medicamentos.$.estado": "suspendida" } }
)

db.hospitalizaciones.updateOne(
  { id_hospitalizacion: "HOSP-0003" },
  { $set: { "admision.estado": "Egresado", alta: { fecha: new Date(), responsable: "Dra. Marcela Posada", resumen: "Egreso por mejoría clínica." } } }
)



db.hospitalizaciones.updateOne(
  { id_hospitalizacion: "HOSP-0021" },
  { $set: { eliminado: true, fecha_eliminacion: new Date() } }
)

db.hospitalizaciones.deleteOne({ id_hospitalizacion: "HOSP-PRUEBA" })
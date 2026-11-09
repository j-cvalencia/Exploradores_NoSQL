db.hospitalizaciones.aggregate([
  { $match: { eliminado: false } },
  { $unwind: "$diagnosticos" },
  { $match: { "diagnosticos.principal": true } },
  { $group: { _id: { servicio: "$admision.servicio", dx: "$diagnosticos.descripcion" }, total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])



db.hospitalizaciones.aggregate([
  { $match: { eliminado: false } },
  { $unwind: "$diagnosticos" },
  { $match: { "diagnosticos.principal": true } },
  { $unwind: "$signos_vitales" },
  { $group: { _id: "$diagnosticos.descripcion", edad_prom: { $avg: "$paciente.edad" }, sat_prom: { $avg: "$signos_vitales.saturacion_o2" } } },
  { $project: { _id: 0, diagnostico: "$_id", edad_prom: { $round: ["$edad_prom", 1] }, sat_prom: { $round: ["$sat_prom", 1] } } }
])



db.hospitalizaciones.aggregate([
  { $unwind: "$evoluciones" },
  { $lookup: { from: "medicos", localField: "evoluciones.profesional_id", foreignField: "_id", as: "medico" } },
  { $unwind: "$medico" },
  { $group: { _id: "$medico.especialidad", evoluciones: { $sum: 1 } } }
])



db.hospitalizaciones.aggregate([
  { $match: { eliminado: false, signos_vitales: { $elemMatch: { temperatura_c: { $gte: 38 }, saturacion_o2: { $lt: 92 } } } } },
  { $project: { _id: 0, id_hospitalizacion: 1, "paciente.nombre": 1, "admision.servicio": 1, "admision.habitacion": 1 } }
])



db.hospitalizaciones.aggregate([
  { $match: { alta: { $ne: null }, eliminado: false } },
  { $project: { servicio: "$admision.servicio",
                dias: { $divide: [ { $subtract: ["$alta.fecha", "$admision.fecha_ingreso"] }, 86400000 ] } } },
  { $group: { _id: "$servicio", estancia_prom: { $avg: "$dias" }, casos: { $sum: 1 } } },
  { $sort: { estancia_prom: -1 } }
])



db.hospitalizaciones.aggregate([
  { $unwind: "$ordenes_medicamentos" },
  { $group: { _id: "$ordenes_medicamentos.medicamento", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
])
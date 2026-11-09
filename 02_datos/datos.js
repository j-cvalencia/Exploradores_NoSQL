db.hospitalizaciones.drop();
db.medicos.drop();

db.medicos.insertMany([
  { _id: "MED001", nombre: "Dra. Laura Gómez",    especialidad: "Medicina Interna",    hospital: "HUSVF" },
  { _id: "MED002", nombre: "Dr. Carlos Ruiz",     especialidad: "Neumología",          hospital: "HUSVF" },
  { _id: "MED003", nombre: "Dra. Marcela Posada", especialidad: "Cuidados Intensivos", hospital: "HGM" },
  { _id: "MED004", nombre: "Dr. Andrés Zapata",   especialidad: "Pediatría",           hospital: "HGM" },
  { _id: "MED005", nombre: "Dra. Sofía Restrepo", especialidad: "Cardiología",         hospital: "HUSVF" },
  { _id: "MED006", nombre: "Dr. Julián Montoya",  especialidad: "Endocrinología",      hospital: "HGM" }
]);

const medicos = {};
db.medicos.find().forEach(m => medicos[m._id] = m);

// servicio, cod1, dx1, cod2, dx2, medicamento, dosis, via, frecuencia, medicoId, edad, sexo, dias, sat, temp, PA, alta
const casos = [
 ["Medicina Interna","J18.9","Neumonía no especificada","I10","Hipertensión esencial","Ceftriaxona","1 g","IV","cada 12 h","MED001",67,"F",5,89,38.6,"130/85",true],
 ["Medicina Interna","E11.9","Diabetes mellitus tipo 2","I10","Hipertensión esencial","Metformina","850 mg","VO","cada 12 h","MED006",58,"M",3,95,36.8,"150/95",true],
 ["UCI","J96.0","Insuficiencia respiratoria aguda","J18.9","Neumonía no especificada","Meropenem","1 g","IV","cada 8 h","MED003",72,"M",9,86,38.9,"110/70",false],
 ["UCI","A41.9","Sepsis no especificada","N39.0","Infección de vías urinarias","Piperacilina-Tazobactam","4.5 g","IV","cada 6 h","MED003",64,"F",8,90,39.1,"95/60",false],
 ["Pediatría","J21.9","Bronquiolitis aguda","R50.9","Fiebre","Salbutamol","2 puff","INH","cada 6 h","MED004",2,"M",4,91,38.2,"90/55",true],
 ["Pediatría","A09","Gastroenteritis infecciosa","E86","Deshidratación","Ondansetrón","4 mg","VO","cada 8 h","MED004",6,"F",3,97,37.5,"95/60",true],
 ["Pediatría","J45.9","Asma","R06.2","Sibilancias","Prednisolona","1 mg/kg","VO","cada 24 h","MED004",8,"M",3,93,37.0,"100/65",true],
 ["Cardiología","I21.9","Infarto agudo de miocardio","I10","Hipertensión esencial","Ácido acetilsalicílico","100 mg","VO","cada 24 h","MED005",61,"M",6,94,36.7,"140/90",false],
 ["Cardiología","I50.9","Insuficiencia cardiaca","I10","Hipertensión esencial","Furosemida","40 mg","IV","cada 12 h","MED005",78,"F",7,90,36.6,"145/90",true],
 ["Medicina Interna","N39.0","Infección de vías urinarias","R50.9","Fiebre","Ciprofloxacino","500 mg","VO","cada 12 h","MED001",45,"F",4,96,38.4,"120/80",true],
 ["Medicina Interna","E11.1","Diabetes con cetoacidosis","I10","Hipertensión esencial","Insulina cristalina","10 UI","IV","cada 6 h","MED006",39,"M",5,97,37.2,"125/80",true],
 ["Medicina Interna","J18.9","Neumonía no especificada","E11.9","Diabetes mellitus tipo 2","Azitromicina","500 mg","VO","cada 24 h","MED002",70,"M",6,91,38.3,"135/85",true],
 ["Medicina Interna","J44.1","EPOC exacerbado","I10","Hipertensión esencial","Prednisona","40 mg","VO","cada 24 h","MED002",74,"M",7,88,37.9,"140/90",false],
 ["UCI","J96.0","Insuficiencia respiratoria aguda","J18.9","Neumonía no especificada","Ceftriaxona","2 g","IV","cada 24 h","MED003",69,"F",10,87,38.5,"100/65",false],
 ["Cardiología","I16.9","Crisis hipertensiva","E11.9","Diabetes mellitus tipo 2","Enalapril","10 mg","VO","cada 12 h","MED005",55,"M",2,96,36.9,"190/110",true],
 ["Pediatría","J18.9","Neumonía no especificada","R50.9","Fiebre","Amoxicilina","50 mg/kg","VO","cada 8 h","MED004",4,"F",5,90,38.8,"92/58",true],
 ["Medicina Interna","K29.7","Gastritis","R10.4","Dolor abdominal","Omeprazol","40 mg","IV","cada 24 h","MED001",52,"F",3,98,36.5,"118/76",true],
 ["Medicina Interna","A90","Dengue clásico","R50.9","Fiebre","Acetaminofén","500 mg","VO","cada 6 h","MED001",29,"M",4,97,38.1,"110/70",true],
 ["Medicina Interna","A91","Dengue hemorrágico","R50.9","Fiebre","Acetaminofén","500 mg","VO","cada 6 h","MED001",33,"F",5,95,38.3,"100/65",false],
 ["Cardiología","I50.9","Insuficiencia cardiaca","E11.9","Diabetes mellitus tipo 2","Furosemida","40 mg","IV","cada 12 h","MED005",81,"M",8,89,38.0,"130/80",false]
];

const docs = casos.map((c, i) => {
  const [servicio,cod1,dx1,cod2,dx2,med,dosis,via,frec,medId,edad,sexo,dias,sat,temp,pa,alta] = c;
  const n = String(i + 1);
  const ingreso = new Date(Date.UTC(2026, 9, 1 + i, 13, 0));
  const dia = (d, h) => new Date(ingreso.getTime() + d * 86400000 + h * 3600000);
  const m = medicos[medId];
  const grave = sat < 92;
  const fc = edad < 12 ? 110 : (grave ? 96 : 76);
  const fr = edad < 12 ? 28 : (grave ? 26 : 18);
  return {
    id_hospitalizacion: "HOSP-" + n.padStart(4, "0"),
    eliminado: false,
    paciente: { id_paciente: "P" + n.padStart(3, "0"), nombre: "Paciente Prueba " + n,
                documento_prueba: "10000000" + n.padStart(2, "0"), tipo_documento: edad < 8 ? "TI" : "CC",
                edad: edad, sexo: sexo },
    admision: { fecha_ingreso: ingreso, servicio: servicio,
                habitacion: (100 * (1 + (i % 4)) + i + 1) + "-A",
                estado: alta ? "Egresado" : "Hospitalizado" },
    diagnosticos: [
      { codigo: cod1, descripcion: dx1, fecha: dia(0, 1), principal: true },
      { codigo: cod2, descripcion: dx2, fecha: dia(0, 1), principal: false }
    ],
    evoluciones: [
      { fecha: dia(1, 0), nota: "Paciente con " + dx1 + ", inicia manejo con " + med + ". Evolución estable.", profesional: m.nombre, profesional_id: medId },
      { fecha: dia(2, 0), nota: "Mejoría clínica parcial, continúa vigilancia.", profesional: m.nombre, profesional_id: medId }
    ],
    notas_enfermeria: [
      { fecha: dia(1, 2),  turno: "Mañana", nota: "Signos vitales tomados, tolera medicación." },
      { fecha: dia(1, 14), turno: "Noche",  nota: "Descansa sin eventos adversos." }
    ],
    ordenes_medicamentos: [
      { medicamento: med, dosis: dosis, via: via, frecuencia: frec, estado: "activa" }
    ],
    signos_vitales: [
      { fecha: dia(0, 1), frecuencia_cardiaca: fc,     frecuencia_respiratoria: fr,     presion_arterial: pa, saturacion_o2: sat,                temperatura_c: temp },
      { fecha: dia(1, 1), frecuencia_cardiaca: fc - 4, frecuencia_respiratoria: fr - 2, presion_arterial: pa, saturacion_o2: Math.min(sat + 2, 99), temperatura_c: Math.round((temp - 0.6) * 10) / 10 },
      { fecha: dia(2, 1), frecuencia_cardiaca: fc - 8, frecuencia_respiratoria: fr - 3, presion_arterial: pa, saturacion_o2: Math.min(sat + 3, 99), temperatura_c: Math.round((temp - 1.1) * 10) / 10 }
    ],
    alta: alta ? { fecha: dia(dias, 0), responsable: m.nombre, resumen: "Egreso con mejoría de " + dx1 + "." } : null
  };
});

db.hospitalizaciones.insertMany(docs);
db.hospitalizaciones.createIndex({ id_hospitalizacion: 1 }, { unique: true });
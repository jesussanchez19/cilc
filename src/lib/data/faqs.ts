export interface FAQ {
  question: string;
  answer: string;
}

export const faqsByProgram: Record<string, FAQ[]> = {
  idiomas: [
    { question: '¿Cuánto tiempo dura un programa de idiomas?', answer: 'Desde 2 semanas hasta 12 meses, según tus objetivos y disponibilidad.' },
    { question: '¿Qué idiomas puedo estudiar?', answer: 'Inglés, Francés, Alemán, Japonés, Coreano y Mandarín en escuelas acreditadas internacionalmente.' },
    { question: '¿Necesito visa para estudiar idiomas?', answer: 'Depende del destino y duración. CILC gestiona todo el proceso de visa por ti.' },
    { question: '¿Qué incluye el programa?', answer: 'Inscripción en la escuela, gestión de visa, seguro médico internacional y acompañamiento durante tu estancia.' },
    { question: '¿Hay límite de edad?', answer: 'El programa está disponible para personas de 12 a 60 años.' },
    { question: '¿Qué nivel de idioma necesito para aplicar?', answer: 'No se requiere nivel previo. Realizamos una evaluación inicial gratuita para ubicarte en el grupo correcto.' },
  ],
  'au-pair': [
    { question: '¿Qué hace un Au Pair?', answer: 'Apoya en el cuidado de niños de la familia anfitriona a cambio de alojamiento, comida, estipendio semanal y clases de idioma.' },
    { question: '¿Cuáles son los requisitos para ser Au Pair?', answer: 'Tener entre 18 y 26 años, experiencia en cuidado de niños, nivel básico del idioma del país destino y no tener hijos.' },
    { question: '¿Cuánto se gana como Au Pair?', answer: 'En EE.UU. el estipendio mínimo es de $215.75 USD por semana. En Alemania varía según la familia.' },
    { question: '¿Qué tipo de visa se necesita?', answer: 'Visa J-1 para Estados Unidos y visa de Au Pair para Alemania. CILC gestiona todo el proceso.' },
    { question: '¿Puedo elegir mi familia anfitriona?', answer: 'Sí. Recibes perfiles de familias y puedes hacer entrevistas antes de confirmar.' },
    { question: '¿Qué pasa si no me llevo bien con la familia?', answer: 'CILC da seguimiento durante toda tu estancia y en caso necesario coordina un cambio de familia.' },
  ],
  'anos-academicos': [
    { question: '¿En qué niveles educativos puedo estudiar?', answer: 'Secundaria, Preparatoria y Universidad en instituciones oficiales del país destino.' },
    { question: '¿Las materias cursadas tienen validez en México?', answer: 'Depende de cada institución. CILC te asesora sobre el proceso de revalidación.' },
    { question: '¿Dónde vivo durante mi año académico?', answer: 'Con una familia anfitriona cuidadosamente seleccionada o en residencia estudiantil, según el destino.' },
    { question: '¿Qué nivel de idioma necesito?', answer: 'Se recomienda nivel básico-intermedio. CILC evalúa tu nivel y puede incluir preparación previa.' },
    { question: '¿Cuánto dura un año académico?', answer: 'Puede ser un semestre (4–5 meses) o el año escolar completo (9–10 meses).' },
    { question: '¿Puedo aplicar si soy universitario?', answer: 'Sí, ofrecemos programas para universitarios de 18 a 25 años en instituciones de nivel superior.' },
  ],
  'estudia-trabaja': [
    { question: '¿Puedo trabajar legalmente en el extranjero?', answer: 'Sí. El programa incluye la gestión de una visa de trabajo y estudio que te permite trabajar legalmente.' },
    { question: '¿Cuántas horas puedo trabajar?', answer: 'Generalmente hasta 20 horas semanales durante el curso y tiempo completo en vacaciones escolares.' },
    { question: '¿Qué tipo de trabajo puedo conseguir?', answer: 'Hostelería, comercio, servicios y otros sectores accesibles para estudiantes internacionales.' },
    { question: '¿Las clases de idioma son obligatorias?', answer: 'Sí, el programa combina clases de idioma con la experiencia laboral. Las clases son parte del visa.' },
    { question: '¿Cuánto puedo ganar trabajando?', answer: 'Depende del país y trabajo, pero suele cubrir entre el 40% y 70% de los gastos de vida.' },
    { question: '¿Necesito experiencia laboral previa?', answer: 'No es obligatorio, aunque se valora. CILC te prepara para conseguir empleo desde el primer mes.' },
  ],
  'formacion-corporativa': [
    { question: '¿Los programas son a la medida de cada empresa?', answer: 'Sí. Realizamos un diagnóstico de necesidades y diseñamos el programa según los objetivos de tu empresa.' },
    { question: '¿Qué idiomas incluye la formación corporativa?', answer: 'Inglés, Francés, Alemán, Japonés y Mandarín en institutos ejecutivos especializados.' },
    { question: '¿Se pueden incluir visitas a empresas internacionales?', answer: 'Sí. Coordinamos networking corporativo y visitas a empresas del sector según el perfil del grupo.' },
    { question: '¿Cuántas personas puede incluir un grupo corporativo?', answer: 'Desde 1 directivo hasta grupos de 20 o más personas. Adaptamos la logística a cada caso.' },
    { question: '¿Se puede combinar formación con turismo corporativo?', answer: 'Sí. Diseñamos itinerarios que combinan capacitación intensiva con experiencias culturales del destino.' },
    { question: '¿Qué destinos están disponibles para formación corporativa?', answer: 'Canadá, Estados Unidos, Inglaterra, Irlanda, Australia, Dubái, Alemania, Japón y Corea del Sur.' },
  ],
  'idiomas-en-linea': [
    { question: '¿Las clases son en vivo o grabadas?', answer: 'Son en vivo con profesor calificado en tiempo real, no clases pregrabadas.' },
    { question: '¿Cuántos alumnos hay por grupo?', answer: 'Grupos de máximo 6 personas para garantizar atención personalizada, o clases individuales.' },
    { question: '¿Qué plataforma se usa para las clases?', answer: 'Zoom u otras plataformas de videollamada. Solo necesitas internet y una computadora o tablet.' },
    { question: '¿Hay evaluación de nivel inicial?', answer: 'Sí, la evaluación de nivel es gratuita y te ubica en el grupo y libro adecuado para ti.' },
    { question: '¿Qué idiomas están disponibles en línea?', answer: 'Inglés, Francés y Alemán con profesores certificados.' },
    { question: '¿Se puede preparar para exámenes internacionales en línea?', answer: 'Sí. Preparamos para TOEFL, IELTS, DELE, DALF y otros exámenes de certificación internacional.' },
  ],
};

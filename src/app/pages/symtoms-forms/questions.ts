
export interface AnswerInterface {
  active: boolean;
  button: '';
  weight: number;
  deselect: boolean;
}

export interface QuestionInterface {
  question : '';
  multipleSelect: boolean;
  demograficData?: boolean;
  answers: AnswerInterface[];
}



export const questions = [
  [
    {
      question: 'Cuantos años tienes?',
      multipleSelect: false,
      demograficData: true,
      answers: [
        {
          active: false,
          button: 'Menores de 18 años',
          weight: -1,
          deselect: false,
        },
        {
          active: false,
          button: '18 a 39 años',
          weight: 1,
          deselect: false,
        },
        {
          active: false,
          button: '40 a 59 años',
          weight: 2,
          deselect: false,
        },
        {
          active: false,
          button: 'Mas de 60 años',
          weight: 3,
          deselect: false,
        },
      ],
    },
    {
      question: 'Cual es tu sexo?',
      multipleSelect: false,
      demograficData: true,
      answers: [
        {
          active: false,
          button: 'Mujer',
          weight: 0,
        },
        {
          active: false,
          button: 'Hombre',
          deselect: false,
          weight: 0,
        },
      ],
    },
  ],
  [
    {
      question: 'Que sintomas tienes?',
      multipleSelect: true,
      answers: [
        {
          active: false,
          button: 'Dificultad para respirar',
          deselect: false,
          weight: 2
        },
        {
          active: false,
          button: 'Dolor de Garganta',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Tos',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Fiebre',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Perdida del olfato',
          deselect: false,
          weight: 2
        },
        {
          active: false,
          button: 'Ninguno de estos sintomas',
          deselect: true,
        },
      ],
    },
    {
      question: 'Cuanto tiempo llevas experimentando estos sintomas?',
      answers: [
        {
          active: false,
          button: 'Hoy',
          weight: -1
        },
        {
          active: false,
          button: '1 a 7 días',
          weight: 1
        },
        {
          active: false,
          button: '8 a 14 días',
          weight: 3
        },
        {
          active: false,
          button: 'Mas de 14 días',
          weight: 1
        },
      ],
    },
  ],
  [
    {
      question: 'Tienas alguna de estos factores de riesgo?',
      multipleSelect: true,
      answers: [
        {
          active: false,
          button: 'Enfermedad Cardíaca',
          deselect: false,
          weight: 3,
        },
        {
          active: false,
          button: 'Hipertension',
          deselect: false,
          weight: 3
        },
        {
          active: false,
          button: 'Enfermedad Autoinmune',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Enfermedad Respiratoria',
          deselect: false,
          weight: 3
        },
        {
          active: false,
          button: 'Diabetes',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Embarazo',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'VIH',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'No tengo',
          deselect: true,
          weight: 0
        },
      ],
    },
    {
      question: 'Otras pistas y/o sintomas?',
      multipleSelect: true,
      answers: [
        {
          active: false,
          button: 'Ninguno de estos sintomas',
          deselect: true,
          weight: 0
        },
        {
          active: false,
          button: 'Boca o dedos morados',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Dolor de Cabeza',
          deselect: false,
          weight: 2
        },
        {
          active: false,
          button: 'Presión baja',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Respirar muy rápido',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Sensación de desmayo',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: 'Palidez',
          deselect: false,
          weight: 1
        },
      ],
    },
  ],
  [
    {
      question: 'Temperatura actual?',
      multipleSelect: false,
      answers: [
        {
          active: false,
          button: '>40',
          deselect: false,
          weight: 3,
        },
        {
          active: false,
          button: '35-37',
          deselect: false,
          weight: 1
        },
        {
          active: false,
          button: '38',
          deselect: false,
          weight: 2
        },
        {
          active: false,
          button: '39-40',
          deselect: false,
          weight: 3
        },
      ],
    },
    {
      question: 'Haz vistado alguna país, en los ultimos 14 días?',
      multipleSelect: false,
      answers: [
        {
          active: false,
          button: 'No',
          deselect: true,
          weight: 0
        },
        {
          active: false,
          button: 'Sí',
          deselect: true,
          weight: 1
        },
      ],
    },
  ]
];

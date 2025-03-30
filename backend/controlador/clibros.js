exports.getLibrosSP = (req,res) => {
    res.send( [{
        "Isbn": "978-3-16-148410-0",
        "Titulo": "Introducción a JavaScript",
        "fechEdicion": "2021-05-12",
        "numPaginas": 450,
        "cantEjemplares": 30,
        "cantEjemplaresDisponibles": 20,
        "Sinopsis": "Un completo manual para aprender JavaScript desde cero.",
        "tipoPresentacion": "Tapa dura",
        "tipoLiteratura": "Tecnología",
        "Autor": {
          "Nombre": "John",
          "Apellidos": "Doe",
          "fechPub":"2022-03-15",
          "Premios" : [
            "premio nobel de literatura (2002)"],
          "fecFall": " "
        }
      },
      
      {
        "Isbn": "978-1-23-456789-7",
        "Titulo": "La Historia de la Literatura",      
        "fechEdicion": "2019-10-20",
        "numPaginas": 320,
        "cantEjemplares": 15,
        "cantEjemplaresDisponibles": 10,
        "Sinopsis": "Un recorrido histórico por las principales obras literarias.",
        "tipoPresentacion": "Tapa blanda",
        "tipoLiteratura": "Histórica",
        "Autor":{
          "Nombre": "Jane",
          "Apellidos": "Smith",
          "fechPub":"2020-03-15",
          "Premios" : [
            "premio nobel de literatura (1999)",
            "premio nobel de literatura (2002)"],
          "fecFall": " "
        }
      },
      {
        "Isbn": "978-0-19-852663-6",
        "Titulo": "Cálculo Avanzado",
        "fechEdicion": "2005-07-15",
        "numPaginas": 300,
        "cantEjemplares": 25,
        "cantEjemplaresDisponibles": 5,
        "Sinopsis": "Un texto avanzado para estudiantes de matemáticas.",
        "tipoPresentacion": "Digital",
        "tipoLiteratura": "Educativa",
        "Autor":{
          "Nombre": "Michael",
          "Apellidos": "Johnson",
          "fechPub":"2020-03-15",
          "Premios" : [
            "premio nobel de literatura (1999)",
            "premio nobel de literatura (2002)"],
          "fecFall": " "
        }
      },
      {
        "Isbn": "978-0-521-85033-5",
        "Titulo": "El Arte de la Guerra",
        "fechEdicion": "2015-01-01",
        "numPaginas": 250,
        "cantEjemplares": 40,
        "cantEjemplaresDisponibles": 35,
        "Sinopsis": "Un antiguo tratado sobre estrategia y táctica militar.",
        "tipoPresentacion": "Tapa blanda",
        "tipoLiteratura": "Filosofía",
        "Autor":{
          "Nombre": "Sun",
          "Apellidos": "Tzu",
          "fechPub":"2016-05-08",
          "Premios" : [
            "Libro mas vendido (2017)"],
          "fecFall": "2019-03-15 "
        }
      },
      {
        "Isbn": "978-1-60163-022-3",
        "Titulo": "Cocina Fácil para Todos",
        "fechEdicion": "2018-09-25",
        "numPaginas": 200,
        "cantEjemplares": 50,
        "cantEjemplaresDisponibles": 45,
        "Sinopsis": "Recetas fáciles y rápidas para cualquier ocasión.",
        "tipoPresentacion": "Tapa dura",
        "tipoLiteratura": "Gastronomía",
        "Autor":{
          "Nombre": "Emma",
          "Apellidos": "Brown",
          "fechPub":"2016-05-08",
          "Premios" : [
            "Premio nobel de literatura (2020)",
            "Premio libro mas vendido (2021)"],
          "fecFall": "  "
        }
      },
      {
        "Isbn": "978-0-7432-7356-5",
        "Titulo": "El Poder del Hábito",
        "fechEdicion": "2012-02-28",
        "numPaginas": 371,
        "cantEjemplares": 60,
        "cantEjemplaresDisponibles": 50,
        "Sinopsis": "Cómo los hábitos influyen en nuestra vida diaria.",
        "tipoPresentacion": "Digital",
        "tipoLiteratura": "Autoayuda", 
        "Autor":{
          "Nombre": "Charles",
          "Apellidos": "Duhigg",
          "fechPub":"2013-11-10",
          "Premios" : [
            "premio nobel de literatura (2021)"],
          "fecFall": " "
        }
      },
      {
        "Isbn": "978-3-642-11746-6",
        "Titulo": "Introducción a la Física Cuántica",
        "fechEdicion": "1998-03-10",
        "numPaginas": 540,
        "cantEjemplares": 35,
        "cantEjemplaresDisponibles": 30,
        "Sinopsis": "Una introducción clara y concisa a la física cuántica.",
        "tipoPresentacion": "Tapa dura",
        "Tipo de literatura": "Científica",
        "Autor":{
          "Nombre": "Richard P.",
          "Apellidos": "Feynman",
          "fechPub":"1999-08-08",
          "Premios" : [
            "Libro mas vendido (1999)"],
          "fecFall": "2019-03-15 "
        }
      },
      {
        "Isbn": "978-0-385-74229-6",
        "Titulo": "Los Secretos del Marketing",
        "fechEdicion": "2016-08-15",
        "numPaginas": 410,
        "cantEjemplares": 45,
        "cantEjemplaresDisponibles": 38,
        "Sinopsis": "Técnicas y estrategias de marketing para el mundo actual.",
        "tipoPresentacion": "Digital",
        "tipoLiteratura": "Negocios",
        "Autor":{
          "Nombre": "Philip .",
          "Apellidos": "Kotler",
          "fechPub":"2018-09-07",
          "Premios" : [
            "Libro mas vendido (2020)"],
          "fecFall": " "
        }
      },
      {
        "Isbn": "978-0-06-231500-7",
        "Titulo": "El Universo Elegante",
        "fechEdicion": "2003-09-15",
        "numPaginas": 450,
        "cantEjemplares": 40,
        "cantEjemplaresDisponibles": 30,
        "Sinopsis": "Explora la teoría de cuerdas y la naturaleza del universo.",
        "tipoPresentacion": "Tapa dura",
        "tipoLiteratura": "Divulgación científica",
        "Autor":{
          "Nombre": "Brian",
          "Apellidos": "Greene",
          "fechPub":"2004-10-08",
          "Premios" : [
            "premio nobel de literatura (2005)"],
          "fecFall": "2017-03-15 "
        }
  
      },
      {
        "Isbn": "978-0-141-11965-6",
        "Titulo": "1984",
        "fechEdicion": "1949-06-08",
        "numPaginas": 328,
        "cantEjemplares": 100,
        "cantEjemplaresDisponibles": 95,
        "Sinopsis": "Una novela distópica sobre el control totalitario.",
        "tipoPresentacion": "Tapa blanda",
        "tipoLiteratura": "Ficción",
        "Autor":{
          "Nombre": "George",
          "Apellidos": "Orwell",
          "fechPub":"1999-08-08",
          "Premios" : [
            "Libro mas vendido (1985)"],
          "fecFall": "2000-04-10 "
        }
      }
  ])
} ;
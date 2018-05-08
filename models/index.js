const path = require('path');

// Load ORM
const Sequelize = require('sequelize');

// To use SQLite data base:
const sequelize = new Sequelize("sqlite:quiz.sqlite");

// Import the definition of the Quiz Table from quiz.js
const quizzes = sequelize.import(path.join(__dirname, 'quiz'));


// Create tables
sequelize.sync()
.then(() => quizzes.count())
.then((count) =>{
	if(!count){
		console.log("Todas las preguntas");
		return quizzes.bulkCreate([
			{question:"Pregunta Número 1",answer:"respuesta"},
			{question: "Captial de Italia", answer: "Roma"},
	 		{question: "Capital de Francia", answer: "París"},
	 		{question: "Capital de España", answer: "Madrid"},
			{question: "Capital de Portugal", answer: "Lisboa"}
		]);
	}

})
.catch(error => {
    console.log("Error creating the data base tables:", error);
    process.exit(1);
});


module.exports = sequelize;

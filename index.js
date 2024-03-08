// TODO: DONE Include packages needed for this application
import inquirer from 'inquirer';

import mysql from 'mysql';

// TODO: Create an array of questions for user input
const questions = [];

import * as fs from 'fs';

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

// TODO: Create a function to initialize app
function init() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Swabi1234",
    database: "mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
  
  /*
    inquirer
  .prompt([
    {
      type: 'maxlength-input',
        name: 'answerText',
        message: 'What is the SVG text?',
        maxLength: 3
      },
      {
        name: 'answerTextColor',
        message: 'What is the SVG text color?'
      },
      {
        type: 'list',
        name: 'answerShape',
        message: 'Which is the purpose of this readme?',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        name: 'answerShapeColor',
        message: 'What is the SVG shape color?'
      }
  ])
  .then((answers) => {
    var dataString = "";

    if (answers.answerShape === "circle") {
        dataString = creaateCircle(answers.answerText, answers.answerTextColor, answers.answerShapeColor);
    } else if (answers.answerShape === "triangle") {
      dataString = creaateTriangle(answers.answerText, answers.answerTextColor, answers.answerShapeColor);
    } else if (answers.answerShape === "square") {
      dataString = creaateSquare(answers.answerText, answers.answerTextColor, answers.answerShapeColor);
    }
       
    writeToFile("logo.svg", dataString);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  */
}

function creaateCircle(textString, textColor, shapeColor) {
  var returnString = "<svg width=\"300\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\">" +
    "<circle r=\"75\" cx=\"100\" cy=\"100\" fill=\"" + shapeColor + "\" /> " +
  "<text fill=\"" + textColor + "\" x=\"75\" y=\"75\"" + " " + 
  " text-anchor=\"middle\"" + " " + 
  " stroke=\"#0000FF\"" + " " + 
  " stroke-width=\"1px\"" + " " + 
  " alignment-baseline=\"middle\"" + " " + 
  " font-variant=\"all-small-caps\"" + " " + 
  " font-size=\"25\"" + " " + 
  " font-weight=\"bold\">" + textString + "</text>" +
  "</svg>";

  return returnString;
}

function creaateTriangle(textString, textColor, shapeColor) {
  var returnString = "<div style=\"width:300; height:200;\"><svg height=\"200\" width=\"300\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">" +
    "<polygon points=\"50 15, 100 100, 0 100\" fill=\"" + shapeColor + "\"/>" +
  "<text fill=\"" + textColor + "\" x=\"50\" y=\"50\"" + " " + 
  " text-anchor=\"middle\"" + " " + 
  " stroke=\"#0000FF\"" + " " + 
  " stroke-width=\"1px\"" + " " + 
  " alignment-baseline=\"middle\"" + " " + 
  " font-variant=\"all-small-caps\"" + " " + 
  " font-size=\"25\"" + " " + 
  " font-weight=\"bold\">" + textString + "</text>" +
  "</svg></div>";

  return returnString;
}

function creaateSquare(textString, textColor, shapeColor) {
  var returnString = "<svg width=\"300\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\">" +
    "<rect width=\"300\" height=\"200\" x=\"10\" y=\"10\" rx=\"20\" ry=\"20\" fill=\"" + shapeColor + "\" /> " +
    "<text fill=\"" + textColor + "\" x=\"50\" y=\"50\"" + " " + 
    " text-anchor=\"middle\"" + " " + 
    " stroke=\"#0000FF\"" + " " + 
    " stroke-width=\"1px\"" + " " + 
    " alignment-baseline=\"middle\"" + " " + 
    " font-variant=\"all-small-caps\"" + " " + 
    " font-size=\"25\"" + " " + 
    " font-weight=\"bold\">" + textString + "</text>" + 
  "</svg>";

  return returnString;
}

// Function call to initialize app
init();

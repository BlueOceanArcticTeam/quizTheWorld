/**
 * TODO:
 * copy helperFunction template and move to utilities folder
 * modify funciton inputs
 * modify function name
 * import function in ../utilities/index.js
 */

/**
 * userInput is what the user input into a form and is trying to submit
 * usage is what this string will be used for. Options are:
 * password, email, username, message, question and answer
 */
export default function inputValidation(userInput, usage) { // TAKES AN INPUT OF STRING AND USAGE
  // define output variable
  const output = { valid: false, errorMessage: `Invalid input for ${usage}` };
  // for overall validation - checking for sql commands
  /**
   * ALTER TABLE
   * CREATE ROLE
   * CREATE DATABASE
   * CREATE INDEX
   * CREATE MATERIALIZED VIEW
   * CREATE RECURSIVE VIEW
   * CREATE TABLE
   * CREATE OR REPLACE
   * DELETE FROM
   * DROP DATABASE
   * DROP INDEX
   * DROP VIEW
   * GRANT
   * INSERT INTO
   * SELECT FROM
   * SET ROLE
   * UPDATE
   */

  if (userInput.includes('CREATE')) {
    if (userInput.includes('CREATE ROLE')
    || userInput.includes('CREATE DATABASE')
    || userInput.includes('CREATE INDEX')
    || userInput.includes('CREATE MATERIALIZED VIEW')
    || userInput.includes('CREATE RECURSIVE VIEW')
    || userInput.includes('CREATE TABLE')
    || userInput.includes('CREATE OR REPLACE')) {
      return output;
    }
  } else if (userInput.includes('ALTER TABLE')) {
    return output;
  } else if (userInput.includes('DELETE FROM')) {
    return output;
  } else if (userInput.includes('DROP')) {
    if (userInput.includes('DROP DATABASE')
    || userInput.includes('DROP INDEX')
    || userInput.includes('DROP VIEW')) {
      return output;
    }
  } else if (userInput.includes('GRANT')) {
    return output;
  } else if (userInput.includes('INSERT INTO')) {
    return output;
  } else if (userInput.includes('SELECT FROM')) {
    return output;
  } else if (userInput.includes('SET ROLE')) {
    return output;
  } else if (userInput.includes('UPDATE')) {
    return output;
  }

  // overall validation checking for the use of ' or "
  if (userInput.includes("'") || userInput.includes('"')) {
    return output;
  }

  // additional checks for email
  if (usage === 'email') {
    // check if the email includes @ and .
    if (!userInput.includes('@') || !userInput.includes('.')) {
      // if not valid return not valid email
      output.errorMessage = 'Please enter a valid email';
      return output;
    }
  }

  // additional checks for username
  if (usage === 'username') {
    // username cannot be greater than 40 characters and less than 8
    if (userInput.length < 8) {
      output.errorMessage = 'Username must be longer than 8 characters';
      return output;
    } if (userInput.length > 40) {
      output.errorMessage = 'Username cannot exceed 40 characters';
      return output;
    }
  }

  // additional checks for password
  if (usage === 'password') {
    const passwordErrors = [];
    // password cannot be greater than 40 characters and less than 8
    if (userInput.length > 40) {
      passwordErrors.push('less than 40 characters');
    } else if (userInput.length < 8) {
      passwordErrors.push('more than 8 characters');
    }
    // password must contain one of the following:
    // special characters: ! _ - % & # $ + < >
    const specialCharacters = '!_-%&#$+<>';
    let specialCharUsed = false;
    for (let i = 0; i < specialCharacters.length; i + 1) {
      if (userInput.includes(specialCharacters[i])) {
        specialCharUsed = true;
        break;
      }
    }
    if (!specialCharUsed) {
      passwordErrors.push('a special character ! _ - % $ # & + < >');
    }

    // must contain a number
    const numbers = '0123456789';
    let numberUsed = false;
    for (let j = 0; j < numbers.length; j + 1) {
      if (userInput.includes(numbers[j])) {
        numberUsed = true;
        break;
      }
    }
    if (!numberUsed) {
      passwordErrors.push('a number');
    }
    // must contain a capitol letter
    if (userInput === userInput.toLowerCase()) {
      passwordErrors.push('an uppercase letter');
    }
    // must contain a lowercase letter
    if (userInput === userInput.toUpperCase()) {
      passwordErrors.push('a lowercase letter');
    }
    if (passwordErrors.length > 0) {
      const lastError = passwordErrors[passwordErrors.length - 2];
      passwordErrors.slice(0, passwordErrors.length - 1);
      passwordErrors.join(', ');
      output.errorMessage = `password must contain: ${passwordErrors.join(', ')}, and ${lastError}.`;
      return output;
    }
  }

  // additional checks for message, question, or answer
  if (usage === 'message' || usage === 'question' || usage === 'answer') {
    // cannot be greater than 200 characters
    if (userInput.length > 200) {
      output.errorMessage = `${usage} must be less than 200 characters`;
      return output;
    }
  }

  // return
  output.valid = true;
  output.errorMessage = null;
  return output;
}

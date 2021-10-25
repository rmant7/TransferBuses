const MIN_NUMBER: number = 16;
const MAX_NUMBER: number = 24;
const idLength: number = getRandomNumber(MIN_NUMBER, MAX_NUMBER);
const numbers: string = "0123456789";
const alphabetLowerCase: string = "abcdefghijklmnopqrstuvwxyz";
const alphabetUpperCase: string = alphabetLowerCase.toUpperCase();
const sumbols: string = `${numbers}${alphabetLowerCase}${alphabetUpperCase}`;
const sumbolsUpper: string = `${numbers}${alphabetUpperCase}`;
const sumbolsLower: string = `${numbers}${alphabetLowerCase}`;

export function generate(): string {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += sumbols[getRandomNumber(0, sumbols.length - 1)];
  }
  return id;
}

export function generateLoverCase(): string {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += sumbolsLower[getRandomNumber(0, sumbolsLower.length - 1)];
  }
  return id;
}

export function generateUpperCase(): string {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += sumbolsUpper[getRandomNumber(0, sumbolsUpper.length - 1)];
  }
  return id;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

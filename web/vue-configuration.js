const EMPTY = "";
const NEW_LINE = "\n";
const WHITESPACES = /\s/g;

const APPLICATION_SELECTOR = "#app-container";
const CANVAS_SELECTOR = "canvas";

const NAVIGATION_PREVIEW_SIZE = 10;
const NAVIGATION_INCREMENT = NAVIGATION_PREVIEW_SIZE;
const NAVIGATION_INTERVAL = 500;

let vue = {
  configuration: {}
};

let toolbox = {};

// @auto-fold here
toolbox.getNewEmptySignature = function () {
  console.log("getting a new empty signature");
  // @auto-fold here
  return {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    z: 0
  }
};

// @auto-fold here
toolbox.getSignatureFrom = function (text) {
  console.log("getting signature from ", text);
  let sanitized = text.toLowerCase()
    .replace(WHITESPACES, EMPTY);
  let charArray = sanitized.split(EMPTY);
  let signature = toolbox.getNewEmptySignature();

  if (EMPTY === sanitized) {
    return signature;
  }

  let populate = function (letter) {
    let increment = 1;
    if (undefined === signature[letter]) {
      console.log(`"${letter}" is out of bound! adding "${letter}" to the dictionnary`);
      signature[letter] = increment;
    } else signature[letter] += increment;
  }
  charArray.forEach(populate);
  console.log(signature);
  return signature;
};

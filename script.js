const alpha = 'abcdefghijklmnopqrstuvwxyz';
function generate_password(thename, code, word) {
  if (thename == "") {
    return "you need to add name"
  }
  if (code == "") {
    return "you need to add code"
  }
  if (code > 9999) {
    return "max value for code is 9999"
  }
  if (thename.length > 25) {
    return "max value for name is 25 letter"
  }
  thename.toLowerCase();
  thename.trim();
  let letterStart = get_alpha_number(thename[0]);
  let a1 = '';
  for (let i = 0; i < thename.length; i++) {
    let isfound = false;
    for (let g = 0; g < alpha.length; g++) {
      if (thename[i] == alpha[g]) {
        isfound = true;
        break;
      }
    }
    if (!isfound) {
      return "only alphabet"
    }
    a1 += next_alpha(get_alpha_number(thename[i]), Number(`${letterStart++}${i}`) + code)
  }
  a2 = duble_alpha(a1, word);
  a3 = a1 + "__" + a1.length + "@" + a1.length * 20 + "&" + a2 + a2.length * 3 + next_alpha(get_alpha_number(a1[0]), 2) + a1[1] + a1[2] + a1.slice(-3) + "_-" + a1.length;

  return a3;
}
function next_alpha(letter, count) {
  let start = 0;
  let new_number = letter;
  while (start < count) {
    new_number++;
    if (new_number == alpha.length) {
      new_number = 0;
    }
    start++;
  }
  return alpha[new_number]
}
function duble_alpha(oldpassword, word) {
  let start = 0;
  let new_password = '';
  let new_word = '';
  while (start < oldpassword.length) {
    let inside = 0;
    while (inside < alpha.length) {
      if (oldpassword[start] == alpha[inside]) {
        new_password += next_alpha(inside, start + 1);
      }
      inside++;
    }

    start++;
  }
  start = 0;
  while (start < word.length) {
    let inside = 0;
    while (inside < alpha.length) {
      if (word[start] == alpha[inside]) {
        new_word += next_alpha(inside, 1);
      }
      inside++;
    }
    start++;
  }
  return new_password + new_word
}
function get_alpha_number(letter) {
  let start = 0;
  while (start < alpha.length) {
    if (letter == alpha[start]) {
      return start;
    }
    start++;
  }
}
const words = ["apple", "banana", "watermelon", "kiwi"];

const result = words.filter((word, i, arr) => {
  console.log(`word=${word}, index=${i}, array=${arr}`);
  return word.length > 6;
});
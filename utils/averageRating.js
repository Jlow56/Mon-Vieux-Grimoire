function calculateAverageRating(ratings) {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((total, r) => total + r.grade, 0);
  return sum / ratings.length;
}

module.exports =  {calculateAverageRating};
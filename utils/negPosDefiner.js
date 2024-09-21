const negPosDefiner = (changeNumber) => {
  if (changeNumber > 0) {
    return "change";
  } else {
    return "change-neg";
  }
};

export { negPosDefiner };

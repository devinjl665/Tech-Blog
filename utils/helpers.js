module.exports = {
  format_date: (date) => {
    
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleTimeString("en-US", options);
    },

  isEqual: (arg1, arg2) => {
    if(arg1 === arg2){
      return true;
    } else {
    return false;
    }
  }
};
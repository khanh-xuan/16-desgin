const numberWithComas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default numberWithComas;
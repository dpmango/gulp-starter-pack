// Format with spaces
function formatNumberWithSpaces(num){
  return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

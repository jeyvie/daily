let str = '1 + 2 + 3*5/4 - 3+7*4'


const checkChart = (chart) => {
  return {
    valid: [' ', '+', '-', '*', '/'].includes(chart) || !isNaN(Number(chart)),
    chart
  }
}

const parseStr = (str) => {
  let checkResult;
  for(let chart of str) {
    checkResult = checkChart(chart);
    if (!checkResult.valid) return console.log(`${checkResult.chart} 为非法字段`);
  }

  return new Function(`return ${str}` )
}




const getResult = parseStr(str)

console.log(getResult());

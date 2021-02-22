const sep = 'DomInspector: '

const proxy: ['log', 'warn', 'error'] = ['log', 'warn', 'error']

const exportObj: Record<string, any> = {}

proxy.forEach(item => {
  exportObj[item] = function funcName(...args: any[]) {
    return console[item].call(this, sep + args[0], args[1] || '')
  }
})

export default exportObj

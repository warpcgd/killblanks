import iView from 'view-design'

export function log (type = 'success', message = ''):void {
  switch (type) {
  case 'success':
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iView.Message.success(message)
    break;
  case 'error':
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iView.Message.error(message)
    break;
  case 'warning':
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iView.Message.warning(message)
    break;
  case 'info':
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iView.Message.info(message)
    break;
  default:
    break;
  }
}

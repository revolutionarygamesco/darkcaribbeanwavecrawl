export type NotificationType = 'info' | 'success' | 'warn' | 'error'

const notify = (type: NotificationType, msg: string): void => {
  if (!ui.notifications) return
  switch (type) {
    case 'success': return ui.notifications.success(msg)
    case 'warn': return ui.notifications.warn(msg)
    case 'error': return ui.notifications.error(msg)
    default: return ui.notifications.info(msg)
  }
}

export default notify

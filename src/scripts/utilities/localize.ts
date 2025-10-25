const localize = (
  key: string,
  options?: Record<string, any>
) => game?.i18n?.format?.(key, options) ?? key

export default localize

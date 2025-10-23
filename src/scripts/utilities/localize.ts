const localize = (
  key: string,
  options?: Record<string, any>
) => game?.i18n?.localize?.(key, options) ?? key

export default localize

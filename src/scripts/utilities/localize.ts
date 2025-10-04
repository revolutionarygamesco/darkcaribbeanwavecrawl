const localize = (key: string) => game?.i18n?.localize?.(key) ?? key

export default localize

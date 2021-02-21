import isNumber from './isNumber'
import isString from './isString'
import unformatNumber from './unformatNumber'

/**
 * Format number.
 * @param {number} number
 * @param {Object} options
 * @param {number|string|null} options.precision default value 0
 * @param {string} options.thousand default value ''
 * @param {string} options.decimal default value ','
 * @param {boolean} options.fixed default value false, for fixed decimals
 * @param {number} options.fallback default fallback value
 * @returns {string}
 */

export interface FormatNumberOption {
  precision?: number | null
  thousand?: string
  decimal?: string
  fixed?: boolean
  fallback?: number
}

export const formatNumber = (number: any, options: FormatNumberOption = {}): string | null => {
  // Build options object, extending defaults:
  const opts = {
    precision: options.precision ?? 0,
    thousand: options.thousand ?? '',
    decimal: options.decimal ?? ',',
    fixed: options.fixed ?? false,
  }
  if ((number === null || number === '')) {
    if (isNumber(options.fallback)) {
      number = options.fallback
    } else {
      return null
    }
  }
  const stringVal = isString(number)
    ? number.replace('.', opts.decimal)
    : toStr(number).replace('.', opts.decimal)
  const hasDelemiter = stringVal.slice(-1) === opts.decimal && opts.precision > 0

  // Clean up number:
  number = unformatNumber(stringVal, opts.decimal)
  // for check zero input after decimal
  const stringDecimal = stringVal.split(opts.decimal)[1] || ''
  let numberDecimal = number.toString().split('.')[1] || ''
  if (!opts.fixed && numberDecimal.length === 0 && stringDecimal.split('').every((el: any) => el === '0')) {
    numberDecimal = stringDecimal
  }
  const numberPrecision = (numberDecimal.length > opts.precision) || opts.fixed
    ? opts.precision
    : numberDecimal.length

  // Clean up precision
  const usePrecision = checkPrecision(numberPrecision, opts.precision)

  // Do some calc:
  const negative = number < 0 ? '-' : ''
  const base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + ''
  const mod = base.length > 3 ? base.length % 3 : 0

  // Format the number:
  const formatted = negative + (mod ? base.substr(0, mod) + opts.thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : '')
  return hasDelemiter && !opts.fixed ? `${formatted}${opts.decimal}` : formatted
}

/**
 * Fixed number string.
 * @param {number} value
 * @param {number} precision
 * @returns {string}
 */
const toFixed = (value: number, precision: number): string => {
  precision = checkPrecision(precision, 0)
  const exponentialForm = Number(unformatNumber(value) + 'e' + precision)
  const rounded = Math.round(exponentialForm)
  const finalResult = Number(rounded + 'e-' + precision).toFixed(precision)
  return finalResult
}

/**
 * Check precision of number.
 * @param {number} val
 * @param {number} base
 * @returns {number}
 */
const checkPrecision = (val: number, base: number): number => {
  val = Math.round(Math.abs(val))
  return isNaN(val) ? base : val
}

/**
 * Convert to string.
 * @param {string|number} value
 * @returns {string}
 */
const toStr = (value: string | number): string => {
  return value ? value.toString() : ''
}

export default formatNumber

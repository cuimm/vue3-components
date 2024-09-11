import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import { Arrayable } from '@m2-ui/utils/typescript'
import type { FormItemProps } from './form-item'
import { FormEmits, FormProps } from './form'

/** @description FormItem回调 */
export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void

/** @description 表单校验结果 */
export type FormValidationResult = Promise<boolean>

/** @description 表单项校验失败时error信息 */
export type FormValidateFailure = {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

/** @description 校验规则 */
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

/** @description FormItem上下文 */
export interface FormItemContext extends FormItemProps {
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult
}

/** @description Form上下文 */
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  emit: FormEmits
}

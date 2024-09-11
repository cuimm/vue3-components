import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import { Arrayable } from '@m2-ui/utils/typescript'
import type { FormItemProps } from './form-item'
import { FormEmits, FormProps } from './form'

export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void

export type FormValidationResult = Promise<boolean>

export type FormValidateFailure = {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export interface FormItemContext extends FormItemProps {
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  emit: FormEmits
}

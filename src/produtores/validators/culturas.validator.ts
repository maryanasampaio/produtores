import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const CULTURAS_VALIDAS = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'];

export function CulturasValidas(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'culturasValidas',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string[], _args: ValidationArguments) {
          return Array.isArray(value) && value.every((cultura) => CULTURAS_VALIDAS.includes(cultura));
        },
        defaultMessage(_args: ValidationArguments) {
          return `Cada cultura deve ser uma das seguintes: ${CULTURAS_VALIDAS.join(', ')}`;
        },
      },
    });
  };
}

import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CpfOuCnpjValidator } from '../validators/cpf-cnpj.validator';
import { CulturasValidas } from '../validators/culturas.validator';

export class CreateProdutorDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replaceAll(/[^\d]+/g, '') : value,
  )
  @IsString()
  @IsNotEmpty()
  @Validate(CpfOuCnpjValidator)
  cpfOuCnpj: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  nomeProdutor: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  nomeFazenda: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @IsNotEmpty()
  estado: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  areaTotal: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  areaAgricultavel: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  areaVegetacao: number;

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((cultura) =>
          typeof cultura === 'string' ? cultura.trim() : cultura,
        )
      : value,
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @CulturasValidas()
  culturas: string[];
}

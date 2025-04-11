import {
  IsArray,
  IsNotEmpty,
  IsString,
  Validate,
  IsNumber,
  Min,
} from 'class-validator';
import { CpfOuCnpjValidator } from '../validators/cpf-cnpj.validator';
import { CulturasValidas } from '../validators/culturas.validator';

export class CreateProdutorDto {
  @IsString()
  @Validate(CpfOuCnpjValidator)
  cpfOuCnpj: string;

  @IsNotEmpty()
  nomeProdutor: string;

  @IsNotEmpty()
  nomeFazenda: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNumber()
  @Min(0)
  areaTotal: number;

  @IsNumber()
  @Min(0)
  areaAgricultavel: number;

  @IsNumber()
  @Min(0)
  areaVegetacao: number;

  @IsArray()
  @CulturasValidas()
  culturas: string[];
}

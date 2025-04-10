import { IsArray, IsDecimal, IsNotEmpty, IsString, Matches } from 'class-validator';

const CULTURAS_VALIDAS = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'];

export class CreateProdutorDto {
  @IsString()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'CPF ou CNPJ deve conter 11 ou 14 dígitos numéricos',
  })
  cpfOuCnpj: string;

  @IsNotEmpty()
  nomeProdutor: string;

  @IsNotEmpty()
  nomeFazenda: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;

  @IsArray()
  culturas: string[];
}

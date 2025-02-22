import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, IsNumber } from 'class-validator';
import { EquipmentType } from '../../../enum/equipmentype.enum';
import { OrderStatus } from 'src/enum/orderstatus.enum';

export class CreationOrderDto {
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @IsNumber()
  @IsNotEmpty()
  clientDni: number;

  @IsEnum(EquipmentType)
  @IsNotEmpty()
  equipmentType: EquipmentType;

  @IsString()
  @IsNotEmpty()
  imei: string;

  @IsUUID()
  @IsOptional()
  assignedTechnician?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

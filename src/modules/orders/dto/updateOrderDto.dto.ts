import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsNumber } from 'class-validator';
import { EquipmentType } from '../../../enum/equipmentype.enum';
import { OrderStatus } from 'src/enum/orderstatus.enum';

export class CreationOrderDto {
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @IsNumber()
  @IsOptional()
  clientDni?: number;

  @IsEnum(EquipmentType)
  @IsOptional()
  equipmentType?: EquipmentType;

  @IsString()
  @IsOptional()
  imei?: string;

  @IsUUID()
  @IsOptional()
  assignedTechnician?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsString()
  @IsOptional()
  user?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

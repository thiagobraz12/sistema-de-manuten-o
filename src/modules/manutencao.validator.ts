import { validate } from '../common/validator/generic.validator';
import { CreateManutencaoDto, UpdateManutencaoDto } from './manutencao.dto';

export class ManutencaoValidator {
  static create(data: any) {
    return validate(CreateManutencaoDto, data);
  }

  static update(data: any) {
    return validate(UpdateManutencaoDto, data);
  }
}

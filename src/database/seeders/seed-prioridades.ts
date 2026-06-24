import { DataSource } from 'typeorm';
import { Prioridade } from '../../modules/prioridade/prioridade.entity';

export async function seedPrioridades(dataSource: DataSource) {
  const repo = dataSource.getRepository(Prioridade);

  // ✅ Verifica se já existe qualquer prioridade
  const count = await repo.count();

  if (count > 0) {
    console.log('ℹ Prioridades já cadastradas, seed ignorado');
    return;
  }

  await repo.save([{ nome: 'Baixa' }, { nome: 'Média' }, { nome: 'Alta' }]);

  console.log('✔ Seed de prioridades executado com sucesso');
}

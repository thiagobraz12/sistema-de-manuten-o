import { Injectable } from '@nestjs/common';

import { ManutencoesService }
from '../modules/manutencoes.service';

@Injectable()
export class DashboardService {

  constructor(
    private readonly manutencoesService:
    ManutencoesService,
  ) {}

  async getDashboardData() {

    const manutencoes =
      await this.manutencoesService.findAll();

    // =========================
    // TOTAIS
    // =========================

    const total = manutencoes.length;

    const abertas = manutencoes.filter(
      (m) =>
        m.status?.toLowerCase() === 'aberta' ||
        m.status?.toLowerCase() === 'aberto',
    ).length;

    const andamento = manutencoes.filter(
      (m) =>
        m.status?.toLowerCase() === 'andamento' ||
        m.status?.toLowerCase() === 'em andamento',
    ).length;

    const concluidas = manutencoes.filter((m) => {

      const s =
        m.status
          ?.toLowerCase()
          .trim();

      return (
        s === 'concluida' ||
        s === 'concluída' ||
        s === 'concluido' ||
        s === 'concluído'
      );

    }).length;

    const emAnalise = manutencoes.filter(
      (m) =>
        m.status?.toLowerCase() === 'em analise' ||
        m.status?.toLowerCase() === 'em análise',
    ).length;

    const canceladas = manutencoes.filter(
      (m) =>
        m.status?.toLowerCase() === 'cancelado' ||
        m.status?.toLowerCase() === 'cancelada',
    ).length;

    // =========================
    // PRIORIDADES
    // =========================

    const porPrioridade = {

      baixa: manutencoes.filter(
        (m) =>
          m.prioridade?.nome === 'Baixa'
      ).length,

      media: manutencoes.filter(
        (m) =>
          m.prioridade?.nome === 'Média'
      ).length,

      alta: manutencoes.filter(
        (m) =>
          m.prioridade?.nome === 'Alta'
      ).length,

    };

    // =========================
    // TOTAL GASTO
    // =========================

    const totalGasto = manutencoes
      .filter((m) => {

        const status = String(
          m.status || ''
        )
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .trim()
          .toLowerCase();

        return !status.includes('cancel');

      })
      .reduce(
        (total, m) =>
          total + Number(m.valor || 0),
        0
      );

      // =========================
      // TEMPO MÉDIO DE ATENDIMENTO
      // =========================

     const manutencoesConcluidas = manutencoes.filter(

     (m) =>

      m.dataSolicitacao &&

     m.dataConclusao

     );

     let tempoMedioAtendimento = 0;

     if (manutencoesConcluidas.length > 0) {

    const totalDias = manutencoesConcluidas.reduce(

    (total, m) => {

      const inicio =
        new Date(
          m.dataSolicitacao,
        ).getTime();

      const fim =
        new Date(
          m.dataConclusao,
        ).getTime();

      const dias =
        Math.ceil(
          (fim - inicio)
          /
          (1000 * 60 * 60 * 24)
        );

      return total + dias;

    },

    0,

  );

  tempoMedioAtendimento = Math.round(

    totalDias
    /
    manutencoesConcluidas.length

  );

}

    // =========================
    // MANUTENÇÕES POR TIPO
    // =========================

    const manutencoesPorTipo = {};

    manutencoes.forEach((m) => {

      const tipo = String(
        m.tipo || 'Não informado'
      ).trim();

      if (!manutencoesPorTipo[tipo]) {

        manutencoesPorTipo[tipo] = 0;

      }

      manutencoesPorTipo[tipo]++;

    });

    // =========================
    // GASTOS MENSAIS
    // =========================

    const gastosMensais = {

      Janeiro: 0,
      Fevereiro: 0,
      Março: 0,
      Abril: 0,
      Maio: 0,
      Junho: 0,
      Julho: 0,
      Agosto: 0,
      Setembro: 0,
      Outubro: 0,
      Novembro: 0,
      Dezembro: 0,

    };

    manutencoes.forEach((m) => {

      if (!m.dataSolicitacao) return;

      const data =
        new Date(m.dataSolicitacao);

      const mes =
        data.getMonth();

      const valor =
        Number(m.valor || 0);

      switch (mes) {

        case 0:
          gastosMensais.Janeiro += valor;
          break;

        case 1:
          gastosMensais.Fevereiro += valor;
          break;

        case 2:
          gastosMensais.Março += valor;
          break;

        case 3:
          gastosMensais.Abril += valor;
          break;

        case 4:
          gastosMensais.Maio += valor;
          break;

        case 5:
          gastosMensais.Junho += valor;
          break;

        case 6:
          gastosMensais.Julho += valor;
          break;

        case 7:
          gastosMensais.Agosto += valor;
          break;

        case 8:
          gastosMensais.Setembro += valor;
          break;

        case 9:
          gastosMensais.Outubro += valor;
          break;

        case 10:
          gastosMensais.Novembro += valor;
          break;

        case 11:
          gastosMensais.Dezembro += valor;
          break;

      }

    });

    // =========================
    // PRÓXIMAS PREVENTIVAS
    // =========================

   const proximasPreventivas = manutencoes

  .filter((m) =>

    m.preventiva === true &&

    m.proximaExecucao

  )

  .sort(

    (a, b) =>

      new Date(a.proximaExecucao).getTime()

      -

      new Date(b.proximaExecucao).getTime()

  )

  .slice(0, 5);

   // =========================
   // PREVENTIVAS VENCIDAS
   // =========================

   const hoje = new Date();

   const preventivasVencidas = manutencoes

  .filter((m) =>

    m.preventiva === true &&

    m.proximaExecucao &&

    new Date(m.proximaExecucao) < hoje

  )

  .length;

   return {

   total,

   abertas,

   andamento,

   concluidas,

   emAnalise,

   canceladas,

   totalGasto,

   tempoMedioAtendimento,

   porPrioridade,

   manutencoesPorTipo,

   gastosMensais,

   proximasPreventivas,

   preventivasVencidas,

  };
}
}
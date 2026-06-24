// $(function () {

//     // =========================
//     // EXCLUIR MANUTENÇÃO
//     // =========================

//     $('.remover').click(function (e) {

//         e.preventDefault();

//         let id = $(this).data('id');
//         let name = $(this).data('name');

//         Swal.fire({
//             title: 'Deseja excluir a solicitação?',
//             text: name,
//             icon: 'warning',
//             timer: 5000,
//             showCancelButton: true,
//             confirmButtonColor: '#4e73df',
//             cancelButtonColor: '#e74a3b',
//             confirmButtonText: 'Sim, excluir!',
//             cancelButtonText: 'Cancelar'
//         }).then(async (result) => {

//             if (result.isConfirmed) {

//                 try {

//                     const response = await fetch(`/manutencoes/excluir/${id}`, {
//                         method: 'POST'
//                     });

//                     if (!response.ok) {
//                         throw new Error('Erro ao excluir');
//                     }

//                     Swal.fire({
//                         title: 'Excluído!',
//                         text: `Solicitação "${name}" foi excluída`,
//                         icon: 'success',
//                         timer: 5000,
//                         showConfirmButton: true,
//                         confirmButtonText: 'OK',
//                         confirmButtonColor: '#4e73df',
//                         willClose: () => {
//                             location.reload();
//                         }
//                     });

//                 } catch (error) {

//                     console.log(error);

//                     Swal.fire({
//                         title: 'Erro!',
//                         text: 'Não foi possível excluir',
//                         icon: 'error'
//                     });

//                 }

//             }

//         });

//     });

//     // =========================
//     // ATUALIZAR MANUTENÇÃO
//     // =========================

//     $('.form-editar').submit(function (e) {

//         e.preventDefault();

//         const form = this;

//         const descricao =
//             form.querySelector('[name="descricao"]')?.value || 'Solicitação';

//         Swal.fire({

//             title: 'Deseja atualizar a solicitação?',

//             text: descricao,

//             icon: 'warning',

//             showCancelButton: true,

//             timer: 5000,

//             confirmButtonColor: '#4e73df',

//             cancelButtonColor: '#e74a3b',

//             confirmButtonText: 'Sim, atualizar!',

//             cancelButtonText: 'Cancelar'

//         }).then((result) => {

//             if (result.isConfirmed) {

//                 form.submit();

//             }

//         });

//     });

//     // =========================
//     // IMPRIMIR
//     // =========================

//     $('.imprimir').click(function () {

//         let id = $(this).data('id');

//         const win = window.open(
//             `/manutencoes/imprimir/${id}`,
//             '_blank'
//         );

//         win.onload = () => {

//             win.print();

//         };

//     });

//     // =========================
//     // EXCLUIR EQUIPAMENTO
//     // =========================

//     $('.remover-equipamento').click(function (e) {

//         e.preventDefault();

//         let id = $(this).data('id');
//         let name = $(this).data('name');

//         Swal.fire({

//             title: 'Deseja excluir o equipamento?',

//             text: name,

//             icon: 'warning',

//             timer: 5000,

//             showCancelButton: true,

//             confirmButtonColor: '#4e73df',

//             cancelButtonColor: '#e74a3b',

//             confirmButtonText: 'Sim, excluir!',

//             cancelButtonText: 'Cancelar'

//         }).then(async (result) => {

//             if (result.isConfirmed) {

//                 try {

//                     const response = await fetch(`/equipamentos/excluir/${id}`, {
//                         method: 'POST'
//                     });

//                     if (!response.ok) {
//                         throw new Error('Erro ao excluir');
//                     }

//                     Swal.fire({

//                         title: 'Excluído!',

//                         text: `Equipamento "${name}" foi excluído.`,

//                         icon: 'success',

//                         timer: 5000,

//                         showConfirmButton: true,

//                         confirmButtonText: 'OK',

//                         confirmButtonColor: '#4e73df',

//                         willClose: () => {

//                             location.reload();

//                         }

//                     });

//                 } catch (error) {

//                     console.log(error);

//                     Swal.fire({

//                         title: 'Erro!',

//                         text: 'Não foi possível excluir o equipamento.',

//                         icon: 'error'

//                     });

//                 }

//             }

//         });

//     });

//     // =========================
//     // ATUALIZAR EQUIPAMENTO
//     // =========================

//     $('.form-editar-equipamento').submit(function (e) {

//         e.preventDefault();

//         const form = this;

//         const nome =
//             form.querySelector('[name="nome"]')?.value || 'Equipamento';

//         Swal.fire({

//             title: 'Deseja atualizar o equipamento?',

//             text: nome,

//             icon: 'warning',

//             showCancelButton: true,

//             timer: 5000,

//             confirmButtonColor: '#4e73df',

//             cancelButtonColor: '#e74a3b',

//             confirmButtonText: 'Sim, atualizar!',

//             cancelButtonText: 'Cancelar'

//         }).then((result) => {

//             if (result.isConfirmed) {

//                 form.submit();

//             }

//         });

//     });

// });


$(function () {

    // ==========================
    // EXCLUIR MANUTENÇÃO
    // ==========================
    $('.remover').click(function (e) {

        e.preventDefault();

        const id = $(this).data('id');
        const name = $(this).data('name');

        Swal.fire({
            title: 'Deseja excluir a solicitação?',
            text: name,
            icon: 'warning',
            timer: 5000,
            showCancelButton: true,
            confirmButtonColor: '#4e73df',
            cancelButtonColor: '#e74a3b',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (!result.isConfirmed) return;

            try {

                const response = await fetch(`/manutencoes/excluir/${id}`, {
                    method: 'POST'
                });

                if (!response.ok)
                    throw new Error();

                Swal.fire({
                    title: 'Excluído!',
                    text: `Solicitação "${name}" foi excluída.`,
                    icon: 'success',
                    timer: 5000,
                    confirmButtonColor: '#4e73df',
                    confirmButtonText: 'OK',
                    willClose: () => {
                        location.reload();
                    }
                });

            } catch {

                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível excluir.',
                    icon: 'error'
                });

            }

        });

    });


    // ==========================
    // EDITAR MANUTENÇÃO
    // ==========================
    $('.form-editar').submit(function (e) {

        e.preventDefault();

        const form = this;

        const descricao =
            $(form).find('[name="descricao"]').val() || 'Solicitação';

        Swal.fire({

            title: 'Deseja atualizar a solicitação?',

            text: descricao,

            icon: 'warning',

            timer: 5000,

            showCancelButton: true,

            confirmButtonColor: '#4e73df',

            cancelButtonColor: '#e74a3b',

            confirmButtonText: 'Sim, atualizar!',

            cancelButtonText: 'Cancelar'

        }).then((result) => {

            if (result.isConfirmed) {

                form.submit();

            }

        });

    });


    // ==========================
    // IMPRIMIR
    // ==========================
    $('.imprimir').click(function () {

        const id = $(this).data('id');

        const win = window.open(`/manutencoes/imprimir/${id}`, '_blank');

        win.onload = () => {

            win.print();

        };

    });


    // ==========================
    // EXCLUIR EQUIPAMENTO
    // ==========================
    $('.remover-equipamento').click(function (e) {

        e.preventDefault();

        const id = $(this).data('id');
        const name = $(this).data('name');

        Swal.fire({
            title: 'Deseja excluir o equipamento?',
            text: name,
            icon: 'warning',
            timer: 5000,
            showCancelButton: true,
            confirmButtonColor: '#4e73df',
            cancelButtonColor: '#e74a3b',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (!result.isConfirmed) return;

            try {

                const response = await fetch(`/equipamentos/excluir/${id}`, {
                    method: 'POST'
                });

                if (!response.ok)
                    throw new Error();

                Swal.fire({
                    title: 'Excluído!',
                    text: `Equipamento "${name}" foi excluído.`,
                    icon: 'success',
                    timer: 5000,
                    confirmButtonColor: '#4e73df',
                    confirmButtonText: 'OK',
                    willClose: () => {
                        location.reload();
                    }
                });

            } catch {

                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível excluir o equipamento.',
                    icon: 'error'
                });

            }

        });

    });


    // ==========================
    // EDITAR EQUIPAMENTO
    // ==========================
    $('.form-editar-equipamento').submit(function (e) {

        e.preventDefault();

        const form = this;

        const nome =
            $(form).find('[name="nome"]').val() || 'Equipamento';

        Swal.fire({

            title: 'Deseja atualizar o equipamento?',

            text: nome,

            icon: 'warning',

            timer: 5000,

            showCancelButton: true,

            confirmButtonColor: '#4e73df',

            cancelButtonColor: '#e74a3b',

            confirmButtonText: 'Sim, atualizar!',

            cancelButtonText: 'Cancelar'

        }).then((result) => {

            if (result.isConfirmed) {

                form.submit();

            }

        });

    });

});
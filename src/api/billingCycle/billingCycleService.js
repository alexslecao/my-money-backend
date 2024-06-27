const BillingCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });

BillingCycle.after('post', errorHandler);
BillingCycle.after('put', errorHandler);

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] });
        } else {
            res.status(200).json({ value });
        }
    });
});

BillingCycle.route('summary', (req, res, nex) => {
    BillingCycle.aggregate(
        {
            //-Junta todos os Crétidos e Débitos para cada Ciclo de Pagamento
            $project: {
                credit: { $sum: "$credits.value" },
                debt: { $sum: "$debts.value" }
            }
        },
        {
            //-Agrupa todos os créditos/débitos de todos os ciclos de pagamento no geral
            $group: {
                _id: null,
                credit: { $sum: "$credit" },
                debt: { $sum: "$debt" }
            }
        },
        {
            //-Informo que só quero as colunas de Credito e Debito, não quero ID
            $project: {
                _id: 0,
                credit: 1,
                debt: 1
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json({ erros: [error] });
            }
            else {
                res.status(200).json( result[0] || { credit: 0, debt: 0 } );
            }
        }
    );
});

module.exports = BillingCycle;
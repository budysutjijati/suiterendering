/**
 * @NApiVersion 2.1
 * @ModuleScope Public
 * @author budy.sutjijati@europarcs.nl
 *
 * serverside_lib.js
 *
 *  oooooooooooo                                ooooooooo.
 *  888'     `8                                `888   `Y88.
 *  888         oooo  oooo  oooo d8b  .ooooo.   888   .d88'  .oooo.   oooo d8b  .ooooo.   .oooo.o
 *  888oooo8    `888  `888  `888""8P d88' `88b  888ooo88P'  `P  )88b  `888""8P d88' `"Y8 d88(  "8
 *  888    "     888   888   888     888   888  888          .oP"888   888     888       `"Y88b.
 *  888       o  888   888   888     888   888  888         d8(  888   888     888   .o8 o.  )88b
 *  o888ooooood8  `V88V"V8P' d888b    `Y8bod8P' o888o        `Y888""8o d888b    `Y8bod8P' 8""888P'
 *
 */
define([
    'N/config',
    'N/format',
    'N/query',
    'N/record',
    'N/runtime',
    'N/search',
    'N/url',
    'N/ui/serverWidget',
    'N/render',
    'N/file',
    'N/error',
    'N/log',
    'N/translation'
    ],

    /**
     * @param {config} config
     * @param {format} format
     * @param {query} query
     * @param {record} record
     * @param {runtime} runtime
     * @param {search} search
     * @param {url} url
     * @param {serverWidget} serverWidget
     * @param {render} render
     * @param {file} file
     * @param {error} error
     * @param {log} log
     * @param {translation} translation
     */
    (config, format, query, record, runtime, search, url, serverWidget, render, file, error, log, translation) => {


        const getSystemValue = () => {
            return {
                intJobTypeSales: 1,
                intJobTypeResale: 3,
                intJobTypeBasic: 10,
                intJobTypeStock: 11,
            }
        }

        /**
         * Configuration object
         * @returns {{parkProjects: number[], roles: {euroParcsRevenueManager: number[], euroParcsLivingArDebiteurenAdministratie: number[], afterSalesManager: number[]}, classes: {lots: number[], accommodations: number[], intangibleOptions: number[], tangibleOptions: number[]}, project: {incorrectProjectReason: {saleCancelled: number, wrongPrice: number, other: number, wrongVAT: number, noFinancing: number, wrongCustomer: number, wrongLot: number}, approvalstatus: {approved: number, rejected: number, pendingApproval: number, open: number}, jobtypes: {refurbishments: number, parkdevelopment_subproject: number, parkdevelopment_locationproject: number, reaprojects_basic: number, reaprojects_stock: number, parkdevelopment_mainproject: number, reaprojects_sales: number, resale: number, parkdevelopment: number, mvaexplotatie: number}, projectclass: {exploitation: number, development: number, operations: number, refurbishment: number, it: number, resales: number, facility: number, sales: number}, statussalesproject: {basic: number, stock: number, sales: number}, projecttemplates: {parkdevelopmentkavelproject: number}}, salesorder: {customStatus: {other: string, cancellation: string, wrongSalesorder: string, final: string, onHoldNotary: string, subjectToFinancing: string, reflectionPeriod: string, returnForCorrection: string}, status: {pendingFulfillment: string, billed: string, pendingBilling: string, cancelled: string, closed: string, partiallyFulfilled: string, pendingApproval: string}}, entitystatus: {pendingOther: number, mistakeProject: number, inProgress: number, awarded: number, wrongCustomerProject: number, processingIncorrectProject: number, pendingProjectClose: number, closed: number}, customRecord: {pcd: string, dw: string, kavel: string, accommodation: string, option: string, pca: string}, advancedIntercompanyJournal: {print: {excludedAccounts: number[]}}, procurementStatus: {toDo: number, onHoldByCRM: number, new: number, onHold: number, skipAlways: number, error: number, done: number, skipForNow: number}, terms: {notary: number}, kavel: {status: {new: number, sold: number, expired: number, licenseNA: number, reserved: number, available: number, notOwned: number, rentedOut: number, parkOwned: number, maintenance: number, ownExploitation: number, preSold: number}, defaultProjectFormOnCreate: number}, domain: string, salesProjects: number[], accommodation: {saleStatus: {sold: number, stock: number, ownExploitation: number}}, onHoldReason: {multipleAccommodations: number, differentAccommodationSoldAsAllowed: number, differentAccommodationSoldAsPlaced: number}, purchaseStatusScenario: {accommodationItemEqual: number, multipleAccommodationsActive: number, accommodationSoldNotAllowed: number, accommodationSoldAllowed: number, noAccommodation: number, accommodationItemNotEqual: number, generic: number}, customSuitelet: {showConfiguration: string[]}, crm: {mandatoryFieldsKavel: string[]}}|{parkProjects: number[], roles: {euroParcsRevenueManager: number[], euroParcsLivingArDebiteurenAdministratie: number[], afterSalesManager: number[]}, classes: {lots: number[], accommodations: number[], intangibleOptions: number[], tangibleOptions: number[]}, project: {incorrectProjectReason: {saleCancelled: number, wrongPrice: number, other: number, wrongVAT: number, noFinancing: number, wrongCustomer: number, wrongLot: number}, approvalstatus: {approved: number, rejected: number, pendingApproval: number, open: number}, jobtypes: {refurbishments: number, parkdevelopment_subproject: number, parkdevelopment_locationproject: number, reaprojects_basic: number, reaprojects_stock: number, parkdevelopment_mainproject: number, reaprojects_sales: number, resale: number, parkdevelopment: number, mvaexplotatie: number}, projectclass: {exploitation: number, development: number, operations: number, refurbishment: number, it: number, resales: number, facility: number, sales: number}, statussalesproject: {basic: number, stock: number, sales: number}, projecttemplates: {parkdevelopmentkavelproject: number}}, salesorder: {customStatus: {other: string, cancellation: string, wrongSalesorder: string, final: string, onHoldNotary: string, subjectToFinancing: string, reflectionPeriod: string, returnForCorrection: string}, status: {pendingFulfillment: string, billed: string, pendingBilling: string, cancelled: string, closed: string, partiallyFulfilled: string, pendingApproval: string}}, entitystatus: {inProgress: number, awarded: number, processingIncorrectProject: number, pending: number, closed: number, notAwarded: number}, customRecord: {pcd: string, dw: string, kavel: string, accommodation: string, option: string, pca: string}, advancedIntercompanyJournal: {print: {excludedAccounts: number[]}}, procurementStatus: {toDo: number, onHoldByCRM: number, new: number, onHold: number, skipAlways: number, error: number, done: number, skipForNow: number}, terms: {notary: number}, kavel: {status: {new: number, sold: number, expired: number, licenseNA: number, reserved: number, available: number, notOwned: number, rentedOut: number, parkOwned: number, maintenance: number, ownExploitation: number, preSold: number}, defaultProjectFormOnCreate: number}, domain: string, salesProjects: number[], accommodation: {saleStatus: {sold: number, stock: number, ownExploitation: number}}, onHoldReason: {multipleAccommodations: number, differentAccommodationSoldAsAllowed: number, differentAccommodationSoldAsPlaced: number}, purchaseStatusScenario: {accommodationItemEqual: number, multipleAccommodationsActive: number, accommodationSoldNotAllowed: number, accommodationSoldAllowed: number, noAccommodation: number, accommodationItemNotEqual: number, generic: number}, customSuitelet: {showConfiguration: string[]}, crm: {mandatoryFieldsKavel: string[]}}}
         */
        const configuration = () => {
            let currentConfig;

            // Determine the current account
            const netSuiteAccountType = getNetSuiteAccountType();

            const configProduction =  {
                domain: 'app.netsuite.com',
                entitystatus: { // https://5858269.app.netsuite.com/app/common/otherlists/accountingotherlists.nl Project Status
                    closed: 1,
                    inProgress: 2,
                    pendingProjectClose: 3,
                    pendingOther: 4,
                    awarded: 5,
                    mistakeProject: 17,
                    wrongCustomerProject: 18,
                    processingIncorrectProject: 19
                },
                // https://5858269.app.netsuite.com/app/common/otherlists/accountingotherlists.nl Project Type
                salesProjects: [1, 3, 10, 11], // Sales (1), Resale (3), Basic (10), Stock (11)
                parkProjects: [5], // Kavel Project (5)
                roles: {
                    afterSalesManager: [1045, 1099],
                    euroParcsRevenueManager: [1107],
                    euroParcsLivingArDebiteurenAdministratie: [1095],
                    bouwplanning: [1130]
                },
                classes: {
                    // See https://system.netsuite.com/app/common/otherlists/classlist.nl?whence=
                    accommodations: [23, 24, 68, 69, 70 ],
                    bouwplanning: [23, 68],
                    intangibleOptions: [74],
                    tangibleOptions: [22, 71, 72],
                    lots: [25, 73]
                },
                procurementStatus: {
                    // See https://system.netsuite.com/app/common/custom/custlist.nl?id=1057&e=T&ord=T
                    new: 1,
                    toDo: 2,
                    done: 3,
                    skipForNow: 4,
                    skipAlways: 5,
                    onHoldByCRM: 6,
                    onHold: 7,
                    error: 8,
                    validate: 9,
                    preobtop: 10,
                    postpone: 11
                },
                onHoldReason: {
                    // See https://system.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1073
                    differentAccommodationSoldAsPlaced: 1,
                    differentAccommodationSoldAsAllowed: 2,
                    multipleAccommodations: 3
                },
                purchaseStatusScenario: {
                    multipleAccommodationsActive: 1,
                    accommodationItemNotEqual: 2,
                    accommodationSoldNotAllowed: 3,
                    accommodationSoldAllowed: 4,
                    accommodationItemEqual: 5,
                    noAccommodation: 6,
                    generic: 7,
                    resalesProject: 8,
                    preObtop: 9,
                },
                purchaseApprovalStatus: {
                    pendingApproval: 1,
                    approved: 2,
                    rejected: 3,
                },
                crm: {
                    mandatoryFieldsKavel: [
                        'custrecord_ep_kavel_nr_pms',
                        'custrecordcustrecord_ep_rental_sales_typ',
                        'cseg_erp_park',
                        'custrecord_ep_kavel_type',
                        'custrecord_ep_kadaster',
                        'custrecord_ep_kavel_owner',
                        'custrecordcustrecord_ep_sales_entity',
                        'custrecordcustrecord_ep_sales_entity_acc',
                        'custrecordcustrecord_ep_rental_entitiy',
                        'custrecord_groundlease_kavel_item'
                    ]
                },
                customRecord: {
                    kavel: 'customrecord_cseg_erp_property',
                    lotowner: 'customrecord_cus_ep_lot_owner',
                    accommodation: 'customrecord_ep_accommodation_details',
                    accommodationowner: 'customrecord_ep_acc_owner',
                    option: 'customrecord_acc_kavel_options',
                    dw: 'customrecord_ep_datawarehouse_so_info',
                    pca: 'customrecord_ep_project_cost_allocation',
                    pcd: 'customrecord_ep_project_cost_destination',
                    purchaseagreement: 'customrecord_ep_purchaseagreement',
                    logisticstasks: 'customrecord_ep_logisticstasks',
                    taskorder: 'customrecord_ep_logisticstaskorder',
                    aggregation: 'customrecord_ep_accommodationaggregation',
                    logisticsplanninghistory: 'customrecord_ep_planning_history',
                    seller: 'customrecord_ep_seller_list',
                    parkdevfile: 'customrecord_ep_parkdevelopmentfile'
                },
                purchaseOrder: {
                    form: {
                        logistics: 201,
                    }
                },
                accommodation: {
                    saleStatus: {
                        stock: 1,
                        sold: 2,
                        ownExploitation: 3
                    },
                    buildStatus: {
                        // unknown: 1,
                        ordered: 2,
                        productionplanned: 3,
                        productioncompleted: 4,
                        // transportplanned: 5,
                        //instock: 6,
                        temporarilyplaced: 7,
                        placed: 8,
                        preordered: 9,
                    },
                    transportStatus: {
                        notrequested: 1,
                        requested: 2,
                        confirmed: 3,
                        intransit: 5,
                        fulfilled: 4
                    },
                    status: {
                        inplanning: 1,
                        underconstruction: 2,
                        operational: 3,
                        undermaintenance: 4,
                        scrapped: 5,
                        pocancelled: 6,
                    },
                    logisticsTaskStatus: {
                        notplanned: 1,
                        planned: 2,
                        confirmed: 3,
                        started: 4,
                        completed: 5,
                    },
                    logisticsTaskOrder: {
                        production: 2,
                        transport: 3,
                        placement: 5,
                    },
                    location: {
                        none: 1,
                        builder: 2,
                        lot: 3,
                        temporarily: 4,
                    }
                },
                lot: {
                    soldRentStatus: {
                        sold: 1,
                        rentedOut: 2,
                    }
                },
                project: {
                    projecttemplates: {
                        parkdevelopmentkavelproject: 26744
                    },
                    jobtypes: {
                        reaprojects_sales: 1,
                        parkdevelopment: 2,
                        resale: 3,
                        refurbishments: 4,
                        parkdevelopment_locationproject: 13,
                        parkdevelopment_mainproject: 6,
                        parkdevelopment_subproject: 7,
                        reaprojects_basic: 10,
                        reaprojects_stock: 11,
                        mvaexplotatie: 12
                    },
                    statussalesproject: {
                        basic: 1,
                        stock: 2,
                        sales: 3
                    },
                    projectclass: {
                        // https://5858269.app.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1156 Project Class
                        it: 1,
                        development: 2,
                        sales: 3,
                        resales: 4,
                        exploitation: 5,
                        refurbishment: 6,
                        facility: 7,
                        operations: 8
                    },
                    approvalstatus: {
                        // EP Project Approval Status
                        pendingApproval: 1,
                        approved: 2,
                        rejected: 3,
                        open: 4
                    },
                    incorrectProjectReason: {
                        // https://5858269.app.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1677
                        saleCancelled: 1,
                        wrongCustomer: 2,
                        wrongLot: 3,
                        wrongVAT: 4,
                        other: 5,
                        noFinancing: 7,
                        wrongPrice: 9
                    }
                },
                salesorder: {
                    status: {
                        pendingApproval: 'A',
                        pendingFulfillment: 'B',
                        cancelled: 'C',
                        partiallyFulfilled: 'D',
                        pendingBilling: 'F',
                        billed: 'G',
                        closed: 'H'
                    },
                    customStatus: {
                        subjectToFinancing: '1',
                        reflectionPeriod: '2',
                        other: '3',
                        final: '4',
                        returnForCorrection: '5',
                        wrongSalesorder: '6',
                        cancellation: '7',
                        onHoldNotary: '8'
                    }
                },
                kavel: {
                    status: {
                        new: -1,
                        rentedOut: 1,
                        sold: 2,
                        ownExploitation: 3,
                        parkOwned: 4,
                        reserved: 5,
                        available: 6,
                        expired: 7,
                        licenseNA: 8,
                        maintenance: 9,
                        preSold: 10,
                        notOwned: 11
                    },
                    defaultProjectFormOnCreate: 222
                },
                advancedIntercompanyJournal : {
                    print : {
                        excludedAccounts: [
                            358,
                            378
                        ]
                    }
                },
                customSuitelet: {
                    showConfiguration: [
                        'budy.sutjijati@europarcs.nl',
                        'budy@sutjijati.nl'
                    ]
                },
                terms: {
                    notary: 4,
                }
            }

            // Since the sandbox 1 is a QA environment this environment is a clone of production
            const configSB1 = { ...configProduction };

            const configSB2 = { ...configProduction };

            const configSB3 =  {
                domain: 'app.netsuite.com',
                entitystatus: { // https://5858269.app.netsuite.com/app/common/otherlists/accountingotherlists.nl Project Status
                    closed: 1,
                    inProgress: 2,
                    pendingProjectClose: 3,
                    pendingOther: 4,
                    awarded: 5,
                    mistakeProject: 17,
                    wrongCustomerProject: 18,
                    processingIncorrectProject: 19
                },
                // https://5858269.app.netsuite.com/app/common/otherlists/accountingotherlists.nl Project Type
                salesProjects: [1, 3, 10, 11], // Sales (1), Resale (3), Basic (10), Stock (11)
                parkProjects: [5], // Kavel Project (5)
                roles: {
                    afterSalesManager: [1045, 1099],
                    euroParcsRevenueManager: [1107],
                    euroParcsLivingArDebiteurenAdministratie: [1095],
                    bouwplanning: [1130]
                },
                classes: {
                    // See https://system.netsuite.com/app/common/otherlists/classlist.nl?whence=
                    accommodations: [23, 24, 68, 69, 70 ],
                    bouwplanning: [23, 68],
                    intangibleOptions: [74],
                    tangibleOptions: [22, 71, 72],
                    lots: [25, 73]
                },
                procurementStatus: {
                    // See https://system.netsuite.com/app/common/custom/custlist.nl?id=1057&e=T&ord=T
                    new: 1,
                    toDo: 2,
                    done: 3,
                    skipForNow: 4,
                    skipAlways: 5,
                    onHoldByCRM: 6,
                    onHold: 7,
                    error: 8,
                    validate: 9,
                    preobtop: 10,
                    postpone: 11
                },
                onHoldReason: {
                    // See https://system.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1073
                    differentAccommodationSoldAsPlaced: 1,
                    differentAccommodationSoldAsAllowed: 2,
                    multipleAccommodations: 3
                },
                purchaseStatusScenario: {
                    multipleAccommodationsActive: 1,
                    accommodationItemNotEqual: 2,
                    accommodationSoldNotAllowed: 3,
                    accommodationSoldAllowed: 4,
                    accommodationItemEqual: 5,
                    noAccommodation: 6,
                    generic: 7,
                    resalesProject: 8,
                    preObtop: 9,
                },
                purchaseApprovalStatus: {
                    pendingApproval: 1,
                    approved: 2,
                    rejected: 3,
                },
                crm: {
                    mandatoryFieldsKavel: [
                        'custrecord_ep_kavel_nr_pms',
                        'custrecordcustrecord_ep_rental_sales_typ',
                        'cseg_erp_park',
                        'custrecord_ep_kavel_type',
                        'custrecord_ep_kadaster',
                        'custrecord_ep_kavel_owner',
                        'custrecordcustrecord_ep_sales_entity',
                        'custrecordcustrecord_ep_sales_entity_acc',
                        'custrecordcustrecord_ep_rental_entitiy',
                        'custrecord_groundlease_kavel_item'
                    ]
                },
                customRecord: {
                    kavel: 'customrecord_cseg_erp_property',
                    lotowner: 'customrecord_cus_ep_lot_owner',
                    accommodation: 'customrecord_ep_accommodation_details',
                    accommodationowner: 'customrecord_ep_acc_owner',
                    option: 'customrecord_acc_kavel_options',
                    dw: 'customrecord_ep_datawarehouse_so_info',
                    pca: 'customrecord_ep_project_cost_allocation',
                    pcd: 'customrecord_ep_project_cost_destination',
                    purchaseagreement: 'customrecord_ep_purchaseagreement',
                    logisticstasks: 'customrecord_ep_logisticstasks',
                    taskorder: 'customrecord_ep_logisticstaskorder',
                    aggregation: 'customrecord_ep_accommodationaggregation',
                    logisticsplanninghistory: 'customrecord_ep_planning_history',
                    seller: 'customrecord_ep_seller_list',
                    parkdevfile: 'customrecord_ep_parkdevelopmentfile'
                },
                purchaseOrder: {
                    form: {
                        logistics: 201,
                    }
                },
                accommodation: {
                    saleStatus: {
                        stock: 1,
                        sold: 2,
                        ownExploitation: 3
                    },
                    buildStatus: {
                        // unknown: 1,
                        ordered: 2,
                        productionplanned: 3,
                        productioncompleted: 4,
                        // transportplanned: 5,
                        //instock: 6,
                        temporarilyplaced: 7,
                        placed: 8,
                        preordered: 9,
                    },
                    transportStatus: {
                        notrequested: 1,
                        requested: 2,
                        confirmed: 3,
                        intransit: 5,
                        fulfilled: 4
                    },
                    status: {
                        inplanning: 1,
                        underconstruction: 2,
                        operational: 3,
                        undermaintenance: 4,
                        scrapped: 5,
                        pocancelled: 6,
                    },
                    logisticsTaskStatus: {
                        notplanned: 1,
                        planned: 2,
                        confirmed: 3,
                        started: 4,
                        completed: 5,
                    },
                    logisticsTaskOrder: {
                        production: 2,
                        transport: 3,
                        placement: 5,
                    },
                    location: {
                        none: 1,
                        builder: 2,
                        lot: 3,
                        temporarily: 4,
                    }
                },
                lot: {
                    soldRentStatus: {
                        sold: 1,
                        rentedOut: 2,
                    }
                },
                project: {
                    projecttemplates: {
                        parkdevelopmentkavelproject: 26744
                    },
                    jobtypes: {
                        reaprojects_sales: 1,
                        parkdevelopment: 2,
                        resale: 3,
                        refurbishments: 4,
                        parkdevelopment_locationproject: 13,
                        parkdevelopment_mainproject: 6,
                        parkdevelopment_subproject: 7,
                        reaprojects_basic: 10,
                        reaprojects_stock: 11,
                        mvaexplotatie: 12
                    },
                    statussalesproject: {
                        basic: 1,
                        stock: 2,
                        sales: 3
                    },
                    projectclass: {
                        // https://5858269.app.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1156 Project Class
                        it: 1,
                        development: 2,
                        sales: 3,
                        resales: 4,
                        exploitation: 5,
                        refurbishment: 6,
                        facility: 7,
                        operations: 8
                    },
                    approvalstatus: {
                        // EP Project Approval Status
                        pendingApproval: 1,
                        approved: 2,
                        rejected: 3,
                        open: 4
                    },
                    incorrectProjectReason: {
                        // https://5858269.app.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=1677
                        saleCancelled: 1,
                        wrongCustomer: 2,
                        wrongLot: 3,
                        wrongVAT: 4,
                        other: 5,
                        noFinancing: 7,
                        wrongPrice: 9
                    }
                },
                salesorder: {
                    status: {
                        pendingApproval: 'A',
                        pendingFulfillment: 'B',
                        cancelled: 'C',
                        partiallyFulfilled: 'D',
                        pendingBilling: 'F',
                        billed: 'G',
                        closed: 'H'
                    },
                    customStatus: {
                        subjectToFinancing: '1',
                        reflectionPeriod: '2',
                        other: '3',
                        final: '4',
                        returnForCorrection: '5',
                        wrongSalesorder: '6',
                        cancellation: '7',
                        onHoldNotary: '8'
                    }
                },
                kavel: {
                    status: {
                        new: -1,
                        rentedOut: 1,
                        sold: 2,
                        ownExploitation: 3,
                        parkOwned: 4,
                        reserved: 5,
                        available: 6,
                        expired: 7,
                        licenseNA: 8,
                        maintenance: 9,
                        preSold: 10,
                        notOwned: 11
                    },
                    defaultProjectFormOnCreate: 222
                },
                advancedIntercompanyJournal : {
                    print : {
                        excludedAccounts: [
                            358,
                            378
                        ]
                    }
                },
                customSuitelet: {
                    showConfiguration: [
                        'budy.sutjijati@europarcs.nl',
                        'budy@sutjijati.nl'
                    ]
                },
                terms: {
                    notary: 4,
                }
            }

            switch (netSuiteAccountType) {
                case ('SB1'):
                    currentConfig = configSB1;
                    break;
                case ('SB2'):
                    currentConfig = configSB2
                    break;
                case ('SB3'):
                    currentConfig = configSB3
                    break;
                case ('PRODUCTION'):
                    currentConfig = configProduction
                    break;
                default:
                    currentConfig = configProduction
            }

            // if (runtime.getCurrentScript().logLevel === 'DEBUG') {
            //     log.debug('configuration', currentConfig);
            // }

            return currentConfig;
        }
        
        const getConfigRecord = () => {
            try {
                const sqlQuery = `
                    SELECT
                        custrecord_ep_ec_accountid as id,
                        custrecord_ep_ec_accountid as "string_accommodation|accountid",
                        custrecord_ep_ec_accommodationsenable as "boolean_accommodation|enable",
                        custrecord_ep_ec_classesaccommodation as "array_accommodation|classes|accommodation",
                        custrecord_ep_ec_classesintangible as "array_accommodation|classes|intangible",
                        custrecord_ep_ec_classestangible as "array_accommodation|classes|tangible",
                        custrecord_ep_ec_classeslot as "array_accommodation|classes|lot",
                        custrecord_ep_ec_classeslogisticsplannin as "array_accommodation|classes|logisticsplanning",
                        custrecord_ep_ec_soldvalueupdatetrigger as "boolean_accommodation|soldvalueupdatetrigger",
                        custrecord_ep_ec_allowoptionwithoutcreat as "boolean_accommodation|optionwithoutaccommodation",
                        custrecord_ep_ec_itemtypeslogistplanning as "arraytext_accommodation|itemtypes|logisticsplanning",
                        custrecord_ep_ec_sc_enable as "boolean_salescommission|enable",
                        custrecord_ep_ec_sc_item as "number_salescommission|item",
                        custrecord_ep_ec_sc_department as "number_salescommission|department",
                        custrecord_ep_ec_sc_vendorbillform as "number_salescommission|customformbill",
                        custrecord_ep_ec_sc_vendorcreditform as "number_salescommission|customformcredit",
                        custrecord_ep_ec_sc_roles as "array_salescommission|roles",
                        custrecord_ep_ec_sc_users as "array_salescommission|users",
                        custrecord_ep_ec_ms_roles as "array_minimumscripting|roles",
                        custrecord_ep_ec_ms_subsidiaries as "array_minimumscripting|subsidiaries",
                        custrecord_ep_ec_cdp_roles as "array_project|createdoubleprojectroles",
                        custrecord_ep_ec_rpo_user as "array_purchaseorder|reopenpurchaseorder",
                        custrecord_ep_ec_sfp_pdfpurchasedept as "number_salesfrompark|pdfpurchasedept",
                        custrecord_ep_ec_sfp_itemfulfillmentform as "number_salesfrompark|itemfulfillmentform"
                    FROM
                        customrecord_ep_configuration
                    WHERE
                        custrecord_ep_ec_accountid = '${getCompanyInfo().accountId}'`;

                const queryResults = queryExecute(sqlQuery).records;

                // Create a new object based on the objConfig and use accountid as the object high level key, after that process every column as a key with the | sign as a separator for the subkey

                // The query results queryResults.records are structered as 
                // [
                //     {
                //          id: 123456,
                //          number_accommodation|accountid: '123456',
                //          boolean_accommodation|enable: T,
                //          array_accommodation|classes|accommodation: '23, 75',
                //          array_accommodation|classes|option: '24, 11, 22',
                //          array_accommodation|classes|lotowner: '25, 26'
                //     }
                // ]
                //
                // and will be converted to an object like this:
                // {
                //     '123456': {
                //         accommodation: {
                //         enable: true,
                //         classes: {
                //             accommodation: [23, 75],
                //             option: [24, 11, 22],
                //             lotowner: [25, 26]
                //         }
                //          },
                //          salescommision: {
                //              enable: true,
                //              item: 123,
                //              department: 456,
                //              customform: 789
                //          }
                //     }
                // }
                log.debug('getConfigRecord', queryResults);
                const convertedObj = convertConfigToObject(queryResults[0]);
                
                return convertedObj;
            } catch (e) {
                log.error('getConfigRecord', e);
                return null;
            }
        }

        const copyFieldValue = (ctx, sourceField, targetField) => {
            ctx.newRecord.setValue({fieldId: targetField, value: ctx.newRecord.getValue({fieldId: sourceField})});
        }
        
        const convertConfigToObject = (obj) => {
            const convertValue = (value, type) => {
                switch (type) {
                    case 'string':
                        return String(value);
                    case 'boolean':
                        return value === 'T';
                    case 'array':
                        return (value === null) ? [] : String(value).split(',').map(Number);
                    case 'arraytext':
                        return (value === null) ? [] : String(value).split(', ');
                    case 'number':
                        return Number(value);
                    default:
                        return value; // Return the value as is if the type is not recognized
                }
            };
        
            const newObject = {};
            const idValue = obj.id; // Extract the id value
            newObject[idValue] = {}; // Create a top-level key with the id value
        
            Object.keys(obj).forEach(key => {
                    if (key !== 'id') {
                    const parts = key.split('|');
                    const [type, firstPartName] = parts[0].split('_');
                    let currentLevel = newObject[idValue];
        
                    // Handle the first part separately
                    currentLevel[firstPartName] = currentLevel[firstPartName] || {};
                    currentLevel = currentLevel[firstPartName];
        
                    // Process the remaining parts
                    parts.slice(1).forEach((part, index) => {
                        if (index < parts.length - 2) {
                            currentLevel[part] = currentLevel[part] || {};
                            currentLevel = currentLevel[part];
                        } else {
                            // Handle the last part which contains the actual value
                            currentLevel[part] = convertValue(obj[key], type);
                    }
                });
                }
            });
        
            return newObject;
        };

        /**
         * Reuseable function which takes a payload object for executing SuiteQL queries
         */
        const queryExecute = (...args) => {

            const suiteQlQuery = args[0];
            const columns = args[1];
            const taskId = args[2];

            try {
                if (columns) {
                    let beginTime = new Date().getTime();

                    const resultIterator = query.runSuiteQLPaged({
                        query: suiteQlQuery,
                        pageSize: 5000
                    }).iterator();

                    const objData = [];

                    resultIterator.each(function(page) {
                        var pageIterator = page.value.data.iterator();
                        pageIterator.each(function(row) {
                            let x = {};
                            columns.forEach((field, index) => {
                                x[field] = row.value.getValue(index);
                            });

                            objData.push(x);
                            return true;
                        });
                        return true;
                    });

                    let elapsedTime = ( new Date().getTime() - beginTime ) ;

                    return  {
                        recordCount: objData.length,
                        records: objData,
                        elapsedTime: elapsedTime
                    }
                } else {
                    let moreRecords = true;
                    let records = new Array();
                    let beginTime = new Date().getTime();

                    do {
                        const queryResults = query.runSuiteQL( { query: suiteQlQuery } ).asMappedResults();
                        records = records.concat( queryResults );
                        if ( queryResults.length < 5000 ) { moreRecords = false; }
                    } while ( moreRecords );

                    let elapsedTime = ( new Date().getTime() - beginTime ) ;

                    if (records.length > 0 ) {

                        return  {
                            recordCount: records.length,
                            records: records,
                            elapsedTime: elapsedTime
                        }
                    }
                }
            } catch( e ) {
                log.error('queryExecute Error', {
                    taskId,
                    details: e
                });

                return e;
            }
        }

        const queryExecute2 = ({sQuery}) => {
            try {
                let moreRecords = true;
                let records = new Array();
                let paginatedRowBegin = 1;
                const paginatedRowEnd = 9999999;
                const nestedSQL = sQuery;
                let queryParams = new Array();
                let beginTime = new Date().getTime();

                do {
                    const paginatedSQL = 'SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM (' + nestedSQL + ' ) ) WHERE ( ROWNUMBER BETWEEN ' + paginatedRowBegin + ' AND ' + paginatedRowEnd + ')';

                    const queryResults = query.runSuiteQL( { query: paginatedSQL, params: queryParams } ).asMappedResults();

                    records = records.concat( queryResults );
                    // log.debug('queryResults length', queryResults.length);

                    if ( queryResults.length < 5000 ) { moreRecords = false; }

                    paginatedRowBegin = paginatedRowBegin + 5000;

                } while ( moreRecords );

                const elapsedTime = ( new Date().getTime() - beginTime ) ;

                return {
                    recordCount: records.length,
                    records: records,
                    elapsedTime: elapsedTime
                } || {}

            } catch( e ) {
                log.error( { title: 'queryExecute - Error', details: e.toString() } );
                records = null;
            }
        }

        /**
         * Returns the current netsuite domain name. Example: 5858269-sb3.app.netsuite.com/
         * @returns {*}
         */
        const getDomain = () => {
            return url.resolveDomain({
                hostType: url.HostType.APPLICATION,
                accountId: getCompanyInfo().accountId
            });
        }

        /**
         * Get the feature flags file and convert to an object
         * @returns {object}
         * @example
         * {
         *      ___comment: "This file contains the configuration for the feature flags. The name corresponds to the PBI https://dev.azure.com/EuroParcs/ERP/. The values are booleans and a missing value should be false by default",
         *      feature1: {
         *          SB1: false,
         *          SB2: false,
         *          SB3: true,
         *          PRODUCTION: false
         *     },
         *      feature2: {
         *          SB1: false,
         *          SB2: false,
         *          PRODUCTION: false
         *      },
         *      feature3: {
         *          SB1: false,
         *          SB2: false,
         *          SB3: false
         *      }
         * }
         */
        const getFeatureFlags = () => {
            try {
                const featureFlagsFile = file.load({
                    id: 'SuiteScripts/ep_obtop/feature_flags.json'
                });
                const featureFlags = JSON.parse(featureFlagsFile.getContents());

                // Get only attributes having a property matching the NetSuite account type
                const accountType = getNetSuiteAccountType();
                const filteredFeatureFlags = Object.keys(featureFlags)
                    .filter(key => typeof featureFlags[key] === 'object' && accountType in featureFlags[key])
                    .reduce((obj, key) => {
                        obj[key] = featureFlags[key][accountType];
                        return obj;
                    }, {});

                // log.debug(`filteredFeatureFlags`, filteredFeatureFlags);
                return filteredFeatureFlags;
            } catch (error) {
                log.error('Error parsing feature flags file', error);
                return [];
            }
        }

        /**
         * Return the default location from the subsidiary
         * @param {number} subsidiary - The subsidiary internal id
         * @returns {number} - The location internal id
         */
        const getDefaultLocationFromSubsidiary = (subsidiary) => {
            const strQuery = `SELECT custrecord_default_location
                                FROM subsidiary
                                WHERE id = ${subsidiary}`;
            const objQueryResult = queryExecute(strQuery);

            return objQueryResult && objQueryResult.recordCount > 0 ? objQueryResult.records[0].custrecord_default_location : false;
        }

        /**
         * Returns the inventory location matching the subsidiary and park name
         * @param subsidiary
         * @param parkName
         * @returns {boolean|*}
         */
        const getLocationBySubsidiaryAndParkName = (subsidiary, parkName) => {
            const strQuery = `SELECT l.id
                                FROM location l, subsidiary s, LocationSubsidiaryMap ls
                                WHERE l.id = ls.location
                                AND ls.subsidiary = s.id
                                AND l.name like '%${parkName}%'
                                AND s.id = ${subsidiary}`;
            const objQueryResult = queryExecute(strQuery);

            return objQueryResult && objQueryResult.recordCount > 0 ? objQueryResult.records[0].id : false;
        }

        const getQueryString = (url) => {
            // See https://jsfiddle.net/budysutjijati/bn50oa24/35/
            if(url.indexOf("?") >= 0){
                const queryString = url.split('?')[1];
                const arr = queryString.split('&');
                const obj = {};

                for (let i = 0; i < arr.length; i++) {
                    obj[arr[i].split('=')[0]] = arr[i].split('=')[1]
                }
                return obj;
            }
        }

        const getCompanyInfo = () => {
            return {
                accountId: runtime.accountId
            };
        }

        const getCompanyPref = () => {
            const objCompanyPref = config.load({
                type: config.Type.COMPANY_PREFERENCES,
                isDynamic: true
            });

            return {
                dateformat: objCompanyPref.getValue({fieldId: 'DATEFORMAT'}),
                timeformat: objCompanyPref.getValue({fieldId: 'TIMEFORMAT'})
            }
        }

        /**
         * Creates an API message custom record
         * @param {object} objDebug - object
         * @param {string} objDebug.custrecord_ep_dl_description -  The title for the debug message
         * @param {string} objDebug.custrecord_ep_dl_log - The contents of the debug message
         */
        const createDebugMessage = (objDebug) =>{

            const objRecord = record.create({
                type: 'customrecord_ep_debug_log',
                isDynamic: true
            });

            objRecord.setValue({
                fieldId: 'custrecord_ep_dl_description',
                value: objDebug.custrecord_ep_dl_description
            });

            objRecord.setValue({
                fieldId: 'custrecord_ep_dl_user',
                value: JSON.stringify(runtime.getCurrentUser())
            });

            objRecord.setValue({
                fieldId: 'custrecord_ep_dl_log',
                value: objDebug.custrecord_ep_dl_log
            });

            objRecord.setValue({
                fieldId: 'custrecord_ep_dl_scriptid',
                value: runtime.getCurrentScript().id
            });

            const id = objRecord.save({
                enableSourcing: false,
                ignoreMandatoryFields: false
            });



            // https://5858269-sb3.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=1045&id=3910888

            if (id){

                const intRecordType = getRecordTypeData({scriptid: 'customrecord_ep_debug_log'}).internalid;
                const url = `https://${getDomain()}/app/common/custom/custrecordentry.nl?rectype=${intRecordType}&id=${id}`;
                return url;
            }
        }

        /**
         * Get the record type meta data such as the internal id via the scriptid
         */
        const getRecordTypeData = ({scriptid}) => {

            scriptid = scriptid.toUpperCase();

            const strQuery = `SELECT * FROM customrecordtype WHERE scriptid = '${scriptid}'`;
            const objQueryResult = queryExecute(strQuery);

            return objQueryResult && objQueryResult.recordCount > 0 ? objQueryResult.records[0] : false;
        }

        /**
         * Check object equality
         * See https://www.30secondsofcode.org/js/s/equals
         * @param a
         * @param b
         * @returns {boolean|this is string[]}
         */
        const objectIsEqual = (a, b) => {
            if (a === b) return true;

            if (a instanceof Date && b instanceof Date)
                return a.getTime() === b.getTime();

            if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
                return a === b;

            if (a.prototype !== b.prototype) return false;

            const keys = Object.keys(a);
            if (keys.length !== Object.keys(b).length) return false;

            return keys.every(k => objectIsEqual(a[k], b[k]));
        };

        /**
         * Generic function which checks if a date (object) field was changed
         * @param ctx
         * @param fieldId
         * @returns {boolean}
         */
        const isDateFieldChanged = (ctx, fieldId) => {
            // When field is not empty and the old value <> new value return true else false

            let oldVal = ctx.oldRecord.getValue({fieldId: fieldId});
            let newVal = ctx.newRecord.getValue({fieldId: fieldId});

            // Set a default date when either the old- or newRecord field has no data.
            // This way we can easily use the getTime method to compare the date objects since
            // objects are never equal
            oldVal =  oldVal ? oldVal : new Date('1984-05-04');
            newVal = newVal ? newVal: new Date('1984-05-04');

            if (oldVal !== newVal) {
                return oldVal.getTime() !== newVal.getTime();
            } else {
                return false;
            }
        }

        /**
         * Check if the feature flag is enabled for the giving feature
         * @param featureFlags - object
         * @param feature - string
         * @returns {boolean}
         */
        const isFeatureFlagEnabled = (featureFlags, feature) => {
            return featureFlags[feature] === true;
        }

        /**
         * Generic function which checks if a field was changed
         * @param ctx
         * @param fieldId
         * @returns {boolean}
         */
        const isFieldChanged = (ctx, fieldId) => {
            let oldVal = ctx.oldRecord.getValue({fieldId: fieldId});
            let newVal = ctx.newRecord.getValue({fieldId: fieldId});

            return oldVal !== newVal ? true : false
        }

        /**
         * Return the current account type
         * @returns {string|*}
         */
        const getNetSuiteAccountType = () => {
            const accountId = getCompanyInfo().accountId
            let account;
            switch(true) {
                case (accountId.indexOf('_SB1') > -1):
                    account = 'SB1';
                    break;
                case (accountId.indexOf('_SB2') > -1):
                    account = 'SB2';
                    break;
                case (accountId.indexOf('_SB3') > -1):
                    account = ('SB3');
                    break;
                case (accountId.indexOf('_RP') > -1):
                    account = ('PRODUCTION'); // We treat the release preview account as a production environment
                    break;
                default:
                    account ='PRODUCTION';
            }

            return account;
        }

        const getCurrentScript = (ctx) => {
            return runtime.getCurrentScript();
        }


        /**
         * Returns the script type
         */
        const getScriptType = () => {
            return {
                USER_EVENT: 'USER_EVENT',
                SUITELET: 'SUITELET',
                CLIENT: 'CLIENT',
                MAP_REDUCE: 'MAP_REDUCE',
                SCHEDULED: 'SCHEDULED',
                MASS_UPDATE: 'MASS_UPDATE',
                CSV_IMPORT: 'CSV_IMPORT'
            }
        }

        /**
         * Returns the record type
         */
        const getRecordType = () => {
            return {
                ALLOCATION_SCHEDULE: 'ALLOCATION_SCHEDULE',
                AMORTIZATION_SCHEDULE: 'AMORTIZATION_SCHEDULE',
                AMORTIZATION_TEMPLATE: 'AMORTIZATION_TEMPLATE',
                AS_CHARGED_PROJECT_REVENUE_RULE: 'AS_CHARGED_PROJECT_REVENUE_RULE',
                ASSEMBLY_BUILD: 'ASSEMBLY_BUILD',
                ASSEMBLY_ITEM: 'ASSEMBLY_ITEM',
                ASSEMBLY_UNBUILD: 'ASSEMBLY_UNBUILD',
                BALANCE_TRX_BY_SEGMENTS: 'BALANCE_TRX_BY_SEGMENTS',
                BILLING_ACCOUNT: 'BILLING_ACCOUNT',
                BILLING_CLASS: 'BILLING_CLASS',
                BILLING_RATE_CARD: 'BILLING_RATE_CARD',
                BILLING_REVENUE_EVENT: 'BILLING_REVENUE_EVENT',
                BILLING_SCHEDULE: 'BILLING_SCHEDULE',
                BIN: 'BIN',
                BIN_TRANSFER: 'BIN_TRANSFER',
                BIN_WORKSHEET: 'BIN_WORKSHEET',
                BLANKET_PURCHASE_ORDER: 'BLANKET_PURCHASE_ORDER',
                BOM: 'BOM',
                BOM_REVISION: 'BOM_REVISION',
                BONUS: 'BONUS',
                BONUS_TYPE: 'BONUS_TYPE',
                BUDGET_EXCHANGE_RATE: 'BUDGET_EXCHANGE_RATE',
                BULK_OWNERSHIP_TRANSFER: 'BULK_OWNERSHIP_TRANSFER',
                BUNDLE_INSTALLATION_SCRIPT: 'BUNDLE_INSTALLATION_SCRIPT',
                CALENDAR_EVENT: 'CALENDAR_EVENT',
                CAMPAIGN: 'CAMPAIGN',
                CAMPAIGN_RESPONSE: 'CAMPAIGN_RESPONSE',
                CAMPAIGN_TEMPLATE: 'CAMPAIGN_TEMPLATE',
                CASH_REFUND: 'CASH_REFUND',
                CASH_SALE: 'CASH_SALE',
                CHARGE: 'CHARGE',
                CHARGE_RULE: 'CHARGE_RULE',
                CHECK: 'CHECK',
                CLASSIFICATION: 'CLASSIFICATION',
                CLIENT_SCRIPT: 'CLIENT_SCRIPT',
                CMS_CONTENT: 'CMS_CONTENT',
                CMS_CONTENT_TYPE: 'CMS_CONTENT_TYPE',
                CMS_PAGE: 'CMS_PAGE',
                COMMERCE_CATEGORY: 'COMMERCE_CATEGORY',
                COMPETITOR: 'COMPETITOR',
                CONSOLIDATED_EXCHANGE_RATE: 'CONSOLIDATED_EXCHANGE_RATE',
                CONTACT: 'CONTACT',
                CONTACT_CATEGORY: 'CONTACT_CATEGORY',
                CONTACT_ROLE: 'CONTACT_ROLE',
                COST_CATEGORY: 'COST_CATEGORY',
                COUPON_CODE: 'COUPON_CODE',
                CREDIT_CARD_CHARGE: 'CREDIT_CARD_CHARGE',
                CREDIT_CARD_REFUND: 'CREDIT_CARD_REFUND',
                CREDIT_MEMO: 'CREDIT_MEMO',
                CURRENCY: 'CURRENCY',
                CUSTOM_PURCHASE: 'CUSTOM_PURCHASE',
                CUSTOMER: 'CUSTOMER',
                CUSTOMER_CATEGORY: 'CUSTOMER_CATEGORY',
                CUSTOMER_DEPOSIT: 'CUSTOMER_DEPOSIT',
                CUSTOMER_MESSAGE: 'CUSTOMER_MESSAGE',
                CUSTOMER_PAYMENT: 'CUSTOMER_PAYMENT',
                CUSTOMER_PAYMENT_AUTHORIZATION: 'CUSTOMER_PAYMENT_AUTHORIZATION',
                CUSTOM_RECORD: 'CUSTOM_RECORD',
                CUSTOMER_REFUND: 'CUSTOMER_REFUND',
                CUSTOMER_STATUS: 'CUSTOMER_STATUS',
                CUSTOMER_SUBSIDIARY_RELATIONSHIP: 'CUSTOMER_SUBSIDIARY_RELATIONSHIP',
                CUSTOM_TRANSACTION: 'CUSTOM_TRANSACTION',
                DEPARTMENT: 'DEPARTMENT',
                DEPOSIT: 'DEPOSIT',
                DEPOSIT_APPLICATION: 'DEPOSIT_APPLICATION',
                DESCRIPTION_ITEM: 'DESCRIPTION_ITEM',
                DISCOUNT_ITEM: 'DISCOUNT_ITEM',
                DOWNLOAD_ITEM: 'DOWNLOAD_ITEM',
                EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
                EMPLOYEE: 'EMPLOYEE',
                EMPLOYEE_CHANGE_REQUEST: 'EMPLOYEE_CHANGE_REQUEST',
                EMPLOYEE_CHANGE_TYPE: 'EMPLOYEE_CHANGE_TYPE',
                ENTITY_ACCOUNT_MAPPING: 'ENTITY_ACCOUNT_MAPPING',
                ESTIMATE: 'ESTIMATE',
                EXPENSE_AMORTIZATION_EVENT: 'EXPENSE_AMORTIZATION_EVENT',
                EXPENSE_CATEGORY: 'EXPENSE_CATEGORY',
                EXPENSE_PLAN: 'EXPENSE_PLAN',
                EXPENSE_REPORT: 'EXPENSE_REPORT',
                FAIR_VALUE_PRICE: 'FAIR_VALUE_PRICE',
                FINANCIAL_INSTITUTION: 'FINANCIAL_INSTITUTION',
                FIXED_AMOUNT_PROJECT_REVENUE_RULE: 'FIXED_AMOUNT_PROJECT_REVENUE_RULE',
                FOLDER: 'FOLDER',
                FULFILLMENT_REQUEST: 'FULFILLMENT_REQUEST',
                GENERAL_TOKEN: 'GENERAL_TOKEN',
                GENERIC_RESOURCE: 'GENERIC_RESOURCE',
                GIFT_CERTIFICATE: 'GIFT_CERTIFICATE',
                GIFT_CERTIFICATE_ITEM: 'GIFT_CERTIFICATE_ITEM',
                GLOBAL_ACCOUNT_MAPPING: 'GLOBAL_ACCOUNT_MAPPING',
                GLOBAL_INVENTORY_RELATIONSHIP: 'GLOBAL_INVENTORY_RELATIONSHIP',
                GL_NUMBERING_SEQUENCE: 'GL_NUMBERING_SEQUENCE',
                GOAL: 'GOAL',
                INBOUND_SHIPMENT: 'INBOUND_SHIPMENT',
                INTERCOMP_ALLOCATION_SCHEDULE: 'INTERCOMP_ALLOCATION_SCHEDULE',
                INTER_COMPANY_JOURNAL_ENTRY: 'INTER_COMPANY_JOURNAL_ENTRY',
                INTER_COMPANY_TRANSFER_ORDER: 'INTER_COMPANY_TRANSFER_ORDER',
                INVENTORY_ADJUSTMENT: 'INVENTORY_ADJUSTMENT',
                INVENTORY_COST_REVALUATION: 'INVENTORY_COST_REVALUATION',
                INVENTORY_COUNT: 'INVENTORY_COUNT',
                INVENTORY_DETAIL: 'INVENTORY_DETAIL',
                INVENTORY_ITEM: 'INVENTORY_ITEM',
                INVENTORY_NUMBER: 'INVENTORY_NUMBER',
                INVENTORY_STATUS: 'INVENTORY_STATUS',
                INVENTORY_STATUS_CHANGE: 'INVENTORY_STATUS_CHANGE',
                INVENTORY_TRANSFER: 'INVENTORY_TRANSFER',
                INVOICE: 'INVOICE',
                ISSUE: 'ISSUE',
                ISSUE_PRODUCT: 'ISSUE_PRODUCT',
                ISSUE_PRODUCT_VERSION: 'ISSUE_PRODUCT_VERSION',
                ITEM_ACCOUNT_MAPPING: 'ITEM_ACCOUNT_MAPPING',
                ITEM_COLLECTION: 'ITEM_COLLECTION',
                ITEM_COLLECTION_ITEM_MAP: 'ITEM_COLLECTION_ITEM_MAP',
                ITEM_DEMAND_PLAN: 'ITEM_DEMAND_PLAN',
                ITEM_FULFILLMENT: 'ITEM_FULFILLMENT',
                ITEM_GROUP: 'ITEM_GROUP',
                ITEM_LOCATION_CONFIGURATION: 'ITEM_LOCATION_CONFIGURATION',
                ITEM_PROCESS_FAMILY: 'ITEM_PROCESS_FAMILY',
                ITEM_PROCESS_GROUP: 'ITEM_PROCESS_GROUP',
                ITEM_RECEIPT: 'ITEM_RECEIPT',
                ITEM_REVISION: 'ITEM_REVISION',
                ITEM_SUPPLY_PLAN: 'ITEM_SUPPLY_PLAN',
                JOB: 'JOB',
                JOB_STATUS: 'JOB_STATUS',
                JOB_TYPE: 'JOB_TYPE',
                JOURNAL_ENTRY: 'JOURNAL_ENTRY',
                KIT_ITEM: 'KIT_ITEM',
                LABOR_BASED_PROJECT_REVENUE_RULE: 'LABOR_ BASED_PROJECT_REVENUE_RULE',
                LEAD: 'LEAD',
                LOCATION: 'LOCATION',
                LOT_NUMBERED_ASSEMBLY_ITEM: 'LOT_NUMBERED_ASSEMBLY_ITEM',
                LOT_NUMBERED_INVENTORY_ITEM: 'LOT_NUMBERED_INVENTORY_ITEM',
                MANUFACTURING_COST_TEMPLATE: 'MANUFACTURING_COST_TEMPLATE',
                MANUFACTURING_OPERATION_TASK: 'MANUFACTURING_OPERATION_TASK',
                MANUFACTURING_ROUTING: 'MANUFACTURING_ROUTING',
                MAP_REDUCE_SCRIPT: 'MAP_REDUCE_SCRIPT',
                MARKUP_ITEM: 'MARKUP_ITEM',
                MASSUPDATE_SCRIPT: 'MASSUPDATE_SCRIPT',
                MEM_DOC: 'MEM_DOC',
                MERCHANDISE_HIERARCHY_LEVEL: 'MERCHANDISE_HIERARCHY_LEVEL',
                MERCHANDISE_HIERARCHY_NODE: 'MERCHANDISE_HIERARCHY_NODE',
                MERCHANDISE_HIERARCHY_VERSION: 'MERCHANDISE_HIERARCHY_VERSION',
                MESSAGE: 'MESSAGE',
                MFG_PLANNED_TIME: 'MFG_PLANNED_TIME',
                NEXUS: 'NEXUS',
                NON_INVENTORY_ITEM: 'NON_INVENTORY_ITEM',
                NOTE: 'NOTE',
                NOTE_TYPE: 'NOTE_TYPE',
                OPPORTUNITY: 'OPPORTUNITY',
                ORDER_SCHEDULE: 'ORDER_SCHEDULE',
                OTHER_CHARGE_ITEM: 'OTHER_CHARGE_ITEM',
                OTHER_NAME: 'OTHER_NAME',
                OTHER_NAME_CATEGORY: 'OTHER_NAME_CATEGORY',
                PARTNER: 'PARTNER',
                PARTNER_CATEGORY: 'PARTNER_CATEGORY',
                PARTNER_COMMISSION_PLAN: 'PARTNER_COMMISSION_PLAN',
                PAYCHECK: 'PAYCHECK',
                PAYCHECK_JOURNAL: 'PAYCHECK_JOURNAL',
                PAYMENT_CARD: 'PAYMENT_CARD',
                PAYMENT_CARD_TOKEN: 'PAYMENT_CARD_TOKEN',
                PAYMENT_ITEM: 'PAYMENT_ITEM',
                PAYMENT_METHOD: 'PAYMENT_METHOD',
                PAYROLL_ITEM: 'PAYROLL_ITEM',
                PCT_COMPLETE_PROJECT_REVENUE_RULE: 'PCT_COMPLETE_PROJECT_REVENUE_RULE',
                PERFORMANCE_METRIC: 'PERFORMANCE_METRIC',
                PERFORMANCE_REVIEW: 'PERFORMANCE_REVIEW',
                PERFORMANCE_REVIEW_SCHEDULE: 'PERFORMANCE_REVIEW_SCHEDULE',
                PERIOD_END_JOURNAL: 'PERIOD_END_JOURNAL',
                PHONE_CALLPHONE_CALL: 'PHONE_CALLPHONE_CALL',
                PORTLET: 'PORTLET',
                PRICE_BOOK: 'PRICE_BOOK',
                PRICE_LEVEL: 'PRICE_LEVEL',
                PRICE_PLAN: 'PRICE_PLAN',
                PRICING_GROUP: 'PRICING_GROUP',
                PROJECT_EXPENSE_TYPE: 'PROJECT_EXPENSE_TYPE',
                PROJECT_TASK: 'PROJECT_TASK',
                PROJECT_TEMPLATE: 'PROJECT_TEMPLATE',
                PROMOTION_CODE: 'PROMOTION_CODE',
                PROSPECT: 'PROSPECT',
                PURCHASE_CONTRACT: 'PURCHASE_CONTRACT',
                PURCHASE_ORDER: 'PURCHASE_ORDER',
                PURCHASE_REQUISITION: 'PURCHASE_REQUISITION',
                REALLOCATE_ITEM: 'REALLOCATE_ITEM',
                RECEIVE_INBOUND_SHIPMENT: 'RECEIVE_INBOUND_SHIPMENT',
                RESOURCE_ALLOCATION: 'RESOURCE_ALLOCATION',
                RESTLET: 'RESTLET',
                RETURN_AUTHORIZATION: 'RETURN_AUTHORIZATION',
                REVENUE_ARRANGEMENT: 'REVENUE_ARRANGEMENT',
                REVENUE_COMMITMENT: 'REVENUE_COMMITMENT',
                REVENUE_COMMITMENT_REVERSAL: 'REVENUE_COMMITMENT_REVERSAL',
                REVENUE_PLAN: 'REVENUE_PLAN',
                REV_REC_SCHEDULE: 'REV_REC_SCHEDULE',
                REV_REC_TEMPLATE: 'REV_REC_TEMPLATE',
                SALES_ORDER: 'SALES_ORDER',
                SALES_ROLE: 'SALES_ROLE',
                SALES_TAX_ITEM: 'SALES_TAX_ITEM',
                SCHEDULED_SCRIPT: 'SCHEDULED_SCRIPT',
                SCHEDULED_SCRIPT_INSTANCE: 'SCHEDULED_SCRIPT_INSTANCE',
                SCRIPT_DEPLOYMENT: 'SCRIPT_DEPLOYMENT',
                SERIALIZED_ASSEMBLY_ITEM: 'SERIALIZED_ASSEMBLY_ITEM',
                SERIALIZED_INVENTORY_ITEM: 'SERIALIZED_INVENTORY_ITEM',
                SERVICE_ITEM: 'SERVICE_ITEM',
                SHIP_ITEM: 'SHIP_ITEM',
                SOLUTION: 'SOLUTION',
                STATISTICAL_JOURNAL_ENTRY: 'STATISTICAL_JOURNAL_ENTRY',
                STORE_PICKUP_FULFILLMENT: 'STORE_PICKUP_FULFILLMENT',
                SUBSCRIPTION: 'SUBSCRIPTION',
                SUBSCRIPTION_CHANGE_ORDER: 'SUBSCRIPTION_CHANGE_ORDER',
                SUBSCRIPTION_LINE: 'SUBSCRIPTION_LINE',
                SUBSCRIPTION_PLAN: 'SUBSCRIPTION_PLAN',
                SUBSIDIARY: 'SUBSIDIARY',
                SUBSIDIARY_SETTINGS: 'SUBSIDIARY_SETTINGS',
                SUBTOTAL_ITEM: 'SUBTOTAL_ITEM',
                SUITELET: 'SUITELET',
                SUPPLY_CHAIN_SNAPSHOT: 'SUPPLY_CHAIN_SNAPSHOT',
                SUPPLY_CHAIN_SNAPSHOT_SIMULATION: 'SUPPLY_CHAIN_SNAPSHOT_SIMULATION',
                SUPPORT_CASE: 'SUPPORT_CASE',
                TASK: 'TASK',
                TAX_ACCT: 'TAX_ACCT',
                TAX_GROUP: 'TAX_GROUP',
                TAX_PERIOD: 'TAX_PERIOD',
                TAX_TYPE: 'TAX_TYPE',
                TERM: 'TERM',
                TIME_BILL: 'TIME_BILL',
                TIME_ENTRY: 'TIME_ENTRY',
                TIME_OFF_CHANGE: 'TIME_OFF_CHANGE',
                TIME_OFF_PLAN: 'TIME_OFF_PLAN',
                TIME_OFF_REQUEST: 'TIME_OFF_REQUEST',
                TIME_OFF_RULE: 'TIME_OFF_RULE',
                TIME_OFF_TYPE: 'TIME_OFF_TYPE',
                TIME_SHEET: 'TIME_SHEET',
                TOPIC: 'TOPIC',
                TRANSFER_ORDER: 'TRANSFER_ORDER',
                UNITS_TYPE: 'UNITS_TYPE',
                UNLOCKED_TIME_PERIOD: 'UNLOCKED_TIME_PERIOD',
                USAGE: 'USAGE',
                USEREVENT_SCRIPT: 'USEREVENT_SCRIPT',
                VENDOR: 'VENDOR',
                VENDOR_BILL: 'VENDOR_BILL',
                VENDOR_CATEGORY: 'VENDOR_CATEGORY',
                VENDOR_CREDIT: 'VENDOR_CREDIT',
                VENDOR_PAYMENT: 'VENDOR_PAYMENT',
                VENDOR_PREPAYMENT: 'VENDOR_PREPAYMENT',
                VENDOR_PREPAYMENT_APPLICATION: 'VENDOR_PREPAYMENT_APPLICATION',
                VENDOR_RETURN_AUTHORIZATION: 'VENDOR_RETURN_AUTHORIZATION',
                VENDOR_SUBSIDIARY_RELATIONSHIP: 'VENDOR_SUBSIDIARY_RELATIONSHIP',
                WAVE: 'WAVE',
                WBS: 'WBS',
                WEBSITE: 'WEBSITE',
                WORKFLOW_ACTION_SCRIPT: 'WORKFLOW_ACTION_SCRIPT',
                WORK_ORDER: 'WORK_ORDER',
                WORK_ORDER_CLOSE: 'WORK_ORDER_CLOSE',
                WORK_ORDER_COMPLETIONWORK_ORDER_COMPLETION: 'WORK_ORDER_COMPLETIONWORK_ORDER_COMPLETION'
            }

        }

        /**
         * Return the record type enum based on the SuiteQL record type output.
         * @returns {{VendCred: string, Journal: string, SalesOrd: string, PurchOrd: string, VendBill: string, CustInvc: string}}
         */
        const getRecordTypeFromAbbreviation = () => {
            return {
                SalesOrd: 'SALES_ORDER',
                PurchOrd: 'PURCHASE_ORDER',
                VendBill: 'VENDOR_BILL',
                VendCred: 'VENDOR_CREDIT',
                CustInvc: 'INVOICE',
                Journal: 'JOURNAL_ENTRY',
                Job: 'JOB',
                JobOnly: 'JOB',
                ItemRcpt: 'ITEM_RECEIPT'
            }
        };

        /**
         *
         * @type {recordCRUD}
         * @param {object} ctx - Context.
         * @param {string} id - Internal id.
         * @param {string} action - CRUD.
         * @param {string} recordType - Record Type.
         * @param {object} objRecordData - Payload.
         */
        const recordCRUD = ( (ctx, internalid, action, recordType, objRecordData) => {
            try {

                // Below is an example of the objRecordData structure
                const objRecordDataExample = [
                    {
                        "lineid": 2,
                        "fields": [
                            {
                                "custcol_ep_bp_procurement_status": 2,
                                "custcol_ep_so_line_on_hold_reason": 3
                            }
                        ]
                    },
                    {
                        "lineid": 3,
                        "fields": [
                            {
                                "custcol_ep_bp_procurement_status": 2,
                                "custcol_ep_so_line_on_hold_reason": 3
                            }
                        ]
                    },
                    {
                        "lineid": 4,
                        "fields": [
                            {
                                "custcol_ep_bp_procurement_status": 2,
                                "custcol_ep_so_line_on_hold_reason": 3
                            }
                        ]
                    },
                    {
                        "lineid": 5,
                        "fields": [
                            {
                                "custcol_ep_bp_procurement_status": 1,
                                "custcol_ep_so_line_on_hold_reason": 3
                            }
                        ]
                    },
                    {
                        "lineid": 6,
                        "fields": [
                            {
                                "custcol_ep_bp_procurement_status": 1,
                                "custcol_ep_so_line_on_hold_reason": 3
                            }
                        ]
                    }
                ];

                const sublistId = 'item';

                if (action === 'update') {
                    const objRecord = record.load({
                        type: record.Type[recordType],
                        id: internalid,
                        isDynamic: true
                    });

                    objRecordData.forEach((line) => {

                        objRecord.selectLine({
                            sublistId: 'item',
                            line: objRecord.findSublistLineWithValue({
                                sublistId,
                                fieldId: 'line',
                                value: line.lineid
                            })
                        });

                        line.fields.forEach( (field)=> {
                            for(let prop in field){
                                objRecord.setCurrentSublistValue({
                                    sublistId,
                                    fieldId: prop,
                                    value: field[prop],
                                    ignoreFieldChange: true
                                });
                            }
                        });

                        objRecord.commitLine({
                            sublistId
                        });
                    });

                    const recordId = objRecord.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    log.debug('recordId', recordId);

                }
            } catch (e) {
                log.debug('recordCRUD error', e);
            }
        });

        const hideTab = (...args) => {
            const ctx = args[0];
            const fields = args[1];

            if (fields && fields.length > 0 ) {
                fields.every( (field) => {
                    ctx.form.getField(field).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN
                    });

                    return true;
                });
            }
        }

        const hideField = (...args) => {
            const ctx = args[0];
            const fields = args[1];

            if (fields && fields.length > 0 ) {
                fields.every( (field) => {
                    ctx.form.getField(field).updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN
                    });

                    return true;
                });
            }
        }

        /**
         * Generic function to set one or more (custom) body fields
         * @param obj
         */
        const updateRecord = (obj) => {
            const objRec = record.load({
                type: obj.recordType,
                id: obj.id,
                isDynamic: true
            });

            if (obj.bodyFields.length > 0 ){
                obj.bodyFields.forEach( (field) => {
                    for(let prop in field){
                        objRec.setValue({
                            fieldId: prop,
                            value: field[prop],
                            ignoreFieldChange: true
                        });
                    }
                });
            }

            log.debug('Line Fields', obj.lineFields);
            if (obj.lineFields) {
                if (Object.entries(obj.lineFields).length > 0 ){
                    for (const [lineNum, lineData] of Object.entries(obj.lineFields)) {
                        log.debug(`Each line ${lineNum}`, lineData);

                        lineData.forEach( (lineDetails) => {
                            objRec.selectLine({sublistId: lineDetails.sublistid, line: lineNum});
                            log.debug(`Each line details`, lineDetails);
                            objRec.setCurrentSublistValue({sublistId: lineDetails.sublistid, fieldId: lineDetails.fieldid, value: lineDetails.value, ignoreFieldChange: true});
                            objRec.commitLine({sublistId: lineDetails.sublistid});
                        });
                    };
                }
            }

            if (typeof(obj.saveRecord) === 'undefined' || obj.saveRecord === 1) {
                const strRecordId = objRec.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                if (strRecordId) {
                    log.debug(`${obj.recordType} updated with internal id`, strRecordId);
                }
            }
        }

        // Check for related transactions on a project
        const queryRelatedProjectTransactions = (jobs) => {
            const query = (`
                SELECT 
                    DISTINCT(transaction.abbrevtype),
                    job.id AS jobid,
                    transaction.tranid AS documentnumber,
                    job.jobtype AS jobtypeid,
                    BUILTIN.DF(job.jobtype) AS jobtype,
                    transaction.status AS statusid,
                    BUILTIN.DF(transaction.status) AS transactionstatus
                FROM job
                    INNER JOIN transactionline ON
                    (transactionline.entity = job.id)
                    INNER JOIN transaction ON
                    (transactionline.transaction = transaction.id)
                WHERE 
                    job.id IN (${jobs.join(',')})
                AND
                    jobtype in (${getSystemValue().intJobTypeSales}, 
                    ${getSystemValue().intJobTypeResale}, 
                    ${getSystemValue().intJobTypeBasic},
                    ${getSystemValue().intJobTypeStock})
            `);

            log.debug('queryRelatedProjectTransactions', query);

            return query;
        }

        /**
         * Check whether the kavel option must be upated to the kavel record to be synced to CRM
         * See https://europarcs.atlassian.net/browse/NS-46
         * @param ctx
         * @returns {boolean}
         */
        const mustSyncToCrm = (...args) => {
            const strLogLevel = getCurrentScript().logLevel;
            const ctx = args[0];
            const lotid = args[1];

            try {
                const nQl = (`
                    SELECT
                        lot.id AS kavel_id,
                        lot.custrecordep_crm_json AS JSON
                    FROM
                        customrecord_cseg_erp_property AS lot
                        INNER JOIN customrecord_cseg_erp_park AS park ON
                        park.id = lot.cseg_erp_park
                    WHERE
                        lot.id = ${lotid}
                    AND
                        park.custrecord_kavels_crm = 'T'
                `);

                const objQueryResult = queryExecute(nQl);

                if (strLogLevel === 'DEBUG') {
                    log.debug('mustSyncToCrm', {
                        lotid: lotid,
                        objQueryResult: objQueryResult || null
                    });
                }

                if (objQueryResult && objQueryResult.recordCount > 0) {
                    return objQueryResult.records[0];
                }

                return false;
            } catch (e) {
                log.debug('mustSyncToCrm error', e);
            }
        }

        /**
         * CRM Integration lot data. This function creates a JSON object which can be used
         * for Celigo to sync data with CRM
         * See https://europarcs.atlassian.net/browse/NS-46
         * @param ctx
         */
        const createKavelCRMData = (...args) => {
            try {
                const ctx = args[0];
                const lotId = args[1];
                const strLogLevel = getCurrentScript().logLevel;

                // Get lot data
                const queryLot = (`
                SELECT
                    lot.cseg_erp_park AS park_id,
                    BUILTIN.DF(lot.cseg_erp_park) AS park,
                    lot.id AS kavel_id,
                    lot.name AS kavel_name,
                    BUILTIN.DF(lot.custrecord_ep_kavel_nr_pms) AS kavel_pms,
                    lot.custrecord_ep_kavel_nr_pms AS kavel_pms_id,
                    lot.custrecord_ep_kavel_owner AS kavel_owner_id,
                    BUILTIN.DF(lot.custrecord_ep_kavel_owner) AS kavel_owner,
                    lot.custrecord_ep_kavel_type AS kavel_type_id,
                    BUILTIN.DF(lot.custrecord_ep_kavel_type) AS kavel_type,
                    lot.custrecordcustrecord_ep_sales_entity AS sales_entity_id,
                    BUILTIN.DF(lot.custrecordcustrecord_ep_sales_entity) AS sales_entity,
                    lot.custrecordcustrecord_ep_sales_entity_acc AS sales_entity_acc_id,
                    BUILTIN.DF(lot.custrecordcustrecord_ep_sales_entity_acc) AS sales_entity_acc,
                    lot.custrecordcustrecord_ep_rental_entitiy AS rental_entity_id,
                    BUILTIN.DF(lot.custrecordcustrecord_ep_rental_entitiy) AS rental_entity,
                    lot.custrecord_ep_kadaster AS kadaster_id,
                    lot.custrecordcustrecord_ep_rental_sales_typ AS rental_sales_type,
                    lot.custrecord_groundlease_kavel_item AS ground_lease_kavel_item_id,
                    BUILTIN.DF(lot.custrecord_groundlease_kavel_item) AS ground_lease_kavel_item,
                    lot.custrecord_sync_crm AS sync_crm,
                    lot.custrecord_last_sync_date_time AS last_sync,
                FROM
                    customrecord_cseg_erp_property AS lot
                LEFT JOIN customrecord_cseg_erp_park AS park ON
                    park.id = lot.cseg_erp_park
                WHERE
                    lot.id = ${lotId}
                AND
                    park.custrecord_kavels_crm = 'T'
            `);

                const queryAccommodation = (`
                SELECT
                    accommodation.id,
                    accommodation.custrecord_ep_id AS lot,
                    BUILTIN.DF(accommodation.custrecord_ep_number_acc) AS type,
                    accommodation.custrecord_ep_number_acc AS typeID,
                    BUILTIN.DF(accommodation.custrecord_ep_rental_type) AS rentaltype,
                    accommodation.custrecord_ep_rental_type AS rentaltypeid,
                    accommodation.custrecord_ep_owner_cust_new_acc AS owner_id,
                    BUILTIN.DF(accommodation.custrecord_ep_owner_cust_new_acc) AS owner,
                    customer.companyname AS companyname,
                    accommodation.custrecord_chasisnumber AS chassisnumber,
                    BUILTIN.DF(accommodation.custrecord_ep_acc_style) AS style,
                    accommodation.custrecord_ep_acc_style AS style_id
                FROM
                    customrecord_ep_accommodation_details AS accommodation
                LEFT JOIN customer ON
                    accommodation.custrecord_ep_owner_cust_new_acc = customer.id
                WHERE
                    accommodation.custrecord_ep_id = ${lotId}
                AND
                    accommodation.custrecord_primair_y_n = 'T'
                AND
                    accommodation.isinactive = 'F'
            `);

                const queryOption = (`
                SELECT
                    option.id,
                    BUILTIN.DF(option.custrecord_option_item) AS item,
                    option.custrecord_option_item AS itemid,
                    BUILTIN.DF(option.custrecord_acc_kavel) AS kavel,
                    option.custrecord_acc_kavel AS kavelid
                FROM
                    customrecord_acc_kavel_options AS option
                WHERE
                    option.custrecord_acc_kavel = ${lotId}
                AND
                    option.custrecord_ep_kavel_options_active = 'T'
                AND
                    option.isinactive = 'F'
            `);

                const objQueryResultLot = queryExecute(queryLot);
                const objQueryResultAccommodation = queryExecute(queryAccommodation, [
                    'id', 'lot', 'type', 'typeid', 'rentaltype', 'rentaltypeid', 'owner_id', 'owner', 'companyname', 'chassisnumber', 'style', 'style_id'
                ]);
                const objQueryResultOption = queryExecute(queryOption, [
                    'id', 'item', 'itemid', 'kavel', 'kavelid'
                ]);

                const kavel = {};
                let accommodation = [];
                let option = [];

                log.debug('objQueryResultLot', objQueryResultLot);

                // Generate kavel object
                if (objQueryResultLot && objQueryResultLot.recordCount > 0) {
                    const objLot = objQueryResultLot.records[0];

                    kavel.park = {
                        id: objLot.park_id,
                        value: objLot.park
                    };
                    kavel.id = objLot.kavel_id;
                    kavel.name = objLot.kavel_name;
                    kavel.type = {
                        id: objLot.kavel_type_id,
                        value: objLot.kavel_type
                    };
                    kavel.pms = {
                        id: objLot.kavel_pms_id,
                        value: objLot.kavel_pms,
                    }
                    kavel.owner = {
                        id: objLot.kavel_owner_id,
                        value: objLot.kavel_owner
                    };
                    kavel.sync = {
                        sync_crm: objLot.sync_crm,
                        last: objLot.last_sync
                    };
                    kavel.sales_entity = {
                        id: objLot.sales_entity_id,
                        value: objLot.sales_entity,
                    };
                    kavel.sales_entity_acc = {
                        id: objLot.sales_entity_acc_id,
                        value: objLot.sales_entity_acc,
                    };
                    kavel.rental_entity = {
                        id: objLot.rental_entity_id,
                        value: objLot.rental_entity,
                    };
                    kavel.kadaster_id = objLot.kadaster_id ? objLot.kadaster_id: null;
                    kavel.sales_type = getSalesType(objLot);
                    kavel.lock_type = getLockType(objLot);
                    kavel.ground_lease = getGroundLease(objLot);
                    kavel.vat_level = getVatLevel(objLot);
                }

                // Generate accommodation object
                if (objQueryResultAccommodation && objQueryResultAccommodation.recordCount > 0) {
                    objQueryResultAccommodation.records.forEach( (row) => {
                        accommodation.push({
                            id: row.id,
                            lotid: row.lot,
                            type: {
                                id: row.typeid,
                                value: row.type
                            },
                            rentaltype: {
                                id: row.rentaltypeid,
                                value: row.rentaltype
                            },
                            owner: {
                                id: row.owner_id,
                                value: row.owner,
                                name: row.companyname
                            },
                            chassisnumber: row.chassisnumber,
                            style: {
                                id: row.style_id,
                                value: row.style
                            }
                        })
                    });
                }

                if (objQueryResultOption && objQueryResultOption.recordCount > 0) {
                    objQueryResultOption.records.forEach( (row) => {
                        option.push({
                            id: row.id,
                            item: row.item,
                            itemid: row.itemid,
                            kavel: row.kavel,
                            kavelid: row.kavelid
                        });
                    });
                }

                const json = {
                    kavel,
                    accommodation,
                    option
                };

                if (json){
                    record.submitFields({
                        type: 'customrecord_cseg_erp_property',
                        id: lotId,
                        values: {
                            'custrecordep_crm_json': JSON.stringify(json)
                        },
                        options: {
                            enablesourcing: true,
                            ignoreMandatoryFields: true
                        }
                    });
                }

                if (strLogLevel === 'DEBUG') {
                    createDebugMessage({
                        custrecord_ep_dl_description: 'objQueryResult createKavelCRMData',
                        custrecord_ep_dl_log: JSON.stringify(json)
                    });
                }
            } catch (e) {
                log.debug('createKavelCRMData error', e);
            }
        }

        const getSalesType = (objLot) => {
            try {
                const salesType = objLot.rental_sales_type;
                let arrSalesType = [];
                const rental = ['1'];
                const sales = ['2']
                const rentalAndSales = ['1', '2'];

                if (salesType){
                    arrSalesType = salesType.split(',').map( (item) => item.trim());

                    if (arrSalesType.length > 0 && rentalAndSales.every(value => arrSalesType.includes(value))) {
                        return '';
                    } else if (arrSalesType.length > 0 && rental.every(value => arrSalesType.includes(value))) {
                        return 'Rental';
                    } else if (arrSalesType.length > 0 && sales.every(value => arrSalesType.includes(value))) {
                        return 'Sale';
                    } else {
                        return '';
                    }
                }

                return '';
            } catch (e) {
                log.debug('getSalesType error', e);
            }
        }

        const getLockType = (objLot) => {
            try {
                const salesType = objLot.rental_sales_type;
                let arrSalesType = [];
                const rental = ['1'];
                const sales = ['2']
                const rentalAndSales = ['1', '2'];

                if (salesType){
                    arrSalesType = salesType.split(',').map( (item) => item.trim());

                    if (arrSalesType.length > 0 && rentalAndSales.every(value => arrSalesType.includes(value))) {
                        return false;
                    } else if (arrSalesType.length > 0 && rental.every(value => arrSalesType.includes(value))) {
                        return true;
                    } else if (arrSalesType.length > 0 && sales.every(value => arrSalesType.includes(value))) {
                        return true;
                    } else {
                        return '';
                    }
                }

                return '';
            } catch (e) {
                log.debug('getSalesType error', e);
            }
        }

        const getGroundLease = (objLot) => {
            try {
                if (objLot.ground_lease_kavel_item) {
                    switch (objLot.ground_lease_kavel_item) {
                        case 'Kavel - Erfpacht':
                            return true;
                            break;
                        case 'Erfpacht - 30 jaar (yearly billing)':
                            return true;
                            break;
                        case 'Kavel':
                            return false;
                            break;
                        default:
                            return '';
                    }
                }
            } catch (e) {
                log.debug('getGroundLease error', e);
            }
        }

        /**
         * Get the VAT level
         * @param objLot
         * @returns {string}
         */
        const getVatLevel = (objLot) => {
            try {
                if (objLot.ground_lease_kavel_item) {
                    switch (objLot.ground_lease_kavel_item) {
                        case 'Standard':
                            return 'High';
                            break;
                        default:
                            return 'Low';
                    }
                }
            } catch (e) {
                log.debug('getVatLevel error', e);
            }
        }

        /**
         * Determine if a field was changed
         * @param ctx
         * @param objFields
         * @returns {*}
         */
        const hasChanged = (ctx, objFields) => {
            return objFields.filter( (field) => {
                return ctx.newRecord.getValue({fieldId: field}) !== ctx.oldRecord.getValue({fieldId: field});
            });
        }

        /**
         * Determine if mandatory fields were entered
         * @param objFields
         * @returns {{result: boolean, mandatoryFields, fieldsEmpty: *}}
         */
        const recordHasMandatoryFieldsEntered = (...args) => {
            const ctx = args[0];
            const type = args[1];
            const id = args[2];
            const columns = args[3];

            const objLookup = search.lookupFields({
                type: type,
                id: id,
                columns: columns
            });

            if (objLookup){
                const arr = [];
                for (let prop in objLookup) {
                    if (objLookup[prop] === '' || objLookup[prop].length === 0) {
                        arr.push(prop);
                    }
                }

                if (arr.length === 0 ){
                    return {
                        result: true,
                        mandatoryFields: columns
                    };
                } else{
                    return {
                        result: false,
                        fieldsEmpty: arr,
                        mandatoryFields: columns
                    };
                }
            }

        }

        /**
         * Determine if mandatory fields were entered
         * @param objFields
         * @returns {{result: boolean, mandatoryFields, fieldsEmpty: *}}
         */
        const currentRecordHasMandatoryFieldsEntered = (...args) => {
            const ctx = args[0];
            const objFields = args[1];

            if (objFields && objFields.length > 0) {
                const objResult = objFields.filter( (field) => {
                    return ctx.newRecord.getValue({fieldId: field}) === '' || ctx.newRecord.getValue({fieldId: field}) === null;
                });

                if (objResult.length > 0 ){
                    return {
                        result: false,
                        id: ctx.newRecord.getValue({fieldId: 'id'}),
                        type: ctx.newRecord.type,
                        fieldsEmpty: objResult,
                        mandatoryFields: objFields
                    };
                }
                return {
                    result: true,
                    id: ctx.newRecord.getValue({fieldId: 'id'}),
                    type: ctx.newRecord.type,
                    fieldsEmpty: [],
                    mandatoryFields: objFields
                };
            }
            return {
                result: false,
            }
        }

        /**
         * Enable the sync crm checkbox at Kavel record
         * @param connectedKavel
         */
        const setSyncCRM = (connectedKavel) => {
            log.debug('setSyncCRM connectedKavel', connectedKavel);

            record.submitFields({
                type: 'customrecord_cseg_erp_property',
                id: connectedKavel,
                values: {
                    custrecord_sync_crm: 'T'
                },
                enableSourcing: false,
                ignoreMandatoryFields: true
            });
        }

        /**
         * Disable the sync crm checkbox at Kavel record
         * @param connectedKavel
         */
        const unsetSyncCRM = (connectedKavel) => {

            log.debug('unsetSyncCRM connectedKavel', connectedKavel);

            record.submitFields({
                type: 'customrecord_cseg_erp_property',
                id: connectedKavel,
                values: {
                    custrecord_sync_crm: 'F'
                },
                enableSourcing: false,
                ignoreMandatoryFields: true
            });
        }

        const createJobId = ({length, prefix}) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let result = '';

            // Generate a random string of specified length
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            // Get the current timestamp in milliseconds
            const timestamp = Date.now().toString();

            // Insert the timestamp into the random string to ensure uniqueness
            const mid = Math.floor(result.length / 2);
            const jobId = `${prefix}${result.slice(0, mid)}${timestamp}${result.slice(mid)}`;

            return jobId;
        }


        /**
         * Get the VAT number from a custom record
         * See https://europarcs.atlassian.net/browse/NS-67
         * entrypoint: beforeLoad & beforeSubmit
         * @param args
         */
        const handleVatNumberPerCountry = (...args) => {
            try {
                const ctx = args[0];

                /*
                // Below query is meant only for an afterSubmit variant
                SELECT
                  tl.transaction,
                  sub.country,
                  tl.entity,
                  country.uniquekey,
                  vatnopercountry.custrecord_ep_btw_number
                FROM
                  transactionline AS tl
                  INNER JOIN subsidiary AS sub ON (tl.subsidiary = sub.id)
                  INNER JOIN country ON (sub.country = country.id)
                  LEFT JOIN customrecord_ep_vatnumpercountry AS vatnopercountry ON (
                    vatnopercountry.custrecord_ep_customer = tl.entity
                    AND country.uniquekey = vatnopercountry.custrecord_ep_country
                  )
                WHERE
                  tl.transaction = ${ctx.newRecord.getValue('id')}
                  AND tl.mainline = 'T'
                */

                if ( ctx.newRecord.getValue('subsidiary') && ctx.newRecord.getValue('entity')) {
                    const strQuery = (`
                    SELECT
                      sub.country,
                      vatnopercountry.custrecord_ep_btw_number,
                      vatnopercountry.custrecord_ep_country,
                    FROM
                        customrecord_ep_vatnumpercountry AS vatnopercountry
                        INNER JOIN subsidiary AS sub ON (sub.id = ${ctx.newRecord.getValue('subsidiary')})
                        INNER JOIN country ON (sub.country = country.id)
                    WHERE
                        vatnopercountry.custrecord_ep_customer = ${ctx.newRecord.getValue('entity')}
                    AND
                        country.uniquekey = vatnopercountry.custrecord_ep_country
                `);

                    const objQueryResult = queryExecute(strQuery, ['country', 'custrecord_ep_btw_number', 'custrecord_ep_country']);

                    if (objQueryResult && objQueryResult.recordCount > 0 && objQueryResult.records[0].hasOwnProperty('custrecord_ep_btw_number')) {
                        ctx.newRecord.setValue({
                            fieldId: 'custbody_ep_vatregnum_per_country',
                            value: objQueryResult.records[0].custrecord_ep_btw_number,
                            ignoreFieldChange: true
                        })
                    }

                    // if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    //     log.debug('handleVatNumberPerCountry objQueryResult', objQueryResult);
                    // }
                }
            } catch (e) {
                log.error('handleVatPerCountry error', e.toString());
            }
        }

        /**
         * Removes spaces from a string and also replaces . with and _
         * @param string
         * @returns {*}
         */
        const sanitizeFileName = (string) => {

            finalstr = string.replace(/ /g, '');
            return finalstr.replace(/\./g, '_');
        }

        /**
         * Returns the back-end properties
         * @param args
         * @returns {{accountId: *, hostName: *, slBackend: *}}
         */
        const getBackendScript = (...args) => {

            const ctx = args[0];

            const strQuery = (`
                SELECT
                  ( SELECT script FROM scriptdeployment WHERE scriptid = 'customdeploy_ep_sl_backend' ) AS slbackend,      
                FROM
                  DUAL
            `);

            const objQueryResult = queryExecute(strQuery, ['slbackend']);

            // if (runtime.getCurrentScript().logLevel === 'DEBUG') {
            //     log.debug('objQueryResult', objQueryResult);
            // }

            if (objQueryResult.recordCount > 0) {

                const {slbackend : slBackend} = objQueryResult.records[0];
                const accountId = runtime.accountId
                const hostName = accountId.replace('_', '-');
                const domain = `https://${hostName.toLowerCase()}.app.netsuite.com`

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('destructured', {
                        slBackend,
                        accountId,
                        hostName,
                        domain
                    });
                }

                return {
                    slBackend,
                    accountId,
                    hostName,
                    domain
                }
            }
        }

        /**
         * Transaction Status
         * @returns {{pendingFulfillment: string, pendingBilling: string, fullyBilled: string, closed: string, partiallyFulfilled: string, pendingApproval: string}}
         */
        const status = () =>  {
            return  {
                pendingApproval: 'pendingApproval',
                pendingFulfillment: 'pendingFulfillment',
                partiallyFulfilled: 'partiallyFulfilled',
                pendingBilling: 'pendingBilling',
                fullyBilled: 'fullyBilled',
                closed: 'closed'
            }
        }

		const addExecutionLog = ({objExecutionTime, functionName}) => {
			try {
                const lastStart = objExecutionTime[objExecutionTime.length - 1].end;
                const end = lastStart + (new Date().getTime() - lastStart);

                objExecutionTime.push({
                    functionName: functionName,
                    end: end,
                    time: (end - lastStart) / 1000
                });
            } catch (e) {
                log.error('addExecutionLog error', e);
            }
        }

		const logExecutionTime = (objExecutionTime) => {
			try {
                // Log start time and remove property from object
                // format end time as DD-MM-YY HH:MM:SS
                logText = `Execution time start: ${objExecutionTime[0].end.toString()}`;
                delete objExecutionTime[0];

                // Loop through the array and log the execution time
                objExecutionTime.forEach( (obj) => {
                    logText += `<br />\n- ${obj.functionName}: ${obj.time}`;
                });

                log.debug('logExecutionTime', logText);
            } catch (e) {
                log.error('logExecutionTime error', e);
            }
        }
        
        /**
         * Main function feature 3 Journal Entry creation. Here we need to decide which type of
         * Journal Entry we're going to create
         * See https://europarcs.atlassian.net/browse/NS-72
         * POST
         * @param args
         */
        const decideJournalEntryPCAType = (...args) => {
            const ctx = args[0]
            const id = args[1];
            const taskId = args[2];

            try {
                const sqlJournalEntryHeader = (`
                        SELECT
                            pca.custrecord_ep_pca_source_project AS pca_sourceproject,
                            pca.custrecord_ep_pca_activity_based_alloc AS activitycodebased,
                            job.id AS job_id,
                            job.custentity_ep_proj_subsidiary AS subsidiary,
                            pca.custrecord_ep_pca_posting_date AS trandate,
                            pca.custrecord_ep_pca_posting_period AS postingperiod,
                            pca.custrecord_ep_pca_memo AS memo
                        FROM
                            customrecord_ep_project_cost_allocation AS pca
                            INNER JOIN job ON (job.id = pca.custrecord_ep_pca_source_project)
                        WHERE
                            pca.id = ${id}
                    `);

                const objQueryResultJeHeader = queryExecute(sqlJournalEntryHeader, null , taskId);

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('objQueryResultJeHeader', objQueryResultJeHeader);
                }

                // Activity code based journal entry creation
                if (objQueryResultJeHeader &&
                    objQueryResultJeHeader.recordCount > 0 &&
                    objQueryResultJeHeader.records[0].hasOwnProperty('activitycodebased') &&
                    objQueryResultJeHeader.records[0].activitycodebased === 'T'
                ) {

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('Activity code based scenario.');
                    }
                    createActivityCodeBasedJournalEntry(ctx, id, objQueryResultJeHeader, taskId)
                } else {
                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('Non Activity code based scenario.');
                    }
                    // Non activity code based journal entry creation
                    createTotalPercentageCostBasedJournalEntry(ctx, id, objQueryResultJeHeader, taskId);
                }
            } catch (e) {
                log.error('decideJournalEntryPCAType error', {
                    taskId,
                    error: e.toString()
                })
            }
        }


        /**
         * Helper function feature 3 activity code based journal entry creation
         * See https://europarcs.atlassian.net/browse/NS-72
         * POST
         * @param args
         */
        const createActivityCodeBasedJournalEntry = (...args) => {
            const ctx = args[0]
            const id = args[1];
            const objQueryResultJeHeader = args[2];
            const taskId = args[3];

            try {
                const strQuery = (`
                    SELECT
                        pcs.id AS pcsid,
                        BUILTIN.DF(pcs.custrecord_ep_pcs_activity_code) AS activity,
                        pca.custrecord_ep_pca_source_project AS sourceproject,
                        pcd.custrecord_ep_pcd_destination_project AS entity,
                        pcs.custrecord_ep_pcs_activity_code AS activitycode,
                        pcs.custrecord_ep_pcs_source_account AS sourceaccount,
                        pcs.custrecord_ep_pcs_acosts_to_allocate AS allocateamount,
                        pcs.custrecord_ep_pcs_acosts_to_allocate / (SELECT COUNT(*) FROM customrecord_ep_project_cost_destination AS pcadest WHERE pcadest.custrecord_ep_pcd_prj_cost_allocation_id = ${id}) AS debitamount,
                        ROUND(pcs.custrecord_ep_pcs_acosts_to_allocate * pcd.custrecord_ep_pcd_allocation_weight, 2) AS debitamountrounded,
                        pcd.custrecord_ep_pcd_allocation_weight AS allocationweight,
                        (SELECT COUNT(*) FROM customrecord_ep_project_cost_destination AS pcadest WHERE pcadest.custrecord_ep_pcd_prj_cost_allocation_id = ${id}) AS divider,
                        (SELECT COUNT(*) FROM customrecord_ep_project_cost_source WHERE custrecord_ep_pcs_prj_cost_allocation_id = ${id}) AS pcscount,
                        pcd.custrecord_ep_pcd_destination_account,
                        pcd.id,
                        pcd.custrecord_ep_pcd_destination_project,
                        (SELECT custentity_ep_pms_projectt FROM job WHERE id = pcd.custrecord_ep_pcd_destination_project) AS pmsnumber,
                        pms.name AS pmsname,
                        pms.custrecord_kavel_nr AS lotno,
                        lot.cseg_erp_park AS park,
                        lot.cseg_erp_country AS region,
                        'Project Cost Destination' AS memo
                    FROM
                        customrecord_ep_project_cost_allocation AS pca
                        INNER JOIN job ON (job.id = pca.custrecord_ep_pca_source_project)
                        INNER JOIN customrecord_ep_project_cost_source AS pcs on (pcs.custrecord_ep_pcs_prj_cost_allocation_id = pca.id)
                        INNER JOIN customrecord_ep_project_cost_destination AS pcd ON (pcd.custrecord_ep_pcd_prj_cost_allocation_id = ${id})
                        LEFT JOIN customrecord_ep_kavel_pms AS pms ON (
                            pms.id = (SELECT custentity_ep_pms_projectt FROM job WHERE job.id = pcd.custrecord_ep_pcd_destination_project)
                        )
                        LEFT JOIN customrecord_cseg_erp_property AS lot ON (lot.id = pms.custrecord_kavel_nr)
                    WHERE
                        pca.id = ${id}
                `);

                const objQueryResultJeSublist = queryExecute(strQuery, null, taskId);

                // In the event the query has run into an error throw an error
                if (objQueryResultJeSublist.hasOwnProperty('type') && objQueryResultJeSublist.type === 'error.SuiteScriptError') {
                    throw  objQueryResultJeSublist;
                }

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('Create Debug Log', createDebugMessage({
                        custrecord_ep_dl_description: 'Activity code based journal entry objQueryResultJeSublist',
                        custrecord_ep_dl_log: JSON.stringify(objQueryResultJeSublist)
                    }));
                }

                if (objQueryResultJeSublist.recordCount > 0) {
                    const objSublistData = createActivityCodeBasedJournalEntrySublistData(objQueryResultJeSublist, taskId);

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('objQueryResultJeHeader', objQueryResultJeHeader);
                        log.debug('objSublistData', objSublistData);
                    }

                    if (objQueryResultJeHeader && objSublistData && objQueryResultJeHeader.recordCount > 0 && objSublistData.length > 0) {

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('record.create');
                        }
                        const objRec = record.create({
                            id: id,
                            type: record.Type.JOURNAL_ENTRY,
                            isDynamic: true
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value trandate');
                        }
                        objRec.setValue({
                            fieldId: 'trandate',
                            value: format.parse({
                                value: objQueryResultJeHeader.records[0].trandate,
                                type: format.Type.DATE
                            }),
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value subsidiary');
                        }
                        objRec.setValue({
                            fieldId: 'subsidiary',
                            value: objQueryResultJeHeader.records[0].subsidiary,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value memo');
                        }
                        objRec.setValue({
                            fieldId: 'memo',
                            value: objQueryResultJeHeader.records[0].memo,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value pca link');
                        }
                        objRec.setValue({
                            fieldId: 'custbody_ep_proj_cost_allocation_link',
                            value: id,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value posting period');
                        }
                        objRec.setValue({
                            fieldId: 'postingperiod',
                            value: objQueryResultJeHeader.records[0].postingperiod,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('after set value posting period');
                        }


                        // Setting the Journal Entry sublist lines
                        objSublistData.forEach((line) => {

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('select new line');
                            }
                            objRec.selectNewLine({
                                sublistId: 'line'
                            });


                            if (line.hasOwnProperty('debitamount') &&  line.debitamount!== null) {

                                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                    log.debug('set value debit amount');
                                }
                                objRec.setCurrentSublistValue({
                                    sublistId: 'line',
                                    fieldId: 'debit',
                                    value: line.debitamountrounded,
                                    ignoreFieldChange: false
                                });

                                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                    log.debug('set value account');
                                }
                                objRec.setCurrentSublistValue({
                                    sublistId: 'line',
                                    fieldId: 'account',
                                    value: line.custrecord_ep_pcd_destination_account,
                                    ignoreFieldChange: false
                                });

                            } else if (line.hasOwnProperty('creditamount') &&   line.creditamount !== null) {

                                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                    log.debug('set value credit amount');
                                }
                                objRec.setCurrentSublistValue({
                                    sublistId: 'line',
                                    fieldId: 'credit',
                                    value: line.creditamount,
                                    ignoreFieldChange: false
                                });

                                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                    log.debug('set value account');
                                }
                                objRec.setCurrentSublistValue({
                                    sublistId: 'line',
                                    fieldId: 'account',
                                    value: line.sourceaccount,
                                    ignoreFieldChange: false
                                });
                            }

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value entity');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'entity',
                                value: line.entity,
                                ignoreFieldChange: false
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value memo');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'memo',
                                value: objQueryResultJeHeader.records[0].memo,
                                ignoreFieldChange: false
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value pms');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'custcol_ep_pms',
                                value: line.pmsnumber,
                                ignoreFieldChange: false
                            });


                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value kavel');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'cseg_erp_property',
                                value: line.lotno,
                                ignoreFieldChange: false
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value kavel');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'cseg_erp_park',
                                value: line.park,
                                ignoreFieldChange: false
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value region');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'cseg_erp_country',
                                value: line.region,
                                ignoreFieldChange: false
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value region');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'cseg_paactivitycode',
                                value: line.activitycode,
                                ignoreFieldChange: false
                            });


                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('commit line');
                            }
                            objRec.commitLine({
                                sublistId: 'line'
                            });
                        })

                        const recordId = objRec.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });

                        // When the Journal Entry transaction was created successfully
                        if (recordId) {


                            const custrecord_ep_pca_total_ac_to_allocate = getSumAllocateAmountsFromPCD(id, taskId);

                            const objFields = {
                                'custrecord_ep_pca_total_ac_to_allocate': custrecord_ep_pca_total_ac_to_allocate || 0,
                                'custrecord_ep_pca_allocation_journal': recordId
                            }

                            // Add some data onto the Project Cost Alloction record such as:
                            // Link to the JE
                            // Total amount to allocate
                            const objRecPCA = record.load({
                                type: 'customrecord_ep_project_cost_allocation',
                                id: id,
                                isDynamic: true
                            });

                            for (let prop in objFields) {
                                objRecPCA.setValue({
                                    fieldId: prop,
                                    value: objFields[prop],
                                    ignoreFieldChange: false
                                });
                            }

                            objRecPCA.save({
                                enableSourcing: true,
                                ignoreMandatoryFields: true
                            });

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('Activity Cost Based Journal Entry', 'Successfully created', {
                                    taskId,
                                    recordId
                                });
                            }

                            ctx.response.setHeader('Content-Type', 'application/json');
                            ctx.response.write(JSON.stringify({
                                pca: parseInt(id),
                                journalentry: parseInt(recordId),
                                taskId
                            }, null, 5));

                        } else {

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('Activity Cost Based Journal Entry', 'Could not be created', {
                                    taskId,
                                    recordId
                                });
                            }

                            ctx.response.setHeader('Content-Type', 'application/json');
                            ctx.response.write(JSON.stringify({
                                taskId,
                                error: 'Activity Cost Based Journal Entry could not be created'
                            }, null, 5));
                        }
                    }
                }
            } catch (e) {
                log.error('createActivityCodeBasedJournalEntry error', {
                    taskId,
                    error: e.toString()
                });

                ctx.response.setHeader('Content-Type', 'application/json');
                ctx.response.write(JSON.stringify({
                    taskId,
                    error: e.message
                }, null, 5));
            }
        }

        /**
         * Helper function that creates the sublist data for creating a journal entry based on activity codes
         * See https://europarcs.atlassian.net/browse/NS-72
         * See https://codepen.io/ep_bsu/pen/dyKworw
         * @param args
         */
        const createActivityCodeBasedJournalEntrySublistData = (...args) => {
            const objQueryResult = args[0];
            const taskId = args[1];

            try {

                if (objQueryResult && objQueryResult.recordCount > 0 &&
                    objQueryResult.records[0].hasOwnProperty('divider') &&
                    objQueryResult.records[0].divider &&
                    objQueryResult.records[0].hasOwnProperty('pcscount') &&
                    objQueryResult.records[0].pcscount
                ) {

                    const divider = objQueryResult.records[0].divider;
                    const pcscount = objQueryResult.records[0].pcscount;

                    const creditIndexes = [];
                    const objSublistData = [];

                    for (let i = divider -1; i<= (pcscount * divider -1); i+= divider){
                        creditIndexes.push(i);
                    }
                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('', {
                            taskId,
                            divider,
                            pcscount,
                            creditIndexes
                        });
                    }

                    // We now must perform a check if the amounts are not out of balance since we need to spread the costs evenly onto
                    // several destination projects. We either substract or add amounts to the last creditIndex of each activity code
                    creditIndexes.forEach((je) => {
                        let amount = 0;
                        for (let i = je - (divider - 1); i <= je; i++) {
                            amount = objQueryResult.records[i].debitamountrounded + amount;
                        }

                        if (objQueryResult.records[je].allocateamount !== amount) {
                            const amountOutOfBalance = (amount - objQueryResult.records[je].allocateamount).toFixed(2);

                            // When there is a surplus, then we need to substract the amount from the last element from the destination group
                            if (amountOutOfBalance > 0) {
                                objQueryResult.records[je].debitamountrounded = parseFloat((objQueryResult.records[je].debitamountrounded - amountOutOfBalance).toFixed(2));
                            } else if (amountOutOfBalance < 0) {
                                // When there is a shortage, then we need to add the amount to the last element from the destination group
                                objQueryResult.records[je].debitamountrounded =
                                    objQueryResult.records[je].debitamountrounded +
                                    Math.abs(amountOutOfBalance);
                            }
                        }
                    });

                    objQueryResult.records.forEach( (result, index) => {

                        if ( creditIndexes.includes(index)){

                            // The usual debit element
                            objSublistData.push(result);

                            // The credit element
                            objSublistData.push({
                                pcsid: result.pcsid,
                                entity: objQueryResult.records[index].sourceproject,
                                activity: result.activity,
                                activitycode: result.activitycode,
                                sourceaccount: result.sourceaccount,
                                allocateamount: result.allocateamount,
                                creditamount: result.allocateamount,
                                divider: result.divider,
                                pcscount: result.pcscount,
                                custrecord_ep_pcd_destination_account: result.custrecord_ep_pcd_destination_account,
                                memo: 'Project Cost Source'
                            })
                        } else {
                            objSublistData.push(result);
                        }
                    });

                    if (objSublistData && objSublistData.length > 0) {

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('Create Debug Log', createDebugMessage({
                                custrecord_ep_dl_description: 'objSublistData',
                                custrecord_ep_dl_log: JSON.stringify(objSublistData)
                            }));
                        }

                        return objSublistData;
                    }
                }
            } catch (e) {
                log.error('createAcitivyCodeBasedJournalEntry error', {
                    taskId,
                    error: e.toString()
                })
            }
        }


        /**
         * Helper function feature 3 total or percentage based cost journal entry creation
         * See https://europarcs.atlassian.net/browse/NS-72
         * POST
         * @param args
         */
        const createTotalPercentageCostBasedJournalEntry = (...args) => {
            const ctx = args[0];
            const id = args[1];
            const objQueryResultJeHeader = args[2];
            const taskId = args[3];

            try {
                const sqlJournalEntrySublist = (`
                        SELECT
                            ROUND(pcadest.custrecord_ep_pcd_allocation_weight,2) AS allocationweight,
                            pcadest.custrecord_ep_pcd_destination_account AS account,
                            pca.custrecord_ep_pca_amount_to_allocate AS allocationtotalamount,
                            pca.custrecord_ep_pca_amount_to_allocate * pcadest.custrecord_ep_pcd_allocation_weight AS debitamount,
                            ROUND(pca.custrecord_ep_pca_amount_to_allocate * pcadest.custrecord_ep_pcd_allocation_weight,2) AS debitamountrounded,
                            null AS creditamount,
                            pcadest.custrecord_ep_pcd_destination_project AS name,
                            'Project Cost Destination' AS memo,
                            (SELECT custentity_ep_pms_projectt FROM job WHERE id = pcadest.custrecord_ep_pcd_destination_project) AS pmsnumber,
                            pms.custrecord_kavel_nr AS lotno,
                            lot.cseg_erp_park AS park,
                            lot.cseg_erp_country AS region
                        FROM
                            customrecord_ep_project_cost_destination AS pcadest
                            INNER JOIN customrecord_ep_project_cost_allocation AS pca ON (pca.id = ${id})
                            INNER JOIN job ON (
                                job.id = pcadest.custrecord_ep_pcd_destination_project
                            )
                            LEFT JOIN customrecord_ep_kavel_pms AS pms ON (pms.id = (
                                SELECT
                                  custentity_ep_pms_projectt
                                FROM
                                  job
                                WHERE
                                  id = pcadest.custrecord_ep_pcd_destination_project
                            ))
                            LEFT JOIN customrecord_cseg_erp_property AS lot ON (lot.id = pms.custrecord_kavel_nr)
                        WHERE
                            pcadest.custrecord_ep_pcd_prj_cost_allocation_id = ${id}
                        UNION
                        SELECT
                            TOP(1) 1 AS allocationweight,
                            pca.custrecord_ep_pca_source_account AS account,
                            pca.custrecord_ep_pca_amount_to_allocate AS allocationtotalamount,
                            null AS debitamount,
                            ROUND(0.00, 2) AS debitamountrounded,
                            pca.custrecord_ep_pca_amount_to_allocate AS creditamount,
                            pca.custrecord_ep_pca_source_project AS name,
                            'Project Cost Source' AS memo,
                            (SELECT custentity_ep_pms_projectt FROM job WHERE id = pcadest.custrecord_ep_pcd_destination_project) AS pmsnumber,
                            pms.custrecord_kavel_nr AS lotno,
                            lot.cseg_erp_park AS park,
                            lot.cseg_erp_country AS region
                        FROM
                            customrecord_ep_project_cost_destination AS pcadest
                            INNER JOIN customrecord_ep_project_cost_allocation AS pca ON (pca.id = ${id})
                            INNER JOIN job ON (
                                job.id = pcadest.custrecord_ep_pcd_destination_project
                            )
                            LEFT JOIN customrecord_ep_kavel_pms AS pms ON (pms.id = (
                                SELECT
                                  custentity_ep_pms_projectt
                                FROM
                                  job
                                WHERE
                                  id = pcadest.custrecord_ep_pcd_destination_project
                            ))
                            LEFT JOIN customrecord_cseg_erp_property AS lot ON (lot.id = pms.custrecord_kavel_nr)
                        WHERE
                            pcadest.custrecord_ep_pcd_prj_cost_allocation_id = ${id}
                    `);

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('Create Debug Log sqlJournalEntrySublist query', createDebugMessage({
                        custrecord_ep_dl_description: 'sqlJournalEntrySublist query',
                        custrecord_ep_dl_log: sqlJournalEntrySublist
                    }));
                }

                const objQueryResultJeSublist = queryExecute(sqlJournalEntrySublist, null, taskId);

                // In the event the query has run into an error throw an error
                if (objQueryResultJeSublist.hasOwnProperty('type') && objQueryResultJeSublist.type === 'error.SuiteScriptError') {
                    throw  objQueryResultJeSublist;
                }

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('objQueryResults createTotalPercentageCostBasedJournalEntry', {
                        taskId,
                        objQueryResultJeHeader,
                        objQueryResultJeSublist
                    });
                }

                if (objQueryResultJeHeader && objQueryResultJeSublist && objQueryResultJeHeader.recordCount > 0 && objQueryResultJeSublist.recordCount > 0) {

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('record.create');
                    }
                    const objRec = record.create({
                        id: id,
                        type: record.Type.JOURNAL_ENTRY,
                        isDynamic: true
                    });

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('set value trandate');
                    }
                    objRec.setValue({
                        fieldId: 'trandate',
                        value: format.parse({
                            value: objQueryResultJeHeader.records[0].trandate,
                            type: format.Type.DATE
                        }),
                        ignoreFieldChange: false
                    });

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('set value subsidiary');
                    }
                    objRec.setValue({
                        fieldId: 'subsidiary',
                        value: objQueryResultJeHeader.records[0].subsidiary,
                        ignoreFieldChange: false
                    });

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('set value memo');
                    }
                    objRec.setValue({
                        fieldId: 'memo',
                        value: objQueryResultJeHeader.records[0].memo,
                        ignoreFieldChange: false
                    });

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('set value pca link');
                    }
                    objRec.setValue({
                        fieldId: 'custbody_ep_proj_cost_allocation_link',
                        value: id,
                        ignoreFieldChange: false
                    });

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('set value posting period');
                    }
                    objRec.setValue({
                        fieldId: 'postingperiod',
                        value: objQueryResultJeHeader.records[0].postingperiod,
                        ignoreFieldChange: false
                    });

                    // We now need to perform out of balance checks.
                    // See https://codepen.io/ep_bsu/pen/QWxXgYe
                    const debits = objQueryResultJeSublist.records;
                    const sumDebits = debits.reduce((accum,debit) => accum + debit.debitamountrounded, 0);
                    const amountOutOfBalance = (sumDebits - debits[0].allocationtotalamount).toFixed(2);

                    if (sumDebits !== debits[0].allocationtotalamount) {

                        if (amountOutOfBalance < 0) {
                            objQueryResultJeSublist.records[0].debitamountrounded = parseFloat((objQueryResultJeSublist.records[0].debitamountrounded + Math.abs(amountOutOfBalance)).toFixed(2));
                        } else if (amountOutOfBalance > 0) {
                            objQueryResultJeSublist.records[0].debitamountrounded = parseFloat((objQueryResultJeSublist.records[0].debitamountrounded - amountOutOfBalance).toFixed(2));
                        }
                    }
                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('objSublist out of balance checks', {
                            taskId,
                            objQueryResultJeSublist
                        });
                    }

                    // Setting the Journal Entry sublist lines
                    objQueryResultJeSublist.records.forEach((line) => {

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('select new line');
                        }
                        objRec.selectNewLine({
                            sublistId: 'line'
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value account');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'account',
                            value: line.account,
                            ignoreFieldChange: true
                        });

                        if (line.debitamountrounded !== 0) {

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value debit');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'debit',
                                value: line.debitamountrounded,
                                ignoreFieldChange: false
                            });

                        } else if (line.creditamount !== null) {

                            if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                                log.debug('set value credit');
                            }
                            objRec.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: 'credit',
                                value: line.creditamount,
                                ignoreFieldChange: false
                            });
                        }

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value entity');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'entity',
                            value: line.name,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value memo');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'memo',
                            value: objQueryResultJeHeader.records[0].memo,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value pms number');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'custcol_ep_pms',
                            value: line.pmsnumber,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value kavel');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'cseg_erp_property',
                            value: line.lotno,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value park');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'cseg_erp_park',
                            value: line.park,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('set value region');
                        }
                        objRec.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'cseg_erp_country',
                            value: line.region,
                            ignoreFieldChange: false
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('commit line');
                        }
                        objRec.commitLine({
                            sublistId: 'line'
                        });
                    })

                    const recordId = objRec.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    // When the Journal Entry transaction was created successfully
                    if (recordId) {
                        // Link the JE transaction onto the PCA by setting the JE id into the body field
                        const objRecPCA = record.load({
                            type: 'customrecord_ep_project_cost_allocation',
                            id: id,
                            isDynamic: true
                        });

                        objRecPCA.setValue({
                            fieldId: 'custrecord_ep_pca_allocation_journal',
                            value: recordId,
                            ignoreFieldChange: false
                        });

                        objRecPCA.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });
                    }

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('Total or Percentage CostBased Journal Entry created', {
                            taskId,
                            recordId
                        });
                    }

                    ctx.response.setHeader('Content-Type', 'application/json');
                    ctx.response.write(JSON.stringify({
                        pca: parseInt(id),
                        journalentry: parseInt(recordId),
                        taskId
                    }, null, 5));
                }
            } catch (e) {
                log.error('createTotalPercentageCostBasedJournalEntry error', {
                    taskId,
                    error: e.toString()
                });

                ctx.response.setHeader('Content-Type', 'application/json');
                ctx.response.write(JSON.stringify({
                    taskId,
                    error: e
                }, null, 5));
            }
        }

        const getSumAllocateAmountsFromPCD = (...args) => {
            const id = args[0];
            const taskId = args[1];

            try {
                const sqlQuery = (`
                    SELECT
                      SUM(pca.custrecord_ep_pcs_acosts_to_allocate) AS total
                    FROM
                      customrecord_ep_project_cost_source AS pca
                    WHERE
                      pca.custrecord_ep_pcs_prj_cost_allocation_id = ${id}
                `);

                const objQueryResult = queryExecute(sqlQuery, null , taskId);

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('getSumAllocateAmountsFromPCD objQueryResult', objQueryResult);
                }

                if (objQueryResult && objQueryResult.recordCount > 0 && objQueryResult.records[0].hasOwnProperty('total')) {
                    return objQueryResult.records[0].total;
                } else {
                    return 0;
                }


            } catch (e) {
                log.error('getSumAllocateAmountsFromPCD', {
                    taskId,
                    error: e.toString()
                })
            }
        }

        /**
         * Helper function for handleProjectEntryConfig. This function get the Suitelet deployment data
         * @param scriptid
         * @returns {*}
         */
        const getSuiteletDeployment = (...args) => {
            const scriptid = args[0];
            const strQuery = (`
                SELECT
                    suiteletdeployment.scriptid,
                    suiteletdeployment.id,
                    suiteletdeployment.loglevel,
                    suiteletdeployment.primarykey,
                    suiteletdeployment.script,
                    suiteletdeployment.status,
                    suiteletdeployment.title,
                    suiteletdeployment.version,
                    '/app/site/hosting/scriptlet.nl?script=' || suiteletdeployment.script || '&deploy=' ||  suiteletdeployment.id AS url
                FROM
                    suiteletdeployment
                WHERE
                    suiteletdeployment.scriptid = '${scriptid}'
            `);

            const objQueryResult = queryExecute(strQuery);

            if (objQueryResult && objQueryResult.recordCount > 0 ) {
                const objSuiteletDeployment = objQueryResult.records;

                return objSuiteletDeployment[0];
            }
        }

        /**
         * Wraps a potentially unsafe NetSuite call in a try/catch and implements basic logging
         * @returns {{isSuccess: boolean, result?: object, message?: string, details?: object}}
         */
        const safeExecute = () => {
            const parameters = Array.prototype.slice.call(arguments);
            const functionToExecute = parameters.shift();
            if (typeof(functionToExecute) === 'function') {
                try {
                    const result = functionToExecute.apply(this, parameters);
                    return {
                        isSuccess: true,
                        result: result
                    };
                } catch (ex) {
                    const response = {
                        isSuccess: false,
                        message: ex.message,
                        details: {
                            functionCalled: functionToExecute.name,
                            parameters: JSON.stringify(parameters),
                            stackTrace: ex.stack
                        }
                    };
                    log.error('Failed to call function', JSON.stringify(response));
                    return response;
                }
            } else {
                throw error.create({
                    name: 'INVALID_ARGUMENT',
                    message: functionToExecute + ' is not a function and cannot be called.',
                    notifyOff: false
                });
            }
        }

        /**
         * Create one or two projects based on the sales or park entity after the kavel record has been created
         * See https://europarcs.atlassian.net/browse/NS-62
         * @param args
         */
        const handleCreateProjectsFromLot = (...args) => {
            const ctx = args[0];
            const id = args[1];
            const scriptType = args[2];
            const taskId = args[3];

            log.debug('inside handleCreateProjectsFromLot');

            try {
                const qryString = (`
                    SELECT
                        lot.custrecordcustrecord_ep_sales_entity_acc AS salesentity,
                        park.custrecord_ep_park_dev_entity AS parkentity,
                        subsidiary = lot.custrecordcustrecord_ep_sales_entity_acc,
                        CONCAT(CONCAT(REPLACE(sub.tranprefix, '-', ''), CONCAT(' ', lot.name) ), CONCAT(' ', BUILTIN.DF(lot.custrecord_ep_kavel_nr_pms))) AS projectname,
                        lot.name AS kavelname,
                        lot.custrecord_ep_kavel_nr_pms AS kavelpms,
                        park.custrecord_ep_park_project_man AS projectmanager,
                        jobtype = ${configuration().project.jobtypes.parkdevelopment_locationproject}, -- 5 Park Development : Location Project
                        status = ${configuration().entitystatus.inProgress}, -- 2 IN PROGRESS
                        park.custrecord_ep_park_milestone_template AS projecttemplate,
                        statussalesproject = ${configuration().project.statussalesproject.basic}, -- 1 BASIC
                        projectclass = '2,3', -- 2 development & 3 sales
                        startdate = current_date,
                        kavel = lot.id,
                        pmsnumber = lot.custrecord_ep_kavel_nr_pms,
                        park = lot.cseg_erp_park,
                        projectexpensetype = -2, -- REGULAR
                        shadowtemplate.id AS shadowtemplateid,
                        parkdevprojecttemplate.id AS defaultprojectdevtemplate
                    FROM
                        customrecord_cseg_erp_property AS lot
                        INNER JOIN customrecord_cseg_erp_park AS park ON lot.cseg_erp_park = park.id
                        INNER JOIN subsidiary AS sub ON sub.id = lot.custrecordcustrecord_ep_sales_entity_acc
                        LEFT JOIN customrecord_ep_project_template AS shadowtemplate ON shadowtemplate.custrecord_ep_project_template = park.custrecord_ep_park_milestone_template
                        LEFT JOIN customrecord_ep_project_template AS parkdevprojecttemplate ON parkdevprojecttemplate.custrecord_ep_project_template = park.custrecord_ep_projectdev_template
                        WHERE
                    lot.id = ${id}
                `);

                const objQueryResult = queryExecute(qryString);

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('handleCreateProjects objQueryResult', objQueryResult);
                }

                if (objQueryResult && objQueryResult.recordCount === 1) {
                    let {
                        salesentity,
                        parkentity,
                        subsidiary,
                        projectname,
                        kavelname,
                        kavelpms,
                        projectmanager,
                        jobtype,
                        status,
                        projecttemplate,
                        statussalesproject,
                        projectclass,
                        startdate,
                        kavel,
                        pmsnumber,
                        park,
                        projectexpensetype,
                        shadowtemplateid,
                        defaultprojectdevtemplate
                    } = objQueryResult.records[0];

                    const objSetFields = {
                        customform: configuration().kavel.defaultProjectFormOnCreate,
                        subsidiary,
                        cseg_erp_park: park,
                        companyname: projectname,
                        projectmanager: getProjectManager(projectmanager),
                        jobtype,
                        entitystatus: status,
                        projecttemplate,
                        custentity_ep_prj_status_sales_project: statussalesproject,
                        custentity_ep_project_class: projectclass.split(','),
                        custpage_ep_project_class_filtered: projectclass.split(','),
                        startdate: format.parse({
                            value: startdate,
                            type: format.Type.DATE
                        }),
                        cseg_erp_property: kavel,
                        custentity_ep_pms_projectt: pmsnumber,
                        projectexpensetype,
                        custentity_ep_project_template: shadowtemplateid,
                        custentity_ep_projecttemplate_copy: projecttemplate
                    }

                    if (salesentity === parkentity) {
                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('Create one project', id);
                        }

                        objSetFields.custentity_ep_single_park_sales_project = true;

                        objSetFields.companyname = createProjectName({
                            projectlocation: objSetFields.custentity_ep_pms_projectt,
                            jobtype: objSetFields.jobtype,
                            projectclass: projectclass.split(','),
                            park: objSetFields.cseg_erp_park,
                            subsidiary: objSetFields.subsidiary,
                            projecttitle: objSetFields.custentity_ep_pms_projectt,
                            context: ctx
                        });

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('objSetFields.companyname', objSetFields.companyname);
                        }

                        const recProject = record.create({
                            type: record.Type.JOB,
                            isDynamic: true
                        });

                        for (let prop in objSetFields) {
                            recProject.setValue({fieldId: prop, value: objSetFields[prop], ignoreFieldChange: false});
                        }
                        const recordId = recProject.save({enableSourcing: true, ignoreMandatoryFields: true})
                        if (recordId) {

                            // Update the kavel record
                            updateRecord({
                                recordType: 'customrecord_cseg_erp_property',
                                id: id,
                                bodyFields: [{
                                    custrecord_ep_dev_project: recordId,
                                    custrecord_ep_related_project: recordId,
                                    custrecord_ep_dual_project: false,
                                    custrecord_ep_single_project: true
                                }]
                            });

                            if (scriptType === getScriptType().SUITELET) {
                                ctx.response.setHeader('Content-Type', 'application/json');
                                ctx.response.write(JSON.stringify({
                                    id,
                                    resultCreateParkDevelopmentEntityProject: {
                                        recordId,
                                        type: 'Sales Entity Project'
                                    },
                                    taskId
                                }, null, 5));
                            } else if (scriptType === getScriptType().USER_EVENT) {
                                return {
                                    id,
                                    resultCreateParkDevelopmentEntityProject: {
                                        recordId,
                                        type: 'Sales Entity Project'
                                    },
                                    taskId
                                }
                            }
                        }
                    }

                    else if (salesentity !== parkentity) {
                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('Create two projects', id);
                        }

                        const resultCreateSalesEntityProject = createSalesEntityProject(id, objSetFields, salesentity, scriptType, ctx);
                        objSetFields.custentity_ep_project_template = defaultprojectdevtemplate;
                        const resultCreateParkDevelopmentEntityProject = createParkDevelopmentEntityProject(id, objSetFields, parkentity, scriptType, ctx);

                        if (resultCreateSalesEntityProject && resultCreateParkDevelopmentEntityProject) {
                            // Update the kavel record
                            updateRecord({
                                recordType: 'customrecord_cseg_erp_property',
                                id: id,
                                bodyFields: [{
                                    custrecord_ep_dev_project: resultCreateParkDevelopmentEntityProject.recordId,
                                    custrecord_ep_related_project: resultCreateSalesEntityProject.recordId,
                                    custrecord_ep_dual_project: true,
                                    custrecord_ep_single_project: false
                                }]
                            });

                            if (scriptType === getScriptType().SUITELET) {
                                ctx.response.setHeader('Content-Type', 'application/json');
                                ctx.response.write(JSON.stringify({
                                    id,
                                    resultCreateSalesEntityProject,
                                    resultCreateParkDevelopmentEntityProject,
                                    taskId
                                }, null, 5));
                            } else if ([getScriptType().CSV_IMPORT, getScriptType().USER_EVENT].includes( scriptType) ) {
                                return {
                                    id,
                                    resultCreateSalesEntityProject,
                                    resultCreateParkDevelopmentEntityProject,
                                    taskId
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                log.error('handleCreateProjects error', {
                    taskId,
                    error: e.toString()
                });
            }
        }


        /**
         * Helper function for NS-102
         *
         * Get the project manager. When the parameter is an array get the first, if it's a string just
         * return the string
         * @param pm
         * @returns {string|boolean|*}
         */
        const getProjectManager = (pm) => {
            try {
                if (pm) {
                    if (typeof pm.split(',') === 'object' && pm.split(',').length > 0) {
                        return pm.split(',')[0];
                    } else if (typeof pm === 'string') {
                        return pm;
                    } else {
                        return false;
                    }
                }
            } catch (e) {
                log.error('getProjectManager error', {
                    error: e.toString()
                });
            }
        }

        /**
         * Create a project name based on a particular convention
         * See https://europarcs.atlassian.net/browse/NS-83
         * @param {object} args - The args object.
         * @returns {string}
         */
        const createProjectName = (...args) => {
            const objFields = args[0];
            const taskId = args[1];
            const functionCall = args[2];

            log.debug('objFields.context.type', objFields.context.type)

            try {
                if ( ['create', 'edit'].includes(objFields.context.type) ) {
                    const jobType = objFields.jobtype;
                    const projectClasses = objFields.projectclass || false;
                    const park = objFields.park || false;
                    const subsidiary = objFields.subsidiary || false;
                    const projectTitle = objFields.projecttitle;
                    let projectLocation;
                    let newProjectName;

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('createProjectName const', {
                            jobType,
                            projectClasses,
                            park,
                            subsidiary,
                            projectTitle,
                            objFields
                        });
                    }

                    if (objFields.hasOwnProperty('projectlocation') && objFields.projectlocation) {
                        projectLocation = search.lookupFields({
                            type: 'customrecord_ep_kavel_pms',
                            id: parseInt(objFields.projectlocation),
                            columns: 'name'
                        }).name;
                    }

                    let namePart2, namePart4, namePart5;
                    let namePart3 = [];

                    if (jobType) {
                        switch (parseInt(jobType)) {
                            case configuration().project.jobtypes.parkdevelopment_mainproject:
                                namePart2 = 'M';
                                break;
                            case configuration().project.jobtypes.parkdevelopment_subproject:
                                namePart2 = 'S';
                                break;
                            case configuration().project.jobtypes.parkdevelopment_locationproject:
                                namePart2 = 'L'
                                break;
                            case configuration().project.jobtypes.reaprojects_basic:
                                namePart2 = 'L'
                                break;
                            case configuration().project.jobtypes.reaprojects_stock:
                                namePart2 = 'L'
                                break;
                            case configuration().project.jobtypes.reaprojects_sales:
                                namePart2 = 'L'
                                break;
                            case configuration().project.jobtypes.resale:
                                namePart2 = 'L'
                                break;
                            default:
                                namePart2 = '';
                        }
                    }

                    if (projectClasses.length > 0) {
                        projectClasses.every((projectClass) => {
                            namePart3.push(search.lookupFields({
                                type: 'customrecord_ep_project_class',
                                id: parseInt(projectClass),
                                columns: 'custrecord_ep_project_class_abbreviation'
                            }).custrecord_ep_project_class_abbreviation);
                            return true;
                        });

                        if (projectClasses.length === 1) {
                            namePart3 = `${namePart3}` // Removed the XX prefix when 1 class was selected
                        } else {
                            namePart3 = namePart3.join('');
                        }
                    } else {
                        namePart3 = '' // Removed the XXXX string when no class was selected
                    }

                    if ([
                        configuration().project.jobtypes.parkdevelopment_locationproject,
                        configuration().project.jobtypes.reaprojects_sales,
                        configuration().project.jobtypes.resale,
                        configuration().project.jobtypes.reaprojects_basic,
                        configuration().project.jobtypes.reaprojects_stock
                        ].includes(parseInt(jobType))) {
                            namePart4 = projectLocation || 'UNDEFINED';
                    } else {

                        if (park) {
                            const subPark = search.lookupFields({
                                type: 'customrecord_cseg_erp_park',
                                id: park,
                                columns: 'custrecord_ep_park_subsidiary'
                            }).custrecord_ep_park_subsidiary;

                            if (subPark.length > 0 && subPark[0].hasOwnProperty('value')) {
                                namePart4 = search.lookupFields({
                                    type: record.Type.SUBSIDIARY,
                                    id: subPark[0].value,
                                    columns: 'tranprefix'
                                }).tranprefix || 'UNDEFINED';

                                // remove the dashes
                                namePart4 = namePart4.replace(/-/g, '');
                            }

                        } else if (!park && subsidiary) {
                            namePart4 = search.lookupFields({
                                type: record.Type.SUBSIDIARY,
                                id: subsidiary,
                                columns: 'tranprefix'
                            }).tranprefix || 'UNDEFINED';

                            // remove the dashes
                            namePart4 = namePart4.replace(/-/g, '');
                        } else {
                            namePart4 = projectLocation
                        }
                    }

                    if ([
                        configuration().project.jobtypes.parkdevelopment_mainproject,
                        configuration().project.jobtypes.parkdevelopment_subproject
                    ].includes(parseInt(jobType))) {
                        namePart5 = projectTitle;
                        if (namePart5) {
                            newProjectName = `${namePart2}-${namePart3}-${namePart4}-${namePart5}`
                        } else {
                            newProjectName = `${namePart2}-${namePart3}-${namePart4}`
                        }
                    } else if ([
                        configuration().project.jobtypes.parkdevelopment_locationproject,
                        configuration().project.jobtypes.reaprojects_basic,
                        configuration().project.jobtypes.reaprojects_sales,
                        configuration().project.jobtypes.reaprojects_stock,
                        configuration().project.jobtypes.resale,
                    ].includes(parseInt(jobType))) {
                        newProjectName = `${namePart2}-${namePart3}-${namePart4}`;
                    }

                    newProjectName = removeDoubleDashes(newProjectName);

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('createProjectName', {
                            jobType,
                            projectClasses,
                            names: {
                                namePart2,
                                namePart3,
                                namePart4,
                                namePart5,
                                newProjectName
                            }
                        });
                    }

                    return newProjectName;
                }
            } catch (e) {
                log.error('createProjectName, error', {
                    error: e.toString(),
                    taskId,
                    functionCall
                });
            }
        }

        /**
         * Helper function for createProjectName, it removes consecutive dashes in a string
         * See https://europarcs.atlassian.net/browse/NS-83
         *
         * @param args
         * @returns {string}
         */
        const removeDoubleDashes = (...args) => {
            const newProjectName = args[0];
            try {
                const x = newProjectName;
                const y = x.split('--');
                let stringBuilder = '';

                y.forEach( (str, index) => {
                    if (index + 1 < y.length) {
                        stringBuilder = stringBuilder + str + '-';
                    } else if (index + 1 === y.length) {
                        stringBuilder = stringBuilder + str;
                    }
                });

                return stringBuilder;
            } catch (e) {
                log.error('removeDoubleDashes error', {
                    taskId,
                    error: e.toString()
                })
            }
        }

        /**
         * Helper function for handleCreateProjectsFromLot
         * Create one or two projects based on the sales or park entity after the kavel record has been created
         * See https://europarcs.atlassian.net/browse/NS-62
         * @param args
         */
        const createParkDevelopmentEntityProject = (...args) => {
            try {
                const id = args[0];
                let objSetFields = args[1];
                const parkEntity = args[2];
                const scriptType = args[3];
                const ctx = args[4];

                /**
                 * Specifically made for https://europarcs.atlassian.net/browse/NS-102
                 */
                if (scriptType === getScriptType().CSV_IMPORT) {
                    objSetFields.companyname = createProjectName({
                        projectlocation: objSetFields.custentity_ep_pms_projectt,
                        jobtype: objSetFields.jobtype,
                        projectclass: [configuration().project.projectclass.development],
                        park: objSetFields.cseg_erp_park,
                        subsidiary: objSetFields.subsidiary,
                        projecttitle: objSetFields.custentity_ep_pms_projectt,
                        context: ctx
                    });
                }



                const setFields = {
                    ...objSetFields
                };

                // Overwrite the subsidiary property with the correct subsidiary based on the sales entity
                setFields.subsidiary = parkEntity;
                // Overwrite the project template property
                setFields.projecttemplate = configuration().project.projecttemplates.parkdevelopmentkavelproject;
                // Overwrite the project class property
                setFields.custentity_ep_project_class = [`${configuration().project.projectclass.development}`];

                setFields.custentity_ep_dual_park_project = true;

                const recProject = record.create({
                    type: record.Type.JOB,
                    isDynamic: true
                });

                for (let prop in setFields) {
                    recProject.setValue({fieldId: prop, value: setFields[prop], ignoreFieldChange: false});
                }

                const recordId = recProject.save({enableSourcing: true, ignoreMandatoryFields: true});

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    if (recordId) {
                        log.debug('Park Development Project created', recordId);
                    }
                }

                if (recordId) {
                    return {
                        recordId,
                        type: 'Park Development Project'
                    };
                }

            } catch (e) {
                log.error('createParkDevelopmentEntityProject error', {
                    error: e.toString()
                });
            }
        }

        /**
         * Helper function for handleCreateProjectsFromLot
         * Create one or two projects based on the sales or park entity after the kavel record has been created
         * See https://europarcs.atlassian.net/browse/NS-62
         * @param args
         */
        const createSalesEntityProject = (...args) => {
            try {
                const id = args[0];
                let objSetFields = args[1];
                const salesEntity = args[2]
                const scriptType = args[3];
                const ctx = args[4];

                const entityConfigData = getEntityConfigData().custentity_ep_entity_config;

                /**
                 * Specifically made for https://europarcs.atlassian.net/browse/NS-102
                 */
                if (scriptType === getScriptType().CSV_IMPORT) {
                    objSetFields.companyname = createProjectName({
                        projectlocation: objSetFields.custentity_ep_pms_projectt,
                        jobtype: objSetFields.jobtype,
                        projectclass: [configuration().project.projectclass.sales],
                        park: objSetFields.cseg_erp_park,
                        subsidiary: objSetFields.subsidiary,
                        projecttitle: objSetFields.custentity_ep_pms_projectt,
                        context: ctx
                    });
                }



                const setFields = {
                    ...objSetFields
                };

                log.debug('entityConfigData', entityConfigData);

                // Overwrite the subsidiary property with the correct subsidiary based on the sales entity
                setFields.subsidiary = salesEntity;
                // Overwrite the project template property
                // setFields.projecttemplate = sslib.configuration().project.projecttemplates.parkdevelopmentkavelproject;
                // Overwrite the project class property
                setFields.custentity_ep_project_class = [`${configuration().project.projectclass.sales}`];

                setFields.custentity_ep_entity_config = JSON.parse(entityConfigData);

                setFields.custentity_ep_dual_sales_project = true;

                const recProject = record.create({
                    type: record.Type.JOB,
                    isDynamic: true
                });

                for (let prop in setFields) {

                    if (prop === 'custentity_ep_entity_config') {
                        recProject.setValue({fieldId: 'custentity_ep_entity_config', value: JSON.stringify(setFields[prop]), ignoreFieldChange: false});
                    } else {
                        recProject.setValue({fieldId: prop, value: setFields[prop], ignoreFieldChange: false});
                    }


                    log.debug('setValue fieldId', prop)
                    log.debug('setValue value', setFields[prop])
                }

                const recordId = recProject.save({enableSourcing: true, ignoreMandatoryFields: true});

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    if (recordId) {
                        log.debug('Sales Project created', recordId);
                    }
                }

                if (recordId) {
                    return {
                        recordId,
                        type: 'Sales Entity Project'
                    };
                }
            } catch (e) {
                log.error('createSalesEntityProject error', {
                    error: e.toString()
                });
            }
        }

        /**
         * Getting necessary config data for entity record types
         * See https://europarcs.atlassian.net/browse/NS-17
         * @param args
         * @returns {{value: string, fieldId: string}}
         */
        const getEntityConfigData = (...args) => {
            try {
                const data = {
                    domain: `https://${getDomain()}`,
                    urlBackend: getSuiteletDeployment('customdeploy_ep_sl_backend'),
                    currentUser: runtime.getCurrentUser()
                };

                return {'custentity_ep_entity_config': JSON.stringify(data)}

            } catch (e) {
                log.error('getEntityConfigData error', {
                    error: e.toString()
                });
            }
        }

        /**
         * Helper function for handleRelatedTransactions
         * This function will update the sales order
         * @param args
         */
        const handleProjectTransferSalesOrder = (...args) => {
            const salesOrderId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];

            try {
                const objRecord =  record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId,
                    isDynamic: true
                });

                const orderStatus = objRecord.getValue('orderstatus');

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('handleProjectTransferSalesOrder called', {
                        salesOrderId,
                        projectId,
                        projectIdNew,
                        orderStatus,
                    });
                }

                if (orderStatus === configuration().salesorder.status.closed) {
                    objRecord.setValue({fieldId:'custbody_ep_sales_order_status', value: configuration().salesorder.customStatus.cancellation});

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('handleProjectTransferSalesOrder closed clause');
                    }
                }
                else if (orderStatus === configuration().salesorder.status.pendingApproval) {
                    objRecord.setValue({fieldId:'custbody_ep_sales_order_status', value: configuration().salesorder.customStatus.cancellation});

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('handleProjectTransferSalesOrder pendingApproval clause');
                    }

                    closeSalesOrder(objRecord);
                } else if (orderStatus === configuration().salesorder.status.billed) {
                    objRecord.setValue({fieldId:'custbody_ep_sales_order_status', value: configuration().salesorder.customStatus.cancellation});
                } else {
                    objRecord.setValue({fieldId:'custbody_ep_sales_order_status', value: configuration().salesorder.customStatus.cancellation});
                    closeSalesOrder(objRecord);
                }
                objRecord.setValue({fieldId:'custbody_ep_sales_order_status', value: configuration().salesorder.customStatus.cancellation});

                // Mark the completion of the transfer project feature
                objRecord.setValue({fieldId:'custbody_ep_tp_completed', value: true});

                const savedSalesOrderId = objRecord.save({ignoreMandatoryFields: true});

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('handleTransferSalesOrd', {
                        salesOrderId,
                        orderStatus,
                        taskId
                    });
                }

                // When the sales order was saved
                if (savedSalesOrderId) {
                    return {
                        transaction: savedSalesOrderId,
                        type: 'Sales Order',
                        transferred: true
                    }
                } else {
                    return {
                        transaction: savedSalesOrderId,
                        type: 'Sales Order',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleTransferSalesOrd', {
                    taskId,
                    error: e.toString()
                });
            }
        }

        /**
         * Helper function for handleRelatedTransactions
         * This function will update the Purchase order
         * @param args
         */
        const handleProjectTransferPurchaseOrder = (...args) => {
            const purchaseOrderId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];
            const fieldId = 'customer';

            try {
                const objRecord =  record.load({
                    type: record.Type.PURCHASE_ORDER,
                    id: purchaseOrderId,
                    isDynamic: true
                });

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('handleProjectTransferPurchaseOrder', {
                        purchaseOrderId,
                        projectId,
                        projectIdNew
                    });
                }

                const sublistId = 'item';
                const numLines = objRecord.getLineCount({
                    sublistId
                });

                const entities = [];

                // Iterate through each sublist line
                for (let i = 0; i < numLines; i++) {
                    const entity = objRecord.getSublistValue({
                        sublistId: sublistId,
                        fieldId: fieldId,
                        line: i
                    });

                    // Only grab the sublist line where the entity equals the project
                    if (entity === projectId) {
                        entities.push({
                            line: i,
                            entity
                        });
                    }

                    entities.every( (entity) => {

                        objRecord.selectLine({
                            sublistId: sublistId,
                            line: entity.line
                        });

                        log.debug('sublist line', entity.line);
                        log.debug('projectIdNew', projectIdNew);

                        objRecord.setCurrentSublistValue({
                            sublistId: sublistId,
                            fieldId: 'customer',
                            value: projectIdNew,
                            ignoreFieldChange: false
                        });

                        objRecord.setCurrentSublistValue({
                            sublistId: sublistId,
                            fieldId: 'custcol_ep_ir_entity',
                            value: projectIdNew,
                            ignoreFieldChange: false
                        });

                        objRecord.commitLine({sublistId: sublistId});
                        return true;
                    });
                }

                // Mark the completion of the transfer project feature
                // Disabled the completion of the transfer project feature as per NS-161 (https://europarcs.atlassian.net/browse/NS-161)
                // objRecord.setValue({fieldId:'custbody_ep_tp_completed', value: true});

                const savedPurchaseOrderId = objRecord.save({ignoreMandatoryFields: true});

                // When the purchase order was saved
                if (savedPurchaseOrderId) {
                    return {
                        transaction: savedPurchaseOrderId,
                        type: 'Purchase Order',
                        transferred: true
                    }
                } else {
                    return {
                        transaction: savedPurchaseOrderId,
                        type: 'Purchase Order',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleTransferPurchOrd error', {
                    taskId,
                    error: e.toString()
                });

                return {
                    transaction: purchaseOrderId,
                    type: 'Purchase Order',
                    transferred: false,
                    error: e
                }
            }
        }

        /**
         * Helper function for handleRelatedTransactions
         * This function will update the Vendor Bill
         * @param args
         */
        const handleProjectTransferVendorBill = (...args) => {
            const vendorBillId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];
            const sublists = ['item', 'expense'];

            const objSublist = {
                item: [],
                expense: []
            };

            try {
                const objRecord =  record.load({
                    type: record.Type.VENDOR_BILL,
                    id: vendorBillId,
                    isDynamic: true
                });

                sublists.forEach((sublist) => {
                    for (let i = 0; i < objRecord.getLineCount({sublistId: sublist}); i++) {
                        const customer = objRecord.getSublistValue({
                            sublistId: sublist,
                            fieldId: 'customer',
                            line: i
                        });

                        // Build an object from the current sublist which can be used for getting additional data
                        // Please note that in the next code block the customer value could be changed!
                        objSublist[sublist].push({
                            line: i,
                            value: customer
                        });
                    }
                });

                // Iterate through the objSublist object and set the sublists when needed with the new project id's
                for (let key in objSublist) {
                    objSublist[key].every( (item) => {
                        if (item.value === projectId) {
                            objRecord.selectLine({
                                sublistId: key,
                                line: item.line
                            });

                            objRecord.setCurrentSublistValue({
                                sublistId: key,
                                fieldId: 'customer',
                                value: projectIdNew,
                                ignoreFieldChange: false
                            });

                            objRecord.commitLine({sublistId: key});
                        }
                        return true;
                    });
                }


                log.debug('handleProjectTransferVendorBill', {
                    vendorBillId,
                    projectId,
                    projectIdNew,
                    objSublist
                });

                // Mark the completion of the transfer project feature
                // Disabled the completion of the transfer project feature as per NS-161 (https://europarcs.atlassian.net/browse/NS-161)
                // objRecord.setValue({fieldId:'custbody_ep_tp_completed', value: true});

                const savedVendorBillId = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true})

                // When the Vendor Bill was saved
                if (savedVendorBillId) {
                    return {
                        transaction: savedVendorBillId,
                        type: 'Vendor Bill',
                        transferred: true
                    }
                } else {
                    return {
                        transaction: savedVendorBillId,
                        type: 'Vendor Bill',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferVendorBill error', {
                    taskId,
                    error: e.toString()
                });

                return {
                    transaction: vendorBillId,
                    type: 'Vendor Bill',
                    transferred: false,
                    error: e
                }
            }
        }

        /**
         * Helper function for project transfer feature
         * See https://europarcs.atlassian.net/browse/NS-77
         *
         * @param args
         * @returns {{transferred: boolean, type: string, transaction: *}|{transferred: boolean, type: string, error, transaction: *}}
         */
        const handleProjectTransferVendorCredit = (...args) => {
            const vendorCreditId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];
            const sublists = ['item', 'expense'];

            const objSublist = {
                item: [],
                expense: []
            };

            try {
                const objRecord =  record.load({
                    type: record.Type.VENDOR_CREDIT,
                    id: vendorCreditId,
                    isDynamic: true
                });

                sublists.forEach((sublist) => {
                    for(let i = 0; i < objRecord.getLineCount({sublistId: sublist}); i++) {
                        const customer = objRecord.getSublistValue({
                            sublistId: sublist,
                            fieldId: 'customer',
                            line: i
                        });

                        // Build an object from the current sublist which can be used for getting additional data
                        // Please note that in the next code block the customer value could be changed!
                        objSublist[sublist].push({
                            line: i,
                            value: customer
                        });
                    }
                });

                // Iterate through the objSublist object and set the sublists when needed with the new project id's
                for (let key in objSublist) {
                    objSublist[key].every( (item) => {
                        if (item.value === projectId) {
                            objRecord.selectLine({
                                sublistId: key,
                                line: item.line
                            });

                            objRecord.setCurrentSublistValue({
                                sublistId: key,
                                fieldId: 'customer',
                                value: projectIdNew,
                                ignoreFieldChange: false
                            });

                            objRecord.commitLine({sublistId: key});
                        }
                        return true;
                    });
                }

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('handleProjectTransferVendorCredit', {
                        vendorCreditId,
                        projectId,
                        projectIdNew,
                        objSublist
                    });
                }

                // Mark the completion of the transfer project feature
                // Disabled the completion of the transfer project feature as per NS-161 (https://europarcs.atlassian.net/browse/NS-161)
                // objRecord.setValue({fieldId:'custbody_ep_tp_completed', value: true});

                const savedVendorCreditId = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true})

                // When the Vendor Credit was saved
                if (savedVendorCreditId) {
                    return {
                        transaction: savedVendorCreditId,
                        type: 'Vendor Credit',
                        transferred: true
                    }
                } else {
                    return {
                        transaction: savedVendorCreditId,
                        type: 'Vendor Credit',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferVendorCredit error', {
                    taskId,
                    error: e.toString()
                });

                return {
                    transaction: vendorCreditId,
                    type: 'Vendor Bill',
                    transferred: false,
                    error: e
                }
            }
        }

        /**
         * Helper function for project transfer feature
         * See https://europarcs.atlassian.net/browse/NS-77
         *
         * @param args
         * @returns {{transferred: boolean, type: string, transaction: *}|{transferred: boolean, type: string, error, transaction: *}}
         */
        const handleProjectTransferJournal = (...args) => {
            const journalEntryId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];
            const sublistId = 'line';

            try {

                const objRecord = record.load({
                    id: journalEntryId,
                    type: record.Type.JOURNAL_ENTRY,
                    isDynamic: true
                });

                const numLines = objRecord.getLineCount({
                    sublistId
                });
                const entities = [];

                // Iterate through each sublist line
                for(let i = 0; i < numLines; i++) {
                    const entity = objRecord.getSublistValue({
                        sublistId: sublistId,
                        fieldId: 'entity',
                        line: i
                    });

                    // Only grab the sublist line where the entity equals the project
                    if (entity === projectId) {
                        entities.push({
                            line: i,
                            entity
                        });

                        objRecord.selectLine({
                            sublistId: 'line',
                            line: i
                        });

                        objRecord.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'entity',
                            value: projectIdNew,
                            ignoreFieldChange: false
                        });

                        objRecord.commitLine({sublistId: sublistId});

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('handleTransferJournal', {
                                taskId,
                                message: `Line ${i} has been updated. Entity was ${entity} and is ${projectIdNew} now.`
                            });
                        }
                    }
                }

                if (entities.length > 0) {
                    // Disabled the completion of the transfer project feature as per NS-161 (https://europarcs.atlassian.net/browse/NS-161)
                    // objRecord.setValue({fieldId: 'custbody_ep_tp_completed', value: true});
                    const savedJournalEntryId = objRecord.save({ignoreMandatoryFields: true, enableSourcing: true});

                    // When the journal entry was saved
                    if (savedJournalEntryId) {
                        return {
                            transaction: savedJournalEntryId,
                            type: 'Journal Entry',
                            transferred: true
                        }
                    } else {
                        return {
                            transaction: savedJournalEntryId,
                            type: 'Journal Entry',
                            transferred: false
                        }
                    }
                } else {
                    return {
                        transaction: journalEntryId,
                            type: 'Journal Entry',
                            transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferJournal error', {
                    error: e.toString()
                });

                return {
                    transaction: journalEntryId,
                    type: 'Journal Entry',
                    transferred: false,
                    error: e.message
                }
            }
        }

        /**
         * Helper function for project transfer feature
         * See https://europarcs.atlassian.net/browse/NS-77
         *
         * @param args
         * @returns {{transferred: boolean, type: string, transaction: *}|{transferred: boolean, type: string, error, transaction: *}}
         */
        const handleProjectTransferAdvancedICJournal = (...args) => {
            const journalEntryId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];
            const sublistId = 'line';

            try {

                const objRecord = record.load({
                    id: journalEntryId,
                    type: record.Type.ADV_INTER_COMPANY_JOURNAL_ENTRY,
                    isDynamic: true
                });

                const numLines = objRecord.getLineCount({
                    sublistId
                });
                const entities = [];

                // Iterate through each sublist line
                for(let i = 0; i < numLines; i++) {
                    const entity = objRecord.getSublistValue({
                        sublistId: sublistId,
                        fieldId: 'entity',
                        line: i
                    });

                    // Only grab the sublist line where the entity equals the project
                    if (entity === projectId) {
                        entities.push({
                            line: i,
                            entity
                        });

                        objRecord.selectLine({
                            sublistId: 'line',
                            line: i
                        });

                        objRecord.setCurrentSublistValue({
                            sublistId: 'line',
                            fieldId: 'entity',
                            value: projectIdNew,
                            ignoreFieldChange: false
                        });

                        objRecord.commitLine({sublistId: sublistId});

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('handleTransferJournal', {
                                taskId,
                                message: `Line ${i} has been updated. Entity was ${entity} and is ${projectIdNew} now.`
                            });
                        }
                    }
                }

                if (entities.length > 0) {
                    // Disabled the completion of the transfer project feature as per NS-161 (https://europarcs.atlassian.net/browse/NS-161)
                    // objRecord.setValue({fieldId: 'custbody_ep_tp_completed', value: true});
                    const savedJournalEntryId = objRecord.save({ignoreMandatoryFields: true, enableSourcing: true});

                    // When the journal entry was saved
                    if (savedJournalEntryId) {
                        return {
                            transaction: savedJournalEntryId,
                            type: 'Journal Entry',
                            transferred: true
                        }
                    } else {
                        return {
                            transaction: savedJournalEntryId,
                            type: 'Journal Entry',
                            transferred: false
                        }
                    }
                } else {
                    return {
                        transaction: journalEntryId,
                        type: 'Journal Entry',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferJournal error', {
                    error: e.toString()
                });

                return {
                    transaction: journalEntryId,
                    type: 'Journal Entry',
                    transferred: false,
                    error: e.message
                }
            }
        }

        const handleProjectTransferItemReceipt = ({id, oldproject, newproject, taskId}) => {
            try {
                const sublistId = 'item';
                const objRecord = record.load({
                    id: id,
                    type: record.Type.ITEM_RECEIPT,
                    isDynamic: true
                });

                const numLines = objRecord.getLineCount({
                    sublistId: sublistId
                });

                const entities = [];

                // Iterate through each sublist line
                for(let i = 0; i < numLines; i++) {
                    const entity = objRecord.getSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custcol_ep_ir_entity',
                        line: i
                    });

                    // Only grab the sublist line where the entity equals the project
                    if (entity === oldproject) {
                        entities.push({
                            line: i,
                            entity
                        });

                        objRecord.selectLine({
                            sublistId: sublistId,
                            line: i
                        });

                        objRecord.setCurrentSublistValue({
                            sublistId: sublistId,
                            fieldId: 'custcol_ep_ir_entity',
                            value: newproject,
                            ignoreFieldChange: false
                        });

                        objRecord.commitLine({sublistId: sublistId});

                        if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                            log.debug('handleTransferItemReceipt', {
                                taskId,
                                message: `Line ${i} has been updated. Entity was ${entity} and is ${newproject} now.`
                            });
                        }
                    }
                }

                if (entities.length > 0) {
                    const savedItemReceiptId = objRecord.save({ignoreMandatoryFields: true, enableSourcing: true});

                    // When the itemm receipt was saved
                    if (savedItemReceiptId) {
                        return {
                            transaction: savedItemReceiptId,
                            type: 'Item Receipt',
                            transferred: true
                        }
                    } else {
                        return {
                            transaction: savedItemReceiptId,
                            type: 'Item Receipt',
                            transferred: false
                        }
                    }
                } else {
                    return {
                        transaction: id,
                        type: 'Item Receipt',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferItemReceipt error', {
                    error: e.toString()
                });

                return {
                    transaction: id,
                    type: 'Item Receipt',
                    transferred: false,
                    error: e.message
                }
            }

        }


        /**
         * Helper function for project transfer feature
         * See https://europarcs.atlassian.net/browse/NS-77
         *
         * @param args
         * @returns {{transferred: boolean, type: string, transaction: *}|{transferred: boolean, type: string, error, transaction: *}}
         */
        const handleProjectTransferInvoice = (...args) => {

            const invoiceId = args[0];
            const projectId = args[1];
            const projectIdNew = args[2];
            const taskId = args[3];

            try {

                const objRecord = record.transform({
                    fromType: record.Type.INVOICE,
                    fromId: invoiceId,
                    toType: record.Type.CREDIT_MEMO
                });

                record.submitFields({
                    type: record.Type.INVOICE,
                    id: invoiceId,
                    values: {
                        custbody_ep_tp_completed: true
                    },
                    options: {
                        enablesourcing: true,
                        ignoreMandatoryFields: true
                    }
                });

                const savedCreditMemoId = objRecord.save();

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('savedCreditMemoId', savedCreditMemoId);
                }

                // When the journal entry was saved
                if (savedCreditMemoId) {
                    return {
                        transaction: savedCreditMemoId,
                        type: 'Credit Memo',
                        transferred: true
                    }
                } else {
                    return {
                        transaction: savedCreditMemoId,
                        type: 'Credit Memo',
                        transferred: false
                    }
                }
            } catch (e) {
                log.error('handleProjectTransferInvoice error', {
                    error: e.toString()
                });

                return {
                    transaction: invoiceId,
                    type: 'Invoice',
                    transferred: false,
                    error: e.message
                }
            }
        }

        /**
         * Helper function for project transfer feature
         * See https://europarcs.atlassian.net/browse/NS-77
         *
         * @param args
         * @returns {{transferred: boolean, newProjectSaved, type: string, transaction: *}|{transferred: boolean, type: string, error, transaction: *}}
         */
        const handleProjectTransferFields = (...args) => {
            const projectId = args[0];
            const projectIdNew = args[1];
            const taskId = args[2];
            let newProjectSaved;

            try {

                // Load the old project and get the necessary fields
                const objRecordOld = record.load({
                    type: record.Type.JOB,
                    id: projectId,
                    isDynamic: true
                });

                const fields = [
                    {
                        id: 'custentity_ep_prj_exp_so_final',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_project_so_final_date',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_prj_exp_acc_in_order',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_prj_exp_acc_in_order',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_prj_date_acc_in_order',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_expected_chalet',
                        type: 'date'
                    },
                    {
                        id: 'custentity_delivery_date_chalet',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_exp_internal_date_of_real',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_prj_internal_date_of_real',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_project_punch_list_compl',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_expected_date_realization',
                        type: 'date'
                    },
                    {
                        id: 'custentity_date_of_realization',
                        type: 'date'
                    },
                    {
                        id: 'custentity_date_of_realization',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_e_project_punch_list_compl',
                        type: 'date'
                    },
                    {
                        id: 'custentity_ep_memo',
                        type: 'string'
                    },
                    {
                        id: 'custentity_ep_reason_for_delay',
                        type: 'multiselect'
                    },
                    {
                        id: 'custentity_ep_prj_commitment',
                        type: 'list'
                    }]

                const objFieldData = [];

                fields.forEach( (field) => {
                    const value = objRecordOld.getValue({fieldId: field.id});

                    if (value !== null && value !== "" && value.length !== 0){
                        objFieldData.push({
                            id: field.id,
                            value: value,
                            type: field.type
                        });
                    }
                });

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('objFieldData', objFieldData);
                }

                if (objFieldData.length > 0) {

                    // Now load the new project and populate the previously fetched fields
                    const objRecord  = record.load({
                        type: record.Type.JOB,
                        id: projectIdNew,
                        isDynamic: true
                    });

                    objFieldData.forEach( (field) => {
                        if (field.type === 'date') {
                            objRecord.setValue({fieldId: field.id, value: format.parse({
                                    value: field.value,
                                    type: format.Type.DATE
                                }), ignoreFieldChange: true})
                        } else if (field.type === 'multiselect') {
                            objRecord.setValue({
                                fieldId: field.id,
                                value: field.value
                            });
                        } else {
                            objRecord.setValue({
                                fieldId: field.id,
                                value: field.value
                            });
                        }
                    });

                    newProjectSaved = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});

                    // When the project fields were saved at the new project, mark the transfer completed at the old project
                    if (newProjectSaved)  {
                        objRecordOld.setValue({
                            fieldId: 'custentity_ep_tp_completed',
                            value: true,
                            ignoreFieldChange: true
                        });

                        objRecordOld.save({enableSourcing: true, ignoreMandatoryFields: true});
                    }
                }

                return {
                    transaction: projectId,
                    type: 'Project Fields',
                    transferred: true,
                    newProjectSaved
                }


                // // When the journal entry was saved
                // if (savedCreditMemoId) {
                //     return {
                //         transaction: savedCreditMemoId,
                //         type: 'Credit Memo',
                //         transferred: true
                //     }
                // } else {
                //     return {
                //         transaction: savedCreditMemoId,
                //         type: 'Credit Memo',
                //         transferred: false
                //     }
                // }
            } catch (e) {
                log.error('handleProjectTransferFields error', {
                    error: e.toString()
                });

                return {
                    transaction: projectId,
                    type: 'Project Fields',
                    transferred: false,
                    error: e.message
                }
            }
        }

        // Helper function for project transfer feature
        // See https://europarcs.atlassian.net/browse/NS-77
        const hasProjectFieldsTransferData = (...args) => {

            const projectOld = args[0];
            try {
                const querySuiteQl = (`
                    SELECT
                        job.custentity_ep_natary_name,
                        job.custentity_ep_notary_delivery_date,
                        job.custentity_ep_ex_notary_date,
                        job.custentity_ep_notary_pass_date,
                        job.custentity_ep_notary_remarks,
                        job.custentity_ep_prj_exp_so_final,
                        job.custentity_ep_project_so_final_date,
                        job.custentity_ep_prj_exp_acc_in_order,
                        job.custentity_ep_prj_exp_acc_in_order,
                        job.custentity_ep_prj_date_acc_in_order,
                        job.custentity_ep_expected_chalet,
                        job.custentity_delivery_date_chalet,
                        job.custentity_ep_exp_internal_date_of_real,
                        job.custentity_ep_prj_internal_date_of_real,
                        job.custentity_ep_project_punch_list_compl,
                        job.custentity_ep_expected_date_realization,
                        job.custentity_date_of_realization,
                        job.custentity_date_of_realization,
                        job.custentity_ep_e_project_punch_list_compl,
                        job.custentity_ep_memo,
                        job.custentity_ep_reason_for_delay,
                        job.custentity_ep_prj_commitment
                    FROM
                        job
                    WHERE
                        job.id = ${projectOld}
                `);

                const objQueryResult = queryExecute(querySuiteQl);

                if (objQueryResult && objQueryResult.recordCount > 0) {

                    if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                        log.debug('hasProjectFieldsTransferData objQueryResult', objQueryResult);
                    }

                    // We know will perform a check if all field values has data. The search result
                    // will return an object and by using the Object.keys method we will get the length
                    // which represents the amount of fields that are being used.

                    // We then check if all values are null if that's the case we return a false or else a true
                    // So this function hasProjectFieldsTransferData will simply have data or not.
                    const lengthProjectFields = Object.keys(objQueryResult.records[0]).length;
                    const projectFields = objQueryResult.records[0];
                    const nulls = [];

                    for (let prop in projectFields) {
                        if (projectFields[prop] === null) {
                            nulls.push(prop);
                        }
                    }

                    return nulls.length !== lengthProjectFields;
                } else {
                    return false;
                }

            } catch (e) {
                log.error('hasProjectFieldsTransferData error', {
                    error: e.toString()
                })
            }
        }

        const handleProjectTransferMarkComplete = (...args) => {
            const projectId = args[0];
            const projectIdNew = args[1];
            const taskId = args[2];

            try {
                const objRecord = record.load({
                    type: record.Type.JOB,
                    id: projectId,
                    isDynamic: true
                });

                objRecord.setValue({fieldId: 'custentity_ep_trans_transfer_to_new_prj', value: true})
                objRecord.setValue({fieldId: 'entitystatus', value: 18}); // 18 = Wrong customer/project

                const savedProjectId = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});

                if (savedProjectId) {
                    return {
                        transaction: savedProjectId,
                        type: 'Mark Complete',
                        completed: true
                    }
                } else {
                    return {
                        transaction: projectId,
                        type: 'Mark Complete',
                        completed: false
                    }
                }

                // // When the journal entry was saved
                // if (savedCreditMemoId) {
                //     return {
                //         transaction: savedCreditMemoId,
                //         type: 'Credit Memo',
                //         transferred: true
                //     }
                // } else {
                //     return {
                //         transaction: savedCreditMemoId,
                //         type: 'Credit Memo',
                //         transferred: false
                //     }
                // }
            } catch (e) {
                log.error('handleProjectTransferMarkComplete error', {
                    error: e.toString()
                });

                return {
                    transaction: projectId,
                    type: 'Mark Complete',
                    completed: false,
                    error: e.message
                }
            }
        }

        /**
         * Get any sublist data from any given record type by it's internal id
         * @param args
         * @returns {{}}
         */
        const getRecordSublistData = (...args) => {
            const id = args[0];
            const recordType = args[1];

            try {
                if (id && recordType) {

                    const rec = record.load({
                        id: id,
                        type: record.Type[recordType],
                        isDynamic: true
                    })

                    let data = {}
                    const sublistIds = rec.getSublists();

                    // loop through all sublists for this record type
                    for (let sublistId of sublistIds) {
                        // add a property to the object for each sublistId
                        data[sublistId] = []

                        // get the columns of the sublist
                        let sublistFields = rec.getSublistFields({ sublistId })
                        let count = rec.getLineCount({ sublistId })

                        // loop through the lines of the sublist and build an object for each
                        for(let line = 0; line < count; line++) {
                            let x = {}
                            for (let fieldId of sublistFields) {
                                x[fieldId] = rec.getSublistValue({ sublistId, fieldId, line })
                            }
                            data[sublistId].push(x)
                        }
                    }
                    return data
                }
            } catch (e) {
                log.error('createRecordData error', {
                    error: e.toString()
                });
            }


        }


        /**
         * Helper function for handleTransferSalesOrd
         * This function will cancel or close a sales order by setting the sublist line field isclosed to true
         * @param args
         */
        const closeSalesOrder = (...args) => {
            const objRecord = args[0];
            const taskId = args[1];

            try {
                const itemcounts = objRecord.getLineCount({
                    sublistId: 'item'
                });

                for (let i = 0; i < itemcounts; i++) {
                    objRecord.selectLine({
                        sublistId: 'item',
                        line: i
                    }).setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'isclosed',
                        line: i,
                        value: true,
                        ignoreFieldChange: true
                    }).commitLine({
                        sublistId: 'item',
                        line: i
                    });
                }
            } catch (e) {
                log.error('closeSalesOrder error', {
                    taskId,
                    error: e.toString()
                })
            }
        }

        /**
         * Helper function for getRelatedTransactionFromProject method in the ep_sl_backend.js
         * Checks if an invoice got a credit memo or an invoice got both a credit and a payment
         * See https://europarcs.atlassian.net/browse/NS-120
         *
         * @param intInvoiceId
         * @returns {*|{records: [], recordCount: number, elapsedTime: number}|{records: any[], recordCount: number, elapsedTime: number}|{records: [], recordCount: number, elapsedTime: number}|{records: Array | any[], recordCount: number, elapsedTime: number}|boolean}
         */
        const checkInvoiceForRelatedCreditsPayments = (intInvoiceId) => {

            try {
                const strQueryString = (`
                SELECT DISTINCT 
                    NT.ID, 
                    --NT.TranDate, 
                    NT.Type,
                    NT.TranID,
                    NT.Status,
                    --NT.ForeignTotal 
                FROM NextTransactionLineLink AS NTLL 
                    INNER JOIN Transaction AS NT ON ( NT.ID = NTLL.NextDoc ) 
                --WHERE  NTLL.PreviousDoc = ${intInvoiceId} 
                --    and 
                --    (NT.TYPE = 'CustCred' or NT.TYPE = 'CustPymt')
                 WHERE ( NTLL.PreviousDoc = ${intInvoiceId} ) 
                    and 
                    NT.TYPE = 'CustCred'  
                ORDER BY NT.ID`);

                const objQueryResult = queryExecute(strQueryString);

                if (runtime.getCurrentScript().logLevel === 'DEBUG') {
                    log.debug('objQueryResult checkInvoiceForRelatedCreditsPayments', objQueryResult);
                }

                // returns true when a related credit memo was found else false
                return objQueryResult && objQueryResult.recordCount > 0;


                // // returns true when a related credit memo was found else false
                // if (objQueryResult && objQueryResult.recordCount === 1 && objQueryResult.records[0].type === 'CustCred') {
                //     return true;
                //
                //     // returns true when a related credit memo and payment was found
                // } else if (objQueryResult && objQueryResult.recordCount === 2 && objQueryResult.records.map( (rec) => ['CustPymt', 'CustCred'].includes(rec.type))) {
                //     return true;
                // }

            } catch (e) {
                log.error('checkInvoiceRelatedCredits error', {
                    error: e.toString()
                });
            }
        }

        /**
         *
         * Disable a transaction line field
         * See https://dev.azure.com/europarcs-crmpartners/ERP/_workitems/edit/9863
         * Entry point: beforeLoad
         *
         * @param ctx - context
         * @param sublistId - string sublist id
         * @param fields - array of field ids
         * @param ctxType - array of context types
         */
        const disableSublistFields = ({ctx, sublistId, fields, ctxType}) => {
            try {
                if (ctxType.indexOf(ctx.type) !== -1 && fields.length > 0)  {

                    fields.forEach((fieldId) => {
                        ctx.form.getSublist({
                            id: sublistId
                        }).getField(fieldId).updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.DISABLED
                        });
                    });
                }
            } catch (e) {
                log.error('disableSublistFields error', e.toString());
            }
        }

        /**
         * Handle the activity codes on line items basis as per https://dev.azure.com/europarcs-crmpartners/ERP/_workitems/edit/9863
         *
         * @param ctx - context
         * @param objConfig - configuration object
         * @param objData - data object
         */
        const handleActivityCodes = ({ctx, objConfig, objData}) => {
            try {
                log.debug('handleActivityCodes', objData);

                if (objData?.sublistItem.length > 0) {
                    const createSuiteQLQuery = (objData) => {
                        return (`
                    SELECT
                        id,
                        custitem_ep_activity_code
                    FROM
                        item
                    WHERE
                        ID in (${objData.sublistItem.map(detail => detail.item.value).join(', ')})
                    ORDER BY 1`
                        );
                    };

                    const queryResult = queryExecute(createSuiteQLQuery(objData));

                    log.debug('queryResult handleActivityCodes', queryResult);

                    if (queryResult.recordCount > 0) {
                        objData.sublistItem.forEach(detail => {
                            const item = queryResult.records.find(record => record.id.toString() === detail.item.value);
                            // Check if custitem_ep_activity_code is not null or undefined
                            if (item && item.custitem_ep_activity_code != null) {
                                detail.activityCode.value = item.custitem_ep_activity_code.toString();
                            }
                        });
                    }

                    log.debug('objData handleActivityCodes enriched', objData);
                }
            } catch (e) {
                log.error('handleActivityCodes error', e.toString());
            }
        }

		/**
         * Get translations
         *
         * @param collection
         * @param keys
         */
        const getTranslations = ({collection, keys}) => {
            return translation.load({
                collections: [{
                    alias: 'myCollection',
                    collection: collection,
                    keys: keys
                }]
            });
        }

        /**
         * Handle the department field as per https://dev.azure.com/europarcs-crmpartners/ERP/_workitems/edit/7967/
         * @param {*} ctx
         * @returns
         */
        const handleDepartmentField = (ctx, originalField, label, mandatory = false) => {
            // Load translation
            const objTranslatedStrings = translation.load({
                collections: [{
                    alias: 'myCollection',
                    collection: 'custcollection_ep_ss_translations',
                    keys: [label]
                }]
            });

            // Add the custom department field
            const customDepartmentField = ctx.form.addField({
                id: 'custpage_ep_department',
                type: serverWidget.FieldType.SELECT,
                label: objTranslatedStrings.myCollection[label](),
            }).setHelpText({
                help: '#18089. This is a custom department field that is filtered by the subsidiary and approval matrix.'
            });

            ctx.form.insertField({
                field : customDepartmentField,
                nextfield : originalField
            });

            // Set the mandatory flag
            if (mandatory) {
                customDepartmentField.isMandatory = true;
            }

            // Disable the standard department field
            const departmentField = ctx.form.getField({ id: originalField });
            if (departmentField) {
                departmentField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });
            }
        }

        /**
         * Add a filtered field based on a 'native' field as per https://dev.azure.com/EuroParcs/ERP/_workitems/edit/25954/
         * @param {*} ctx           - context
         * @param {*} fieldType     - the field type
         * @param {*} originalField - the original field id
         * @param {*} newFieldId    - the new field id
         * @param {*} fieldLabel    - the label of the new field
         * @param {*} helpText      - the help text of the new field
         * @param {*} mandatory     - the mandatory flag
         * @returns
         */
        const handleFilteredField = (ctx, fieldType, originalFieldId, newFieldId, fieldLabel, helpText, mandatory = false) => {
            // Load translation
            const objTranslatedStrings = translation.load({
                collections: [{
                    alias: 'myCollection',
                    collection: 'custcollection_ep_ss_translations',
                    keys: [fieldLabel, helpText]
                }]
            });

            // Add the custom filtered field
            const filteredField = ctx.form.addField({
                id: newFieldId,
                type: fieldType,
                label: objTranslatedStrings.myCollection[fieldLabel](),
            }).setHelpText({
                help: objTranslatedStrings.myCollection[helpText]()
            });


            ctx.form.insertField({
                field : filteredField,
                nextfield : originalFieldId
            });

            // Set the mandatory flag
            if (mandatory) {
                filteredField.isMandatory = true;
            }

            // Disable the standard department field
            const originalField = ctx.form.getField({ id: originalFieldId });
            if (originalField) {
                originalField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });
            }
        }

        /**
         * Handles an error by setting a custom response with the error's message and status.
         * @author Budy Sutjijati
         *
         * @param {Object} title
         * @param {Object} response
         * @param {Object} error
         */
        const handleError = ({title, response = false, error }) => {
            // Log the error with the provided title and error details
            log.error({ title, details: error });

            // Retrieve the error message or provide a default message
            const errorMessage = error.message || 'An unexpected error occurred';

            // If a response object is provided, set headers and write the error response, this should be the case
            // for functions that are being used in backend related calls
            if (response) {
                response.setHeader({
                    name: 'Content-Type',
                    value: 'application/json'
                });
                response.write({
                    output: JSON.stringify({
                        status: 'error',
                        customStatus: error.customStatus || 500,
                        message: errorMessage
                    })
                });
                response.setHeader({
                    name: 'NS-Custom-Status',
                    value: error.customStatus ? error.customStatus.toString() : '500'
                });
            }
        };

        return {
            addExecutionLog,
            checkInvoiceForRelatedCreditsPayments,
            closeSalesOrder,
            configuration,
            copyFieldValue,
            createActivityCodeBasedJournalEntry,
            createDebugMessage,
            createJobId,
            createKavelCRMData,
            createProjectName,
            createTotalPercentageCostBasedJournalEntry,
            currentRecordHasMandatoryFieldsEntered,
            decideJournalEntryPCAType,
            disableSublistFields,
            getBackendScript,
            getCompanyInfo,
            getCompanyPref,
            getConfigRecord,
            getCurrentScript,
            getDefaultLocationFromSubsidiary,
            getDomain,
            getFeatureFlags,
            getLocationBySubsidiaryAndParkName,
            getNetSuiteAccountType,
            getQueryString,
            getRecordSublistData,
            getRecordType,
            getRecordTypeData,
            getRecordTypeFromAbbreviation,
            getScriptType,
            getSuiteletDeployment,
            getSumAllocateAmountsFromPCD,
            getSystemValue,
            getTranslations,
            handleActivityCodes,
            handleCreateProjectsFromLot,
            handleDepartmentField,
            handleError,
            handleFilteredField,
            handleProjectTransferAdvancedICJournal,
            handleProjectTransferFields,
            handleProjectTransferInvoice,
            handleProjectTransferItemReceipt,
            handleProjectTransferJournal,
            handleProjectTransferMarkComplete,
            handleProjectTransferPurchaseOrder,
            handleProjectTransferSalesOrder,
            handleProjectTransferVendorBill,
            handleProjectTransferVendorCredit,
            handleVatNumberPerCountry,
            hasChanged,
            hasProjectFieldsTransferData,
            hideField,
            hideTab,
            isDateFieldChanged,
            isFeatureFlagEnabled,
            isFieldChanged,
            logExecutionTime,
            mustSyncToCrm,
            objectIsEqual,
            queryExecute,
            queryExecute2,
            queryRelatedProjectTransactions,
            recordCRUD,
            recordHasMandatoryFieldsEntered,
            safeExecute,
            sanitizeFileName,
            setSyncCRM,
            status,
            unsetSyncCRM,
            updateRecord
        }
});
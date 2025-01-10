/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NAmdConfig ../amdconfig.json
 * @NModuleScope SameAccount
 *
 * @author Budy Sutjijati
 * @see https://www.linkedin.com/in/budysutjijati/
 *
 * sb_rl_suiterendering.js
 *
 * 888888b.                 888                .d8888b.           888     d8b d8b  d8b          888    d8b
 * 888  "88b                888               d88P  Y88b          888     Y8P Y8P  Y8P          888    Y8P
 * 888  .88P                888               Y88b.               888                           888
 * 8888888K.  888  888  .d88888 888  888       "Y888b.   888  888 888888 8888 888 8888  8888b.  888888 888
 * 888  "Y88b 888  888 d88" 888 888  888          "Y88b. 888  888 888    "888 888 "888     "88b 888    888
 * 888    888 888  888 888  888 888  888            "888 888  888 888     888 888  888 .d888888 888    888
 * 888   d88P Y88b 888 Y88b 888 Y88b 888      Y88b  d88P Y88b 888 Y88b.   888 888  888 888  888 Y88b.  888
 * 8888888P"   "Y88888  "Y88888  "Y88888       "Y8888P"   "Y88888  "Y888  888 888  888 "Y888888  "Y888 888
 *                                   888                                  888      888
 *                              Y8b d88P                                 d88P     d88P
 *                               "Y88P"                                888P"    888P"
 *
 */

define(['N/render', 'N/log', 'N/https', 'N/format',  '../lib/days/dayjs.min', '../lib/days/plugin/customParseFormat'], (render, log, https, format, dayjs, customParseFormat) => {
    /**
     * Handles GET requests for transactions and statements.
     * Determines the correct handler based on the "type" parameter.
     *
     * @param {Object} requestParams - The query parameters sent to the RESTlet.
     * @returns {Object} Response object containing base64 encoded PDF string or an error message.
     */
    const get = (requestParams) => {

        try {
            log.debug('Incoming Request', {
                requestParams: requestParams || 'No parameters provided',
            });

            // Validate the "type" parameter
            if (!requestParams || !requestParams.type) {
                return JSON.stringify({ error: 'Missing required query parameter: type. Valid values are "transaction" or "statement".' });
            }

            const type = requestParams.type.toLowerCase();

            // Event handler mapping
            const handlers = {
                transaction: handleTransaction,
                statement: handleStatement,
            };

            const handler = handlers[type];
            if (!handler) {
                return JSON.stringify({ error: 'Invalid type. Valid values are "transaction" or "statement".' });
            }

            // Call the appropriate handler
            return handler({params: requestParams});

        } catch (error) {
            log.error('Unexpected Error', error);
            return JSON.stringify({ error: 'An unexpected error occurred.', details: error.message });
        }
    };

    const handleTransaction = ({params}) => {
        if (!params.id) {
            return JSON.stringify({ error: 'Missing required query parameter: id.' });
        }

        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return JSON.stringify({ error: 'Invalid id. Must be a valid number.' });
        }

        try {
            const pdfFile = render.transaction({
                entityId: id,
                printMode: render.PrintMode.PDF,
            });

            const pdfContents = pdfFile.getContents();
            if (pdfContents) {
                return JSON.stringify({ id, base64: pdfContents });
            }

            return JSON.stringify({ error: 'Failed to render the transaction. The transaction may not exist or is not accessible.' });
        } catch (error) {
            log.error('Error Rendering Transaction', error);
            return JSON.stringify({ error: 'An unexpected error occurred while rendering the transaction.', details: error.message });
        }
    };

    const handleStatement = ({params}) => {

        try {
            // Extend Day.js with the CustomParseFormat plugin
            dayjs.extend(customParseFormat);

            if (!params.customerid) {
                return JSON.stringify({ error: 'Missing required query parameter: customerid.' });
            }

            const customerid = parseInt(params.customerid, 10);
            if (isNaN(customerid)) {
                return JSON.stringify({ error: 'Invalid customerid. Must be a valid number.' });
            }

            // Validate and parse startDate
            const startDate = params.start;
            if (!startDate) {
                return JSON.stringify({ error: 'Missing required query parameter: startDate.' });
            }

            // Enforce strict parsing for DD/MM/YYYY format
            const parsedStartDate = dayjs(startDate, 'DD/MM/YYYY', true);
            if (!parsedStartDate.isValid()) {
                return JSON.stringify({
                    error: `Invalid startDate format. Expected DD/MM/YYYY but received: ${startDate}.`,
                });
            }

            // Validate and parse endDate
            const endDate = params.end;
            if (!endDate) {
                return JSON.stringify({ error: 'Missing required query parameter: endDate.' });
            }

            // Enforce strict parsing for DD/MM/YYYY format
            const parsedEndDate = dayjs(endDate, 'DD/MM/YYYY', true);
            if (!parsedEndDate.isValid()) {
                return JSON.stringify({
                    error: `Invalid endDate format. Expected DD/MM/YYYY but received: ${endDate}.`,
                });
            }

            // Format dates for NetSuite
            const formattedStartDate = format.format({
                value: parsedStartDate.toDate(), // Convert Day.js object to JavaScript Date
                type: format.Type.DATE,
            });

            const formattedEndDate = format.format({
                value: parsedEndDate.toDate(), // Convert Day.js object to JavaScript Date
                type: format.Type.DATE,
            });

            const pdfFile = render.statement({
                entityId: customerid,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            });

            const pdfContents = pdfFile.getContents();

            if (pdfContents) {
                return JSON.stringify({ customerid, base64: pdfContents });
            }

            return JSON.stringify({ error: 'Failed to render the statement. The customer may not exist or is not accessible.' });
        } catch (error) {
            log.error('Error Rendering Statement', error);
            return JSON.stringify({ error: 'An unexpected error occurred while rendering the statement.', details: error.message });
        }
    };

    /**
     * Expose supported methods.
     */
    return {
        get,
    };
});
const {
    MISDailyEntry,
    MISRawMaterials,
    MISFeedMixingTank,
    MISDigesterData,
    MISSLSData,
    MISRawBiogas,
    MISRawBiogasQuality,
    MISCompressedBiogas,
    MISCompressors,
    MISFertilizerData,
    MISUtilities,
    MISManpowerData,
    MISPlantAvailability,
    MISHSEData,
    MISBiogasData,
    MISFeedData,
    MISPowerData,
    ImportLog,
    User,
    sequelize
} = require('../models');
const auditService = require('../services/auditService');
const XLSX = require('xlsx');
const { Op } = require('sequelize');

const n = (val) => (val === '' || val === null || val === undefined ? 0 : parseFloat(val));

// UPDATE ENTRY - Full nested update support
exports.updateEntry = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { date, status, remarks, rawMaterials, feedMixingTank, digesters, slsMachine, rawBiogas, rawBiogasQuality, compressedBiogas, compressors, fertilizer, utilities, manpower, plantAvailability, hse } = req.body;
        const userId = req.user.id;

        // Find existing entry
        const entry = await MISDailyEntry.findByPk(id, {
            include: [
                { model: MISRawMaterials, as: 'rawMaterials' },
                { model: MISFeedMixingTank, as: 'feedMixingTank' },
                { model: MISDigesterData, as: 'digesters' },
                { model: MISSLSData, as: 'slsMachine' },
                { model: MISRawBiogas, as: 'rawBiogas' },
                { model: MISRawBiogasQuality, as: 'rawBiogasQuality' },
                { model: MISCompressedBiogas, as: 'compressedBiogas' },
                { model: MISCompressors, as: 'compressors' },
                { model: MISFertilizerData, as: 'fertilizer' },
                { model: MISUtilities, as: 'utilities' },
                { model: MISManpowerData, as: 'manpower' },
                { model: MISPlantAvailability, as: 'plantAvailability' },
                { model: MISHSEData, as: 'hse' }
            ]
        });

        if (!entry) {
            await t.rollback();
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Store old values for audit
        const oldValues = entry.toJSON();

        // Update main entry
        await entry.update({
            date: date || entry.date,
            status: status || entry.status,
            review_comment: remarks !== undefined ? remarks : entry.review_comment
        }, { transaction: t });

        // Update or create nested data
        if (rawMaterials) {
            if (entry.rawMaterials) {
                await entry.rawMaterials.update({
                    cow_dung_purchased: n(rawMaterials.cowDungPurchased),
                    cow_dung_stock: n(rawMaterials.cowDungStock),
                    old_press_mud_opening_balance: n(rawMaterials.oldPressMudOpeningBalance),
                    old_press_mud_purchased: n(rawMaterials.oldPressMudPurchased),
                    old_press_mud_degradation_loss: n(rawMaterials.oldPressMudDegradationLoss),
                    old_press_mud_closing_stock: n(rawMaterials.oldPressMudClosingStock),
                    new_press_mud_purchased: n(rawMaterials.newPressMudPurchased),
                    press_mud_used: n(rawMaterials.pressMudUsed),
                    total_press_mud_stock: n(rawMaterials.totalPressMudStock),
                    audit_note: rawMaterials.auditNote
                }, { transaction: t });
            } else {
                await MISRawMaterials.create({
                    entry_id: id,
                    cow_dung_purchased: n(rawMaterials.cowDungPurchased),
                    cow_dung_stock: n(rawMaterials.cowDungStock),
                    old_press_mud_opening_balance: n(rawMaterials.oldPressMudOpeningBalance),
                    old_press_mud_purchased: n(rawMaterials.oldPressMudPurchased),
                    old_press_mud_degradation_loss: n(rawMaterials.oldPressMudDegradationLoss),
                    old_press_mud_closing_stock: n(rawMaterials.oldPressMudClosingStock),
                    new_press_mud_purchased: n(rawMaterials.newPressMudPurchased),
                    press_mud_used: n(rawMaterials.pressMudUsed),
                    total_press_mud_stock: n(rawMaterials.totalPressMudStock),
                    audit_note: rawMaterials.auditNote
                }, { transaction: t });
            }
        }

        if (feedMixingTank) {
            if (entry.feedMixingTank) {
                await entry.feedMixingTank.update({
                    cow_dung_qty: n(feedMixingTank.cowDungFeed?.qty),
                    cow_dung_ts: n(feedMixingTank.cowDungFeed?.ts),
                    cow_dung_vs: n(feedMixingTank.cowDungFeed?.vs),
                    pressmud_qty: n(feedMixingTank.pressmudFeed?.qty),
                    pressmud_ts: n(feedMixingTank.pressmudFeed?.ts),
                    pressmud_vs: n(feedMixingTank.pressmudFeed?.vs),
                    permeate_qty: n(feedMixingTank.permeateFeed?.qty),
                    permeate_ts: n(feedMixingTank.permeateFeed?.ts),
                    permeate_vs: n(feedMixingTank.permeateFeed?.vs),
                    water_qty: n(feedMixingTank.waterQty),
                    slurry_total: n(feedMixingTank.slurry?.total),
                    slurry_ts: n(feedMixingTank.slurry?.ts),
                    slurry_vs: n(feedMixingTank.slurry?.vs),
                    slurry_ph: n(feedMixingTank.slurry?.ph)
                }, { transaction: t });
            } else {
                await MISFeedMixingTank.create({
                    entry_id: id,
                    cow_dung_qty: n(feedMixingTank.cowDungFeed?.qty),
                    cow_dung_ts: n(feedMixingTank.cowDungFeed?.ts),
                    cow_dung_vs: n(feedMixingTank.cowDungFeed?.vs),
                    pressmud_qty: n(feedMixingTank.pressmudFeed?.qty),
                    pressmud_ts: n(feedMixingTank.pressmudFeed?.ts),
                    pressmud_vs: n(feedMixingTank.pressmudFeed?.vs),
                    permeate_qty: n(feedMixingTank.permeateFeed?.qty),
                    permeate_ts: n(feedMixingTank.permeateFeed?.ts),
                    permeate_vs: n(feedMixingTank.permeateFeed?.vs),
                    water_qty: n(feedMixingTank.waterQty),
                    slurry_total: n(feedMixingTank.slurry?.total),
                    slurry_ts: n(feedMixingTank.slurry?.ts),
                    slurry_vs: n(feedMixingTank.slurry?.vs),
                    slurry_ph: n(feedMixingTank.slurry?.ph)
                }, { transaction: t });
            }
        }

        // Update digesters - delete existing and recreate
        if (digesters && Array.isArray(digesters)) {
            await MISDigesterData.destroy({ where: { entry_id: id }, transaction: t });
            const digesterPromises = digesters.map(d => MISDigesterData.create({
                entry_id: id,
                digester_name: d.name,
                feeding_slurry: n(d.feeding?.totalSlurryFeed),
                feeding_ts_percent: n(d.feeding?.avgTs),
                feeding_vs_percent: n(d.feeding?.avgVs),
                discharge_slurry: n(d.discharge?.totalSlurryOut),
                discharge_ts_percent: n(d.discharge?.avgTs),
                discharge_vs_percent: n(d.discharge?.avgVs),
                lignin: n(d.characteristics?.lignin),
                vfa: n(d.characteristics?.vfa),
                alkalinity: n(d.characteristics?.alkalinity),
                vfa_alk_ratio: n(d.characteristics?.vfaAlkRatio),
                ash: n(d.characteristics?.ash),
                density: n(d.characteristics?.density),
                ph: n(d.characteristics?.ph),
                temp: n(d.characteristics?.temperature),
                pressure: n(d.characteristics?.pressure),
                slurry_level: n(d.characteristics?.slurryLevel),
                hrt: n(d.health?.hrt),
                vs_destruction: n(d.health?.vsDestruction),
                olr: n(d.health?.olr),
                balloon_level: n(d.health?.balloonLevel),
                agitator_condition: d.health?.agitatorCondition,
                foaming_level: n(d.health?.foamingLevel)
            }, { transaction: t }));
            await Promise.all(digesterPromises);
        }

        // SLS Machine
        if (slsMachine) {
            const data = {
                water_consumption: n(slsMachine.waterConsumption),
                poly_electrolyte: n(slsMachine.polyElectrolyte),
                solution: n(slsMachine.solution),
                slurry_feed: n(slsMachine.slurryFeed),
                wet_cake_prod: n(slsMachine.wetCakeProduction),
                wet_cake_ts: n(slsMachine.wetCakeTs),
                wet_cake_vs: n(slsMachine.wetCakeVs),
                liquid_produced: n(slsMachine.liquidProduced),
                liquid_ts: n(slsMachine.liquidTs),
                liquid_vs: n(slsMachine.liquidVs),
                liquid_sent_to_lagoon: n(slsMachine.liquidSentToLagoon)
            };
            if (entry.slsMachine) {
                await entry.slsMachine.update(data, { transaction: t });
            } else {
                await MISSLSData.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Raw Biogas
        if (rawBiogas) {
            const data = {
                digester_01_gas: n(rawBiogas.digester01Gas),
                digester_02_gas: n(rawBiogas.digester02Gas),
                digester_03_gas: n(rawBiogas.digester03Gas),
                total_raw_biogas: n(rawBiogas.totalRawBiogas),
                rbg_flared: n(rawBiogas.rbgFlared),
                gas_yield: n(rawBiogas.gasYield)
            };
            if (entry.rawBiogas) {
                await entry.rawBiogas.update(data, { transaction: t });
            } else {
                await MISRawBiogas.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Raw Biogas Quality
        if (rawBiogasQuality) {
            const data = {
                ch4: n(rawBiogasQuality.ch4),
                co2: n(rawBiogasQuality.co2),
                h2s: n(rawBiogasQuality.h2s),
                o2: n(rawBiogasQuality.o2),
                n2: n(rawBiogasQuality.n2)
            };
            if (entry.rawBiogasQuality) {
                await entry.rawBiogasQuality.update(data, { transaction: t });
            } else {
                await MISRawBiogasQuality.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Compressed Biogas
        if (compressedBiogas) {
            const data = {
                produced: n(compressedBiogas.produced),
                ch4: n(compressedBiogas.ch4),
                co2: n(compressedBiogas.co2),
                h2s: n(compressedBiogas.h2s),
                o2: n(compressedBiogas.o2),
                n2: n(compressedBiogas.n2),
                conversion_ratio: n(compressedBiogas.conversionRatio),
                ch4_slippage: n(compressedBiogas.ch4Slippage),
                cbg_stock: n(compressedBiogas.cbgStock),
                cbg_sold: n(compressedBiogas.cbgSold)
            };
            if (entry.compressedBiogas) {
                await entry.compressedBiogas.update(data, { transaction: t });
            } else {
                await MISCompressedBiogas.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Compressors
        if (compressors) {
            const data = {
                compressor_1_hours: n(compressors.compressor1Hours),
                compressor_2_hours: n(compressors.compressor2Hours),
                total_hours: n(compressors.totalHours)
            };
            if (entry.compressors) {
                await entry.compressors.update(data, { transaction: t });
            } else {
                await MISCompressors.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Fertilizer
        if (fertilizer) {
            const data = {
                fom_produced: n(fertilizer.fomProduced),
                inventory: n(fertilizer.inventory),
                sold: n(fertilizer.sold),
                weighted_average: n(fertilizer.weightedAverage),
                revenue_1: n(fertilizer.revenue1),
                lagoon_liquid_sold: n(fertilizer.lagoonLiquidSold),
                revenue_2: n(fertilizer.revenue2),
                loose_fom_sold: n(fertilizer.looseFomSold),
                revenue_3: n(fertilizer.revenue3)
            };
            if (entry.fertilizer) {
                await entry.fertilizer.update(data, { transaction: t });
            } else {
                await MISFertilizerData.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Utilities
        if (utilities) {
            const data = {
                electricity_consumption: n(utilities.electricityConsumption),
                specific_power_consumption: n(utilities.specificPowerConsumption)
            };
            if (entry.utilities) {
                await entry.utilities.update(data, { transaction: t });
            } else {
                await MISUtilities.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Manpower
        if (manpower) {
            const data = {
                refex_srel_staff: n(manpower.refexSrelStaff),
                third_party_staff: n(manpower.thirdPartyStaff)
            };
            if (entry.manpower) {
                await entry.manpower.update(data, { transaction: t });
            } else {
                await MISManpowerData.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // Plant Availability
        if (plantAvailability) {
            const data = {
                working_hours: n(plantAvailability.workingHours),
                scheduled_downtime: n(plantAvailability.scheduledDowntime),
                unscheduled_downtime: n(plantAvailability.unscheduledDowntime),
                total_availability: n(plantAvailability.totalAvailability)
            };
            if (entry.plantAvailability) {
                await entry.plantAvailability.update(data, { transaction: t });
            } else {
                await MISPlantAvailability.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        // HSE
        if (hse) {
            const data = {
                safety_lti: n(hse.safetyLti),
                near_misses: n(hse.nearMisses),
                first_aid: n(hse.firstAid),
                reportable_incidents: n(hse.reportableIncidents),
                mti: n(hse.mti),
                other_incidents: n(hse.otherIncidents),
                fatalities: n(hse.fatalities)
            };
            if (entry.hse) {
                await entry.hse.update(data, { transaction: t });
            } else {
                await MISHSEData.create({ entry_id: id, ...data }, { transaction: t });
            }
        }

        await t.commit();
        await auditService.log(userId, 'UPDATE_MIS_ENTRY', 'MISDailyEntry', id, oldValues, null, req);
        res.json({ message: 'Entry updated successfully' });

    } catch (error) {
        await t.rollback();
        console.error('Update Entry Error:', error);
        res.status(500).json({ message: 'Error updating entry', error: error.message });
    }
};

// DELETE ENTRY - Soft delete recommended
exports.deleteEntry = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const entry = await MISDailyEntry.findByPk(id);
        if (!entry) {
            await t.rollback();
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Store for audit
        const oldValues = entry.toJSON();

        // Soft delete by updating status
        await entry.update({ status: 'Deleted' }, { transaction: t });

        // Or hard delete if required:
        // await entry.destroy({ transaction: t });

        await t.commit();
        await auditService.log(userId, 'DELETE_MIS_ENTRY', 'MISDailyEntry', id, oldValues, null, req);
        res.json({ message: 'Entry deleted successfully' });

    } catch (error) {
        await t.rollback();
        console.error('Delete Entry Error:', error);
        res.status(500).json({ message: 'Error deleting entry', error: error.message });
    }
};

// IMPORT FROM EXCEL
exports.importEntries = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userId = req.user.id;
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const results = {
            total: data.length,
            success: 0,
            failed: 0,
            errors: []
        };

        for (const row of data) {
            const t = await sequelize.transaction();
            try {
                // Map Excel columns to database fields
                const entry = await MISDailyEntry.create({
                    date: row.Date || new Date(),
                    status: row.Status || 'Draft',
                    created_by: userId
                }, { transaction: t });

                // Raw Materials
                await MISRawMaterials.create({
                    entry_id: entry.id,
                    cow_dung_purchased: n(row.CowDungPurchased),
                    cow_dung_stock: n(row.CowDungStock),
                    press_mud_used: n(row.PressMudUsed),
                    total_press_mud_stock: n(row.TotalPressMudStock),
                }, { transaction: t });

                // Feed Mixing Tank
                await MISFeedMixingTank.create({
                    entry_id: entry.id,
                    cow_dung_qty: n(row.CowDungQty),
                    pressmud_qty: n(row.PressmudQty),
                    water_qty: n(row.WaterQty),
                    slurry_total: n(row.SlurryTotal),
                }, { transaction: t });

                // Raw Biogas
                await MISRawBiogas.create({
                    entry_id: entry.id,
                    total_raw_biogas: n(row.TotalRawBiogas),
                    gas_yield: n(row.GasYield),
                }, { transaction: t });

                // Compressed Biogas
                await MISCompressedBiogas.create({
                    entry_id: entry.id,
                    produced: n(row.CBGProduced),
                    cbg_sold: n(row.CBGSold),
                }, { transaction: t });

                // Fertilizer
                await MISFertilizerData.create({
                    entry_id: entry.id,
                    fom_produced: n(row.FOMProduced),
                    sold: n(row.FOMSold),
                }, { transaction: t });

                // Utilities
                await MISUtilities.create({
                    entry_id: entry.id,
                    electricity_consumption: n(row.ElectricityConsumption),
                }, { transaction: t });

                // Plant Availability
                await MISPlantAvailability.create({
                    entry_id: entry.id,
                    working_hours: n(row.WorkingHours),
                    total_availability: n(row.TotalAvailability),
                }, { transaction: t });

                // HSE
                await MISHSEData.create({
                    entry_id: entry.id,
                    safety_lti: n(row.SafetyLTI),
                    near_misses: n(row.NearMisses),
                }, { transaction: t });

                await t.commit();
                results.success++;

            } catch (error) {
                await t.rollback();
                results.failed++;
                results.errors.push({
                    row: row,
                    error: error.message
                });
            }
        }

        // Log import
        await ImportLog.create({
            imported_by: userId,
            filename: req.file.originalname,
            records_processed: results.success,
            records_failed: results.failed,
            status: results.failed === 0 ? 'success' : (results.success > 0 ? 'partial' : 'failed'),
            error_log: JSON.stringify(results.errors)
        });

        res.json({
            message: 'Import completed',
            results
        });

    } catch (error) {
        console.error('Import Error:', error);
        res.status(500).json({ message: 'Error importing data', error: error.message });
    }
};

// EXPORT TO EXCEL
exports.exportEntries = async (req, res) => {
    try {
        const { startDate, endDate, status } = req.query;

        const where = {};
        if (startDate && endDate) {
            where.date = { [Op.between]: [startDate, endDate] };
        }
        if (status) {
            where.status = status;
        }

        const entries = await MISDailyEntry.findAll({
            where,
            include: [
                { model: MISRawMaterials, as: 'rawMaterials' },
                { model: MISFeedMixingTank, as: 'feedMixingTank' },
                { model: MISDigesterData, as: 'digesters' },
                { model: MISSLSData, as: 'slsMachine' },
                { model: MISRawBiogas, as: 'rawBiogas' },
                { model: MISRawBiogasQuality, as: 'rawBiogasQuality' },
                { model: MISCompressedBiogas, as: 'compressedBiogas' },
                { model: MISCompressors, as: 'compressors' },
                { model: MISFertilizerData, as: 'fertilizer' },
                { model: MISUtilities, as: 'utilities' },
                { model: MISManpowerData, as: 'manpower' },
                { model: MISPlantAvailability, as: 'plantAvailability' },
                { model: MISHSEData, as: 'hse' },
                { model: User, as: 'creator', attributes: ['name'] }
            ],
            order: [['date', 'DESC']]
        });

        // Flatten data for Excel
        const excelData = entries.map(e => ({
            Date: e.date,
            Status: e.status,
            CreatedBy: e.creator?.name || '',
            // Raw Materials
            CowDungPurchased: e.rawMaterials?.cow_dung_purchased || 0,
            CowDungStock: e.rawMaterials?.cow_dung_stock || 0,
            PressMudUsed: e.rawMaterials?.press_mud_used || 0,
            // Feed Mixing Tank
            CowDungQty: e.feedMixingTank?.cow_dung_qty || 0,
            PressmudQty: e.feedMixingTank?.pressmud_qty || 0,
            WaterQty: e.feedMixingTank?.water_qty || 0,
            SlurryTotal: e.feedMixingTank?.slurry_total || 0,
            // Raw Biogas
            TotalRawBiogas: e.rawBiogas?.total_raw_biogas || 0,
            GasYield: e.rawBiogas?.gas_yield || 0,
            // Compressed Biogas
            CBGProduced: e.compressedBiogas?.produced || 0,
            CBGSold: e.compressedBiogas?.cbg_sold || 0,
            // Fertilizer
            FOMProduced: e.fertilizer?.fom_produced || 0,
            FOMSold: e.fertilizer?.sold || 0,
            // Utilities
            ElectricityConsumption: e.utilities?.electricity_consumption || 0,
            // Plant Availability
            WorkingHours: e.plantAvailability?.working_hours || 0,
            TotalAvailability: e.plantAvailability?.total_availability || 0,
            // HSE
            SafetyLTI: e.hse?.safety_lti || 0,
            NearMisses: e.hse?.near_misses || 0,
            // Add more fields as needed
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'MIS Entries');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=mis_entries_export.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ message: 'Error exporting data', error: error.message });
    }
};

// DASHBOARD DATA
exports.getDashboardData = async (req, res) => {
    try {
        const { period = 'month' } = req.query; // day, week, month, year

        // Calculate date range
        const now = new Date();
        let startDate;
        switch (period) {
            case 'day':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'year':
                startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
            case 'month':
            default:
                startDate = new Date(now.setMonth(now.getMonth() - 1));
        }

        // Aggregate data
        const entries = await MISDailyEntry.findAll({
            where: {
                date: { [Op.gte]: startDate },
                status: { [Op.notIn]: ['Deleted', 'Draft'] }
            },
            include: [
                { model: MISRawBiogas, as: 'rawBiogas' },
                { model: MISCompressedBiogas, as: 'compressedBiogas' },
                { model: MISFertilizerData, as: 'fertilizer' },
                { model: MISUtilities, as: 'utilities' },
                { model: MISPlantAvailability, as: 'plantAvailability' },
                { model: MISHSEData, as: 'hse' }
            ]
        });

        // Calculate metrics
        const totalRawBiogas = entries.reduce((sum, e) => sum + (e.rawBiogas?.total_raw_biogas || 0), 0);
        const totalCBGProduced = entries.reduce((sum, e) => sum + (e.compressedBiogas?.produced || 0), 0);
        const totalCBGSold = entries.reduce((sum, e) => sum + (e.compressedBiogas?.cbg_sold || 0), 0);
        const totalFOMProduced = entries.reduce((sum, e) => sum + (e.fertilizer?.fom_produced || 0), 0);
        const totalFOMSold = entries.reduce((sum, e) => sum + (e.fertilizer?.sold || 0), 0);
        const avgPlantAvailability = entries.length > 0
            ? entries.reduce((sum, e) => sum + (e.plantAvailability?.total_availability || 0), 0) / entries.length
            : 0;
        const totalElectricityConsumption = entries.reduce((sum, e) => sum + (e.utilities?.electricity_consumption || 0), 0);
        const totalHSEIncidents = entries.reduce((sum, e) => sum + (e.hse?.safety_lti || 0) + (e.hse?.near_misses || 0), 0);

        // Daily trend data
        const dailyData = entries.map(e => ({
            date: e.date,
            rawBiogas: e.rawBiogas?.total_raw_biogas || 0,
            cbgProduced: e.compressedBiogas?.produced || 0,
            cbgSold: e.compressedBiogas?.cbg_sold || 0,
            plantAvailability: e.plantAvailability?.total_availability || 0
        }));

        res.json({
            period,
            summary: {
                totalEntries: entries.length,
                totalRawBiogas,
                totalCBGProduced,
                totalCBGSold,
                totalFOMProduced,
                totalFOMSold,
                avgPlantAvailability: avgPlantAvailability.toFixed(2),
                totalElectricityConsumption,
                totalHSEIncidents
            },
            trends: dailyData
        });

    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
};

// Parse filter params into startDate, endDate (YYYY-MM-DD)
function getDateRangeFromFilter(query) {
    const { startDate, endDate, financialYear, quarter, year } = query;
    let start, end;

    if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
    } else if (financialYear && /^\d{4}-\d{2}$/.test(financialYear)) {
        // e.g. "2024-25" => Apr 1, 2024 to Mar 31, 2025
        const [y1] = financialYear.split('-').map(Number);
        start = new Date(y1, 3, 1);      // April 1
        end = new Date(y1 + 1, 2, 31);  // March 31 next year
    } else if (quarter && year) {
        const y = parseInt(year, 10);
        const q = parseInt(quarter.replace('Q', ''), 10) || 1;
        const monthStart = (q - 1) * 3;  // Q1=0, Q2=3, Q3=6, Q4=9
        start = new Date(y, monthStart, 1);
        end = new Date(y, monthStart + 3, 0);  // last day of quarter
    } else {
        // default: current financial year (Apr to Mar)
        const now = new Date();
        const y = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
        start = new Date(y, 3, 1);
        end = new Date(y + 1, 2, 31);
    }

    return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10)
    };
}

// CONSOLIDATED MIS DATA - aggregates for date range (for Consolidated MIS v2 view)
exports.getConsolidatedData = async (req, res) => {
    try {
        const { startDate, endDate } = getDateRangeFromFilter(req.query);

        const entries = await MISDailyEntry.findAll({
            where: {
                date: { [Op.between]: [startDate, endDate] },
                status: { [Op.notIn]: ['deleted', 'draft'] }
            },
            include: [
                { model: MISRawMaterials, as: 'rawMaterials' },
                { model: MISFeedMixingTank, as: 'feedMixingTank' },
                { model: MISDigesterData, as: 'digesters' },
                { model: MISSLSData, as: 'slsMachine' },
                { model: MISRawBiogas, as: 'rawBiogas' },
                { model: MISRawBiogasQuality, as: 'rawBiogasQuality' },
                { model: MISCompressedBiogas, as: 'compressedBiogas' },
                { model: MISCompressors, as: 'compressors' },
                { model: MISFertilizerData, as: 'fertilizer' },
                { model: MISUtilities, as: 'utilities' },
                { model: MISHSEData, as: 'hse' }
            ],
            order: [['date', 'ASC']]
        });

        const n = (v) => (v === undefined || v === null || v === '' ? 0 : parseFloat(v));
        const sum = (arr, fn) => arr.reduce((s, e) => s + (fn(e) || 0), 0);
        const avg = (arr, fn) => (arr.length ? sum(arr, fn) / arr.length : 0);

        // Group digesters by name (D-01, D-02, D-03) across entries
        const digesterByKey = {};
        entries.forEach(entry => {
            (entry.digesters || []).forEach(d => {
                const key = (d.digester_name || '').replace(/\s+/g, ' ').trim() || 'Unknown';
                if (!digesterByKey[key]) digesterByKey[key] = [];
                digesterByKey[key].push(d);
            });
        });
        const digesterNames = ['Digester 01', 'Digester 02', 'Digester 03'].filter(name =>
            digesterByKey[name]?.length || digesterByKey['D-01']?.length || digesterByKey['D-02']?.length || digesterByKey['D-03']?.length
        );
        const dNames = digesterNames.length ? digesterNames : (Object.keys(digesterByKey).length ? Object.keys(digesterByKey) : ['D-01', 'D-02', 'D-03']);

        const digestersConsolidated = dNames.map(name => {
            const list = digesterByKey[name] || digesterByKey[name.replace('Digester ', 'D-')] || [];
            return {
                name: name.startsWith('Digester') ? name.replace('Digester ', 'D-') : name,
                ts: list.length ? avg(list, d => n(d.feeding_ts_percent) || n(d.discharge_ts_percent)) : 0,
                vs: list.length ? avg(list, d => n(d.feeding_vs_percent) || n(d.discharge_vs_percent)) : 0,
                ph: list.length ? avg(list, d => n(d.ph)) : 0,
                vfaTic: list.length ? avg(list, d => n(d.vfa_alk_ratio)) : 0,
                slurryLevel: list.length ? avg(list, d => n(d.slurry_level)) : 0,
                hrt: list.length ? avg(list, d => n(d.hrt)) : 0,
                olr: list.length ? avg(list, d => n(d.olr)) : 0,
                temp: list.length ? avg(list, d => n(d.temp)) : 0,
                feedingSlurry: sum(list, d => n(d.feeding_slurry)),
                dischargeSlurry: sum(list, d => n(d.discharge_slurry))
            };
        });

        const avgDigester = digestersConsolidated.length ? {
            name: 'Average',
            ts: avg(digestersConsolidated, d => d.ts),
            vs: avg(digestersConsolidated, d => d.vs),
            ph: avg(digestersConsolidated, d => d.ph),
            vfaTic: avg(digestersConsolidated, d => d.vfaTic),
            slurryLevel: avg(digestersConsolidated, d => d.slurryLevel),
            hrt: avg(digestersConsolidated, d => d.hrt),
            olr: avg(digestersConsolidated, d => d.olr),
            temp: avg(digestersConsolidated, d => d.temp)
        } : null;

        const feeding = {
            pressMudD01: sum(entries, e => (e.digesters && e.digesters[0]) ? n(e.digesters[0].feeding_slurry) : 0),
            pressMudD02: sum(entries, e => (e.digesters && e.digesters[1]) ? n(e.digesters[1].feeding_slurry) : 0),
            pressMudD03: sum(entries, e => (e.digesters && e.digesters[2]) ? n(e.digesters[2].feeding_slurry) : 0),
            pressMudTotal: 0,
            cowDungD01: 0,
            cowDungD02: 0,
            cowDungD03: 0,
            cowDungTotal: sum(entries, e => (e.feedMixingTank && n(e.feedMixingTank.cow_dung_qty)) || 0),
            otherFeedstockTotal: 0,
            decanterPermeate: sum(entries, e => (e.feedMixingTank && n(e.feedMixingTank.permeate_qty)) || 0),
            water: sum(entries, e => (e.feedMixingTank && n(e.feedMixingTank.water_qty)) || 0),
            digester03Slurry: sum(entries, e => (e.digesters && e.digesters[2]) ? n(e.digesters[2].discharge_slurry) : 0),
            totalFeedInput: sum(entries, e => (e.feedMixingTank && n(e.feedMixingTank.slurry_total)) || 0)
        };
        feeding.pressMudTotal = (feeding.pressMudD01 || 0) + (feeding.pressMudD02 || 0) + (feeding.pressMudD03 || 0);

        const rawMaterialQuality = {
            tsPercent: avg(entries, e => e.feedMixingTank && n(e.feedMixingTank.slurry_ts)),
            vsPercent: avg(entries, e => e.feedMixingTank && n(e.feedMixingTank.slurry_vs)),
            ph: avg(entries, e => e.feedMixingTank && n(e.feedMixingTank.slurry_ph))
        };

        const biogasQuality = {
            ch4: avg(entries, e => e.rawBiogasQuality && n(e.rawBiogasQuality.ch4)),
            co2: avg(entries, e => e.rawBiogasQuality && n(e.rawBiogasQuality.co2)),
            o2: avg(entries, e => e.rawBiogasQuality && n(e.rawBiogasQuality.o2)),
            h2s: avg(entries, e => e.rawBiogasQuality && n(e.rawBiogasQuality.h2s)),
            n2: avg(entries, e => e.rawBiogasQuality && n(e.rawBiogasQuality.n2))
        };

        const biogasProduction = {
            rbgProduced: sum(entries, e => e.rawBiogas && n(e.rawBiogas.total_raw_biogas)),
            rbgFlared: sum(entries, e => e.rawBiogas && n(e.rawBiogas.rbg_flared)),
            usedInKitchen: 0,
            sentToPurification: sum(entries, e => e.rawBiogas && n(e.rawBiogas.total_raw_biogas)) - sum(entries, e => e.rawBiogas && n(e.rawBiogas.rbg_flared))
        };

        const cbgQuality = {
            ch4: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.ch4)),
            co2: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.co2)),
            o2: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.o2)),
            h2s: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.h2s)),
            n2: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.n2))
        };

        const cbgKg = {
            production: sum(entries, e => e.compressedBiogas && n(e.compressedBiogas.produced)),
            dispatch: sum(entries, e => e.compressedBiogas && n(e.compressedBiogas.cbg_sold)),
            gasYield: entries.length ? (sum(entries, e => e.rawBiogas && n(e.rawBiogas.gas_yield)) / entries.length) : 0,
            cf: avg(entries, e => e.compressedBiogas && n(e.compressedBiogas.conversion_ratio))
        };

        const sls = {
            runHrs: sum(entries, e => e.compressors && (n(e.compressors.compressor_1_hours) + n(e.compressors.compressor_2_hours))),
            slurryFeed: sum(entries, e => e.slsMachine && n(e.slsMachine.slurry_feed)),
            totalSlurryFeed: sum(entries, e => e.slsMachine && n(e.slsMachine.slurry_feed)),
            wetCakeQty: sum(entries, e => e.slsMachine && n(e.slsMachine.wet_cake_prod)),
            wetCakeTS: avg(entries, e => e.slsMachine && n(e.slsMachine.wet_cake_ts)),
            liquidProduced: sum(entries, e => e.slsMachine && n(e.slsMachine.liquid_produced)),
            liquidSentToLagoon: sum(entries, e => e.slsMachine && n(e.slsMachine.liquid_sent_to_lagoon))
        };

        const fomLfom = {
            lfomQty: sum(entries, e => e.fertilizer && n(e.fertilizer.lagoon_liquid_sold)),
            lfomTS: 0,
            fomProduced: sum(entries, e => e.fertilizer && n(e.fertilizer.fom_produced)),
            fomSold: sum(entries, e => e.fertilizer && n(e.fertilizer.sold))
        };

        const slurryManagement = {
            directPurgeFarmers: 0,
            slsInlet: sum(entries, e => e.slsMachine && n(e.slsMachine.slurry_feed)),
            directPurgeLagoon: sum(entries, e => e.slsMachine && n(e.slsMachine.liquid_sent_to_lagoon)),
            totalSlurryOut: sum(entries, e => (e.digesters || []).reduce((s, d) => s + n(d.discharge_slurry), 0)),
            permeateToMixing: sum(entries, e => e.feedMixingTank && n(e.feedMixingTank.permeate_qty)),
            lfomToLagoon: sum(entries, e => e.fertilizer && n(e.fertilizer.lagoon_liquid_sold)),
            fomDispatch: sum(entries, e => e.fertilizer && n(e.fertilizer.sold)),
            lfomDispatch: sum(entries, e => e.fertilizer && n(e.fertilizer.loose_fom_sold))
        };

        const powerConsumption = sum(entries, e => e.utilities && n(e.utilities.electricity_consumption));
        const breakdownReasons = entries
            .filter(e => e.review_comment)
            .map(e => `${e.date}: ${e.review_comment}`)
            .join('; ') || '';

        res.json({
            startDate,
            endDate,
            entryCount: entries.length,
            feeding,
            rawMaterialQuality,
            digesters: digestersConsolidated,
            digesterAverage: avgDigester,
            biogasQuality,
            biogasProduction,
            cbgQuality,
            cbgKg,
            sls,
            fomLfom,
            slurryManagement,
            powerConsumption,
            breakdownReasons
        });
    } catch (error) {
        console.error('Consolidated Data Error:', error);
        res.status(500).json({ message: 'Error fetching consolidated data', error: error.message });
    }
};

module.exports = exports;

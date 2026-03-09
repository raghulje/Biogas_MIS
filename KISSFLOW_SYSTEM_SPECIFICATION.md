# CBG MIS ENTRY SYSTEM — Kissflow Rebuild Specification

---

## SYSTEM: CBG MIS ENTRY SYSTEM

**Stack (source):** React (Frontend), Node.js + Express (Backend), MySQL (Database)

---

## FORM 1: CUSTOMER MASTER

**SOURCE TABLE:** customers

### SECTION: Basic Information

| Field Name   | Field Type     | Required | Description                          | Source Table | Default Value | Validation Rules        |
|-------------|-----------------|----------|--------------------------------------|--------------|---------------|-------------------------|
| name        | Single Line Text| Yes      | Customer name                        | customers    | —             | Not empty               |
| type        | Dropdown        | No       | CBG, FOM, LFOM, Petrol, Diesel      | customers    | —             | —                       |
| status      | Dropdown        | No       | active / inactive                    | customers    | active        | —                       |

### SECTION: Contact Information

| Field Name | Field Type | Required | Description   | Source Table | Default Value | Validation Rules |
|------------|------------|----------|----------------|--------------|---------------|------------------|
| email      | Email      | No       | Email address  | customers    | —             | Valid email      |
| phone      | Phone      | No       | Phone number   | customers    | —             | —                |
| address    | Multi Line Text | No    | Address        | customers    | —             | —                |

### SECTION: Tax / Registration

| Field Name  | Field Type     | Required | Description   | Source Table | Default Value | Validation Rules |
|-------------|----------------|----------|---------------|--------------|---------------|------------------|
| gst_number | Single Line Text | No     | GST number   | customers    | —             | —                |
| pan_number | Single Line Text | No     | PAN number   | customers    | —             | —                |

---

## FORM 2: MIS ENTRY (Daily Entry)

**SOURCE TABLE:** mis_daily_entries (parent) + child tables per section

### SECTION: Entry Information

| Field Name    | Field Type | Required | Description                    | Source Table     | Default Value | Validation Rules                    |
|---------------|------------|----------|--------------------------------|------------------|---------------|-------------------------------------|
| date          | Date       | Yes      | Entry date                     | mis_daily_entries| —             | Unique with shift (date, shift)      |
| shift         | Dropdown   | No       | Shift-1, Shift-2, General      | mis_daily_entries| General       | —                                   |
| status        | Dropdown   | No       | draft / submitted / under_review / approved / rejected / deleted | mis_daily_entries | draft | —    |
| created_by    | User Selector | Yes   | User who created entry         | mis_daily_entries| —             | —                                   |
| review_comment| Multi Line Text | No   | Reviewer comment (rejection)   | mis_daily_entries| —             | —                                   |
| remarks       | Multi Line Text | No   | Breakdown reason / other remarks (stored in review_comment in source) | mis_daily_entries | — | —   |

### SECTION: Summary of Raw Materials

| Field Name                 | Field Type | Required | Description                    | Source Table      | Default Value | Validation Rules |
|----------------------------|------------|----------|--------------------------------|-------------------|---------------|------------------|
| cowDungPurchased           | Number     | No       | Cow dung purchased             | mis_raw_materials  | —             | —                |
| cowDungStock               | Number     | No       | Cow dung in stock              | mis_raw_materials | —             | —                |
| oldPressMudOpeningBalance   | Number     | No       | Old press mud opening balance  | mis_raw_materials | —             | —                |
| oldPressMudPurchased       | Number     | No       | Old press mud purchased        | mis_raw_materials | —             | —                |
| oldPressMudDegradationLoss | Number     | No       | Old press mud degradation loss | mis_raw_materials | —             | —                |
| oldPressMudClosingStock    | Number     | No       | Old press mud closing stock    | mis_raw_materials | —             | —                |
| newPressMudPurchased       | Number     | No       | New press mud purchased        | mis_raw_materials | —             | —                |
| pressMudUsed               | Number     | No       | Press mud used                 | mis_raw_materials | —             | —                |
| totalPressMudStock         | Number     | No       | Total press mud stock          | mis_raw_materials | —             | —                |
| auditNote                  | Multi Line Text | No   | Audit note                     | mis_raw_materials | —             | —                |

### SECTION: Feed Mixing Tank

| Field Name        | Field Type | Required | Description     | Source Table        | Default Value | Validation Rules |
|-------------------|------------|----------|------------------|--------------------|---------------|------------------|
| cowDungFeed.qty   | Number     | No       | Cow dung qty     | mis_feed_mixing_tank | —           | —                |
| cowDungFeed.ts    | Number     | No       | Cow dung TS %   | mis_feed_mixing_tank | —           | —                |
| cowDungFeed.vs    | Number     | No       | Cow dung VS %   | mis_feed_mixing_tank | —           | —                |
| pressmudFeed.qty  | Number     | No       | Pressmud qty    | mis_feed_mixing_tank | —           | —                |
| pressmudFeed.ts   | Number     | No       | Pressmud TS %   | mis_feed_mixing_tank | —           | —                |
| pressmudFeed.vs   | Number     | No       | Pressmud VS %   | mis_feed_mixing_tank | —           | —                |
| permeateFeed.qty  | Number     | No       | Permeate qty    | mis_feed_mixing_tank | —           | —                |
| permeateFeed.ts   | Number     | No       | Permeate TS %   | mis_feed_mixing_tank | —           | —                |
| permeateFeed.vs   | Number     | No       | Permeate VS %   | mis_feed_mixing_tank | —           | —                |
| waterQty          | Number     | No       | Water qty       | mis_feed_mixing_tank | —           | —                |
| slurry.total      | Number     | No       | Total slurry    | mis_feed_mixing_tank | —           | —                |
| slurry.ts         | Number     | No       | Slurry TS %     | mis_feed_mixing_tank | —           | —                |
| slurry.vs         | Number     | No       | Slurry VS %     | mis_feed_mixing_tank | —           | —                |
| slurry.ph         | Number     | No       | Slurry pH       | mis_feed_mixing_tank | —           | —                |

### SECTION: Digesters (Repeatable — see SUBTABLES)

Stored in **mis_digester_data**. Each row: Feeding Data, Discharge Data, Slurry Characteristics, Health Monitoring (see Subtable: Digester Rows).

### SECTION: Raw Biogas

| Field Name         | Field Type | Required | Description       | Source Table   | Default Value | Validation Rules |
|--------------------|------------|----------|--------------------|----------------|---------------|------------------|
| digester01Gas      | Number     | No       | Digester 01 gas   | mis_raw_biogas | —             | —                |
| digester02Gas      | Number     | No       | Digester 02 gas   | mis_raw_biogas | —             | —                |
| digester03Gas      | Number     | No       | Digester 03 gas   | mis_raw_biogas | —             | —                |
| totalRawBiogas     | Number     | No       | Total raw biogas  | mis_raw_biogas | —             | —                |
| rbgFlared          | Number     | No       | RBG flared        | mis_raw_biogas | —             | —                |
| gasYield           | Number     | No       | Gas yield         | mis_raw_biogas | —             | —                |

### SECTION: Raw Biogas Quality

| Field Name | Field Type | Required | Description | Source Table           | Default Value | Validation Rules |
|------------|------------|----------|-------------|------------------------|---------------|------------------|
| ch4        | Number     | No       | CH4 %       | mis_raw_biogas_quality | —             | —                |
| co2        | Number     | No       | CO2 %       | mis_raw_biogas_quality | —             | —                |
| h2s        | Number     | No       | H2S ppm     | mis_raw_biogas_quality | —             | —                |
| o2         | Number     | No       | O2 %        | mis_raw_biogas_quality | —             | —                |
| n2         | Number     | No       | N2 %        | mis_raw_biogas_quality | —             | —                |

### SECTION: Compressed Biogas

| Field Name       | Field Type | Required | Description      | Source Table            | Default Value | Validation Rules |
|------------------|------------|----------|------------------|-------------------------|---------------|------------------|
| produced         | Number     | No       | Produced (kg)    | mis_compressed_biogas   | —             | —                |
| ch4              | Number     | No       | CH4 %            | mis_compressed_biogas   | —             | —                |
| co2              | Number     | No       | CO2 %            | mis_compressed_biogas   | —             | —                |
| h2s              | Number     | No       | H2S ppm          | mis_compressed_biogas   | —             | —                |
| o2               | Number     | No       | O2 %             | mis_compressed_biogas   | —             | —                |
| n2               | Number     | No       | N2 %             | mis_compressed_biogas   | —             | —                |
| conversionRatio   | Number     | No       | Conversion ratio | mis_compressed_biogas   | —             | —                |
| ch4Slippage      | Number     | No       | CH4 slippage     | mis_compressed_biogas   | —             | —                |
| cbgStock         | Number     | No       | CBG stock        | mis_compressed_biogas   | —             | —                |
| cbgSold          | Number     | No       | CBG sold (auto from Sales subtable) | mis_compressed_biogas | — | Read-only sum   |

### SECTION: Compressors

| Field Name        | Field Type | Required | Description         | Source Table   | Default Value | Validation Rules |
|-------------------|------------|----------|---------------------|----------------|---------------|------------------|
| compressor1Hours  | Number     | No       | Compressor 1 hours  | mis_compressors| —             | —                |
| compressor2Hours  | Number     | No       | Compressor 2 hours  | mis_compressors| —             | —                |
| totalHours        | Number     | No       | Total hours         | mis_compressors| —             | —                |

### SECTION: SLS Machine

| Field Name           | Field Type | Required | Description           | Source Table | Default Value | Validation Rules |
|----------------------|------------|----------|------------------------|--------------|---------------|------------------|
| waterConsumption     | Number     | No       | Water consumption      | mis_sls_data | —             | —                |
| polyElectrolyte      | Number     | No       | Poly electrolyte       | mis_sls_data | —             | —                |
| solution             | Number     | No       | Solution               | mis_sls_data | —             | —                |
| slurryFeed           | Number     | No       | Slurry feed            | mis_sls_data | —             | —                |
| wetCakeProduction    | Number     | No       | Wet cake production    | mis_sls_data | —             | —                |
| wetCakeTs            | Number     | No       | Wet cake TS %          | mis_sls_data | —             | —                |
| wetCakeVs            | Number     | No       | Wet cake VS %          | mis_sls_data | —             | —                |
| liquidProduced       | Number     | No       | Liquid produced        | mis_sls_data | —             | —                |
| liquidTs             | Number     | No       | Liquid TS %            | mis_sls_data | —             | —                |
| liquidVs             | Number     | No       | Liquid VS %            | mis_sls_data | —             | —                |
| liquidSentToLagoon   | Number     | No       | Liquid sent to lagoon  | mis_sls_data | —             | —                |

### SECTION: Fertilizer

| Field Name         | Field Type | Required | Description        | Source Table      | Default Value | Validation Rules |
|--------------------|------------|----------|--------------------|-------------------|---------------|------------------|
| fomProduced        | Number     | No       | FOM produced       | mis_fertilizer_data | —           | —                |
| inventory           | Number     | No       | Inventory          | mis_fertilizer_data | —           | —                |
| sold                | Number     | No       | Sold               | mis_fertilizer_data | —           | —                |
| weightedAverage     | Number     | No       | Weighted average   | mis_fertilizer_data | —           | —                |
| revenue1            | Number     | No       | Revenue            | mis_fertilizer_data | —           | —                |
| lagoonLiquidSold    | Number     | No       | Lagoon liquid sold | mis_fertilizer_data | —           | —                |
| revenue2            | Number     | No       | Revenue (liquid)   | mis_fertilizer_data | —           | —                |
| looseFomSold        | Number     | No       | Loose FOM sold     | mis_fertilizer_data | —           | —                |
| revenue3            | Number     | No       | Revenue (loose)    | mis_fertilizer_data | —           | —                |

### SECTION: Utilities and Power

| Field Name              | Field Type | Required | Description                 | Source Table  | Default Value | Validation Rules |
|-------------------------|------------|----------|-----------------------------|---------------|---------------|------------------|
| electricityConsumption  | Number     | No       | Electricity consumption kWh | mis_utilities | —             | —                |
| specificPowerConsumption| Number     | No       | Specific power consumption  | mis_utilities | —             | —                |

### SECTION: Manpower

| Field Name      | Field Type | Required | Description    | Source Table     | Default Value | Validation Rules |
|-----------------|------------|----------|----------------|------------------|---------------|------------------|
| refexSrelStaff  | Number     | No       | Refex SREL     | mis_manpower_data| —             | —                |
| thirdPartyStaff | Number     | No       | Third party    | mis_manpower_data| —             | —                |

### SECTION: Plant Availability

| Field Name          | Field Type | Required | Description            | Source Table         | Default Value | Validation Rules |
|---------------------|------------|----------|------------------------|----------------------|---------------|------------------|
| workingHours        | Number     | No       | Working hours          | mis_plant_availability | —           | —                |
| scheduledDowntime   | Number     | No       | Scheduled downtime     | mis_plant_availability | —           | —                |
| unscheduledDowntime | Number     | No       | Unscheduled downtime   | mis_plant_availability | —           | —                |
| totalAvailability   | Number     | No       | Total availability     | mis_plant_availability | —           | —                |

### SECTION: Health, Safety & Environment (HSE)

| Field Name           | Field Type | Required | Description            | Source Table | Default Value | Validation Rules |
|----------------------|------------|----------|------------------------|--------------|---------------|------------------|
| safetyLti            | Number     | No       | Safety LTI             | mis_hse_data | —             | —                |
| nearMisses           | Number     | No       | Near misses            | mis_hse_data | —             | —                |
| firstAid             | Number     | No       | First aid              | mis_hse_data | —             | —                |
| reportableIncidents  | Number     | No       | Reportable incidents   | mis_hse_data | —             | —                |
| mti                  | Number     | No       | MTI                    | mis_hse_data | —             | —                |
| otherIncidents       | Number     | No       | Other incidents        | mis_hse_data | —             | —                |
| fatalities           | Number     | No       | Fatalities             | mis_hse_data | —             | —                |

---

## SUBTABLES

### Subtable: Digester Rows (mis_digester_data)

**Parent:** MIS Entry. **Repeatable:** Yes (multiple rows per entry).

| Column Name        | Field Type     | Required | Description           |
|--------------------|----------------|----------|------------------------|
| name               | Single Line Text | No     | Digester name (e.g. Digester 01) |
| feeding.totalSlurryFeed | Number | No   | Total slurry feed     |
| feeding.avgTs      | Number         | No       | Avg TS %               |
| feeding.avgVs      | Number         | No       | Avg VS %               |
| discharge.totalSlurryOut | Number | No   | Total slurry out      |
| discharge.avgTs    | Number         | No       | Discharge avg TS %     |
| discharge.avgVs    | Number         | No       | Discharge avg VS %     |
| characteristics.lignin | Number     | No       | Lignin                 |
| characteristics.vfa | Number      | No       | VFA                    |
| characteristics.alkalinity | Number | No   | Alkalinity             |
| characteristics.vfaAlkRatio | Number | No  | VFA:ALK ratio          |
| characteristics.ash | Number      | No       | Ash                    |
| characteristics.density | Number   | No       | Density                |
| characteristics.ph | Number      | No       | pH                     |
| characteristics.temperature | Number | No  | Temperature            |
| characteristics.pressure | Number   | No       | Pressure               |
| characteristics.slurryLevel | Number | No  | Slurry level           |
| health.hrt         | Number         | No       | HRT                    |
| health.vsDestruction | Number     | No       | VS destruction         |
| health.olr         | Number         | No       | OLR                    |
| health.balloonLevel | Number      | No       | Balloon level          |
| health.agitatorCondition | Dropdown  | No    | OK / Not OK            |
| health.foamingLevel | Number     | No       | Foaming level          |
| remarks            | Multi Line Text | No     | Remarks                |

### Subtable: CBG Sales (mis_cbg_sales)

**Parent:** MIS Entry. **Repeatable:** Yes. **Relationship:** customer_id → Customer Master.

| Column Name   | Field Type     | Required | Description        |
|---------------|----------------|----------|--------------------|
| customerType  | Dropdown       | No       | CBG, FOM, LFOM     |
| customerId    | Dropdown/Lookup| Yes*    | Customer (from Customer Master, filtered by type) |
| quantity      | Number         | Yes*     | Quantity (kg)      |

*At least one row or total quantity; CBG Sold on Compressed Biogas = sum(quantity).

### Subtable: Fuel Utilized (mis_fuel_utilized)

**Parent:** MIS Entry. **Repeatable:** Yes. **Relationship:** customer_id → Customer Master.

| Column Name | Field Type      | Required | Description     |
|-------------|-----------------|----------|-----------------|
| fuelType    | Dropdown        | Yes      | Petrol, Diesel  |
| customerId  | Dropdown/Lookup | Yes      | Customer        |
| quantity    | Number          | Yes      | Quantity        |

---

## RELATIONSHIPS

| From               | To          | Type        | Description                                      |
|--------------------|------------|-------------|--------------------------------------------------|
| Customer Master   | MIS Entry  | One-to-Many | Via CBG Sales (customer_id) and Fuel Utilized (customer_id) |
| MIS Entry (parent)| Raw Materials | One-to-One | entry_id                                         |
| MIS Entry         | Feed Mixing Tank | One-to-One | entry_id                                     |
| MIS Entry         | Digester Rows   | One-to-Many | entry_id, repeatable rows                    |
| MIS Entry         | Raw Biogas      | One-to-One | entry_id                                     |
| MIS Entry         | Raw Biogas Quality | One-to-One | entry_id                                  |
| MIS Entry         | Compressed Biogas | One-to-One | entry_id                                   |
| MIS Entry         | Compressors     | One-to-One | entry_id                                     |
| MIS Entry         | SLS Machine     | One-to-One | entry_id                                     |
| MIS Entry         | Fertilizer      | One-to-One | entry_id                                     |
| MIS Entry         | Utilities       | One-to-One | entry_id                                     |
| MIS Entry         | Manpower        | One-to-One | entry_id                                     |
| MIS Entry         | Plant Availability | One-to-One | entry_id                                  |
| MIS Entry         | HSE             | One-to-One | entry_id                                     |
| MIS Entry         | CBG Sales       | One-to-Many | entry_id, repeatable rows                   |
| MIS Entry         | Fuel Utilized   | One-to-Many | entry_id, repeatable rows                   |
| User              | MIS Entry       | One-to-Many | created_by                                   |

---

## WORKFLOW PROCESS

| Stage        | Status Value   | Description                                      |
|-------------|----------------|--------------------------------------------------|
| Stage 1     | Draft          | Entry created or saved; editable by creator      |
| Stage 2     | Submit         | Submitted; triggers notifications to reviewers   |
| Stage 3     | Under Review   | Reviewer has taken for review                    |
| Stage 4a    | Approved       | Entry approved; restricted edit (admin / approved editors) |
| Stage 4b    | Rejected       | Entry rejected; review_comment stored            |
| Stage 5     | Deleted        | Soft delete; only for draft by user, or any status by Admin |

**Transitions (backend logic):**

- Draft → Submitted (submit action)
- Submitted / Under Review → Under Review (review action)
- Under Review → Approved (approve action)
- Under Review → Rejected (reject action; requires review_comment)
- Any → Deleted (delete action; Admin only for non-draft)

---

## DATABASE TABLES (Reference)

| Table Name              | Purpose                          |
|-------------------------|----------------------------------|
| users                   | System users (not a form; auth)   |
| roles                   | Roles (not a form)               |
| permissions             | Permissions (not a form)         |
| user_permissions        | User–permission mapping          |
| customers               | Customer Master                  |
| mis_daily_entries       | MIS Entry header                 |
| mis_raw_materials       | Raw materials section            |
| mis_feed_mixing_tank    | Feed mixing tank section         |
| mis_digester_data       | Digester rows (repeatable)       |
| mis_raw_biogas          | Raw biogas section               |
| mis_raw_biogas_quality | Raw biogas quality section       |
| mis_compressed_biogas   | Compressed biogas section        |
| mis_compressors         | Compressors section             |
| mis_sls_data            | SLS machine section              |
| mis_fertilizer_data     | Fertilizer section              |
| mis_utilities           | Utilities section                |
| mis_manpower_data       | Manpower section                |
| mis_plant_availability  | Plant availability section      |
| mis_hse_data            | HSE section                     |
| mis_cbg_sales           | CBG sales rows (repeatable)     |
| mis_fuel_utilized       | Fuel utilized rows (repeatable) |

---

*End of specification.*

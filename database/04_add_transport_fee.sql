-- Migration script to add transport_fee column to existing tables
-- Run this script to update existing database schema

USE TheEducatorSchool;

-- Add transport_fee column to students table
ALTER TABLE students ADD COLUMN transport_fee DECIMAL(10,2) DEFAULT 0.00 AFTER monthly_fee;

-- Add transport_fee column to fee_slips table
ALTER TABLE fee_slips ADD COLUMN transport_fee DECIMAL(10,2) DEFAULT 0.00 AFTER admission_fee;

-- Add transport_fee_paid column to fees table
ALTER TABLE fees ADD COLUMN transport_fee_paid DECIMAL(10,2) DEFAULT 0.00 AFTER admission_fee_paid;

-- Update fee_type enum to include Transport Fee
ALTER TABLE fees MODIFY COLUMN fee_type ENUM('Monthly Fee', 'Admission Fee', 'Transport Fee', 'Arrears', 'Fine', 'Annual Fee') NOT NULL;

-- Update existing records to have default transport_fee values
UPDATE students SET transport_fee = 0.00 WHERE transport_fee IS NULL;
UPDATE fee_slips SET transport_fee = 0.00 WHERE transport_fee IS NULL;
UPDATE fees SET transport_fee_paid = 0.00 WHERE transport_fee_paid IS NULL;

-- Verify the changes
SELECT 'Students table updated' as status;
DESCRIBE students;

SELECT 'Fee_slips table updated' as status;
DESCRIBE fee_slips;

SELECT 'Fees table updated' as status;
DESCRIBE fees; 
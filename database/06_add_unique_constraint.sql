-- Add unique constraint to prevent duplicate fee slips for the same student in the same month/year
ALTER TABLE fee_slips 
ADD UNIQUE KEY unique_student_month_year (student_id, month, year);

-- Add index for better performance
CREATE INDEX idx_student_month_year ON fee_slips (student_id, month, year); 
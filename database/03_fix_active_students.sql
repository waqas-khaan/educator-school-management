-- Fix active students status
-- This script updates all students to be active by default

USE TheEducatorSchool;

-- Update all students to be active (unless they were specifically marked as left)
UPDATE students 
SET is_active = TRUE 
WHERE is_active = FALSE;

-- Show the updated results
SELECT 
    id,
    name,
    admission_number,
    is_active,
    created_at
FROM students 
ORDER BY id; 
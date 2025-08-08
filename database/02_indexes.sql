-- Indexes for better performance

-- Students table indexes
CREATE INDEX idx_students_admission_number ON students(admission_number);
CREATE INDEX idx_students_cnic ON students(cnic);
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_is_active ON students(is_active);

-- Fee slips table indexes
CREATE INDEX idx_fee_slips_student_id ON fee_slips(student_id);
CREATE INDEX idx_fee_slips_month_year ON fee_slips(month, year);
CREATE INDEX idx_fee_slips_status ON fee_slips(status);
CREATE INDEX idx_fee_slips_slip_id ON fee_slips(slip_id);

-- Fees table indexes
CREATE INDEX idx_fees_student_id ON fees(student_id);
CREATE INDEX idx_fees_fee_slip_id ON fees(fee_slip_id);
CREATE INDEX idx_fees_month_year ON fees(month, year);
CREATE INDEX idx_fees_payment_date ON fees(payment_date);
CREATE INDEX idx_fees_fee_type ON fees(fee_type);

-- Revenue table indexes
CREATE INDEX idx_revenue_date ON revenue(date);
CREATE INDEX idx_revenue_category ON revenue(category);

-- Expenses table indexes
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_category ON expenses(category);

-- Salaries table indexes
CREATE INDEX idx_salaries_teacher_id ON salaries(teacher_id);
CREATE INDEX idx_salaries_month_year ON salaries(month, year);
CREATE INDEX idx_salaries_status ON salaries(status);

-- Teachers table indexes
CREATE INDEX idx_teachers_cnic ON teachers(cnic);
CREATE INDEX idx_teachers_is_active ON teachers(is_active);

-- Classes table indexes
CREATE INDEX idx_classes_name ON classes(name);
CREATE INDEX idx_classes_is_active ON classes(is_active);

-- Users table indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role); 
-- for department query in server.js
SELECT 
    d.id as "Dept ID", 
    d.name as "Department" 
FROM department d 
ORDER BY d.id ASC
;

-- for role query in server.js
SELECT 
    r.title as "Job Title", 
    r.id as "Role ID", 
    d.name as "Department", 
    r.salary as "Salary" 
FROM role r 
JOIN department d ON r.department_id = d.id 
ORDER BY r.title ASC
;

-- for employee query in server.js
SELECT 
    e.id as "EID", 
    CONCAT(e.first_name," ", e.last_name) as "Employee Name", 
    r.title as "Title", d.name as "Department", 
    r.salary as "Salary", 
    e.manager_id as "Manager ID" 
FROM employee e 
LEFT JOIN role r ON r.id = e.role_id 
LEFT JOIN department d ON d.id = r.department_id 
ORDER BY e.id ASC
;
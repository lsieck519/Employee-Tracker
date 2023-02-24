
SELECT
    e.id,
    concat(e.first_name,' ',e.last_name) as employee_name, 
    r.title,
    d.name as department,
    r.salary,
    e.manager_id
FROM employee e
LEFT JOIN role r
on r.id = e.role_id
LEFT JOIN department d
on d.id = r.department_id
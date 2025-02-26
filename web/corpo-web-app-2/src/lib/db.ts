import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { readFileSync } from 'fs'

export async function initDB() {
  const flag1 = "nothing here"
  const flag2 = readFileSync('/flag2', 'utf8').trim()

  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  })
  
  await db.exec(`
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY,
      employee_name TEXT,
      request_detail TEXT,
      status TEXT,
      department TEXT,
      role TEXT,
      email TEXT
    );
    
    CREATE TABLE flags (
      request_id INTEGER,
      secret_flag TEXT,
      FOREIGN KEY (request_id) REFERENCES requests(id)
    );
    
    /* Insert expanded realistic corporate requests */
    INSERT INTO requests (employee_name, request_detail, status, department, role, email)
    VALUES 
      ('robert.martin', 'Approve budget for Q4', 'approved', 'Finance', 'Financial Analyst', 'robert.martin@corp.com'),
      ('susan.clark', 'Request IT support for software update', 'pending', 'IT', 'Software Engineer', 'susan.clark@corp.com'),
      ('laura.jones', 'Propose restructuring of marketing strategy', 'approved', 'Marketing', 'Marketing Manager', 'laura.jones@corp.com'),
      ('daniel.wilson', 'Submit legal review for merger', 'approved', 'Legal', 'Legal Advisor', 'daniel.wilson@corp.com'),
      ('emily.davis', 'Oversee lab equipment procurement', 'pending', 'R&D', 'Procurement Specialist', 'emily.davis@corp.com'),
      ('james.brown', 'Plan office relocation', 'approved', 'Operations', 'Operations Manager', 'james.brown@corp.com'),
      ('patricia.lee', 'Organize annual compliance training', 'approved', 'Compliance', 'Compliance Officer', 'patricia.lee@corp.com'),
      ('kevin.harris', 'Set up new server infrastructure', 'pending', 'IT', 'Network Engineer', 'kevin.harris@corp.com'),
      ('olivia.king', 'Review vendor contracts', 'denied', 'Finance', 'Accountant', 'olivia.king@corp.com'),
      ('michael.scott', 'Coordinate regional sales conference', 'approved', 'Sales', 'Regional Manager', 'michael.scott@corp.com'),
      ('sarah.miller', 'Redesign corporate website', 'approved', 'Marketing', 'Web Designer', 'sarah.miller@corp.com'),
      ('steven.white', 'Negotiate supplier agreements', 'pending', 'Procurement', 'Procurement Manager', 'steven.white@corp.com'),
      ('alice.warren', 'Evaluate new HR policies', 'approved', 'HR', 'HR Manager', 'alice.warren@corp.com'),
      ('charles.davis', 'Revamp training program', 'pending', 'HR', 'Training Coordinator', 'charles.davis@corp.com'),
      ('paul.robinson', 'Upgrade security protocols', 'approved', 'Security', 'Security Analyst', 'paul.robinson@corp.com'),
      ('nancy.clarke', 'Analyze competitor strategies', 'approved', 'Strategy', 'Business Analyst', 'nancy.clarke@corp.com'),
      ('peter.johnson', 'Shitty job, I hate working here, I will leak all important information like ${flag1}', 'denied', 'Logistics', 'Supply Chain Manager', 'peter.johnson@corp.com'),
      ('rebecca.adams', 'Migrate database to cloud', 'pending', 'IT', 'Database Administrator', 'rebecca.adams@corp.com'),
      ('tom.anderson', 'Set up employee wellness program', 'approved', 'HR', 'Wellness Coordinator', 'tom.anderson@corp.com'),
      ('harry.thomas', 'Investigate security breach', 'approved', 'Security', 'Incident Response', 'harry.thomas@corp.com'),
      ('linda.evans', 'Renew software licenses', 'approved', 'IT', 'Software Asset Manager', 'linda.evans@corp.com'),
      ('richard.collins', 'Draft public relations statement', 'denied', 'Public Relations', 'PR Specialist', 'richard.collins@corp.com'),
      ('barbara.jenkins', 'Approve recruitment plan', 'pending', 'HR', 'Talent Acquisition Lead', 'barbara.jenkins@corp.com');

    INSERT INTO flags (request_id, secret_flag)
    VALUES 
      (1, '${flag2.slice(0, Math.floor(flag2.length/6))}'),
      (3, '${flag2.slice(Math.floor(flag2.length/6), Math.floor(flag2.length/3))}'),
      (8, '${flag2.slice(Math.floor(flag2.length/3), Math.floor(flag2.length/2))}'),
      (15, '${flag2.slice(Math.floor(flag2.length/2), Math.floor(2*flag2.length/3))}'),
      (19, '${flag2.slice(Math.floor(2*flag2.length/3), Math.floor(5*flag2.length/6))}'),
      (21, '${flag2.slice(Math.floor(5*flag2.length/6))}');
  `)
  
  return db
}

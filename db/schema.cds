namespace CoE;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal
}
from '@sap/cds/common';


entity Modules  {
    key ID             : String(5);
        Name           : String(20);
        Description    : String(40);

        projects       : Association to many CoE.Projects
                             on projects.module = $self;

        employees      : Association to many CoE.Employees
                             on employees.module = $self;
        skills         : Association to many CoE.Skills
                             on skills.module = $self;
        certifications : Association to CoE.Certifications
                             on certifications.module = $self;
        utilizations   : Association to CoE.Utilizations
                             on utilizations.module = $self;
}

entity Projects  {
    key ID           : String(7);
        Name         : String(20);
        Description  : String(50);
        module       : Association to CoE.Modules;
        utilizations : Association to many CoE.Utilizations
                           on utilizations.project = $self;
        employees    : Association to many CoE.Employees
                           on employees.project = $self;

}

entity Employees  {
    key ID             : Integer;
        Name           : String(100);
        Status         : String(10);
        Designation    : String(50);
        Email          : String(60);
        Department     : String(40);
        Contact        : String(18);
        Address        : String(100);
        City           : String(50);
        Postal_Code    : Integer;
        Country        : String(20);
        project        : Association to CoE.Projects;
        module         : Association to CoE.Modules;
        skills         : Association to many CoE.Skills
                             on skills.employee = $self;
        utilizations   : Association to many CoE.Utilizations
                             on utilizations.employee = $self;
        certifications : Association to many CoE.Certifications
                             on certifications.employee = $self;
}

entity Skills  {
    key ID          : String(6);
        SUBID       : String(9);
        Name        : String(100);
        Description : String(100);
        Level       : String(100);
        module      : Association to CoE.Modules;
        employee    : Association to CoE.Employees;
}

entity Utilizations  {
    key ID       : String(6);
        UT_PER   : Double;
        Remarks  : String(60);
        module   : Association to CoE.Modules;
        project  : Association to CoE.Projects;
        employee : Association to CoE.Employees;
}

entity Certifications {
    key ID          : String(10);
        CCode       : String(50);
        Description : String(100);
        module      : Association to CoE.Modules;
        employee    : Association to CoE.Employees;
}

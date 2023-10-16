using {CoE as my} from '../db/schema';

@path    : '/service/CoE_Dashboard'
@requires: 'authenticated-user'
service CoE_DashboardService {

    entity Modules        as projection on my.Modules;
    entity Projects       as projection on my.Projects;
    entity Employees      as projection on my.Employees;
    entity Skills         as projection on my.Skills;
    entity Utilizations   as projection on my.Utilizations;
    entity Certifications as projection on my.Certifications;
}

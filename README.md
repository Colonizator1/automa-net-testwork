
## How to start

- ```git clone```
### Backend
- ```cd backend```
- ```./vendor/bin/sail up```

### Frontend
- ```cd ../front```
- ```docker-compose up -d```

Open http://localhost
### Recruitment task - [ Full Stack Developer ]
Prepare an application using Frontend (React.js, Typescript) and Backend (Mysql, Laravel). Application should be used for managing companies.
#### Backend:
Prepare api using Laravel and Mysql with 3 endpoints:
1. Endpoint 1 (POST) - Adding companies with following inputs:
   a. Name - (required, max chars 255),
   b. Status - (required, allowed three options “Trial”, “Customer”, “Dead”),
   c. Address - (Required, max chars 1024),
   d. Created_at - (Required, Allowed format: “y-m-d H:i:s”),
2. Endpoint 2 (GET) - Has to return a list of saved companies in Database.
3. Endpoint 3 (PUT) - Has to update a company with the same inputs as in Endpoint 1.
#### Frontend:
   Application should have 3 views:
1. View 1 - Adding companies - Form with the following fields
   a. Company name [Text field]
   b. Company status [Select field with those options: “Trial”, “Customer”, “Dead”]
   c. Company address [Textarea field]
   d. Date of creation [Datepicker field]
   e. Button “CompanyAdd”
2. View 2 - List of companies, view with to following functionality:
   a. Filter by status,
   b. Pagination,
   c. List of companies, with headings “name”, “status”, “actions”, each row should have button “CompanyEdit”,
   d. Filters and Paginations should work correctly with query in the url address, e.g. if I open the following url: localhost/companies?status=dead&page=2 than status dead should be selected from filters and second page of companies should be displayed.
3. View 3 - CompanyEdit company, the same view what in View 1
#### DevOps
   Prepare entire project based on docer-compose.yaml 

# Student Management System — Test Cases and Results

## 1. Testing Objective

The objective of testing is to verify that the Student Management System performs all required CRUD operations correctly and handles invalid input and errors appropriately.

## 2. Test Cases

| ID   | Test Case           | Input/Action                         | Expected Result           | Result |
| ---- | ------------------- | ------------------------------------ | ------------------------- | ------ |
| TC01 | Create student      | Enter valid student details          | Student created           | Pass   |
| TC02 | View students       | Open student list                    | All students displayed    | Pass   |
| TC03 | View single student | Select student                       | Student details displayed | Pass   |
| TC04 | Update student      | Modify student details               | Details updated           | Pass   |
| TC05 | Delete student      | Delete existing student              | Student removed           | Pass   |
| TC06 | Empty field         | Submit incomplete form               | Validation message shown  | Pass   |
| TC07 | Invalid email       | Enter invalid email                  | Validation error shown    | Pass   |
| TC08 | Invalid ID          | Request unavailable student          | Error returned            | Pass   |
| TC09 | Backend unavailable | Send request while server is stopped | Error handled             | Pass   |

## 3. Testing Result

The application was tested for the major functional requirements. CRUD operations, input validation, and error handling were verified using the application interface and API requests.

Screenshots of the test results are provided in the `screenshots` directory.

## 4. Evidence

The repository contains screenshots showing:

* Student creation
* Student listing
* Student update
* Student deletion
* Validation
* API responses

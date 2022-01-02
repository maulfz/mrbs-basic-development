## MRBS basic development

### Meeting room booking system

Build a meeting room booking system

### Feature Specification:

- There are two types of users: *Admin Users* and *Standard Users*. *Admin Users* have privileged permissions as well as all permissions that a *Standard User* has.
- Meeting rooms can be booked for a specific time-slot. Each time slot is 30 minutes, starting from 09:00. So a user can book from 10:00 to 10:30, but not from 10:15 to 10:30 or 10:15 to 10:45. There should be 18 time-slots available in one day.

### User Stories:

- *Admin Users* can create a new meeting room with following information
  - Name of meeting room
  - Location of meeting room
  - Description of meeting room

- *Admin Users* can edit information of a meeting room

- *Standard Users* can see a list of availalbe meeting rooms
  - Name of meeting room
  - Location of meeting room
  - Description of meeting room
  - Date and time-slots have been booked and which time-slots are available for booking

- *Standard Users* can book a meeting room
  - When booking a meeting room, users must specify:
    - Which room to book
    - Time-slots to book
    - Title of the meeting
    - Description of the meeting
  - If the time-slot is already booked, an attempt to book should fail
  - Booked meetings can't backdate

- *Standard Users* can cancel a meeting room
  - Booked meetings can be cancelled
  - Booked meetings can be cancelled if not backdate

### TODO

- [Nice-to-have] Admin should be notified everytime a meeting room has been booked or cancelled.
  - The notification should include the following information
    - Who booked the meeting room
    - Name of meeting room
    - Date and time-slots of the booking.
    - Whether it is a new booking or a cancellation
- [Nice-to-have] Users should be reminded of a meeting 30 minutes before the meeting starts
- [Nice-to-have] If the cancellation happens after 1 hour before the meeting, an attempt to cancel should fail
- [Nice-to-have] Pictures of the meeting room & Maximum capacity of the meeting room
- [Nice-to-have] Type/Mode of the meeting room (virtual/onsite)

### Tech stack

- Implement the requirements with `nodejs`
  - We use `express`, but you can choose any web framework of our choice
  - Use an ORM of your choice
- Use a relational database for persistence. We recommend nedb / sql-lite for simplicity
- [Nice-to-have] The project must have unit and/or integration tests
- [Nice-to-have] Use `Swagger` to write documentation of the APIs
- [Nice-to-have] Run test coverage reports
- [Nice-to-have] Write a dockerfile for deploying the project.
- [Nice-to-have] The app should be ready to be deployed by running something like bash/shell
- [Nice-to-have] In the readme include how to start the server
- Use git for version control, keep commit clean and iterative


# About project

### Installation

```
$ npm install
$ cd app
$ node app.js
admin: admin/888888
```
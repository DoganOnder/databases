var invitees = [
  {
    invitee_no: 1,
    invitee_name: "Alex",
    invited_by: "Noah",
  },
  {
    invitee_no: 2,
    invitee_name: "Sophia",
    invited_by: "Jacob",
  },
  {
    invitee_no: 3,
    invitee_name: "Bernard",
    invited_by: "Dogan",
  },
  {
    invitee_no: 4,
    invitee_name: "Keynes",
    invited_by: "Albert",
  },
 
];

var rooms = [
  {
    room_no: 1,
    room_name: "London",
    floor_number: "1",
  },
  {
    room_no: 2,
    room_name: "New York",
    floor_number: "2",
  },
  {
    room_no: 3,
    room_name: "Moscow",
    floor_number: "3",
  },
  {
    room_no: 4,
    room_name: "Istanbul",
    floor_number: "4",
  },
 
];

var meetings = [
  {
    meeting_no: 1,
    meeting_title: "Banking",
    starting_time: "09:00:00",
    ending_time: "12:30:00",
    room_no: 1,
  },
  {
    meeting_no: 2,
    meeting_title: "Capital Markets",
    starting_time: "09:00:00",
    ending_time: "12:30:00",
    room_no: 2,
  },
  {
    meeting_no: 3,
    meeting_title: "Stock Exchanges",
    starting_time: "09:00:00",
    ending_time: "12:30:00",
    room_no: 3,
  },
  {
    meeting_no: 4,
    meeting_title: "Sustainabilty",
    starting_time: "09:00:00",
    ending_time: "12:30:00",
    room_no: 4,
  },
  
];

module.exports.invitees = invitees;

module.exports.meetings = meetings;

module.exports.rooms = rooms;
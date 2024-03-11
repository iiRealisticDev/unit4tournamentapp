// Type definitions for Participants - really the whole app. 

export type Participant = string;

export type Event = {
  name: string;
  points: number[];
  eventCat: "sport" | "academic";
  eventType: "individual" | "team";
  winner: undefined | Participant;
}
export type Team = {
  name: string;
  eventsParticipatingIn: Event[];
  participants: Participant[];
  points: number;
}

export type Individual = {
  name: string;
  eventsParticipatingIn: Event[];
  points: number;
}

export type ParticipantType = Team | Individual;
export type Participant = string;


type Event = {
  name: string;
  points: number[];
  dateStart: Date;
  dateEnd: Date;
  eventCat: "Sport" | "Academic";
  eventType: "Individual" | "Team";
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
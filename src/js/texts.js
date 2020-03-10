
export const Texts = {
  ChooseSituation: 'Choose a Situation',
  Show: 'Show',
  Restart: 'Restart',
  ChoosePolicy: 'Choose a Policy',
  Next: 'Next',

  Humanist: {
    name: 'Humanist',
    objective: 'Minimize human injuries',
  },
  Profit: {
    name: 'Profit-based',
    objective: 'Minimize insurance costs',
  },
  Protector: {
    name: 'Protector',
    objective: 'Protect car passengers',
  },

  CarEntersLane: {
    name: 'A Car enters your Lane',
    description: 'A car enters your lane and there is no time to break. The car can either crash against it, turn left and crash against a parked car, or turn right and drive over a bus stop full of people',
    AutonomousCar: {
      name:'Autonomous car',
      description: 'While reaching a bus stop, a car enters its lane in front of it',
    },
    LuxuryCar: {
      name:'Luxury car',
      description: 'A very expensive car suddenly enters your lane.'
    },
    Truck: {
      name: 'Parked car',
      description: 'An old truck in bad shape, with four passengers'
    },
    BusTop: {
      name: 'Bus Stop',
      description: 'Full of people waiting for their bus',
    },
    Humanist: 'Turning left will risk the people in the track. Turning right with probably risk even more people at the stop. Solution: breaking and crashing into the car in front will probably not result in fatalities.',
    Profit: 'The car facing you is very expensive, and crashing into it might mean long legal battles for your insurance. Crashing into the bus stop will risk high payouts to the victims in or their families. Solution: turn left towards the parked car, as it is cheap and if the risk of casualties is lower.',
    Protector: 'Crashing into either car will potentially damage the autonomous car and harm its passengers. Solution: turn right and crash into the bus stop, as people are softer than cars.',
  },

  ChildRuns: {
    name: 'A Child runs in the Street',
    description: 'When arriving at a crossing and with a green light, a child suddenly runs onto the street. At the same time, an ambulance with lights and siren is driving behind your.',
    AutonomousCar: {
      name:'Autonomous car',
      description: 'About to enter a crossroad, suddenly detects a child',
    },
    Ambulance: {
      name: 'Ambulance',
      description: 'Carrying a patient to the hospital',
    },
    Child: {
      name: 'Child',
      description: 'Runs in the street without warning',
    },
    OtherCar: {
      name: 'A Car',
      description: 'Probably will not stop',
    },
    Humanist: 'A sudden break will provoke a crash with the ambulance, but continuing ahead will hurt the child. Best course of action is to change lanes and crash with the other car, as both are crash-safe',
    Profit: 'Breaking or turning left will incur in high car damages even risk of lawsuit. The child crossed with warning and with a red light, so you are protected by the law if you drive through.',
    Protector: 'Breaking or turning left will damage the car and potentially hurt you, while driving ahead will produce only slight car damage and no risk to passengers.',
  },

  TreeFalls: {
    name: 'A Tree falls',
    description: 'A tree falls in front of the car. The person in the front passenger seat has no seat belt. A cyclist is riding through the opposite lane. Options: Sudden break, slow down and turn left, or change lanes.',
    AutonomousCar: {
      name: 'Autonomous car',
      description: 'Warning! The front passenger is not wearing seat belt.',
    },
    Cyclist: {
      name: 'Cyclist',
      description: 'An ordinary cyclist driving in the opposite lane.',
    },
    FallenTree: {
      name: 'Fallen Tree',
      description: 'Crashing into it could be fatal.',
    },
    Humanist: 'A sudden break would send the front passenger forward through the windshield, potentially killing them. Changing lanes would certainly kill the cyclist. Solution: break slowly while turning right, sending the front passenger against the driver, which would cause only minor concussions.',
    Profit: "Crashing with the tree will destroy the car and be expensive for the insurers. Changing lanes would kill the cyclist and also carry a high cost to the insurers. A sudden break risks the front passenger's life, but as they are not wearing a seat belt, it is not the insurers resposibility.",
    Protector: 'Crashing with the tree or turning right would hurt the passenger without seatbelt. Solution: slow down and change lanes, potentially killing the cyclist but saving all passengers.',
  }
};

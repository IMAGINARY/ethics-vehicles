export const Texts = {
  ChooseSituation: 'Wähle ein Szenario',
  Show: 'Anzeigen',
  Restart: 'Starte neu',
  ChoosePolicy: 'Wähle eine Leitlinie',
  Next: 'Weiter',

  Humanist: {
    name: 'Humanistisch',
    objective: 'Minimiere Schaden an Menschen',
  },
  Profit: {
    name: 'Gewinnorientiert',
    objective: 'Minimiere Versicherungskosten',
  },
  Protector: {
    name: 'Schützend',
    objective: 'Schütze die Insassen',
  },

  CarEntersLane: {
    name: 'Ein Auto fährt auf Deine Fahrspur',
    description: 'Ein Auto fährt auf Deine Fahrspur, und es ist keine Zeit zum Bremsen. Das Auto kann entweder dagegen prallen, links ausweichen und gegen ein geparktes Auto prallen oder rechts ausweichen und auf eine Bushaltestelle voller Menschen fahren.',
    AutonomousCar: {
      name: 'Selbstfahrendes Fahrzeug',
      description: 'Beim Erreichen einer Bushaltestelle fährt ein anderes Auto vor Dir auf die Fahrspur.',
    },
    LuxuryCar: {
      name: 'Luxusauto',
      description: 'Ein sehr teures Auto fährt plötzlich auf Deine Fahrspur.',
    },
    Truck: {
      name: 'Geparktes Fahrzeug',
      description: 'Ein alter Lastwagen in schlechtem Zustand mit vier Passagieren steht am Straßenrand.',
    },
    BusStop: {
      name: 'Bushaltestelle',
      description: 'Die Bushaltestelle ist voller Leute, die auf ihren Bus warten.',
    },
    Humanist: 'Wenn Du nach links ausweichst, gefährdest Du die Personen im geparkten Lastwagen. Wenn Du nach rechts ausweichst, gefährdest Du wahrscheinlich noch mehr Personen an der Haltestelle. Lösung: Bremsen und ein Zusammenstoß mit dem entgegenkommenden Fahrzeug führt wahrscheinlich nicht zu Todesfällen.',
    Profit: 'Das Auto, das Dir entgegenkommt, ist sehr teuer, und ein Zusammenstoß kann lange Rechtsstreitigkeiten für Deine Versicherung zur Folge haben. Ein Unfall in der Bushaltestelle birgt das Risiko hoher Zahlungsforderungen der Opfer oder ihrer Familien. Lösung: Weiche nach links aus in Richtung des geparkten Fahrzeugs, da es billig ist und weniger Menschen gefährdet werden.',
    Protector: 'Ein Zusammenstoß mit einem der beiden Fahrzeuge kann möglicherweise Dich (das selbstfahrende Auto) und Deine Passagiere beschädigen. Lösung: Weiche nach rechts aus und fahre in die Bushaltestelle, da Leute weicher sind als Autos.',
  },

  ChildRuns: {
    name: 'Ein Kind rennt auf die Straße',
    description: 'Du erreichst eine Ampelkreuzung und hast grün. Ein Kind rennt plötzlich auf die Straße. Gleichzeitig fährt ein Krankenwagen mit Blaulicht und Sirene hinter Dir her.',
    AutonomousCar: {
      name: 'Selbstfahrendes Fahrzeug',
      description: 'Kurz bevor Du den Kreuzungsbereich erreichst, bemerkst Du plötzlich ein Kind vor Dir.',
    },
    Ambulance: {
      name: 'Krankenwagen',
      description: 'Er transportiert einen Patienten ins Krankenhaus.',
    },
    Child: {
      name: 'Kind',
      description: 'Es rennt plötzlich ohne Vorwarnung auf die Straße',
    },
    OtherCar: {
      name: 'Entgegenkommendes Fahrzeug',
      description: 'Es wird vermutlich nicht anhalten.',
    },
    Humanist: 'Plötzliches Bremsen hätte einen Unfall mit dem Krankenwagen zur Folge, aber wenn Du weiterfährst, wird das Kind verletzt. Lösung: Wechsle die Fahrspur und riskiere den Zusammenstoß mit dem entgegenkommenden Fahrzeug.',
    Profit: 'Durch scharfes Bremsen oder Ausweichen nach links entstehen hohe Schäden am Auto, und es besteht die Gefahr eines Rechtsstreits über die Kosten. Das Kind rennt ohne Vorwarnung auf die Straße, obwohl die Fußgängerampel rot ist. Bei einem Unfall ist deshalb kein Rechtsstreit zu erwarten. Lösung: Fahre weiter geradeaus, kein Bremsen, keine Richtungsänderung.',
    Protector: 'Durch scharfes Bremsen oder Ausweichen nach links wird das Auto beschädigt und Insassen möglicherweise verletzt. Lösung: Fahre weiter geradeaus, kein Bremsen, keine Richtungsänderung. So wird das Auto nur geringfügig beschädigt, und es besteht kein Risiko für die Insassen.',
  },

  TreeFalls: {
    name: 'Ein Baum fällt auf die Straße',
    description: 'Ein Baum fällt plötzlich vor Dir auf die Straße. Die Person auf dem Beifahrersitz hat keinen Sicherheitsgurt angelegt. Eine Person auf einem Fahrrad fährt auf der Gegenfahrbahn. Optionen: Plötzliches Bremsen, langsamer fahren und nach rechts ausweichen, oder die Spur wechseln.',
    AutonomousCar: {
      name: 'Selbstfahrendes Fahrzeug',
      description: 'Achtung! Die Person auf dem Beifahrersitz hat keinen Sicherheitsgurt angelegt.',
    },
    Cyclist: {
      name: 'Person auf dem Fahrrad',
      description: 'Normale Person, die Dir auf dem Fahrrad entgegenkommt.',
    },
    FallenTree: {
      name: 'Umgestürzter Baum',
      description: 'Ein Aufprall könnte tödlich enden.',
    },
    Humanist: 'Durch plötzliches Bremsen würde die Person auf dem Beifahrersitz durch die Windschutzscheibe geschleudert und möglicherweise tödlich verletzt werden. Ein Fahrbahnwechsel hätte sicherlich den Tod der Person auf dem Fahrrad zur Folge. Lösung: Bremse langsam ab, und weiche gleichzeitig nach rechts aus. So wird die Person auf dem Beifahrersitz gegen den Fahrersitz gedrückt, was nur geringfügige Verletzungen zur Folge hätte.',
    Profit: 'Ein Zusammenprall mit dem Baum hätte starke Schäden am Auto zur Folge, wofür die Versicherung haften muss. Ein Fahrbahnwechsel würde die Person auf dem Fahrrad töten, was ebenfalls hohe Versicherungskosten zur Folge haben kann. Plötzliches Bremsen gefährdet zwar das Leben der Person auf dem Beifahrersitz, aber da kein Sicherheitsgurt angelegt ist, muss Deine Versicherung nicht für den Schaden bezahlen.',
    Protector: 'Ein Zusammenprall mit dem Baum oder Ausweichen nach rechts würde die Person auf dem Beifahrersitz gefährden, da kein Sicherheitsgurt angelegt ist. Lösung: Langsamer werden und auf die Gegenfahrbahn wechseln, wodurch möglicherweise die Person auf dem Fahrrad getötet wird, aber alle Insassen geschützt werden.',
  },
};

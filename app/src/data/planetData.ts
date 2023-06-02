// https://deep-fold.itch.io/pixel-planet-generator

export const planetsData = [
  {
    englishName: "Sun",
    img: "Sun.svg",
    description:
      "The Sun is the star at the center of our solar system. It is a nearly perfect spherical ball of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process.",
  },
  {
    englishName: "Mercury",
    img: "Mercury.svg",
    description:
      "Mercury is the smallest planet in our solar system and closest to the Sun. It is only slightly larger than Earth's Moon and zips around the Sun every 88 Earth days.",
    referencePerihelionTime: new Date(2022, 2, 1),
    anomalisticPeriod: 87.9691,
  },
  {
    englishName: "Venus",
    img: "Venus.svg",
    description:
      "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    referencePerihelionTime: new Date(2022, 0, 9),
    anomalisticPeriod: 224.701,
  },
  {
    englishName: "Earth",
    img: "Earth.svg",
    description:
      "Earth is our home planet and the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    referencePerihelionTime: new Date(2022, 0, 4),
    anomalisticPeriod: 365.259636,
  },
  {
    englishName: "Mars",
    img: "Mars.svg",
    description:
      "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was - billions of years ago - wetter and warmer, with a thicker atmosphere.",
    referencePerihelionTime: new Date(2023, 7, 20),
    anomalisticPeriod: 686.98,
  },
  {
    englishName: "Jupiter",
    img: "Jupiter.svg",
    description:
      "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
    referencePerihelionTime: new Date(2023, 8, 26),
    anomalisticPeriod: 4332.589,
  },
  {
    englishName: "Saturn",
    img: "Saturn.svg",
    description:
      "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
    referencePerihelionTime: new Date(2024, 4, 21),
    anomalisticPeriod: 10759.22,
  },
  {
    englishName: "Uranus",
    img: "Uranus.svg",
    description:
      "Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    referencePerihelionTime: new Date(2050, 3, 17),
    anomalisticPeriod: 30685.4,
  },
  {
    englishName: "Neptune",
    img: "Neptune.svg",
    description:
      "Neptune is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.",
    referencePerihelionTime: new Date(2042, 6, 3),
    anomalisticPeriod: 60189,
  },
  {
    englishName: "Pluto",
    img: "",
    description:
      "Pluto is a dwarf planet in the Kuiper Belt. Once considered the ninth planet, it is now classified as a dwarf planet.",
    referencePerihelionTime: new Date(1989, 8, 5),
    anomalisticPeriod: 90560,
  },
];

const organizations: Record<
  'deathEater' | 'orderOfThePhoenix' | 'ministryOfMagic' | 'dumbledoresArmy',
  {
    title: string;
    emoji: string;
  }
> = {
  deathEater: {
    title: 'Death Eater',
    emoji: '💀'
  },
  orderOfThePhoenix: {
    title: 'Order of the Phoenix',
    emoji: '🦩'
  },
  ministryOfMagic: {
    title: 'ministry of Magic',
    emoji: '🏛'
  },
  dumbledoresArmy: {
    title: 'Dumbledores army',
    emoji: '🧙🏻‍♂️'
  }
} as const;

export default organizations;

const bloodStatuses = {
  halfBlood: {
    displayName: 'Half blood',
    value: 'half-blood'
  },
  unknown: {
    displayName: 'unknown',
    value: 'unknown'
  },
  'pure-blood': {
    displayName: 'Pure blood',
    value: 'pure-blood'
  },
  muggle: {
    displayName: 'Muggle',
    value: 'muggle'
  },
  muggleBorn: {
    displayName: 'Muggle born',
    value: 'muggle-born'
  },
  quarterVilla: {
    displayName: 'Quarter villa',
    value: 'quarter-villa'
  },
  squib: {
    displayName: 'Squib',
    value: 'squib'
  },
  halfGiant: {
    displayName: 'Half giant',
    value: 'half-giant'
  }
} as const;

export default bloodStatuses;

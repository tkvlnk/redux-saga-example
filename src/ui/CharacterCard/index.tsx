import React, { useMemo } from 'react';
import { Card } from 'antd';
import { Character } from '../../store/characters';
import sm from './styles.module.scss';
import houses from '../../constants/houses';
import organizations from '../../constants/organizations';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = props => {
  const { character } = props;

  const {
    house,
    deathEater,
    orderOfThePhoenix,
    ministryOfMagic,
    dumbledoresArmy
  } = character;

  const [houseTitle, houseEmoji, color] = useMemo(() => {
    switch (character.house) {
      case 'Gryffindor':
        return [houses.Gryffindor.name, houses.Gryffindor.emoji, 'lightcoral'];
      case 'Ravenclaw':
        return [houses.Ravenclaw.name, houses.Ravenclaw.emoji, 'lightskyblue'];
      case 'Hufflepuff':
        return [
          houses.Hufflepuff.name,
          houses.Hufflepuff.emoji,
          'darkgoldenrod'
        ];
      case 'Slytherin':
        return [houses.Slytherin.name, houses.Slytherin.emoji, 'lightgreen'];
      default:
        return ['No house', '👤', 'lightgray'];
    }
  }, [house]);

  const additionalBadges = useMemo(() => {
    return ([
      'deathEater',
      'orderOfThePhoenix',
      'ministryOfMagic',
      'dumbledoresArmy'
    ] as const).reduce((result, key) => {
      if (character[key]) {
        const { title, emoji } = organizations[key];

        result.push([title, emoji]);
      }

      return result;
    }, [] as string[][]);
  }, [deathEater, orderOfThePhoenix, ministryOfMagic, dumbledoresArmy]);

  return (
    <Card
      style={{
        borderColor: color
      }}
    >
      <Card.Meta
        avatar={
          <div className={sm.Avatar} title={houseTitle}>
            {houseEmoji}
          </div>
        }
        title={character.name}
        description={
          <>
            <p>{character.role}</p>
            <p className={sm.Badges}>
              {additionalBadges.map(([title, emoji]) => (
                <span key={title} title={title}>
                  {emoji}
                </span>
              ))}
            </p>
          </>
        }
      />
    </Card>
  );
};

export default CharacterCard;

import React, { useMemo } from 'react';
import { Card, Descriptions } from 'antd';
import { Character } from '../../store/characters';
import sm from './styles.module.scss';
import houses from '../../constants/houses';
import organizations from '../../constants/organizations';
import bloodStatuses from '../../constants/bloodStatus';

interface CharacterCardProps {
  character: Character;
  detailed?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = props => {
  const { character, detailed } = props;

  const {
    house,
    deathEater,
    orderOfThePhoenix,
    ministryOfMagic,
    dumbledoresArmy,
    school,
    species,
    patronus,
    animagus,
    boggart,
    wand,
    bloodStatus
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

  const details = useMemo(() => {
    const detailPieces = Object.entries({
      animagus,
      boggart,
      wand,
      school,
      patronus,
      species
    });

    if (!detailPieces.length) {
      return null;
    }

    return (
      <Descriptions>
        {detailPieces
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <Descriptions.Item
              key={key}
              label={<span className={sm.DetailName}>{key}</span>}
            >
              {value}
            </Descriptions.Item>
          ))}
      </Descriptions>
    );
  }, [character?._id]);

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
            {character.role && <p>{character.role}</p>}
            {additionalBadges.length !== 0 && (
              <p className={sm.Badges}>
                {additionalBadges.map(([title, emoji]) => (
                  <span key={title} title={title}>
                    {emoji}
                  </span>
                ))}
              </p>
            )}
            <p>
              Blood status:{' '}
              {Object.values(bloodStatuses).find(
                ({ value }) => bloodStatus === value
              )?.displayName ?? '-'}
            </p>
          </>
        }
      />
      {detailed && details}
    </Card>
  );
};

export default CharacterCard;

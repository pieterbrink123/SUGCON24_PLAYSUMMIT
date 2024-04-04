import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';
import WheelComponent from './WheelComponent';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const WheelOfFortune = (props: ComponentProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const { width, height } = useWindowSize();
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://api.jsonstorage.net/v1/json/529d8e8b-f479-41b3-acda-cfe3168b5b0c/bcdec8e9-0209-49f2-8187-ed44a519d481'
      );
      const parsed = await response.json();
      const emails = parsed.names.map(function (item: { name: string }) {
        return item.name;
      });

      setData(emails);
    })();
  }, []);

  console.log(data);

  if (data.length < 1) {
    return <></>;
  }

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
  ];
  const onFinished = (winner: string) => {
    console.log(winner);
    setWinner(winner);
  };
  return (
    <div className={`text-cta ${sxaStyles}`}>
      {winner && (
        <>
          <Confetti width={width} height={height} />
          <h1 className="text-white text-3xl">The winner is: {winner}!</h1>
        </>
      )}
      <WheelComponent
        segments={data}
        segColors={segColors}
        winningSegment={null}
        onFinished={(winner: string) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={290}
        upDuration={100}
        downDuration={1000}
      />
    </div>
  );
};

export const Default = WheelOfFortune;

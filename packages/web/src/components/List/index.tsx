import React, {
  FC,
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { FixedSizeList } from 'react-window';

export interface ListProps {
  totalCount: number;
  children: FC<{
    index: number;
    style: CSSProperties;
    itemSize: number;
    width: number;
  }>;
}

export function List(props: ListProps): ReactElement {
  const { totalCount, children } = props;

  const ChildComponent = children;
  const getContainerHeight = () => window.innerHeight - 170;
  const [containerHeight, setContainerHeight] = useState(getContainerHeight());

  const itemSize = 85;
  const width = 500;

  useEffect(() => {
    const onWindowResize = () => {
      setContainerHeight(getContainerHeight());
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <FixedSizeList
        className="hide-scrollbar"
        itemCount={totalCount}
        width={width}
        height={containerHeight}
        itemSize={itemSize}
        style={{ maxWidth: '100%' }}>
        {({ index, style }) => (
          <ChildComponent
            index={index}
            style={style}
            itemSize={85}
            width={500}
          />
        )}
      </FixedSizeList>
    </>
  );
}

import React, { ReactElement, useEffect, useRef } from 'react';

import { useStyles } from './styles';

export interface MusicNameProps {
  title: string;
  artists: string[];
}

export function MusicName(props: MusicNameProps): ReactElement {
  const {
    title,
    artists,
  } = props;

  const styles = useStyles();
  const rootContainerElRef = useRef<HTMLDivElement>(null);
  const secondaryText = artists.length === 0 ? 'unknown' : artists.join(' , ');

  useEffect(() => {
    let interval = -1;

    if (!rootContainerElRef.current) return;

    const rootContainerEl = rootContainerElRef.current;
    const primaryTextEl = rootContainerEl?.querySelector<HTMLSpanElement>(`.${styles.primaryText}`);
    const secondaryTextEl = rootContainerEl?.querySelector<HTMLSpanElement>(`.${styles.secondaryText}`);

    if (rootContainerEl.clientWidth < rootContainerEl.scrollWidth) {
      const textWithEl = [{ type: 'title', text: title }, { type: 'artists', text: ` - ${secondaryText} - ` }];

      interval = window.setInterval(() => {
        console.log(textWithEl.map((e) => e.text).join(' '));
        const firstElement = textWithEl[0];

        if (textWithEl[textWithEl.length - 1].type === firstElement.type) {
          textWithEl[textWithEl.length - 1]
            .text = textWithEl[textWithEl.length - 1].text + firstElement.text[0] ?? '';
        } else {
          textWithEl
            .push(
              {
                type: firstElement.type,
                text: firstElement.text[0] ?? '',
              },
            );
        }

        if (firstElement.text.length === 0) textWithEl.shift();
        else firstElement.text = firstElement.text.slice(1);

        const ctn = document.createDocumentFragment();

        for (let i = 0; i < textWithEl.length; i += 1) {
          let child: Node | undefined;

          if (textWithEl[i].type === 'title') {
            child = primaryTextEl?.cloneNode(true);
          } else {
            child = secondaryTextEl?.cloneNode(true);
          }

          if (child) (child as HTMLSpanElement).innerText = textWithEl[i].text ?? '';
          // eslint-disable-next-line no-continue
          else continue;

          ctn.appendChild(
            child,
          );
        }

        rootContainerEl.innerHTML = '';
        rootContainerEl.appendChild(ctn);
      }, 500);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearInterval(interval);
    };
  }, [title, artists]);

  return (
    <div ref={rootContainerElRef} className={styles.root}>
      <span className={styles.primaryText}>{title}</span>
      <span className={styles.secondaryText}>
        -
        {' '}
        {secondaryText}
      </span>
    </div>
  );
}

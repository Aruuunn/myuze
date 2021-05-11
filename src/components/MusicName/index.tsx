import React, { ReactElement, useEffect, useRef } from 'react';

import { useStyles } from './styles';

export interface MusicNameProps {
  title?: string;
  artists?: string[];
  size: 'small' | 'large';
  onClick?: () => void;
}

export function MusicName(props: MusicNameProps): ReactElement {
  const {
    title, artists, size,
  } = props;

  const styles = useStyles({ size });
  const rootContainerElRef = useRef<HTMLDivElement>(null);
  const secondaryText = (artists ?? []).length === 0 ? 'unknown' : (artists ?? []).join(' , ');

  useEffect(() => {
    let interval = -1;

    const onComponentMount = () => {
      window.clearInterval(interval);

      if (rootContainerElRef.current && title && artists) {
        const rootContainerEl = rootContainerElRef.current;
        const primaryTextEl = rootContainerEl?.querySelector<HTMLSpanElement>(
          `.${styles.primaryText}`,
        );
        if (primaryTextEl) primaryTextEl.innerText = title ?? '';

        const secondaryTextEl = rootContainerEl?.querySelector<HTMLSpanElement>(
          `.${styles.secondaryText}`,
        );

        if (secondaryTextEl) secondaryTextEl.innerText = ` - by ${secondaryText}`;

        if (primaryTextEl && secondaryTextEl) {
          rootContainerEl.innerHTML = '';
          rootContainerEl.appendChild(primaryTextEl);
          rootContainerEl.appendChild(secondaryTextEl);
        }

        if (rootContainerEl.clientWidth < rootContainerEl.scrollWidth) {
          const textWithEl = [
            { type: 'title', text: title },
            { type: 'artists', text: ` - by ${secondaryText} - ` },
          ];

          interval = window.setInterval(() => {
            const firstElement = textWithEl[0];

            if (textWithEl[textWithEl.length - 1].type === firstElement.type) {
              textWithEl[textWithEl.length - 1].text = textWithEl[textWithEl.length - 1].text
                  + (firstElement?.text?.[0] ?? '');
            } else {
              textWithEl.push({
                type: firstElement.type,
                text: firstElement?.text?.[0] ?? '',
              });
            }

            if (firstElement.text?.length === 0) textWithEl.shift();
            else firstElement.text = firstElement.text?.slice(1);

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

              ctn.appendChild(child);
            }

            rootContainerEl.innerHTML = '';
            rootContainerEl.appendChild(ctn);
          }, 500);
        }
      }
    };

    onComponentMount();

    window.addEventListener('resize', onComponentMount);

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', onComponentMount);
    };
  }, [title, artists]);

  return (
    <div
      ref={rootContainerElRef}
      className={styles.root}
    >
      <span className={styles.primaryText}>{title ?? ''}</span>
      <span className={styles.secondaryText}>
        {typeof artists?.length !== 'undefined' && artists.length !== 0 ? ` - ${secondaryText}` : ''}
      </span>
    </div>
  );
}

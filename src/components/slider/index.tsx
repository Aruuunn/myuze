import React, {CSSProperties, ReactElement} from 'react'
import * as sliderStyles from './slider.module.scss'

interface Props {
    maxValue: number;
    currentValue: number;
    style?: CSSProperties
}

export const Slider = (props: Props): ReactElement => {
    const {currentValue, maxValue, style} = props;

    return (
        <div className={sliderStyles.container} style={style}>
            <div>

            </div>
        </div>
    );
}

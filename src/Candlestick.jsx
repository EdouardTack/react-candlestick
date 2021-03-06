import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toNumber, toString } from 'lodash';
import './candlestick.css';

/**
 * @author Edouard Tack <edouard@tackacoder.fr>
 * React Candlestick latest version
 * Licensed under MIT (https://github.com/EdouardTack/react-candlestick/blob/master/LICENSE)
 *
 * @param props
 * @returns {html}
 * @constructor
 */
const Candlestick = (props) => {
    /**
     * Check type of value
     * @returns {number|string}
     */
    const createDefaultValue = () => {
        let value;
        if (props.defaultValue === undefined) {
            value = neutralValue;
        } else {
            if (typeof props.defaultValue === 'number') {
                value = toNumber(props.defaultValue);
            } else {
                value = toString(props.defaultValue);
            }
        }

        return value;
    };

    /**
     * Default choices values
     * @param {array}
     */
    const [ onValue, offValue, neutralValue ] = props.choices || [1, 0, ''];

    /**
     * When change value
     * @type {function}
     */
    const onChange = props.onChange || ((value) => {});

    /**
     * ID of candlestick element and input[name]
     * @param {string}
     */
    const [ id ] = useState(props.id || 'candlestick-' + Math.random().toString(8).substr(2, 9));

    /**
     * default value
     * @param {string|number}
     */
    const [ value, setValue ] = useState(createDefaultValue());

    /**
     * CSS name for actual position
     * @param {string}
     */
    const [ position, setPosition ] = useState('neutral');

    /**
     * On loading component
     * Check default value and set position
     */
    useEffect(() => {
        if (value === onValue) {
            setPosition('on');
        } else if (value === offValue) {
            setPosition('off');
        } else if (value === neutralValue) {
            setPosition('neutral');
        }
        setValue(value);
    }, [neutralValue, offValue, onValue, value]);

    /**
     * Check if we can turn the toggle.
     * We can't if is in disabled or readonly mode
     * @returns {boolean}
     */
    const canTurn = () => {
        return !isDisabled() && !isReadOnly();
    };

    /**
     * Get className for candlestick template
     * @returns {string}
     */
    const getClassNameBg = () => {
        const classNames = ['candlestick-bg', 'candlestick-bg-' + position];

        if (isDisabled()) {
            classNames.push('candlestick-disabled');
        }

        if (isReadOnly()) {
            classNames.push('candlestick-readonly');
        }

        return classNames.join(' ');
    };

    /**
     * Check if is disabled
     * @returns {Boolean}
     */
    const isDisabled = () => {
        return props.disabled || false;
    };

    /**
     * Check if is in readonly mode
     * @returns {Boolean}
     */
    const isReadOnly = () => {
        return props.readonly || false;
    };

    /**
     * Callback of turn candlestick value
     * @param {*} value
     * @param {string} position
     * @return {void}
     */
    const turnCallback = (value, position) => {
        if (canTurn()) {
            setPosition(position);
            setValue(value);
            onChange(value);
        }
    };

    /**
     * When activate
     * @return {void}
     */
    const turnOn = () => {
        turnCallback(onValue, 'on');
    };

    /**
     * When neutral position
     * @return {void}
     */
    const turnNeutral = () => {
        turnCallback(neutralValue, 'neutral');
    };

    /**
     * When deactivate
     * @return {void}
     */
    const turnOff = () => {
        turnCallback(offValue, 'off');
    };

    /**
     * Render input[type="hidden"] with his properties
     * @returns {*}
     */
    const renderInputHidden = () => {
        const options = {
            name: id,
            type: "hidden",
            value
        };

        if (isDisabled()) {
            options['disabled'] = 'disabled';
        }

        if (isReadOnly()) {
            options['readOnly'] = 'readonly';
        }

        return <input { ...options } />;
    };

    /**
     * Render toggle button
     * @returns {html}
     */
    const renderToggle = () => {
        return <div className={'candlestick-toggle candlestick-position-' + position} />;
    };

    /**
     * Rendering Hook
     */
    return (
        <div className="candlestick-wrapper candlestick-contents">
            <div id={id} className={getClassNameBg()}>
                <div className="candlestick-off" onClick={turnOff} />
                <div className="candlestick-neutral" onClick={turnNeutral} />
                <div className="candlestick-on" onClick={turnOn} />
                {renderToggle()}
            </div>
            {renderInputHidden()}
        </div>
    );
};

Candlestick.propTypes = {
    choices: PropTypes.array,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    readonly: PropTypes.bool
};

export default Candlestick;

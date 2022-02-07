/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render, mount } from 'enzyme';

import { WuiColorPicker } from './color_picker';
import { VISUALIZATION_COLORS, keys } from '../../services';
import { requiredProps, findTestSubject, sleep } from '../../test';

jest.mock('../portal', () => ({
  WuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

test('renders WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders compressed WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders readOnly WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders fullWidth WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders disabled WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders inline WuiColorPicker', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      display="inline"
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders a WuiColorPicker with a prepend and append', () => {
  const component = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      prepend="prepend"
      append="append"
      {...requiredProps}
    />
  );

  expect(component).toMatchSnapshot();
});

test('renders a WuiColorPicker with an alpha range selector', () => {
  const component = render(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  expect(component).toMatchSnapshot();
});

test('renders WuiColorPicker with an empty swatch when color is null', () => {
  const colorPicker = render(
    <WuiColorPicker onChange={onChange} color={null} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders WuiColorPicker with an empty swatch when color is ""', () => {
  const colorPicker = render(
    <WuiColorPicker onChange={onChange} color={''} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders WuiColorPicker with a color swatch when color is defined', () => {
  const colorPicker = render(
    <WuiColorPicker onChange={onChange} color={'#ffffff'} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders WuiColorPicker with a custom placeholder', () => {
  const colorPicker = render(
    <WuiColorPicker onChange={onChange} placeholder="Auto" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders WuiColorPicker with a clearable input', () => {
  const colorPicker = render(
    <WuiColorPicker
      onChange={onChange}
      color={'#ffeedd'}
      isClearable={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('popover color selector is not shown by default', () => {
  const colorPicker = mount(
    <WuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const colorSelector = findTestSubject(colorPicker, 'colorPickerPopover');
  expect(colorSelector.length).toBe(0);
});

test('popover color selector is shown when the input is clicked', () => {
  const onFocusHandler = jest.fn();
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      onFocus={onFocusHandler}
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  expect(onFocusHandler).toBeCalled();
  const colorSelector = findTestSubject(colorPicker, 'colorPickerPopover');
  expect(colorSelector.length).toBe(1);
});

test('popover color selector is hidden when the ESC key pressed', async () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  await sleep();
  findTestSubject(colorPicker, 'colorPickerPopover').simulate('keydown', {
    key: keys.ESCAPE,
  });
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('popover color selector is hidden and input regains focus when the ENTER key pressed', () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  findTestSubject(colorPicker, 'wuiSaturation').simulate('keydown', {
    key: keys.ENTER,
  });
  expect(
    findTestSubject(colorPicker, 'colorPickerAnchor').getDOMNode()
  ).toEqual(document.activeElement);
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('Setting a new color calls onChange', () => {
  const colorPicker = mount(
    <WuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const event = { target: { value: '#000000' } };
  const inputs = colorPicker.find('input[type="text"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#000000', {
    hex: '#000000',
    isValid: true,
    rgba: [0, 0, 0, 1],
  });
});

test('Clicking a swatch calls onChange', () => {
  const colorPicker = mount(
    <WuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const swatches = colorPicker.find('button.wuiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  swatches.first().simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(VISUALIZATION_COLORS[0], {
    hex: '#54b399',
    isValid: true,
    rgba: [84, 179, 153, 1],
  });
});

test('Setting a new alpha value calls onChange', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      showAlpha={true}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  // Slider
  const alpha = findTestSubject(colorPicker, 'colorPickerAlpha');
  const event1 = { target: { value: '50' } };
  const range = alpha.first(); // input[type=range]
  range.simulate('change', event1);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#ffeedd80', {
    hex: '#ffeedd80',
    isValid: true,
    rgba: [255, 238, 221, 0.5],
  });
  // Number input
  const event2 = { target: { value: '25' } };
  const input = alpha.at(1); // input[type=number]
  input.simulate('change', event2);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#ffeedd40', {
    hex: '#ffeedd40',
    isValid: true,
    rgba: [255, 238, 221, 0.25],
  });
});

test('Clicking the "clear" button calls onChange', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      isClearable={true}
      {...requiredProps}
    />
  );

  colorPicker.find('.wuiFormControlLayoutClearButton').simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('', {
    hex: '',
    isValid: false,
    rgba: [NaN, NaN, NaN, 1],
  });
});

test('default mode does renders child components', () => {
  const colorPicker = mount(
    <WuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = findTestSubject(colorPicker, 'wuiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('WuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.wuiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('swatch mode does not render WuiSaturation or WuiHue', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      mode="swatch"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = colorPicker.find('WuiSaturation');
  expect(saturation.length).toBe(0);
  const hue = colorPicker.find('WuiHue');
  expect(hue.length).toBe(0);
  const swatches = colorPicker.find('button.wuiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('picker mode does not render swatches', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      mode="picker"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = findTestSubject(colorPicker, 'wuiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('WuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.wuiColorPicker__swatchSelect');
  expect(swatches.length).toBe(0);
});

test('secondaryInputDisplay `top` has a popover panel input', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="top"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const inputTop = findTestSubject(colorPicker, 'topColorPickerInput');
  const inputBottom = findTestSubject(colorPicker, 'bottomColorPickerInput');
  expect(inputTop.length).toBe(1);
  expect(inputBottom.length).toBe(0);
});

test('secondaryInputDisplay `bottom` has a popover panel input', () => {
  const colorPicker = mount(
    <WuiColorPicker
      onChange={onChange}
      secondaryInputDisplay="bottom"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const inputTop = findTestSubject(colorPicker, 'topColorPickerInput');
  const inputBottom = findTestSubject(colorPicker, 'bottomColorPickerInput');
  expect(inputTop.length).toBe(0);
  expect(inputBottom.length).toBe(1);
});

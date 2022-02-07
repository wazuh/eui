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

import React, { HTMLAttributes } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';

export type WuiSelectableOptionCheckedType = 'on' | 'off' | undefined;

export type WuiSelectableOptionBase = CommonProps & {
  /**
   * Visible label of option.
   * Must be unique across items if `key` is not supplied
   */
  label: string;
  /**
   * Optionally change the searchable term by passing a different string other than the `label`.
   * Best used when creating a custom `optionRender` to separate the label from metadata but allowing to search on both
   */
  searchableLabel?: string;
  /**
   * Must be unique across items.
   * Will be used to match options instead of `label`
   */
  key?: string;
  /**
   * Leave `undefined` to indicate not selected,
   * 'on' to indicate inclusion and
   * 'off' to indicate exclusion
   */
  checked?: WuiSelectableOptionCheckedType;
  disabled?: boolean;
  /**
   * Optional `boolean`.
   * Set to `true` to indicate object is just a grouping label, not a selectable item
   */
  isGroupLabel?: false;
  /**
   * Node to add between the selection icon and the label
   */
  prepend?: React.ReactNode;
  /**
   * Node to add to the far right of the item
   */
  append?: React.ReactNode;
  ref?: (optionIndex: number) => void;
  /**
   * Disallow `id` from being set.
   * Option item `id`s are coordinated at a higher level for a11y reasons.
   */
  id?: never;
};

type _WuiSelectableGroupLabelOption = Omit<
  WuiSelectableOptionBase,
  'isGroupLabel'
> &
  Exclude<HTMLAttributes<HTMLDivElement>, 'id'> & {
    isGroupLabel: true;
  };

export type WuiSelectableGroupLabelOption<T> = _WuiSelectableGroupLabelOption &
  T;

type _WuiSelectableLIOption = WuiSelectableOptionBase &
  Exclude<HTMLAttributes<HTMLLIElement>, 'id'>;

export type WuiSelectableLIOption<T> = _WuiSelectableLIOption & T;

export type WuiSelectableOption<T = {}> = ExclusiveUnion<
  WuiSelectableGroupLabelOption<T>,
  WuiSelectableLIOption<T>
>;
